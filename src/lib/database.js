// ============================================================
// ATLAS TERMINAL — Core Intelligence Database
// Place at: src/lib/database.js
// ============================================================

export const ATLAS_DB = {

  // 1. AUTOMOTIVE (Cars, EV, Parts, Visors, Seats, Frames)
  automotive: [
    {
      id: 'h_auto_1', lat: 25.6, lng: -100.3,
      hub: 'MONTERREY, MEXICO', title: 'NAFTA Tier-1 Auto Cluster',
      companies: [
        { name: 'Grupo Antolin', website: 'https://www.grupoantolin.com/', turnover: '>$1B' },
        { name: 'Nemak', website: 'https://www.nemak.com/', turnover: '>$1B' },
        { name: 'Metalsa', website: 'https://www.metalsa.com/', turnover: '>$1B' },
        { name: 'Draxton Mexico', website: 'https://www.draxton.com/', turnover: '$100M-$1B' },
        { name: 'Cimco Group', website: 'https://www.cimco.com.mx/', turnover: '$10M-$100M' },
        { name: 'Arneses de México', website: 'https://www.sumitomo-sei.co.jp/', turnover: '$10M-$100M' }
      ],
      desc: 'Primary nearshoring hub for North American automotive OEMs. Specializes in interiors, chassis, headliners, and sun visor assemblies.',
      customs: { hts_code: '8708.29', duty_rate: '0% (USMCA)', compliance_note: 'USMCA Rules of Origin apply. Regional Value Content (RVC) ≥ 75% required.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Water scarcity is a growing operational risk in Monterrey metro.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$2.1k/Truck' },
      industry_kpi: { label: 'Tooling Lead', value: '12 Weeks' }
    },
    {
      id: 'h_auto_2', lat: 31.2, lng: 121.4,
      hub: 'SHANGHAI, CHINA', title: 'East China Auto Zone',
      companies: [
        { name: 'Yanfeng Automotive', website: 'https://www.yfai.com/', turnover: '>$1B' },
        { name: 'Huayu Auto', website: 'https://www.hasco-group.com/', turnover: '>$1B' },
        { name: 'Fuyao Glass', website: 'https://www.fuyaogroup.com/', turnover: '>$1B' }
      ],
      desc: 'Massive scale production for automotive plastics, electronics, glass, and interior systems. Competitive cost base.',
      customs: { hts_code: '8708.29', duty_rate: '25% (Sec 301)', compliance_note: 'Subject to Section 301 tariffs. Check entity list restrictions.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'B', sustainability_note: 'Transitioning to renewable grid power by 2030. Labor audits recommended.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$4.5k/FEU' },
      industry_kpi: { label: 'Scale Capacity', value: 'Unlimited' }
    },
    {
      id: 'h_auto_3', lat: 48.1, lng: 11.5,
      hub: 'BAVARIA, GERMANY', title: 'EU Premium Parts Hub',
      companies: [
        { name: 'Continental AG', website: 'https://www.continental.com/', turnover: '>$1B' },
        { name: 'Bosch', website: 'https://www.bosch.com/', turnover: '>$1B' },
        { name: 'Brose Group', website: 'https://www.brose.com/', turnover: '>$1B' },
        { name: 'Grammer AG', website: 'https://www.grammer.com/', turnover: '$100M-$1B' },
        { name: 'Kiekert AG', website: 'https://www.kiekert.com/', turnover: '$100M-$1B' },
        { name: 'Polytec Group', website: 'https://www.polytec-group.com/', turnover: '$100M-$1B' }
      ],
      desc: 'High-precision engineering and premium trim components for luxury OEMs (BMW, Mercedes, Audi). CE-certified.',
      customs: { hts_code: '8708.29', duty_rate: '2.5% (Non-EU)', compliance_note: 'CE Marking required. REACH compliance mandatory.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'AA', sustainability_note: 'Industry-leading circular economy practices. CO2 reporting mandatory.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$3.8k/Sea' },
      industry_kpi: { label: 'Defect Rate', value: '< 5 PPM' }
    },
    {
      id: 'h_auto_4', lat: 35.1, lng: 136.9,
      hub: 'AICHI, JAPAN', title: 'J-OEM Sourcing Cluster',
      companies: [
        { name: 'Toyota Boshoku', website: 'https://www.toyota-boshoku.com/', turnover: '>$1B' },
        { name: 'Denso', website: 'https://www.denso.com/', turnover: '>$1B' },
        { name: 'Aisin', website: 'https://www.aisin.com/', turnover: '>$1B' }
      ],
      desc: 'Just-in-time manufacturing excellence for Japanese OEMs. World benchmark for quality systems and lean processes.',
      customs: { hts_code: '8708.29', duty_rate: '0% (CPTPP)', compliance_note: 'Strict J-Quality standards apply. CPTPP origin rules.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'A+', sustainability_note: 'High energy efficiency standards. Kaizen-driven waste reduction.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$4.2k/Sea' },
      industry_kpi: { label: 'JIT Score', value: '99.9%' }
    },
    {
      id: 'h_auto_5', lat: 42.3, lng: -83.0,
      hub: 'DETROIT, USA', title: 'Great Lakes Auto Cluster',
      companies: [
        { name: 'Lear Corp', website: 'https://www.lear.com/', turnover: '>$1B' },
        { name: 'Magna International', website: 'https://www.magna.com/', turnover: '>$1B' },
        { name: 'IAC Group', website: 'https://www.iacgroup.com/', turnover: '$100M-$1B' },
        { name: 'Shape Corp', website: 'https://www.shapecorp.com/', turnover: '$100M-$1B' },
        { name: 'Lacks Enterprises', website: 'https://www.lacks.net/', turnover: '$100M-$1B' },
        { name: 'Gentex Corp', website: 'https://www.gentex.com/', turnover: '$100M-$1B' },
        { name: 'Tower International', website: 'https://www.towerint.com/', turnover: '$10M-$100M' }
      ],
      desc: 'Legacy US automotive engineering and final assembly hub. Domestic sourcing for Ford, GM, Stellantis supply chains.',
      customs: { hts_code: '8708.29', duty_rate: '0% (Domestic)', compliance_note: 'Domestic supply. Buy America Act eligible.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'UAW unionized labor. EV transition investment underway.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.5k/Ground' },
      industry_kpi: { label: 'Proximity', value: 'Same-Day JIT' }
    },
    {
      id: 'h_auto_6', lat: 47.6, lng: 19.0,
      hub: 'BUDAPEST, HUNGARY', title: 'Eastern EU Assembly Hub',
      companies: [
        { name: 'Audi Hungaria', website: 'https://audi.hu/' },
        { name: 'Knorr-Bremse', website: 'https://www.knorr-bremse.com/' },
        { name: 'Flex-N-Gate', website: 'https://www.flex-n-gate.com/' }
      ],
      desc: 'Cost-effective alternative to Western Europe for precision auto parts. Strong EU free trade access.',
      customs: { hts_code: '8708.29', duty_rate: '0% (Intra-EU)', compliance_note: 'EU origin certified. No additional duties within EU.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Increasing EV component focus. Green energy transition.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$1.2k/Truck' },
      industry_kpi: { label: 'Labor Cost', value: '35% vs W.Europe' }
    }
  ],

  // 2. INDUSTRIAL COMPONENTS (Magnets, Bearings, Fasteners, Motors, Seals)
  // Covers: neodymium magnets, ferrite magnets, rare earth magnets, bearings, precision industrial parts
  industrial: [
    {
      id: 'h_ind_1', lat: 41.7, lng: 110.7,
      hub: 'BAOTOU, CHINA', title: 'Global Rare Earth & NdFeB Magnet Core',
      companies: [
        { name: 'Zhong Ke San Huan (HSMAG)', website: 'https://www.hsmag.com/' },
        { name: 'JLMAG Rare-Earth Co.', website: 'https://www.jlmag.com/' },
        { name: 'Earth-Panda Rare Earth', website: 'http://www.earth-panda.com/' }
      ],
      desc: 'World\'s dominant hub for NdFeB (neodymium-iron-boron) permanent magnets. Controls ~90% of global rare earth magnet supply. Key source for automotive sensors, EV motors, dashboard actuators, and visor mechanisms.',
      customs: { hts_code: '8505.11', duty_rate: '25% (Sec 301)', compliance_note: 'Subject to Section 301 tariffs. China rare earth export quota regulations apply. CFIUS review for strategic acquisitions.' },
      esg: { carbon_footprint: 'Very High', ethical_rating: 'C', sustainability_note: 'Severe environmental impact from rare earth mining and separation. No closed-loop recycling at scale yet.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$3.8k/FEU' },
      industry_kpi: { label: 'Global Market Share', value: '~90% NdFeB' }
    },
    {
      id: 'h_ind_2', lat: 35.6, lng: 139.6,
      hub: 'TOKYO / CHIBA, JAPAN', title: 'Premium Precision Magnetics Hub',
      companies: [
        { name: 'TDK Corporation', website: 'https://www.tdk.com/' },
        { name: 'Shin-Etsu Chemical', website: 'https://www.shinetsu.co.jp/' },
        { name: 'Hitachi Metals (Proterial)', website: 'https://www.proterial.com/' }
      ],
      desc: 'World-class precision magnet manufacturing for automotive-grade applications. Key supplier for EV motors, precision sensors, ADAS, sun visor actuator motors, and instrument panel components.',
      customs: { hts_code: '8505.11', duty_rate: '0% (CPTPP)', compliance_note: 'CPTPP origin rules apply. IATF 16949 certified. High-grade automotive specs standard.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'A+', sustainability_note: 'Industry-leading magnet recycling and closed-loop recovery programs. OECD Due Diligence compliant.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$4.2k/Sea' },
      industry_kpi: { label: 'Precision Grade', value: 'N52 / N50H' }
    },
    {
      id: 'h_ind_3', lat: 50.1, lng: 8.6,
      hub: 'HANAU, GERMANY', title: 'European Advanced Magnetics Hub',
      companies: [
        { name: 'Vacuumschmelze (VAC)', website: 'https://www.vacuumschmelze.com/' },
        { name: 'Thyssenkrupp Magnetics', website: 'https://www.thyssenkrupp.com/' },
        { name: 'Arnold Europe GmbH', website: 'https://www.arnoldmagnetics.com/' }
      ],
      desc: 'Premium rare earth magnets and soft magnetic components for automotive, aerospace, and industrial OEMs. VAC is the global reference for high-coercivity magnets used in harsh automotive environments.',
      customs: { hts_code: '8505.11', duty_rate: '0% (Intra-EU) / 3.7% (MFN)', compliance_note: 'REACH compliance required. CE marking mandatory. EU Conflict Minerals Regulation applies.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'AA', sustainability_note: 'Conflict mineral audits conducted annually. RE100 green energy target. Magnet recycling infrastructure in place.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$1.8k/Truck' },
      industry_kpi: { label: 'Automotive Spec', value: 'IATF 16949 + AEC-Q' }
    },
    {
      id: 'h_ind_4', lat: 41.6, lng: -72.7,
      hub: 'CONNECTICUT, USA', title: 'US Domestic Magnetics & Defense',
      companies: [
        { name: 'Arnold Magnetic Technologies', website: 'https://www.arnoldmagnetics.com/' },
        { name: 'Electron Energy Corp', website: 'https://www.electronenergy.com/' },
        { name: 'Bunting Magnetics', website: 'https://www.buntingmagnetics.com/' }
      ],
      desc: 'Domestic US magnet manufacturing for defense, aerospace, and automotive supply chains. 100% non-China origin. Buy American compliant. Critical for ITAR-controlled programs.',
      customs: { hts_code: '8505.11', duty_rate: '0% (Domestic)', compliance_note: 'ITAR / DFARS compliant. Buy America Act eligible. DoD conflict mineral reporting certified.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'A+', sustainability_note: 'Transparent supply chain. US-origin rare earth sourcing from Mountain Pass, CA (MP Materials).' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.2k/Ground' },
      industry_kpi: { label: 'Compliance', value: 'ITAR / DFARS' }
    },
    {
      id: 'h_ind_5', lat: 37.6, lng: 126.9,
      hub: 'GYEONGGI, S. KOREA', title: 'Korea Precision Components Hub',
      companies: [
        { name: 'Samsung Electro-Mechanics', website: 'https://www.samsungsem.com/' },
        { name: 'LS Magnetics', website: 'https://www.lselectric.co.kr/' },
        { name: 'Korea Magnet Institute (KMI)', website: 'https://www.kmi.re.kr/' }
      ],
      desc: 'Growing hub for precision magnets and electromagnetic components. Serves global automotive and consumer electronics OEMs under KORUS FTA preferences.',
      customs: { hts_code: '8505.11', duty_rate: '0% (KORUS)', compliance_note: 'KORUS FTA rates apply for US imports. Korean origin certification required.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Carbon neutral targets by 2040. Government ESG disclosure framework.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$3.8k/Sea' },
      industry_kpi: { label: 'ISO Cert', value: 'IATF 16949' }
    },
    {
      id: 'h_ind_6', lat: 19.0, lng: 73.0,
      hub: 'PUNE, INDIA', title: 'India Industrial Components Hub',
      companies: [
        { name: 'Harsha Engineers', website: 'https://www.harshaengineers.com/' },
        { name: 'Lakshmi Ring Travellers', website: 'https://www.lrtindia.com/' },
        { name: 'Precision Camshafts', website: 'https://www.pcl.in/' }
      ],
      desc: 'Fast-growing alternative source for precision industrial components, bearings, and engineered parts. Strong growth in automotive-grade manufacturing capabilities.',
      customs: { hts_code: '8505.11', duty_rate: '0% (GSTP)', compliance_note: 'GSP/GSTP preferences available for eligible products. QC audits recommended.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'India+1 strategy hub. Improving standards under IATF adoption.' },
      logistics: { port_wait_days: 4, freight_cost_estimate: '$3.5k/Sea' },
      industry_kpi: { label: 'Cost vs Japan', value: '40-50% Savings' }
    }
  ],

  // 3. TECH & ELECTRONICS (Microchips, PCBs, Glass Panels, Displays, Sensors)
  electronics: [
    {
      id: 'h_tech_1', lat: 24.8, lng: 120.9,
      hub: 'HSINCHU, TAIWAN', title: 'Global Semiconductor Nexus',
      companies: [
        { name: 'TSMC', website: 'https://www.tsmc.com/' },
        { name: 'Foxconn', website: 'https://www.foxconn.com/' },
        { name: 'MediaTek', website: 'https://www.mediatek.com/' }
      ],
      desc: 'The absolute center of global advanced semiconductor manufacturing. TSMC produces 90%+ of the world\'s most advanced logic chips.',
      customs: { hts_code: '8542.31', duty_rate: '0% (ITA)', compliance_note: 'Export controls on advanced nodes (< 14nm) apply. US BIS license may be required.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'A-', sustainability_note: 'Massive water consumption is a systemic risk. RE100 commitment active.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$8.5k/Air' },
      industry_kpi: { label: 'Node Size', value: '3nm / 2nm' }
    },
    {
      id: 'h_tech_2', lat: 37.3, lng: 127.0,
      hub: 'GYEONGGI, S. KOREA', title: 'Memory & Display Cluster',
      companies: [
        { name: 'Samsung Electronics', website: 'https://www.samsung.com/' },
        { name: 'SK Hynix', website: 'https://www.skhynix.com/' },
        { name: 'LG Display', website: 'https://www.lgdisplay.com/' }
      ],
      desc: 'World leader in memory chips (DRAM/NAND) and OLED display panels. Primary source for smartphone and automotive display supply chains.',
      customs: { hts_code: '8542.32', duty_rate: '0% (KORUS)', compliance_note: 'KORUS FTA applies for US imports. ECCN classification for advanced memory.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Aggressive carbon neutral targets by 2050. Water recycling systems deployed.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$4.1k/Sea' },
      industry_kpi: { label: 'Yield Rate', value: '> 95%' }
    },
    {
      id: 'h_tech_3', lat: 22.5, lng: 113.9,
      hub: 'SHENZHEN, CHINA', title: 'Hardware Innovation Bay',
      companies: [
        { name: 'BYD Electronics', website: 'https://www.byd.com/' },
        { name: 'Huawei Technologies', website: 'https://www.huawei.com/' },
        { name: 'Luxshare Precision', website: 'https://www.luxshare-ict.com/' }
      ],
      desc: 'Unmatched speed and scale for consumer electronics assembly and PCBs. 48-hour prototype capability.',
      customs: { hts_code: '8517.70', duty_rate: '25% (Sec 301)', compliance_note: 'Check BIS Entity List. Section 301 tariffs apply. CFIUS restrictions on tech transfers.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'B-', sustainability_note: 'Labor audit required. Forced labor risk assessment mandatory.' },
      logistics: { port_wait_days: 4, freight_cost_estimate: '$3.5k/FEU' },
      industry_kpi: { label: 'Prototyping', value: '48 Hours' }
    },
    {
      id: 'h_tech_4', lat: 33.3, lng: -111.9,
      hub: 'ARIZONA, USA', title: 'Silicon Desert (CHIPS Act)',
      companies: [
        { name: 'TSMC Arizona', website: 'https://www.tsmc.com/' },
        { name: 'Intel Foundry', website: 'https://www.intel.com/' },
        { name: 'NXP Semiconductors', website: 'https://www.nxp.com/' }
      ],
      desc: 'Rapidly growing domestic US semiconductor manufacturing hub fueled by $52B CHIPS and Science Act investment.',
      customs: { hts_code: '8542.31', duty_rate: '0% (Domestic)', compliance_note: 'Domestic Origin. CHIPS Act incentives may apply. ITAR compliant.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A+', sustainability_note: 'Water reclamation technology deployed at scale. Green fab standards.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.2k/Ground' },
      industry_kpi: { label: 'Security', value: 'ITAR Compliant' }
    },
    {
      id: 'h_tech_5', lat: 10.8, lng: 106.6,
      hub: 'HO CHI MINH, VIETNAM', title: 'China+1 Assembly Hub',
      companies: [
        { name: 'Pegatron', website: 'https://www.pegatroncorp.com/' },
        { name: 'Compal Electronics', website: 'https://www.compal.com/' },
        { name: 'Jabil Vietnam', website: 'https://www.jabil.com/' }
      ],
      desc: 'Primary China+1 destination for electronics assembly moving out of China. Apple, Samsung, and Google all expanding here.',
      customs: { hts_code: '8517.70', duty_rate: '0% (MFN)', compliance_note: 'Origin verification critical. Substantial transformation rules apply.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'Rapidly improving labor standards. Good factory conditions in export zones.' },
      logistics: { port_wait_days: 6, freight_cost_estimate: '$4.0k/FEU' },
      industry_kpi: { label: 'Cost vs China', value: '15% Savings' }
    },
    {
      id: 'h_tech_6', lat: 5.4, lng: 100.3,
      hub: 'PENANG, MALAYSIA', title: 'Backend Semiconductor Hub',
      companies: [
        { name: 'ASE Group', website: 'https://www.aseglobal.com/' },
        { name: 'Infineon Malaysia', website: 'https://www.infineon.com/' },
        { name: 'Intel Penang', website: 'https://www.intel.com/' }
      ],
      desc: 'Global hub for semiconductor OSAT (Outsourced Semiconductor Assembly and Test). 13% of global OSAT volume.',
      customs: { hts_code: '8542.90', duty_rate: '0% (ITA)', compliance_note: 'Standard ITA tech compliance. No additional tariff barriers.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Stable green grid. Strong government labor enforcement.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$3.9k/Sea' },
      industry_kpi: { label: 'OSAT Volume', value: '13% Global' }
    }
  ],

  // 4. FOOD & AGRICULTURE (Beef, Wheat, Soy, Produce, Ingredients)
  agriculture: [
    {
      id: 'h_ag_1', lat: 41.8, lng: -88.1,
      hub: 'ILLINOIS, USA', title: 'Midwest Protein Processing Hub',
      companies: [
        { name: 'OSI Group', website: 'https://www.osigroup.com/' },
        { name: 'Cargill Meat Solutions', website: 'https://www.cargill.com/' },
        { name: 'Tyson Foods', website: 'https://www.tysonfoods.com/' }
      ],
      desc: 'Primary supplier cluster for North American QSR chains (McDonald\'s global partner since 1955). USDA-inspected, FSMA-compliant.',
      customs: { hts_code: '0202.30', duty_rate: '0% (Domestic)', compliance_note: 'USDA FSIS inspected. FSMA compliant. No import duties for domestic supply.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Regenerative grazing initiatives active. Scope 3 emissions reporting underway.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.5k/Reefer' },
      industry_kpi: { label: 'Capacity', value: '10k Tons/Day' }
    },
    {
      id: 'h_ag_2', lat: -15.6, lng: -56.1,
      hub: 'MATO GROSSO, BRAZIL', title: 'Global Protein & Soy Nexus',
      companies: [
        { name: 'JBS S.A.', website: 'https://jbs.com.br/' },
        { name: 'Marfrig Global Foods', website: 'https://www.marfrig.com.br/' },
        { name: 'BRF S.A.', website: 'https://ri.brf-global.com/' }
      ],
      desc: 'World\'s largest exporter of beef and soy products. Very high volume capacity but significant ESG and traceability risks.',
      customs: { hts_code: '0202.30', duty_rate: '26.4% (Quota)', compliance_note: 'Check TRQ (Tariff Rate Quota) availability. Sanitary certificate mandatory.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'C', sustainability_note: 'Amazon deforestation monitoring required. EUDR compliance risk from 2025.' },
      logistics: { port_wait_days: 8, freight_cost_estimate: '$5.5k/Reefer' },
      industry_kpi: { label: 'Traceability', value: 'Tier-2 Only' }
    },
    {
      id: 'h_ag_3', lat: -34.6, lng: -58.3,
      hub: 'PAMPAS, ARGENTINA', title: 'Premium Grass-Fed Protein',
      companies: [
        { name: 'Swift Argentina', website: 'https://www.swift.com.ar/' },
        { name: 'ArreBeef', website: 'https://www.arrebeef.com/' },
        { name: 'Minerva Foods', website: 'https://www.minervafoods.com/' }
      ],
      desc: 'Renowned for high-quality, grass-fed beef at competitive prices. Lower carbon intensity than Brazil.',
      customs: { hts_code: '0202.30', duty_rate: '26.4% (Quota)', compliance_note: 'Subject to export tax policies. TRQ quota limits apply.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'B+', sustainability_note: 'Natural pampas grazing, lower emissions profile. Deforestation risk minimal.' },
      logistics: { port_wait_days: 6, freight_cost_estimate: '$5.0k/Reefer' },
      industry_kpi: { label: 'Quality Grade', value: 'Prime / AA' }
    },
    {
      id: 'h_ag_4', lat: 51.5, lng: 5.0,
      hub: 'BRABANT, NETHERLANDS', title: 'EU Agri-Tech Processing Hub',
      companies: [
        { name: 'Vion Food Group', website: 'https://www.vionfoodgroup.com/' },
        { name: 'FrieslandCampina', website: 'https://www.frieslandcampina.com/' },
        { name: 'Agrifirm', website: 'https://www.agrifirm.nl/' }
      ],
      desc: 'Highly automated, high-yield European agricultural and processing hub. World leader in sustainable farming technology.',
      customs: { hts_code: '0202.30', duty_rate: '12.8% + €303/100kg', compliance_note: 'Strict EU sanitary/phytosanitary (SPS) rules. EUDR compliance mandatory.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'AA', sustainability_note: 'Global leader in sustainable farming tech. Carbon accounting at farm level.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$2.8k/Reefer' },
      industry_kpi: { label: 'Automation', value: '90%+' }
    },
    {
      id: 'h_ag_5', lat: -37.8, lng: 144.9,
      hub: 'VICTORIA, AUSTRALIA', title: 'APAC Premium Protein Export',
      companies: [
        { name: 'Teys Australia', website: 'https://teysgroup.com/' },
        { name: 'AACo (Australian Agricultural Co)', website: 'https://aaco.com.au/' },
        { name: 'JBS Australia', website: 'https://www.jbssa.com.au/' }
      ],
      desc: 'Major supplier of premium beef to Asian markets (Japan, Korea, China). Strong AUSFTA tariff advantages.',
      customs: { hts_code: '0202.30', duty_rate: '0% (AUSFTA)', compliance_note: 'AUSFTA origin rules apply. MSA grading preferred for premium markets.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Drought resilience programs active. Traceability to individual animal (NLIS).' },
      logistics: { port_wait_days: 4, freight_cost_estimate: '$4.2k/Reefer' },
      industry_kpi: { label: 'Traceability', value: 'NLIS Farm-Level' }
    }
  ],

  // 5. FOOD & BEVERAGE / CPG (Confectionery, Snacks, Beverages, Packaged Food)
  food: [
    {
      id: 'h_food_1', lat: 41.8, lng: -87.9,
      hub: 'CHICAGO, USA', title: 'Global CPG & Confectionery Hub',
      companies: [
        { name: 'Mondelez International', website: 'https://www.mondelezinternational.com/', turnover: '>$1B' },
        { name: 'Mars Inc.', website: 'https://www.mars.com/', turnover: '>$1B' },
        { name: 'Kraft Heinz', website: 'https://www.kraftheinzcompany.com/', turnover: '>$1B' },
        { name: 'Ingredion', website: 'https://www.ingredion.com/', turnover: '>$1B' },
        { name: 'Tootsie Roll Industries', website: 'https://www.tootsie.com/', turnover: '$100M-$1B' },
        { name: 'Ferrara Candy', website: 'https://www.ferrarausa.com/', turnover: '$100M-$1B' }
      ],
      desc: 'World capital of packaged food, confectionery, and CPG manufacturing. Home to candy, cookie, snack, condiment, and marshmallow production at scale. FSMA compliant, FDA-registered facilities.',
      customs: { hts_code: '1704.90', duty_rate: '0% (Domestic)', compliance_note: 'FDA registration mandatory. FSMA Preventive Controls rule applies. No import duties for domestic supply.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Major brands publish Scope 1/2/3 reduction roadmaps. Packaging recyclability targets active.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.8k/Ground' },
      industry_kpi: { label: 'Min Order', value: '500 kg MOQ' }
    },
    {
      id: 'h_food_2', lat: 23.1, lng: 113.3,
      hub: 'GUANGDONG, CHINA', title: 'Asia Pacific Food Manufacturing',
      companies: [
        { name: 'Want Want Group', website: 'https://www.wantWant.com/', turnover: '>$1B' },
        { name: 'Nongfu Spring', website: 'https://www.nongfuspring.com/', turnover: '>$1B' },
        { name: 'Haday Foods', website: 'https://www.haday.com/', turnover: '$100M-$1B' },
        { name: 'Yida Group', website: 'https://www.yida.cc/', turnover: '$100M-$1B' }
      ],
      desc: 'High-volume, low-cost production for candies, snacks, instant noodles, sauces, and condiments. Dominant supplier for private-label food brands in North America and Europe. Subject to enhanced import inspection.',
      customs: { hts_code: '1704.90', duty_rate: '25% (Sec 301)', compliance_note: 'FDA Prior Notice required. Enhanced allergen/contaminant screening at US ports. Section 301 tariffs apply.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'B', sustainability_note: 'Water usage and wastewater treatment audits recommended. Supplier labor audits required.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$4.2k/FEU' },
      industry_kpi: { label: 'Scale', value: 'Unlimited Volume' }
    },
    {
      id: 'h_food_3', lat: 52.1, lng: 5.3,
      hub: 'ROTTERDAM, NETHERLANDS', title: 'European Food Innovation Hub',
      companies: [
        { name: 'Unilever', website: 'https://www.unilever.com/', turnover: '>$1B' },
        { name: 'DSM-Firmenich', website: 'https://www.dsm-firmenich.com/', turnover: '>$1B' },
        { name: 'FrieslandCampina', website: 'https://www.frieslandcampina.com/', turnover: '>$1B' },
        { name: 'Royal Cosun', website: 'https://www.cosun.com/', turnover: '$100M-$1B' }
      ],
      desc: 'Leading European hub for food ingredients, flavors, natural sweeteners, and branded CPG. Haribo, Lärabar, and premium confectionery supply cluster. Strict EU food law compliance.',
      customs: { hts_code: '1704.90', duty_rate: '6.5% (MFN)', compliance_note: 'EU Regulation 178/2002 (General Food Law) applies. EFSA novel food approvals required for new ingredients. Full traceability mandatory.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'AA', sustainability_note: 'EU Farm to Fork strategy compliance. Palm oil traceability and RSPO certification required.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$3.2k/Sea' },
      industry_kpi: { label: 'Certifications', value: 'BRC / IFS / SQF' }
    },
    {
      id: 'h_food_4', lat: 20.7, lng: -103.4,
      hub: 'GUADALAJARA, MEXICO', title: 'Latin America Food & Beverage Hub',
      companies: [
        { name: 'Grupo Bimbo', website: 'https://www.grupobimbo.com/', turnover: '>$1B' },
        { name: 'FEMSA', website: 'https://www.femsa.com/', turnover: '>$1B' },
        { name: 'Sigma Alimentos', website: 'https://www.sigma-alimentos.com/', turnover: '>$1B' },
        { name: 'Lala Group', website: 'https://www.grupolala.com/', turnover: '$100M-$1B' }
      ],
      desc: 'Largest bakery, dairy, and beverage production cluster in Latin America. Strong USMCA advantages for US imports. Competitive cost vs. US domestic for baked goods, dairy, and packaged snacks.',
      customs: { hts_code: '1704.90', duty_rate: '0% (USMCA)', compliance_note: 'USMCA Rules of Origin apply. FDA Prior Notice required. Cold chain compliance mandatory for perishable goods.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Grupo Bimbo 100% renewable energy committed. Water stewardship programs active in water-stressed regions.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$2.2k/Ground' },
      industry_kpi: { label: 'Lead Time', value: '3-7 Days to US' }
    },
    {
      id: 'h_food_5', lat: 13.8, lng: 100.6,
      hub: 'BANGKOK, THAILAND', title: 'Southeast Asia Food Export Hub',
      companies: [
        { name: 'Charoen Pokphand Foods', website: 'https://www.cpfworldwide.com/', turnover: '>$1B' },
        { name: 'Thai Union Group', website: 'https://www.thaiunion.com/', turnover: '>$1B' },
        { name: 'Osotspa', website: 'https://www.osotspa.com/', turnover: '$100M-$1B' },
        { name: 'Malee Group', website: 'https://www.maleegroup.com/', turnover: '$100M-$1B' }
      ],
      desc: 'Major APAC export hub for canned goods, ready meals, sauces, tropical fruit, seafood, and beverages. Competitive labor costs and strong ASEAN FTA network. World\'s largest tuna processing cluster.',
      customs: { hts_code: '1604.20', duty_rate: '11.5% (MFN)', compliance_note: 'FDA Prior Notice required. Import Alert monitoring for Thai seafood. HACCP certification mandatory.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'IUU fishing monitoring required for seafood supply chains. MarinTrust and MSC certification preferred.' },
      logistics: { port_wait_days: 4, freight_cost_estimate: '$3.8k/FEU' },
      industry_kpi: { label: 'Export Reach', value: '150+ Countries' }
    },
    {
      id: 'h_food_6', lat: 41.6, lng: -93.6,
      hub: 'IOWA / MIDWEST, USA', title: 'North America Processed Meats & Protein Hub',
      companies: [
        { name: 'Smithfield Foods', website: 'https://www.smithfieldfoods.com/', turnover: '>$1B' },
        { name: 'Tyson Foods', website: 'https://www.tysonfoods.com/', turnover: '>$1B' },
        { name: 'Hormel Foods', website: 'https://www.hormelfoods.com/', turnover: '>$1B' },
        { name: 'Oscar Mayer (Kraft Heinz)', website: 'https://www.kraftheinzcompany.com/', turnover: '>$1B' }
      ],
      desc: 'The US Midwest is the global epicenter of processed meat manufacturing — bacon, sausage, hot dogs, ham, deli meat, and lunch meat. Iowa, Illinois, and Minnesota host the largest pork and poultry processing complexes. Smithfield is the world\'s largest pork processor; Tyson and Hormel produce pepperoni, sausage, and bacon at scale.',
      customs: { hts_code: '1601.00.20', duty_rate: '0% (domestic)', compliance_note: 'USDA FSIS inspection mandatory for all processed meats. HACCP plans required. Country of Origin Labeling (COOL) rules apply. Export requires USDA export certificate.' },
      esg: { carbon_footprint: 'Medium-High', ethical_rating: 'B', sustainability_note: 'Smithfield sustainability commitments include 25% GHG reduction. Tyson aims for net-zero by 2050. Animal welfare audits (PVP/PAACO) required by major retail customers.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.4k/FEU (domestic trucking)' },
      industry_kpi: { label: 'US Pork Processing', value: 'Smithfield: ~27% US market share' }
    },
    {
      id: 'h_food_7', lat: 44.6, lng: 11.3,
      hub: 'EMILIA-ROMAGNA, ITALY', title: 'European Charcuterie & Cured Meats Hub',
      companies: [
        { name: 'Fratelli Beretta', website: 'https://www.fratelliберетта.it/', turnover: '$100M-$1B' },
        { name: 'Inalca (Cremonini Group)', website: 'https://www.inalca.it/', turnover: '>$1B' },
        { name: 'Negroni Salumi', website: 'https://www.negroni.com/', turnover: '$100M-$1B' },
        { name: 'Salumificio Riva', website: 'https://www.rivagroup.it/', turnover: '$100M-$1B' }
      ],
      desc: 'Emilia-Romagna is the birthplace and PDO (Protected Designation of Origin) heartland for Italian cured meats: prosciutto di Parma, mortadella Bologna, salami Milano, coppa, bresaola, and pancetta. Pepperoni (a US-Italian hybrid) and salami are produced here for global food service supply chains including pizza toppings.',
      customs: { hts_code: '1602.49.40', duty_rate: '6.4% MFN (prepared pig meat, EU origin to US)', compliance_note: 'EU-US SPS agreement covers most cured meats. USDA FSIS import inspection required. PDO products require EU geographical indication documentation. Cold chain 0–4°C mandatory.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Consorzio del Prosciutto di Parma sustainability program. Italian salumi sector under EU Farm-to-Fork strategy. Animal welfare standards higher than US equivalents.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$3.1k/FEU (refrigerated)' },
      industry_kpi: { label: 'Prosciutto di Parma', value: '11M+ hams/yr certified PDO' }
    },
    {
      id: 'h_food_8', lat: 60.4, lng: 5.3,
      hub: 'BERGEN / ÅLESUND, NORWAY', title: 'Atlantic Seafood & Aquaculture Hub',
      companies: [
        { name: 'Mowi (Marine Harvest)', website: 'https://mowi.com/', turnover: '>$1B' },
        { name: 'SalMar', website: 'https://www.salmar.no/', turnover: '>$1B' },
        { name: 'Lerøy Seafood Group', website: 'https://www.leroyseafood.com/', turnover: '>$1B' },
        { name: 'Cermaq', website: 'https://www.cermaq.com/', turnover: '$100M-$1B' }
      ],
      desc: 'Norway is the world\'s largest producer of farmed Atlantic salmon and a top-5 seafood exporter. Bergen and Ålesund are the operational hubs for salmon farming, cod, herring, mackerel, and shrimp processing. Norwegian salmon (smoked salmon, fresh fillets, frozen portions) commands the highest global quality premiums.',
      customs: { hts_code: '0302.11.00', duty_rate: '0% MFN (fresh Atlantic salmon to US)', compliance_note: 'FDA Prior Notice mandatory. MSC/ASC certification standard for retail accounts. EU IUU fishing regulation compliance required for EU re-exports. Cold chain –18°C for frozen, 0–2°C for fresh.' },
      esg: { carbon_footprint: 'Low-Medium', ethical_rating: 'A', sustainability_note: 'Mowi and SalMar MSC/ASC certified. Norwegian aquaculture under strict environmental standards (traffic light system). Sea lice and escapes reporting mandatory.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$4.2k/FEU (reefer premium)' },
      industry_kpi: { label: 'Norway Salmon Export', value: '~1.5M tonnes/yr, $12B export value' }
    },
    {
      id: 'h_food_9', lat: 43.1, lng: -89.4,
      hub: 'WISCONSIN / NEW ZEALAND', title: 'Global Dairy & Cheese Sourcing Hub',
      companies: [
        { name: 'Leprino Foods', website: 'https://www.leprinofoods.com/', turnover: '>$1B' },
        { name: 'Dairy Farmers of America (DFA)', website: 'https://www.dfamilk.com/', turnover: '>$1B' },
        { name: 'Fonterra Co-operative', website: 'https://www.fonterra.com/', turnover: '>$1B' },
        { name: 'Saputo Inc.', website: 'https://www.saputo.com/', turnover: '>$1B' }
      ],
      desc: 'Wisconsin (the "Dairy State") and New Zealand (Fonterra) are the world\'s premium sources for mozzarella, cheddar, cream cheese, whey protein, milk powder, butter, and yogurt cultures. Leprino is the world\'s largest mozzarella producer supplying Pizza Hut, Domino\'s, and Papa John\'s. Fonterra supplies 1-in-3 dairy products globally by volume.',
      customs: { hts_code: '0406.10.28', duty_rate: '10% (fresh cheese, MFN to US)', compliance_note: 'FDA PMO (Pasteurized Milk Ordinance) compliance mandatory. USDA Dairy Import License required for over-quota imports. EU dairy exports to US require USDA-EU equivalence agreement compliance. New Zealand under US-NZ FTA negotiation.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'Fonterra committed to carbon neutrality by 2050. DFA sustainability program. Leprino zero-waste manufacturing programs. New Zealand GHG emissions pricing under ETS.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$2.1k/FEU (Wisconsin domestic); $4.8k/FEU (NZ)' },
      industry_kpi: { label: 'Global Mozzarella', value: 'Leprino: >40% US pizza cheese market' }
    },
    {
      id: 'h_food_10', lat: 33.7, lng: -84.4,
      hub: 'ATLANTA, USA / LEUVEN, BELGIUM', title: 'Global Beverages Manufacturing Hub',
      companies: [
        { name: 'The Coca-Cola Company', website: 'https://www.coca-colacompany.com/', turnover: '>$1B' },
        { name: 'PepsiCo', website: 'https://www.pepsico.com/', turnover: '>$1B' },
        { name: 'AB InBev', website: 'https://www.ab-inbev.com/', turnover: '>$1B' },
        { name: 'Monster Beverage Corp.', website: 'https://www.monsterbevcorp.com/', turnover: '>$1B' }
      ],
      desc: 'Atlanta is the HQ of Coca-Cola, the world\'s most distributed beverage. Leuven (Belgium) hosts AB InBev\'s global HQ. Together these hubs represent the soft drink, energy drink, sports drink, beer, and sparkling water supply chain. Concentrate manufacturing, syrup supply, and beverage ingredient sourcing all flow through these centers.',
      customs: { hts_code: '2202.10.00', duty_rate: '0% (domestic)', compliance_note: 'FDA GRAS status required for all beverage ingredients. TTB approval for alcoholic beverages. Nutrition Facts labeling mandatory per 21 CFR. Sugar tax compliance in applicable jurisdictions (UK, Mexico).' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Coca-Cola World Without Waste program (100% recyclable packaging by 2025). PepsiCo pep+ sustainability agenda. AB InBev 100% renewable electricity target.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.1k/FEU (domestic concentrate shipment)' },
      industry_kpi: { label: 'Coca-Cola Distribution', value: '200+ countries, 2B servings/day' }
    }
  ],

  // 6. METALS & MINING (Lithium, Copper, Steel, Aluminum, Rare Earths)
  metals: [
    {
      id: 'h_met_1', lat: -23.5, lng: -68.4,
      hub: 'ATACAMA, CHILE', title: 'Global Lithium & Copper Core',
      companies: [
        { name: 'SQM', website: 'https://www.sqm.com/' },
        { name: 'Codelco', website: 'https://www.codelco.com/' },
        { name: 'Albemarle Corporation', website: 'https://www.albemarle.com/' }
      ],
      desc: 'The "Saudi Arabia of Lithium." Primary source of EV battery-grade lithium carbonate and the world\'s largest copper reserves.',
      customs: { hts_code: '2836.91', duty_rate: '0% (US-Chile FTA)', compliance_note: 'Strategic mineral export regulations. Environmental permit tracking required.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'B', sustainability_note: 'Severe water rights conflicts with indigenous communities in Atacama. Monitor closely.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$3.5k/FEU' },
      industry_kpi: { label: 'Purity', value: '99.5% Li2CO3' }
    },
    {
      id: 'h_met_2', lat: -21.1, lng: 116.0,
      hub: 'PILBARA, AUSTRALIA', title: 'Iron Ore & Hard Rock Lithium',
      companies: [
        { name: 'BHP Group', website: 'https://www.bhp.com/' },
        { name: 'Rio Tinto', website: 'https://www.riotinto.com/' },
        { name: 'Pilbara Minerals', website: 'https://pilbaraminerals.com.au/' }
      ],
      desc: 'Massive scale iron ore and spodumene (hard rock lithium) extraction. World\'s most reliable mining jurisdiction.',
      customs: { hts_code: '2601.11', duty_rate: '0% (AUSFTA)', compliance_note: 'Clean origin. AUSFTA duty-free access to US market.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Transitioning mining fleets to electric/hydrogen. Traditional Owner agreements in place.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$2.9k/Bulk' },
      industry_kpi: { label: 'Volume', value: '800M Tons/Yr' }
    },
    {
      id: 'h_met_3', lat: 39.9, lng: 116.4,
      hub: 'HEBEI, CHINA', title: 'Steel & Rare Earth Processing Mega-Hub',
      companies: [
        { name: 'HBIS Group', website: 'http://www.hbisco.com/' },
        { name: 'Baowu Steel Group', website: 'http://www.baowugroup.com/' },
        { name: 'China Northern Rare Earth', website: 'https://www.northernrareearth.com/' }
      ],
      desc: 'The largest concentration of steel processing and rare earth separation capacity in the world. Cost-dominant but heavily tariffed.',
      customs: { hts_code: '7208.10', duty_rate: '25% (Sec 232 + 301)', compliance_note: 'Subject to both Section 232 (national security) and Section 301 (trade) tariffs.' },
      esg: { carbon_footprint: 'Very High', ethical_rating: 'C', sustainability_note: 'Severe air pollution. Heavy reliance on coal power. Decarbonization plan underway.' },
      logistics: { port_wait_days: 4, freight_cost_estimate: '$4.0k/Bulk' },
      industry_kpi: { label: 'Capacity', value: 'Global Dominant' }
    },
    {
      id: 'h_met_4', lat: 40.4, lng: -79.9,
      hub: 'PITTSBURGH, USA', title: 'US Domestic Steel & Aluminum',
      companies: [
        { name: 'US Steel Corporation', website: 'https://www.ussteel.com/' },
        { name: 'Alcoa Corporation', website: 'https://www.alcoa.com/' },
        { name: 'Nucor Steel', website: 'https://www.nucor.com/' }
      ],
      desc: 'Domestic US supplier for high-grade steel and aluminum for automotive, infrastructure, and defense. 100% tariff-free.',
      customs: { hts_code: '7208', duty_rate: '0% (Domestic)', compliance_note: 'Buy America Act compliant. Section 232 exempt (domestic origin).' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Electric arc furnace (EAF) adoption growing rapidly. Green steel targets set.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.0k/Rail' },
      industry_kpi: { label: 'Melt Origin', value: '100% US Domestic' }
    },
    {
      id: 'h_met_5', lat: -11.2, lng: 27.5,
      hub: 'ZAMBIA / DRC', title: 'African Copper & Cobalt Belt',
      companies: [
        { name: 'Glencore', website: 'https://www.glencore.com/' },
        { name: 'Ivanhoe Mines', website: 'https://www.ivanhoemines.com/' },
        { name: 'First Quantum Minerals', website: 'https://www.first-quantum.com/' }
      ],
      desc: 'Copper and cobalt extraction at massive scale. Critical for EV batteries (cobalt) and power infrastructure (copper). Artisanal mining risk in DRC.',
      customs: { hts_code: '7403.11', duty_rate: '1% (MFN)', compliance_note: 'OECD Due Diligence required. Cobalt from DRC requires conflict minerals audit (RMI).' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B-', sustainability_note: 'Artisanal/small-scale mining (ASM) risk in DRC. Child labor monitoring essential.' },
      logistics: { port_wait_days: 10, freight_cost_estimate: '$5.5k/FEU' },
      industry_kpi: { label: 'Cobalt Grade', value: '>30% Co' }
    }
  ],

  // 6. TEXTILES & APPAREL (Clothing, Shoes, Cotton, Leather, Fabrics)
  textiles: [
    {
      id: 'h_tex_1', lat: 23.8, lng: 90.4,
      hub: 'DHAKA, BANGLADESH', title: 'RMG (Ready-Made Garments) Hub',
      companies: [
        { name: 'Ha-Meem Group', website: 'https://www.hameemgroup.net/' },
        { name: 'Beximco', website: 'https://www.beximco.com/' },
        { name: 'DBL Group', website: 'https://dblgroup.com/' }
      ],
      desc: 'World\'s 2nd largest apparel exporter. Extremely competitive cost base for high-volume, fast fashion manufacturing.',
      customs: { hts_code: '6109.10', duty_rate: '16.5% (MFN)', compliance_note: 'Strict labor audits required (ACCORD/RSC). GSP benefits phased out for US market.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'B-', sustainability_note: 'Significant improvements post-Rana Plaza but structural risks remain. Annual unannounced audits required.' },
      logistics: { port_wait_days: 6, freight_cost_estimate: '$3.2k/FEU' },
      industry_kpi: { label: 'Cost/Unit', value: 'Extremely Low' }
    },
    {
      id: 'h_tex_2', lat: 10.8, lng: 106.6,
      hub: 'HO CHI MINH, VIETNAM', title: 'Performance Apparel & Footwear',
      companies: [
        { name: 'Pou Chen Group', website: 'https://www.pouchen.com/' },
        { name: 'Vinatex', website: 'https://vinatex.com.vn/' },
        { name: 'Eclat Textile', website: 'https://www.eclat.com.tw/' }
      ],
      desc: 'Premium athletic wear and footwear manufacturing. Nike, Adidas, and Under Armour\'s primary production hub.',
      customs: { hts_code: '6404.11', duty_rate: '20% (MFN)', compliance_note: 'Verify forced labor chain of custody. Vietnamese origin certification critical.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'Good factory conditions in export processing zones. High renewable energy adoption.' },
      logistics: { port_wait_days: 4, freight_cost_estimate: '$3.8k/FEU' },
      industry_kpi: { label: 'Quality Rating', value: 'A (Performance)' }
    },
    {
      id: 'h_tex_3', lat: 41.0, lng: 28.9,
      hub: 'ISTANBUL, TURKEY', title: 'Euro-Nearshore Fashion Hub',
      companies: [
        { name: 'LC Waikiki', website: 'https://corporate.lcwaikiki.com/' },
        { name: 'Mavi Jeans', website: 'https://www.mavi.com/' },
        { name: 'Kiğılı', website: 'https://www.kigili.com/' }
      ],
      desc: 'Fast turnaround, high-quality cotton and denim production for the European market. 2-3 week lead time vs 12+ weeks from Asia.',
      customs: { hts_code: '6203.42', duty_rate: '0% (EU Customs Union)', compliance_note: 'Rapid border clearance to EU. Turkish origin certificate required for preferential access.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'A-', sustainability_note: 'Organic cotton sourcing available. Good labor law enforcement.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$1.5k/Truck' },
      industry_kpi: { label: 'Lead Time', value: '2-3 Weeks' }
    },
    {
      id: 'h_tex_4', lat: 21.0, lng: 72.8,
      hub: 'GUJARAT, INDIA', title: 'Global Cotton & Textile Mill',
      companies: [
        { name: 'Arvind Ltd', website: 'https://www.arvind.com/' },
        { name: 'Welspun India', website: 'https://www.welspunindia.com/' },
        { name: 'Raymond Group', website: 'https://www.raymond.in/' }
      ],
      desc: 'Massive scale vertical integration from raw cotton spinning to finished home textiles. OECD-compliant supply chains.',
      customs: { hts_code: '5208.11', duty_rate: '10% (MFN)', compliance_note: 'Ensure no Xinjiang cotton blending. Indian origin certification required. UFLPA risk low.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'Heavy water usage in dyeing processes. Effluent treatment mandatory.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$3.5k/FEU' },
      industry_kpi: { label: 'Integration', value: 'Full Vertical' }
    }
  ],

// 7. PLASTICS, POLYMERS & ELASTOMERS
// Covers: TPE, ABS, PP, PVC, nylon, PEEK, polycarbonate, polyurethane,
//         silicone rubber, composites, injection/blow/roto molding,
//         epoxy resins, carbon fiber, fiberglass, packaging film
  plastics: [
    {
      id: 'h_pla_1', lat: 22.5, lng: 114.1,
      hub: 'GUANGDONG, CHINA', title: 'Global Injection Molding & Polymer Hub',
      companies: [
        { name: 'Kingfa Sci & Tech', website: 'https://www.kingfa.com/' },
        { name: 'Sinopec (polymer resins)', website: 'https://www.sinopec.com/' },
        { name: 'Hi-Tech Mold & Engineering', website: 'https://www.hitechmold.com/' }
      ],
      desc: 'World\'s largest plastic parts manufacturing cluster. Unmatched capacity for high-volume injection molding, blow molding, and overmolding across automotive, consumer, and industrial applications. Key hub for TPE, ABS, and PP compound production.',
      customs: { hts_code: '3926.90.99', duty_rate: '5.3% + 25% (Sec 301)', compliance_note: 'Section 301 List 3 tariffs apply to most finished plastic articles. Verify REACH and RoHS compliance for EU re-export.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'C+', sustainability_note: 'High energy intensity from molding presses. Plastics recycling mandates increasing under China\'s EPR regulations.' },
      logistics: { port_wait_days: 14, freight_cost_estimate: '$3.2k/FEU' },
      industry_kpi: { label: 'Capacity', value: 'World\'s Largest' }
    },
    {
      id: 'h_pla_2', lat: 49.4, lng: 8.7,
      hub: 'RHINE VALLEY, GERMANY', title: 'European Specialty Polymer Hub',
      companies: [
        { name: 'BASF SE', website: 'https://www.basf.com/' },
        { name: 'Covestro', website: 'https://www.covestro.com/' },
        { name: 'Lanxess', website: 'https://www.lanxess.com/' }
      ],
      desc: 'Global center for engineering thermoplastics, specialty resins, and polyurethane systems. BASF and Covestro supply automotive OEMs worldwide with IATF-grade nylon, PBT, and polycarbonate. Preferred source for high-performance, REACH-compliant polymers.',
      customs: { hts_code: '3908.10.00', duty_rate: '0% (EU–US MFN for polyamides)', compliance_note: 'REACH registration mandatory for EU-origin imports into EU. No Section 301. Preferred source for sustainability-focused supply chains.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'BASF committed to carbon-neutral operations by 2050. Circular economy portfolio (ChemCycling). High ESG transparency.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$2.8k/FEU' },
      industry_kpi: { label: 'Grade', value: 'Specialty / Engineering' }
    },
    {
      id: 'h_pla_3', lat: 29.7, lng: -95.0,
      hub: 'HOUSTON / BAYTOWN, USA', title: 'North American Polyolefin Hub',
      companies: [
        { name: 'ExxonMobil Chemical', website: 'https://www.exxonmobilchemical.com/' },
        { name: 'LyondellBasell', website: 'https://www.lyondellbasell.com/' },
        { name: 'Braskem America', website: 'https://www.braskem.com.br/' }
      ],
      desc: 'World\'s largest concentration of polyolefin (PP, PE, LLDPE) production. Domestic US supply with zero tariff exposure, short lead times, and full traceability. Preferred for USMCA-origin compliance and reshoring supply chains.',
      customs: { hts_code: '3902.10.00', duty_rate: '0% (domestic)', compliance_note: 'No import duties for domestic supply. USMCA-compliant for Canada/Mexico export. FDA food-contact grades available.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'Significant bio-based PP investments underway. Domestic production reduces shipping emissions substantially.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$0.8k/Truck' },
      industry_kpi: { label: 'Origin', value: '100% US Domestic' }
    },
    {
      id: 'h_pla_4', lat: 22.3, lng: 73.1,
      hub: 'VADODARA / SURAT, INDIA', title: 'Asia Polymer & Compounding Hub',
      companies: [
        { name: 'Reliance Industries (polymers)', website: 'https://www.ril.com/' },
        { name: 'Supreme Industries', website: 'https://www.supreme.co.in/' },
        { name: 'Atul Ltd', website: 'https://www.atulltd.com/' }
      ],
      desc: 'Reliance Industries operates the world\'s largest single-site refinery-petrochemical complex. Growing hub for polymer compounding, masterbatch, and specialty plastic components. Competitive cost base with improving quality standards.',
      customs: { hts_code: '3901.20.00', duty_rate: '0% (GSP suspended; MFN 6.5%)', compliance_note: 'India GSP benefits suspended for US importers. MFN rate applies. Strong cost advantage for commodity grades.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'B', sustainability_note: 'Reliance investing in green H2 and circular economy. Compounders increasingly using recycled feedstock.' },
      logistics: { port_wait_days: 8, freight_cost_estimate: '$3.0k/FEU' },
      industry_kpi: { label: 'Scale', value: 'Largest Asia Refinery' }
    },
    {
      id: 'h_pla_5', lat: 35.5, lng: 129.4,
      hub: 'ULSAN, SOUTH KOREA', title: 'Specialty Elastomer & Engineering Polymer Hub',
      companies: [
        { name: 'LG Chem', website: 'https://www.lgchem.com/' },
        { name: 'Lotte Chemical', website: 'https://www.lottechem.com/' },
        { name: 'SK Geo Centric', website: 'https://www.skgeocentric.com/' }
      ],
      desc: 'Global leader in specialty elastomers, ABS, and engineering plastics. LG Chem supplies automotive-grade ABS and SAN to Hyundai, GM, and Ford. KORUS FTA eliminates import duties for US buyers. Strong quality and traceability standards.',
      customs: { hts_code: '4002.59.00', duty_rate: '0% (KORUS FTA)', compliance_note: 'KORUS FTA duty elimination on synthetic rubber and most polymer grades. Korean origin documentation required.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'LG Chem target: 100% renewable energy by 2050. Bio-circular ABS available for automotive OEMs.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$2.6k/FEU' },
      industry_kpi: { label: 'Tariff', value: '0% KORUS FTA' }
    },
    {
      id: 'h_pla_6', lat: 1.3, lng: 103.7,
      hub: 'JURONG ISLAND, SINGAPORE', title: 'SE Asia Chemical & Polymer Gateway',
      companies: [
        { name: 'Shell Chemicals Asia', website: 'https://www.shell.com/' },
        { name: 'ExxonMobil Chemical Asia', website: 'https://www.exxonmobilchemical.com/' },
        { name: 'Mitsui Chemicals Asia', website: 'https://www.mitsuichemicals.com/' }
      ],
      desc: 'Jurong Island hosts 100+ chemical and petrochemical companies on a single industrial island. Key trading and production hub for polyolefins, PVC, and specialty chemicals for the ASEAN region. Excellent logistics, zero political supply risk.',
      customs: { hts_code: '3904.10.00', duty_rate: '6.5% (MFN PVC)', compliance_note: 'Singapore Free Trade Agreements with US (USSFTA) provide 0% duty on most goods. Favorable duty treatment.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Singapore EDB sustainability mandates. Carbon tax on industrial emitters. High environmental compliance standards.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$2.4k/FEU' },
      industry_kpi: { label: 'FTA Duty', value: '0% (USSFTA)' }
    }
  ],
  chemicals: [
    {
      id: 'h_che_1', lat: 51.5, lng: 6.8,
      hub: 'RHINE-RUHR, GERMANY', title: 'European Specialty Chemicals & Coatings Hub',
      companies: [
        { name: 'BASF', website: 'https://www.basf.com/' },
        { name: 'Evonik Industries', website: 'https://www.evonik.com/' },
        { name: 'Covestro', website: 'https://www.covestro.com/' },
        { name: 'Lanxess', website: 'https://www.lanxess.com/' }
      ],
      desc: 'BASF Ludwigshafen — largest integrated chemical complex in the world. Evonik and Lanxess adjacent. Covers adhesives, coatings, lubricants, surfactants, specialty polymers, and industrial gases. EU REACH compliance built-in.',
      customs: { hts_code: '3814.00.10', duty_rate: '3.7% (MFN solvents)', compliance_note: 'EU REACH registration required for >1 tonne/year. Dangerous Goods shipping (IMDG/ADR). SDS mandatory for all chemical imports.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'A-', sustainability_note: 'BASF Verbund system optimizes energy reuse. Scope 3 emissions reporting in place. Carbon neutrality target 2050.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$3.2k/FEU' },
      industry_kpi: { label: 'Complex Scale', value: 'Largest globally' }
    },
    {
      id: 'h_che_2', lat: 29.7, lng: -95.3,
      hub: 'HOUSTON, USA', title: 'US Gulf Coast Petrochemicals & Lubricants Hub',
      companies: [
        { name: 'Dow Chemical', website: 'https://www.dow.com/' },
        { name: 'Huntsman Corporation', website: 'https://www.huntsman.com/' },
        { name: 'LyondellBasell', website: 'https://www.lyondellbasell.com/' },
        { name: 'Celanese', website: 'https://www.celanese.com/' }
      ],
      desc: 'Texas Gulf Coast hosts 40% of US chemical production. Ethylene crackers, polyurethane systems, adhesives, epoxies, specialty lubricants, and industrial solvents. Proximity to Permian Basin feedstocks drives cost advantage.',
      customs: { hts_code: '2710.19.11', duty_rate: '0.1¢/barrel (lubricants)', compliance_note: 'EPA TSCA compliance required. Hazmat shipping regulations (49 CFR). California Prop 65 labeling for CA sales.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'B+', sustainability_note: 'Industry-leading carbon capture investment. ACC Responsible Care program. Circular economy initiatives in solvents.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$1.8k/FEU domestic' },
      industry_kpi: { label: 'US Output', value: '40% of national' }
    },
    {
      id: 'h_che_3', lat: 1.3, lng: 103.7,
      hub: 'JURONG ISLAND, SINGAPORE', title: 'Asia Pacific Adhesives & Coating Chemicals Hub',
      companies: [
        { name: 'Henkel Asia-Pacific', website: 'https://www.henkel-adhesives.com/' },
        { name: 'H.B. Fuller', website: 'https://www.hbfuller.com/' },
        { name: 'Momentive Performance Materials', website: 'https://www.momentive.com/' }
      ],
      desc: 'Jurong Island Singapore: premier APAC hub for adhesives, sealants, and specialty coatings serving electronics, automotive, and construction. Excellent bonded-warehouse infrastructure and ASEAN trade hub status.',
      customs: { hts_code: '3506.10.00', duty_rate: '0% (Singapore FTA)', compliance_note: 'REACH-equivalent Singapore Chemical Control Order. Hazmat IMDG compliance for export. APAC regulatory mapping service available.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Singapore EHS standards. Low-VOC formulations mandated. ISO 14001 site certification.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$2.1k/FEU' },
      industry_kpi: { label: 'ASEAN Access', value: '650M consumers' }
    }
  ],
  packaging: [
    {
      id: 'h_pkg_1', lat: 39.9, lng: 116.4,
      hub: 'BEIJING/TIANJIN, CHINA', title: 'Global Corrugated & Rigid Packaging Hub',
      companies: [
        { name: 'Nine Dragons Paper', website: 'https://www.ndpaper.com/' },
        { name: 'Lee & Man Paper', website: 'https://www.leemanpaper.com/' },
        { name: 'Greatview Aseptic', website: 'https://www.greatviewpack.com/' }
      ],
      desc: 'China produces 55% of global corrugated packaging and leads in rigid plastic containers, aseptic cartons, and flexible pouches. Nine Dragons alone runs 40+ paper mills. Major sourcing hub for boxes, clamshells, blister packs, and shrink film.',
      customs: { hts_code: '4819.10.00', duty_rate: '25% (Section 301 + 14.6% MFN)', compliance_note: 'FSC certification recommended for paper products. FDCA compliance for food-contact packaging. California AB 2287 recycled content rules.' },
      esg: { carbon_footprint: 'Medium-High', ethical_rating: 'B', sustainability_note: 'Nine Dragons runs recycled fiber operations. Improving energy intensity. Audit required for labor practices at tier 2 mills.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$2.9k/FEU' },
      industry_kpi: { label: 'Global Share', value: '55% corrugated' }
    },
    {
      id: 'h_pkg_2', lat: 48.8, lng: 2.3,
      hub: 'FRANCE / BENELUX', title: 'European Glass & Premium Packaging Hub',
      companies: [
        { name: 'Verallia', website: 'https://www.verallia.com/' },
        { name: 'Ardagh Group', website: 'https://www.ardaghgroup.com/' },
        { name: 'Smurfit Kappa', website: 'https://www.smurfitkappa.com/' },
        { name: 'DS Smith', website: 'https://www.dssmith.com/' }
      ],
      desc: 'France and Benelux are the center of European glass bottle, luxury packaging, and sustainable paperboard production. Verallia and Ardagh lead glass container output. Smurfit Kappa and DS Smith supply corrugated and circular packaging across EU.',
      customs: { hts_code: '7010.90.10', duty_rate: '5% (MFN glass containers)', compliance_note: 'EU Packaging and Packaging Waste Directive (PPWD) compliance. Extended Producer Responsibility (EPR) registration required in EU markets.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Glass is infinitely recyclable. EU EPR mandates minimum recycled content. Smurfit Kappa 100% chain of custody certified.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$2.8k/FEU' },
      industry_kpi: { label: 'Recyclability', value: 'Glass: infinite' }
    },
    {
      id: 'h_pkg_3', lat: 33.7, lng: -84.4,
      hub: 'ATLANTA, USA', title: 'North American Labels & Flexible Packaging Hub',
      companies: [
        { name: 'Avery Dennison', website: 'https://www.averydennison.com/' },
        { name: 'CCL Industries', website: 'https://www.cclind.com/' },
        { name: 'Sealed Air', website: 'https://www.sealedair.com/' },
        { name: 'Berry Global', website: 'https://www.berryglobal.com/' }
      ],
      desc: 'US Southeast hub for pressure-sensitive labels, shrink sleeves, flexible pouches, and protective packaging. Avery Dennison and CCL dominate labels. Sealed Air and Berry Global lead flexible and protective packaging.',
      customs: { hts_code: '4821.10.20', duty_rate: '0% (most labels, domestic)', compliance_note: 'FDA 21 CFR for food-contact. FTC Green Guides for recyclability claims. California SB 54 plastic packaging recycled content law.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'Industry transition to mono-material recyclable films. Avery Dennison CleanFlake technology. Recycled content mandates increasing in all major states.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$1.5k/FEU domestic' },
      industry_kpi: { label: 'Label Market', value: '$45B+ annually' }
    }
  ],
  medical: [
    {
      id: 'h_med_1', lat: 22.3, lng: 114.2,
      hub: 'HONG KONG / SHENZHEN', title: 'Asia Pacific Medical Device Manufacturing Hub',
      companies: [
        { name: 'Mindray Medical', website: 'https://www.mindray.com/' },
        { name: 'Medtronic China', website: 'https://www.medtronic.com/' },
        { name: 'Lepu Medical', website: 'https://www.lepumedical.com/' },
        { name: 'Microport Scientific', website: 'https://www.microport.com/' }
      ],
      desc: 'Shenzhen–Hong Kong corridor is the leading APAC hub for medical device manufacturing: diagnostics equipment, imaging, surgical tools, patient monitoring, and consumables. Lower-tier devices increasingly exported globally. Class II/III manufacturing under NMPA oversight.',
      customs: { hts_code: '9018.90.60', duty_rate: '0% (MFN surgical instruments)', compliance_note: 'FDA 510(k) or PMA required for US market entry. CE marking for EU. NMPA registration in China. Quality System Regulation (QSR) 21 CFR Part 820.' },
      esg: { carbon_footprint: 'Low-Medium', ethical_rating: 'B+', sustainability_note: 'ISO 13485 quality systems standard. Growing GreenHealth sustainability programs. Medical waste disposal regulations strictly enforced.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$2.8k/FEU' },
      industry_kpi: { label: 'Device Output', value: 'Largest APAC hub' }
    },
    {
      id: 'h_med_2', lat: 47.6, lng: 9.5,
      hub: 'LAKE CONSTANCE, GERMANY/SWITZERLAND', title: 'European Pharma API & MedTech Cluster',
      companies: [
        { name: 'Novartis', website: 'https://www.novartis.com/' },
        { name: 'Roche', website: 'https://www.roche.com/' },
        { name: 'B. Braun', website: 'https://www.bbraun.com/' },
        { name: 'Siemens Healthineers', website: 'https://www.siemens-healthineers.com/' }
      ],
      desc: 'Basel–Lake Constance triangle hosts the world\'s highest concentration of pharmaceutical API producers and high-end MedTech. Roche and Novartis dominate APIs. B. Braun leads infusion and surgical systems. Siemens Healthineers anchors imaging and diagnostics.',
      customs: { hts_code: '2941.10.00', duty_rate: '0% (MFN antibiotics/APIs)', compliance_note: 'EMA GMP certification required. US FDA import alert risk on non-compliant API manufacturers. ICH Q7 Good Manufacturing Practice for APIs. Swiss-EU bilateral regulatory alignment.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Roche net-zero operations commitment. Novartis environmental health and safety excellence program. High ethical audit standards.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$3.5k/FEU' },
      industry_kpi: { label: 'API Concentration', value: 'Highest globally' }
    },
    {
      id: 'h_med_3', lat: 17.4, lng: 78.5,
      hub: 'HYDERABAD, INDIA', title: 'Global Generic Pharma API & Formulations Hub',
      companies: [
        { name: 'Dr. Reddy\'s Laboratories', website: 'https://www.drreddys.com/' },
        { name: 'Aurobindo Pharma', website: 'https://www.aurobindo.com/' },
        { name: 'Hetero Drugs', website: 'https://www.heterodrugs.com/' },
        { name: 'Divi\'s Laboratories', website: 'https://www.divislaboratories.com/' }
      ],
      desc: 'Hyderabad is the pharmacy capital of India — and arguably the world for generics. India supplies 40% of generic drugs consumed in the US and 25% globally. API manufacturing cost advantage of 30–50% vs. Western producers.',
      customs: { hts_code: '2941.90.00', duty_rate: '0% (generics MFN)', compliance_note: 'FDA import alerts active on select manufacturers (check FDA database). WHO GMP and US FDA 21 CFR cGMP compliance required. Drug Master File (DMF) registration for US market.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'Improving post-CPCB effluent discharge enforcement. Zero liquid discharge mandates at major facilities. EHS audits recommended.' },
      logistics: { port_wait_days: 4, freight_cost_estimate: '$3.1k/FEU' },
      industry_kpi: { label: 'US Generic Supply', value: '40% market share' }
    }
  ],
  machinery: [
    {
      id: 'h_mac_1', lat: 48.1, lng: 11.6,
      hub: 'BAVARIA, GERMANY', title: 'Precision Machinery & Industrial Equipment Hub',
      companies: [
        { name: 'Siemens AG', website: 'https://www.siemens.com/' },
        { name: 'MAN Energy Solutions', website: 'https://www.man-es.com/' },
        { name: 'KSB Group', website: 'https://www.ksb.com/' },
        { name: 'Trumpf', website: 'https://www.trumpf.com/' }
      ],
      desc: 'Bavaria and Baden-Württemberg are the global center for Mittelstand precision machinery: CNC machining centers, industrial pumps, compressors, valves, hydraulics, and laser cutting systems. "Made in Germany" machinery commands 20–40% premium and 10–15 year asset life.',
      customs: { hts_code: '8413.70.20', duty_rate: '0% (industrial pumps, EU origin)', compliance_note: 'CE machinery directive 2006/42/EC. ATEX certification for explosive atmospheres. Pressure Equipment Directive (PED) for pressure vessels. Export control EAR/ITAR for dual-use equipment.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Germany\'s Energiewende drives energy-efficient machinery design. ISO 50001 energy management certifications common. Circular design for 20+ year service life.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$4.5k/FEU (heavy lift surcharge may apply)' },
      industry_kpi: { label: 'Asset Life', value: '10–15 years' }
    },
    {
      id: 'h_mac_2', lat: 31.2, lng: 121.5,
      hub: 'YANGTZE DELTA, CHINA', title: 'High-Volume Industrial Machinery & CNC Hub',
      companies: [
        { name: 'Haas Automation China', website: 'https://www.haascnc.com/' },
        { name: 'SANY Group', website: 'https://www.sanygroup.com/' },
        { name: 'Zoomlion', website: 'https://www.zoomlion.com/' },
        { name: 'DMG Mori China', website: 'https://www.dmgmori.com/' }
      ],
      desc: 'Shanghai–Suzhou–Hangzhou triangle leads global output of CNC machine tools, injection molding machines, industrial robots, compressors, pumps, and heavy construction equipment. 70% of world\'s machine tool production. Quality range from OEM-grade to budget.',
      customs: { hts_code: '8457.10.00', duty_rate: '25% (Section 301 CNC machining centers)', compliance_note: 'Section 301 tariffs apply to most Chinese machinery. CE/UL certification may be absent — verify for US/EU market entry. Import scrutiny on strategic manufacturing equipment.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'B', sustainability_note: 'Energy efficiency improving under Made in China 2025. Variable quality in ESG compliance. Factory audit and pre-shipment inspection strongly recommended.' },
      logistics: { port_wait_days: 6, freight_cost_estimate: '$3.8k/FEU (OOG cargo extra)' },
      industry_kpi: { label: 'Machine Tool Output', value: '70% of world production' }
    },
    {
      id: 'h_mac_3', lat: 34.7, lng: 135.5,
      hub: 'OSAKA / NAGOYA, JAPAN', title: 'Japan Precision Pumps, Valves & Automation Hub',
      companies: [
        { name: 'Ebara Corporation', website: 'https://www.ebara.co.jp/' },
        { name: 'Nidec', website: 'https://www.nidec.com/' },
        { name: 'Fanuc', website: 'https://www.fanuc.co.jp/' },
        { name: 'Keyence', website: 'https://www.keyence.com/' }
      ],
      desc: 'Osaka–Nagoya corridor specializes in ultra-precision industrial automation: servo motors, CNC controllers (Fanuc dominates globally), centrifugal and vacuum pumps (Ebara), and precision measurement (Keyence). Highest reliability and lowest defect rates in the industry.',
      customs: { hts_code: '8413.60.00', duty_rate: '0% (centrifugal pumps, MFN)', compliance_note: 'Japan-US Trade Agreement duty relief on most machinery. JIS certification for domestic use. Export controls on high-precision CNC (Wassenaar Arrangement). Lead times 16–24 weeks for precision units.' },
      esg: { carbon_footprint: 'Low-Medium', ethical_rating: 'A+', sustainability_note: 'Fanuc zero-waste factory operations. Ebara ISO 14001 certified. Japan\'s monozukuri culture emphasizes longevity and repairability.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$3.6k/FEU' },
      industry_kpi: { label: 'CNC Market', value: 'Fanuc: ~65% global share' }
    }
  ],

  // ── WOOD, PAPER & PULP ───────────────────────────────────────
  wood_paper: [
    {
      id: 'h_wp_1', lat: 61.5, lng: 25.7,
      hub: 'HELSINKI/TAMPERE, FINLAND', title: 'Nordic Pulp & Paper Excellence Hub',
      companies: [
        { name: 'UPM-Kymmene', role: 'Global pulp, paper, and plywood producer', tier: 'Tier-1' },
        { name: 'Stora Enso', role: 'Sustainable packaging, paperboard, and wood products', tier: 'Tier-1' },
        { name: 'Metsä Group', role: 'Pulp, tissue, and fresh forest fiber products', tier: 'Tier-1' },
        { name: 'Sappi Finland', role: 'Coated fine paper and dissolving pulp', tier: 'Tier-2' }
      ],
      desc: 'Finland and Sweden dominate global sustainable pulp and paper supply. PEFC/FSC certified supply chains, world-leading environmental standards, and advanced biomass utilization. Key grades: bleached kraft pulp (NBSK, BHKP), coated/uncoated paper, containerboard.',
      customs: { hts_code: '4702.00.00', duty_rate: '0% (MFN — kraft pulp, chemical)', compliance_note: 'EU EUDR timber traceability requirements from 2025. PEFC/FSC chain of custody mandatory for major retailers. No export licenses required for standard grades.' },
      esg: { carbon_footprint: 'Very Low', ethical_rating: 'A+', sustainability_note: 'Nordic mills operate on renewable energy (biomass, hydro). UPM and Stora Enso committed to science-based targets. FSC 100% certified fiber sourcing.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$2.8k/FEU' },
      industry_kpi: { label: 'NBSK Pulp Price', value: '~$1,200–$1,400/mt (2024)' }
    },
    {
      id: 'h_wp_2', lat: 45.4, lng: -75.7,
      hub: 'ONTARIO/QUEBEC, CANADA', title: 'North America Softwood Lumber Hub',
      companies: [
        { name: 'West Fraser Timber', role: 'Largest North American softwood lumber producer', tier: 'Tier-1' },
        { name: 'Resolute Forest Products', role: 'Newsprint, pulp, and specialty papers', tier: 'Tier-1' },
        { name: 'Canfor', role: 'SPF lumber and NBSK pulp', tier: 'Tier-1' },
        { name: 'Domtar', role: 'Uncoated freesheet paper and pulp', tier: 'Tier-2' }
      ],
      desc: 'Canada is the world\'s largest softwood lumber exporter. SPF (spruce-pine-fir) and Douglas fir grades serve US construction and industrial markets. Province of BC and Ontario are key production centers. Subject to ongoing US softwood lumber duty disputes.',
      customs: { hts_code: '4407.11.00', duty_rate: '8.05–17.9% CVD/AD (softwood lumber, US imports)', compliance_note: 'US Section 201 lumber duties and countervailing duties apply to most Canadian softwood. Hardwood grades (maple, oak) import at 0% MFN. USMCA applies for non-softwood grades. Lacey Act compliance for all wood imports.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'A', sustainability_note: 'SFI-certified supply chains. Canadian boreal forest management under provincial regulations. FPIC (Free Prior Informed Consent) protocols with Indigenous communities.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$1.2k/FEU (truck to US border)' },
      industry_kpi: { label: 'SPF Lumber', value: '~$450–$700/mbf (random length)' }
    },
    {
      id: 'h_wp_3', lat: -15.8, lng: -47.9,
      hub: 'SÃO PAULO/MINAS GERAIS, BRAZIL', title: 'Latin America Eucalyptus Pulp Hub',
      companies: [
        { name: 'Suzano', role: 'World\'s largest eucalyptus pulp producer', tier: 'Tier-1' },
        { name: 'Eldorado Brasil', role: 'BEKP and tissue production', tier: 'Tier-1' },
        { name: 'Klabin', role: 'Packaging paper and pulp', tier: 'Tier-2' }
      ],
      desc: 'Brazil\'s eucalyptus plantations yield the lowest-cost hardwood pulp (BEKP) globally with 7-year harvest cycles vs 25-40 years in Nordic countries. Suzano controls ~25% of global market pulp capacity. Key advantage: year-round harvesting and proximity to Atlantic shipping lanes.',
      customs: { hts_code: '4703.21.00', duty_rate: '0% (MFN — bleached hardwood kraft pulp)', compliance_note: 'EUDR deforestation compliance required for EU-bound shipments from 2025 (GPS coordinates to plantation level). CERFLOR/FSC certification standard. Brazil\'s IBAMA export permits for native species.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'B+', sustainability_note: 'Suzano certified to FSC, CERFLOR. Water stewardship programs in Cerrado region. Deforestation-free pledges for plantation pulp, but native forest adjacency risk exists.' },
      logistics: { port_wait_days: 4, freight_cost_estimate: '$3.1k/FEU to US East Coast' },
      industry_kpi: { label: 'BEKP Pulp Price', value: '~$900–$1,100/mt (2024)' }
    }
  ],

  // ── GLASS & CONSTRUCTION MATERIALS ───────────────────────────
  construction: [
    {
      id: 'h_con_1', lat: 30.9, lng: 112.2,
      hub: 'WUHAN/HUBEI, CHINA', title: 'Asia Pacific Flat Glass & Building Materials Hub',
      companies: [
        { name: 'CSG Holdings', role: 'Flat glass, coated glass, photovoltaic glass', tier: 'Tier-1' },
        { name: 'Fuyao Glass', role: 'Architectural and automotive flat glass', tier: 'Tier-1' },
        { name: 'CNBM (China National Building Material)', role: 'Cement, glass fiber, gypsum board', tier: 'Tier-1' },
        { name: 'China Jushi', role: 'World\'s largest fiberglass manufacturer', tier: 'Tier-1' }
      ],
      desc: 'China produces ~60% of global flat glass and dominates glass fiber manufacturing. Hubei and Guangdong are the core flat glass production centers. Critical note: US/EU tariffs apply on most Chinese glass imports. Chinese glass fiber faces 25% Section 301 tariffs in the US.',
      customs: { hts_code: '7005.10.00', duty_rate: '25% Section 301 (flat glass, US imports from China)', compliance_note: 'Section 301 List 3 tariffs apply to most flat glass and glass fiber. REACH compliance required for EU. UK Global Tariff at 5.4% for flat glass. Consider Vietnam or India re-sourcing for tariff mitigation.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'C', sustainability_note: 'Float glass production is energy-intensive. Chinese plants increasingly transitioning to natural gas from coal. CNBM has sustainability commitments but disclosure is limited.' },
      logistics: { port_wait_days: 6, freight_cost_estimate: '$4.2k/FEU (hazardous/oversize handling premium)' },
      industry_kpi: { label: 'Global Flat Glass', value: 'China: ~60% of world production' }
    },
    {
      id: 'h_con_2', lat: 51.5, lng: 10.4,
      hub: 'GERMANY / BENELUX', title: 'European Glass & Advanced Building Materials Hub',
      companies: [
        { name: 'Saint-Gobain', role: 'Flat glass, insulation, high-performance materials', tier: 'Tier-1' },
        { name: 'Guardian Industries', role: 'Float glass and coated glass', tier: 'Tier-1' },
        { name: 'AGC Glass Europe', role: 'Flat glass and specialty glass coatings', tier: 'Tier-1' },
        { name: 'Knauf', role: 'Gypsum board, insulation, and construction systems', tier: 'Tier-2' }
      ],
      desc: 'Western Europe leads in high-performance architectural glass (low-e coatings, triple glazing, fire-resistant glass), gypsum board systems, and mineral wool insulation. Germany and Belgium are key production hubs for Saint-Gobain, AGC, and Guardian flat glass lines.',
      customs: { hts_code: '7005.10.00', duty_rate: '3.7% MFN (flat glass to US)', compliance_note: 'EU CE marking required for construction products. EN 572 standard for flat glass. REACH compliance for chemical coatings. US imports from EU at MFN rates (3.7% for most flat glass). No anti-dumping duties.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Saint-Gobain committed to carbon neutrality by 2050. AGC and Guardian operating carbon reduction programs. European glass recycling rates >70% in most countries.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$3.8k/FEU (specialist glass freight)' },
      industry_kpi: { label: 'Low-E Glass Premium', value: '+35–60% vs clear float glass' }
    },
    {
      id: 'h_con_3', lat: 22.5, lng: 88.4,
      hub: 'KOLKATA / INDIA', title: 'South Asia Cement & Construction Materials Hub',
      companies: [
        { name: 'UltraTech Cement', role: 'Largest cement producer in Asia ex-China', tier: 'Tier-1' },
        { name: 'Ambuja Cements (Adani)', role: 'Blended cement and ready-mix concrete', tier: 'Tier-1' },
        { name: 'ACC Limited', role: 'Ordinary Portland cement and specialty grades', tier: 'Tier-2' },
        { name: 'Kajaria Ceramics', role: 'Leading ceramic and vitrified tile manufacturer', tier: 'Tier-2' }
      ],
      desc: 'India is the world\'s second-largest cement producer and a major ceramic tile exporter. Indian cement (OPC, PPC, PSC) and ceramic/porcelain tiles are competitively priced alternatives to Chinese sources with improving quality and logistics infrastructure.',
      customs: { hts_code: '2523.21.00', duty_rate: '0% MFN (Portland cement)', compliance_note: 'US import duty on cement: free under most circumstances. BIS (Bureau of Indian Standards) certification required for most construction products. ISI marks on cement. Ceramic tiles from India: 0-3.4% US MFN duty vs China tiles with AD/CVD.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'B', sustainability_note: 'UltraTech committed to reducing CO2 per ton of cement. Increasing use of fly ash and slag as clinker substitutes. India cement sector under National Cement Mission for emissions reduction.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$2.9k/FEU to US West Coast' },
      industry_kpi: { label: 'India Cement Capacity', value: '~600 MT/yr (2nd globally)' }
    }
  ],

  // ── CONSUMER GOODS & PERSONAL CARE ────────────────────────────
  consumer_goods: [
    {
      id: 'h_cg_1', lat: 22.3, lng: 114.2,
      hub: 'GUANGDONG, CHINA', title: 'Asia Pacific Consumer & Personal Care Hub',
      companies: [
        { name: 'Henkel (China Operations)', role: 'Laundry, hair care, and adhesive brands', tier: 'Tier-1' },
        { name: 'Reckitt (China plants)', role: 'Hygiene, health, and home products', tier: 'Tier-1' },
        { name: 'Nice Group', role: 'Detergent and personal care OEM/private label', tier: 'Tier-2' },
        { name: 'Guangdong Marubi', role: 'Cosmetics and skin care contract manufacturing', tier: 'Tier-2' }
      ],
      desc: 'Guangdong is the world\'s largest hub for consumer goods and personal care contract manufacturing. Thousands of OEM/ODM factories produce detergents, shampoos, cosmetics, and household cleaners for global brands. Key advantage: scale, cost, and speed-to-market for private label.',
      customs: { hts_code: '3305.10.00', duty_rate: '25% Section 301 (most personal care from China)', compliance_note: 'Section 301 tariffs on most personal care and household products. FDA OTC drug requirements for sunscreen, anti-dandruff products. CPSC labeling rules. EU Cosmetics Regulation (EC 1223/2009) for EU-bound goods. Consider Vietnam or India OEM to avoid tariffs.' },
      esg: { carbon_footprint: 'Medium-High', ethical_rating: 'C+', sustainability_note: 'Major brands imposing supplier sustainability codes. RSPO certification for palm-derivative ingredients. Factory audit programs (SMETA, SEDEX) standard for tier-1 suppliers.' },
      logistics: { port_wait_days: 7, freight_cost_estimate: '$3.9k/FEU' },
      industry_kpi: { label: 'Personal Care OEM Market', value: '~$28B globally (2024)' }
    },
    {
      id: 'h_cg_2', lat: 48.9, lng: 2.3,
      hub: 'PARIS/ILE-DE-FRANCE, FRANCE', title: 'European Luxury Beauty & Fragrance Hub',
      companies: [
        { name: 'L\'Oréal', role: 'World\'s largest beauty company, HQ and R&D', tier: 'Tier-1' },
        { name: 'LVMH Parfums', role: 'Prestige fragrance and luxury cosmetics', tier: 'Tier-1' },
        { name: 'Givaudan', role: 'Global flavor and fragrance ingredient leader', tier: 'Tier-1' },
        { name: 'Firmenich (now DSM-Firmenich)', role: 'Fragrance ingredients and finished compounds', tier: 'Tier-2' }
      ],
      desc: 'France is the global capital of luxury beauty, fragrance, and high-performance cosmetics. Paris and the Grasse region (Côte d\'Azur) produce premium fragrance ingredients and finished perfumes. L\'Oréal\'s R&D campus develops breakthrough formulations for mass and prestige segments.',
      customs: { hts_code: '3303.00.20', duty_rate: '0% MFN (perfume/toilet water to US)', compliance_note: 'EU Cosmetics Regulation 1223/2009 compliance mandatory for EU production. US FDA cosmetics registration under MoCRA (2023). IFRA compliance for fragrance allergens. Country of Origin "Made in France" designation requires substantial transformation in France.' },
      esg: { carbon_footprint: 'Low-Medium', ethical_rating: 'A', sustainability_note: 'L\'Oréal L\'Oréal for the Future program targeting carbon neutrality by 2025. LVMH LIFE 360 sustainability program. Givaudan committing to 100% sustainably sourced naturals by 2030.' },
      logistics: { port_wait_days: 4, freight_cost_estimate: '$3.2k/FEU' },
      industry_kpi: { label: 'French Cosmetics Exports', value: '€19B/yr (2nd global exporter)' }
    },
    {
      id: 'h_cg_3', lat: 28.6, lng: 77.2,
      hub: 'DELHI/UTTAR PRADESH, INDIA', title: 'South Asia Personal Care & Detergent Hub',
      companies: [
        { name: 'Hindustan Unilever', role: 'Personal care, home care OEM and brands', tier: 'Tier-1' },
        { name: 'Procter & Gamble India', role: 'Detergent, hair care, and oral care manufacturing', tier: 'Tier-1' },
        { name: 'Godrej Consumer Products', role: 'Hair color, soaps, and insecticides', tier: 'Tier-2' },
        { name: 'Jyothy Labs', role: 'Fabric care and personal hygiene products', tier: 'Tier-2' }
      ],
      desc: 'India\'s consumer goods sector is the world\'s fastest-growing, driven by a 1.4B population and rising middle class. HUL, P&G, and homegrown brands operate large-scale manufacturing in Uttar Pradesh and Himachal Pradesh. India is an emerging export hub for halal-certified and Ayurvedic personal care products.',
      customs: { hts_code: '3401.11.50', duty_rate: '0% MFN (soap and detergent bars to US)', compliance_note: 'US FDA cosmetics MoCRA registration for new importers. FSSAI (Food Safety) for ingested personal care items. BIS certification for some household products. EU REACH and Cosmetics Regulation for EU market access.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'HUL Compass sustainability goals. P&G India renewable energy commitments. Growing Ayurvedic/natural ingredients supply chain with ECOCERT certification.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$2.7k/FEU to US East Coast' },
      industry_kpi: { label: 'India FMCG Market', value: '~$110B (2024), 10% YoY growth' }
    }
  ]
}

// ============================================================
// QUERY CATEGORIZER — Maps user queries to database categories
// Uses keyword priority: specific materials > applications > platforms
// ============================================================
// Picks the hub within a category most relevant to the specific query,
// instead of always defaulting to whichever hub happens to be listed
// first. Categories like "metals" bundle several distinct commodities
// (lithium, copper, steel, cobalt) under one roof, so a query like "steel
// rebar" needs to surface the steel hub, not a lithium mine, as the
// headline recommendation. Uses each hub's own title/desc as the source
// of keywords so it works across every category without hand-maintaining
// a separate keyword map per hub.
const STOPWORDS = new Set(['and','the','for','with','core','hub','mega','global','belt','processing','world','largest','primary','source']);
export function pickBestHub(hubs, query) {
  if (!hubs || hubs.length === 0) return null;
  const q = (query || '').toLowerCase();
  let best = hubs[0], bestScore = 0;
  for (const h of hubs) {
    const words = `${h.title || ''} ${h.desc || ''}`.toLowerCase().split(/[^a-z0-9]+/)
      .filter(w => w.length > 3 && !STOPWORDS.has(w));
    const score = words.reduce((s, w) => s + (q.includes(w) ? 1 : 0), 0);
    if (score > bestScore) { bestScore = score; best = h; }
  }
  return best;
}

export function categorizeQuery(query) {
  const q = query.toLowerCase()
  const match = (keywords) => keywords.some(kw => q.includes(kw))

  // ─────────────────────────────────────────────────────────────────────────
  // PRE-CHECKS: High-specificity compound terms that would be misrouted by
  // later broad-keyword checks. These fire before any category P1–P18.
  // ─────────────────────────────────────────────────────────────────────────

  // Pre-A: Automotive compound parts (before plastics P1 catches injection mold
  //        or metals P7 catches iron/alloy/casting/forging)
  if (match([
    'brake caliper', 'brake disc', 'brake rotor', 'brake drum',
    'exhaust manifold', 'exhaust pipe', 'exhaust system',
    'wheel rim', 'wheel hub', 'alloy wheel', 'mag wheel',
    'transmission shaft', 'propshaft', 'driveshaft', 'crankshaft', 'camshaft',
    'steering knuckle', 'control arm', 'suspension arm', 'sway bar',
    'bumper fascia', 'bumper cover', 'fender liner',
    'catalytic converter', 'turbocharger', 'intercooler auto',
    'abs sensor', 'auto sensor', 'oxygen sensor auto', 'map sensor auto',
    'cv joint', 'cv axle', 'tie rod', 'ball joint', 'strut assembly',
    'piston automotive', 'connecting rod auto', 'valve cover auto'
  ])) return 'automotive'

  // Pre-B: Chemical applications of PU/coatings (before plastics P1 catches polyurethane)
  if (match([
    'polyurethane coating', 'polyurethane sealant', 'polyurethane varnish',
    'polyurethane adhesive', 'polyurethane paint', 'polyurethane finish',
    'pu coating', 'pu sealant', 'pu varnish', 'pu adhesive', 'pu paint',
    '2k pu', '1k pu', '2-component pu', 'solvent-borne coating',
    'water-based varnish', 'wood finish varnish', 'floor varnish',
    'alkyd varnish', 'acrylic varnish', 'lacquer finish',
    'lithium grease', 'lithium complex grease', 'lithium complex', 'lithium soap grease',
    'nlgi grade', 'nlgi 2', 'nlgi 3', 'nlgi 00',
    'petroleum jelly', 'petrolatum', 'white mineral oil', 'white oil', 'paraffin wax',
    'mineral oil', 'technical vaseline', 'vaseline industrial'
  ])) return 'chemicals'

  // Pre-C: Construction glass & fiber terms (before textiles 'woven' / metals 'iron')
  if (match([
    'flat glass', 'float glass', 'architectural glass', 'low-e glass',
    'low iron glass', 'low-iron glass', 'extra clear glass',
    'glass fiber roving', 'glass fiber woven', 'glass fiber mat',
    'e-glass fiber', 'e-glass woven', 's-glass', 'ecr glass',
    'glass wool insulation', 'glass fiber fabric', 'woven roving glass',
    'ready mix concrete', 'ready-mix concrete', 'rmc concrete',
    'concrete pump', 'cement mix', 'concrete block masonry',
    'iron aggregate', 'gravel aggregate',
    // Basalt must be here — P13 construction fires AFTER food P5a which catches 'salt' inside 'basalt'
    'basalt', 'basalt fiber', 'basalt rock', 'basalt stone', 'basalt wool'
  ])) return 'construction'

  // Pre-D: Medical compound terms (before metals 'metal' or packaging 'packaging' intercept)
  if (match([
    'coronary stent', 'vascular stent', 'drug eluting stent', 'bare metal stent',
    'stent delivery', 'stent coronary', 'stent vascular', 'stent implant',
    'tyvek pouch', 'medical tyvek', 'sterile pouch',
    'sterile wrap', 'sterile barrier', 'medical device packaging',
    'nitrile examination', 'nitrile exam glove', 'exam glove', 'medical glove',
    'orthopedic implant', 'spinal implant', 'hip implant', 'dental implant',
    'nitrile medical', 'hospital grade', 'surgical grade',
    'gmp grade', 'usp grade', 'ep grade', 'bp grade pharmaceutical'
  ])) return 'medical'

  // Pre-E: Consumer goods compound terms (before packaging 'label', textiles 'fabric',
  //         metals 'aluminum', food 'cream' intercept)
  if (match([
    'fabric softener', 'fabric conditioner', 'laundry softener',
    'private label cosmetic', 'private label personal care', 'oem cosmetic',
    'oem shampoo', 'oem skincare', 'contract cosmetic',
    'aluminum-free deodorant', 'aluminum free deodorant', 'aluminum-free',
    'ammonia-free', 'paraben-free', 'sulfate-free',
    'hair dye kit', 'hair dye pack', 'hair dye brand',
    // cotton swab/pad — must be here before textiles P8 catches 'cotton'
    'cotton swab', 'cotton ball', 'cotton pad', 'cotton round',
    'hair dye cream', 'hair color cream', 'face cream', 'body cream',
    'moisturizer cream', 'day cream', 'night cream', 'hand cream',
    'shampoo label', 'conditioner label', 'cosmetic label',
    'private label beauty', 'white label cosmetic',
    'sheet mask', 'clay mask', 'face mask pack', 'peel mask', 'sleep mask',
    'mud mask', 'charcoal mask', 'gel mask', 'eye mask beauty', 'face mask beauty',
    'hair dye', 'hair color', 'ammonia-free hair'
  ])) return 'consumer_goods'

  // Pre-F: Agriculture terms that would be caught by food's broad keywords
  //   'fish feed' contains 'fish', 'sunflower seed crop' contains 'sunflower seed'
  if (match([
    'fish feed', 'fish meal', 'fish oil crude', 'fish oil agri',
    'sunflower seed crop', 'sunflower crop', 'seed corn', 'seed wheat',
    'seed potato', 'seed soybean', 'cover crop seed'
  ])) return 'agriculture'

  // Pre-F2: Processed food terms that collide with agriculture raw keywords
  if (match([
    'wheat flour', 'bread flour', 'all purpose flour', 'whole wheat flour',
    'steak cut', 'ribeye steak', 'strip steak', 'sirloin steak', 'beef steak',
    'burger bun', 'hamburger bun', 'brioche bun', 'slider bun',
    'beef patty', 'frozen patty', 'beef burger', 'plant burger',
    'chicken nugget', 'chicken strip', 'chicken tender', 'breaded chicken',
    'pork belly sliced', 'pulled pork', 'corned beef', 'roast beef',
    'canned black bean', 'canned kidney bean', 'canned chickpea', 'canned lentil',
    'canned corn', 'canned tomato', 'diced tomato canned',
    'grain bar', 'whole grain cereal', 'multigrain bread',
    'rice cake', 'rice noodle', 'rice cracker', 'puffed rice',
    'corn tortilla', 'corn chip', 'corn flour', 'cornmeal', 'polenta',
    'soy protein', 'soy flour', 'textured soy'
  ])) return 'food'

  // ─────────────────────────────────────────────────────────────────────────
  // MAIN PRIORITY CHECKS
  // ─────────────────────────────────────────────────────────────────────────

  // Priority 1: Plastics, polymers, elastomers, rubber, composites
  // Must be first — "injection mold" would otherwise fall to electronics default
  if (match([
    'tpe', 'thermoplastic elastomer', 'thermoplastic', 'thermoset',
    'polymer', 'polymers', 'resin compound', 'plastic resin',
    'abs plastic', 'abs compound', 'polypropylene', 'polyethylene',
    'hdpe', 'ldpe', 'lldpe', 'pvc pipe', 'pvc compound',
    'nylon compound', 'nylon part', 'nylon 6 ', 'nylon 66', 'nylon 12',
    'pa66', 'pa6 ', 'pa12', 'pa11',
    'peek', 'pom resin', 'delrin', 'acetal',
    'polycarbonate', 'polyurethane resin', 'polyurethane elastomer',
    'polyurethane part', 'polyurethane compound', 'pu foam', 'foam molding',
    'injection mold', 'injection mould', 'injection molded', 'injection moulded',
    'blow mold', 'blow mould', 'roto mold', 'roto mould',
    'plastic part', 'plastic component', 'plastic housing', 'plastic enclosure',
    'molded part', 'moulded part', 'overmold', 'overmould', 'insert mold',
    'elastomer', 'epdm', 'nbr rubber', 'silicone rubber', 'silicone part',
    'rubber compound', 'synthetic rubber', 'natural rubber',
    'carbon fiber', 'carbon fibre', 'fiberglass', 'fibreglass',
    'composite part', 'epoxy resin', 'epoxy compound',
    'plastic film', 'packaging film', 'stretch film', 'shrink wrap',
    'plastic extrusion', 'extrusion profile', 'plastic tube',
    'masterbatch', 'color concentrate', 'flame retardant compound',
    'engineering plastic', 'specialty polymer', 'bio-based plastic',
    'rubber', 'foam', 'latex', 'vinyl', 'resin',
    'natural rubber sheet', 'latex foam', 'latex sheet', 'latex material',
    'vinyl sheet', 'vinyl film', 'vinyl material', 'pvc vinyl',
    'pet resin', 'petg', 'petg sheet', 'pet bottle resin',
    'neoprene', 'neoprene rubber', 'neoprene sheet', 'neoprene foam',
    'butyl rubber', 'butyl', 'iir rubber', 'chlorobutyl',
    'polystyrene', 'eps', 'expandable polystyrene', 'hips plastic',
    'acrylic sheet', 'acrylic resin', 'acrylic glass', 'pmma sheet',
    'polycarbonate sheet', 'polycarbonate resin', 'pc sheet',
    'pu rubber', 'foam sheet', 'foam block', 'foam roll', 'foam slab'
  ])) return 'plastics'

  // Priority 2: Specific industrial components (magnets, bearings, seals, etc.)
  // Must be before automotive to catch "magnets for cars/visors" → industrial category
  if (match([
    'magnet', 'neodymium', 'ndfeb', 'ferrite magnet', 'permanent magnet',
    'bearing', 'roller bearing', 'ball bearing', 'needle bearing',
    'fastener', 'paper clip', 'paperclip', 'paper clips', 'paperclips', 'binder clip', 'binder clips', 'staple', 'stapler', 'office clip',
    'o-ring', 'gasket', 'seal ring', 'lip seal',
    'actuator', 'solenoid', 'precision gear', 'worm gear', 'helical gear',
    'industrial motor', 'servo motor', 'stepper motor',
    'spring component', 'disc spring', 'compression spring',
    'coil spring', 'torsion spring', 'leaf spring', 'helical spring',
    'extension spring', 'spring steel wire', 'spring washer',
    'hydraulic fitting', 'pneumatic valve', 'precision machined',
    'sintered', 'powder metallurgy',
    'screw', 'machine screw', 'wood screw', 'self-tapping screw', 'hex screw',
    'bolt', 'hex bolt', 'carriage bolt', 'anchor bolt', 'stud bolt', 'eye bolt',
    'nut', 'hex nut', 'lock nut', 'wing nut', 'coupling nut', 'flange nut',
    'washer', 'flat washer', 'lock washer', 'spring washer', 'tab washer',
    'rivet', 'blind rivet', 'pop rivet', 'solid rivet', 'tubular rivet',
    'hinge', 'door hinge', 'piano hinge', 'butt hinge', 'concealed hinge',
    'bracket', 'angle bracket', 'corner bracket', 'mounting bracket', 'shelf bracket',
    'flange', 'pipe flange', 'weld neck flange', 'slip-on flange', 'blind flange',
    'coupling', 'shaft coupling', 'flexible coupling', 'rigid coupling', 'hose coupling',
    'bushing', 'sleeve bushing', 'flanged bushing', 'bronze bushing',
    'needle', 'industrial needle', 'knitting needle', 'sewing machine needle',
    'pipe', 'steel pipe', 'seamless pipe', 'welded pipe', 'pipe fitting',
    'elbow fitting', 'tee fitting', 'reducer fitting', 'pipe nipple',
    'dowel pin', 'cotter pin', 'clevis pin', 'split pin', 'roll pin',
    'key stock', 'keyway', 'woodruff key',
    'chain', 'roller chain', 'conveyor chain', 'drive chain', 'link chain'
  ])) return 'industrial'

  // Priority 3: Specific metals and minerals (raw material level)
  if (match([
    'lithium', 'cobalt', 'neodymium oxide', 'rare earth mineral',
    'titanium sponge', 'tungsten', 'molybdenum', 'platinum',
    'palladium', 'nickel ore', 'iron ore', 'copper ore',
    'steel coil', 'steel sheet', 'aluminum ingot', 'aluminum billet',
    'copper cathode', 'zinc ingot', 'tin ingot'
  ])) return 'metals'

  // Priority 3: Automotive applications/platforms
  if (match([
    'automotive', 'vehicle', 'sun visor', 'visor', 'headliner',
    'instrument panel', 'dashboard', 'bumper', 'chassis',
    'suspension', 'brake pad', 'powertrain', 'motor vehicle',
    'tier-1', 'tier 1', 'tier-2', 'oem automotive',
    'nafta', 'usmca', 'ford', 'gm ', 'toyota', 'honda',
    'bmw', 'mercedes', 'stellantis', 'rivian', 'seat assembly',
    'window regulator', 'door panel', 'fuel system',
    // Compound material+automotive terms — must be checked before the
    // standalone material-only lists below (e.g. "leather car seats"
    // would otherwise match "leather" under textiles and never reach
    // the generic "car" keyword, which is checked much later).
    'car seat', 'car seats', 'auto seat', 'vehicle seat', 'seat cover',
    'seat trim', 'auto upholstery', 'vehicle upholstery', 'car interior',
    'car door', 'car body', 'auto body panel', 'car wiring', 'wire harness',
    'trim', 'interior trim', 'plated trim', 'door trim', 'plastic trim',
    'cargo shade', 'cargo cover', 'shade cover', 'window shade', 'sunshade',
    'cargo liner', 'boot liner', 'parcel shelf', 'tonneau', 'boot cover',
    'interior accessory', 'interior component',
    'lumbar support automotive', 'lumbar support seat', 'lumbar cushion car',
    'lumbar support', 'lumbar pillow', 'lumbar pad', 'lumbar cushion'
  ])) return 'automotive'

  // Priority 4: Electronics and semiconductors
  if (match([
    'semiconductor', 'wafer', 'pcb', 'printed circuit',
    'display panel', 'lcd', 'oled', 'processor', 'memory chip',
    'microchip', 'microcontroller', 'fpga',
    'asic chip', 'asic design', 'custom asic',
    'ic chip', 'logic chip', 'chip component', 'chip package', 'bare chip',
    'glass panel', 'cover glass', 'camera module',
    'iphone', 'samsung phone', 'tsmc', 'apple supply',
    'circuit board', 'nand', 'dram', 'hbm',
    'monitor', 'computer monitor', 'display monitor', 'curved monitor',
    'gaming monitor', 'monitor screen', '4k monitor', '1080p monitor',
    'screen', 'flat screen', 'touch screen', 'touchscreen', 'led screen',
    'television', 'smart tv', 'led tv', 'oled tv', 'qled tv', '4k tv', 'tv screen',
    'tv panel', 'flat panel tv', 'streaming device',
    'projector', 'laser projector', 'dlp projector', 'home projector',
    'printer', 'inkjet printer', 'laser printer', '3d printer',
    'keyboard', 'mechanical keyboard', 'wireless keyboard', 'computer keyboard',
    'mouse', 'computer mouse', 'wireless mouse', 'gaming mouse',
    'headphone', 'earphone', 'earbuds', 'wireless headphone', 'noise cancelling',
    'speaker', 'bluetooth speaker', 'portable speaker', 'smart speaker',
    'webcam', 'usb camera', 'security camera', 'ip camera', 'cctv camera',
    'router', 'wifi router', 'network switch', 'modem', 'access point',
    'hard drive', 'ssd', 'solid state drive', 'hdd', 'nvme',
    'ram', 'memory module', 'ddr4', 'ddr5', 'dimm'
  ])) return 'electronics'

  // Pre-G0: Packaging containers that contain food substrings
  //   'drum' contains 'rum', so must be caught before food P5a fires
  if (match([
    'drum', 'steel drum', 'plastic drum', 'fiber drum', 'ibc drum',
    'chemical drum', 'drum packaging', 'open head drum', 'closed head drum',
    'wooden barrel', 'oak barrel', 'wine barrel', 'barrel drum'
  ])) return 'packaging'

  // Pre-G: Wood species & industrial fibers that contain food substrings
  //   'teak' contains 'tea', 'twine' contains 'wine' → protect before food P5a
  if (match([
    'teak', 'teak wood', 'teak plank', 'teak timber', 'teak furniture', 'teak deck',
    'mahogany', 'rosewood', 'ebony wood', 'balsa wood', 'balsawood',
    'twine', 'baling twine', 'sisal twine', 'jute twine', 'hemp twine', 'garden twine'
  ])) return 'wood_paper'

  // Priority 5a: Processed food, confectionery, CPG, beverages — BEFORE raw agriculture
  if (match([
    // Confectionery & candy
    'marshmallow', 'candy', 'confectionery', 'confection', 'gummy', 'gummies',
    'chocolate', 'cocoa powder', 'praline', 'truffle', 'fudge', 'caramel',
    'hard candy', 'soft candy', 'lollipop', 'nougat', 'marzipan', 'fondant',
    'sugar confection', 'sugar coated', 'jelly bean', 'licorice',
    // Snacks & baked goods
    'cookie', 'biscuit', 'cracker', 'pretzel', 'potato chip',
    'tortilla chip', 'popcorn', 'granola bar', 'protein bar', 'energy bar',
    'bread', 'bakery', 'pastry', 'croissant', 'muffin', 'donut', 'doughnut',
    'cake mix', 'baking mix', 'flour based', 'cereal', 'breakfast cereal',
    'wafer', 'waffle', 'pancake mix',
    'sourdough', 'tortilla', 'flatbread', 'pita bread', 'pita wrap', 'pita pocket', 'granola', 'oatmeal', 'porridge',
    'gluten free', 'trail mix', 'dried fruit', 'fruit snack', 'nut snack',
    'mixed nuts', 'roasted nuts', 'nuts and', 'seeds mix', 'sunflower seed', 'pumpkin seed',
    // Pasta, noodles, grains (processed)
    'pasta', 'noodle', 'instant noodle', 'ramen', 'spaghetti', 'macaroni',
    // Processed meats (all types)
    'sausage', 'pepperoni', 'salami', 'chorizo', 'mortadella', 'bologna',
    'pastrami', 'prosciutto', 'deli meat', 'lunch meat', 'luncheon meat',
    'hot dog', 'frankfurter', 'wiener',
    'bratwurst', 'brat ', 'kielbasa', 'andouille', 'merguez', 'liverwurst',
    'summer sausage', 'breakfast sausage', 'italian sausage', 'pork sausage',
    'bacon', 'ham slice', 'cured ham', 'smoked ham', 'smoked meat', 'cured meat',
    'jerky', 'meat snack', 'charcuterie',
    // Seafood (processed/packaged)
    'smoked salmon', 'salmon fillet', 'salmon steak', 'salmon portion',
    'canned tuna', 'tuna can', 'tuna steak', 'sardine', 'anchovy',
    'cod fillet', 'cod fish', 'tilapia', 'halibut', 'haddock', 'pollock',
    'mahi mahi', 'sea bass', 'trout fillet', 'catfish fillet',
    'shrimp frozen', 'frozen shrimp', 'lobster tail', 'lobster meat', 'fish fillet',
    'crab meat', 'crab leg', 'canned fish', 'seafood product', 'seafood pack',
    // Sauces, condiments & flavoring
    'ketchup', 'hot sauce', 'soy sauce', 'oyster sauce', 'fish sauce',
    'mayonnaise', 'mustard', 'salad dressing', 'vinegar', 'seasoning mix',
    'spice blend', 'flavor extract', 'food flavoring', 'food coloring',
    'gelatin', 'pectin', 'agar agar', 'food additive', 'preservative',
    'food ingredient', 'flavor compound',
    'tomato paste', 'pizza sauce', 'bbq sauce', 'sriracha', 'teriyaki',
    'hummus', 'salsa', 'peanut butter', 'almond butter',
    'jam', 'jelly', 'jelly preserve', 'maple syrup', 'honey jar', 'honey pack',
    'royal jelly', 'fruit jelly', 'jello',
    // Oils & fats (edible)
    'olive oil', 'vegetable oil', 'cooking oil', 'sunflower oil',
    'coconut oil', 'sesame oil', 'canola oil', 'edible oil',
    // Spices, seasonings & dry ingredients
    'flour baking', 'baking flour',
    'granulated sugar', 'table salt', 'sea salt', 'kosher salt', 'rock salt',
    'pink salt', 'himalayan salt', 'iodized salt', 'curing salt', 'pickling salt',
    'salt flakes', 'sea salt flakes', 'fleur de sel', 'salt',
    'brown sugar', 'cane sugar', 'powdered sugar', 'icing sugar', 'raw sugar',
    'demerara sugar', 'sugar crystals', 'sugar',
    'sodium chloride', 'food grade salt',
    'spices', 'cinnamon', 'turmeric', 'dried herbs', 'garlic powder',
    'onion powder', 'paprika', 'cumin', 'oregano', 'black pepper',
    // Beverages
    'juice', 'fruit juice', 'soft drink', 'cola drink', 'lemonade',
    'kombucha', 'carbonated water', 'sparkling water', 'iced tea',
    'energy drink', 'sports drink', 'bottled water', 'mineral water',
    'tea blend', 'instant coffee', 'coffee pod',
    // Dairy, eggs & alternatives
    'milk powder', 'baby formula', 'infant formula', 'powdered milk',
    'cheese', 'mozzarella', 'cheddar', 'cream cheese', 'cottage cheese',
    'yogurt', 'greek yogurt', 'kefir', 'butter',
    'heavy cream', 'whipping cream', 'sour cream', 'cooking cream', 'double cream',
    'ice cream', 'gelato', 'frozen dessert',
    'egg product', 'liquid egg', 'dried egg',
    // Plant-based & specialty
    'tofu', 'tempeh', 'plant based meat', 'vegan burger', 'vegan protein',
    'oat milk', 'almond milk', 'soy milk',
    // Canned & frozen convenience foods
    'canned soup', 'canned beans', 'canned vegetable', 'canned fruit',
    'frozen pizza', 'frozen vegetable', 'frozen fries', 'french fries', 'frozen meal',
    'microwave meal', 'ready meal', 'meal kit', 'instant meal',
    // Nutrition & supplements (food-grade)
    'whey protein', 'protein shake', 'meal replacement', 'baby food',
    'infant cereal', 'sports supplement', 'nutrition bar',
    // Sweeteners & functional ingredients
    'sweetener', 'corn syrup', 'high fructose', 'sugar substitute', 'stevia',
    'sorbitol food', 'maltitol food', 'xylitol food', 'erythritol',
    // CPG / packaged food general
    'packaged food', 'food manufacturing', 'food product', 'food brand',
    'consumer food', 'snack food', 'private label food', 'co-manufacturing food',
    'frozen food', 'sauce',
    // ── Staple grains & starches ──
    'rice', 'white rice', 'brown rice', 'jasmine rice', 'basmati rice', 'arborio rice',
    'wild rice', 'instant rice', 'parboiled rice', 'rice flour',
    'wheat', 'durum wheat', 'hard wheat', 'soft wheat', 'wheat berry', 'wheat kernel',
    'corn', 'corn starch', 'corn syrup grain', 'corn kernel', 'corn meal',
    'barley', 'pearl barley', 'barley malt', 'barley flour', 'malted barley',
    'rye', 'rye flour', 'rye bread', 'rye grain',
    'millet', 'sorghum grain', 'teff', 'amaranth grain', 'quinoa',
    'buckwheat', 'spelt', 'emmer wheat',
    'flour', 'plain flour', 'self-raising flour', 'corn flour',
    // ── Meat, poultry & seafood (raw/fresh/bulk) ──
    'beef', 'beef cut', 'ground beef', 'minced beef', 'beef loin', 'beef chuck',
    'beef rib', 'beef round', 'beef brisket', 'beef sirloin', 'beef tenderloin',
    'veal', 'wagyu', 'angus beef', 'grass-fed beef',
    'pork', 'pork chop', 'pork loin', 'pork ribs', 'pork shoulder', 'pork tenderloin',
    'pork rind', 'suckling pig', 'piglet',
    'chicken', 'chicken breast', 'chicken thigh', 'chicken leg', 'chicken wing',
    'chicken drumstick', 'whole chicken', 'broiler chicken', 'free-range chicken',
    'lamb', 'lamb chop', 'lamb leg', 'lamb rack', 'lamb shoulder', 'mutton',
    'turkey', 'turkey breast', 'turkey leg', 'whole turkey',
    'duck', 'duck breast', 'duck leg', 'goose',
    'fish', 'fresh fish', 'whole fish', 'fish portion', 'frozen fish',
    'shrimp', 'raw shrimp', 'fresh shrimp', 'prawn', 'king prawn', 'tiger prawn',
    'salmon', 'fresh salmon', 'atlantic salmon', 'pacific salmon', 'salmon roe',
    'tuna', 'fresh tuna', 'bluefin tuna', 'yellowfin tuna', 'skipjack tuna',
    'squid', 'octopus', 'clam', 'mussel', 'oyster', 'scallop', 'abalone',
    // ── Dairy & eggs ──
    'milk', 'fresh milk', 'whole milk', 'skim milk', 'low-fat milk',
    'uhp milk', 'uht milk', 'organic milk',
    'egg', 'eggs', 'fresh egg', 'free-range egg', 'egg white', 'egg yolk',
    // ── Produce (fresh) ──
    'tomato', 'cherry tomato', 'roma tomato', 'beef tomato', 'tomato fresh',
    'potato', 'sweet potato', 'russet potato', 'red potato', 'gold potato',
    'onion', 'red onion', 'yellow onion', 'white onion', 'spring onion',
    'garlic', 'garlic fresh', 'garlic bulb', 'garlic clove', 'garlic head',
    'ginger', 'fresh ginger', 'ginger root', 'baby ginger',
    'pepper', 'bell pepper', 'red pepper', 'green pepper', 'yellow pepper',
    'chili pepper', 'chilli pepper', 'jalapeño', 'habanero', 'cayenne pepper',
    'carrot', 'baby carrot', 'carrot fresh', 'carrot juice',
    'spinach', 'baby spinach', 'spinach fresh', 'spinach leaf',
    'avocado', 'fresh avocado', 'avocado oil', 'hass avocado',
    'mango', 'fresh mango', 'mango fresh', 'mango slice',
    'banana', 'fresh banana', 'cavendish banana', 'plantain',
    'apple', 'fresh apple', 'granny smith', 'fuji apple', 'gala apple',
    'orange', 'fresh orange', 'navel orange', 'blood orange',
    'lemon', 'fresh lemon', 'lime', 'key lime', 'lemon fresh',
    'strawberry', 'blueberry', 'raspberry', 'blackberry', 'cranberry',
    'grape', 'kiwi', 'pineapple', 'watermelon', 'cantaloupe', 'honeydew',
    'peach', 'plum', 'cherry', 'fig', 'date fruit', 'pomegranate',
    'pear', 'papaya', 'guava', 'passion fruit', 'dragon fruit', 'lychee',
    'asparagus', 'broccoli', 'cauliflower', 'cabbage', 'kale', 'lettuce',
    'celery', 'leek', 'fennel', 'artichoke', 'brussels sprout',
    'mushroom', 'shiitake', 'oyster mushroom', 'porcini', 'truffle mushroom',
    'corn fresh', 'sweet corn', 'corn on the cob', 'corn cobette',
    'wheat fresh', 'wheat product',
    // ── Beverages (bare) ──
    'tea', 'green tea', 'black tea', 'white tea', 'oolong tea', 'herbal tea',
    'chamomile tea', 'peppermint tea', 'matcha', 'chai', 'loose leaf tea', 'tea bag',
    'coffee', 'ground coffee', 'whole bean coffee', 'arabica', 'robusta', 'espresso',
    'filter coffee', 'decaf coffee', 'cold brew coffee',
    'wine', 'red wine', 'white wine', 'rose wine', 'sparkling wine',
    'champagne', 'prosecco', 'cava wine',
    'beer', 'craft beer', 'lager', 'ale', 'stout', 'pilsner', 'ipa beer',
    'spirits', 'distilled spirits', 'whiskey', 'whisky', 'bourbon',
    'scotch whisky', 'irish whiskey', 'single malt',
    'vodka', 'rum', 'dark rum', 'white rum', 'spiced rum',
    'tequila', 'mezcal', 'brandy', 'cognac', 'liqueur',
    'cider', 'hard cider', 'mead', 'sake', 'baijiu',
    'drink', 'beverage', 'refreshment drink',
    'spring water', 'still water', 'alkaline water', 'flavored water',
    // ── Pantry & basics ──
    'broth', 'stock', 'chicken broth', 'beef broth', 'vegetable broth',
    'soup', 'instant soup', 'noodle soup', 'cream soup',
    'snack', 'bar snack', 'savory snack', 'healthy snack',
    'oat', 'oats', 'rolled oats', 'steel cut oats', 'oat bran', 'oat flour',
    'lentil', 'red lentil', 'green lentil', 'lentil soup',
    'chickpea', 'garbanzo', 'split pea', 'black bean', 'kidney bean', 'navy bean',
    'nut', 'almond', 'walnut', 'cashew', 'pistachio', 'hazelnut', 'pecan',
    'macadamia', 'pine nut', 'brazil nut',
    'seed', 'chia seed', 'flax seed', 'sesame seed', 'hemp seed', 'poppy seed',
    'dried mango', 'dried cranberry', 'dried apricot', 'dried blueberry'
  ])) return 'food'

  // Priority 5b: Raw agriculture and commodities
  if (match([
    'raw beef', 'beef cattle', 'beef carcass', 'raw meat', 'meat packing',
    'raw chicken', 'raw pork', 'pork belly raw', 'pork loin raw',
    'raw wheat', 'wheat grain', 'wheat harvest', 'raw soybean', 'soybean crop',
    'soy crop', 'agri', 'raw corn', 'corn crop', 'grain crop', 'grain harvest',
    'grain storage', 'feed grain', 'animal feed', 'feed ingredient',
    'dairy farm', 'raw milk', 'coffee bean', 'cocoa bean', 'raw cocoa',
    'sugar cane', 'raw rice', 'paddy rice',
    'fast food supply', 'food processing plant',
    'protein powder', 'palm oil crude', 'crude palm', 'crop',
    'livestock', 'poultry farm', 'aquaculture', 'fishery', 'seafood raw',
    'fertilizer', 'fertiliser', 'npk fertilizer', 'nitrogen fertilizer',
    'potassium fertilizer', 'phosphate fertilizer', 'organic fertilizer',
    'urea fertilizer', 'ammonium nitrate fertilizer', 'dap fertilizer',
    'hay', 'baled hay', 'alfalfa hay', 'timothy hay', 'straw bale',
    'silage', 'corn silage', 'grass silage', 'haylage',
    'seed corn', 'seed wheat', 'seed potato', 'soybean seed', 'rapeseed', 'canola seed',
    'sunflower seed crop', 'cotton seed', 'flax seed crop',
    'irrigation', 'drip irrigation', 'sprinkler irrigation', 'pivot irrigation',
    'compost', 'organic compost', 'vermicompost', 'compost tea agri',
    'aquafeed', 'fish feed', 'shrimp feed', 'salmon feed', 'tilapia feed',
    'poultry feed', 'layer feed', 'broiler feed', 'swine feed', 'cattle feed',
    'pesticide agri', 'herbicide agri', 'fungicide agri', 'insecticide agri',
    'crop protection', 'plant protection', 'agrochemical'
  ])) return 'agriculture'

  // Priority 6: Chemicals — adhesives, coatings, lubricants, solvents, surfactants
  // Before metals so "epoxy coating for metal" → chemicals, not metals
  if (match([
    'adhesive', 'glue', 'sealant', 'bonding agent', 'epoxy adhesive',
    'coating', 'paint', 'primer', 'varnish', 'lacquer', 'powder coat',
    'lubricant', 'grease', 'cutting fluid', 'hydraulic fluid', 'coolant fluid',
    'solvent', 'thinner', 'acetone', 'mek', 'ipa ', 'isopropanol',
    'surfactant', 'detergent intermediate', 'emulsifier',
    'resin system', 'hardener', 'curing agent', 'catalyst',
    'ink formulation', 'printing ink', 'offset ink', 'uv ink', 'flexo ink',
    'gravure ink', 'inkjet ink', 'screen printing ink', 'digital ink', 'ink pigment',
    'pigment dispersion', 'pigment concentrate', 'pigment', 'colorant chemical',
    'textile dye', 'reactive dye', 'disperse dye', 'acid dye', 'vat dye',
    'direct dye', 'fiber reactive dye', 'dye powder', 'dye chemical',
    'chemical compound', 'specialty chemical', 'fine chemical',
    'industrial chemical', 'process chemical', 'chemical raw material',
    'acid', 'sulfuric acid', 'hydrochloric acid', 'nitric acid', 'phosphoric acid',
    'citric acid', 'acetic acid', 'lactic acid', 'formic acid', 'tartaric acid',
    'bleach', 'sodium hypochlorite', 'chlorine', 'chlorine gas', 'chlor-alkali',
    'ammonia', 'ammonium hydroxide', 'ammonia solution',
    'wax', 'carnauba wax', 'beeswax', 'synthetic wax', 'wax emulsion',
    'ethanol', 'ethyl alcohol', 'industrial ethanol', 'denatured ethanol',
    'methanol', 'methyl alcohol', 'isopropanol ipa',
    'pesticide', 'herbicide', 'insecticide', 'fungicide', 'biocide', 'rodenticide',
    'chemical intermediate', 'monomer', 'polymer chemical'
  ])) return 'chemicals'

  // Priority 7: Metals (broader terms)
  if (match([
    'steel', 'aluminum', 'aluminium', 'copper', 'iron',
    'zinc', 'tin ore', 'tinplate', 'tin metal', 'tin alloy',
    'gold', 'silver', 'mineral', 'mining',
    'metal', 'alloy', 'casting', 'forging', 'smelting',
    'rare earth', 'critical mineral',
    'nickel', 'nickel alloy', 'nickel plate', 'nickel sheet',
    'titanium', 'titanium alloy', 'titanium sheet', 'titanium bar',
    'brass', 'brass rod', 'brass sheet', 'brass tube', 'brass fitting',
    'bronze', 'bronze alloy', 'phosphor bronze', 'bronze bushing',
    'chromium', 'chromium oxide', 'chrome plate', 'chromium plating',
    'rebar', 'deformed bar', 'reinforcement bar', 'steel rebar',
    'wire rod', 'steel wire rod', 'copper wire rod',
    'magnesium', 'magnesium alloy', 'magnesium ingot',
    'manganese', 'manganese steel', 'manganese ore',
    'lead', 'lead ingot', 'lead alloy', 'lead plate', 'lead sheet',
    'pewter', 'bismuth', 'antimony', 'vanadium',
    'silicon metal', 'silicon ingot', 'metallurgical silicon',
    'stainless steel', 'carbon steel', 'tool steel', 'spring steel',
    'galvanized steel', 'cold rolled steel', 'hot rolled steel',
    'aluminum sheet', 'aluminum coil', 'aluminum profile', 'aluminum extrusion',
    'copper tube', 'copper wire', 'copper sheet', 'copper rod'
  ])) return 'metals'

  // Priority 8: Textiles and apparel
  if (match([
    'shirt', 'shoe', 'sneaker', 'cotton', 'leather',
    'apparel', 'textile', 'clothing', 'garment',
    'denim', 'wool', 'silk', 'polyester', 'fabric',
    'yarn', 'knit', 'woven', 'fashion', 'footwear',
    'linen', 'linen fabric', 'linen yarn', 'belgian linen',
    'cashmere', 'cashmere yarn', 'cashmere wool',
    'viscose', 'viscose fabric', 'viscose yarn', 'viscose rayon',
    'rayon', 'modal fabric', 'lyocell', 'tencel', 'cupro',
    'spandex', 'elastane', 'lycra', 'spandex fiber',
    'fleece', 'polar fleece', 'micro fleece', 'fleece fabric',
    'velvet', 'velvet fabric', 'crushed velvet', 'velour',
    'canvas', 'canvas fabric', 'canvas material', 'duck canvas',
    'tweed', 'tweed fabric', 'harris tweed',
    'flannel', 'flannel fabric', 'flannel shirt material',
    'chiffon', 'organza', 'tulle', 'voile fabric',
    'thread', 'sewing thread', 'embroidery thread', 'stitching thread',
    'embroidery', 'embroidery fabric', 'embroidered fabric',
    'zipper', 'zip fastener', 'coil zipper', 'metal zipper', 'plastic zipper',
    'button', 'snap button', 'press stud', 'toggle button', 'shank button',
    'ribbon', 'satin ribbon', 'grosgrain ribbon', 'velvet ribbon',
    'lace', 'lace fabric', 'needle lace', 'guipure lace',
    'interfacing', 'interlining', 'fusible', 'lining fabric',
    'batting', 'wadding', 'quilt batting', 'upholstery fabric',
    'jacquard', 'brocade', 'damask', 'twill fabric', 'poplin'
  ])) return 'textiles'

  // Priority 11: Medical / pharma — APIs, devices, consumables
  // PROMOTED above packaging to prevent 'sterile packaging'/'stent'/'metal' misfires
  if (match([
    'lumbar implant', 'lumbar support brace', 'lumbar support medical', 'lumbar spine', 'lumbar',
    'api ', 'active pharmaceutical', 'drug substance', 'excipient',
    'generic drug', 'pharmaceutical', 'pharma ingredient', 'synthesis api',
    'medical device', 'surgical instrument', 'disposable medical',
    'iv bag', 'syringe', 'catheter', 'stent', 'implant',
    'diagnostic kit', 'reagent', 'assay kit', 'lateral flow',
    'ppe kit', 'ppe equipment', 'ppe supply', 'ppe protective', 'personal protective equipment',
    'nitrile glove', 'latex glove', 'nitrile', 'surgical glove', 'surgical mask', 'n95',
    'glove', 'bandage', 'gauze', 'wound dressing', 'medical tape', 'plaster bandage',
    'drug', 'vitamin', 'antibiotic', 'vaccine', 'capsule', 'tablet capsule',
    'vial', 'ampoule', 'blister tablet',
    'hospital supply', 'clinical supply', 'sterile packaging',
    'fda approved', 'gmp certified', 'iso 13485', 'ce marked device',
    'hpmc', 'excipient grade', 'usp standard', 'ep standard',
    'microfluidic', 'point of care test', 'rapid test kit', 'elisa kit',
    'mask', 'surgical mask', 'dust mask', 'face mask medical', 'mask n95', 'mask surgical',
    'mask ffp2', 'mask ffp3', 'respirator mask', 'medical mask',
    'protective mask', 'disposable mask'
  ])) return 'medical'

  // Priority 12: Consumer goods & personal care
  // PROMOTED above textiles and packaging to prevent 'fabric'/'label'/'cream'/'aluminum' misfires
  if (match([
    'shampoo', 'conditioner', 'body wash', 'shower gel', 'bar soap', 'hand soap',
    'liquid soap', 'hand sanitizer', 'toothpaste', 'mouthwash', 'toothbrush',
    'deodorant', 'antiperspirant', 'sunscreen', 'spf lotion', 'sunblock',
    'cosmetics', 'foundation', 'lipstick', 'mascara', 'eyeshadow',
    'lip gloss', 'concealer', 'blush', 'makeup', 'eye liner', 'bb cream',
    'perfume', 'fragrance', 'cologne', 'body spray', 'eau de parfum',
    'facial cleanser', 'moisturizer', 'face serum', 'toner skincare',
    'hair dye', 'hair color', 'hair spray', 'hair gel', 'hair wax', 'hair mask',
    'liquid detergent', 'laundry detergent', 'fabric softener', 'fabric conditioner',
    'dishwashing liquid', 'dish soap', 'household cleaner', 'bathroom cleaner',
    'personal care', 'beauty product', 'hygiene product', 'consumer goods',
    'skin care', 'skincare product', 'oem beauty', 'private label cosmetic',
    'vaseline', 'lip balm', 'chapstick', 'hand lotion', 'body lotion',
    'baby lotion', 'baby oil', 'baby powder', 'baby shampoo', 'baby wash',
    'wet wipe', 'baby wipe', 'facial wipe', 'cleansing wipe',
    'diaper', 'nappy', 'adult diaper', 'training pants', 'incontinence pad',
    'razor', 'razor blade', 'shaving razor', 'disposable razor', 'electric razor',
    'shaving cream', 'shaving gel', 'shaving foam', 'aftershave',
    'nail polish', 'nail varnish', 'nail gel', 'nail lacquer', 'nail care',
    'nail file', 'nail clipper', 'nail buffer',
    'lotion', 'hand lotion', 'body cream lotion',
    'floss', 'dental floss', 'floss pick', 'interdental brush',
    'hair comb', 'wide tooth comb', 'detangling comb', 'fine tooth comb',
    'hair brush', 'hair clip', 'bobby pin', 'hair tie', 'scrunchie',
    'cotton swab', 'cotton ball', 'cotton pad', 'q-tip',
    'feminine hygiene', 'sanitary pad', 'tampon', 'menstrual cup', 'panty liner',
    'condom', 'contraceptive',
    'dental care', 'electric toothbrush', 'water flosser', 'tongue scraper',
    'whitening strip', 'teeth whitening',
    'hair removal', 'wax strip', 'depilatory cream', 'epilator',
    'face wash', 'micellar water', 'cleansing balm', 'toner pad',
    'eye cream', 'under eye patch', 'collagen mask',
    'foot cream', 'foot scrub', 'heel balm', 'hand sanitizer gel'
  ])) return 'consumer_goods'

  // Priority 13: Construction materials
  // PROMOTED above packaging and machinery to prevent 'pump'/'packaging' misfires
  if (match([
    'flat glass pane', 'tempered glass', 'borosilicate', 'glass fiber', 'glass wool',
    'float glass', 'architectural glass', 'safety glass', 'laminated glass',
    'cement', 'concrete block', 'clay brick', 'masonry',
    'ceramic tile', 'porcelain tile', 'floor tile', 'wall tile',
    'roofing material', 'roof shingle', 'insulation board', 'foam insulation',
    'drywall', 'gypsum board', 'plasterboard', 'wallboard',
    'aggregate', 'gravel', 'sand quarry', 'stone tile', 'marble slab',
    'granite countertop', 'basalt fiber', 'basalt rock', 'basalt stone', 'basalt',
    'construction material', 'building material',
    'concrete', 'concrete mix', 'concrete slab', 'precast concrete', 'reinforced concrete',
    'brick', 'clay brick', 'fire brick', 'face brick', 'engineering brick', 'brick paver',
    'tile', 'floor tile', 'wall tile', 'porcelain tile', 'ceramic tile', 'mosaic tile',
    'roof tile', 'paving tile', 'terracotta tile',
    'window', 'window frame', 'double glazed window', 'aluminium window', 'upvc window',
    'glass', 'glazing', 'double glazing', 'triple glazing', 'glass pane',
    'insulation', 'thermal insulation', 'mineral wool', 'rock wool', 'glass wool',
    'acoustic insulation', 'pipe insulation', 'rigid insulation',
    'mortar', 'mortar mix', 'refractory mortar', 'tile mortar', 'grout',
    'asphalt', 'bituminous', 'asphalt concrete', 'hot mix asphalt',
    'bitumen', 'modified bitumen', 'bitumen membrane', 'bitumen felt',
    'conduit', 'electrical conduit', 'rigid conduit', 'flexible conduit', 'pvc conduit',
    'scaffolding', 'formwork', 'shuttering', 'shoring',
    'steel structure', 'structural steel', 'steel beam', 'steel column',
    'roofing', 'metal roofing', 'membrane roofing', 'green roof system',
    'waterproofing', 'waterproof membrane', 'tanking system'
  ])) return 'construction'

  // Priority 14: Packaging — corrugated, glass containers, labels, flexible, protective
  if (match([
    'paper cup', 'paper cups', 'paper plate', 'paper plates', 'paper bowl', 'paper bowls',
    'paper bag', 'paper bags', 'paper packaging', 'paper tray', 'paper trays',
    'disposable cup', 'plastic cup', 'foam cup', 'coffee cup', 'drinking cup', 'cups',
    'disposable plate', 'plastic plate', 'foam plate',
    'corrugated box', 'corrugated carton', 'cardboard box', 'shipping box',
    'glass bottle', 'glass jar', 'glass container', 'glass vial',
    'product label', 'shipping label', 'adhesive label', 'barcode label',
    'peel label', 'pressure sensitive label', 'shrink sleeve', 'rfid label',
    'blister pack', 'clamshell pack', 'thermoformed tray',
    'flexible pouch', 'stand-up pouch', 'retort pouch', 'sachet',
    'stretch hood', 'hood film', 'stretch film', 'shrink film',
    'packaging material', 'packaging film', 'barrier film',
    'bubble wrap', 'foam packaging', 'void fill',
    'pallet wrap', 'stretch wrap', 'strapping',
    'folding carton', 'paperboard carton', 'aseptic carton',
    'packaging', 'container packaging', 'retail packaging',
    'bottle', 'plastic bottle', 'pet bottle', 'glass bottle', 'bottle cap', 'bottle closure',
    'box', 'cardboard box', 'product box', 'gift box', 'flat box', 'subscription box',
    'pallet', 'wooden pallet', 'plastic pallet', 'export pallet', 'euro pallet',
    'foil', 'aluminum foil', 'aluminium foil', 'foil pouch', 'foil wrap', 'foil liner',
    'tape', 'sealing tape', 'packing tape', 'adhesive tape', 'masking tape', 'duct tape',
    'lid', 'metal lid', 'plastic lid', 'snap lid', 'screw cap', 'tamper evident lid',
    'tin can', 'steel can', 'aluminum can', 'beverage can', 'food can', 'aerosol can',
    'drum', 'steel drum', 'plastic drum', 'fiber drum', 'ibc drum', 'chemical drum',
    'wrap', 'stretch wrap pallet', 'cling wrap', 'plastic wrap',
    'tray', 'blister tray', 'plastic tray', 'pulp tray', 'foam tray',
    'tube', 'squeeze tube', 'laminate tube', 'aluminium tube',
    'bag', 'zip bag', 'stand up bag', 'kraft bag', 'polybag', 'poly bag', 'mailer bag',
    'jar', 'glass jar', 'plastic jar', 'wide mouth jar',
    'case', 'display case', 'master case', 'shipping case',
    'insert', 'cardboard insert', 'foam insert', 'paper insert'
  ])) return 'packaging'

  // Priority 15: Machinery — pumps, valves, compressors, CNC, industrial equipment
  if (match([
    'pump', 'centrifugal pump', 'vacuum pump', 'gear pump', 'peristaltic pump',
    'valve', 'ball valve', 'gate valve', 'check valve', 'control valve',
    'compressor', 'air compressor', 'screw compressor', 'piston compressor',
    'cnc machine', 'cnc machining center', 'cnc lathe', 'cnc mill',
    'machine tool', 'grinding machine', 'turning center', 'machining center',
    'industrial robot', 'robotic arm', 'automation equipment',
    'conveyor', 'conveyor belt', 'material handling equipment',
    'heat exchanger', 'pressure vessel', 'reactor vessel',
    'industrial fan', 'blower', 'dust collector',
    'welding equipment', 'plasma cutter', 'laser cutter',
    'crane', 'forklift', 'lifting equipment',
    'gearbox', 'reducer', 'servo drive', 'vfd', 'variable frequency drive',
    'machinery', 'industrial equipment', 'capital equipment', 'plant equipment',
    'generator', 'diesel generator', 'gas generator', 'standby generator',
    'tractor', 'farm tractor', 'utility tractor', 'compact tractor',
    'turbine', 'steam turbine', 'gas turbine', 'wind turbine', 'hydro turbine',
    'motor', 'electric motor', 'induction motor', 'ac motor', 'dc motor',
    'engine', 'diesel engine', 'gasoline engine', 'combustion engine',
    'drill', 'drilling machine', 'drill press', 'rock drill', 'core drill',
    'lathe', 'turning lathe', 'cnc lathe', 'metal lathe',
    'press', 'hydraulic press', 'punch press', 'stamping press', 'press brake',
    'forging press', 'power press', 'forming press',
    'extruder', 'plastic extruder', 'screw extruder', 'twin screw extruder',
    'mixer', 'industrial mixer', 'ribbon mixer', 'planetary mixer',
    'agitator', 'tank agitator', 'mixing agitator',
    'centrifuge', 'industrial centrifuge', 'decanter centrifuge',
    'filter press', 'membrane filter', 'belt filter',
    'dryer', 'spray dryer', 'fluid bed dryer', 'rotary dryer',
    'oven', 'industrial oven', 'curing oven', 'conveyor oven',
    'boiler', 'steam boiler', 'hot water boiler', 'fire tube boiler',
    'chiller', 'industrial chiller', 'process chiller', 'water chiller',
    'cooling tower', 'air handler', 'hvac unit', 'air conditioning unit',
    'combine harvester', 'grain harvester', 'forage harvester', 'sugarcane harvester',
    'excavator', 'bulldozer', 'loader', 'backhoe', 'skid steer', 'grader',
    'paving machine', 'road roller', 'asphalt paver'
  ])) return 'machinery'

  // Priority 16: Broader electronics/tech (lower confidence terms)
  if (match([
    'phone', 'computer', 'laptop', 'tablet', 'electronics',
    'sensor', 'battery cell', 'ev battery', 'battery pack',
    'cable', 'connector', 'power supply', 'charger',
    'battery', 'lithium battery', 'alkaline battery', 'rechargeable battery',
    'led light', 'led strip', 'led module', 'led lamp', 'led bulb', 'led driver',
    'led display', 'led panel', 'led chip', 'smd led', 'high power led',
    'resistor', 'smd resistor', 'through-hole resistor', 'resistor array',
    'capacitor', 'electrolytic capacitor', 'ceramic capacitor', 'film capacitor',
    'diode', 'zener diode', 'schottky diode', 'rectifier diode',
    'transistor', 'mosfet', 'bjt transistor', 'igbt transistor',
    'inductor', 'coil inductor', 'power inductor', 'ferrite core',
    'wire', 'copper wire', 'aluminum wire', 'electrical wire', 'magnet wire',
    'switch', 'toggle switch', 'push switch', 'rocker switch', 'dip switch',
    'relay', 'electromagnetic relay', 'solid state relay', 'relay module',
    'antenna', 'pcb antenna', 'wifi antenna', 'lte antenna', 'gps antenna',
    'transformer', 'power transformer', 'toroidal transformer', 'auto transformer',
    'fuse', 'blade fuse', 'glass fuse', 'smd fuse', 'fuse holder',
    'heat sink', 'aluminum heat sink', 'cpu heat sink', 'thermal pad',
    'pcba', 'pcb assembly', 'smt assembly', 'smd assembly',
    'oscillator', 'crystal oscillator', 'quartz crystal',
    'rfid', 'rfid tag', 'nfc chip', 'bluetooth module', 'wifi module',
    'display', 'lcd display', 'display panel', 'tft display', 'e-ink display',
    'controller', 'microcontroller', 'development board', 'arduino', 'raspberry pi',
    'charger', 'usb charger', 'wireless charger', 'power bank', 'adapter',
    'cable assembly', 'coaxial cable', 'ribbon cable', 'flat cable',
    'smartwatch', 'wearable', 'fitness tracker', 'smart band',
    'drone', 'drone component', 'esc', 'flight controller'
  ])) return 'electronics'

  // Priority 17: Broader automotive (lower confidence terms)
  if (match([
    'car ', 'cars', 'engine part', 'brake', 'tire', 'tyre',
    'transmission', 'exhaust', 'wheel', 'airbag',
    'windshield', 'auto part'
  ])) return 'automotive'

  // Priority 16: Wood, paper & pulp
  if (match([
    // Lumber & structural wood
    'lumber', 'plywood', 'mdf', 'hardboard', 'particleboard', 'osb board',
    'wood panel', 'wood plank', 'wood beam', 'wooden', 'timber',
    'construction lumber', 'softwood', 'hardwood', 'veneer',
    'engineered wood', 'cross laminated timber', 'glulam', 'chipboard',
    // Bare 'wood' and 'lumber' natural language
    'wood', 'raw wood', 'wood product', 'wood supply', 'wood material',
    'wooden pallet', 'wood frame', 'wood flooring', 'hardwood floor',
    'oak plank', 'pine board', 'cedar plank', 'birch', 'maple wood',
    // Furniture & wood-based products
    'wooden furniture', 'wood furniture', 'flat-pack', 'particle board',
    // Paper, pulp & cellulose
    'paper pulp', 'wood pulp', 'kraft paper', 'tissue paper', 'newsprint', 'paperboard',
    'cardstock', 'copy paper', 'office paper', 'printing paper', 'copier paper',
    'writing paper', 'coated paper', 'uncoated paper', 'fine paper',
    'toilet paper', 'paper towel', 'facial tissue', 'paper roll',
    'cardboard', 'corrugated paper', 'cardboard sheet', 'boxboard',
    // Publishing & educational
    'notebook', 'notepad', 'textbook', 'book printing', 'magazine paper',
    'newspaper print', 'stationery', 'paper products',
    // Pulp
    'pulp', 'wood pulp', 'paper pulp', 'cellulose',
    // Bare words (last resort — wide but important for UX)
    'paper'
  ])) return 'wood_paper'

  // Default: electronics (most common procurement category globally)
  return 'electronics'
}

// ============================================================
// TARIFF DATABASE — HTS codes, duty rates, compliance notes
// ============================================================
export const TARIFF_DATABASE = {
  // Industrial / Magnets
  'magnet':          { code: '8505.11.00', base: '0% (ITA) / 25% (China Sec 301)', notes: 'Permanent magnets. China-origin NdFeB magnets subject to 25% Section 301 tariff. Japan/EU/Korea origin duty-free under FTAs.' },
  'neodymium':       { code: '8505.11.00', base: '0%–25%', notes: 'NdFeB permanent magnets. 25% if China-origin. ITAR/DFARS restrictions for defense applications.' },
  'bearing':         { code: '8482.10.50', base: '2.4%', notes: 'Ball bearings. Specific rates apply by type. Anti-dumping duties on some China/Thailand origins.' },
  'fastener':        { code: '7318.15.20', base: '5.7–8.5%', notes: 'Steel screws, bolts, nuts. AD/CVD orders on China-origin fasteners active.' },
  'seal':            { code: '4016.93.00', base: '2.6%', notes: 'Rubber gaskets and seals for mechanical applications.' },
  'actuator':        { code: '8412.39.00', base: '3.5%', notes: 'Linear actuators and motion control. Higher rates for pneumatic types.' },
  // Automotive
  'visor':           { code: '8708.29.50', base: '2.5%', notes: 'Sun visors as auto body parts (HTS 8708.29). 25% Sec 301 surcharge if China-origin.' },
  'seat':            { code: '9401.20.00', base: '0%', notes: 'Seats for motor vehicles.' },
  'windshield':      { code: '7007.21.10', base: '2.5%', notes: 'Laminated safety glass for vehicles.' },
  'engine':          { code: '8407.34.05', base: '2.5%', notes: 'Reciprocating piston engines for vehicles.' },
  'brake':           { code: '8708.30.50', base: '2.5%', notes: 'Brake systems and parts for motor vehicles.' },
  // Electronics
  'microchip':       { code: '8542.31.00', base: '0% (ITA)', notes: 'Processors and controllers. Free under Info Tech Agreement. Export controls on advanced nodes.' },
  'pcb':             { code: '8534.00.00', base: '0% (ITA)', notes: 'Printed circuits. ITA duty-free.' },
  'display':         { code: '8524.11.00', base: '0%', notes: 'Liquid crystal display panels.' },
  'glass panel':     { code: '7007.19.00', base: '5%', notes: 'Toughened safety glass for electronics.' },
  'battery':         { code: '8507.60.00', base: '3.4%', notes: 'Lithium-ion cells and battery packs. IRA sourcing requirements for EV incentives.' },
  // Agriculture
  'beef':            { code: '0202.30.50', base: '26.4%', notes: 'Frozen boneless beef. Subject to TRQ (Tariff Rate Quota). In-quota rate may be lower.' },
  'wheat':           { code: '1001.99.00', base: '$0.35/kg', notes: 'Other wheat and meslin.' },
  'soybean':         { code: '1201.90.00', base: '0%', notes: 'Soya beans, whether or not broken. Duty-free.' },
  'chicken':         { code: '0207.14.00', base: '17.6%', notes: 'Frozen poultry cuts.' },
  // Metals
  'lithium':         { code: '2836.91.00', base: '3.7%', notes: 'Lithium carbonates. Duty-free from Chile/Australia (FTA). IRA critical mineral designation.' },
  'steel':           { code: '7208.10.15', base: '0% + 25% (Sec 232)', notes: 'Subject to 25% Section 232 National Security Tariff. Quota agreements with some allies.' },
  'copper':          { code: '7403.11.00', base: '1.0%', notes: 'Refined copper cathodes. Low tariff, but monitor anti-dumping orders.' },
  'aluminum':        { code: '7601.20.90', base: '3.0% + 10% (Sec 232)', notes: 'Aluminum alloy ingots. Section 232 tariff applies. Some country exemptions in place.' },
  'cobalt':          { code: '8105.20.00', base: '1.5%', notes: 'Cobalt mattes and other intermediates. DRC origin requires RMI conflict minerals audit.' },
  // Textiles
  'shirt':           { code: '6109.10.00', base: '16.5%', notes: 'T-shirts, knitted or crocheted, of cotton.' },
  'shoes':           { code: '6404.11.00', base: '20.0%', notes: 'Sports footwear with rubber soles.' },
  'cotton':          { code: '5201.00.00', base: '$0.31/kg', notes: 'Cotton, not carded or combed. WRO restrictions on Xinjiang origin (UFLPA).' },
  'leather':         { code: '4107.11.00', base: '2.4%–5.3%', notes: 'Full-grain bovine leather, not further prepared. Rate varies by tanning/finish stage — confirm exact HTS subheading with a customs broker.' },
  'denim':           { code: '5209.42.00', base: '8.4%', notes: 'Denim fabric, cotton, woven.' }
}

export function lookupTariff(query) {
  const q = query.toLowerCase()
  for (const [key, data] of Object.entries(TARIFF_DATABASE)) {
    if (q.includes(key)) {
      return { hts: data.code, duty: data.base, notes: data.notes, matched: true }
    }
  }
  // Smart fallback based on category — this is a generic placeholder for
  // the whole category, not a specific match for the product asked about.
  // Callers must surface this distinction; presenting it with the same
  // confidence as a real match risks someone filing customs paperwork
  // against a fabricated HTS code.
  const cat = categorizeQuery(query)
  const fallbacks = {
    automotive:  { hts: '8708.99.81', duty: '2.5%',        notes: 'Other auto parts. Section 301 (25%) if China-origin.' },
    industrial:  { hts: '8505.11.00', duty: '0%–25%',      notes: 'Industrial magnets/components. Duty varies by origin and product type.' },
    electronics: { hts: '8542.31.00', duty: '0% (ITA)',    notes: 'Electronic integrated circuits. Information Technology Agreement duty-free.' },
    agriculture: { hts: '2106.90.99', duty: '6.4%',        notes: 'Food preparations. Actual rate varies by product and origin.' },
    metals:      { hts: '7204.49.00', duty: '1.5%',        notes: 'Ferrous waste and scrap. Specific tariffs may apply.' },
    textiles:    { hts: '6307.90.98', duty: '7.0%',        notes: 'Other made-up textile articles.' },
    plastics:    { hts: '3926.90.99', duty: '5.3% + 25% (China Sec 301)', notes: 'Other plastic articles. Duty-free from Korea (KORUS), Singapore (USSFTA), Germany (MFN). Section 301 applies to China-origin.' }
  }
  const fb = fallbacks[cat] || fallbacks.electronics
  return { ...fb, matched: false }
}

// ============================================================
// RISK CALCULATOR — Trade lane risk scoring
// ============================================================
export function calculateRisk(origin, destination, product = '') {
  const o = origin.toLowerCase()
  const d = destination.toLowerCase()
  const p = product.toLowerCase()

  // Base component scores (0-100, lower = better)
  let geopolitical = 15
  let weather = 10
  let labor = 10
  let infrastructure = 10

  // ── Origin risk adjustments ──
  if (o.includes('china') || o.includes('shanghai') || o.includes('shenzhen') || o.includes('guangzhou')) {
    geopolitical = 55  // Trade war, Section 301, Taiwan tensions, tech decoupling
    infrastructure = 10
    labor = 15
  } else if (o.includes('taiwan') || o.includes('hsinchu') || o.includes('taipei')) {
    geopolitical = 50  // Geopolitical blockade risk
    weather = 30       // Typhoon season risk
  } else if (o.includes('russia') || o.includes('moscow')) {
    geopolitical = 90  // Sanctions, SWIFT exclusion
    infrastructure = 60
  } else if (o.includes('mexico') || o.includes('monterrey') || o.includes('juarez')) {
    geopolitical = 12
    infrastructure = 30  // Cartel violence affecting ground logistics
    labor = 20
  } else if (o.includes('brazil') || o.includes('sao paulo') || o.includes('santos')) {
    infrastructure = 35  // Port congestion, poor road infrastructure
    labor = 25           // Strike risk at Santos port
    geopolitical = 15
  } else if (o.includes('germany') || o.includes('europe') || o.includes('munich') || o.includes('hamburg')) {
    geopolitical = 20    // Russia/Ukraine war proximity, energy cost volatility
    labor = 30           // High strike probability (IG Metall, dockworkers)
  } else if (o.includes('india') || o.includes('mumbai') || o.includes('pune')) {
    infrastructure = 25  // Port capacity constraints
    labor = 15
    geopolitical = 10
  } else if (o.includes('japan') || o.includes('tokyo') || o.includes('aichi')) {
    weather = 35         // Earthquake / tsunami / typhoon risk
    geopolitical = 10
    labor = 10
    infrastructure = 5
  } else if (o.includes('australia') || o.includes('pilbara')) {
    weather = 20         // Cyclone risk
    labor = 25           // Resource-sector strike risk
    geopolitical = 5
  } else if (o.includes('korea') || o.includes('busan')) {
    geopolitical = 20    // North Korea risk
    weather = 10
    labor = 15
  } else if (o.includes('vietnam') || o.includes('ho chi minh')) {
    infrastructure = 20
    labor = 10
    geopolitical = 15
  }

  // ── Destination risk adjustments ──
  if (d.includes('usa') || d.includes('los angeles') || d.includes('long beach') || d.includes('california')) {
    infrastructure += 20  // LA/LB port congestion
    labor += 25           // ILWU union strike risk
  } else if (d.includes('europe') || d.includes('rotterdam') || d.includes('hamburg')) {
    labor += 15           // Dockworker strike risk
    geopolitical += 10    // Proximity to Ukraine conflict
  } else if (d.includes('uk') || d.includes('united kingdom') || d.includes('felixstowe')) {
    infrastructure += 10  // Post-Brexit customs complexity
    labor += 10
  }

  // ── Product-specific adjustments ──
  if (p.match(/magnet|rare.earth|semiconductor|chip/)) geopolitical += 15  // Critical mineral / tech controls
  if (p.match(/food|meat|perishable|fresh/)) weather += 20                  // Cold chain vulnerability
  if (p.match(/hazmat|chemical|battery|lithium/)) infrastructure += 15      // Dangerous goods complexity

  // ── Overall score (weighted composite, capped at 95) ──
  const overall = Math.min(95, Math.round(
    (geopolitical * 1.4 + weather * 0.8 + labor * 1.1 + infrastructure * 0.9) / 4.2
  ))

  const rating = overall >= 65 ? 'HIGH' : overall >= 35 ? 'MEDIUM' : 'LOW'

  // Transit days estimation
  const isAsia = o.includes('china') || o.includes('taiwan') || o.includes('japan') || o.includes('korea') || o.includes('vietnam')
  const isLatam = o.includes('brazil') || o.includes('chile') || o.includes('mexico') || o.includes('argentina')
  const isEurope = o.includes('germany') || o.includes('europe') || o.includes('france') || o.includes('italy')
  const destUS = d.includes('usa') || d.includes('united states') || d.includes('los angeles') || d.includes('new york')

  let transit = 14
  if (isAsia && destUS) transit = 18
  else if (isLatam && destUS) transit = 12
  else if (isEurope && destUS) transit = 10
  else if (o.includes('mexico') && destUS) transit = 3
  else if (o.includes('australia') && destUS) transit = 16
  else if (o.includes('india') && destUS) transit = 20

  const buffer = overall >= 65 ? '+3 Weeks' : overall >= 35 ? '+2 Weeks' : '+1 Week'

  // Insurance estimate
  const premiumPct = overall >= 65 ? '0.8–1.2%' : overall >= 35 ? '0.4–0.7%' : '0.2–0.4%'

  return {
    overall,
    rating,
    transit_days: transit,
    recommended_buffer: buffer,
    breakdown: { geopolitical, weather, labor, infrastructure },
    narrative: `Risk profile dominated by ${
      Math.max(geopolitical, weather, labor, infrastructure) === geopolitical ? 'geopolitical tensions' :
      Math.max(geopolitical, weather, labor, infrastructure) === labor ? 'labor union / strike risk' :
      Math.max(geopolitical, weather, labor, infrastructure) === infrastructure ? 'infrastructure chokepoints' :
      'weather / natural disaster exposure'
    }. Recommend ${buffer} safety stock buffer.`,
    insurance_premium: premiumPct
  }
}

// ============================================================
// CATEGORY-SPECIFIC RISK INTELLIGENCE
// Used by /api/analyze to generate contextualized risk cards
// ============================================================
export const CATEGORY_RISKS = {
  industrial: [
    {
      id: 'r_ind_1', title: 'China Rare Earth Export Controls', type: 'Risk', severity: 'HIGH',
      desc: 'China controls ~90% of global rare earth magnet (NdFeB) production and processing. Beijing has historically used export quotas and restrictions as geopolitical leverage. A sudden export ban could halt automotive and electronics production globally within weeks.',
      mitigation: 'Dual-source from Japan (TDK, Shin-Etsu) and US domestic (Arnold Magnetics, MP Materials) suppliers. Qualify magnet recycling/reclamation programs. Lobby for DoD Strategic Materials program participation.'
    },
    {
      id: 'r_ind_2', title: 'Critical Mineral National Security Designation', type: 'Risk', severity: 'HIGH',
      desc: 'Neodymium, dysprosium, and praseodymium are classified as Critical Minerals by USGS, DoD, and the EU. Any supply disruption triggers cascading impacts across EV motors, defense systems, and industrial automation.',
      mitigation: 'Engage DoD/DoE Critical Minerals sourcing programs. Explore long-term supply agreements with USMCA and FTA partners (Chile, Australia). Consider strategic stockpiling for 90-day coverage.'
    },
    {
      id: 'r_ind_3', title: 'Rare Earth Price Volatility', type: 'Risk', severity: 'MEDIUM',
      desc: 'NdFeB magnet prices (driven by Nd/Pr oxide prices) have historically swung 200-400% within a single year based on Chinese export policy, EV demand surges, and speculative activity.',
      mitigation: 'Negotiate index-linked pricing in supply agreements with price caps/floors. Hedge exposure via commodity financial instruments. Build 3-month buffer inventory during price dips.'
    }
  ],
  automotive: [
    {
      id: 'r_auto_1', title: 'Section 301 Tariff Exposure', type: 'Risk', severity: 'HIGH',
      desc: 'US Section 301 tariffs (25%) remain in force on Chinese-origin automotive components. USMCA re-negotiation is scheduled for 2026, creating uncertainty for Mexico-based sourcing and regional value content rules.',
      mitigation: 'Prioritize USMCA-compliant Mexico and US domestic sourcing. Conduct Tier-2 supplier audit for hidden China-origin content. Seek CBP binding ruling on origin classification.'
    },
    {
      id: 'r_auto_2', title: 'Semiconductor Supply Allocation Risk', type: 'Risk', severity: 'HIGH',
      desc: 'Automotive-grade semiconductors (MCUs, power ICs, SiC MOSFETs) remain under tight allocation by Texas Instruments, NXP, Infineon, and Renesas through 2026. Production shutdowns possible with < 2 weeks notice.',
      mitigation: 'Secure long-term supply agreements with dual-source qualification. Increase buffer stock to 12+ weeks for critical chips. Work with Tier-1s to share allocation visibility.'
    },
    {
      id: 'r_auto_3', title: 'Mexico Ground Logistics Risk', type: 'Risk', severity: 'MEDIUM',
      desc: 'Organized crime activity in Tamaulipas, Nuevo León, and Sonora corridors creates cargo theft and delay risks on key Monterrey-US border crossings. Border wait times at Laredo can exceed 2-3 days during peak.',
      mitigation: 'Use bonded carrier networks with GPS tracking. Diversify border crossing points. Build 2-week buffer for Monterrey-origin supply. Engage customs broker for FAST lane pre-clearance.'
    }
  ],
  electronics: [
    {
      id: 'r_tech_1', title: 'Taiwan Strait Geopolitical Risk', type: 'Risk', severity: 'HIGH',
      desc: 'Taiwan produces 90%+ of advanced logic chips (< 7nm). Any military escalation or PRC blockade would immediately halt global smartphone, automotive, and AI chip supply for 12-24 months with no alternative.',
      mitigation: 'Qualify alternate foundries (Samsung Foundry, Intel Foundry, GlobalFoundries) for non-critical nodes. Increase finished goods buffer. Engage TSMC\'s Arizona and Japan fabs for geographic diversification.'
    },
    {
      id: 'r_tech_2', title: 'US BIS Export Control Proliferation', type: 'Risk', severity: 'HIGH',
      desc: 'US Bureau of Industry and Security (BIS) rapidly expanding export controls on advanced semiconductors, EDA tools, and packaging technology. China-bound or China-routed shipments face increasing license requirements.',
      mitigation: 'Conduct quarterly export control audits. Engage trade counsel for ECCN classification review. Establish end-user monitoring programs. Check Entity List and Military End-User List monthly.'
    },
    {
      id: 'r_tech_3', title: 'Component Lead Time Volatility', type: 'Risk', severity: 'MEDIUM',
      desc: 'Semiconductor lead times fluctuate from 8 to 52+ weeks depending on demand cycle. Memory (NAND/DRAM) subject to boom-bust pricing cycles that can move 60-80% in a single quarter.',
      mitigation: 'Place long-horizon purchase orders (52+ weeks for critical components). Qualify second sources for all critical ICs. Use spot market sparingly and only for non-critical, non-constrained parts.'
    }
  ],
  agriculture: [
    {
      id: 'r_ag_1', title: 'Climate & Crop Yield Volatility', type: 'Risk', severity: 'HIGH',
      desc: 'El Niño cycles and accelerating climate change creating severe crop yield volatility in key agricultural regions (Brazil, Australia, US Midwest). 2023-24 drought reduced global soy production 8%.',
      mitigation: 'Diversify sourcing across at least 3 geographic regions. Engage crop insurance and commodity forward contracts. Build 3-month safety stock. Implement demand sensing to adjust orders quickly.'
    },
    {
      id: 'r_ag_2', title: 'SPS & Food Safety Compliance Risk', type: 'Risk', severity: 'HIGH',
      desc: 'Agricultural imports face complex and rapidly evolving Sanitary and Phytosanitary (SPS) requirements at US, EU, and Japanese borders. A single rejected shipment can cost $200k+ and damage supplier relationships.',
      mitigation: 'Pre-certify all suppliers to FSMA (US) or EU SPS standards. Use only USDA/FSIS-registered facilities. Conduct pre-shipment microbiological testing. Engage a customs broker specializing in food imports.'
    },
    {
      id: 'r_ag_3', title: 'EUDR Deforestation Compliance', type: 'Risk', severity: 'MEDIUM',
      desc: 'EU Deforestation Regulation (EUDR) requires full due diligence and geolocation data for beef, soy, palm oil, cocoa, coffee, wood, and rubber entering the EU from 2025. Brazil and SE Asia exposure is high.',
      mitigation: 'Map supply chain to farm-level GPS coordinates. Engage only deforestation-free certified suppliers. Use Trase.earth or Supply Chain Intelligence tools for deforestation monitoring.'
    }
  ],
  food: [
    {
      id: 'r_food_1', title: 'Food Safety Recall & Liability Risk', type: 'Risk', severity: 'HIGH',
      desc: 'A single FDA or EFSA recall event can cost $10M–$500M+ in recall costs, litigation, and brand damage. Allergen mislabeling, pathogen contamination (Salmonella, Listeria), and foreign material incidents are the top triggers. Confectionery and snack products face specific scrutiny.',
      mitigation: 'Implement FSMA Preventive Controls rule. Conduct HACCP/HARPC analysis for all production lines. Require SQF Level 2 or BRC Grade A certification from all co-manufacturers. Maintain product traceability to lot-level within 4 hours.'
    },
    {
      id: 'r_food_2', title: 'Cold Chain Disruption & Perishability Risk', type: 'Risk', severity: 'MEDIUM',
      desc: 'Temperature excursions during transit can render perishable food products unsellable and create safety risks. Ocean freight for chilled/frozen products adds $1,500–$3,000/container premium and requires continuous monitoring. Port congestion can break cold chains.',
      mitigation: 'Use reefer containers with IoT temperature loggers. Mandate 2°C–8°C (chilled) or −18°C (frozen) corridor contracts. Pre-qualify backup cold storage at destination ports. Cargo insurance with spoilage coverage.'
    },
    {
      id: 'r_food_3', title: 'Commodity Input Price Volatility', type: 'Risk', severity: 'MEDIUM',
      desc: 'Key confectionery and food inputs — sugar, cocoa, gelatin, corn syrup, vegetable oils, wheat — trade as agricultural commodities with 20–60% annual price swings. 2024 cocoa prices rose 300%+ due to West Africa crop failures.',
      mitigation: 'Hedge commodity inputs via CBOT/ICE futures contracts (12–24 month forward coverage). Use fixed-price annual contracts with key ingredient suppliers. Develop alternative formulations to allow ingredient substitution without consumer impact.'
    }
  ],
  metals: [
    {
      id: 'r_met_1', title: 'Section 232 Steel & Aluminum Tariffs', type: 'Risk', severity: 'HIGH',
      desc: 'US 25% steel (Section 232) and 10% aluminum tariffs remain in force on most non-FTA origins. Additional anti-dumping and countervailing duty orders on specific products from multiple countries add further complexity.',
      mitigation: 'Maximize domestic (US/Canada) sourcing. Apply for Section 232 exclusions where applicable. Negotiate with EU and UK suppliers under quota agreements. Lock in landed cost with duties included in vendor pricing.'
    },
    {
      id: 'r_met_2', title: 'China Resource Nationalism & Rare Earth Export Controls', type: 'Risk', severity: 'HIGH',
      desc: 'China controls 85%+ of rare earth processing globally and has historically weaponized this dominance via export restrictions (2010 Japan embargo, 2023 gallium/germanium controls).',
      mitigation: 'Aggressively diversify to Australia (Lynas), US (MP Materials), and Canada (Vital Metals). Engage Critical Minerals Institute and US government stockpiling programs.'
    },
    {
      id: 'r_met_3', title: 'Commodity Price Cycle Risk', type: 'Risk', severity: 'MEDIUM',
      desc: 'Base metal prices (copper, nickel, lithium) can move 30-60% in a 12-month period driven by China demand, EV adoption rates, and speculative positioning. Lithium dropped 80% from peak to trough in 2023-24.',
      mitigation: 'Implement commodity price hedging through financial derivatives. Use index-linked pricing in long-term supply agreements with caps and floors. Build inventory counter-cyclically (buy at cycle lows).'
    }
  ],
  textiles: [
    {
      id: 'r_tex_1', title: 'UFLPA Forced Labor Compliance Risk', type: 'Risk', severity: 'HIGH',
      desc: 'The Uyghur Forced Labor Prevention Act (UFLPA) creates a rebuttable presumption that all goods from Xinjiang involve forced labor and are inadmissible to the US. Cotton, polyester, and yarn supply chains are highly exposed.',
      mitigation: 'Map entire fiber supply chain to raw material origin. Audit all Tier-2/3 suppliers for Xinjiang exposure. Use SLCP, amfori BSCI, or equivalent audit standards. Engage a supply chain traceability platform (Sourcemap, TextileGenesis).'
    },
    {
      id: 'r_tex_2', title: 'Bangladesh Factory Safety & Compliance', type: 'Risk', severity: 'MEDIUM',
      desc: 'Despite post-Rana Plaza improvements under the Bangladesh Accord (now RSC), structural and fire safety risks persist in lower-tier factories. Compliance lapses can trigger brand reputational damage and sourcing shutdowns.',
      mitigation: 'Source only from RSC/Accord-compliant factories. Conduct at minimum annual unannounced structural and fire safety audits. Maintain a qualified factory backup list for contingency sourcing.'
    },
    {
      id: 'r_tex_3', title: 'Lead Time vs. Fashion Cycle Mismatch', type: 'Risk', severity: 'MEDIUM',
      desc: 'Standard Asia ocean freight adds 25-40 days to lead time. Fast fashion and responsive retail cycles require 4-8 week total lead time, creating inventory overstock risk when sales miss forecasts.',
      mitigation: 'Near-shore to Turkey, Morocco, or Mexico for speed-to-market collections. Reserve Bangladesh/Vietnam for core basics with predictable demand. Implement demand-sensing analytics to improve forecast accuracy.'
    }
  ],

  chemicals: [
    {
      id: 'r_che_1', title: 'REACH & Dangerous Goods Compliance', type: 'Risk', severity: 'HIGH',
      desc: 'EU REACH requires registration of all chemical substances >1 tonne/year. Importers must also comply with CLP labeling, ADR/IMDG dangerous goods transport rules, and maintain up-to-date Safety Data Sheets (SDS). Non-compliance leads to customs holds and market bans.',
      mitigation: 'Require REACH pre-registration confirmation from all EU-bound suppliers. Maintain current SDS for all products. Use a licensed dangerous goods freight forwarder. Conduct annual compliance audits against ECHA SVHC candidate list updates.'
    },
    {
      id: 'r_che_2', title: 'Feedstock & Crude Oil Price Volatility', type: 'Risk', severity: 'HIGH',
      desc: 'Specialty chemical input costs (petrochemical feedstocks, natural gas, rare mineral salts) can swing 20–40% annually. Adhesive and coating raw material costs closely track crude oil and benzene/toluene benchmarks.',
      mitigation: 'Include feedstock price-adjustment clauses (oil index linkage) in supply agreements. Dual-source critical inputs. Maintain 60-90 day safety stock on high-turnover chemicals. Hedge with commodity financial instruments where volumes justify.'
    },
    {
      id: 'r_che_3', title: 'Section 301 Tariffs on Chinese Chemicals', type: 'Risk', severity: 'MEDIUM',
      desc: 'Many specialty chemicals, adhesives, and coatings sourced from China face 7.5–25% Section 301 tariffs under List 1-4A. Fine chemicals used in formulations may also be affected, raising BoM costs significantly.',
      mitigation: 'Audit import classification against active Section 301 lists. Source from European (BASF, Evonik) or US Gulf Coast alternatives. File for exclusions on specialized inputs with no US/non-China alternatives. Explore duty drawback programs.'
    }
  ],
  packaging: [
    {
      id: 'r_pkg_1', title: 'Section 301 & Anti-Dumping on Chinese Packaging', type: 'Risk', severity: 'HIGH',
      desc: 'Corrugated boxes, paperboard, and plastic packaging from China face 25% Section 301 tariffs plus additional anti-dumping duties on specific items (e.g., coated paper, PET containers). Total landed cost impact can be 30–40%.',
      mitigation: 'Qualify regional packaging suppliers (US, Mexico, ASEAN). Explore domestic corrugated partners (International Paper, WestRock). Compare total landed cost including duties before committing to China-origin packaging.'
    },
    {
      id: 'r_pkg_2', title: 'EU EPR & Recycled Content Regulations', type: 'Risk', severity: 'HIGH',
      desc: 'EU Packaging and Packaging Waste Directive (PPWD) mandates minimum recycled content, recyclability requirements, and Extended Producer Responsibility (EPR) registration in each EU member state by 2025–2030. Non-compliance blocks market entry.',
      mitigation: 'Audit all EU-bound packaging for PPWD compliance. Register with national EPR schemes (e.g., Der Grüne Punkt in Germany). Switch to mono-material, recyclable formats. Engage packaging compliance consultants for multi-country EU registration.'
    },
    {
      id: 'r_pkg_3', title: 'Pulp & Paper Price Volatility', type: 'Risk', severity: 'MEDIUM',
      desc: 'Containerboard and pulp prices are highly cyclical, moving 25–50% between cycle peaks and troughs. Post-COVID inventory corrections caused sharp price declines in 2023, but capacity tightness can reverse this quickly.',
      mitigation: 'Use index-linked pricing in paper packaging LTAs with price caps. Build 45–60 day corrugated inventory during low-price periods. Optimize box dimensions to reduce material usage (right-sizing programs). Explore fiber-substitution where applicable.'
    }
  ],
  medical: [
    {
      id: 'r_med_1', title: 'FDA Import Alert & cGMP Compliance Risk', type: 'Risk', severity: 'HIGH',
      desc: 'FDA maintains Import Alerts on dozens of Indian and Chinese API and device manufacturers for cGMP failures. A single import alert can halt all shipments from a facility, creating critical supply disruptions for pharmaceutical customers.',
      mitigation: 'Check FDA Import Alert database before qualifying any API or device supplier. Require recent FDA inspection outcomes and 483 observation history. Conduct independent GMP audits. Maintain 6-month API safety stock for critical materials.'
    },
    {
      id: 'r_med_2', title: 'Regulatory Approval Lead Time Risk', type: 'Risk', severity: 'HIGH',
      desc: 'Switching pharmaceutical API suppliers requires FDA Drug Master File (DMF) update and can take 18–36 months for approval. Medical device supplier changes trigger design change notifications and re-validation. Regulatory lock-in creates single-source dependency.',
      mitigation: 'Qualify secondary API suppliers in parallel with primary. Include regulatory change notification clauses in supply agreements. Maintain 12+ month supply agreements with lead-time guarantees. Engage regulatory affairs consultants for change management.'
    },
    {
      id: 'r_med_3', title: 'Cold Chain & Serialization Compliance', type: 'Risk', severity: 'MEDIUM',
      desc: 'Biopharmaceuticals and temperature-sensitive APIs require validated cold chain logistics (2–8°C or -20°C). Drug serialization requirements (DSCSA in US, FMD in EU) mandate end-to-end track-and-trace, with non-compliance resulting in product destruction.',
      mitigation: 'Use GDP-certified cold chain logistics providers only. Validate all cold chain lanes with temperature mapping studies. Implement serialization at point of manufacture. Deploy electronic batch records with full chain of custody documentation.'
    }
  ],
  plastics: [
    {
      id: 'r_pla_1', title: 'China Section 301 Tariff on Plastic Articles', type: 'Risk', severity: 'HIGH',
      desc: 'Most finished plastic parts sourced from China face 25% Section 301 tariffs on top of MFN rates, adding 25–30% to landed cost. Applies to injection-molded parts, extrusions, and assembled plastic components under HTS Chapter 39.',
      mitigation: 'Qualify alternative tooling in South Korea (0% KORUS), Germany (MFN ~0-5%), or domestic US compounders. Nearshore injection molding capacity to Mexico under USMCA. Request First Sale valuation ruling from CBP to reduce dutiable value.'
    },
    {
      id: 'r_pla_2', title: 'Crude Oil Price Correlation', type: 'Risk', severity: 'HIGH',
      desc: 'Polymer feedstock prices (naphtha, ethylene, propylene) are directly tied to crude oil. A 20% crude spike typically raises polymer costs 12-18% within 60-90 days, compressing margins and triggering supplier price escalation clauses.',
      mitigation: 'Include feedstock index price adjustment clauses (CPI/PPI linked) in LTAs. Source from US Gulf Coast suppliers with domestic natural gas-based feedstock, which is structurally cheaper and less oil-correlated. Hedge with financial instruments if volume justifies.'
    },
    {
      id: 'r_pla_3', title: 'REACH / RoHS Restricted Substance Compliance', type: 'Risk', severity: 'HIGH',
      desc: 'EU REACH regulations cover 240+ substances of very high concern (SVHCs) commonly used in polymer additives, plasticizers, and flame retardants (e.g., PFAS, phthalates, BPA, halogenated FRs). Non-compliant products face customs seizure and market bans.',
      mitigation: 'Require full material declaration (FMD) and RoHS/REACH compliance certificate from all polymer suppliers. Use IEC 62474 declarable substance database as the reference. Conduct annual chemical compliance audits. Specify SVHC-free grade variants in purchase specs.'
    },
    {
      id: 'r_pla_4', title: 'Tooling & Mold Lead Time Risk', type: 'Risk', severity: 'MEDIUM',
      desc: 'Injection mold fabrication for complex parts takes 8-20 weeks and costs $15,000–$250,000+ per tool. A single mold failure, tool damage, or supplier exit can halt production with no quick recovery path.',
      mitigation: 'Own your tooling — ensure purchase orders specify tooling ownership with your company. Maintain mold drawings and CAD files. Qualify a secondary molder with duplicate or back-up tooling for critical production parts. Inspect tools annually.'
    }
  ],
  wood_paper: [
    {
      id: 'r_wp_1', title: 'US Softwood Lumber Countervailing & Anti-Dumping Duties', type: 'Risk', severity: 'HIGH',
      desc: 'Canadian softwood lumber faces combined CVD/AD duties averaging 8–18% in the US under a long-running trade dispute. Rates are reset periodically through Commerce Department administrative reviews, creating pricing uncertainty for US buyers sourcing Canadian lumber.',
      mitigation: 'Source from US domestic producers (Weyerhaeuser, PotlatchDeltic) where possible. Use Canadian hardwood grades exempt from CVD/AD. Monitor USITC/Commerce Department annual review outcomes. Lock in 12-month pricing with Canadian mills before duty reset periods.'
    },
    {
      id: 'r_wp_2', title: 'EU Deforestation Regulation (EUDR) Compliance', type: 'Risk', severity: 'HIGH',
      desc: 'EU Deforestation Regulation (EUDR) requires operators to verify that wood, paper, and pulp products are not sourced from deforested land. Applies to all imports from Brazil, Indonesia, and other high-risk origins from 2025. Non-compliance blocks EU market entry.',
      mitigation: 'Require GPS-level geo-location data from all suppliers for forest-of-origin mapping. Engage only PEFC or FSC chain-of-custody certified suppliers. Use Trase.earth and Global Forest Watch for deforestation risk monitoring. Conduct pre-shipment EUDR due diligence audits.'
    },
    {
      id: 'r_wp_3', title: 'Pulp & Paper Price Cycle Volatility', type: 'Risk', severity: 'MEDIUM',
      desc: 'Global pulp prices (NBSK, BHKP, BEKP) move 30–50% between cycle peaks and troughs. 2022 saw record highs above $1,500/mt for NBSK; 2023-24 corrections brought prices back to $1,100–$1,200/mt. Newsprint and tissue demand declining structurally due to digital substitution.',
      mitigation: 'Use index-linked pricing with price caps/floors in long-term supply agreements. Build 60-day pulp inventory during price troughs. Optimize paper grade mix toward growing grades (containerboard, kraft). Explore secondary fiber (recycled) alternatives where quality specs permit.'
    }
  ],
  construction: [
    {
      id: 'r_con_1', title: 'Anti-Dumping & Countervailing Duties on Chinese Construction Products', type: 'Risk', severity: 'HIGH',
      desc: 'US and EU maintain anti-dumping and countervailing duties on a wide range of Chinese construction materials: ceramic tiles (AD 73–265%), glass fiber (25% Section 301), flat glass (25% Section 301), and steel products (15–118%). Total landed cost from China can be double the ex-works price.',
      mitigation: 'Source flat glass from EU (Saint-Gobain, AGC, Guardian) at MFN rates of ~3.7%. Source ceramic tiles from India or Mexico which face lower or no AD/CVD. Use US domestic cement and gypsum producers. Audit all construction products against current ITC AD/CVD order list before importing.'
    },
    {
      id: 'r_con_2', title: 'Construction Market Cyclicality & Demand Risk', type: 'Risk', severity: 'HIGH',
      desc: 'Glass, cement, and ceramic tile demand are highly correlated with construction activity, which follows sharp boom-bust cycles tied to interest rates. 2022–24 rate hike cycle caused residential construction to drop 20–30%, severely pressuring flat glass and tile producers.',
      mitigation: 'Diversify customer base across residential, commercial, and infrastructure segments. Maintain lean inventory and flexible take-or-pay contracts during demand downturns. Monitor housing starts, commercial construction permits, and infrastructure spending data monthly.'
    },
    {
      id: 'r_con_3', title: 'Carbon Intensity & EU Green Deal Compliance', type: 'Risk', severity: 'MEDIUM',
      desc: 'Cement and glass manufacturing are among the most carbon-intensive industries globally (~8% of global CO2). EU Carbon Border Adjustment Mechanism (CBAM) from 2026 will impose carbon costs on cement, glass, and steel imports into the EU, potentially adding €30–80/tonne CO2 equivalent.',
      mitigation: 'Source from suppliers with documented carbon reduction roadmaps and verified emissions data. Qualify low-carbon cement alternatives (blended cements, geopolymers). Engage CBAM consultants early to prepare for 2026 reporting and payment obligations. Track clinker substitution rates (SCM) in cement supply.'
    }
  ],
  consumer_goods: [
    {
      id: 'r_cg_1', title: 'Section 301 Tariffs & FDA MoCRA Compliance', type: 'Risk', severity: 'HIGH',
      desc: 'Most personal care and household products sourced from China face 25% Section 301 tariffs. Additionally, the FDA Modernization of Cosmetics Regulation Act (MoCRA, 2023) now requires cosmetic facility registration, product listing, and adverse event reporting — creating new compliance costs for importers.',
      mitigation: 'Qualify alternative manufacturing in Vietnam, India, or Mexico to reduce tariff exposure. Complete FDA cosmetic facility registration for all manufacturing sites. Implement adverse event tracking system. Engage regulatory counsel to assess full MoCRA compliance requirements before next import.'
    },
    {
      id: 'r_cg_2', title: 'Restricted Ingredient & Banned Substance Risk', type: 'Risk', severity: 'HIGH',
      desc: 'EU Cosmetics Regulation bans or restricts 1,600+ substances; US regulations lag but state bans (California AB 496, PFAS bans) create multi-jurisdiction compliance complexity. Reformulation costs average $200k–$2M per SKU. Ingredient bans can create overnight market access blocks.',
      mitigation: 'Conduct regular ingredient review against EU Annex II (banned) and Annex III (restricted) lists. Monitor California and other state cosmetics ban legislation. Use INCI-compliant formulations. Maintain reformulation contingency plans with contract manufacturers for top 20 SKUs by revenue.'
    },
    {
      id: 'r_cg_3', title: 'Palm Oil Supply Chain & Deforestation Risk', type: 'Risk', severity: 'MEDIUM',
      desc: 'Palm oil and palm derivatives (sodium lauryl sulfate, palm kernel oil) are core ingredients in most personal care and home care products. Unsustainable palm sourcing from Indonesia and Malaysia creates reputational, regulatory (EUDR), and customer pressure risks.',
      mitigation: 'Source 100% RSPO (Roundtable on Sustainable Palm Oil) Mass Balance or Segregated certified palm derivatives. Map all palm-derivative suppliers to plantation level. Disclose palm sourcing in sustainability reports. Explore alternative surfactants (methyl ester sulfonates, alkyl polyglucosides) for palm-free formulations.'
    }
  ],
  machinery: [
    {
      id: 'r_mac_1', title: 'Section 301 Tariffs on Chinese Machinery', type: 'Risk', severity: 'HIGH',
      desc: 'Most industrial machinery, CNC machine tools, and capital equipment sourced from China face 25% Section 301 tariffs (List 3/4A). On high-value capital equipment ($500k+), this creates enormous landed cost increases and disrupts capex budgets.',
      mitigation: 'Source precision machinery from Germany, Japan, or South Korea where duty rates are 0–5% under FTAs. For budget machinery, quantify total tariff cost in capex planning. File for Section 301 exclusions on specialized equipment with no viable non-China source.'
    },
    {
      id: 'r_mac_2', title: 'Long Lead Times & Single-Source Risk', type: 'Risk', severity: 'HIGH',
      desc: 'Precision pumps, valves, and CNC equipment from Germany and Japan carry 16–52 week lead times. Single-sourcing critical production equipment means any supply disruption directly halts manufacturing. Spare parts availability in remote locations is often limited.',
      mitigation: 'Place capital equipment orders 12+ months in advance. Maintain on-site critical spare parts inventory (bearings, seals, control boards). Qualify local service providers for maintenance. Negotiate spare parts stocking agreements with OEM at time of purchase.'
    },
    {
      id: 'r_mac_3', title: 'Export Control & Dual-Use Restrictions', type: 'Risk', severity: 'MEDIUM',
      desc: 'High-precision CNC machine tools (>4-axis, tight tolerances), certain pumps, and compressors are subject to Wassenaar Arrangement dual-use export controls. Resale or transfer to embargoed countries or restricted end-users can trigger severe US/EU penalties.',
      mitigation: 'Conduct end-user screening against BIS Entity List, OFAC SDN list, and Wassenaar control lists before purchase and at time of any resale or transfer. Obtain Export Control Classification Numbers (ECCNs) for all capital equipment. Maintain records for 5+ years.'
    }
  ]
}