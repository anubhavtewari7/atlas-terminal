import { parseDutyRate } from './procurement-costs.js';

export function buildTariffResponse(product, tariff) {
  const duty = parseDutyRate(tariff.duty);
  const description = tariff.confidence === 'unknown'
    ? 'No catalog match. Add material, function, and product specifications for manual classification.'
    : tariff.matched
      ? `Indicative catalog keyword match for ${product}. Confirm the full HTS classification, origin, and applicable rates with a customs specialist.`
      : `Category reference for ${product}, not a product classification. Do not use this code or rate for a customs filing.`;
  return {
    hts_code: tariff.hts,
    hs6_code: tariff.hts?.replace(/\./g, '').slice(0, 6) || null,
    matched: tariff.matched,
    confidence: tariff.confidence,
    category: tariff.category,
    description,
    catalog_rate: tariff.duty,
    duty_components: duty.components,
    indicative_duty_percent: duty.percent,
    // A catalog string does not establish origin-specific MFN/additional duties.
    mfn_rate: 'Not verified',
    section301_rate: 'Requires origin and classification',
    special_rate: 'Requires FTA eligibility review',
    column2_rate: 'Not verified',
    total_us_duty: 'Not determined',
    eu_duty: 'Check EU TARIC database',
    uk_duty: 'Check UK Global Tariff',
    free_trade_agreements: [],
    special_notes: tariff.notes || '',
    chapter: tariff.hts ? `Chapter ${tariff.hts.slice(0, 2)}` : 'Unclassified',
    unit: 'Confirm HTS statistical unit',
    source: 'nautilus_db',
  };
}
