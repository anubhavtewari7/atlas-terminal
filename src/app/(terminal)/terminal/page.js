"use client"

import React, { useState, useEffect } from 'react'
import Globe from '@/components/Globe'
import TariffLookup from '@/components/TariffLookup'
import MissionHistory from '@/components/MissionHistory'
import SupplierComparison from '@/components/SupplierComparison'
import IncotermsCalc from '@/components/IncotermsCalc'
import TradeRiskScore from '@/components/TradeRiskScore'
import PortStatus from '@/components/PortStatus'
import ComplianceChecklist from '@/components/ComplianceChecklist'
import TLCCalculator from '@/components/TLCCalculator'
import AtlasLogo from '@/components/AtlasLogo'
import {
  ShieldAlert, Zap, ChevronRight,
  Pause, Play, Newspaper, X, Target, Factory,
  ExternalLink, FileText, Ship, Leaf, BarChart3, Mail,
  Anchor, Clock, ArrowUpRight, ArrowDownRight, SearchCode,
  History, Scale, Filter, TrendingUp, Activity, DollarSign, Download,
  AlertTriangle, CheckCircle, Info
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Client-side fallback categorizer (mirrors database.js, no server needed) ──
function clientCategorize(query) {
  const q = query.toLowerCase()
  const match = (kws) => kws.some(kw => q.includes(kw))
  if (match(['tpe','thermoplastic elastomer','thermoplastic','thermoset','polymer','polymers','resin compound','plastic resin','abs plastic','abs compound','polypropylene','polyethylene','hdpe','ldpe','pvc pipe','pvc compound','nylon compound','nylon part','peek','pom resin','delrin','acetal','polycarbonate','polyurethane','pu foam','injection mold','injection mould','injection molded','injection moulded','blow mold','plastic part','plastic component','plastic housing','molded part','moulded part','overmold','elastomer','epdm','nbr rubber','silicone rubber','silicone part','rubber compound','synthetic rubber','natural rubber','carbon fiber','carbon fibre','fiberglass','fibreglass','composite part','epoxy resin','plastic film','packaging film','stretch film','plastic extrusion','extrusion profile','masterbatch','engineering plastic','specialty polymer'])) return 'plastics'
  if (match(['magnet','neodymium','ndfeb','ferrite magnet','bearing','fastener','o-ring','gasket','actuator','solenoid','precision gear','industrial motor','sintered'])) return 'industrial'
  if (match(['lithium','cobalt','titanium','tungsten','neodymium oxide','rare earth mineral','steel coil','aluminum ingot','copper cathode'])) return 'metals'
  if (match(['automotive','vehicle','sun visor','visor','headliner','instrument panel','dashboard','bumper','chassis','powertrain','tier-1','ford','gm ','toyota','honda','bmw','mercedes','stellantis','car seat','car seats','auto seat','vehicle seat','seat cover','seat trim','auto upholstery','vehicle upholstery','car interior','car door','car body'])) return 'automotive'
  if (match(['chip','semiconductor','wafer','pcb','display panel','oled','processor','memory chip','microchip','tsmc','circuit board','nand','dram'])) return 'electronics'
  if (match(['beef','meat','patty','wheat','soybean','food','agri','corn','chicken','grain','dairy','coffee','cocoa','sugar','rice','mcdonald'])) return 'agriculture'
  if (match(['adhesive','glue','sealant','bonding agent','coating','paint','primer','varnish','lacquer','powder coat','lubricant','grease','cutting fluid','solvent','thinner','acetone','surfactant','specialty chemical','fine chemical','industrial chemical','chemical compound'])) return 'chemicals'
  if (match(['corrugated box','cardboard box','shipping box','glass bottle','glass jar','glass container','label','pressure sensitive label','shrink sleeve','blister pack','clamshell','flexible pouch','stand-up pouch','packaging material','folding carton','aseptic carton','retail packaging','container packaging'])) return 'packaging'
  if (match(['api ','active pharmaceutical','drug substance','excipient','generic drug','pharmaceutical','medical device','surgical instrument','syringe','catheter','stent','implant','diagnostic kit','reagent','nitrile glove','surgical glove','surgical mask','n95','hospital supply','sterile','gmp certified','iso 13485'])) return 'medical'
  if (match(['pump','centrifugal pump','vacuum pump','gear pump','valve','ball valve','gate valve','check valve','compressor','air compressor','cnc machine','cnc machining','machine tool','grinding machine','machining center','industrial robot','robotic arm','conveyor','heat exchanger','pressure vessel','welding equipment','laser cutter','gearbox','servo drive','vfd','machinery','capital equipment','plant equipment'])) return 'machinery'
  if (match(['steel','aluminum','copper','iron','zinc','mineral','mining','metal','alloy','rare earth'])) return 'metals'
  if (match(['shirt','shoe','cotton','leather','apparel','textile','clothing','garment','denim','wool','fabric','yarn'])) return 'textiles'
  if (match(['car ','cars','engine part','brake','tire','tyre','transmission','exhaust','wheel','airbag','windshield'])) return 'automotive'
  return 'electronics'
}

// ── Lightweight client-side hub data for offline fallback ──
const FALLBACK_HUBS = {
  industrial: [
    { id:'fb_ind_1', lat:41.7, lng:110.7, hub:'BAOTOU, CHINA', title:'Global Rare Earth & NdFeB Core', companies:[{name:'Zhong Ke San Huan (HSMAG)',website:'https://www.hsmag.com/'},{name:'JLMAG Rare-Earth',website:'https://www.jlmag.com/'}], desc:'World\'s dominant hub for NdFeB permanent magnets (~90% global share). Key for automotive sensors, EV motors, and visor/IP actuators.', customs:{hts_code:'8505.11',duty_rate:'25% (Sec 301)',compliance_note:'Section 301 tariffs apply. Rare earth export quotas.'}, esg:{carbon_footprint:'Very High',ethical_rating:'C',sustainability_note:'Severe environmental impact. Closed-loop recycling not at scale.'}, logistics:{port_wait_days:5,freight_cost_estimate:'$3.8k/FEU'}, industry_kpi:{label:'Global Share',value:'~90% NdFeB'} },
    { id:'fb_ind_2', lat:35.6, lng:139.6, hub:'TOKYO / CHIBA, JAPAN', title:'Premium Precision Magnetics', companies:[{name:'TDK Corporation',website:'https://www.tdk.com/'},{name:'Shin-Etsu Chemical',website:'https://www.shinetsu.co.jp/'}], desc:'World-class automotive-grade precision magnets. Key for EV motors, ADAS sensors, visor actuators.', customs:{hts_code:'8505.11',duty_rate:'0% (CPTPP)',compliance_note:'CPTPP origin rules. IATF 16949 certified.'}, esg:{carbon_footprint:'Low',ethical_rating:'A+',sustainability_note:'Industry-leading magnet recycling programs.'}, logistics:{port_wait_days:2,freight_cost_estimate:'$4.2k/Sea'}, industry_kpi:{label:'Grade',value:'N52 / N50H'} },
    { id:'fb_ind_3', lat:50.1, lng:8.6, hub:'HANAU, GERMANY', title:'EU Advanced Magnetics Hub', companies:[{name:'Vacuumschmelze (VAC)',website:'https://www.vacuumschmelze.com/'},{name:'Arnold Europe GmbH',website:'https://www.arnoldmagnetics.com/'}], desc:'Premium rare earth magnets for automotive OEMs. VAC is the global reference for high-coercivity auto-grade magnets.', customs:{hts_code:'8505.11',duty_rate:'0% (Intra-EU) / 3.7% (MFN)',compliance_note:'REACH compliance. CE marking mandatory.'}, esg:{carbon_footprint:'Low',ethical_rating:'AA',sustainability_note:'Conflict mineral audits. RE100 green energy target.'}, logistics:{port_wait_days:1,freight_cost_estimate:'$1.8k/Truck'}, industry_kpi:{label:'Spec',value:'IATF 16949 + AEC-Q'} },
    { id:'fb_ind_4', lat:41.6, lng:-72.7, hub:'CONNECTICUT, USA', title:'US Domestic Magnetics', companies:[{name:'Arnold Magnetic Technologies',website:'https://www.arnoldmagnetics.com/'},{name:'Electron Energy Corp',website:'https://www.electronenergy.com/'}], desc:'100% domestic US magnet manufacturing. ITAR/DFARS compliant. No China-origin exposure.', customs:{hts_code:'8505.11',duty_rate:'0% (Domestic)',compliance_note:'ITAR/DFARS compliant. Buy America Act eligible.'}, esg:{carbon_footprint:'Low',ethical_rating:'A+',sustainability_note:'US-origin rare earth from MP Materials.'}, logistics:{port_wait_days:0,freight_cost_estimate:'$1.2k/Ground'}, industry_kpi:{label:'Compliance',value:'ITAR/DFARS'} },
  ],
  automotive: [
    { id:'fb_auto_1', lat:25.6, lng:-100.3, hub:'MONTERREY, MEXICO', title:'NAFTA Tier-1 Cluster', companies:[{name:'Grupo Antolin',website:'https://www.grupoantolin.com/'},{name:'Nemak',website:'https://www.nemak.com/'}], desc:'Primary nearshoring hub for NA automotive OEMs. Interiors, chassis, headliners, visor assemblies.', customs:{hts_code:'8708.29',duty_rate:'0% (USMCA)',compliance_note:'USMCA Rules of Origin. RVC ≥ 75%.'}, esg:{carbon_footprint:'Medium',ethical_rating:'A-',sustainability_note:'Water scarcity risk in Monterrey metro.'}, logistics:{port_wait_days:1,freight_cost_estimate:'$2.1k/Truck'}, industry_kpi:{label:'Tooling Lead',value:'12 Weeks'} },
    { id:'fb_auto_2', lat:42.3, lng:-83.0, hub:'DETROIT, USA', title:'Great Lakes Auto Cluster', companies:[{name:'Lear Corp',website:'https://www.lear.com/'},{name:'Magna International',website:'https://www.magna.com/'}], desc:'Legacy US auto hub. Domestic sourcing for Ford, GM, Stellantis.', customs:{hts_code:'8708.29',duty_rate:'0% (Domestic)',compliance_note:'Buy America Act eligible.'}, esg:{carbon_footprint:'Medium',ethical_rating:'A',sustainability_note:'UAW unionized. EV transition investment active.'}, logistics:{port_wait_days:0,freight_cost_estimate:'$1.5k/Ground'}, industry_kpi:{label:'Proximity',value:'Same-Day JIT'} },
    { id:'fb_auto_3', lat:31.2, lng:121.4, hub:'SHANGHAI, CHINA', title:'East China Auto Zone', companies:[{name:'Yanfeng Automotive',website:'https://www.yfai.com/'},{name:'Huayu Auto',website:'https://www.hasco-group.com/'}], desc:'Scale production for auto plastics, electronics, and interiors.', customs:{hts_code:'8708.29',duty_rate:'25% (Sec 301)',compliance_note:'Section 301 tariffs active.'}, esg:{carbon_footprint:'High',ethical_rating:'B',sustainability_note:'Renewable grid transition by 2030.'}, logistics:{port_wait_days:5,freight_cost_estimate:'$4.5k/FEU'}, industry_kpi:{label:'Scale',value:'Unlimited'} },
  ],
  electronics: [
    { id:'fb_tech_1', lat:24.8, lng:120.9, hub:'HSINCHU, TAIWAN', title:'Global Semiconductor Nexus', companies:[{name:'TSMC',website:'https://www.tsmc.com/'},{name:'MediaTek',website:'https://www.mediatek.com/'}], desc:'Center of global advanced semiconductor manufacturing. 90%+ of world\'s advanced logic chips.', customs:{hts_code:'8542.31',duty_rate:'0% (ITA)',compliance_note:'Export controls on advanced nodes apply.'}, esg:{carbon_footprint:'High',ethical_rating:'A-',sustainability_note:'High water consumption risk.'}, logistics:{port_wait_days:3,freight_cost_estimate:'$8.5k/Air'}, industry_kpi:{label:'Node',value:'3nm / 2nm'} },
    { id:'fb_tech_2', lat:22.5, lng:113.9, hub:'SHENZHEN, CHINA', title:'Hardware Innovation Bay', companies:[{name:'BYD Electronics',website:'https://www.byd.com/'},{name:'Luxshare Precision',website:'https://www.luxshare-ict.com/'}], desc:'Scale electronics assembly and PCBs. 48-hour prototype capability.', customs:{hts_code:'8517.70',duty_rate:'25% (Sec 301)',compliance_note:'Check Entity List. Section 301 applies.'}, esg:{carbon_footprint:'High',ethical_rating:'B-',sustainability_note:'Labor audit required.'}, logistics:{port_wait_days:4,freight_cost_estimate:'$3.5k/FEU'}, industry_kpi:{label:'Prototyping',value:'48 Hours'} },
  ],
  metals: [
    { id:'fb_met_1', lat:-23.5, lng:-68.4, hub:'ATACAMA, CHILE', title:'Global Lithium & Copper Core', companies:[{name:'SQM',website:'https://www.sqm.com/'},{name:'Codelco',website:'https://www.codelco.com/'}], desc:'Saudi Arabia of Lithium. Primary EV battery-grade lithium and world\'s largest copper reserves.', customs:{hts_code:'2836.91',duty_rate:'0% (US-Chile FTA)',compliance_note:'Strategic mineral regulations apply.'}, esg:{carbon_footprint:'Low',ethical_rating:'B',sustainability_note:'Water rights conflicts with indigenous groups.'}, logistics:{port_wait_days:5,freight_cost_estimate:'$3.5k/FEU'}, industry_kpi:{label:'Purity',value:'99.5% Li2CO3'} },
    { id:'fb_met_2', lat:40.4, lng:-79.9, hub:'PITTSBURGH, USA', title:'US Domestic Steel & Aluminum', companies:[{name:'US Steel',website:'https://www.ussteel.com/'},{name:'Nucor Steel',website:'https://www.nucor.com/'}], desc:'Domestic high-grade steel and aluminum. 100% tariff-free.', customs:{hts_code:'7208',duty_rate:'0% (Domestic)',compliance_note:'Buy America Act compliant.'}, esg:{carbon_footprint:'Medium',ethical_rating:'A',sustainability_note:'Electric arc furnace adoption growing.'}, logistics:{port_wait_days:0,freight_cost_estimate:'$1.0k/Rail'}, industry_kpi:{label:'Melt Origin',value:'100% US'} },
  ],
  agriculture: [
    { id:'fb_ag_1', lat:41.8, lng:-88.1, hub:'ILLINOIS, USA', title:'Midwest Protein Processing Hub', companies:[{name:'OSI Group',website:'https://www.osigroup.com/'},{name:'Cargill Meat',website:'https://www.cargill.com/'}], desc:'Primary QSR chain supplier cluster. USDA-inspected, FSMA-compliant.', customs:{hts_code:'0202.30',duty_rate:'0% (Domestic)',compliance_note:'USDA FSIS inspected. FSMA compliant.'}, esg:{carbon_footprint:'Medium',ethical_rating:'A-',sustainability_note:'Regenerative grazing initiatives active.'}, logistics:{port_wait_days:0,freight_cost_estimate:'$1.5k/Reefer'}, industry_kpi:{label:'Capacity',value:'10k Tons/Day'} },
    { id:'fb_ag_2', lat:-15.6, lng:-56.1, hub:'MATO GROSSO, BRAZIL', title:'Global Protein & Soy Nexus', companies:[{name:'JBS S.A.',website:'https://jbs.com.br/'},{name:'Marfrig',website:'https://www.marfrig.com.br/'}], desc:'World\'s largest beef and soy exporter. High volume, high ESG risk.', customs:{hts_code:'0202.30',duty_rate:'26.4% (Quota)',compliance_note:'TRQ quota limits. Sanitary certificate required.'}, esg:{carbon_footprint:'High',ethical_rating:'C',sustainability_note:'Amazon deforestation monitoring required.'}, logistics:{port_wait_days:8,freight_cost_estimate:'$5.5k/Reefer'}, industry_kpi:{label:'Traceability',value:'Tier-2 Only'} },
  ],
  textiles: [
    { id:'fb_tex_1', lat:23.8, lng:90.4, hub:'DHAKA, BANGLADESH', title:'RMG Hub', companies:[{name:'Ha-Meem Group',website:'https://www.hameemgroup.net/'},{name:'Beximco',website:'https://www.beximco.com/'}], desc:'World\'s 2nd largest apparel exporter. Extreme cost competitiveness.', customs:{hts_code:'6109.10',duty_rate:'16.5% (MFN)',compliance_note:'RSC/Accord labor audits required.'}, esg:{carbon_footprint:'High',ethical_rating:'B-',sustainability_note:'Annual unannounced audits required.'}, logistics:{port_wait_days:6,freight_cost_estimate:'$3.2k/FEU'}, industry_kpi:{label:'Cost/Unit',value:'Extremely Low'} },
    { id:'fb_tex_2', lat:41.0, lng:28.9, hub:'ISTANBUL, TURKEY', title:'Euro-Nearshore Fashion Hub', companies:[{name:'LC Waikiki',website:'https://corporate.lcwaikiki.com/'},{name:'Mavi',website:'https://www.mavi.com/'}], desc:'2-3 week lead time for EU market. High quality denim and cotton.', customs:{hts_code:'6203.42',duty_rate:'0% (EU Customs Union)',compliance_note:'Rapid EU border clearance.'}, esg:{carbon_footprint:'Low',ethical_rating:'A-',sustainability_note:'Organic cotton available.'}, logistics:{port_wait_days:2,freight_cost_estimate:'$1.5k/Truck'}, industry_kpi:{label:'Lead Time',value:'2-3 Weeks'} },
  ],
  plastics: [
    { id:'fb_pla_1', lat:22.5, lng:114.1, hub:'GUANGDONG, CHINA', title:'Global Injection Molding & Polymer Hub', companies:[{name:'Kingfa Sci & Tech',website:'https://www.kingfa.com/'},{name:'Hi-Tech Mold & Engineering',website:'https://www.hitechmold.com/'}], desc:'World\'s largest plastic parts manufacturing cluster. Unmatched capacity for TPE, ABS, and PP injection molding.', customs:{hts_code:'3926.90.99',duty_rate:'5.3% + 25% (Sec 301)',compliance_note:'Section 301 applies to most finished plastic articles. Verify REACH compliance for EU re-export.'}, esg:{carbon_footprint:'High',ethical_rating:'C+',sustainability_note:'High energy intensity from molding presses. China EPR plastics mandates increasing.'}, logistics:{port_wait_days:14,freight_cost_estimate:'$3.2k/FEU'}, industry_kpi:{label:'Capacity',value:'World\'s Largest'} },
    { id:'fb_pla_2', lat:49.4, lng:8.7, hub:'RHINE VALLEY, GERMANY', title:'European Specialty Polymer Hub', companies:[{name:'BASF SE',website:'https://www.basf.com/'},{name:'Covestro',website:'https://www.covestro.com/'}], desc:'Global center for engineering thermoplastics and polyurethane systems. IATF-grade nylon, PBT, and polycarbonate for automotive OEMs.', customs:{hts_code:'3908.10.00',duty_rate:'0% (MFN for polyamides)',compliance_note:'REACH registration mandatory. No Section 301. Best for sustainability-focused supply chains.'}, esg:{carbon_footprint:'Medium',ethical_rating:'A-',sustainability_note:'BASF carbon-neutral by 2050. ChemCycling circular economy portfolio.'}, logistics:{port_wait_days:2,freight_cost_estimate:'$2.8k/FEU'}, industry_kpi:{label:'Grade',value:'Specialty / Engineering'} },
    { id:'fb_pla_3', lat:29.7, lng:-95.0, hub:'HOUSTON / BAYTOWN, USA', title:'North American Polyolefin Hub', companies:[{name:'ExxonMobil Chemical',website:'https://www.exxonmobilchemical.com/'},{name:'LyondellBasell',website:'https://www.lyondellbasell.com/'}], desc:'World\'s largest polyolefin (PP, PE, LLDPE) production cluster. Domestic US supply with zero tariff, short lead times, USMCA compliant.', customs:{hts_code:'3902.10.00',duty_rate:'0% (Domestic)',compliance_note:'No import duties. USMCA-compliant. FDA food-contact grades available.'}, esg:{carbon_footprint:'Medium',ethical_rating:'B+',sustainability_note:'Domestic production reduces shipping emissions. Bio-based PP investments underway.'}, logistics:{port_wait_days:0,freight_cost_estimate:'$0.8k/Truck'}, industry_kpi:{label:'Origin',value:'100% US Domestic'} },
    { id:'fb_pla_4', lat:35.5, lng:129.4, hub:'ULSAN, SOUTH KOREA', title:'Specialty Elastomer & Engineering Polymer Hub', companies:[{name:'LG Chem',website:'https://www.lgchem.com/'},{name:'Lotte Chemical',website:'https://www.lottechem.com/'}], desc:'Global leader in specialty elastomers, ABS, and engineering plastics. KORUS FTA eliminates US import duties on most polymer grades.', customs:{hts_code:'4002.59.00',duty_rate:'0% (KORUS FTA)',compliance_note:'KORUS FTA duty elimination on synthetic rubber and most polymer grades. Korean origin docs required.'}, esg:{carbon_footprint:'Medium',ethical_rating:'A-',sustainability_note:'LG Chem 100% renewable energy target 2050. Bio-circular ABS available.'}, logistics:{port_wait_days:3,freight_cost_estimate:'$2.6k/FEU'}, industry_kpi:{label:'Tariff',value:'0% KORUS FTA'} },
  ],
  chemicals: [
    { id:'fb_che_1', lat:51.5, lng:6.8, hub:'RHINE-RUHR, GERMANY', title:'European Specialty Chemicals & Coatings Hub', companies:[{name:'BASF',website:'https://www.basf.com/'},{name:'Evonik Industries',website:'https://www.evonik.com/'},{name:'Lanxess',website:'https://www.lanxess.com/'}], desc:'BASF Ludwigshafen — largest integrated chemical complex in the world. Covers adhesives, coatings, lubricants, surfactants, and industrial gases. EU REACH compliance built-in.', customs:{hts_code:'3814.00.10',duty_rate:'3.7% (MFN solvents)',compliance_note:'EU REACH registration required. Dangerous Goods shipping (IMDG/ADR). SDS mandatory for all chemical imports.'}, esg:{carbon_footprint:'High',ethical_rating:'A-',sustainability_note:'BASF Verbund system optimizes energy reuse. Carbon neutrality target 2050.'}, logistics:{port_wait_days:2,freight_cost_estimate:'$3.2k/FEU'}, industry_kpi:{label:'Complex Scale',value:'Largest globally'} },
    { id:'fb_che_2', lat:29.7, lng:-95.3, hub:'HOUSTON, USA', title:'US Gulf Coast Petrochemicals & Lubricants Hub', companies:[{name:'Dow Chemical',website:'https://www.dow.com/'},{name:'Huntsman Corporation',website:'https://www.huntsman.com/'},{name:'Celanese',website:'https://www.celanese.com/'}], desc:'Texas Gulf Coast hosts 40% of US chemical production. Ethylene crackers, polyurethane systems, adhesives, epoxies, specialty lubricants, and industrial solvents. Proximity to Permian Basin feedstocks drives cost advantage.', customs:{hts_code:'2710.19.11',duty_rate:'0.1¢/barrel (lubricants)',compliance_note:'EPA TSCA compliance required. Hazmat shipping regulations (49 CFR).'}, esg:{carbon_footprint:'High',ethical_rating:'B+',sustainability_note:'Industry-leading carbon capture investment. ACC Responsible Care program.'}, logistics:{port_wait_days:2,freight_cost_estimate:'$1.8k/FEU domestic'}, industry_kpi:{label:'US Output',value:'40% of national'} },
    { id:'fb_che_3', lat:1.3, lng:103.7, hub:'JURONG ISLAND, SINGAPORE', title:'Asia Pacific Adhesives & Coating Chemicals Hub', companies:[{name:'Henkel Asia-Pacific',website:'https://www.henkel-adhesives.com/'},{name:'H.B. Fuller',website:'https://www.hbfuller.com/'}], desc:'Jurong Island Singapore: premier APAC hub for adhesives, sealants, and specialty coatings serving electronics, automotive, and construction. Excellent bonded-warehouse infrastructure.', customs:{hts_code:'3506.10.00',duty_rate:'0% (Singapore FTA)',compliance_note:'Singapore Chemical Control Order. Hazmat IMDG compliance for export.'}, esg:{carbon_footprint:'Medium',ethical_rating:'A',sustainability_note:'Singapore EHS standards. Low-VOC formulations mandated. ISO 14001 site certification.'}, logistics:{port_wait_days:1,freight_cost_estimate:'$2.1k/FEU'}, industry_kpi:{label:'ASEAN Access',value:'650M consumers'} },
  ],
  packaging: [
    { id:'fb_pkg_1', lat:39.9, lng:116.4, hub:'BEIJING/TIANJIN, CHINA', title:'Global Corrugated & Rigid Packaging Hub', companies:[{name:'Nine Dragons Paper',website:'https://www.ndpaper.com/'},{name:'Greatview Aseptic',website:'https://www.greatviewpack.com/'}], desc:'China produces 55% of global corrugated packaging and leads in rigid plastic containers, aseptic cartons, and flexible pouches. Major sourcing hub for boxes, clamshells, and shrink film.', customs:{hts_code:'4819.10.00',duty_rate:'25% (Sec 301 + 14.6% MFN)',compliance_note:'FSC certification recommended. FDCA compliance for food-contact packaging. California AB 2287 recycled content rules.'}, esg:{carbon_footprint:'Medium-High',ethical_rating:'B',sustainability_note:'Nine Dragons runs recycled fiber operations. Audit required for tier 2 mills.'}, logistics:{port_wait_days:5,freight_cost_estimate:'$2.9k/FEU'}, industry_kpi:{label:'Global Share',value:'55% corrugated'} },
    { id:'fb_pkg_2', lat:48.8, lng:2.3, hub:'FRANCE / BENELUX', title:'European Glass & Premium Packaging Hub', companies:[{name:'Verallia',website:'https://www.verallia.com/'},{name:'Smurfit Kappa',website:'https://www.smurfitkappa.com/'},{name:'DS Smith',website:'https://www.dssmith.com/'}], desc:'France and Benelux are the center of European glass bottle, luxury packaging, and sustainable paperboard production. Verallia and Ardagh lead glass container output.', customs:{hts_code:'7010.90.10',duty_rate:'5% (MFN glass containers)',compliance_note:'EU Packaging and Packaging Waste Directive (PPWD) compliance. Extended Producer Responsibility (EPR) registration required.'}, esg:{carbon_footprint:'Medium',ethical_rating:'A-',sustainability_note:'Glass is infinitely recyclable. Smurfit Kappa 100% chain of custody certified.'}, logistics:{port_wait_days:3,freight_cost_estimate:'$2.8k/FEU'}, industry_kpi:{label:'Recyclability',value:'Glass: infinite'} },
    { id:'fb_pkg_3', lat:33.7, lng:-84.4, hub:'ATLANTA, USA', title:'North American Labels & Flexible Packaging Hub', companies:[{name:'Avery Dennison',website:'https://www.averydennison.com/'},{name:'Sealed Air',website:'https://www.sealedair.com/'},{name:'Berry Global',website:'https://www.berryglobal.com/'}], desc:'US Southeast hub for pressure-sensitive labels, shrink sleeves, flexible pouches, and protective packaging. Avery Dennison and CCL dominate labels.', customs:{hts_code:'4821.10.20',duty_rate:'0% (most labels, domestic)',compliance_note:'FDA 21 CFR for food-contact. FTC Green Guides for recyclability claims. California SB 54 plastic packaging recycled content law.'}, esg:{carbon_footprint:'Medium',ethical_rating:'B+',sustainability_note:'Industry transition to mono-material recyclable films.'}, logistics:{port_wait_days:1,freight_cost_estimate:'$1.5k/FEU domestic'}, industry_kpi:{label:'Label Market',value:'$45B+ annually'} },
  ],
  medical: [
    { id:'fb_med_1', lat:22.3, lng:114.2, hub:'HONG KONG / SHENZHEN', title:'Asia Pacific Medical Device Manufacturing Hub', companies:[{name:'Mindray Medical',website:'https://www.mindray.com/'},{name:'Lepu Medical',website:'https://www.lepumedical.com/'}], desc:'Shenzhen–Hong Kong corridor is the leading APAC hub for medical device manufacturing: diagnostics equipment, imaging, surgical tools, patient monitoring, and consumables.', customs:{hts_code:'9018.90.60',duty_rate:'0% (MFN surgical instruments)',compliance_note:'FDA 510(k) or PMA required for US market entry. CE marking for EU. NMPA registration in China. QSR 21 CFR Part 820.'}, esg:{carbon_footprint:'Low-Medium',ethical_rating:'B+',sustainability_note:'ISO 13485 quality systems standard. Medical waste disposal regulations strictly enforced.'}, logistics:{port_wait_days:2,freight_cost_estimate:'$2.8k/FEU'}, industry_kpi:{label:'Device Output',value:'Largest APAC hub'} },
    { id:'fb_med_2', lat:47.6, lng:9.5, hub:'LAKE CONSTANCE, GERMANY/SWITZERLAND', title:'European Pharma API & MedTech Cluster', companies:[{name:'Roche',website:'https://www.roche.com/'},{name:'B. Braun',website:'https://www.bbraun.com/'},{name:'Siemens Healthineers',website:'https://www.siemens-healthineers.com/'}], desc:'Basel–Lake Constance triangle hosts the world\'s highest concentration of pharmaceutical API producers and high-end MedTech. Roche and Novartis dominate APIs. B. Braun leads infusion and surgical systems.', customs:{hts_code:'2941.10.00',duty_rate:'0% (MFN antibiotics/APIs)',compliance_note:'EMA GMP certification required. US FDA import alert risk on non-compliant API manufacturers. ICH Q7 GMP for APIs.'}, esg:{carbon_footprint:'Medium',ethical_rating:'A',sustainability_note:'Roche net-zero operations commitment. Novartis environmental health and safety excellence program.'}, logistics:{port_wait_days:1,freight_cost_estimate:'$3.5k/FEU'}, industry_kpi:{label:'API Concentration',value:'Highest globally'} },
    { id:'fb_med_3', lat:17.4, lng:78.5, hub:'HYDERABAD, INDIA', title:'Global Generic Pharma API & Formulations Hub', companies:[{name:'Dr. Reddy\'s Laboratories',website:'https://www.drreddys.com/'},{name:'Aurobindo Pharma',website:'https://www.aurobindo.com/'},{name:'Divi\'s Laboratories',website:'https://www.divislaboratories.com/'}], desc:'Hyderabad is the pharmacy capital of India. India supplies 40% of generic drugs consumed in the US and 25% globally. API manufacturing cost advantage of 30–50% vs. Western producers.', customs:{hts_code:'2941.90.00',duty_rate:'0% (generics MFN)',compliance_note:'FDA import alerts active on select manufacturers (check FDA database). WHO GMP and US FDA 21 CFR cGMP compliance required.'}, esg:{carbon_footprint:'Medium',ethical_rating:'B+',sustainability_note:'Zero liquid discharge mandates at major facilities. EHS audits recommended.'}, logistics:{port_wait_days:4,freight_cost_estimate:'$3.1k/FEU'}, industry_kpi:{label:'US Generic Supply',value:'40% market share'} },
  ],
  machinery: [
    { id:'fb_mac_1', lat:48.1, lng:11.6, hub:'BAVARIA, GERMANY', title:'Precision Machinery & Industrial Equipment Hub', companies:[{name:'Siemens AG',website:'https://www.siemens.com/'},{name:'KSB Group',website:'https://www.ksb.com/'},{name:'Trumpf',website:'https://www.trumpf.com/'}], desc:'Bavaria and Baden-Württemberg are the global center for precision machinery: CNC machining centers, industrial pumps, compressors, valves, hydraulics, and laser cutting systems.', customs:{hts_code:'8413.70.20',duty_rate:'0% (industrial pumps, EU origin)',compliance_note:'CE machinery directive 2006/42/EC. ATEX certification for explosive atmospheres. Pressure Equipment Directive (PED) for pressure vessels.'}, esg:{carbon_footprint:'Medium',ethical_rating:'A',sustainability_note:'Germany\'s Energiewende drives energy-efficient machinery design. ISO 50001 energy management certifications common.'}, logistics:{port_wait_days:3,freight_cost_estimate:'$4.5k/FEU'}, industry_kpi:{label:'Asset Life',value:'10–15 years'} },
    { id:'fb_mac_2', lat:31.2, lng:121.5, hub:'YANGTZE DELTA, CHINA', title:'High-Volume Industrial Machinery & CNC Hub', companies:[{name:'SANY Group',website:'https://www.sanygroup.com/'},{name:'Zoomlion',website:'https://www.zoomlion.com/'}], desc:'Shanghai–Suzhou–Hangzhou triangle leads global output of CNC machine tools, injection molding machines, industrial robots, compressors, and pumps. 70% of world\'s machine tool production.', customs:{hts_code:'8457.10.00',duty_rate:'25% (Sec 301 CNC machining centers)',compliance_note:'Section 301 tariffs apply to most Chinese machinery. CE/UL certification may be absent — verify for US/EU market entry.'}, esg:{carbon_footprint:'High',ethical_rating:'B',sustainability_note:'Variable quality in ESG compliance. Factory audit and pre-shipment inspection strongly recommended.'}, logistics:{port_wait_days:6,freight_cost_estimate:'$3.8k/FEU'}, industry_kpi:{label:'Machine Tool Output',value:'70% of world production'} },
    { id:'fb_mac_3', lat:34.7, lng:135.5, hub:'OSAKA / NAGOYA, JAPAN', title:'Japan Precision Pumps, Valves & Automation Hub', companies:[{name:'Ebara Corporation',website:'https://www.ebara.co.jp/'},{name:'Fanuc',website:'https://www.fanuc.co.jp/'},{name:'Keyence',website:'https://www.keyence.com/'}], desc:'Osaka–Nagoya corridor specializes in ultra-precision industrial automation: servo motors, CNC controllers (Fanuc dominates globally), centrifugal and vacuum pumps (Ebara), and precision measurement (Keyence).', customs:{hts_code:'8413.60.00',duty_rate:'0% (centrifugal pumps, MFN)',compliance_note:'Japan-US Trade Agreement duty relief on most machinery. Export controls on high-precision CNC (Wassenaar Arrangement).'}, esg:{carbon_footprint:'Low-Medium',ethical_rating:'A+',sustainability_note:'Fanuc zero-waste factory operations. Ebara ISO 14001 certified.'}, logistics:{port_wait_days:2,freight_cost_estimate:'$3.6k/FEU'}, industry_kpi:{label:'CNC Market',value:'Fanuc: ~65% global share'} },
  ],
}

const FALLBACK_RISKS = {
  industrial: [
    { id:'fr_ind_1', title:'China Rare Earth Export Controls', type:'Risk', severity:'HIGH', desc:'China controls ~90% of global rare earth magnet (NdFeB) production. Export restrictions could halt production globally within weeks.', mitigation:'Dual-source from Japan (TDK, Shin-Etsu) and US domestic (Arnold Magnetics). Qualify magnet recycling programs.' },
    { id:'fr_ind_2', title:'Critical Mineral Price Volatility', type:'Risk', severity:'MEDIUM', desc:'NdFeB magnet prices have swung 200-400% within a single year based on Chinese export policy and EV demand surges.', mitigation:'Lock long-term fixed-price contracts. Build 3-month buffer inventory during price dips.' },
  ],
  automotive: [
    { id:'fr_auto_1', title:'Section 301 Tariff Exposure', type:'Risk', severity:'HIGH', desc:'US 25% Section 301 tariffs on Chinese-origin auto components remain active. USMCA re-negotiation creates Mexico sourcing uncertainty.', mitigation:'Prioritize USMCA-compliant sourcing. Conduct Tier-2 supplier audit for China-origin content.' },
    { id:'fr_auto_2', title:'Semiconductor Allocation Risk', type:'Risk', severity:'HIGH', desc:'Automotive-grade chip allocations remain tight through 2026. Production shutdowns possible with < 2 weeks notice.', mitigation:'Secure long-term supply agreements. Increase buffer stock to 12+ weeks for critical chips.' },
  ],
  electronics: [
    { id:'fr_tech_1', title:'Taiwan Strait Geopolitical Risk', type:'Risk', severity:'HIGH', desc:'Taiwan produces 90%+ of advanced logic chips. Military escalation would halt global chip supply for 12-24 months.', mitigation:'Qualify alternate foundries (Samsung, Intel Foundry). Increase safety stock. Begin fab diversification.' },
    { id:'fr_tech_2', title:'Export Control Proliferation', type:'Risk', severity:'HIGH', desc:'US BIS expanding controls on advanced semiconductors. China-bound shipments face increasing license requirements.', mitigation:'Conduct quarterly export control audits. Engage trade counsel for ECCN reviews.' },
  ],
  metals: [
    { id:'fr_met_1', title:'Section 232 Steel/Aluminum Tariffs', type:'Risk', severity:'HIGH', desc:'25% steel and 10% aluminum Section 232 tariffs remain on most non-FTA origins.', mitigation:'Maximize domestic US/Canada sourcing. Apply for Section 232 exclusions.' },
    { id:'fr_met_2', title:'Commodity Price Cycle Risk', type:'Risk', severity:'MEDIUM', desc:'Base metal prices can swing 30-60% annually driven by China demand and EV adoption rates.', mitigation:'Implement commodity price hedging. Use index-linked pricing with caps and floors in supply agreements.' },
  ],
  agriculture: [
    { id:'fr_ag_1', title:'Climate & Crop Yield Volatility', type:'Risk', severity:'HIGH', desc:'El Niño and climate change creating severe crop yield volatility. 2023-24 drought reduced global soy 8%.', mitigation:'Diversify sourcing across 3+ regions. Engage crop insurance and forward contracts.' },
    { id:'fr_ag_2', title:'SPS Compliance & Food Safety', type:'Risk', severity:'HIGH', desc:'Complex SPS requirements at borders. A single rejected shipment can cost $200k+ and damage supplier relationships.', mitigation:'Pre-certify all suppliers to FSMA/EU SPS standards. Conduct pre-shipment testing.' },
  ],
  textiles: [
    { id:'fr_tex_1', title:'UFLPA Forced Labor Risk', type:'Risk', severity:'HIGH', desc:'UFLPA creates rebuttable presumption of forced labor for all Xinjiang-origin goods. Cotton supply chains highly exposed.', mitigation:'Map fiber chain to raw material origin. Audit Tier-2/3 for Xinjiang exposure. Use SLCP audit standard.' },
    { id:'fr_tex_2', title:'Lead Time vs. Fashion Cycle Mismatch', type:'Risk', severity:'MEDIUM', desc:'Asia ocean freight adds 25-40 days. Fast fashion cycles require 4-8 week total lead time.', mitigation:'Near-shore to Turkey or Mexico for responsive lines. Reserve Asia for core basics with predictable demand.' },
  ],
  plastics: [
    { id:'fr_pla_1', title:'China Section 301 Tariff on Plastic Articles', type:'Risk', severity:'HIGH', desc:'Most finished plastic parts from China face 25% Section 301 tariffs. Applies to injection-molded parts, extrusions, and assembled plastic components under HTS Chapter 39.', mitigation:'Qualify tooling in Korea (0% KORUS), Germany (MFN ~0-5%), or US domestic compounders. Nearshore injection molding to Mexico under USMCA.' },
    { id:'fr_pla_2', title:'Crude Oil Price Correlation', type:'Risk', severity:'HIGH', desc:'Polymer feedstock prices are directly tied to crude oil. A 20% crude spike typically raises polymer costs 12-18% within 60-90 days, triggering supplier price escalation clauses.', mitigation:'Include feedstock index price adjustment clauses in LTAs. Source from US Gulf Coast suppliers with domestic natural gas feedstock, which is structurally cheaper than oil-based feedstock.' },
    { id:'fr_pla_3', title:'REACH / RoHS Restricted Substance Compliance', type:'Risk', severity:'HIGH', desc:'EU REACH regulations cover 240+ substances of very high concern (SVHCs) in polymer additives (PFAS, phthalates, BPA, halogenated flame retardants). Non-compliant products face customs seizure.', mitigation:'Require full material declaration (FMD) from all suppliers. Specify SVHC-free grade variants in purchase specs. Conduct annual chemical compliance audits.' },
    { id:'fr_pla_4', title:'Tooling & Mold Lead Time Risk', type:'Risk', severity:'MEDIUM', desc:'Injection mold fabrication takes 8-20 weeks and costs $15k-$250k+ per tool. A single mold failure or supplier exit can halt production with no quick recovery path.', mitigation:'Own your tooling — specify tooling ownership in POs. Maintain mold drawings and CAD files. Qualify a secondary molder with duplicate tooling for critical parts.' },
  ],
  chemicals: [
    { id:'fr_che_1', title:'REACH & Dangerous Goods Compliance', type:'Risk', severity:'HIGH', desc:'EU REACH requires registration of all chemical substances >1 tonne/year. Importers must comply with CLP labeling, ADR/IMDG dangerous goods rules, and maintain up-to-date Safety Data Sheets (SDS).', mitigation:'Require REACH pre-registration from EU-bound suppliers. Use a licensed dangerous goods freight forwarder. Conduct annual compliance audits against ECHA SVHC candidate list updates.' },
    { id:'fr_che_2', title:'Feedstock & Crude Oil Price Volatility', type:'Risk', severity:'HIGH', desc:'Specialty chemical input costs (petrochemical feedstocks, natural gas) can swing 20–40% annually. Adhesive and coating raw material costs closely track crude oil and benzene/toluene benchmarks.', mitigation:'Include feedstock price-adjustment clauses (oil index linkage) in supply agreements. Dual-source critical inputs. Maintain 60-90 day safety stock on high-turnover chemicals.' },
    { id:'fr_che_3', title:'Section 301 Tariffs on Chinese Chemicals', type:'Risk', severity:'MEDIUM', desc:'Many specialty chemicals, adhesives, and coatings from China face 7.5–25% Section 301 tariffs under List 1-4A, raising BoM costs significantly.', mitigation:'Audit import classification against active Section 301 lists. Source from European (BASF, Evonik) or US Gulf Coast alternatives. Explore duty drawback programs.' },
  ],
  packaging: [
    { id:'fr_pkg_1', title:'Section 301 & Anti-Dumping on Chinese Packaging', type:'Risk', severity:'HIGH', desc:'Corrugated boxes, paperboard, and plastic packaging from China face 25% Section 301 tariffs plus additional anti-dumping duties. Total landed cost impact can be 30–40%.', mitigation:'Qualify regional packaging suppliers (US, Mexico, ASEAN). Compare total landed cost including duties before committing to China-origin packaging.' },
    { id:'fr_pkg_2', title:'EU EPR & Recycled Content Regulations', type:'Risk', severity:'HIGH', desc:'EU Packaging and Packaging Waste Directive (PPWD) mandates minimum recycled content and Extended Producer Responsibility (EPR) registration in each EU member state. Non-compliance blocks market entry.', mitigation:'Audit all EU-bound packaging for PPWD compliance. Register with national EPR schemes. Switch to mono-material, recyclable formats.' },
    { id:'fr_pkg_3', title:'Pulp & Paper Price Volatility', type:'Risk', severity:'MEDIUM', desc:'Containerboard and pulp prices are highly cyclical, moving 25–50% between cycle peaks and troughs. Capacity tightness can reverse price declines quickly.', mitigation:'Use index-linked pricing in paper packaging LTAs with price caps. Build 45–60 day corrugated inventory during low-price periods. Optimize box dimensions to reduce material usage.' },
  ],
  medical: [
    { id:'fr_med_1', title:'FDA Import Alert & cGMP Compliance Risk', type:'Risk', severity:'HIGH', desc:'FDA maintains Import Alerts on dozens of Indian and Chinese API and device manufacturers for cGMP failures. A single import alert can halt all shipments from a facility.', mitigation:'Check FDA Import Alert database before qualifying any API or device supplier. Require recent FDA inspection outcomes. Conduct independent GMP audits. Maintain 6-month API safety stock.' },
    { id:'fr_med_2', title:'Regulatory Approval Lead Time Risk', type:'Risk', severity:'HIGH', desc:'Switching pharmaceutical API suppliers requires FDA Drug Master File (DMF) update and can take 18–36 months. Medical device supplier changes trigger re-validation, creating single-source dependency.', mitigation:'Qualify secondary API suppliers in parallel. Include regulatory change notification clauses in supply agreements. Maintain 12+ month supply agreements with lead-time guarantees.' },
    { id:'fr_med_3', title:'Cold Chain & Serialization Compliance', type:'Risk', severity:'MEDIUM', desc:'Biopharmaceuticals require validated cold chain logistics (2–8°C or -20°C). DSCSA (US) and FMD (EU) serialization mandates require end-to-end track-and-trace; non-compliance results in product destruction.', mitigation:'Use GDP-certified cold chain logistics providers only. Validate all cold chain lanes with temperature mapping. Implement serialization at point of manufacture.' },
  ],
  machinery: [
    { id:'fr_mac_1', title:'Section 301 Tariffs on Chinese Machinery', type:'Risk', severity:'HIGH', desc:'Most industrial machinery and CNC machine tools from China face 25% Section 301 tariffs (List 3/4A). On high-value capital equipment, this creates enormous landed cost increases and disrupts capex budgets.', mitigation:'Source precision machinery from Germany, Japan, or South Korea where duty rates are 0–5% under FTAs. File for Section 301 exclusions on specialized equipment with no viable non-China source.' },
    { id:'fr_mac_2', title:'Long Lead Times & Single-Source Risk', type:'Risk', severity:'HIGH', desc:'Precision pumps, valves, and CNC equipment from Germany and Japan carry 16–52 week lead times. Single-sourcing critical equipment means any supply disruption directly halts manufacturing.', mitigation:'Place capital equipment orders 12+ months in advance. Maintain on-site critical spare parts inventory. Negotiate spare parts stocking agreements with OEM at time of purchase.' },
    { id:'fr_mac_3', title:'Export Control & Dual-Use Restrictions', type:'Risk', severity:'MEDIUM', desc:'High-precision CNC machine tools and certain pumps/compressors are subject to Wassenaar Arrangement dual-use export controls. Transfer to embargoed countries can trigger severe US/EU penalties.', mitigation:'Conduct end-user screening against BIS Entity List and OFAC SDN list before purchase and at any resale. Obtain ECCNs for all capital equipment. Maintain records for 5+ years.' },
  ],
}

// ── Picks the most relevant hub within a category for the specific query,
//    mirroring lib/database.js's pickBestHub so the offline fallback never
//    contradicts the server path (e.g. "steel" shouldn't recommend a
//    lithium mine just because it's first in the metals array). ──
const FALLBACK_STOPWORDS = new Set(['and','the','for','with','core','hub','mega','global','belt','processing','world','largest','primary','source'])
function pickBestFallbackHub(hubs, query) {
  if (!hubs || hubs.length === 0) return null
  const q = (query || '').toLowerCase()
  let best = hubs[0], bestScore = 0
  for (const h of hubs) {
    const words = `${h.title || ''} ${h.desc || ''}`.toLowerCase().split(/[^a-z0-9]+/)
      .filter(w => w.length > 3 && !FALLBACK_STOPWORDS.has(w))
    const score = words.reduce((s, w) => s + (q.includes(w) ? 1 : 0), 0)
    if (score > bestScore) { bestScore = score; best = h }
  }
  return best
}

// ── Severity color helper ──
const severityStyle = (s) => {
  if (!s) return 'text-slate-400 border-slate-500/20 bg-slate-500/5'
  if (s === 'HIGH') return 'text-rose-400 border-rose-500/20 bg-rose-500/5'
  if (s === 'MEDIUM') return 'text-amber-400 border-amber-500/20 bg-amber-500/5'
  return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5'
}

export default function Dashboard() {
  const [profile, setProfile] = useState({
    industry: 'Universal Intelligence Mode',
    material: 'Global Resources',
    priority: 'End-to-End Strategic Support'
  })

  const [risks, setRisks] = useState([])
  const [opportunities, setOpportunities] = useState([])
  const [news, setNews] = useState([])
  const [newsFilter, setNewsFilter] = useState('all')
  const [missionKeywords, setMissionKeywords] = useState([])
  const [selectedNode, setSelectedNode] = useState(null)
  const [autoRotate, setAutoRotate] = useState(true)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [, setTerminalLogs] = useState([
    "[SYSTEM] ATLAS Intelligence Core v3.0 — Online.",
    "[SYSTEM] Universal Resource Engine initialized.",
    "[SYSTEM] Supply chain database loaded: 6 categories, 32 global hubs."
  ])
  const [directive, setDirective] = useState(null)
  const [marketData, setMarketData] = useState(null)
  const [showRFQ, setShowRFQ] = useState(false)
  const [missionHistory, setMissionHistory] = useState([])
  const [fxData, setFxData] = useState(null)
  const [showTariff, setShowTariff] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [showIncoterms, setShowIncoterms] = useState(false)
  const [showRisk, setShowRisk] = useState(false)
  const [showPorts, setShowPorts] = useState(false)
  const [showCompliance, setShowCompliance] = useState(false)
  const [showTLC, setShowTLC] = useState(false)
  const [isExportingPDF, setIsExportingPDF] = useState(false)

  const addLog = (msg) => setTerminalLogs(prev => [...prev.slice(-50), msg])

  useEffect(() => {
    const loadLiveData = () => {
      fetch('/api/news').then(r => r.json()).then(d => setNews(d)).catch(() => {})
      fetch('/api/fx').then(r => r.json()).then(d => setFxData(d)).catch(() => {})
    }
    loadLiveData()
    // Refresh periodically so data actually moves while the terminal stays
    // open, instead of freezing at whatever was live on page load.
    const interval = setInterval(loadLiveData, 5 * 60 * 1000) // every 5 min
    try {
      const saved = localStorage.getItem('atlas_missions')
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setMissionHistory(JSON.parse(saved))
    } catch {}
    // Auto-run scan from URL ?q= param (enables shareable links)
    if (typeof window !== 'undefined') {
      const q = new URLSearchParams(window.location.search).get('q')
      if (q) {
        setSearchQuery(q)
        setTimeout(() => handleSearch(null, q), 600)
      }
    }
    return () => clearInterval(interval)
  }, [])

  const buildMissionKeywords = (query, category) => {
    const categoryKeywords = {
      industrial:  ['magnet','rare earth','neodymium','critical mineral','mining','sintered','ferrite','ndfeb'],
      automotive:  ['automotive','vehicle','ev ','electric vehicle','car ','tariff','usmca','tier-1','auto'],
      electronics: ['semiconductor','chip','tsmc','taiwan','wafer','foundry','pcb','display'],
      metals:      ['steel','aluminum','copper','lithium','cobalt','commodity','mining','metal'],
      agriculture: ['food','agricultural','soybean','beef','grain','crop','farming','commodity'],
      textiles:    ['textile','apparel','cotton','fashion','garment','fiber','yarn'],
      plastics:    ['plastic','polymer','elastomer','rubber','resin','injection','molding','moulding','tpe','abs','polypropylene','polyethylene','nylon','composite','epoxy','carbon fiber','fiberglass'],
      chemicals:   ['chemical','adhesive','coating','lubricant','solvent','surfactant','specialty chemical','reach','epoxy','paint','primer','grease'],
      packaging:   ['packaging','corrugated','label','carton','bottle','container','flexible pouch','shrink','paperboard','glass bottle'],
      medical:     ['pharmaceutical','medical','drug','api','device','surgical','clinical','fda','gmp','sterile','generic','biosimilar'],
      machinery:   ['pump','valve','compressor','cnc','machine tool','automation','robot','conveyor','gearbox','heat exchanger','capital equipment'],
    }
    const base = categoryKeywords[category] || []
    // also extract significant words from the raw query (4+ chars, not stopwords)
    const stopwords = new Set(['with','from','for','that','this','into','and','the','are','its','they','have','will','been','used','using'])
    const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length >= 4 && !stopwords.has(w))
    setMissionKeywords([...new Set([...base, ...queryWords])])
  }

  const saveMission = (query, opps, dir) => {
    const mission = {
      query,
      timestamp: Date.now(),
      primaryHub: opps[0]?.hub || null,
      hubCount: opps.length,
      topPartner: opps[0]?.companies?.[0]?.name || null,
      directive: dir
    }
    setMissionHistory(prev => {
      const updated = [...prev, mission].slice(-20)
      try { localStorage.setItem('atlas_missions', JSON.stringify(updated)) } catch {}
      return updated
    })
  }

  const replayMission = (mission) => {
    setSearchQuery(mission.query)
    handleSearch(null, mission.query)
  }

  const clearHistory = () => {
    setMissionHistory([])
    try { localStorage.removeItem('atlas_missions') } catch {}
  }

  const filteredNews = (() => {
    if (newsFilter === 'mission' && missionKeywords.length) {
      // Sort: mission-relevant first, then all others — never hide content
      const relevant = []
      const rest = []
      for (const item of news) {
        const text = `${item.title} ${item.description}`.toLowerCase()
        if (missionKeywords.some(kw => text.includes(kw))) relevant.push({ ...item, _mission: true })
        else rest.push(item)
      }
      return [...relevant, ...rest]
    }
    return news.filter(item => {
      const text = `${item.title} ${item.description}`.toLowerCase()
      if (newsFilter === 'all') return true
      const filters = {
        china:  ['china','chinese','beijing','shanghai'],
        eu:     ['europe','european','eu ','german','french','rotterdam'],
        usa:    ['usa','united states','american','washington','port of'],
        latam:  ['brazil','mexico','latin','colombia','chile','argentina'],
        india:  ['india','indian','delhi','mumbai','chennai']
      }
      return (filters[newsFilter] || []).some(kw => text.includes(kw))
    })
  })()

  const handleSearch = async (e, overrideQuery) => {
    if (e) e.preventDefault()
    const activeQuery = overrideQuery ?? searchQuery
    if (!activeQuery.trim()) return

    setIsAnalyzing(true)
    setSelectedNode(null)
    setSearchQuery(activeQuery)
    addLog(`[SCAN] Initiating: "${activeQuery}"`)
    addLog('[AI] Mapping global industrial hubs...')
    // Push query to URL so scan is shareable
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.set('q', activeQuery)
      window.history.replaceState({}, '', url.toString())
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 45000)

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ material: activeQuery }),
        signal: controller.signal
      })
      clearTimeout(timeoutId)

      if (!res.ok) throw new Error(`API error ${res.status}`)
      const data = await res.json()

      if (data.opportunities?.length > 0) {
        setRisks(data.risks || [])
        setOpportunities(data.opportunities)
        setDirective(data.directive || null)
        setMarketData(data.market_data || null)
        addLog(`[SUCCESS] Scan complete. ${data.opportunities.length} hubs identified.`)
        if (data.category) addLog(`[INFO] Category: ${data.category.toUpperCase()}`)
        saveMission(activeQuery, data.opportunities, data.directive)
        setShowSearch(false)
        setProfile(prev => ({ ...prev, material: activeQuery }))
        buildMissionKeywords(activeQuery, data.category)
        setNewsFilter('mission')
        return
      }
      throw new Error('No opportunities returned')

    } catch (err) {
      clearTimeout(timeoutId)
      addLog('[WARN] Server scan delayed. Activating local intelligence mode...')

      // Client-side fallback — same categorization logic as server
      const cat = clientCategorize(activeQuery)
      const baseHubs = FALLBACK_HUBS[cat] || FALLBACK_HUBS.electronics
      const fallbackRisks = FALLBACK_RISKS[cat] || FALLBACK_RISKS.electronics
      const selectedHub = pickBestFallbackHub(baseHubs, activeQuery)
      const hubs = [selectedHub, ...baseHubs.filter(h => h.id !== selectedHub.id)]

      const fbDir = {
        best_region:  selectedHub.hub,
        best_partner: selectedHub.companies[0]?.name || 'Strategic Partner',
        route:        selectedHub.logistics.port_wait_days === 0
                        ? 'Domestic Ground Transport'
                        : 'Global Logistics Corridor',
        summary:      `Local intelligence mode: ${hubs.length} strategic hubs identified for "${activeQuery}". Primary recommendation: ${selectedHub.hub}.`,
        tariff_alert: `HTS: ${selectedHub.customs.hts_code} | Duty: ${selectedHub.customs.duty_rate} — ${selectedHub.customs.compliance_note}`
      }

      setOpportunities(hubs)
      setRisks(fallbackRisks)
      setDirective(fbDir)
      setMarketData({
        currency: { pair: 'USD/INDEX', rate: 104.2, impact: 'Stable' },
        price_history: [{ month:'Q1',price:95 },{ month:'Q2',price:88 },{ month:'Q3',price:97 },{ month:'Q4',price:105 }],
        rfq_template: `Dear Procurement Team,\n\nWe are initiating a sourcing inquiry for: ${activeQuery}.\n\nPlease provide unit pricing, lead time, freight terms, and ESG certification status.\n\nEstimated Annual Volume: [Insert]\nIncoterm Preference: [DDP / FOB / CIF]\n\nBest regards,\n[Your Name] — Procurement`
      })
      saveMission(activeQuery, hubs, fbDir)
      setShowSearch(false)
      setProfile(prev => ({ ...prev, material: activeQuery }))
      buildMissionKeywords(activeQuery, cat)
      setNewsFilter('mission')
      addLog(`[LOCAL] ${hubs.length} hubs loaded via local intelligence.`)

    } finally {
      setIsAnalyzing(false)
    }
  }

  const exportToPDF = async () => {
    if (!opportunities.length) return
    setIsExportingPDF(true)
    addLog('[SYSTEM] Generating Executive Mission Brief (PDF)...')
    try {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF('p', 'mm', 'a4')

      const BG = [10, 10, 10]
      const newPage = () => {
        doc.addPage()
        doc.setFillColor(...BG)
        doc.rect(0, 0, 210, 297, 'F')
        yPos = 20
      }
      const ensureSpace = (needed) => { if (yPos + needed > 278) newPage() }
      const sectionHeader = (label, rgb) => {
        ensureSpace(16)
        yPos += 4
        doc.setFillColor(...rgb)
        doc.rect(20, yPos - 4, 3, 10, 'F')
        doc.setTextColor(...rgb)
        doc.setFontSize(11)
        doc.text(label, 26, yPos + 3)
        yPos += 12
      }
      const row = (label, value, labelColor = [150,150,150], valueColor = [220,220,220]) => {
        ensureSpace(7)
        doc.setFontSize(8.5)
        doc.setTextColor(...labelColor)
        doc.text(label, 26, yPos)
        doc.setTextColor(...valueColor)
        const wrapped = doc.splitTextToSize(String(value), 120)
        doc.text(wrapped, 90, yPos)
        yPos += wrapped.length * 5 + 1
      }

      // ── PAGE 1: COVER ──────────────────────────────────────────────────────
      doc.setFillColor(...BG)
      doc.rect(0, 0, 210, 297, 'F')
      // accent bar
      doc.setFillColor(56, 189, 248)
      doc.rect(0, 0, 6, 297, 'F')

      doc.setTextColor(56, 189, 248)
      doc.setFontSize(28)
      doc.text('ATLAS', 20, 40)
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(13)
      doc.text('SUPPLY CHAIN INTELLIGENCE', 20, 50)

      doc.setFillColor(30, 30, 30)
      doc.rect(18, 58, 174, 0.5, 'F')

      doc.setTextColor(200, 200, 200)
      doc.setFontSize(18)
      doc.text('EXECUTIVE MISSION BRIEF', 20, 72)

      doc.setTextColor(150, 150, 150)
      doc.setFontSize(9)
      doc.text(`Mission Query:`, 20, 85)
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(10)
      const missionWrapped = doc.splitTextToSize(searchQuery || profile.material, 170)
      doc.text(missionWrapped, 20, 93)

      doc.setTextColor(150, 150, 150)
      doc.setFontSize(8.5)
      doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 105)
      doc.text(`Sourcing Hubs Identified: ${opportunities.length}`, 20, 112)
      doc.text(`Risk Factors Detected: ${risks.length}`, 20, 119)

      // Summary table on cover
      if (directive) {
        doc.setFillColor(20, 30, 20)
        doc.roundedRect(18, 130, 174, 50, 3, 3, 'F')
        doc.setTextColor(16, 185, 129)
        doc.setFontSize(9)
        doc.text('STRATEGIC RECOMMENDATION', 26, 142)
        doc.setFillColor(16, 185, 129)
        doc.rect(18, 145, 174, 0.4, 'F')
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(10)
        doc.text(directive.best_region || '—', 26, 155)
        doc.setTextColor(150, 150, 150)
        doc.setFontSize(8.5)
        doc.text(`Primary Partner: ${directive.best_partner || '—'}`, 26, 163)
        const alertWrapped = doc.splitTextToSize(directive.tariff_alert || '—', 160)
        doc.text(alertWrapped, 26, 170)
      }

      doc.setTextColor(60, 60, 60)
      doc.setFontSize(7)
      doc.text('CONFIDENTIAL — For internal procurement use only. Atlas Terminal data is for strategic reference; verify with primary sources before contracting.', 20, 285, { maxWidth: 170 })

      let yPos = 20

      // ── PAGE 2+: STRATEGIC DIRECTIVE ──────────────────────────────────────
      newPage()
      doc.setFillColor(56, 189, 248)
      doc.rect(0, 0, 6, 297, 'F')

      sectionHeader('STRATEGIC DIRECTIVE', [16, 185, 129])
      if (directive) {
        doc.setTextColor(200, 200, 200)
        doc.setFontSize(9)
        const sumWrapped = doc.splitTextToSize(directive.summary || '', 170)
        ensureSpace(sumWrapped.length * 5 + 5)
        doc.text(sumWrapped, 26, yPos)
        yPos += sumWrapped.length * 5 + 8
        row('Recommended Hub', directive.best_region || '—', [150,150,150], [255,255,255])
        row('Primary Partner', directive.best_partner || '—', [150,150,150], [255,255,255])
        row('Tariff / Compliance', directive.tariff_alert || '—', [150,150,150], [239,200,100])
      }

      // ── SOURCING HUB DETAIL ────────────────────────────────────────────────
      sectionHeader(`SOURCING HUB ANALYSIS  (${opportunities.length} identified)`, [56, 189, 248])

      opportunities.forEach((opp, i) => {
        ensureSpace(60)
        // Hub title bar
        doc.setFillColor(20, 25, 35)
        doc.roundedRect(18, yPos - 2, 174, 10, 2, 2, 'F')
        doc.setTextColor(56, 189, 248)
        doc.setFontSize(9.5)
        doc.text(`${i + 1}.  ${opp.hub}`, 22, yPos + 5)
        yPos += 13

        // Companies
        const companyList = (opp.companies || []).map(c => c.name).join('  ·  ')
        row('Target Partners', companyList || '—', [150,150,150], [200,200,200])

        // KPI
        if (opp.industry_kpi) row(opp.industry_kpi.label, opp.industry_kpi.value, [150,150,150], [16,185,129])

        // Customs
        if (opp.customs) {
          row('HTS Code', opp.customs.hts_code || '—')
          row('Duty Rate', opp.customs.duty_rate || '—', [150,150,150], [239,200,100])
          const complianceWrapped = doc.splitTextToSize(opp.customs.compliance_note || '—', 120)
          ensureSpace(complianceWrapped.length * 5 + 3)
          doc.setFontSize(8.5)
          doc.setTextColor(150, 150, 150)
          doc.text('Compliance', 26, yPos)
          doc.setTextColor(200, 200, 200)
          doc.text(complianceWrapped, 90, yPos)
          yPos += complianceWrapped.length * 5 + 2
        }

        // Logistics
        if (opp.logistics) {
          row('Port Lead Time', `${opp.logistics.port_wait_days} day${opp.logistics.port_wait_days !== 1 ? 's' : ''} wait`)
          row('Est. Freight', opp.logistics.freight_cost_estimate || '—')
        }

        // ESG
        if (opp.esg) {
          row('ESG Rating', `${opp.esg.ethical_rating}  |  Carbon: ${opp.esg.carbon_footprint}`, [150,150,150], [100,220,150])
          const esgWrapped = doc.splitTextToSize(opp.esg.sustainability_note || '', 120)
          ensureSpace(esgWrapped.length * 5 + 3)
          doc.setFontSize(8.5)
          doc.setTextColor(150, 150, 150)
          doc.text('ESG Note', 26, yPos)
          doc.setTextColor(180, 180, 180)
          doc.text(esgWrapped, 90, yPos)
          yPos += esgWrapped.length * 5 + 2
        }

        yPos += 6
        doc.setFillColor(30, 30, 30)
        doc.rect(26, yPos, 166, 0.3, 'F')
        yPos += 6
      })

      // ── RISK ANALYSIS ──────────────────────────────────────────────────────
      if (risks.length > 0) {
        sectionHeader(`RISK ANALYSIS  (${risks.length} active)`, [239, 68, 68])
        risks.forEach((r, i) => {
          ensureSpace(28)
          const sevColor = r.severity === 'HIGH' ? [239,68,68] : r.severity === 'MEDIUM' ? [251,191,36] : [100,200,100]
          doc.setFillColor(...sevColor)
          doc.roundedRect(18, yPos - 1, 174, 8, 1, 1, 'F')
          doc.setTextColor(10, 10, 10)
          doc.setFontSize(8.5)
          doc.text(`${r.severity}  —  ${r.title}`, 22, yPos + 4)
          yPos += 11
          doc.setTextColor(200, 200, 200)
          doc.setFontSize(8.5)
          const mitWrapped = doc.splitTextToSize(`Mitigation: ${r.mitigation || '—'}`, 166)
          ensureSpace(mitWrapped.length * 5 + 4)
          doc.text(mitWrapped, 26, yPos)
          yPos += mitWrapped.length * 5 + 7
        })
      }

      // ── FX SNAPSHOT ────────────────────────────────────────────────────────
      if (fxData?.rates) {
        sectionHeader('LIVE FX RATES SNAPSHOT', [168, 85, 247])
        doc.setFontSize(8.5)
        const pairs = Object.entries(fxData.rates).slice(0, 8)
        pairs.forEach(([code, info]) => {
          ensureSpace(7)
          doc.setTextColor(168, 85, 247)
          doc.text(code, 26, yPos)
          doc.setTextColor(220, 220, 220)
          doc.text(String(info.rate ?? info), 60, yPos)
          if (info.label) {
            doc.setTextColor(130, 130, 130)
            doc.text(info.label, 90, yPos)
          }
          yPos += 6
        })
        doc.setTextColor(100, 100, 100)
        doc.setFontSize(7.5)
        doc.text(`As of: ${fxData.date || new Date().toLocaleDateString()}`, 26, yPos + 2)
        yPos += 8
      }

      // ── FOOTER on last page ────────────────────────────────────────────────
      ensureSpace(12)
      yPos = 282
      doc.setFillColor(30, 30, 30)
      doc.rect(18, yPos - 3, 174, 0.4, 'F')
      doc.setTextColor(60, 60, 60)
      doc.setFontSize(7)
      doc.text('ATLAS SUPPLY CHAIN INTELLIGENCE  ·  atlas-terminal-tau.vercel.app  ·  For strategic reference only — verify before contracting.', 20, yPos + 3, { maxWidth: 170 })

      doc.save(`ATLAS_Brief_${(searchQuery || 'Mission').replace(/\s+/g, '_')}.pdf`)
      addLog('[SUCCESS] Executive Brief generated and downloaded.')
    } catch (error) {
      console.error('PDF generation failed:', error)
      addLog('[ERROR] PDF generation failed.')
    } finally {
      setIsExportingPDF(false)
    }
  }

  // ── Node display helpers ──
  const isRisk = selectedNode?.type === 'Risk'
  const isOpportunity = selectedNode && !isRisk

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-[#000000] text-[#f8fafc] antialiased font-mono">

      {/* ── COMMODITY TICKER ── */}
      <div className="h-8 bg-[#050505] border-b border-white/5 flex items-center px-4 overflow-hidden shrink-0">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mr-8 shrink-0">
          <Activity size={12} className="text-slate-500" />
          <span className="text-slate-500" title="Indicative reference prices for context — not a live market data feed. For decision-grade pricing, verify with your commodity broker or exchange terminal.">Reference Prices</span>
        </div>
        <style dangerouslySetInnerHTML={{__html:`
          @keyframes ticker { 0%{transform:translate3d(0,0,0)} 100%{transform:translate3d(-50%,0,0)} }
          .animate-ticker { display:flex; animation:ticker 35s linear infinite; }
          .animate-ticker:hover { animation-play-state:paused; }
        `}} />
        <div className="overflow-hidden flex-1">
          <div className="animate-ticker gap-10 whitespace-nowrap">
            {[
              { n:'Brent Crude', p:'$89.24/bbl', c:'+1.2%', up:true },
              { n:'Copper',      p:'$4.12/lb',   c:'+2.4%', up:true },
              { n:'HRC Steel',   p:'$840/st',    c:'-0.8%', up:false },
              { n:'Aluminum',    p:'$2,350/mt',  c:'+0.5%', up:true },
              { n:'Lithium Carb',p:'$14.2k/mt',  c:'-3.1%', up:false },
              { n:'NdFeB Magnet',p:'$78/kg',     c:'+4.2%', up:true },
              { n:'Cotton',      p:'$85.40/lb',  c:'+0.2%', up:true },
              { n:'Soybeans',    p:'$11.80/bu',  c:'-1.5%', up:false },
              { n:'Rare Earth',  p:'$142/kg',    c:'+6.8%', up:true },
              { n:'Nickel',      p:'$18.4k/mt',  c:'-0.9%', up:false },
              // duplicate for seamless loop
              { n:'Brent Crude', p:'$89.24/bbl', c:'+1.2%', up:true },
              { n:'Copper',      p:'$4.12/lb',   c:'+2.4%', up:true },
              { n:'HRC Steel',   p:'$840/st',    c:'-0.8%', up:false },
              { n:'Aluminum',    p:'$2,350/mt',  c:'+0.5%', up:true },
              { n:'Lithium Carb',p:'$14.2k/mt',  c:'-3.1%', up:false },
              { n:'NdFeB Magnet',p:'$78/kg',     c:'+4.2%', up:true },
              { n:'Cotton',      p:'$85.40/lb',  c:'+0.2%', up:true },
              { n:'Soybeans',    p:'$11.80/bu',  c:'-1.5%', up:false },
              { n:'Rare Earth',  p:'$142/kg',    c:'+6.8%', up:true },
              { n:'Nickel',      p:'$18.4k/mt',  c:'-0.9%', up:false },
            ].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2 text-[11px] mr-10">
                <span className="text-slate-500">{item.n}</span>
                <span className="text-white font-bold">{item.p}</span>
                <span className={item.up ? 'text-emerald-400' : 'text-rose-400'}>{item.c}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── MOBILE HEADER BAR (hidden on desktop) ── */}
      <div className="lg:hidden flex items-center justify-between px-3 py-2 bg-[#0a0a0a] border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-sky-500/10 border border-sky-500/20 flex items-center justify-center rounded-md">
            <AtlasLogo size={16} />
          </div>
          <span className="text-[11px] font-bold tracking-widest text-white">ATLAS</span>
        </div>
        <div className="flex-1 mx-3 text-[10px] text-sky-400 truncate text-center">
          {opportunities.length > 0 ? `${opportunities.length} hubs · ${profile.material}` : 'Supply Chain Intelligence'}
        </div>
        <button onClick={() => setShowSearch(true)}
          className="text-[10px] font-bold bg-emerald-500 text-black px-3 py-1.5 rounded-lg shrink-0">
          SCAN
        </button>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="flex flex-1 overflow-hidden p-2 lg:p-4 gap-3 lg:gap-4 flex-col lg:flex-row">

        {/* ── MODALS ── */}
        <AnimatePresence>
          {showTariff    && <TariffLookup onClose={() => setShowTariff(false)} />}
          {showHistory   && <MissionHistory missions={missionHistory} onClose={() => setShowHistory(false)} onReplay={replayMission} onClear={clearHistory} />}
          {showComparison && opportunities.length > 0 && <SupplierComparison hubs={opportunities} onClose={() => setShowComparison(false)} />}
          {showIncoterms && <IncotermsCalc onClose={() => setShowIncoterms(false)} />}
          {showRisk      && <TradeRiskScore onClose={() => setShowRisk(false)} />}
          {showPorts     && <PortStatus onClose={() => setShowPorts(false)} />}
          {showCompliance && <ComplianceChecklist onClose={() => setShowCompliance(false)} />}
          {showTLC       && <TLCCalculator onClose={() => setShowTLC(false)} defaultDuty={parseFloat(opportunities[0]?.customs?.duty_rate) || 0} />}
        </AnimatePresence>

        {/* ── RFQ MODAL ── */}
        <AnimatePresence>
          {showRFQ && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
              <motion.div initial={{y:20}} animate={{y:0}}
                className="bg-[#0a0a0a] border border-emerald-500/30 p-10 w-full max-w-3xl rounded-2xl shadow-[0_0_100px_rgba(16,185,129,0.15)]">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-[12px] font-bold text-emerald-400 tracking-[0.3em] uppercase flex items-center gap-3">
                    <Mail size={18} /> Smart RFQ Generator
                  </h2>
                  <button onClick={() => setShowRFQ(false)} className="text-slate-500 hover:text-white"><X size={24} /></button>
                </div>
                <textarea readOnly rows={13} value={marketData?.rfq_template}
                  className="w-full bg-[#111] border border-white/10 p-6 text-[13px] font-mono focus:outline-none rounded-xl mb-8 leading-relaxed text-slate-300" />
                <div className="flex gap-4">
                  <button
                    onClick={() => { navigator.clipboard.writeText(marketData?.rfq_template || ''); addLog('[SYSTEM] RFQ copied to clipboard.') }}
                    className="flex-1 h-14 bg-emerald-500 text-black font-bold uppercase text-[12px] tracking-widest hover:bg-emerald-400 transition-all rounded-lg">
                    Copy to Clipboard
                  </button>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(`RFQ: ${searchQuery || profile.material}`)}&body=${encodeURIComponent(marketData?.rfq_template || '')}`}
                    onClick={() => addLog('[SYSTEM] Opening email client with RFQ draft.')}
                    className="flex-1 h-14 border border-white/10 text-white font-bold uppercase text-[12px] tracking-widest hover:bg-white/5 transition-all rounded-lg flex items-center justify-center">
                    Email to Procurement
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SEARCH / MISSION MODAL ── */}
        <AnimatePresence>
          {showSearch && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <motion.div initial={{scale:0.95}} animate={{scale:1}}
                className="bg-[#0a0a0a] border border-white/10 p-10 w-full max-w-2xl shadow-[0_0_80px_rgba(56,189,248,0.15)] relative rounded-2xl">
                <button onClick={() => setShowSearch(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white">
                  <X size={24} />
                </button>
                <h2 className="text-[12px] font-bold text-sky-400 tracking-[0.3em] mb-3 flex items-center gap-3">
                  <Target size={18} /> DEFINE SOURCING MISSION
                </h2>
                <p className="text-[11px] text-slate-600 mb-8 font-sans leading-relaxed">
                  Describe what you need to procure — be specific. Include the material, application, and any constraints.
                  <br/>e.g. <span className="text-slate-500 italic">&ldquo;neodymium magnets for automotive sun visor actuators&rdquo;</span>,
                  &nbsp;<span className="text-slate-500 italic">&ldquo;food-grade soy for QSR chain supply&rdquo;</span>,
                  &nbsp;<span className="text-slate-500 italic">&ldquo;IATF-certified steel stamping for EV chassis frames&rdquo;</span>
                </p>
                <form onSubmit={handleSearch} className="space-y-6">
                  <textarea
                    autoFocus rows={4} value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Describe your sourcing requirement..."
                    className="w-full bg-[#111] border border-white/10 p-6 text-[15px] font-mono focus:outline-none focus:border-sky-500 transition-all placeholder:text-slate-700 resize-none leading-relaxed rounded-xl"
                  />
                  <button type="submit" disabled={isAnalyzing || !searchQuery.trim()}
                    className="w-full h-16 bg-emerald-500 text-black font-bold flex items-center justify-center gap-3 hover:bg-emerald-400 transition-all disabled:opacity-50 text-[14px] uppercase tracking-widest rounded-xl">
                    {isAnalyzing ? 'SCANNING GLOBAL DATABASE...' : 'EXECUTE INTELLIGENCE SCAN'}
                    <ChevronRight size={22} />
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ════════════════════════════════════
            LEFT SIDEBAR
        ════════════════════════════════════ */}
        <aside className="hidden lg:flex w-80 flex-col gap-4 shrink-0 z-10">

          {/* Brand + Mission */}
          <div className="bg-[#0a0a0a] border border-white/10 p-5 rounded-xl shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 rounded-lg">
                <AtlasLogo size={22} />
              </div>
              <div>
                <h1 className="font-bold text-xl tracking-widest leading-none text-white">ATLAS</h1>
                <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em]">Supply Chain Intelligence</p>
              </div>
            </div>
            <div onClick={() => setShowSearch(true)}
              className="p-3 bg-[#111] border border-white/5 cursor-pointer hover:border-sky-500/30 transition-all rounded-lg group">
              <div className="text-[9px] text-slate-600 uppercase mb-1 font-bold tracking-widest group-hover:text-sky-400 transition-all">
                Active Mission
              </div>
              <div className="text-[12px] font-bold text-sky-400 uppercase truncate">{profile.material}</div>
            </div>
          </div>

          {/* Port Throughput */}
          <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[10px] font-bold text-sky-400 tracking-[0.2em] uppercase flex items-center gap-2">
                <Anchor size={14} /> Logistics Throughput
              </h2>
              <button onClick={() => setShowPorts(true)} className="text-[8px] text-slate-600 hover:text-sky-400 font-bold uppercase transition-colors">
                View all →
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label:'Port of LA',    status:'Stable',   wait:'2d' },
                { label:'Tuas Singapore',status:'Stable',   wait:'1d' },
                { label:'Port of Rotterdam',status:'Watch', wait:'3d' },
                { label:'Port Klang',    status:'Stable',   wait:'2d' },
              ].map((p, i) => (
                <button key={i} onClick={() => setShowPorts(true)}
                  className="bg-[#111] p-2.5 border border-white/5 rounded-lg text-left hover:border-sky-500/30 hover:bg-[#151515] transition-all cursor-pointer"
                  title={`View full congestion detail for ${p.label}`}>
                  <div className="text-[8px] text-slate-500 uppercase font-bold mb-1 truncate">{p.label}</div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[12px] font-bold ${p.status === 'Stable' ? 'text-emerald-400' : 'text-amber-400'}`}>{p.status}</span>
                    <span className="text-[9px] text-slate-600">{p.wait}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Risk Panels */}
          <div className="flex-1 overflow-hidden flex flex-col gap-3 min-h-0">

            {/* Global Threats */}
            <div className="flex-1 bg-[#0a0a0a] border border-white/10 p-4 flex flex-col overflow-hidden rounded-xl min-h-0">
              <h2 className="text-[10px] font-bold text-rose-500 tracking-[0.2em] uppercase mb-3 flex items-center gap-2 shrink-0">
                <ShieldAlert size={14} /> Global Threats
                {risks.length > 0 && <span className="ml-auto text-[9px] text-slate-600">{risks.length} active</span>}
              </h2>
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {risks.length === 0 ? (
                  <p className="text-[10px] text-slate-700 italic">Run a sourcing scan to surface relevant risk factors.</p>
                ) : risks.map((r, i) => (
                  <div key={r.id || i}
                    onClick={() => setSelectedNode(selectedNode?.id === (r.id || i) ? null : r)}
                    className={`p-3 border transition-all cursor-pointer rounded-lg ${
                      selectedNode?.id === (r.id || i)
                        ? 'bg-rose-500/10 border-rose-500/40'
                        : 'bg-[#111] border-white/5 hover:border-rose-500/20'
                    }`}>
                    <div className="flex items-start gap-2">
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border shrink-0 mt-0.5 ${severityStyle(r.severity)}`}>
                        {r.severity || 'RISK'}
                      </span>
                      <div className="text-[11px] font-bold uppercase leading-snug">{r.title || r.risk}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sourcing Hubs */}
            <div className="flex-1 bg-[#0a0a0a] border border-white/10 p-4 flex flex-col overflow-hidden rounded-xl min-h-0">
              <h2 className="text-[10px] font-bold text-emerald-500 tracking-[0.2em] uppercase mb-3 flex items-center gap-2 shrink-0">
                <Factory size={14} /> Sourcing Hubs
                {opportunities.length > 0 && <span className="ml-auto text-[9px] text-slate-600">{opportunities.length} identified</span>}
              </h2>
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {opportunities.length === 0 ? (
                  <div className="space-y-1.5 pt-1">
                    <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-2">Try an example:</p>
                    {[
                      'IATF-certified brake pads for passenger vehicles',
                      'Neodymium magnets for EV motor assembly',
                      'Food-grade soy for QSR supply chain',
                      'Semiconductor wafers for automotive ECU',
                    ].map((q) => (
                      <button key={q} onClick={() => handleSearch(null, q)}
                        className="w-full text-left text-[10px] text-slate-500 hover:text-emerald-400 border border-white/5 hover:border-emerald-500/30 bg-[#111] hover:bg-emerald-500/5 p-2.5 rounded-lg transition-all">
                        → {q}
                      </button>
                    ))}
                  </div>
                ) : opportunities.map((o, i) => (
                  <div key={o.id || i}
                    onClick={() => setSelectedNode(selectedNode?.id === o.id ? null : o)}
                    className={`p-3 border transition-all cursor-pointer rounded-lg ${
                      selectedNode?.id === o.id
                        ? 'bg-emerald-500/10 border-emerald-500/40'
                        : 'bg-[#111] border-white/5 hover:border-emerald-500/20'
                    }`}>
                    <div className="text-[9px] text-emerald-400 font-bold mb-1 uppercase tracking-widest">{o.hub}</div>
                    <div className="text-[11px] font-bold uppercase leading-tight">{o.title}</div>
                    {o.real_export_value_usd && (
                      <div className="mt-1.5 flex items-center gap-1 text-[9px] text-sky-400 font-mono" title={`Official UN Comtrade export statistics, ${o.real_trade_data_year}`}>
                        <CheckCircle size={9} />
                        ${(o.real_export_value_usd / 1e6).toFixed(0)}M exported ({o.real_trade_data_year}, UN Comtrade)
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* ════════════════════════════════════
            CENTER — GLOBE + HUD
        ════════════════════════════════════ */}
        <main className="flex-1 flex flex-col gap-4 overflow-hidden min-w-0">

          {/* Globe */}
          <div className="flex-1 bg-[#0a0a0a] border border-white/10 relative flex items-center justify-center overflow-hidden rounded-xl shadow-[inset_0_0_60px_rgba(0,0,0,1)] min-h-0">
            <div className="z-0 w-full h-full">
              <Globe risks={risks} opportunities={opportunities} autoRotate={autoRotate} />
            </div>

            {/* Globe controls */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              <div className="flex items-center gap-2 bg-black/60 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md">
                <Activity size={12} className="text-emerald-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Live_Global_Stream</span>
              </div>
              <button onClick={() => setAutoRotate(!autoRotate)}
                className="flex items-center gap-2 bg-black/60 border border-white/10 px-3 py-1.5 hover:bg-sky-500/20 rounded-lg backdrop-blur-md transition-all text-white/70">
                {autoRotate ? <Pause size={12} /> : <Play size={12} />}
                <span className="text-[10px] font-bold uppercase tracking-widest">{autoRotate ? 'Pause' : 'Resume'}</span>
              </button>
            </div>

            {/* ── STRATEGIC ADVISORY HUD ── */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between gap-3">

              <div className="bg-black/95 border border-white/10 p-6 flex-1 shadow-[0_0_80px_rgba(0,0,0,0.9)] rounded-2xl backdrop-blur-xl min-w-0 border-t-sky-500/10">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-[10px] font-bold text-sky-400 tracking-[0.3em] uppercase flex items-center gap-2">
                    <Zap size={14} /> Strategic Advisory HUD
                  </div>
                  <div className="flex items-center gap-2">
                    {isOpportunity && (
                      <button onClick={() => setShowRFQ(true)}
                        className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 text-emerald-400 text-[9px] font-bold uppercase hover:bg-emerald-500 hover:text-black transition-all rounded-lg">
                        <Mail size={11} /> Generate RFQ
                      </button>
                    )}
                    {selectedNode && (
                      <button onClick={() => setSelectedNode(null)} className="p-1.5 text-slate-500 hover:text-white transition-all">
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* ── RISK NODE DISPLAY ── */}
                {isRisk && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className={`text-[9px] font-bold px-2 py-1 rounded border shrink-0 mt-0.5 ${severityStyle(selectedNode.severity)}`}>
                        {selectedNode.severity} RISK
                      </span>
                      <div className="text-[14px] font-bold uppercase text-white leading-snug">{selectedNode.title}</div>
                    </div>
                    <p className="text-[12px] text-slate-400 leading-relaxed font-sans">{selectedNode.desc}</p>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
                        <div className="text-[9px] text-rose-400 uppercase font-bold mb-2 tracking-widest flex items-center gap-1.5">
                          <AlertTriangle size={10} /> Risk Exposure
                        </div>
                        <p className="text-[12px] text-slate-300 leading-relaxed">{selectedNode.desc}</p>
                      </div>
                      <div className="p-4 bg-sky-500/5 border border-sky-500/20 rounded-xl">
                        <div className="text-[9px] text-sky-400 uppercase font-bold mb-2 tracking-widest flex items-center gap-1.5">
                          <CheckCircle size={10} /> Mitigation Strategy
                        </div>
                        <p className="text-[12px] text-slate-200 leading-relaxed font-sans">{selectedNode.mitigation}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── OPPORTUNITY NODE DISPLAY ── */}
                {isOpportunity && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-[13px] font-bold uppercase mb-1 text-white tracking-wider">{selectedNode.title}</div>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-sans mb-3">{selectedNode.desc}</p>
                        {selectedNode.industry_kpi && (
                          <div className="bg-[#111] p-3 border-l-2 border-sky-500 rounded-r-lg">
                            <div className="text-[8px] text-slate-600 uppercase font-bold mb-0.5">{selectedNode.industry_kpi.label}</div>
                            <div className="text-[16px] font-bold text-white">{selectedNode.industry_kpi.value}</div>
                          </div>
                        )}
                        {selectedNode.real_export_value_usd && (
                          <div className="bg-sky-500/10 border border-sky-500/25 p-3 rounded-lg mt-2 flex items-center gap-2">
                            <CheckCircle size={14} className="text-sky-400 shrink-0" />
                            <div>
                              <div className="text-[8px] text-sky-400 uppercase font-bold tracking-widest">Real, official trade data</div>
                              <div className="text-[13px] font-bold text-white">
                                ${(selectedNode.real_export_value_usd / 1e6).toLocaleString(undefined, { maximumFractionDigits: 0 })}M exported in {selectedNode.real_trade_data_year}
                              </div>
                              <div className="text-[8px] text-slate-500">Source: UN Comtrade official statistics</div>
                            </div>
                          </div>
                        )}
                      </div>
                      {selectedNode.esg && (
                        <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl">
                          <div className="text-[9px] text-emerald-400 font-bold uppercase mb-2 flex items-center gap-1.5">
                            <Leaf size={11} /> ESG Scorecard
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-[28px] font-bold text-white">{selectedNode.esg.ethical_rating}</div>
                            <div className="text-right">
                              <div className="text-[8px] text-slate-600 uppercase">CO₂ Intensity</div>
                              <div className="text-[11px] text-slate-300 font-bold">{selectedNode.esg.carbon_footprint}</div>
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-500 italic leading-snug">&ldquo;{selectedNode.esg.sustainability_note}&rdquo;</p>
                        </div>
                      )}
                    </div>

                    {selectedNode.customs && (
                      <div className="bg-sky-500/5 border border-sky-500/20 p-4 rounded-xl grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="text-[9px] font-bold text-sky-400 uppercase flex items-center gap-1.5 mb-0.5">
                            <FileText size={11} /> Regulatory / Trade
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <div className="text-[8px] text-slate-600 uppercase mb-0.5">HTS Code</div>
                              <div className="text-[13px] font-mono text-white">{selectedNode.customs.hts_code}</div>
                            </div>
                            <div>
                              <div className="text-[8px] text-slate-600 uppercase mb-0.5">Duty Rate</div>
                              <div className="text-[13px] font-mono text-emerald-400 font-bold">{selectedNode.customs.duty_rate}</div>
                            </div>
                          </div>
                          <div className="text-[10px] text-slate-500 border-t border-white/5 pt-2 leading-tight">{selectedNode.customs.compliance_note}</div>
                        </div>
                        <div className="space-y-3 border-l border-white/5 pl-6">
                          <div className="text-[9px] font-bold text-sky-400 uppercase flex items-center gap-1.5 mb-0.5">
                            <Ship size={11} /> Logistics
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <div className="text-[8px] text-slate-600 uppercase mb-0.5">Lead Time</div>
                              <div className="text-[13px] font-mono text-white">{selectedNode.logistics?.port_wait_days ?? 'N/A'} Days</div>
                            </div>
                            <div>
                              <div className="text-[8px] text-slate-600 uppercase mb-0.5">Est. Freight</div>
                              <div className="text-[13px] font-mono text-white">{selectedNode.logistics?.freight_cost_estimate || 'TBD'}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedNode.companies && selectedNode.companies.length > 0 && (
                      <div className="pt-2">
                        <div className="text-[9px] font-bold text-emerald-400 uppercase mb-2 flex items-center gap-2">
                          <Factory size={11} /> Target Strategic Partners
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {selectedNode.companies.map((c, i) => (
                            <a key={i} href={c.website || '#'} target="_blank" rel="noopener noreferrer"
                              className="text-[11px] text-slate-300 font-mono bg-white/5 p-3 border border-white/5 rounded-lg hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all flex items-center justify-between group">
                              <span className="truncate">{c.name}</span>
                              <ExternalLink size={10} className="opacity-30 group-hover:opacity-100 text-emerald-400 shrink-0 ml-1" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ── EMPTY STATE ── */}
                {!selectedNode && (
                  <p className="text-[12px] text-slate-600 italic">
                    Select a sourcing hub or risk factor to populate intelligence modules. Run a new mission to begin.
                  </p>
                )}
              </div>

              {/* ── TOOLS TOOLBAR ── */}
              <div className="flex flex-col gap-2 shrink-0">
                {/* Row 1 */}
                <div className="flex items-center gap-2 flex-wrap justify-end">
                  {[
                    { icon:<FileText size={12}/>,   label:'HS Code',    action:()=>setShowTariff(true),    color:'sky' },
                    { icon:<History size={12}/>,    label:`Archive (${missionHistory.length})`, action:()=>setShowHistory(true), color:'emerald' },
                    { icon:<BarChart3 size={12}/>,  label:'Compare',    action:()=>setShowComparison(true), color:'sky', disabled:opportunities.length < 2 },
                    { icon:<DollarSign size={12}/>, label:'TLC Calc',   action:()=>setShowTLC(true),       color:'emerald', disabled:opportunities.length === 0 },
                  ].map((t, i) => (
                    <button key={i} onClick={t.action} disabled={t.disabled}
                      className={`flex items-center gap-1.5 px-3 h-9 border rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all disabled:opacity-25
                        ${t.color==='emerald' ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10' : 'border-white/10 text-slate-400 hover:border-sky-500/30 hover:text-sky-400'}`}>
                      {t.icon}{t.label}
                    </button>
                  ))}
                </div>
                {/* Row 2 */}
                <div className="flex items-center gap-2 flex-wrap justify-end">
                  {[
                    { icon:<Scale size={12}/>,      label:'Incoterms',  action:()=>setShowIncoterms(true),  color:'purple' },
                    { icon:<ShieldAlert size={12}/>, label:'Risk Score', action:()=>setShowRisk(true),       color:'rose' },
                    { icon:<Anchor size={12}/>,     label:'Ports',      action:()=>setShowPorts(true),      color:'sky' },
                    { icon:<Zap size={12}/>,        label:'Compliance', action:()=>setShowCompliance(true), color:'amber' },
                  ].map((t, i) => (
                    <button key={i} onClick={t.action}
                      className={`flex items-center gap-1.5 px-3 h-9 border rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all
                        ${t.color==='rose'   ? 'border-rose-500/30 text-rose-400 hover:bg-rose-500/10' :
                          t.color==='purple' ? 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10' :
                          t.color==='amber'  ? 'border-amber-500/30 text-amber-400 hover:bg-amber-500/10' :
                          'border-white/10 text-slate-400 hover:border-sky-500/30 hover:text-sky-400'}`}>
                      {t.icon}{t.label}
                    </button>
                  ))}
                </div>
                {/* Primary CTAs */}
                <div className="flex items-center gap-2 justify-end">
                  <button onClick={exportToPDF} disabled={isExportingPDF || opportunities.length === 0}
                    className="px-3 h-9 border border-white/20 text-white hover:bg-white/10 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all flex items-center gap-1.5 disabled:opacity-25">
                    {isExportingPDF ? 'GENERATING...' : <><Download size={12} /> Export PDF</>}
                  </button>
                  <button onClick={() => setShowSearch(true)}
                    className="px-5 h-9 bg-sky-500 text-black font-bold uppercase text-[10px] hover:bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.25)] rounded-lg tracking-widest flex items-center gap-1.5 transition-all">
                    New Mission <SearchCode size={12} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </main>

        {/* ════════════════════════════════════
            RIGHT SIDEBAR
        ════════════════════════════════════ */}
        <aside className="hidden lg:flex w-80 flex-col gap-4 shrink-0 z-10 overflow-y-auto custom-scrollbar pr-1">

          {/* Market Trends Chart */}
          {marketData && (
            <div className="bg-[#0a0a0a] border border-white/10 p-5 rounded-xl space-y-3 shadow-xl shrink-0">
              <div className="flex items-center justify-between">
                <h2 className="text-[11px] font-bold text-sky-400 tracking-[0.2em] uppercase flex items-center gap-2">
                  <BarChart3 size={16} /> Price Trend Index
                </h2>
                <div className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  marketData.currency.impact === 'Stable' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                }`}>
                  {marketData.currency.impact}
                </div>
              </div>
              <p className="text-[9px] text-slate-600 leading-snug">
                Indicative quarterly pricing trend for the current mission&rsquo;s category. Hover a bar for the exact index value.
              </p>
              <div className="flex items-end justify-between gap-2" style={{ height: '72px' }}>
                {marketData.price_history.map((d, i) => {
                  const max = Math.max(...marketData.price_history.map(p => p.price))
                  const px = Math.max(8, Math.round((d.price / max) * 64))
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1 group cursor-help" title={`${d.month}: index ${d.price}`}>
                      <span className="text-[8px] text-slate-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">{d.price}</span>
                      <div className="w-full rounded-t relative group-hover:brightness-125 transition-all"
                        style={{ height:`${px}px`, background:'linear-gradient(to top, rgba(56,189,248,0.7), rgba(56,189,248,0.1))' }}>
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-sky-400" />
                      </div>
                      <span className="text-[9px] text-slate-600 font-bold">{d.month}</span>
                    </div>
                  )
                })}
              </div>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-[9px] text-slate-600 uppercase font-bold mb-0.5">Currency Index</div>
                  <div className="text-[15px] font-bold text-white">{marketData.currency.pair} {marketData.currency.rate}</div>
                </div>
                {marketData.currency.impact === 'Positive'
                  ? <ArrowDownRight className="text-emerald-400" size={20} />
                  : <ArrowUpRight className="text-rose-400" size={20} />}
              </div>
            </div>
          )}

          {/* Live FX Rates */}
          {fxData && (
            <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl shadow-xl shrink-0">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[11px] font-bold text-amber-400 tracking-[0.2em] uppercase flex items-center gap-2">
                  <TrendingUp size={14} /> Live FX Rates
                </h2>
                <button
                  onClick={() => fetch('/api/fx').then(r => r.json()).then(d => setFxData(d)).catch(() => {})}
                  className="flex items-center gap-1 text-[8px] text-slate-600 hover:text-amber-400 font-mono transition-colors"
                  title="Rates refresh automatically every 5 minutes. Click to refresh now.">
                  <span>as of {fxData.date}</span>
                  <span className="text-[10px]">⟳</span>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {Object.entries(fxData.rates || {}).slice(0, 6).map(([code, info]) => (
                  <div key={code} className="flex items-center justify-between p-2.5 bg-[#111] border border-white/5 rounded-lg" title={info.impact}>
                    <div>
                      <div className="text-[11px] font-bold text-white font-mono">{info.flag} {code}</div>
                      <div className="text-[9px] text-slate-600 mt-0.5 leading-tight">
                        {info.impact?.split(' ').slice(0, 3).join(' ')}
                      </div>
                    </div>
                    <span className="text-[14px] font-bold text-amber-300 font-mono">
                      {typeof info.rate === 'number' ? info.rate.toFixed(2) : info.rate}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strategic Directive */}
          <div className="bg-[#0a0a0a] border border-emerald-500/30 p-5 flex flex-col gap-4 shadow-[0_0_25px_rgba(16,185,129,0.08)] rounded-xl relative shrink-0">
            <div className="absolute top-0 right-0 p-3 overflow-hidden rounded-tr-xl"><Zap size={20} className="text-emerald-500/10" /></div>
            <h2 className="text-[10px] font-bold text-emerald-400 tracking-[0.3em] uppercase flex items-center gap-2">
              <Target size={14} /> Strategic Directive
            </h2>
            {directive ? (
              <div className="space-y-4">
                <div>
                  <div className="text-[8px] text-slate-600 uppercase font-bold tracking-widest mb-0.5">Target Sourcing Hub</div>
                  <div className="text-[14px] font-bold text-white uppercase tracking-wider">{directive.best_region}</div>
                </div>
                <div>
                  <div className="text-[8px] text-slate-600 uppercase font-bold tracking-widest mb-0.5">Primary Partner</div>
                  <div className="text-[14px] font-bold text-emerald-400 uppercase">{directive.best_partner}</div>
                </div>
                <div className="p-3 bg-rose-500/8 border border-rose-500/25 rounded-lg space-y-1">
                  <div className="text-[8px] text-rose-500 uppercase font-bold tracking-widest flex items-center gap-1.5">
                    <ShieldAlert size={10} /> Trade & Compliance Alert
                  </div>
                  <div className="text-[10px] text-rose-200 leading-snug">{directive.tariff_alert}</div>
                </div>
                <div className="p-3 bg-emerald-500/5 border border-emerald-500/15 text-[11px] text-slate-400 leading-relaxed italic rounded-lg border-l-2 border-l-emerald-500/40">
                  &ldquo;{directive.summary}&rdquo;
                </div>
              </div>
            ) : (
              <div className="text-[11px] text-slate-700 italic flex items-center gap-2 animate-pulse">
                <Clock size={13} /> Run a mission scan to generate directive...
              </div>
            )}
          </div>

          {/* Market Intelligence / News */}
          <div className="bg-[#0a0a0a] border border-white/10 flex-1 min-h-[320px] p-4 flex flex-col gap-3 rounded-xl shadow-xl">
            <div className="flex items-center justify-between shrink-0">
              <h2 className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase flex items-center gap-2">
                <Newspaper size={14} className="text-sky-400" /> Market Intelligence
              </h2>
            </div>
            {/* Region filter */}
            <div className="flex items-center gap-1 flex-wrap shrink-0">
              {missionKeywords.length > 0 && (
                <button onClick={() => setNewsFilter('mission')}
                  className={`px-2 py-0.5 text-[9px] font-bold rounded transition-all flex items-center gap-1 ${
                    newsFilter === 'mission'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-600 hover:text-emerald-400 border border-white/5'
                  }`}>
                  ⚡ Mission
                </button>
              )}
              {[['all','All'],['china','🇨🇳'],['eu','🇪🇺'],['usa','🇺🇸'],['latam','🌎'],['india','🇮🇳']].map(([key, label]) => (
                <button key={key} onClick={() => setNewsFilter(key)}
                  className={`px-2 py-0.5 text-[9px] font-bold rounded transition-all ${
                    newsFilter === key
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      : 'text-slate-700 hover:text-slate-400'
                  }`}>
                  {label}
                </button>
              ))}
              <span className="ml-auto text-[9px] text-slate-700 font-mono">{filteredNews.length}</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar min-h-0">
              {filteredNews.length === 0 ? (
                <p className="text-[10px] text-slate-700 italic py-2">
                  {newsFilter === 'mission' ? 'No news loaded yet — run a mission scan first.' : 'No articles match this filter.'}
                </p>
              ) : filteredNews.map((item, i) => (
                <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
                  className="block border-b border-white/5 pb-3 last:border-0 group">
                  <div className="text-[8px] text-slate-600 font-bold mb-1 uppercase tracking-widest flex items-center justify-between">
                    <span className="flex items-center gap-1">{item._mission && <span className="text-emerald-400">⚡</span>}{item.pubDate}</span>
                    <ExternalLink size={9} className="opacity-0 group-hover:opacity-100 text-sky-400 transition-all" />
                  </div>
                  <h3 className="text-[11px] font-bold leading-snug mb-0.5 group-hover:text-sky-400 transition-all uppercase tracking-tight text-slate-200">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed font-sans">{item.description}</p>
                </a>
              ))}
            </div>
          </div>

        </aside>
      </div>

      {/* System health pill */}
      <div className="fixed bottom-5 left-5 z-[120] flex items-center gap-2 bg-black/80 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md shadow-2xl">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">System_Integrity: 100%</span>
      </div>

    </div>
  )
}