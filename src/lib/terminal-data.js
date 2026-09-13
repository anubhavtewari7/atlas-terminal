// ── terminal-data.js ────────────────────────────────────────────────────────
// All static reference data for the Nautilus terminal.
// Pure data + pure utility functions -- no React, no side effects.
// Imported by page.js and any future sub-modules that need it.

// ── City / region → UTC offset (standard time). Fractional hours for half-hour
// zones. Keyed by lowercase substrings that appear in hub names.
export const HUB_UTC_OFFSETS = {
  // India (IST = UTC+5:30)
  'mumbai':5.5,'bangalore':5.5,'chennai':5.5,'delhi':5.5,'pune':5.5,
  'hyderabad':5.5,'ahmedabad':5.5,'kolkata':5.5,'surat':5.5,'india':5.5,
  // Nepal, Bangladesh, Myanmar, Sri Lanka
  'kathmandu':5.75,'nepal':5.75,'dhaka':6,'chittagong':6,'bangladesh':6,
  'colombo':5.5,'sri lanka':5.5,'yangon':6.5,'myanmar':6.5,
  // China (all on CST = UTC+8)
  'beijing':8,'shanghai':8,'guangzhou':8,'shenzhen':8,'dongguan':8,'chengdu':8,
  'wuhan':8,'tianjin':8,'nanjing':8,'hangzhou':8,'yiwu':8,'qingdao':8,
  'ningbo':8,'zhengzhou':8,'baotou':8,'suzhou':8,'foshan':8,'china':8,
  // East Asia
  'tokyo':9,'osaka':9,'nagoya':9,'japan':9,
  'seoul':9,'busan':9,'incheon':9,'korea':9,
  'taipei':8,'kaohsiung':8,'taiwan':8,
  // Southeast Asia
  'bangkok':7,'thailand':7,'laem chabang':7,
  'ho chi minh':7,'hanoi':7,'hai phong':7,'vietnam':7,'binh duong':7,
  'jakarta':7,'surabaya':7,'indonesia':7,'batam':7,
  'kuala lumpur':8,'penang':8,'malaysia':8,'johor':8,
  'singapore':8,
  'manila':8,'cebu':8,'philippines':8,
  'phnom penh':7,'cambodia':7,
  // Central / South Asia
  'karachi':5,'lahore':5,'pakistan':5,'tehran':3.5,'iran':3.5,
  'kabul':4.5,'afghanistan':4.5,'tashkent':5,'uzbekistan':5,
  // Middle East
  'dubai':4,'abu dhabi':4,'uae':4,'emirates':4,'sharjah':4,
  'riyadh':3,'jeddah':3,'saudi':3,'dammam':3,
  'istanbul':3,'turkey':3,'ankara':3,
  'cairo':2,'egypt':2,'alexandria':2,
  'tel aviv':2,'israel':2,'amman':2,'jordan':2,
  'doha':3,'qatar':3,'kuwait':3,'bahrain':3,'oman':4,
  // Europe
  'berlin':1,'munich':1,'hamburg':1,'frankfurt':1,'germany':1,
  'paris':1,'france':1,'lyon':1,'toulouse':1,
  'amsterdam':1,'rotterdam':1,'netherlands':1,
  'brussels':1,'antwerp':1,'belgium':1,
  'milan':1,'rome':1,'italy':1,'genoa':1,'naples':1,
  'madrid':1,'barcelona':1,'spain':1,'bilbao':1,
  'warsaw':1,'lodz':1,'poland':1,'krakow':1,'poznan':1,
  'prague':1,'czech':1,'brno':1,
  'budapest':1,'hungary':1,'bucharest':2,'romania':2,
  'vienna':1,'austria':1,'zurich':1,'switzerland':1,'bern':1,
  'stockholm':1,'sweden':1,'gothenburg':1,
  'helsinki':2,'finland':2,'oslo':1,'norway':1,
  'london':0,'manchester':0,'birmingham':0,'uk':0,'britain':0,'bristol':0,
  // Africa
  'nairobi':3,'kenya':3,'addis ababa':3,'ethiopia':3,
  'lagos':1,'nigeria':1,'accra':0,'ghana':0,
  'johannesburg':2,'cape town':2,'durban':2,'south africa':2,
  'casablanca':1,'morocco':1,'tangier':1,
  'dar es salaam':3,'tanzania':3,
  // Americas
  'toronto':-5,'montreal':-5,'vancouver':-8,'canada':-5,
  'new york':-5,'los angeles':-8,'chicago':-6,'houston':-6,'dallas':-6,
  'san jose':-8,'seattle':-8,'boston':-5,'atlanta':-5,'miami':-5,'usa':-5,
  'mexico city':-6,'guadalajara':-6,'monterrey':-6,'mexico':-6,'tijuana':-8,
  'sao paulo':-3,'rio de janeiro':-3,'brazil':-3,'manaus':-4,
  'bogota':-5,'colombia':-5,'medellin':-5,
  'lima':-5,'peru':-5,'santiago':-4,'chile':-4,
  'buenos aires':-3,'argentina':-3,'cordoba':-3,
  // Pacific
  'sydney':10,'melbourne':10,'brisbane':10,'australia':10,
  'auckland':12,'new zealand':12,
}

// Returns open/closed status + formatted local time for a hub.
// Falls back to longitude-based UTC offset when the hub name has no match.
export function hubDayStatus(hubName, lng) {
  const lname = (hubName || '').toLowerCase()
  let utcOffset = null
  for (const [key, offset] of Object.entries(HUB_UTC_OFFSETS)) {
    if (lname.includes(key)) { utcOffset = offset; break }
  }
  if (utcOffset === null) {
    if (lng == null) return null
    utcOffset = Math.round((lng / 15) * 2) / 2
  }
  const now        = new Date()
  const local      = new Date(now.getTime() + utcOffset * 3600 * 1000)
  const h          = local.getUTCHours()
  const day        = local.getUTCDay()
  const isWeekday  = day >= 1 && day <= 5
  const isWorkHour = h >= 8  && h < 18
  const h12        = h % 12 || 12
  const ampm       = h >= 12 ? 'PM' : 'AM'
  return {
    open:      isWeekday && isWorkHour,
    localTime: `${h12}:${String(local.getUTCMinutes()).padStart(2, '0')} ${ampm}`,
    icon:      h >= 6 && h < 20 ? '☀' : '🌙',
  }
}

// ── Global trade chokepoints ─────────────────────────────────────────────────
// Status reflects current geopolitical conditions (2026).
export const CHOKEPOINTS = [
  { id:'bab',     name:'Bab-el-Mandeb',    lat:12.5,  lng:43.5,   status:'CRITICAL', statusColor:'#ef4444',
    regions:['asia','india','me'],
    desc:'Active Houthi missile corridor. Most carriers avoiding. Full Cape rerouting mandatory. (+12-14d, +$2,500/FEU)' },
  { id:'suez',    name:'Suez Canal',        lat:30.7,  lng:32.3,   status:'ELEVATED', statusColor:'#f97316',
    regions:['asia','india','me'],
    desc:'Northbound traffic at risk due to Red Sea threat. Many carriers diverting via Cape of Good Hope.' },
  { id:'taiwan',  name:'Taiwan Strait',     lat:24.5,  lng:120.0,  status:'ELEVATED', statusColor:'#f97316',
    regions:['asia'],
    desc:'PLA military exercises ongoing. Vessel diversions via Luzon Strait adding 1-2 transit days.' },
  { id:'hormuz',  name:'Strait of Hormuz',  lat:26.6,  lng:56.2,   status:'MODERATE', statusColor:'#f59e0b',
    regions:['me','india'],
    desc:'Iran tensions persist. Critical for Gulf LNG and crude oil tanker traffic. Monitor closely.' },
  { id:'panama',  name:'Panama Canal',      lat:9.1,   lng:-79.7,  status:'MODERATE', statusColor:'#f59e0b',
    regions:['americas'],
    desc:'Drought-induced draft restrictions reducing daily transits by ~30%. Expect 5-7 day queue delays.' },
  { id:'malacca', name:'Strait of Malacca', lat:2.5,   lng:101.3,  status:'NORMAL',   statusColor:'#10b981',
    regions:['asia'],
    desc:'Operational. Low piracy risk. 90,000+ vessels/year. Primary Asia-to-West artery -- monitor.' },
  { id:'cape',    name:'Cape of Good Hope', lat:-34.4, lng:18.5,   status:'OPEN',     statusColor:'#10b981',
    regions:['asia','me','india'],
    desc:'Active Suez bypass corridor. Adds 12-14 days and ~$2,500/FEU vs Suez route. Currently clear.' },
  { id:'dover',   name:'English Channel',   lat:51.1,  lng:1.4,    status:'NORMAL',   statusColor:'#10b981',
    regions:['europe','asia','me'],
    desc:'Stable. High vessel density. Weather delays possible in winter months.' },
]

// Returns chokepoints most relevant to a hub based on its longitude.
export function getRelevantChokepoints(hub) {
  if (!hub?.lng) return []
  const lng = hub.lng
  let region
  if      (lng >  100) region = 'asia'
  else if (lng >   60) region = 'india'
  else if (lng >   25) region = 'me'
  else if (lng < -30)  region = 'americas'
  else                 region = 'europe'
  return CHOKEPOINTS.filter(c => c.regions.includes(region))
}

// ── Port-level risk scores & active alerts ───────────────────────────────────
// Score 0-100 (higher = safer). Composite: WB country stability + port-specific
// factors (labor risk, congestion, weather, infrastructure, geopolitical proximity).
export const PORT_RISK = {
  // ── USA East Coast ──
  'New York / Newark':        { score:52, alerts:[{ lvl:'warn', msg:'Chronic congestion -- avg vessel dwell +1.5 days' }] },
  'Baltimore':                { score:55, alerts:[{ lvl:'warn', msg:'Francis Scott Key Bridge collapse reduced capacity; terminal rerouting ongoing' }] },
  'Savannah':                 { score:63, alerts:[] },
  'Charleston':               { score:65, alerts:[] },
  'Miami':                    { score:57, alerts:[{ lvl:'info', msg:'Hurricane exposure Jun-Nov; have contingency routing' }] },
  'Philadelphia':             { score:54, alerts:[] },
  // ── USA West Coast ──
  'Los Angeles / Long Beach': { score:46, alerts:[{ lvl:'warn', msg:'ILWU labor contract -- periodic slowdowns & work-to-rule risk' }, { lvl:'warn', msg:'Congestion: avg vessel anchor wait 3-5 days at peak' }] },
  'Seattle / Tacoma':         { score:57, alerts:[{ lvl:'info', msg:'Winter weather delays Nov-Feb; fog disruptions' }] },
  'Oakland / San Francisco':  { score:54, alerts:[{ lvl:'info', msg:'Outer Harbor infrastructure constraints; berth productivity below benchmark' }] },
  // ── USA Gulf Coast ──
  'Houston':                  { score:50, alerts:[{ lvl:'warn', msg:'Hurricane/tropical storm exposure Jun-Nov (Cat 3+ landfall history)' }] },
  'New Orleans':              { score:46, alerts:[{ lvl:'warn', msg:'Hurricane exposure Jun-Nov' }, { lvl:'info', msg:'Mississippi River low-water risk in drought years -- barge delays' }] },
  'Tampa':                    { score:58, alerts:[{ lvl:'info', msg:'Hurricane exposure Jun-Nov' }] },
  // ── USA Great Lakes ──
  'Detroit':                  { score:50, alerts:[] },
  'Chicago':                  { score:51, alerts:[{ lvl:'info', msg:'Inland port -- high trucking dependency; I-290/I-94 corridor congestion' }] },
  'Cleveland':                { score:49, alerts:[] },
  'Pittsburgh':               { score:47, alerts:[{ lvl:'info', msg:'River port -- Ohio River low-water periods cause barge delays' }] },
  // ── Canada ──
  'Vancouver':                { score:64, alerts:[{ lvl:'info', msg:'ILWU Canada labor tensions -- historical rotating strikes' }] },
  'Prince Rupert':            { score:67, alerts:[] },
  'Halifax':                  { score:70, alerts:[] },
  'Montreal / St. Lawrence':  { score:68, alerts:[{ lvl:'info', msg:'Winter ice restrictions Jan-Mar; icebreaker assistance required' }] },
  'Toronto':                  { score:70, alerts:[] },
  'Winnipeg':                 { score:69, alerts:[] },
  // ── Mexico ──
  'Monterrey':                { score:33, alerts:[{ lvl:'high', msg:'Organized crime activity in Nuevo León -- cargo theft elevated' }] },
  'Juárez':                   { score:25, alerts:[{ lvl:'high', msg:'High cartel activity -- border crossing security incidents' }, { lvl:'warn', msg:'US-MX border crossing delays unpredictable' }] },
  'Tijuana':                  { score:28, alerts:[{ lvl:'high', msg:'Cargo theft risk; cartel-related port disruptions reported' }] },
  'Manzanillo':               { score:36, alerts:[{ lvl:'warn', msg:'Cartel influence in Colima state -- port vicinity security incidents' }] },
  'Lázaro Cárdenas':          { score:30, alerts:[{ lvl:'high', msg:'Significant cartel presence; cargo extortion documented' }, { lvl:'warn', msg:'Labor unrest history at terminal' }] },
  'Veracruz':                 { score:38, alerts:[{ lvl:'warn', msg:'Port corruption risk -- customs delays above average' }] },
  'Altamira':                 { score:36, alerts:[] },
  // ── China ──
  'Shenzhen':                 { score:40, alerts:[{ lvl:'warn', msg:'US Section 301 tariffs -- 25%+ on most goods; verify HTS' }, { lvl:'info', msg:'Geopolitical risk: Taiwan Strait tension scenarios' }] },
  'Guangzhou':                { score:41, alerts:[{ lvl:'warn', msg:'Section 301 tariffs active' }] },
  'Hong Kong':                { score:38, alerts:[{ lvl:'warn', msg:'National Security Law -- reduced autonomous trade status' }, { lvl:'warn', msg:'US no longer grants Hong Kong preferential treatment (same tariffs as China)' }] },
  'Shanghai':                 { score:41, alerts:[{ lvl:'warn', msg:'Section 301 tariffs; lockdown disruption history -- assess contingency ports' }] },
  'Ningbo':                   { score:42, alerts:[{ lvl:'warn', msg:'Section 301 tariffs; typhoon exposure Jul-Sep' }] },
  'Suzhou':                   { score:43, alerts:[{ lvl:'info', msg:'Inland industrial hub -- road/rail to Ningbo/Shanghai required' }] },
  'Tianjin':                  { score:40, alerts:[{ lvl:'info', msg:'Proximity to Beijing -- heightened inspection activity reported' }] },
  'Dalian':                   { score:41, alerts:[{ lvl:'info', msg:'Winter ice risk Nov-Mar; icebreaker-assisted departures' }] },
  'Qingdao':                  { score:42, alerts:[] },
  // ── Japan ──
  'Tokyo / Yokohama':         { score:68, alerts:[{ lvl:'info', msg:'Seismic zone -- earthquake contingency protocols recommended' }] },
  'Chiba':                    { score:69, alerts:[] },
  'Nagoya':                   { score:71, alerts:[{ lvl:'info', msg:'Seismic exposure; Nankai Trough scenario in long-range risk planning' }] },
  'Aichi':                    { score:72, alerts:[] },
  'Osaka':                    { score:69, alerts:[] },
  'Kobe':                     { score:68, alerts:[] },
  // ── South Korea ──
  'Busan':                    { score:60, alerts:[{ lvl:'info', msg:'North Korea ballistic missile tests -- intermittent NOTAM disruptions' }] },
  'Ulsan':                    { score:58, alerts:[{ lvl:'info', msg:'Heavy industrial port -- congestion during peak auto export season' }] },
  'Incheon':                  { score:59, alerts:[] },
  'Pyeongtaek':               { score:58, alerts:[] },
  'Seoul':                    { score:57, alerts:[] },
  // ── Taiwan ──
  'Taipei / Keelung':         { score:62, alerts:[{ lvl:'warn', msg:'PRC military exercises -- periodic strait disruptions & airspace closures' }] },
  'Taoyuan':                  { score:63, alerts:[{ lvl:'info', msg:'Air freight hub; ground transport congestion near TSMC fabs' }] },
  'Hsinchu':                  { score:64, alerts:[] },
  'Taichung':                 { score:63, alerts:[] },
  'Kaohsiung':                { score:62, alerts:[{ lvl:'warn', msg:'Closest major port to Taiwan Strait flashpoint; contingency routing advised' }] },
  'Tainan':                   { score:63, alerts:[] },
  // ── Vietnam ──
  'Ho Chi Minh City':         { score:50, alerts:[{ lvl:'info', msg:'Ongoing anti-corruption crackdowns -- customs processing slower' }] },
  'Binh Duong':               { score:51, alerts:[] },
  'Dong Nai':                 { score:50, alerts:[] },
  'Hanoi':                    { score:51, alerts:[] },
  'Hai Phong':                { score:50, alerts:[{ lvl:'info', msg:'Typhoon exposure May-Nov; port closures 2-3x/year on average' }] },
  // ── India ──
  'Bangalore':                { score:30, alerts:[{ lvl:'info', msg:'Landlocked -- Bengaluru to Chennai/JNPT adds 1-2 transit days' }] },
  'Chennai':                  { score:28, alerts:[{ lvl:'info', msg:'Cyclone risk Oct-Dec (Bay of Bengal)' }] },
  'Mumbai / JNPT':            { score:29, alerts:[{ lvl:'warn', msg:'Port congestion at JNPT -- avg dwell 4+ days' }, { lvl:'info', msg:'Monsoon disruptions Jun-Sep' }] },
  'Pune':                     { score:29, alerts:[] },
  'Mundra':                   { score:30, alerts:[] },
  'Delhi / Noida':            { score:27, alerts:[{ lvl:'info', msg:'Landlocked -- requires ICD to Mundra/JNPT (3-4 days)' }] },
  'Jaipur':                   { score:27, alerts:[] },
  // ── Singapore ──
  'Port of Singapore':        { score:84, alerts:[] },
  'Jurong Island':            { score:83, alerts:[] },
  'Changi':                   { score:84, alerts:[] },
  // ── Germany ──
  'Hamburg':                  { score:68, alerts:[{ lvl:'info', msg:'GDL rail strikes periodic -- alternate road routing needed' }] },
  'Bremen / Bremerhaven':     { score:67, alerts:[] },
  'Frankfurt am Main':        { score:68, alerts:[] },
  'Cologne / Duisburg':       { score:67, alerts:[{ lvl:'info', msg:'Rhine River low-water Aug-Oct limits barge capacity' }] },
  'Munich / Bavaria':         { score:68, alerts:[] },
  'Stuttgart':                { score:68, alerts:[] },
  'Nuremberg':                { score:67, alerts:[] },
  // ── UK ──
  'London / Felixstowe':      { score:60, alerts:[{ lvl:'info', msg:'Post-Brexit customs friction -- additional documentation & delays at GB/EU border' }] },
  'Southampton':              { score:61, alerts:[] },
  'Dover':                    { score:59, alerts:[{ lvl:'warn', msg:'Post-Brexit border checks -- peak queues 6-12 hrs; Operation Brock activated during surges' }] },
  'Birmingham':               { score:61, alerts:[] },
  'Coventry':                 { score:61, alerts:[] },
  'Liverpool':                { score:60, alerts:[] },
  'Glasgow':                  { score:61, alerts:[] },
  'Manchester':               { score:61, alerts:[] },
  // ── Netherlands ──
  'Rotterdam / Europoort':    { score:68, alerts:[] },
  'Amsterdam':                { score:68, alerts:[] },
  'Moerdijk':                 { score:67, alerts:[] },
  // ── Turkey ──
  'Istanbul':                 { score:20, alerts:[{ lvl:'high', msg:'Lira volatility -- FX hedging essential; cost unpredictability high' }, { lvl:'warn', msg:'NATO-Russia tensions -- Bosphorus transit restrictions risk under Montreux Convention' }] },
  'Bursa':                    { score:21, alerts:[{ lvl:'warn', msg:'Lira inflation risk; supplier payment terms volatile' }] },
  'Kocaeli':                  { score:20, alerts:[{ lvl:'info', msg:'Seismic zone -- North Anatolian Fault proximity' }] },
  'Izmir / Aliağa':           { score:21, alerts:[{ lvl:'warn', msg:'Seismic risk; 2020 Izmir earthquake caused significant infrastructure damage' }] },
  'Mersin':                   { score:19, alerts:[{ lvl:'warn', msg:'Proximity to Syria -- regional instability monitoring required' }] },
  'Adana':                    { score:19, alerts:[] },
  // ── South America ──
  'São Paulo / Santos':       { score:47, alerts:[{ lvl:'info', msg:"Truckers' strike history -- have road alternatives" }] },
  'Rio de Janeiro':           { score:46, alerts:[] },
  'Buenos Aires / Exolgan':   { score:33, alerts:[{ lvl:'high', msg:'FX controls -- parallel rate risk; USD payment restrictions' }, { lvl:'warn', msg:'Customs clearance averaging 7-10 days' }] },
  'Lagos / Apapa':            { score:10, alerts:[{ lvl:'high', msg:'Severe congestion -- avg clearance 14-21 days' }, { lvl:'high', msg:'Cargo theft & port corruption documented' }, { lvl:'warn', msg:'FX restrictions on USD repatriation' }] },
  'Port Harcourt':            { score:9,  alerts:[{ lvl:'high', msg:'Niger Delta instability -- vessel security incidents ongoing' }] },
  // ── Australia ──
  'Sydney / Port Botany':     { score:86, alerts:[] },
  'Melbourne':                { score:86, alerts:[{ lvl:'info', msg:'MUA labor negotiations -- periodic terminal slowdowns historically' }] },
  'Brisbane':                 { score:85, alerts:[{ lvl:'info', msg:'Cyclone risk Nov-Apr (northern approaches)' }] },
  'Fremantle / Perth':        { score:86, alerts:[] },
  'Darwin':                   { score:84, alerts:[{ lvl:'info', msg:'Remote port -- limited carrier calls; transshipment via Singapore often required' }] },
}

// ── Hub Stability Navigator ──────────────────────────────────────────────────
export const HUB_CONTINENTS = [
  'Asia', 'North America', 'South America', 'Europe', 'Africa', 'Oceania',
]

export const HUB_COUNTRIES = {
  'Asia':          ['China','Japan','South Korea','Taiwan','Vietnam','India','Singapore','Malaysia','Thailand','Indonesia','Bangladesh','Philippines'],
  'North America': ['USA','Canada','Mexico'],
  'South America': ['Brazil','Chile','Colombia','Peru','Argentina'],
  'Europe':        ['Germany','France','United Kingdom','Netherlands','Belgium','Spain','Italy','Poland','Czech Republic','Hungary','Romania','Turkey'],
  'Africa':        ['South Africa','Nigeria','Ghana','Morocco','Egypt','Ethiopia'],
  'Oceania':       ['Australia'],
}

// score: composite 0-100 (higher = safer / more stable)
// zones: named sub-regions → array of hub / port names matching PORT_RISK keys
export const HUB_REGIONS = {
  'China':          { iso2:'CN', score:42, zones:{ 'South Coast':['Shenzhen','Guangzhou','Hong Kong'], 'East Coast':['Shanghai','Ningbo','Suzhou'], 'North':['Tianjin','Dalian','Qingdao'] } },
  'Japan':          { iso2:'JP', score:70, zones:{ 'Tokyo Bay':['Tokyo / Yokohama','Chiba'], 'Nagoya / Aichi':['Nagoya','Aichi'], 'Kansai':['Osaka','Kobe'] } },
  'South Korea':    { iso2:'KR', score:57, zones:{ 'Southeast':['Ulsan','Busan'], 'West Coast':['Incheon','Pyeongtaek'], 'Capital':['Seoul'] } },
  'Taiwan':         { iso2:'TW', score:64, zones:{ 'North':['Taipei / Keelung','Taoyuan','Hsinchu'], 'Central':['Taichung'], 'South':['Kaohsiung','Tainan'] } },
  'Vietnam':        { iso2:'VN', score:50, zones:{ 'South':['Ho Chi Minh City','Binh Duong','Dong Nai'], 'North':['Hanoi','Hai Phong'] } },
  'India':          { iso2:'IN', score:28, zones:{ 'South':['Bangalore','Chennai'], 'West Coast':['Mumbai / JNPT','Pune','Mundra'], 'North':['Delhi / Noida','Jaipur'] } },
  'Singapore':      { iso2:'SG', score:82, zones:{ 'City-State':['Port of Singapore','Jurong Island','Changi'] } },
  'Malaysia':       { iso2:'MY', score:58, zones:{ 'West Coast':['Port Klang / Kuala Lumpur','Penang','Shah Alam'], 'South':['Johor Bahru / Tanjung Pelepas'] } },
  'Thailand':       { iso2:'TH', score:42, zones:{ 'Central':['Bangkok / Laem Chabang'], 'Eastern Seaboard':['Rayong','Chonburi','Amata City'] } },
  'Indonesia':      { iso2:'ID', score:45, zones:{ 'Java':['Jakarta / Tanjung Priok','Surabaya','Bekasi'], 'Sumatra':['Batam','Medan'] } },
  'Bangladesh':     { iso2:'BD', score:32, zones:{ 'South Coast':['Chattogram / Chittagong','Mongla'], 'Capital':['Dhaka','Narayanganj'] } },
  'Philippines':    { iso2:'PH', score:34, zones:{ 'Luzon':['Manila / Port of Manila','Subic Bay','Clark'], 'Visayas':['Cebu'] } },
  'USA':            { iso2:'US', score:45, zones:{ 'East Coast':['New York / Newark','Baltimore','Savannah','Charleston','Miami','Philadelphia'], 'West Coast':['Los Angeles / Long Beach','Seattle / Tacoma','Oakland / San Francisco'], 'Gulf Coast':['Houston','New Orleans','Tampa'], 'Great Lakes':['Detroit','Chicago','Cleveland','Pittsburgh'] } },
  'Canada':         { iso2:'CA', score:68, zones:{ 'West Coast':['Vancouver','Prince Rupert'], 'East Coast':['Halifax','Montreal / St. Lawrence'], 'Central':['Toronto','Winnipeg'] } },
  'Mexico':         { iso2:'MX', score:34, zones:{ 'North (Nearshore)':['Monterrey','Juárez','Tijuana'], 'Pacific Coast':['Manzanillo','Lázaro Cárdenas'], 'Gulf Coast':['Veracruz','Altamira'] } },
  'Brazil':         { iso2:'BR', score:48, zones:{ 'Southeast':['São Paulo / Santos','Rio de Janeiro','Campinas'], 'South':['Paranaguá','Itajaí','Porto Alegre'], 'North':['Manaus','Belém'] } },
  'Chile':          { iso2:'CL', score:60, zones:{ 'Central':['Santiago / Valparaíso','San Antonio'], 'North':['Antofagasta','Iquique'] } },
  'Colombia':       { iso2:'CO', score:22, zones:{ 'Caribbean Coast':['Cartagena','Barranquilla'], 'Pacific Coast':['Buenaventura'], 'Capital':['Bogotá'] } },
  'Peru':           { iso2:'PE', score:28, zones:{ 'West Coast':['Lima / Callao','Paita'] } },
  'Argentina':      { iso2:'AR', score:35, zones:{ 'East Coast':['Buenos Aires / Exolgan','Rosario','Bahía Blanca'] } },
  'Germany':        { iso2:'DE', score:67, zones:{ 'North (Ports)':['Hamburg','Bremen / Bremerhaven'], 'Central':['Frankfurt am Main','Cologne / Duisburg'], 'South':['Munich / Bavaria','Stuttgart','Nuremberg'] } },
  'France':         { iso2:'FR', score:41, zones:{ 'North':['Paris','Le Havre','Dunkirk'], 'South':['Lyon','Marseille','Bordeaux'] } },
  'United Kingdom': { iso2:'GB', score:60, zones:{ 'South':['London / Felixstowe','Southampton','Dover'], 'Midlands':['Birmingham','Coventry'], 'North':['Liverpool','Glasgow','Manchester'] } },
  'Netherlands':    { iso2:'NL', score:67, zones:{ 'West (Port)':['Rotterdam / Europoort','Amsterdam','Moerdijk'] } },
  'Belgium':        { iso2:'BE', score:65, zones:{ 'North':['Antwerp','Ghent / Zeebrugge'] } },
  'Spain':          { iso2:'ES', score:50, zones:{ 'Northeast':['Barcelona','Tarragona'], 'South':['Algeciras','Valencia','Cartagena'] } },
  'Italy':          { iso2:'IT', score:62, zones:{ 'North':['Turin','Milan / Genoa'], 'South':['Naples','Gioia Tauro','Salerno'] } },
  'Poland':         { iso2:'PL', score:62, zones:{ 'Central':['Warsaw','Łódź','Katowice'], 'Baltic Coast':['Gdańsk / Gdynia'] } },
  'Czech Republic': { iso2:'CZ', score:72, zones:{ 'Central':['Prague / Mladá Boleslav','Brno','Plzeň'] } },
  'Hungary':        { iso2:'HU', score:55, zones:{ 'Central':['Budapest','Győr','Miskolc'] } },
  'Romania':        { iso2:'RO', score:42, zones:{ 'Black Sea Coast':['Constanța'], 'Central':['Bucharest','Cluj-Napoca','Brașov'] } },
  'Turkey':         { iso2:'TR', score:20, zones:{ 'Northwest':['Istanbul','Bursa','Kocaeli'], 'West':['Izmir / Aliağa'], 'South':['Mersin','Adana'] } },
  'South Africa':   { iso2:'ZA', score:33, zones:{ 'West Coast':['Cape Town / Saldanha Bay'], 'East Coast':['Durban / Richards Bay'], 'Interior':['Johannesburg','Pretoria'] } },
  'Nigeria':        { iso2:'NG', score:10, zones:{ 'Coast':['Lagos / Apapa','Port Harcourt'] } },
  'Ghana':          { iso2:'GH', score:52, zones:{ 'Coast':['Accra / Tema','Takoradi'] } },
  'Morocco':        { iso2:'MA', score:37, zones:{ 'North':['Tanger Med','Casablanca'] } },
  'Egypt':          { iso2:'EG', score:25, zones:{ 'North':['Alexandria','Port Said / Suez Canal'], 'Interior':['Cairo / 10th of Ramadan'] } },
  'Ethiopia':       { iso2:'ET', score:12, zones:{ 'Interior':['Addis Ababa (Dry Port)','Hawassa Industrial Park'] } },
  'Australia':      { iso2:'AU', score:85, zones:{ 'East Coast':['Sydney / Port Botany','Melbourne','Brisbane'], 'West Coast':['Fremantle / Perth'], 'North':['Darwin'] } },
}
