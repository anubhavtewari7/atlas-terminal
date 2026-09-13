// Catalog strings are indicative inputs, not authoritative tariff assessments.
// Only unambiguous additive percentages can be used in a cost scenario.
export function parseDutyRate(value) {
  const text = typeof value === 'string' ? value.trim() : '';
  const expression = text.replace(/\([^)]*\)/g, '').trim();
  if (!/^\d+(?:\.\d+)?%\s*(?:\+\s*\d+(?:\.\d+)?%\s*)*$/.test(expression)) {
    return { percent: null, components: [], raw: text, reason: 'Enter a confirmed percentage; this rate is conditional, specific, a range, or unavailable.' };
  }
  const components = [...text.matchAll(/(\d+(?:\.\d+)?)%\s*(?:\(([^)]*)\))?/g)]
    .map((match) => ({ percent: Number(match[1]), note: match[2] || null }));
  const percent = Math.round(components.reduce((sum, part) => sum + part.percent, 0) * 10000) / 10000;
  return { percent, components, raw: text, reason: 'Catalog estimate; confirm origin, eligibility, and applicable surcharges.' };
}

export function parseFreightEstimate(value) {
  const text = typeof value === 'string' ? value.trim() : '';
  const match = text.match(/^\$([\d,]+(?:\.\d+)?)\s*(k)?(?:\s*\/\s*([\w -]+))?$/i);
  if (!match) return { amount: null, unit: null, raw: text };
  const amount = Number(match[1].replace(/,/g, '')) * (match[2] ? 1000 : 1);
  return { amount: Number.isFinite(amount) ? amount : null, unit: match[3]?.trim() || null, raw: text };
}

export function getLandedCostDefaults(hub) {
  return {
    hub: hub?.hub || null,
    duty: parseDutyRate(hub?.customs?.duty_rate),
    freight: parseFreightEstimate(hub?.logistics?.freight_cost_estimate),
  };
}

function nonnegativeNumber(value) {
  if (value === '' || value == null || typeof value === 'boolean') return null;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : null;
}

export function calculateLandedCost({ unitCost, quantity, freightCost, dutyPercent, insurancePercent }) {
  const values = [unitCost, quantity, freightCost, dutyPercent, insurancePercent].map(nonnegativeNumber);
  if (values.some(value => value === null) || values[1] === 0) return null;
  const [unit, count, freight, duty, insurance] = values;
  const cargoValue = unit * count;
  const insuranceCost = cargoValue * insurance / 100;
  const dutyCost = cargoValue * duty / 100; // FOB basis for the US import scenario
  const totalLandedCost = cargoValue + freight + insuranceCost + dutyCost;
  if (!Number.isFinite(totalLandedCost)) return null;
  return {
    cargoValue, insuranceCost, dutyCost, totalLandedCost,
    landedCostPerUnit: totalLandedCost / count,
    marginImpact: unit > 0 ? ((totalLandedCost / count - unit) / unit) * 100 : null,
  };
}

export function resolveFxRate({ currency, rates, override, referenceRate, stale = false, date = null }) {
  if (override !== '' && override != null) {
    const rate = nonnegativeNumber(override);
    return { rate: rate > 0 ? rate : null, source: 'override', label: 'User-entered rate', date: null };
  }
  const entry = rates?.[currency];
  const rate = nonnegativeNumber(typeof entry === 'object' && entry !== null ? entry.rate : entry);
  if (rate > 0) {
    return { rate, source: stale ? 'fallback' : 'feed', label: stale ? 'Fallback estimate' : 'Frankfurter / ECB', date: stale ? null : date };
  }
  const fallback = nonnegativeNumber(referenceRate);
  return { rate: fallback > 0 ? fallback : null, source: 'reference', label: 'Reference estimate', date: null };
}
