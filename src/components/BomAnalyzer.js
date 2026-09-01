"use client"
import React, { useState } from 'react'
import { X, List, AlertTriangle, CheckCircle, Info, ChevronDown, ChevronUp, Loader2, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

// ── Category risk profiles ──────────────────────────────────────────────────
const CATEGORY_PROFILES = {
  coatings: {
    label: 'Paints / Coatings / Surface Treatment',
    riskLevel: 'MEDIUM',
    tariffRisk: 'CN-origin paints/coatings: Section 301 (25%). EU REACH VOC limits apply.',
    primaryHub: 'Rhine-Ruhr, Germany / Ohio, USA (PPG, Sherwin-Williams)',
    altHub: 'Malaysia / South Korea / Mexico (USMCA)',
    hts: '3208.90',
    mfnRate: '3.7%',
    tariffNote: 'US-origin: no tariff. CN-origin: 3.7% MFN + 25% Sec 301. EU: REACH + Ecolabel.',
    esg: 'VOC emissions regulation (EPA Method 24, EU Directive 2004/42/EC). PFAS-free formulations mandated in some jurisdictions.',
    concentration: 'LOW-MEDIUM — global majors (PPG, Axalta, AkzoNobel, Sherwin-Williams) and many regional suppliers',
    color: 'amber',
  },
  fasteners: {
    label: 'Fasteners / Hardware / Stampings',
    riskLevel: 'MEDIUM',
    tariffRisk: 'CN steel fasteners: Sec 232 (25%) + anti-dumping duties. Major AD/CVD cases active.',
    primaryHub: 'Jiaxing/Wenzhou, China / Illinois, USA / Hagen, Germany',
    altHub: 'Taiwan / Vietnam / South Korea',
    hts: '7318.15',
    mfnRate: '6.2%',
    tariffNote: 'CN-origin bolts/screws: 6.2% MFN + 25% Sec 232 + AD margins 50-300%. Taiwan: 6.2% MFN.',
    esg: 'Zinc plating: hazardous waste management. Cadmium plating banned in EU (REACH Annex XVII).',
    concentration: 'MEDIUM — China dominant for commodity fasteners; significant anti-dumping exposure',
    color: 'amber',
  },
  electrical: {
    label: 'Electrical / Wiring / Harness',
    riskLevel: 'HIGH',
    tariffRisk: 'Wire harnesses from CN: 25% Sec 301. Copper wire: commodity price volatility.',
    primaryHub: 'Juarez/Chihuahua, Mexico (USMCA) / Ukraine (disrupted) / Morocco',
    altHub: 'Romania / Serbia / Philippines',
    hts: '8544.30',
    mfnRate: '2.6%',
    tariffNote: 'MX harnesses (USMCA): 0%. CN-origin: 2.6% + 25% Sec 301. Monitor copper surcharges.',
    esg: 'RoHS compliance mandatory (restricted lead, cadmium, Cr6+). Conflict mineral (3TG) disclosure for copper.',
    concentration: 'HIGH — MX nearshore dominant post-Russia/Ukraine disruption; Ukraine was 20% of global harness supply',
    color: 'rose',
  },
  foam: {
    label: 'Foam / Seating / Acoustic Materials',
    riskLevel: 'LOW',
    tariffRisk: 'Low MFN duties. MDI/TDI isocyanate feedstock subject to market volatility.',
    primaryHub: 'US Midwest / Picardy, France / Shandong, China',
    altHub: 'Poland / Czech Republic / Mexico',
    hts: '3921.19',
    mfnRate: '4.2%',
    tariffNote: 'CN-origin foam: 4.2% + possible 301. EU: REACH SVHC applies to isocyanate residues.',
    esg: 'CFC/HFC blowing agents phased out under Montreal Protocol. Bio-based polyol content rising.',
    concentration: 'LOW — regional manufacturing dominant; raw material (MDI) more concentrated',
    color: 'emerald',
  },
  glass: {
    label: 'Glass / Glazing',
    riskLevel: 'MEDIUM',
    tariffRisk: 'CN flat glass subject to anti-dumping duties. Windshields: FMVSS/ECE R43 certification.',
    primaryHub: 'Ohio, USA (Pilkington/NSG) / Stolberg, Germany (AGC / Saint-Gobain)',
    altHub: 'Rayong, Thailand / Changzhou, China',
    hts: '7007.21',
    mfnRate: '5.0%',
    tariffNote: 'Safety glass MFN 5%. CN flat glass: AD duties 58-124% in some categories. EU: energy-intensive industry, carbon border adjustment.',
    esg: 'Energy-intensive manufacturing. Float glass CO2 ~0.5 t/t. Recycled cullet use reduces emissions.',
    concentration: 'MEDIUM — float glass oligopoly (NSG/Pilkington, AGC, Saint-Gobain, Guardian)',
    color: 'amber',
  },
  castings: {
    label: 'Metal Parts / Castings / Forgings',
    riskLevel: 'HIGH',
    tariffRisk: 'CN-origin castings: Section 232 (25%) steel/aluminum + AD/CVD on specific parts.',
    primaryHub: 'Jiangsu/Zhejiang, China / Monterrey, Mexico / Pune, India',
    altHub: 'Poland / Czech Republic / South Korea',
    hts: '8484.10',
    mfnRate: '3.7%',
    tariffNote: 'CN steel/Al castings: 25% Sec 232 + MFN. MX (USMCA): 0% with RVC. India: MFN 3.7%.',
    esg: 'Sand casting foundry emissions: silica dust (OSHA PEL), CO2. Die casting uses recycled Al.',
    concentration: 'HIGH — China dominant for precision castings; nearshoring to Mexico growing',
    color: 'rose',
  },
  electronics: {
    label: 'Electronics / Semiconductors',
    riskLevel: 'HIGH',
    tariffRisk: 'Section 301 tariffs (25%) on Chinese-origin semiconductors and PCBs',
    primaryHub: 'Taiwan / South Korea',
    altHub: 'Vietnam / Malaysia',
    hts: '8542.31',
    mfnRate: '0%',
    tariffNote: '25% for CN-origin. Taiwan (0%), Korea (0% via KORUS)',
    esg: 'Monitor conflict mineral (3TG) disclosure — Dodd-Frank Section 1502',
    concentration: 'HIGH — TSMC/Samsung duopoly on advanced nodes',
    color: 'rose',
  },
  metals: {
    label: 'Metals / Minerals',
    riskLevel: 'HIGH',
    tariffRisk: 'Section 232 (steel 25%, aluminum 10%) + Section 301 on Chinese rare earths',
    primaryHub: 'Atacama, Chile (Li) / Pilbara, Australia (Fe)',
    altHub: 'Hebei, China (steel) — tariff risk',
    hts: '7601.10',
    mfnRate: '2.5%',
    tariffNote: 'CN-origin steel: 25% Sec 232. Li/Co from Chile/Australia: 0% AUSFTA',
    esg: 'Mining ESG critical. Cobalt from DRC — conflict mineral risk',
    concentration: 'HIGH — rare earths >85% China-sourced',
    color: 'rose',
  },
  automotive: {
    label: 'Automotive Components',
    riskLevel: 'MEDIUM',
    tariffRisk: 'USMCA content rules — 75% RVC required for zero duty',
    primaryHub: 'Monterrey, Mexico / Detroit, USA',
    altHub: 'Setubal, Portugal / Brno, Czech Republic',
    hts: '8708.99',
    mfnRate: '2.5%',
    tariffNote: '0% under USMCA with 75% RVC. MFN 2.5% otherwise.',
    esg: 'IATF 16949 certification required. Monitor supply chain human rights (EU CSDDD)',
    concentration: 'MEDIUM — multiple regional hubs available',
    color: 'amber',
  },
  industrial: {
    label: 'Industrial / Magnetics',
    riskLevel: 'HIGH',
    tariffRisk: 'NdFeB magnets from China: 25% Section 301. Rare earth export quotas.',
    primaryHub: 'Baotou, China (dominant) / Hanau, Germany',
    altHub: 'Tokyo, Japan (premium grade)',
    hts: '8505.11',
    mfnRate: '1.3%',
    tariffNote: 'CN-origin: 25-30%. Japan (CPTPP): 0%. Germany: 3.7% MFN.',
    esg: 'Rare earth mining: Very High CO2. Limited recycling at scale.',
    concentration: 'VERY HIGH — China controls ~90% NdFeB production',
    color: 'rose',
  },
  plastics: {
    label: 'Plastics / Polymers',
    riskLevel: 'MEDIUM',
    tariffRisk: 'Generally low MFN duties. EU REACH / SVHC compliance mandatory.',
    primaryHub: 'Houston, USA (Gulf Coast) / Shanghai',
    altHub: 'Rotterdam, Netherlands / Jubail, Saudi Arabia',
    hts: '3901.10',
    mfnRate: '6.5%',
    tariffNote: 'US Gulf Coast: domestic, no tariff. CN-origin polymers: 6.5% + possible 301.',
    esg: 'REACH SVHC list — 240+ restricted substances. PFAS phase-out underway.',
    concentration: 'LOW — commodity market, multiple suppliers globally',
    color: 'amber',
  },
  chemicals: {
    label: 'Chemicals / Adhesives',
    riskLevel: 'MEDIUM',
    tariffRisk: 'REACH registration required for EU imports. Dangerous goods classification.',
    primaryHub: 'Houston, USA / Rhine-Ruhr, Germany',
    altHub: 'Yangtze Delta, China / Singapore',
    hts: '3506.91',
    mfnRate: '3.7%',
    tariffNote: 'Specialty chemicals: 3.7% MFN. Dangerous goods require ADR/IMDG compliance.',
    esg: 'SDS mandatory. Monitor PFAS, phthalates, VOC emissions compliance.',
    concentration: 'LOW-MEDIUM — diversified global chemical industry',
    color: 'amber',
  },
  agriculture: {
    label: 'Agricultural / Food',
    riskLevel: 'MEDIUM',
    tariffRisk: 'SPS measures, phytosanitary certificates, country-of-origin labeling required.',
    primaryHub: 'US Midwest / Brazil Cerrado / EU AgriRegions',
    altHub: 'Southeast Asia / Argentina Pampas',
    hts: '1201.90',
    mfnRate: '0-19%',
    tariffNote: 'Ag tariffs vary widely by product. SPS compliance is the primary barrier.',
    esg: 'Deforestation risk (Amazon soy). Rainforest Alliance / RSPO certification key.',
    concentration: 'MEDIUM — weather and geopolitical concentrated risk',
    color: 'amber',
  },
  medical: {
    label: 'Medical / Pharma',
    riskLevel: 'HIGH',
    tariffRisk: 'FDA Import Alert risk (CN/IN API suppliers). DSCSA serialization required.',
    primaryHub: 'Ireland / Switzerland (pharma) / Indiana, USA',
    altHub: 'Hyderabad, India (API) / Singapore (devices)',
    hts: '3004.90',
    mfnRate: '0%',
    tariffNote: 'Most pharma duty-free under WTO pharma zero-for-zero. Regulatory compliance is the barrier.',
    esg: 'cGMP certification required. Cold chain validation mandatory for biologics.',
    concentration: 'HIGH — API single-source dependency common',
    color: 'rose',
  },
  textiles: {
    label: 'Textiles / Apparel',
    riskLevel: 'MEDIUM',
    tariffRisk: 'High MFN tariffs (12-32% apparel). Forced labor (UFLPA) ban on XJ cotton.',
    primaryHub: 'Bangladesh / Vietnam / Indonesia',
    altHub: 'Ethiopia / Honduras (CAFTA) / Turkey',
    hts: '6203.42',
    mfnRate: '17.5%',
    tariffNote: 'CAFTA: 0%. AGOA (African): 0%. Xinjiang cotton: import ban (UFLPA).',
    esg: 'UFLPA — strict Xinjiang cotton ban. Forced labor audit required.',
    concentration: 'LOW — many competitive sourcing countries',
    color: 'amber',
  },
  packaging: {
    label: 'Packaging',
    riskLevel: 'MEDIUM',
    tariffRisk: 'CN corrugated boxes: 25% Sec 301 + anti-dumping duties.',
    primaryHub: 'US Southeast / Poland / Vietnam',
    altHub: 'Mexico (USMCA) / Turkey',
    hts: '4819.10',
    mfnRate: '0%',
    tariffNote: 'CN-origin corrugated: 25-40% combined. EU EPR registration required.',
    esg: 'EU PPWD mandates recycled content. EPR registration in each EU member state.',
    concentration: 'LOW — packaging is highly regionalized',
    color: 'amber',
  },
  wood_paper: {
    label: 'Wood / Paper',
    riskLevel: 'LOW',
    tariffRisk: 'Hardwood duties vary 0-3.2% MFN. Softwood lumber: US/Canada antidumping duties up to 20%.',
    primaryHub: 'Brazil / Canada / Southeast Asia',
    altHub: 'Germany / New Zealand / Chile',
    hts: '4412.31',
    mfnRate: '3.2%',
    tariffNote: 'Canadian softwood: antidumping + CVD ~20% combined. FSC/PEFC certification required for EU.',
    esg: 'EUDR (EU Deforestation Regulation) requires due diligence documentation from 2025.',
    concentration: 'LOW-MEDIUM — regional markets, but tropical hardwoods concentrated in SEA/Brazil',
    color: 'amber',
  },
  food: {
    label: 'Food / Beverage / Agriculture',
    riskLevel: 'MEDIUM',
    tariffRisk: 'Highly variable: 0% (CAFTA staples) to 35%+ (dairy, sugar, beef). SPS measures common.',
    primaryHub: 'Brazil / Netherlands / US Midwest',
    altHub: 'Thailand / Argentina / Mexico (USMCA)',
    hts: '2106.90',
    mfnRate: '6.4%',
    tariffNote: 'USMCA: 0% most ag. EU imports require phytosanitary certs. Sugar/dairy TRQs apply.',
    esg: 'FDA Food Safety Modernization Act (FSMA) compliance. Organic/fair-trade certification common.',
    concentration: 'LOW-MEDIUM — diversified globally but weather/climate risk concentrated',
    color: 'emerald',
  },
  machinery: {
    label: 'Machinery / Equipment',
    riskLevel: 'LOW',
    tariffRisk: 'Generally low MFN duties. CN CNC machines: potential 301 exposure.',
    primaryHub: 'Germany / Japan / USA',
    altHub: 'South Korea / Taiwan',
    hts: '8457.10',
    mfnRate: '4.4%',
    tariffNote: 'EU/Japan machinery: 4.4% MFN. CN machine tools: watch for Sec 301.',
    esg: 'CE marking required for EU. Verify energy efficiency class.',
    concentration: 'LOW — Germany, Japan, US, Korea all competitive',
    color: 'emerald',
  },

  // ── Expansion profiles (categories 16-40) ────────────────────────────────
  aerospace: {
    label: 'Aerospace & Airframe Structures',
    riskLevel: 'HIGH',
    tariffRisk: 'Civil aircraft parts largely duty-free. ITAR/EAR controls dominate, not tariffs.',
    primaryHub: 'Everett/Seattle, USA / Toulouse, France / Montreal, Canada',
    altHub: 'Guaymas, Mexico (USMCA) / Bristol, UK',
    hts: '8803.30',
    mfnRate: '0%',
    tariffNote: 'Duty-free under WTO Civil Aircraft Agreement. ITAR: no re-export or foreign-national data access without a DDTC licence.',
    esg: 'REACH chromate restrictions threaten aerospace primers. CFRP scrap has no scaled recycling route. DFARS specialty metals for US gov work.',
    concentration: 'HIGH — Boeing/Airbus duopoly; NADCAP special processes held by few qualified sources',
    color: 'rose',
  },
  energy_oil_gas: {
    label: 'Energy / Oil & Gas Equipment',
    riskLevel: 'HIGH',
    tariffRisk: 'Low tariff. Sanctions screening (OFAC/BIS) and API licensing are the real gates.',
    primaryHub: 'Houston, USA / Stavanger, Norway',
    altHub: 'Singapore (Jurong) / Ras Laffan, Qatar',
    hts: '8431.43',
    mfnRate: '2.5%',
    tariffNote: 'US domestic 0%. GCC common tariff 5%. Norway EEA 0%. API 6A/16A monogram required.',
    esg: 'OGMP 2.0 methane reporting flows down to suppliers. EPA Waste Emissions Charge penalises leak-prone components.',
    concentration: 'MEDIUM-HIGH — cryogenic valves and large compressors at 52-78 week lead times',
    color: 'rose',
  },
  ev_battery: {
    label: 'EV Battery / Cell Supply Chain',
    riskLevel: 'HIGH',
    tariffRisk: 'CN cells: 3.4% MFN + 25% Sec 301 + IRA FEOC disqualification of the 30D credit.',
    primaryHub: 'Ningde, China (CATL) / Chungcheong, South Korea',
    altHub: 'US Battery Belt TN-GA-KY / Poland-Hungary (EU)',
    hts: '8507.60',
    mfnRate: '3.4%',
    tariffNote: 'KORUS 0%. US domestic 0% + 45X credit ($45/kWh cell+module). FEOC screening required on every upstream tier.',
    esg: 'EU Battery Regulation carbon-footprint declaration then digital battery passport from Feb 2027. Cobalt DRC/RMI due diligence mandatory.',
    concentration: 'VERY HIGH — China refines most battery-grade Li, Co and graphite regardless of mine origin',
    color: 'rose',
  },
  semiconductor: {
    label: 'Semiconductor Manufacturing & Materials',
    riskLevel: 'HIGH',
    tariffRisk: 'ITA duty-free, but BIS export controls (incl. FDPR) reach non-US-made items.',
    primaryHub: 'Hsinchu, Taiwan / Nagoya-Tohoku, Japan (materials)',
    altHub: 'Phoenix, USA (CHIPS) / Eindhoven, Netherlands (litho)',
    hts: '8542.31',
    mfnRate: '0%',
    tariffNote: '0% under Information Technology Agreement. Export licensing, not duty, is the constraint for China-nexus shipments.',
    esg: 'Fabs consume 150k+ tonnes ultrapure water/day — Taiwan drought is a production risk. PFAS in photoresist under REACH review.',
    concentration: 'VERY HIGH — Taiwan >90% of sub-7nm; ASML sole EUV source; photoresist from a handful of Japanese firms',
    color: 'rose',
  },
  mining: {
    label: 'Mining & Extractives',
    riskLevel: 'HIGH',
    tariffRisk: 'Ores mostly low/zero duty. Resource nationalism and export bans are the real exposure.',
    primaryHub: 'Pilbara, Australia / Antofagasta, Chile',
    altHub: 'Saskatchewan, Canada / Katanga, DR Congo (high risk)',
    hts: '2601.11',
    mfnRate: '0%',
    tariffNote: 'AUSFTA and US-Chile FTA 0% and IRA critical-mineral qualifying. Indonesia/Chile restrict raw ore export.',
    esg: 'GISTM tailings conformance, Aboriginal heritage due diligence, and DRC artisanal child labour are the material issues.',
    concentration: 'VERY HIGH — DRC ~70% of cobalt; Chile+Peru ~40% of copper',
    color: 'rose',
  },
  luxury_goods: {
    label: 'Luxury Goods / Leather & Watches',
    riskLevel: 'MEDIUM',
    tariffRisk: 'US leather goods 9% MFN. CITES permits required per unit for exotic skins.',
    primaryHub: 'Florence/Scandicci, Italy / Jura Arc, Switzerland',
    altHub: 'Hong Kong-Shenzhen (jewellery) / Spain (leather)',
    hts: '4202.21',
    mfnRate: '9%',
    tariffNote: 'US 9% on leather handbags. Swiss Made requires 60% of cost in Switzerland. Made in Italy claims actively audited.',
    esg: 'Leather Working Group tannery rating, Italian subcontractor labour audits, Kimberley Process and G7 Russian-diamond traceability.',
    concentration: 'HIGH — Nivarox near-monopoly on hairsprings; Tuscan atelier capacity is finite',
    color: 'amber',
  },
  cosmetics: {
    label: 'Cosmetics & Personal Care',
    riskLevel: 'MEDIUM',
    tariffRisk: 'Mostly duty-free. FDA MoCRA and EU CPNP registration are the market-access gates.',
    primaryHub: 'Gyeonggi, South Korea (ODM) / Cosmetic Valley, France',
    altHub: 'New Jersey, USA / Guangdong, China',
    hts: '3304.99',
    mfnRate: '0%',
    tariffNote: 'KORUS 0%. EU/US cosmetics largely duty-free. MoCRA facility registration required for any facility shipping to the US.',
    esg: 'EU bans/restricts 1,600+ substances. PFAS state bans drive reformulation. RSPO palm derivatives and Nagoya Protocol on botanicals.',
    concentration: 'LOW-MEDIUM — Cosmax/Kolmar dominate K-beauty ODM but many qualified alternatives exist',
    color: 'amber',
  },
  cold_chain: {
    label: 'Cold Chain & Temp-Controlled Logistics',
    riskLevel: 'HIGH',
    tariffRisk: 'Service category. F-gas refrigerant quotas and GDP/FSMA compliance drive cost.',
    primaryHub: 'Rotterdam/Venlo, Netherlands / Atlanta, USA',
    altHub: 'Singapore Changi (CEIV Pharma) / Dubai',
    hts: '8418.69',
    mfnRate: '2.2%',
    tariffNote: 'Equipment 0-2.2% MFN. The commercial exposure is excursion loss and reefer plug availability, not duty.',
    esg: 'F-gas phase-down forces R-404A migration to CO2 transcritical or ammonia. Cold storage is 3-5x ambient energy intensity.',
    concentration: 'MEDIUM — Lineage/Americold consolidate US capacity; reefer plug scarcity at peak',
    color: 'rose',
  },
  renewable_energy: {
    label: 'Renewable Energy Equipment',
    riskLevel: 'HIGH',
    tariffRisk: 'Solar: UFLPA detention + AD/CVD + circumvention findings on SE Asia assembly.',
    primaryHub: 'Jiangsu, China (PV) / Jutland, Denmark (wind)',
    altHub: 'Gujarat, India (PV) / Texas-Georgia, USA (45X)',
    hts: '8541.43',
    mfnRate: '0%',
    tariffNote: 'CN modules: AD/CVD + Sec 201 + UFLPA hold risk. India: no AD/CVD order. US domestic: 45X $0.07/W module credit.',
    esg: 'Xinjiang polysilicon forced-labour presumption. Wind blades are effectively unrecyclable thermoset composite.',
    concentration: 'VERY HIGH — China holds 80-95% of every step of the PV chain',
    color: 'rose',
  },
  telecom: {
    label: 'Telecom & Network Infrastructure',
    riskLevel: 'HIGH',
    tariffRisk: 'ITA duty-free. Trusted-vendor mandates exclude Huawei/ZTE from funded networks.',
    primaryHub: 'Helsinki/Stockholm (Nokia, Ericsson) / Taiwan (ODM)',
    altHub: 'Japan-Korea optical belt / Vietnam-Mexico assembly',
    hts: '8517.62',
    mfnRate: '0%',
    tariffNote: '0% under ITA. Verify substantial transformation on Vietnam/Mexico assembly — CBP has challenged screwdriver-assembly origin claims.',
    esg: 'Nordic vendors publish full scope 3. Conflict-mineral (3TG) disclosure applies to copper and tantalum content.',
    concentration: 'HIGH — fibre preform capacity is the hard constraint; Nokia/Ericsson are the only trusted-vendor RAN options',
    color: 'rose',
  },
  furniture: {
    label: 'Furniture & Interior Fittings',
    riskLevel: 'HIGH',
    tariffRisk: 'CN wooden bedroom furniture, cabinets and upholstered seating: AD/CVD up to 250%+.',
    primaryHub: 'Binh Duong, Vietnam / Foshan, China',
    altHub: 'Poland (EU volume) / Northeast Italy (design) / Mexico',
    hts: '9403.60',
    mfnRate: '0%',
    tariffNote: 'MFN 0% but AD/CVD dominates for CN origin, assessed retroactively at the final review rate. VN has no blanket order.',
    esg: 'Lacey Act strict liability on timber legality. EUDR plot-level geolocation from 2025. TSCA Title VI / CARB formaldehyde certification.',
    concentration: 'LOW-MEDIUM — many qualified sources, but AD/CVD makes origin selection decisive',
    color: 'rose',
  },
  sports_outdoor: {
    label: 'Sports & Outdoor Equipment',
    riskLevel: 'MEDIUM',
    tariffRisk: 'Athletic footwear carries up to 20% MFN — among the highest surviving US duties.',
    primaryHub: 'Binh Duong, Vietnam (footwear) / Taichung, Taiwan (bicycles)',
    altHub: 'Indonesia / Alpine Europe (technical/PPE) / China',
    hts: '6404.11',
    mfnRate: '20%',
    tariffNote: 'Footwear duty driven by upper material and sole construction — classification is worth several margin points. First-sale valuation common.',
    esg: 'PFAS-free DWR now effectively mandatory for EU. Bluesign/OEKO-TEX expected. Carbon-fibre layup scrap has no recycling route.',
    concentration: 'HIGH — Shimano supplies the majority of world bicycle drivetrains with no fast alternative',
    color: 'amber',
  },
  toys_games: {
    label: 'Toys & Games',
    riskLevel: 'MEDIUM',
    tariffRisk: 'Toys mostly MFN duty-free but exposed to Section 301 on Chinese origin.',
    primaryHub: 'Dongguan/Shantou, China',
    altHub: 'Vietnam / Billund-Hungary (premium EU) / Mexico',
    hts: '9503.00',
    mfnRate: '0%',
    tariffNote: 'MFN 0%. Book-plus-object formats can reclassify from Chapter 49 into Chapter 95, pulling in full CPSIA testing.',
    esg: 'ICTI Ethical Toy Program certification expected by all major retailers; pre-Q4 overtime is the most common audit failure.',
    concentration: 'HIGH — Guangdong cluster produces the large majority of world toys',
    color: 'amber',
  },
  pet_animal: {
    label: 'Pet Food & Animal Products',
    riskLevel: 'MEDIUM',
    tariffRisk: 'Mostly duty-free. FSMA 21 CFR 507 and state feed registration are the gates.',
    primaryHub: 'US Midwest (MO/KS/IA) / Bangkok, Thailand (wet)',
    altHub: 'Netherlands-Denmark (additives, vet) / Brazil',
    hts: '2309.10',
    mfnRate: '0%',
    tariffNote: 'MFN 0% for prepared pet food. EU requires approved third-country establishment listing plus a veterinary health certificate.',
    esg: 'CBP withhold-release orders on Thai/Chinese fishing over forced labour — marine protein needs vessel-level traceability.',
    concentration: 'MEDIUM — North American co-manufacturing capacity persistently tight since 2021',
    color: 'amber',
  },
  printing_media: {
    label: 'Printing, Publishing & Media',
    riskLevel: 'LOW',
    tariffRisk: 'Printed books duty-free under HTS 4901 and largely excluded from Section 301.',
    primaryHub: 'Shenzhen/Dongguan, China (books) / US Midwest',
    altHub: 'Germany (presses) / Poland / India',
    hts: '4901.99',
    mfnRate: '0%',
    tariffNote: 'Books 0%. Watch classification drift into Chapter 95 for book-plus-toy formats, which triggers CPSIA testing.',
    esg: 'FSC-certified stock is standard. MOSH/MOAH ink migration limits tightening for food-contact printing, led by Germany.',
    concentration: 'LOW-MEDIUM — capacity consolidating as print volumes structurally decline',
    color: 'emerald',
  },
  hvac: {
    label: 'HVAC & Building Systems',
    riskLevel: 'MEDIUM',
    tariffRisk: 'CN compressors and coils: 25% Sec 301. AHRI/UL listing required regardless of origin.',
    primaryHub: 'Osaka, Japan (Daikin) / Texas-Southeast USA',
    altHub: 'Yangtze Delta, China (components) / Mexico / Thailand',
    hts: '8415.10',
    mfnRate: '2.2%',
    tariffNote: 'US domestic 0% and IRA 25C eligible. CN components 2.5% MFN + 25% Sec 301. CPTPP 0% from Japan.',
    esg: 'AIM Act and EU F-gas cut HFC supply on a fixed schedule — R-410A is being displaced by A2L R-32 and R-454B.',
    concentration: 'HIGH — most rotary/scroll compressors are China-made even inside Western-branded units',
    color: 'amber',
  },
  water_treatment: {
    label: 'Water Treatment & Purification',
    riskLevel: 'MEDIUM',
    tariffRisk: 'Low duty. NSF/ANSI 61 and 372 certification is the binding requirement.',
    primaryHub: 'California/US Southwest (membranes) / Israel',
    altHub: 'Germany-Nordics (municipal) / Singapore',
    hts: '8421.21',
    mfnRate: '0%',
    tariffNote: 'Equipment 0% MFN. Any wetted component needs a verifiable NSF/ANSI 61 listing — check the public NSF database, not the supplier claim.',
    esg: 'EPA PFAS limits at single-digit ppt and the recast EU UWWTD create simultaneous global demand for GAC and ion-exchange media.',
    concentration: 'MEDIUM-HIGH — RO membrane element supply concentrated among few manufacturers',
    color: 'amber',
  },
  defense_military: {
    label: 'Defence & Military Systems',
    riskLevel: 'HIGH',
    tariffRisk: 'Not tariff-driven. ITAR, DFARS specialty metals and CMMC L2 are award gates.',
    primaryHub: 'DC-Virginia corridor, USA / Bristol-Barrow, UK',
    altHub: 'Changwon, South Korea / France-Germany (EU primes)',
    hts: '9301.90',
    mfnRate: 'N/A',
    tariffNote: 'Licence-controlled rather than tariffed. AUKUS licence-free environment applies only to enrolled entities — verify before assuming exemption.',
    esg: 'ESG-screened investors exclude the sector, raising supplier financing cost. AFFF PFAS remediation is a large legacy liability.',
    concentration: 'VERY HIGH — solid rocket motors and ammonium perchlorate have effectively single domestic sources',
    color: 'rose',
  },
  maritime: {
    label: 'Maritime & Shipbuilding',
    riskLevel: 'HIGH',
    tariffRisk: 'USTR Sec 301 action adds port fees on Chinese-built vessels, cranes and containers.',
    primaryHub: 'Ulsan/Geoje, South Korea / Shanghai-Jiangsu, China',
    altHub: 'Japan / Denmark-N.Europe (propulsion & systems)',
    hts: '8901.20',
    mfnRate: '0%',
    tariffNote: 'Newbuilds not conventionally tariffed, but the Jones Act bars foreign-built ships from US domestic trades and Sec 301 adds port entry fees.',
    esg: 'IMO net-zero 2050 and EU ETS coverage drive methanol/ammonia dual-fuel. Require Hong Kong Convention recycling clauses.',
    concentration: 'VERY HIGH — Korean yards hold near-exclusive membrane LNG capability; China >50% of global orderbook',
    color: 'rose',
  },
  railway: {
    label: 'Railway & Rail Transit',
    riskLevel: 'MEDIUM',
    tariffRisk: 'Buy America 70% domestic content; NDAA 7613 bars Chinese state-controlled builders.',
    primaryHub: 'Germany-France-Switzerland (systems) / Pittsburgh-Midwest USA',
    altHub: 'Spain / Poland / Japan / India',
    hts: '8607.21',
    mfnRate: '2.5%',
    tariffNote: 'MFN 2.5-3.7%. FTA-funded procurement requires 70% domestic content plus US final assembly — CRRC is statutorily excluded.',
    esg: 'Rail is the lowest-carbon land mode; manufacturing carbon is dominated by steel and aluminium inputs.',
    concentration: 'HIGH — Knorr-Bremse/Wabtec duopoly on rail braking with no third source at scale',
    color: 'amber',
  },
  robotics_automation: {
    label: 'Robotics & Industrial Automation',
    riskLevel: 'HIGH',
    tariffRisk: 'Low duty. Precision reducer supply and EU Machinery Regulation are the constraints.',
    primaryHub: 'Japan (FANUC, Yaskawa, Nabtesco) / Stuttgart-Augsburg, Germany',
    altHub: 'Silicon Valley-Boston (AMR) / South Korea / China',
    hts: '8479.50',
    mfnRate: '0%',
    tariffNote: 'CPTPP 0% from Japan, 2.7% MFN from EU. AMR subassemblies (motors, LiDAR, batteries) remain China-origin with Sec 301 exposure.',
    esg: 'ISO 10218 / ISO-TS 15066 safety certification. EU Machinery Regulation 2023/1230 adds cybersecurity and AI requirements from 2027.',
    concentration: 'VERY HIGH — Nabtesco and Harmonic Drive supply most world precision reducers; every robot brand depends on them',
    color: 'rose',
  },
  instruments_scientific: {
    label: 'Scientific Instruments & Metrology',
    riskLevel: 'MEDIUM',
    tariffRisk: 'Low duty, but Wassenaar dual-use controls apply to high-accuracy CMMs and microscopes.',
    primaryHub: 'Boston-New England, USA / Jena-Oberkochen, Germany',
    altHub: 'Tokyo-Kyoto, Japan / Switzerland',
    hts: '9027.80',
    mfnRate: '0%',
    tariffNote: '0-1.7% MFN. ECCN 2B006 and related controls apply to precision metrology — classify before quoting, not before shipping.',
    esg: 'Helium dependence for GC carrier gas and NMR cryogens is a genuine supply risk; qualify hydrogen carrier where the method allows.',
    concentration: 'MEDIUM-HIGH — Zeiss SMT optics for EUV are irreplaceable; Horiba holds ~50%+ of fab mass flow controllers',
    color: 'amber',
  },
  glass_ceramics: {
    label: 'Glass & Technical Ceramics',
    riskLevel: 'MEDIUM',
    tariffRisk: 'CN flat glass AD duties. CBAM prices embedded carbon on EU glass imports from 2026.',
    primaryHub: 'Corning NY, USA / France-Germany glass belt',
    altHub: 'Nagoya-Seto, Japan (technical ceramics) / China',
    hts: '7010.90',
    mfnRate: '5%',
    tariffNote: 'Container glass 5% MFN. CN flat glass carries AD duties. CBAM adds embedded-carbon cost into the EU from 2026.',
    esg: 'Glass melting is among the most energy-intensive processes; cullet ratio drives both cost and footprint. MLCC palladium has Russian exposure.',
    concentration: 'HIGH — pharma glass effectively locked by USP <660> qualification; MLCC lead times swing 12-40 weeks',
    color: 'amber',
  },
  paint_coatings: {
    label: 'Paints, Coatings & Pigments',
    riskLevel: 'MEDIUM',
    tariffRisk: 'CN coatings and TiO2: Sec 301 plus active AD duties on Chinese titanium dioxide.',
    primaryHub: 'Cleveland-Pittsburgh, USA / Netherlands-Germany',
    altHub: 'Yangtze Delta, China / Malaysia / India',
    hts: '3208.90',
    mfnRate: '3.7%',
    tariffNote: 'US domestic 0%. CN origin 3.7% MFN + 25% Sec 301; EU has imposed AD duties on Chinese TiO2, typically 20-25% of paint cost.',
    esg: 'Proposed EU universal PFAS restriction and REACH chromate sunset dates both force multi-year requalification programmes.',
    concentration: 'LOW-MEDIUM — many coatings suppliers, but TiO2 pigment supply is concentrated and trade-remedy exposed',
    color: 'amber',
  },
  nutraceuticals: {
    label: 'Nutraceuticals & Supplements',
    riskLevel: 'MEDIUM',
    tariffRisk: 'Low duty. FDA 21 CFR 111 cGMP and import alerts on named suppliers are the gates.',
    primaryHub: 'Southern California-Utah, USA / Netherlands-Switzerland',
    altHub: 'Mumbai-Hyderabad, India (extracts) / China (bulk vitamins)',
    hts: '2106.90',
    mfnRate: '0-6.4%',
    tariffNote: 'Rate varies with composition. NDI notification required for post-1994 US ingredients; EU Novel Food authorisation takes 18-36 months.',
    esg: 'Economically motivated botanical adulteration is endemic — independent identity testing per lot, not supplier CoA. Prop 65 heavy-metal litigation risk.',
    concentration: 'MEDIUM — Lonza dominates two-piece capsules; botanical extracts concentrated in India with import-alert exposure',
    color: 'amber',
  },
}

function categorize(item) {
  const q = item.toLowerCase()
  const match = (kws) => kws.some(kw => q.includes(kw))

  // ── Expansion categories: high-specificity prechecks ──────────────────────
  // These run first because the legacy blocks below match broad single words
  // ('glass', 'battery cell', 'relay', 'pump') that would otherwise swallow
  // them. Only compound terms are used here so legacy routing is preserved.

  // Semiconductor manufacturing & materials (before electronics)
  if (match(['silicon wafer','epitaxial wafer','300mm wafer','200mm wafer','wafer fab','photoresist','euv','duv litho','immersion litho','photomask','reticle','cmp slurry','sputtering target','ion implant','atomic layer deposition','abf substrate','ic substrate','leadframe','die attach','wire bond','osat','advanced packaging','cowos','chiplet','semiconductor foundry','semiconductor equipment','fab equipment','semiconductor grade','polysilicon','sic wafer','gan wafer'])) return 'semiconductor'

  // EV battery / cell supply chain (before electronics battery terms)
  if (match(['ev battery','traction battery','gigafactory','cathode active material','anode material','anode graphite','synthetic graphite','pcam','nmc cathode','ncm cathode','nca cathode','lfp cathode','prismatic cell','pouch cell','cylindrical cell','4680','21700','18650','cell-to-pack','cell to pack','battery electrolyte','lipf6','battery separator','black mass','battery recycling','battery passport'])) return 'ev_battery'

  // Renewable energy equipment (before electronics / machinery)
  if (match(['solar panel','solar module','pv module','photovoltaic','solar cell','solar inverter','string inverter','microinverter','solar tracker','bifacial module','cdte module','perc cell','topcon cell','heterojunction cell','wind turbine','turbine blade','wind blade','nacelle','monopile','offshore wind','onshore wind','electrolyser','electrolyzer','green hydrogen','fuel cell stack','battery energy storage','grid scale storage','utility scale storage'])) return 'renewable_energy'

  // Aerospace & airframe structures (before castings / fasteners)
  if (match(['aerospace','aircraft part','airframe','aerostructure','fuselage','wing box','wing spar','landing gear','aircraft engine','jet engine','turbofan','turboprop','avionics','as9100','nadcap','aircraft fastener','aerospace fastener','aerospace composite','cfrp prepreg','honeycomb core','satellite component','spacecraft','launch vehicle','rocket engine','aircraft interior','aircraft bracket','aircraft skin'])) return 'aerospace'

  // Defence & military systems
  if (match(['defense contractor','defence contractor','military vehicle','armored vehicle','armoured vehicle','military grade','munition','ammunition','artillery','missile','warhead','solid rocket motor','itar','dfars','cmmc','usml','body armor','body armour','ballistic plate','ballistic helmet','night vision','military radar','electronic warfare','submarine component','military drone'])) return 'defense_military'

  // Energy / oil & gas equipment (before machinery pump/valve/compressor)
  if (match(['oilfield','oil field','oil and gas','oil & gas','wellhead','christmas tree valve','subsea tree','subsea equipment','blowout preventer','bop stack','drill pipe','drill bit','drilling rig','drill collar','casing pipe','octg','frac pump','fracturing','mud pump','downhole','api 6a','api 6d','api 5l','lng train','cryogenic valve','cryogenic tank','refinery equipment','pipeline valve','flare system','separator vessel'])) return 'energy_oil_gas'

  // Mining & extractives (before raw metals)
  if (match(['iron ore','copper ore','copper concentrate','bauxite','spodumene','lithium brine','mineral concentrate','mine site','mining operation','open pit mine','underground mine','tailings','haul truck','mineral processing','ore beneficiation','flotation cell','crushing plant','sag mill','potash','uranium ore','yellowcake','metallurgical coal','critical mineral','rare earth mining','nickel laterite','cobalt concentrate','kimberley process'])) return 'mining'

  // Telecom & network infrastructure (before electrical / electronics)
  if (match(['telecom','telecommunication','5g network','5g equipment','ran equipment','open ran','base station','small cell','cell tower','network switch','core router','optical transceiver','optical transport','optical fiber cable','optical fibre cable','fiber optic cable','single mode fiber','fiber preform','fusion splicer','gpon','xgs-pon','submarine cable','subsea cable','data center switch','white box switch','dwdm','microwave backhaul','satcom terminal'])) return 'telecom'

  // HVAC & building systems (before machinery chiller/boiler)
  if (match(['hvac','air conditioner','air conditioning','heat pump','mini split','vrf system','rooftop unit','air handling unit','fan coil','refrigerant','r-410a','r410a','r-32 refrigerant','r-454b','scroll compressor','rotary compressor','condensing unit','evaporator coil','condenser coil','thermostat','building automation','ductwork','air duct','ventilation system','seer2','hspf','ahri certified','chilled water system'])) return 'hvac'

  // Water treatment & purification
  if (match(['water treatment','wastewater','waste water','desalination','desalinat','reverse osmosis','ro membrane','nanofiltration','ultrafiltration','membrane element','ion exchange resin','activated carbon filter','granular activated carbon','water filtration','water purification','clarifier','sludge treatment','uv disinfection','water softener','demineralization','boiler feedwater','nsf 61','effluent treatment','pfas removal'])) return 'water_treatment'

  // Robotics & industrial automation (before machinery robot terms)
  if (match(['industrial robot','robotic arm','robot arm','six axis robot','6-axis robot','scara robot','delta robot','cobot','collaborative robot','autonomous mobile robot','amr robot','automated guided vehicle','robot controller','end effector','robot gripper','end-of-arm','harmonic drive','strain wave gear','cycloidal reducer','precision reducer','motion controller','machine vision','vision system','safety plc','industrial automation','factory automation','warehouse automation','palletizing robot','pick and place'])) return 'robotics_automation'

  // Scientific instruments & metrology
  if (match(['mass spectrometer','mass spectrometry','chromatography','hplc','uplc','gas chromatograph','gc-ms','lc-ms','nmr spectrometer','spectrophotometer','electron microscope','sem microscope','tem microscope','atomic force microscope','coordinate measuring machine','cmm machine','metrology equipment','optical metrology','laser interferometer','profilometer','analytical instrument','laboratory instrument','lab equipment','scientific instrument','xrf analyzer','xrd diffractometer','flow cytometer','pcr instrument','mass flow controller'])) return 'instruments_scientific'

  // Glass & technical ceramics (before the legacy glass block)
  if (match(['technical ceramic','advanced ceramic','alumina ceramic','zirconia ceramic','silicon nitride ceramic','ceramic substrate','ceramic package','mlcc','multilayer ceramic capacitor','pharmaceutical glass','type i glass','glass vial','glass ampoule','prefilled syringe','cover glass','gorilla glass','glass container','float glass furnace','cullet','optical glass','glass ceramic','refractory ceramic','porcelain insulator'])) return 'glass_ceramics'

  // Maritime & shipbuilding
  if (match(['shipbuilding','shipyard','newbuild vessel','container ship','containership','bulk carrier','tanker vessel','lng carrier','ro-ro vessel','marine engine','ship engine','two-stroke engine','marine propulsion','ship propeller','ballast water treatment','scrubber marine','ship-to-shore crane','port crane','shipping container','reefer container','jones act','offshore vessel','dry dock','hull block'])) return 'maritime'

  // Railway & rail transit
  if (match(['rolling stock','railcar','rail car','freight car','locomotive','metro car','trainset','high speed train','railway track','railway signalling','railway signaling','etcs','positive train control','bogie','rail wheelset','rail axle','railway brake','pantograph','catenary','overhead line equipment','rail fastening','railway sleeper','railway tie','railway component','rail transit'])) return 'railway'

  // Cold chain & temperature-controlled logistics
  if (match(['cold chain','cold storage','refrigerated container','refrigerated truck','refrigerated warehouse','freezer warehouse','blast freezer','temperature controlled logistics','temperature-controlled','temperature excursion','gdp logistics','ceiv pharma','validated cold chain','cryogenic shipper','dry ice shipping','insulated shipper','vaccine cold chain','frozen logistics','chilled logistics'])) return 'cold_chain'

  // Sports & outdoor terms that collide with textiles ('shoe') / machinery
  if (match(['athletic footwear','running shoe','sports shoe','sneaker','trainer shoe','sportswear','activewear','performance apparel','bicycle','bike frame','e-bike','ebike','groupset','bicycle component','cycling helmet','ski binding','snowboard','climbing harness','climbing rope','carabiner','hiking boot','golf club','tennis racket','treadmill'])) return 'sports_outdoor'

  // Pet & animal terms that collide with agriculture/food ('food','feed')
  if (match(['pet food','dog food','cat food','pet treat','pet supplement','animal feed','feed additive','animal nutrition','livestock feed','poultry feed','aquafeed','aqua feed','kibble','cat litter','veterinary','animal vaccine'])) return 'pet_animal'

  // Pigment terms that collide with raw metals ('titanium')
  if (match(['titanium dioxide','tio2','pigment dispersion','colour pigment','color pigment'])) return 'paint_coatings'

  // Paints / Coatings / Surface Treatments (check before chemicals)
  if (match(['paint','powder coat','powder-coat','e-coat','electrophoretic','primer coat','topcoat','basecoat','clearcoat','lacquer','varnish','anodiz','anodise','electroplat','zinc plat','chrome plat','phosphat','conversion coat','pvd coating','conformal coat','conformal coating','surface treatment','surface finish','cathodic dip','epoxy coat','polyurethane coat','anti-corrosion coat','enamel coat','ceramic coat','thermal spray','hard anodize'])) return 'coatings'

  // Fasteners / Hardware / Stampings (check before metals)
  if (match(['bolt','screw','nut ','washer','rivet','clip','clamp','bracket','spring','hinge','latch','lock ','pin ','cotter','stud ','threaded rod','hex bolt','socket head','torx','self-tapping','wood screw','machine screw','sheet metal screw','stamping','stamped part','metal stamp','progressive die','blanking','punching','metal clip','retainer clip','wire form','snap ring','circlip','e-ring','c-ring'])) return 'fasteners'

  // Electrical / Wiring / Harness (check before electronics)
  if (match(['wire harness','wiring harness','cable assembly','wire assembly','loom','electrical cable','power cable','signal cable','coaxial cable','flat cable','ribbon cable','terminal block','wire terminal','crimp terminal','connector housing','relay','fuse','circuit breaker','switch assembly','bus bar','bus-bar','junction box','grommet','electrical','wiring'])) return 'electrical'

  // Foam / Seating / Acoustic
  if (match(['foam','polyurethane foam','pu foam','memory foam','seat cushion','seat pad','acoustic foam','acoustic panel','headliner foam','door pad','carpet underlay','batting','bun foam','rebonded','melamine foam','packaging foam','epe foam','xpe foam','eva foam'])) return 'foam'

  // Glass / Glazing
  if (match(['glass','glazing','windshield glass','rear glass','side glass','tempered glass','laminated glass','float glass','borosilicate','flat glass','glass panel','glass fiber batt','safety glass','automotive glass','architectural glass'])) return 'glass'

  // Electronics / Semiconductors / Battery Cells
  if (match(['chip','semiconductor','pcb','printed circuit','wafer','display','oled','lcd panel','processor','memory module','microchip','circuit board','nand flash','dram','fpga','mcu','microcontroller','integrated circuit','mosfet','transistor','capacitor','resistor','inductor','sensor ic','led driver','power module','igbt','diode','op-amp','dsp','asic','soc ','gpu ','mems','accelerometer','gyroscope','radar module','lidar','camera module','bms','battery management','battery cell','battery pack','battery module','lifepo4','lfp battery','nmc battery','nca battery','lithium battery','lithium ion battery','prismatic cell','cylindrical cell','pouch cell','solid state battery','battery separator','li-ion','li-po'])) return 'electronics'

  // Industrial / Magnetics
  if (match(['magnet','neodymium','ndfeb','ferrite magnet','actuator','solenoid','bearing','o-ring','gear','sintered','permanent magnet','electromagnet','magnetic core','transformer core','motor lamination'])) return 'industrial'

  // Metal castings / forgings / machined parts (check before raw metals)
  if (match(['casting','cast iron','die cast','sand cast','investment cast','lost wax','forging','forged','machined part','cnc part','turned part','milled part','extruded part','extruded profile','drawn part','sheet metal part','metal fabrication','metal assembly','metal bracket','metal housing','metal enclosure','metal frame','metal structure','weldment','welded assembly','stamped metal','deep drawn','hydroformed','roll formed'])) return 'castings'

  // Raw Metals / Minerals
  if (match(['lithium','cobalt','titanium','tungsten','rare earth','steel coil','steel sheet','steel strip','steel bar','aluminum ingot','copper cathode','copper billet','nickel','manganese','molybdenum','steel billet','aluminum sheet','aluminum billet','copper wire rod','zinc ingot','tin ingot','magnesium ingot','chromium','vanadium','niobium','silicon metal','polysilicon','raw material ore','metal ingot','metal billet','scrap metal','pig iron','slab','bloom'])) return 'metals'

  // Automotive Components
  if (match(['automotive','brake pad','brake disc','brake rotor','brake caliper','visor','sun visor','headliner','dashboard','instrument panel','bumper','fender','chassis','powertrain','tier-1','tier 1','car seat','auto seat','door trim','interior trim','airbag','tire','tyre','exhaust','transmission','wheel rim','engine part','suspension','shock absorber','strut','cv joint','drive shaft','axle','catalytic converter','fuel pump','oil filter','air filter','spark plug','alternator','starter motor','radiator'])) return 'automotive'

  // Plastics / Polymers / Rubber
  if (match(['polymer','polypropylene','polyethylene','hdpe','ldpe','pvc','nylon','peek','pom','polycarbonate','polyurethane','abs plastic','abs housing','abs resin','abs component','plastic part','plastic housing','plastic component','plastic cover','plastic trim','injection mold','injection-mold','injection molded','injection-molded','blow mold','blow-mold','blow molded','rubber','silicone','gasket','seal ','sealing','fiberglass','composite','epoxy resin','plastic film','thermoplastic','elastomer','tpe ','tpu ','overmold','resin','pellet','compound','masterbatch','polystyrene','acrylic','pmma','pet resin','polyester resin','vinyl','chloroprene','epdm','nbr ','sbr ','natural rubber','synthetic rubber','plastic injection','stretch film'])) return 'plastics'

  // Chemicals / Adhesives / Lubricants
  if (match(['adhesive','glue','sealant','lubricant','grease','cutting fluid','solvent','thinner','acetone','alcohol','surfactant','specialty chemical','fine chemical','industrial chemical','flux','cleaning agent','degreaser','rust inhibitor','coolant','hydraulic fluid','transmission fluid','brake fluid','thermal paste','thermal grease','thermal interface','potting compound','conformal coat','release agent','mold release'])) return 'chemicals'

  // Agriculture / Food
  if (match(['beef','meat','wheat','soybean','food','corn','chicken','grain','dairy','coffee','cocoa','sugar','rice','agricultural','agri','crop','soy','canola','sunflower','palm oil','starch','flour','glucose','dextrose','fertilizer','pesticide','herbicide','fungicide'])) return 'agriculture'

  // Medical / Pharma
  if (match(['api ','active pharmaceutical','pharmaceutical','drug substance','excipient','medical device','surgical','syringe','catheter','stent','implant','diagnostic kit','reagent','nitrile glove','latex glove','surgical mask','n95','sterile','gmp certified','iso 13485','medical grade','pharma grade','cleanroom'])) return 'medical'

  // Textiles / Apparel
  if (match(['shirt','shoe','cotton','leather','apparel','textile','clothing','garment','denim','wool','fabric','yarn','knit','woven','polyester fabric','nylon fabric','spandex','lycra','fleece','felt','non-woven','canvas','webbing','strap','velcro','zipper','button','thread','sewing thread','embroidery thread','silk','linen','viscose','rayon','twill','lace','ribbon','elastic band','interlining','batting','interfacing'])) return 'textiles'

  // Wood / Paper / Packaging Materials
  if (match(['plywood','lumber','timber','hardwood','softwood','mdf','particleboard','chipboard','osb board','oriented strand','wood panel','teak','pine wood','oak wood','birch','maple wood','walnut wood','bamboo','rattan','kraft paper','corrugated paper','paper board','cardboard','paperboard','newsprint','tissue paper','kraft','pulp','paper roll','paper sheet','paper bag','wood pellet','engineered wood','laminate floor'])) return 'wood_paper'

  // Food / Beverage
  if (match(['tomato','potato','banana','avocado','mango','apple','orange','berry','vegetable','fruit','fish','seafood','shrimp','salmon','tuna','spice','pepper','salt','sugar cane','molasses','vinegar','sauce','soup','snack','cereal','pasta','noodle','biscuit','chocolate','candy','beverage','juice','beer','wine','spirits','tea','milk','cheese','butter','cream','ice cream','yogurt','oil','olive','palm','soy oil','protein'])) return 'food'

  // Packaging
  if (match(['corrugated box','cardboard box','shipping box','carton','blister pack','clamshell','pouch','stand-up pouch','shrink sleeve','label','pressure sensitive','glass bottle','glass jar','plastic bottle','plastic container','retail packaging','aseptic','foam insert','bubble wrap','pallet','strapping','shrink wrap'])) return 'packaging'

  // Machinery / Equipment
  if (match(['pump','valve','compressor','cnc machine','machine tool','robot','robotic arm','conveyor','heat exchanger','gearbox','servo drive','vfd','press machine','lathe','mill ','grinder','welding machine','laser cutter','injection molding machine','extruder','hydraulic press','pneumatic cylinder','industrial equipment','capital equipment','plant equipment'])) return 'machinery'

  // ── Expansion categories: consumer-facing & finished goods ────────────────
  // Placed after the legacy blocks so existing BOM routing is unchanged.

  // Luxury goods / leather & watches
  if (match(['luxury goods','luxury handbag','designer handbag','leather handbag','small leather goods','luxury watch','mechanical watch','watch movement','swiss made','watch case','hairspring','escapement','fine jewelry','fine jewellery','jewelry manufactur','jewellery manufactur','diamond setting','exotic leather','crocodile leather','python leather','alligator leather','cites permit','vegetable tanned','haute couture'])) return 'luxury_goods'

  // Cosmetics & personal care formulation
  if (match(['cosmetic','skincare','skin care','serum formulation','k-beauty','beauty odm','makeup','lipstick','mascara','eyeshadow','sunscreen','spf formulation','moisturizer','fragrance','perfume','eau de parfum','inci','mocra','cpnp','emulsifier cosmetic','hyaluronic acid','niacinamide','retinol','peptide skincare','personal care formulation'])) return 'cosmetics'

  // Furniture & interior fittings
  if (match(['furniture','sofa','couch','armchair','dining table','coffee table','office chair','task chair','ergonomic chair','bedroom furniture','wardrobe','kitchen cabinet','bathroom vanity','upholstered seating','mattress','bed frame','flat pack','flat-pack','rta furniture','shelving unit','contract furniture','outdoor furniture','patio furniture','drawer slide','cabinet hinge'])) return 'furniture'

  // Sports & outdoor equipment
  if (match(['athletic footwear','running shoe','sports shoe','sneaker','sportswear','activewear','performance apparel','sports equipment','bicycle','bike frame','e-bike','ebike','groupset','bicycle component','cycling helmet','ski equipment','snowboard','ski binding','climbing harness','climbing rope','carabiner','camping gear','sleeping bag','hiking boot','golf club','tennis racket','fitness equipment','treadmill','dwr finish'])) return 'sports_outdoor'

  // Toys & games
  if (match(['plush toy','soft toy','action figure','fashion doll','doll toy','board game','puzzle game','jigsaw puzzle','building block toy','construction toy','ride-on toy','toy vehicle','educational toy','learning toy','toy factory','toy product','kids toy','children toy','astm f963','en 71','cpsia','icti','toy safety','toy manufactur','playset','collectible figure'])) return 'toys_games'

  // Pet food & animal products
  if (match(['pet food','dog food','cat food','pet treat','pet supplement','animal feed','feed additive','animal nutrition','livestock feed','poultry feed','aquafeed','aqua feed','veterinary','animal health','animal vaccine','pet accessory','cat litter','pet grooming','kibble','rendered protein'])) return 'pet_animal'

  // Printing, publishing & media production
  if (match(['book printing','offset printing','commercial printing','digital printing','flexographic','flexo press','gravure printing','screen printing','printing press','printing plate','ctp plate','printing ink','offset ink','uv ink','low migration ink','toner cartridge','inkjet head','bookbinding','case bound','perfect binding','saddle stitch','catalog printing','magazine printing','direct mail','print on demand','security printing'])) return 'printing_media'

  // Paints, coatings & pigments (broader terms; the legacy 'coatings' block
  // already catches process-coating language and fires first)
  if (match(['titanium dioxide','tio2','pigment','dispersion pigment','architectural paint','decorative paint','marine coating','antifouling','coil coating','can coating','wood coating','paint manufactur','coating manufactur','zinc rich primer','chromate conversion','voc coating'])) return 'paint_coatings'

  // Nutraceuticals & dietary supplements
  if (match(['nutraceutical','dietary supplement','food supplement','vitamin supplement','multivitamin','softgel','gummy supplement','capsule supplement','two-piece capsule','botanical extract','herbal extract','curcumin','ashwagandha','boswellia','lutein','omega-3','fish oil supplement','algal oil','collagen peptide','whey protein','probiotic','prebiotic','creatine','amino acid supplement','novel food','ndi notification','aafco','sports nutrition'])) return 'nutraceuticals'

  // Fallback generic metals
  if (match(['steel','aluminum','aluminium','copper','iron','zinc','mineral','mining','metal','alloy','bronze','brass','stainless'])) return 'metals'

  return null
}

const RISK_COLORS = {
  HIGH: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', dot: 'bg-rose-500' },
  MEDIUM: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', dot: 'bg-amber-500' },
  LOW: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', dot: 'bg-emerald-500' },
}

export default function BomAnalyzer({ onClose, onScan }) {
  const [input, setInput]     = useState('')
  const [results, setResults] = useState(null)
  const [expanded, setExpanded] = useState({})
  const [minimized, setMinimized] = useState(false)
  const [lastScanned, setLastScanned] = useState(null)

  const analyzeBOM = () => {
    const lines = input.split(/[\n,;]/).map(l => l.trim()).filter(l => l.length > 1)
    if (!lines.length) return
    const analyzed = lines.map((item, idx) => {
      const cat = categorize(item)
      const profile = cat ? CATEGORY_PROFILES[cat] : null
      return {
        id: idx,
        item,
        category: profile?.label ?? 'Unclassified',
        riskLevel: profile?.riskLevel ?? 'UNKNOWN',
        tariffRisk: profile?.tariffRisk ?? 'Run HS Code lookup for tariff assessment.',
        primaryHub: profile?.primaryHub ?? '—',
        altHub: profile?.altHub ?? '—',
        hts: profile?.hts ?? '—',
        mfnRate: profile?.mfnRate ?? '—',
        tariffNote: profile?.tariffNote ?? '—',
        esg: profile?.esg ?? '—',
        concentration: profile?.concentration ?? '—',
        color: profile?.color ?? 'sky',
      }
    })
    setResults(analyzed)
    setExpanded({})
  }

  const summary = results ? {
    high: results.filter(r => r.riskLevel === 'HIGH').length,
    medium: results.filter(r => r.riskLevel === 'MEDIUM').length,
    low: results.filter(r => r.riskLevel === 'LOW').length,
    unknown: results.filter(r => r.riskLevel === 'UNKNOWN').length,
  } : null

  // ── Minimized pill — shown while scanning a component ───────────────────
  if (minimized && results) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className="fixed bottom-6 left-6 z-[250]"
      >
        <div
          onClick={() => setMinimized(false)}
          className="flex items-center gap-3 bg-[#0d0d0d] border border-violet-500/40 rounded-2xl px-4 py-3 cursor-pointer hover:border-violet-500/70 transition-all shadow-[0_0_30px_rgba(139,92,246,0.15)] group"
        >
          <div className="w-7 h-7 bg-violet-500/15 border border-violet-500/30 rounded-lg flex items-center justify-center shrink-0">
            <List size={13} className="text-violet-400" />
          </div>
          <div className="min-w-0">
            <div className="text-[9px] font-bold text-violet-400 uppercase tracking-widest">BOM Analysis</div>
            <div className="text-[8px] text-slate-500 mt-0.5 truncate max-w-[180px]">
              {results.length} items · <span className="text-rose-400">{summary.high} HIGH</span> · <span className="text-amber-400">{summary.medium} MED</span>
            </div>
            {lastScanned && (
              <div className="text-[7px] text-slate-600 mt-0.5 truncate max-w-[180px]">Scanning: {lastScanned}</div>
            )}
          </div>
          <div className="flex items-center gap-1 ml-1">
            <div className="text-[8px] text-violet-500 group-hover:text-violet-300 font-bold uppercase tracking-wider transition-colors">↑ Expand</div>
            <button
              onClick={(e) => { e.stopPropagation(); onClose() }}
              className="ml-2 p-1 text-slate-600 hover:text-slate-300 transition-colors rounded"
            >
              <X size={11} />
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-[#080808] border border-white/10 w-full max-w-4xl rounded-2xl shadow-[0_0_80px_rgba(56,189,248,0.08)] max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-violet-500/10 border border-violet-500/20 rounded-lg flex items-center justify-center">
              <List size={18} className="text-violet-400" />
            </div>
            <div>
              <h2 className="text-[13px] font-bold text-violet-400 tracking-[0.2em] uppercase">BOM Risk Analyzer</h2>
              <p className="text-[10px] text-slate-600 mt-0.5">Bill of Materials — sourcing risk, tariff exposure, concentration</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-all"><X size={20} /></button>
        </div>

        <div className="overflow-y-auto flex-1">
          {/* Input */}
          {!results && (
            <div className="p-6 space-y-4">
              <p className="text-[12px] text-slate-500 leading-relaxed">
                Paste your Bill of Materials below — one item per line, or comma / semicolon separated. Atlas will score each component for tariff exposure, sourcing concentration risk, and ESG flags.
              </p>
              <textarea
                autoFocus
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={`e.g.\nNdFeB permanent magnets (N52)\nLithium-ion battery cells\nInjection-molded ABS housing\nPCB assembly (8-layer)\nAluminum die casting\nBrake pad assembly\nNylon 66 connector`}
                rows={9}
                className="w-full bg-[#111] border border-white/10 px-5 py-4 text-[12px] font-mono text-white placeholder:text-slate-700 focus:outline-none focus:border-violet-500 transition-all rounded-xl resize-none leading-relaxed"
              />
              <button
                onClick={analyzeBOM}
                disabled={!input.trim()}
                className="w-full h-11 bg-violet-500 text-black font-bold text-[11px] uppercase tracking-widest hover:bg-violet-400 transition-all disabled:opacity-30 rounded-xl flex items-center justify-center gap-2"
              >
                <List size={14} /> Analyze BOM
              </button>
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="p-6 space-y-4">
              {/* Summary banner */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'High Risk', count: summary.high, color: 'rose' },
                  { label: 'Medium Risk', count: summary.medium, color: 'amber' },
                  { label: 'Low Risk', count: summary.low, color: 'emerald' },
                  { label: 'Unclassified', count: summary.unknown, color: 'slate' },
                ].map((s, i) => (
                  <div key={i} className={`p-3 rounded-xl border ${s.color === 'rose' ? 'bg-rose-500/10 border-rose-500/30' : s.color === 'amber' ? 'bg-amber-500/10 border-amber-500/30' : s.color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/10'} text-center`}>
                    <div className={`text-[22px] font-bold font-mono ${s.color === 'rose' ? 'text-rose-400' : s.color === 'amber' ? 'text-amber-400' : s.color === 'emerald' ? 'text-emerald-400' : 'text-slate-500'}`}>{s.count}</div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Item rows */}
              <div className="space-y-2">
                {results.map((r) => {
                  const rc = RISK_COLORS[r.riskLevel] || RISK_COLORS.LOW
                  const open = expanded[r.id]
                  return (
                    <div key={r.id} className={`rounded-xl border ${rc.border} overflow-hidden`}>
                      <div
                        onClick={() => setExpanded(e => ({ ...e, [r.id]: !e[r.id] }))}
                        className={`w-full flex items-center justify-between px-4 py-3 ${rc.bg} hover:brightness-110 transition-all cursor-pointer`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-2 h-2 rounded-full shrink-0 ${rc.dot}`} />
                          <span className="text-[12px] font-mono text-white truncate">{r.item}</span>
                          <span className="text-[9px] text-slate-500 shrink-0 hidden sm:block">{r.category}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-3">
                          <span className={`text-[9px] font-bold uppercase tracking-widest ${rc.text}`}>{r.riskLevel}</span>
                          <span className="text-[10px] text-slate-600 font-mono hidden sm:block">HTS {r.hts}</span>
                          {onScan && (
                            <button
                              onClick={(e) => { e.stopPropagation(); setLastScanned(r.item); setMinimized(true); onScan(r.item) }}
                              title="Deep-dive this component in Atlas"
                              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[8px] font-bold uppercase tracking-wider border transition-all
                                ${r.riskLevel === 'HIGH'
                                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-300 hover:bg-rose-500/35'
                                  : r.riskLevel === 'MEDIUM'
                                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
                                  : 'bg-white/5 border-white/15 text-slate-400 hover:bg-white/10'}`}
                            >
                              <Zap size={8} /> Scan
                            </button>
                          )}
                          {open ? <ChevronUp size={13} className="text-slate-500" /> : <ChevronDown size={13} className="text-slate-500" />}
                        </div>
                      </div>
                      {open && (
                        <div className="px-4 py-4 bg-[#0d0d0d] border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { label: 'Tariff Risk', value: r.tariffRisk, icon: <AlertTriangle size={11} /> },
                            { label: 'Tariff Rate Note', value: r.tariffNote, icon: <Info size={11} /> },
                            { label: 'Primary Sourcing Hub', value: r.primaryHub, icon: <CheckCircle size={11} /> },
                            { label: 'Alternative Hub', value: r.altHub, icon: <Info size={11} /> },
                            { label: 'Concentration Risk', value: r.concentration, icon: <AlertTriangle size={11} /> },
                            { label: 'ESG / Compliance Flag', value: r.esg, icon: <Info size={11} /> },
                          ].map((field, fi) => (
                            <div key={fi} className="space-y-0.5">
                              <div className="text-[9px] text-slate-600 uppercase tracking-widest font-bold flex items-center gap-1">{field.icon}{field.label}</div>
                              <div className="text-[11px] text-slate-300 leading-snug">{field.value}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <button
                onClick={() => { setResults(null); setInput('') }}
                className="w-full h-9 border border-white/10 text-slate-500 hover:text-white hover:border-white/20 text-[9px] uppercase tracking-widest rounded-xl transition-all"
              >
                Analyze new BOM
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
