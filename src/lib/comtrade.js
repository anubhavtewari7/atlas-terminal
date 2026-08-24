// Enriches sourcing hub cards with real, verifiable export statistics from
// the UN Comtrade public preview API — free, no key required, official UN
// trade data. This is deliberately separate from the illustrative company/
// ESG content in ATLAS_DB: it adds one genuinely real, sourced number per
// hub rather than pretending the whole card is live.
//
// API contract (confirmed across UN Comtrade's own Python client examples
// and independent third-party integrations — see comtradeapicall on GitHub
// and the notebook at github.com/bdecon/econ_data):
//   GET https://comtradeapi.un.org/public/v1/preview/{typeCode}/{freqCode}/{classificationCode}
//   Params: reporterCode (UN M49 numeric), partnerCode (0 = World),
//           period (year), flowCode (X = export), cmdCode (HS code)
// Free preview tier: no key, capped around 500 requests/day, small result
// caps per call — fine for per-mission enrichment, not for bulk analytics.

const COMTRADE_BASE = 'https://comtradeapi.un.org/public/v1/preview/C/A/HS';

// UN M49 numeric country codes for every country currently in ATLAS_DB.
// Note: Taiwan is not a UN member state, so UN Comtrade reports it under
// code 490 ("Other Asia, nes") rather than a Taiwan-specific code — a
// known quirk of UN statistical data, not an error here.
const COUNTRY_M49 = {
  JAPAN: 392, USA: 842, CHILE: 152, CHINA: 156, GERMANY: 276,
  NETHERLANDS: 528, HUNGARY: 348, BANGLADESH: 50, INDIA: 356,
  'S. KOREA': 410, VIETNAM: 704, TAIWAN: 490, TURKEY: 792,
  BRAZIL: 76, MEXICO: 484, ARGENTINA: 32, MALAYSIA: 458,
  AUSTRALIA: 36, ZAMBIA: 894, DRC: 180,
};

function extractCountryCode(hubLabel) {
  // hub labels look like "BAOTOU, CHINA" or "ZAMBIA / DRC"
  const parts = hubLabel.split(/[,/]/).map(s => s.trim().toUpperCase());
  for (const part of parts.reverse()) {
    if (COUNTRY_M49[part]) return COUNTRY_M49[part];
  }
  return null;
}

function extractHsCode(htsCode) {
  // ATLAS_DB stores full HTS lines like "8505.11.00" — Comtrade's HS
  // classification resolves reliably at the 4 or 6 digit level.
  const digits = (htsCode || '').replace(/\./g, '');
  return digits.slice(0, 6) || digits.slice(0, 4);
}

async function fetchExportValue(reporterCode, hsCode, year) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);
  try {
    const url = `${COMTRADE_BASE}?reporterCode=${reporterCode}&partnerCode=0&period=${year}&flowCode=X&cmdCode=${hsCode}`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) return null;
    const json = await res.json();
    const row = (json.data || [])[0];
    if (!row || !row.primaryValue) return null;
    return { value: row.primaryValue, year };
  } catch {
    clearTimeout(timeoutId);
    return null;
  }
}

// Attaches { real_export_value_usd, real_trade_data_year } to each hub when
// available. Never throws — a hub simply doesn't get the badge if Comtrade
// has no data for that country/HS/year combination, which is common (not
// every country reports every HS6 line every year).
export async function enrichWithRealTradeData(hubs) {
  const currentYear = new Date().getFullYear();
  const candidateYears = [currentYear - 2, currentYear - 3]; // Comtrade typically lags 1-3 years

  const enriched = await Promise.allSettled(hubs.map(async (hub) => {
    const countryCode = extractCountryCode(hub.hub);
    const hsCode = extractHsCode(hub.customs?.hts_code);
    if (!countryCode || !hsCode) return hub;

    for (const year of candidateYears) {
      const result = await fetchExportValue(countryCode, hsCode, year);
      if (result) {
        return { ...hub, real_export_value_usd: result.value, real_trade_data_year: result.year };
      }
    }
    return hub;
  }));

  return enriched.map((r, i) => (r.status === 'fulfilled' ? r.value : hubs[i]));
}
