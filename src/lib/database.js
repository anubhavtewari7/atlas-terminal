export const ATLAS_DB = {
  // 1. AUTOMOTIVE (Cars, EV, Parts, Visors, Seats, Batteries)
  automotive: [
    { id: 'h_auto_1', lat: 25.6, lng: -100.3, hub: 'MONTERREY, MEXICO', title: 'NAFTA Tier-1 Auto Cluster', companies: [{ name: 'Grupo Antolin', website: 'https://www.grupoantolin.com/' }, { name: 'Nemak', website: 'https://www.nemak.com/' }, { name: 'Metalsa', website: 'https://www.metalsa.com/' }], desc: 'Primary nearshoring hub for North American automotive OEMs. Specializes in interiors, chassis, and visors.', customs: { hts_code: '8708.29', duty_rate: '0% (USMCA)', compliance_note: 'USMCA Rules of Origin apply.' }, esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Water scarcity is a growing operational risk.' }, logistics: { port_wait_days: 1, freight_cost_estimate: '$2.1k/Truck' }, industry_kpi: { label: 'Tooling Lead', value: '12 Weeks' } },
    { id: 'h_auto_2', lat: 31.2, lng: 121.4, hub: 'SHANGHAI, CHINA', title: 'East China Auto Zone', companies: [{ name: 'Yanfeng Automotive', website: 'https://www.yfai.com/' }, { name: 'Huayu Auto', website: 'https://www.hasco-group.com/' }], desc: 'Massive scale production for automotive plastics, electronics, and interiors.', customs: { hts_code: '8708.29', duty_rate: '25% (Sec 301)', compliance_note: 'Subject to Section 301 tariffs.' }, esg: { carbon_footprint: 'High', ethical_rating: 'B', sustainability_note: 'Transitioning to renewable grid power by 2030.' }, logistics: { port_wait_days: 5, freight_cost_estimate: '$4.5k/FEU' }, industry_kpi: { label: 'Scale Capacity', value: 'Unlimited' } },
    { id: 'h_auto_3', lat: 48.1, lng: 11.5, hub: 'BAVARIA, GERMANY', title: 'EU Premium Parts Hub', companies: [{ name: 'Continental AG', website: 'https://www.continental.com/' }, { name: 'Bosch', website: 'https://www.bosch.com/' }], desc: 'High-precision engineering and premium trim components.', customs: { hts_code: '8708.29', duty_rate: '2.5% (Non-EU)', compliance_note: 'CE Marking required.' }, esg: { carbon_footprint: 'Low', ethical_rating: 'AA', sustainability_note: 'Industry-leading circular economy practices.' }, logistics: { port_wait_days: 2, freight_cost_estimate: '$3.8k/Sea' }, industry_kpi: { label: 'Defect Rate', value: '< 5 PPM' } },
    { id: 'h_auto_4', lat: 35.1, lng: 136.9, hub: 'AICHI, JAPAN', title: 'J-OEM Sourcing Cluster', companies: [{ name: 'Toyota Boshoku', website: 'https://www.toyota-boshoku.com/' }, { name: 'Denso', website: 'https://www.denso.com/' }], desc: 'Just-in-time manufacturing excellence for Japanese OEMs.', customs: { hts_code: '8708.29', duty_rate: '0% (CPTPP)', compliance_note: 'Strict J-Quality standards apply.' }, esg: { carbon_footprint: 'Low', ethical_rating: 'A+', sustainability_note: 'High energy efficiency standards.' }, logistics: { port_wait_days: 2, freight_cost_estimate: '$4.2k/Sea' }, industry_kpi: { label: 'JIT Score', value: '99.9%' } },
    { id: 'h_auto_5', lat: 42.3, lng: -83.0, hub: 'DETROIT, USA', title: 'Great Lakes Auto Cluster', companies: [{ name: 'Lear Corp', website: 'https://www.lear.com/' }, { name: 'Magna', website: 'https://www.magna.com/' }], desc: 'Legacy US automotive engineering and final assembly hub.', customs: { hts_code: '8708.29', duty_rate: '0% (Domestic)', compliance_note: 'Domestic supply.' }, esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Unionized labor forces.' }, logistics: { port_wait_days: 0, freight_cost_estimate: '$1.5k/Ground' }, industry_kpi: { label: 'Proximity', value: 'Same-Day' } },
    { id: 'h_auto_6', lat: 47.6, lng: 19.0, hub: 'BUDAPEST, HUNGARY', title: 'Eastern EU Assembly Hub', companies: [{ name: 'Audi Hungaria', website: 'https://audi.hu/' }, { name: 'Knorr-Bremse', website: 'https://www.knorr-bremse.com/' }], desc: 'Cost-effective alternative to Western Europe for precision auto parts.', customs: { hts_code: '8708.29', duty_rate: '0% (Intra-EU)', compliance_note: 'EU origin certified.' }, esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Increasing EV focus.' }, logistics: { port_wait_days: 1, freight_cost_estimate: '$1.2k/Truck' }, industry_kpi: { label: 'Labor Cost', value: 'Competitive' } }
  ],

  // 2. TECH & ELECTRONICS (Microchips, PCBs, Glass Panels, Displays)
  electronics: [
    { id: 'h_tech_1', lat: 24.8, lng: 120.9, hub: 'HSINCHU, TAIWAN', title: 'Global Semiconductor Nexus', companies: [{ name: 'TSMC', website: 'https://www.tsmc.com/' }, { name: 'Foxconn', website: 'https://www.foxconn.com/' }, { name: 'MediaTek', website: 'https://www.mediatek.com/' }], desc: 'The absolute center of global advanced semiconductor manufacturing.', customs: { hts_code: '8542.31', duty_rate: '0% (ITA)', compliance_note: 'Export controls on advanced nodes apply.' }, esg: { carbon_footprint: 'High', ethical_rating: 'A-', sustainability_note: 'Massive water consumption is a risk.' }, logistics: { port_wait_days: 3, freight_cost_estimate: '$8.5k/Air' }, industry_kpi: { label: 'Node Size', value: '3nm/2nm' } },
    { id: 'h_tech_2', lat: 37.3, lng: 127.0, hub: 'GYEONGGI, S. KOREA', title: 'Memory & Display Cluster', companies: [{ name: 'Samsung Elec', website: 'https://www.samsung.com/' }, { name: 'SK Hynix', website: 'https://www.skhynix.com/' }], desc: 'World leader in memory chips (DRAM/NAND) and OLED display panels.', customs: { hts_code: '8542.32', duty_rate: '0% (KORUS)', compliance_note: 'KORUS FTA applies for US imports.' }, esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Aggressive carbon neutral targets.' }, logistics: { port_wait_days: 2, freight_cost_estimate: '$4.1k/Sea' }, industry_kpi: { label: 'Yield Rate', value: '> 95%' } },
    { id: 'h_tech_3', lat: 22.5, lng: 113.9, hub: 'SHENZHEN, CHINA', title: 'Hardware Innovation Bay', companies: [{ name: 'BYD Electronics', website: 'https://www.byd.com/' }, { name: 'Huawei', website: 'https://www.huawei.com/' }], desc: 'Unmatched speed and scale for consumer electronics assembly and PCBs.', customs: { hts_code: '8517.70', duty_rate: '25% (Sec 301)', compliance_note: 'Check entity list restrictions.' }, esg: { carbon_footprint: 'High', ethical_rating: 'B-', sustainability_note: 'Labor audit required.' }, logistics: { port_wait_days: 4, freight_cost_estimate: '$3.5k/FEU' }, industry_kpi: { label: 'Prototyping', value: '48 Hours' } },
    { id: 'h_tech_4', lat: 33.3, lng: -111.9, hub: 'ARIZONA, USA', title: 'Silicon Desert', companies: [{ name: 'Intel', website: 'https://www.intel.com/' }, { name: 'NXP', website: 'https://www.nxp.com/' }], desc: 'Rapidly growing domestic US semiconductor manufacturing hub (CHIPS Act).', customs: { hts_code: '8542.31', duty_rate: '0%', compliance_note: 'Domestic Origin.' }, esg: { carbon_footprint: 'Medium', ethical_rating: 'A+', sustainability_note: 'Water reclamation technology deployed.' }, logistics: { port_wait_days: 0, freight_cost_estimate: '$1.2k/Ground' }, industry_kpi: { label: 'Security', value: 'ITAR Compliant' } },
    { id: 'h_tech_5', lat: 10.8, lng: 106.6, hub: 'HO CHI MINH, VIETNAM', title: 'China+1 Assembly Hub', companies: [{ name: 'Pegatron', website: 'https://www.pegatroncorp.com/' }, { name: 'Compal', website: 'https://www.compal.com/' }], desc: 'Primary alternative destination for electronics assembly moving out of China.', customs: { hts_code: '8517.70', duty_rate: '0% (MFN)', compliance_note: 'Origin verification critical.' }, esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'Rapidly improving labor standards.' }, logistics: { port_wait_days: 6, freight_cost_estimate: '$4.0k/FEU' }, industry_kpi: { label: 'Cost Savings', value: '15% vs CN' } },
    { id: 'h_tech_6', lat: 5.4, lng: 100.3, hub: 'PENANG, MALAYSIA', title: 'Backend Testing/Packaging', companies: [{ name: 'ASE Group', website: 'https://www.aseglobal.com/' }, { name: 'Infineon', website: 'https://www.infineon.com/' }], desc: 'Global hub for semiconductor OSAT (Outsourced Semiconductor Assembly and Test).', customs: { hts_code: '8542.90', duty_rate: '0% (ITA)', compliance_note: 'Standard tech compliance.' }, esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Stable green grid.' }, logistics: { port_wait_days: 3, freight_cost_estimate: '$3.9k/Sea' }, industry_kpi: { label: 'OSAT Volume', value: '13% Global' } }
  ],

  // 3. FOOD & AGRICULTURE (Beef, Wheat, Soy, Produce, Ingredients)
  agriculture: [
    { id: 'h_ag_1', lat: 41.8, lng: -88.1, hub: 'ILLINOIS, USA', title: 'Midwest Meat Processing Hub', companies: [{ name: 'OSI Group', website: 'https://www.osigroup.com/' }, { name: 'Cargill', website: 'https://www.cargill.com/' }, { name: 'Tyson', website: 'https://www.tysonfoods.com/' }], desc: 'Primary supplier cluster for North American QSR chains (e.g., McDonald\'s partners).', customs: { hts_code: '0202.30', duty_rate: '0% (Domestic)', compliance_note: 'USDA inspected. FSMA compliant.' }, esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Regenerative grazing initiatives active.' }, logistics: { port_wait_days: 0, freight_cost_estimate: '$1.5k/Reefer' }, industry_kpi: { label: 'Capacity', value: '10k Tons/Day' } },
    { id: 'h_ag_2', lat: -15.6, lng: -56.1, hub: 'MATO GROSSO, BRAZIL', title: 'Global Protein & Soy Nexus', companies: [{ name: 'JBS S.A.', website: 'https://jbs.com.br/' }, { name: 'Marfrig', website: 'https://www.marfrig.com.br/' }], desc: 'World\'s largest exporter of beef and soy products. High volume capacity.', customs: { hts_code: '0202.30', duty_rate: '26.4% (Quota)', compliance_note: 'Check TRQ (Tariff Rate Quota) availability.' }, esg: { carbon_footprint: 'High', ethical_rating: 'C', sustainability_note: 'Amazon deforestation monitoring required.' }, logistics: { port_wait_days: 8, freight_cost_estimate: '$5.5k/Reefer' }, industry_kpi: { label: 'Traceability', value: 'Tier-2' } },
    { id: 'h_ag_3', lat: -34.6, lng: -58.3, hub: 'PAMPAS, ARGENTINA', title: 'Premium Grass-Fed Beef', companies: [{ name: 'Swift Argentina', website: 'https://www.swift.com.ar/' }, { name: 'ArreBeef', website: 'https://www.arrebeef.com/' }], desc: 'Renowned for high-quality, grass-fed beef and agricultural exports.', customs: { hts_code: '0202.30', duty_rate: '26.4% (Quota)', compliance_note: 'Subject to export tax policies.' }, esg: { carbon_footprint: 'Low', ethical_rating: 'B+', sustainability_note: 'Natural grazing, lower emissions.' }, logistics: { port_wait_days: 6, freight_cost_estimate: '$5.0k/Reefer' }, industry_kpi: { label: 'Quality Grade', value: 'Prime' } },
    { id: 'h_ag_4', lat: 51.5, lng: 5.0, hub: 'BRABANT, NETHERLANDS', title: 'EU Agri-Tech Hub', companies: [{ name: 'Vion Food', website: 'https://www.vionfoodgroup.com/' }, { name: 'FrieslandCampina', website: 'https://www.frieslandcampina.com/' }], desc: 'Highly automated, high-yield European agricultural and processing hub.', customs: { hts_code: '0202.30', duty_rate: '12.8% + €303/100kg', compliance_note: 'Strict EU sanitary/phytosanitary rules.' }, esg: { carbon_footprint: 'Low', ethical_rating: 'AA', sustainability_note: 'Global leader in sustainable farming tech.' }, logistics: { port_wait_days: 1, freight_cost_estimate: '$2.8k/Reefer' }, industry_kpi: { label: 'Automation', value: '90%' } },
    { id: 'h_ag_5', lat: -37.8, lng: 144.9, hub: 'VICTORIA, AUSTRALIA', title: 'APAC Premium Protein Export', companies: [{ name: 'Teys Australia', website: 'https://teysgroup.com/' }, { name: 'AACo', website: 'https://aaco.com.au/' }], desc: 'Major supplier of premium beef to Asian markets (Japan, Korea, China).', customs: { hts_code: '0202.30', duty_rate: '0% (AUSFTA)', compliance_note: 'AUSFTA origin rules apply.' }, esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Drought resilience programs active.' }, logistics: { port_wait_days: 4, freight_cost_estimate: '$4.2k/Reefer' }, industry_kpi: { label: 'Export Cert', value: 'MSA Graded' } }
  ],

  // 4. METALS & MINING (Lithium, Copper, Steel, Aluminum)
  metals: [
    { id: 'h_met_1', lat: -23.5, lng: -68.4, hub: 'ATACAMA, CHILE', title: 'Global Lithium & Copper Core', companies: [{ name: 'SQM', website: 'https://www.sqm.com/' }, { name: 'Codelco', website: 'https://www.codelco.com/' }, { name: 'Albemarle', website: 'https://www.albemarle.com/' }], desc: 'The Saudi Arabia of Lithium. Primary source of EV battery-grade lithium carbonate and copper.', customs: { hts_code: '2836.91', duty_rate: '0% (US-Chile FTA)', compliance_note: 'Strategic mineral export regulations.' }, esg: { carbon_footprint: 'Low', ethical_rating: 'B', sustainability_note: 'Severe water rights conflicts with local indigenous groups.' }, logistics: { port_wait_days: 5, freight_cost_estimate: '$3.5k/FEU' }, industry_kpi: { label: 'Purity', value: '99.5% Li2CO3' } },
    { id: 'h_met_2', lat: -21.1, lng: 116.0, hub: 'PILBARA, AUSTRALIA', title: 'Iron Ore & Hard Rock Lithium', companies: [{ name: 'BHP', website: 'https://www.bhp.com/' }, { name: 'Rio Tinto', website: 'https://www.riotinto.com/' }, { name: 'Pilbara Minerals', website: 'https://pilbaraminerals.com.au/' }], desc: 'Massive scale iron ore and spodumene (hard rock lithium) extraction.', customs: { hts_code: '2601.11', duty_rate: '0% (AUSFTA)', compliance_note: 'Clean origin.' }, esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Transitioning mining fleets to electric/hydrogen.' }, logistics: { port_wait_days: 3, freight_cost_estimate: '$2.9k/Bulk' }, industry_kpi: { label: 'Volume', value: '800M Tons/Yr' } },
    { id: 'h_met_3', lat: 39.9, lng: 116.4, hub: 'HEBEI, CHINA', title: 'Steel Processing Mega-Hub', companies: [{ name: 'HBIS Group', website: 'http://www.hbisco.com/' }, { name: 'Baowu Steel', website: 'http://www.baowugroup.com/' }], desc: 'The largest concentration of steel and rare earth processing capacity in the world.', customs: { hts_code: '7208.10', duty_rate: '25% (Sec 232)', compliance_note: 'Subject to Section 232 National Security tariffs.' }, esg: { carbon_footprint: 'Very High', ethical_rating: 'C', sustainability_note: 'Severe air pollution. Heavy reliance on coal power.' }, logistics: { port_wait_days: 4, freight_cost_estimate: '$4.0k/Bulk' }, industry_kpi: { label: 'Capacity', value: 'Dominant' } },
    { id: 'h_met_4', lat: 40.4, lng: -79.9, hub: 'PITTSBURGH, USA', title: 'US Domestic Steel/Alum', companies: [{ name: 'US Steel', website: 'https://www.ussteel.com/' }, { name: 'Alcoa', website: 'https://www.alcoa.com/' }], desc: 'Domestic supplier for high-grade steel and aluminum for infrastructure and defense.', customs: { hts_code: '7208', duty_rate: '0%', compliance_note: 'Buy America Act compliant.' }, esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Electric arc furnace (EAF) adoption growing.' }, logistics: { port_wait_days: 0, freight_cost_estimate: '$1.0k/Rail' }, industry_kpi: { label: 'Melt Origin', value: '100% US' } }
  ],

  // 5. TEXTILES & APPAREL (Clothing, Shoes, Cotton, Leather)
  textiles: [
    { id: 'h_tex_1', lat: 23.8, lng: 90.4, hub: 'DHAKA, BANGLADESH', title: 'RMG (Ready-Made Garments) Hub', companies: [{ name: 'Ha-Meem Group', website: 'https://www.hameemgroup.net/' }, { name: 'Beximco', website: 'https://www.beximco.com/' }], desc: 'World\'s 2nd largest apparel exporter. High volume, low cost fast fashion manufacturing.', customs: { hts_code: '6109.10', duty_rate: '16.5% (MFN)', compliance_note: 'Strict labor audits required (Accord/Alliance).' }, esg: { carbon_footprint: 'High', ethical_rating: 'B-', sustainability_note: 'Significant improvements post-Rana Plaza, but risks remain.' }, logistics: { port_wait_days: 6, freight_cost_estimate: '$3.2k/FEU' }, industry_kpi: { label: 'Cost/Unit', value: 'Extremely Low' } },
    { id: 'h_tex_2', lat: 10.8, lng: 106.6, hub: 'HO CHI MINH, VIETNAM', title: 'Performance Apparel & Footwear', companies: [{ name: 'Pou Chen', website: 'https://www.pouchen.com/' }, { name: 'Vinatex', website: 'https://vinatex.com.vn/' }], desc: 'Premium athletic wear and footwear manufacturing (Nike/Adidas main hub).', customs: { hts_code: '6404.11', duty_rate: '20% (MFN)', compliance_note: 'Verify forced labor chain of custody.' }, esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'Good factory conditions, high renewable adoption.' }, logistics: { port_wait_days: 4, freight_cost_estimate: '$3.8k/FEU' }, industry_kpi: { label: 'Quality', value: 'High' } },
    { id: 'h_tex_3', lat: 41.0, lng: 28.9, hub: 'ISTANBUL, TURKEY', title: 'Euro-Nearshore Fashion', companies: [{ name: 'LC Waikiki', website: 'https://corporate.lcwaikiki.com/' }, { name: 'Mavi', website: 'https://www.mavi.com/' }], desc: 'Fast turnaround, high-quality cotton and denim production for the European market.', customs: { hts_code: '6203.42', duty_rate: '0% (EU Customs Union)', compliance_note: 'Rapid border clearance to EU.' }, esg: { carbon_footprint: 'Low', ethical_rating: 'A-', sustainability_note: 'Organic cotton sourcing available.' }, logistics: { port_wait_days: 2, freight_cost_estimate: '$1.5k/Truck' }, industry_kpi: { label: 'Lead Time', value: '2-3 Weeks' } },
    { id: 'h_tex_4', lat: 21.0, lng: 72.8, hub: 'GUJARAT, INDIA', title: 'Global Cotton & Textile Mill', companies: [{ name: 'Arvind Ltd', website: 'https://www.arvind.com/' }, { name: 'Welspun', website: 'https://www.welspunindia.com/' }], desc: 'Massive scale vertical integration from raw cotton spinning to finished home textiles.', customs: { hts_code: '5208.11', duty_rate: '10% (MFN)', compliance_note: 'Ensure no Xinjiang cotton blending.' }, esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'Heavy water usage in dyeing processes.' }, logistics: { port_wait_days: 5, freight_cost_estimate: '$3.5k/FEU' }, industry_kpi: { label: 'Integration', value: 'Vertical' } }
  ]
}

// Helper to determine category from user query
export function categorizeQuery(query) {
  const q = query.toLowerCase()
  if (q.match(/car|auto|vehicle|visor|seat|windshield|engine|brake|tire/)) return 'automotive'
  if (q.match(/chip|semi|wafer|pcb|glass|display|screen|electronics|computer|phone|apple/)) return 'electronics'
  if (q.match(/beef|meat|patty|wheat|soy|food|agri|corn|chicken|mcdonald/)) return 'agriculture'
  if (q.match(/lithium|steel|copper|aluminum|iron|metal|rare earth|mining/)) return 'metals'
  if (q.match(/shirt|shoe|cotton|leather|apparel|textile|clothing|garment/)) return 'textiles'
  
  // Default fallback if unknown
  return 'electronics'
}

export const TARIFF_DATABASE = {
  // Automotive
  'visor': { code: '8708.29.50', base: '2.5%', notes: 'Auto body parts. Sec 301 (25%) if China origin.' },
  'seat': { code: '9401.20.00', base: '0%', notes: 'Seats for motor vehicles.' },
  'windshield': { code: '7007.21.10', base: '2.5%', notes: 'Laminated safety glass.' },
  'engine': { code: '8407.34.05', base: '2.5%', notes: 'Reciprocating piston engines.' },
  
  // Electronics
  'microchip': { code: '8542.31.00', base: '0% (ITA)', notes: 'Processors and controllers. Free under Info Tech Agreement.' },
  'pcb': { code: '8534.00.00', base: '0% (ITA)', notes: 'Printed circuits.' },
  'display': { code: '8524.11.00', base: '0%', notes: 'Liquid crystal devices.' },
  'glass panel': { code: '7007.19.00', base: '5%', notes: 'Toughened safety glass.' },
  
  // Agriculture
  'beef': { code: '0202.30.50', base: '26.4%', notes: 'Frozen boneless beef (subject to TRQ quota limits).' },
  'wheat': { code: '1001.99.00', base: '$0.35/kg', notes: 'Other wheat and meslin.' },
  'soybean': { code: '1201.90.00', base: '0%', notes: 'Soya beans, whether or not broken.' },
  
  // Metals
  'lithium': { code: '2836.91.00', base: '3.7%', notes: 'Lithium carbonates. Duty free from Chile/Australia (FTA).' },
  'steel': { code: '7208.10.15', base: '0% Base + 25%', notes: 'Subject to 25% Section 232 National Security Tariff.' },
  'copper': { code: '7403.11.00', base: '1.0%', notes: 'Refined copper cathodes.' },
  
  // Textiles
  'shirt': { code: '6109.10.00', base: '16.5%', notes: 'T-shirts, knitted or crocheted, of cotton.' },
  'shoes': { code: '6404.11.00', base: '20.0%', notes: 'Sports footwear with rubber soles.' },
  'cotton': { code: '5201.00.00', base: '$0.31/kg', notes: 'Cotton, not carded or combed. WRO restrictions on Xinjiang origin.' }
}

export function lookupTariff(query) {
  const q = query.toLowerCase()
  for (const [key, data] of Object.entries(TARIFF_DATABASE)) {
    if (q.includes(key)) return { hts: data.code, duty: data.base, notes: data.notes }
  }
  return { hts: '8542.31.00', duty: '0% (ITA)', notes: 'Defaulted to electronic integrated circuits. Info Tech Agreement applies.' }
}

export function calculateRisk(origin, destination) {
  // Deterministic risk scoring based on keywords
  const o = origin.toLowerCase()
  const d = destination.toLowerCase()
  
  let baseScore = 35
  let geo = 10, weather = 10, labor = 10, infra = 5
  
  // Origin Penalties
  if (o.includes('china') || o.includes('shanghai') || o.includes('shenzhen')) {
    geo = 45; // Trade war, tariffs, Taiwan tensions
    infra = 5;
  } else if (o.includes('taiwan') || o.includes('hsinchu')) {
    geo = 40; // Geopolitical blockade risk
    weather = 25; // Typhoon risk
  } else if (o.includes('mexico') || o.includes('monterrey')) {
    geo = 10;
    infra = 25; // Cartel violence affecting highways, border wait times
  } else if (o.includes('brazil')) {
    infra = 30; // Poor road infra to ports
    labor = 20; // Strike risk
  } else if (o.includes('europe') || o.includes('germany')) {
    geo = 20; // Ukraine war proximity
    labor = 35; // High strike probability (dockworkers)
  }

  // Destination Penalties
  if (d.includes('usa') || d.includes('los angeles') || d.includes('california')) {
    infra += 15; // LA/LB port congestion
    labor += 20; // ILWU union strike risks
  }

  const overall = Math.min(99, Math.round((geo * 1.5 + weather + labor * 1.2 + infra) / 4.7))
  
  return {
    overall,
    breakdown: {
      geopolitical: geo,
      weather: weather,
      labor_strikes: labor,
      infrastructure: infra
    },
    narrative: `Risk profile heavily weighted by ${geo > 30 ? 'geopolitical tensions' : labor > 25 ? 'labor union actions' : 'infrastructure chokepoints'}. Recommend building +2 weeks of safety stock buffer.`
  }
}
