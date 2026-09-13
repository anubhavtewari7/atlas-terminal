import test from 'node:test';
import assert from 'node:assert/strict';
import { ATLAS_DB, CATEGORY_RISKS, categorizeQuery, lookupTariff, calculateRisk } from '../src/lib/database.js';
import { buildTariffResponse } from '../src/lib/tariff-response.js';
import { parseDutyRate, parseFreightEstimate, calculateLandedCost, getLandedCostDefaults, resolveFxRate } from '../src/lib/procurement-costs.js';
import { mergePortWatchData } from '../src/lib/port-data.js';
import { analyzeExportControls } from '../src/lib/export-controls.js';

// Realistic descriptions, including previously broken demo queries and raw
// materials that must not become finished-product matches.
const samples = [
  ['lithium-ion batteries for EV assembly', 'ev_battery'],
  ['Lithium‑ion batteries for electric vehicles', 'ev_battery'],
  ['EV batteries', 'ev_battery'],
  ['Traction battery for electric trucks', 'ev_battery'],
  ['Battery cells for EV production', 'ev_battery'],
  ['Lithium carbonate', 'metals'],
  ['Lithium grease NLGI 2', 'chemicals'],
  ['Semiconductor wafers for automotive ECU', 'semiconductor'],
  ['silicon wafer', 'semiconductor'],
  ['Silicon carbide wafers for power electronics', 'semiconductor'],
  ['IATF-certified brake pads for passenger vehicles', 'automotive'],
  ['solar panels for commercial installations', 'renewable_energy'],
  ['jet engines', 'aerospace'],
  ['dog food', 'pet_animal'],
  ['industrial robots', 'robotics_automation'],
  ['neodymium magnets for EV motor assembly', 'industrial'],
  ['corrugated packaging boxes', 'packaging'],
  ['cotton yarn for garments', 'textiles'],
  ['xyzzy unknown item', null],
  ['', null],
  [null, null],
];
for (const [query, expected] of samples) {
  test(`category: ${query}`, () => assert.equal(categorizeQuery(query), expected));
}

test('every supported category has usable hubs, unique IDs, and risk data', () => {
  const ids = new Set();
  for (const [category, hubs] of Object.entries(ATLAS_DB)) {
    assert.ok(hubs.length);
    assert.ok(Array.isArray(CATEGORY_RISKS[category]));
    for (const hub of hubs) {
      assert.ok(!ids.has(hub.id)); ids.add(hub.id);
      assert.ok(Number.isFinite(hub.lat) && Number.isFinite(hub.lng));
      assert.ok(hub.customs && hub.logistics && hub.companies.length);
    }
  }
});

test('known tariff keyword match remains indicative and reaches the API response', () => {
  const tariff = lookupTariff('brake pads');
  assert.equal(tariff.matched, true);
  assert.equal(tariff.hts, '8708.30.50');
  const response = buildTariffResponse('brake pads', tariff);
  assert.equal(response.confidence, 'indicative');
  assert.equal(response.matched, true);
  assert.equal(response.catalog_rate, '2.5%');
  assert.equal(response.indicative_duty_percent, 2.5);
  assert.equal(response.mfn_rate, 'Not verified');
});

for (const query of ['lithium-ion batteries for EV assembly', 'semiconductor wafers']) {
  test(`tariff category reference is not a definitive match: ${query}`, () => {
    const tariff = lookupTariff(query);
    const response = buildTariffResponse(query, tariff);
    assert.equal(response.matched, false);
    assert.equal(response.confidence, 'category_reference');
    assert.notEqual(response.hts_code, '2836.91.00');
    assert.match(response.description, /not a product classification/);
  });
}
test('unknown tariff has no invented code or duty', () => {
  const response = buildTariffResponse('xyzzy', lookupTariff('xyzzy'));
  assert.equal(response.confidence, 'unknown');
  assert.equal(response.hts_code, null);
  assert.equal(response.hs6_code, null);
  assert.equal(response.indicative_duty_percent, null);
});

test('Mexico lane takes priority over generic Latin America', () => {
  assert.equal(calculateRisk('Mexico', 'USA').transit_days, 3);
  assert.equal(calculateRisk('Mexico', 'United States').transit_days, 3);
  assert.equal(calculateRisk('Brazil', 'USA').transit_days, 12);
  assert.equal(calculateRisk('Chile', 'USA').transit_days, 12);
});

test('duty parser sums only unambiguous percentages', () => {
  assert.equal(parseDutyRate('5.3% + 25% (Sec 301)').percent, 30.3);
  assert.deepEqual(parseDutyRate('5.3% + 25% (Sec 301)').components.map(x => x.percent), [5.3, 25]);
  assert.equal(parseDutyRate('0% (USMCA)').percent, 0);
  assert.equal(parseDutyRate('2.5%').percent, 2.5);
});
for (const value of ['0%–25%', '5.7-8.5%', '$0.35/kg', '0% / 25%', '2% + $1/kg', '', null, 'See broker']) {
  test(`duty remains unknown: ${value}`, () => assert.equal(parseDutyRate(value).percent, null));
}
test('freight preserves quote units and rejects ranges/unknowns', () => {
  assert.deepEqual(parseFreightEstimate('$2.1k/Truck'), { amount: 2100, unit: 'Truck', raw: '$2.1k/Truck' });
  assert.equal(parseFreightEstimate('$4,500/FEU').amount, 4500);
  assert.equal(parseFreightEstimate('$2k-$4k/FEU').amount, null);
  assert.equal(parseFreightEstimate('').amount, null);
});
test('hub prefill retains composite duty and freight assumptions', () => {
  const result = getLandedCostDefaults({ hub: 'Example', customs: { duty_rate: '5.3% + 25% (Sec 301)' }, logistics: { freight_cost_estimate: '$3.2k/FEU' } });
  assert.equal(result.duty.percent, 30.3);
  assert.equal(result.freight.amount, 3200);
  assert.equal(result.freight.unit, 'FEU');
  assert.equal(getLandedCostDefaults(null).duty.percent, null);
  assert.equal(getLandedCostDefaults(null).freight.amount, null);
});
const shipment = { unitCost: 50, quantity: 1000, freightCost: 3200, dutyPercent: 30.3, insurancePercent: 0.5 };
test('landed cost includes all additive duties on FOB cargo value', () => {
  const result = calculateLandedCost(shipment);
  assert.equal(result.dutyCost, 15150);
  assert.equal(result.totalLandedCost, 68600);
  assert.equal(result.landedCostPerUnit, 68.6);
});
test('unknown, negative and non-finite amounts do not produce a total', () => {
  for (const [key, value] of [['dutyPercent', ''], ['quantity', 0], ['quantity', -1], ['unitCost', -10], ['freightCost', null], ['freightCost', Infinity]]) {
    assert.equal(calculateLandedCost({ ...shipment, [key]: value }), null);
  }
  assert.equal(calculateLandedCost({ ...shipment, dutyPercent: 0 }).dutyCost, 0);
});

const fx = { currency: 'CNY', referenceRate: 7.25, date: '2026-09-11' };
test('FX uses the actual nested API payload and reports its date', () => {
  assert.deepEqual(resolveFxRate({ ...fx, rates: { CNY: { rate: 7.1 } } }), { rate: 7.1, source: 'feed', label: 'Frankfurter / ECB', date: '2026-09-11' });
});
test('stale, missing and overridden FX are explicitly distinguished', () => {
  assert.equal(resolveFxRate({ ...fx, rates: { CNY: 7.2 }, stale: true }).source, 'fallback');
  assert.equal(resolveFxRate({ ...fx, rates: { CNY: 0 } }).source, 'reference');
  assert.equal(resolveFxRate({ ...fx }).rate, 7.25);
  assert.equal(resolveFxRate({ ...fx, override: '8' }).rate, 8);
  assert.equal(resolveFxRate({ ...fx, override: '-1' }).rate, null);
  assert.equal(resolveFxRate({ currency: 'XXX' }).rate, null);
});

const baseline = [{ name: 'Port of Singapore', congestion: 28, waitDays: 1, trend: 'stable' }, { name: 'Port of Shanghai', congestion: 52, waitDays: 3.5, trend: 'up' }];
test('Shanghai provider values never update Singapore', () => {
  const result = mergePortWatchData(baseline, [{ PORT_NAME: 'Port of Shanghai', CONGESTION_INDEX: 0.9, WAIT_DAYS: 9, TREND: 1 }]);
  assert.equal(result.ports[0].congestion, 28);
  assert.equal(result.ports[0].live, false);
  assert.equal(result.ports[1].congestion, 90);
  assert.equal(result.liveCount, 1);
});
test('normalized exact names match; generic, missing and ambiguous names do not', () => {
  assert.equal(mergePortWatchData(baseline, [{ PORT_NAME: 'SINGAPORE', WAIT_DAYS: 2 }]).liveCount, 1);
  for (const rows of [[{ PORT_NAME: 'Port', WAIT_DAYS: 9 }], [{ PORT_NAME: 'Singapore' }], [{ PORT_NAME: 'Singapore', WAIT_DAYS: -1, CONGESTION_INDEX: 80 }], [{ PORT_NAME: 'Singapore', WAIT_DAYS: 1 }, { PORT_NAME: 'Port of Singapore', WAIT_DAYS: 2 }], [null]]) {
    assert.equal(mergePortWatchData(baseline, rows).liveCount, 0);
  }
});
test('partial provider data labels only the verified fields; fallback is static', () => {
  const result = mergePortWatchData(baseline, [{ PORT_NAME: 'Shanghai', WAIT_DAYS: 2 }]);
  assert.deepEqual(result.ports[1].liveFields, ['waitDays']);
  assert.equal(result.ports[1].congestion, 52);
  assert.equal(mergePortWatchData(baseline).ports[0].congestion, 28);
  assert.match(mergePortWatchData(baseline).source, /Static baseline/);
});

test('unknown and commercial terms never imply an EAR99 clearance', () => {
  for (const query of ['xyzzy', '', 'office furniture', 'standard fastener']) {
    const result = analyzeExportControls(query);
    assert.equal(result.level, 'unknown');
    assert.match(result.verdict, /MANUAL REVIEW/);
  }
});
test('known export-control triggers remain flagged', () => {
  const result = analyzeExportControls('Nuclear reactor uranium enrichment');
  assert.ok(result.hits.length > 0);
  assert.equal(result.level, 'controlled');
});
