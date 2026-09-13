// Exact normalized names only. A generic word such as "Port" must never
// connect two unrelated places. Ambiguous duplicate provider rows are ignored.
export function normalizePortName(value) {
  if (typeof value !== 'string') return '';
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/\b(?:port|of|the)\b/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
}

export function mergePortWatchData(baseline, attributes = []) {
  const byName = new Map();
  for (const row of attributes) {
    const name = normalizePortName(row?.PORT_NAME);
    if (name) byName.set(name, byName.has(name) ? null : row);
  }
  let liveCount = 0;
  const ports = baseline.map(port => {
    const row = byName.get(normalizePortName(port.name));
    const fields = [];
    const result = { ...port, source: 'Static baseline', live: false, liveFields: fields };
    if (!row) return result;
    // Accept the documented contract only: index 0..1, nonnegative wait days.
    if (typeof row.CONGESTION_INDEX === 'number' && Number.isFinite(row.CONGESTION_INDEX) && row.CONGESTION_INDEX >= 0 && row.CONGESTION_INDEX <= 1) {
      result.congestion = Math.round(row.CONGESTION_INDEX * 100);
      fields.push('congestion');
    }
    if (typeof row.WAIT_DAYS === 'number' && Number.isFinite(row.WAIT_DAYS) && row.WAIT_DAYS >= 0) {
      result.waitDays = Math.round(row.WAIT_DAYS * 10) / 10;
      fields.push('waitDays');
    }
    if (!fields.length) return result;
    if ([-1, 0, 1].includes(row.TREND)) {
      result.trend = row.TREND === 1 ? 'up' : row.TREND === -1 ? 'down' : 'stable';
      fields.push('trend');
    }
    result.live = true;
    result.source = 'IMF PortWatch (matched fields)';
    liveCount += 1;
    return result;
  });
  return { ports, liveCount, source: liveCount ? 'IMF PortWatch + static baseline' : 'Static baseline (no verified live values)' };
}
