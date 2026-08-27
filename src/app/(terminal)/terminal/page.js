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
import BomAnalyzer from '@/components/BomAnalyzer'
import SanctionsChecker from '@/components/SanctionsChecker'
import OceanFreightRates from '@/components/OceanFreightRates'
import FtaChecker from '@/components/FtaChecker'
import AtlasLogo from '@/components/AtlasLogo'
import GuidedTour from '@/components/GuidedTour'
import {
  Shield, ShieldAlert, Zap, ChevronRight,
  Pause, Play, Newspaper, X, Target, Factory, Map,
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
  if (match(['automotive','vehicle','sun visor','visor','headliner','instrument panel','dashboard','bumper','chassis','powertrain','tier-1','ford','gm ','toyota','honda','bmw','mercedes','stellantis','car seat','car seats','auto seat','vehicle seat','seat cover','seat trim','auto upholstery','vehicle upholstery','car interior','car door','car body','trim','interior trim','plated trim','door trim','plastic trim','cargo shade','cargo cover','shade cover','window shade','sunshade','cargo liner','boot liner','parcel shelf','tonneau','boot cover','interior accessory','interior component'])) return 'automotive'
  if (match(['chip','semiconductor','wafer','pcb','display panel','oled','processor','memory chip','microchip','tsmc','circuit board','nand','dram'])) return 'electronics'
  if (match(['beef','meat','patty','wheat','soybean','food','agri','corn','chicken','grain','dairy','coffee','cocoa','sugar','rice','mcdonald'])) return 'agriculture'
  if (match(['adhesive','glue','sealant','bonding agent','coating','paint','primer','varnish','lacquer','powder coat','lubricant','grease','cutting fluid','solvent','thinner','acetone','surfactant','specialty chemical','fine chemical','industrial chemical','chemical compound'])) return 'chemicals'
  if (match(['corrugated box','cardboard box','shipping box','glass bottle','glass jar','glass container','label','pressure sensitive label','shrink sleeve','blister pack','clamshell','flexible pouch','stand-up pouch','packaging material','folding carton','aseptic carton','retail packaging','container packaging'])) return 'packaging'
  if (match(['api ','active pharmaceutical','drug substance','excipient','generic drug','pharmaceutical','medical device','surgical instrument','syringe','catheter','stent','implant','diagnostic kit','reagent','nitrile glove','surgical glove','surgical mask','n95','hospital supply','sterile','gmp certified','iso 13485'])) return 'medical'
  if (match(['pump','centrifugal pump','vacuum pump','gear pump','valve','ball valve','gate valve','check valve','compressor','air compressor','cnc machine','cnc machining','machine tool','grinding machine','machining center','industrial robot','robotic arm','conveyor','heat exchanger','pressure vessel','welding equipment','laser cutter','gearbox','servo drive','vfd','machinery','capital equipment','plant equipment'])) return 'machinery'
  if (match(['steel','aluminum','copper','iron','zinc','mineral','mining','metal','alloy','rare earth'])) return 'metals'
  if (match(['shirt','shoe','cotton','leather','apparel','textile','clothing','garment','denim','wool','fabric','yarn'])) return 'textiles'
  if (match(['car ','cars','engine part','brake','tire','tyre','transmission','exhaust','wheel','airbag','windshield'])) return 'automotive'
  return 'automotive'
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
    { id:'fb_auto_1', lat:25.6, lng:-100.3, hub:'MONTERREY, MEXICO', title:'NAFTA Tier-1 Cluster', companies:[{name:'Grupo Antolin',website:'https://www.grupoantolin.com/',turnover:'>$1B'},{name:'Nemak',website:'https://www.nemak.com/',turnover:'>$1B'},{name:'Draxton Mexico',website:'https://www.draxton.com/',turnover:'$100M-$1B'},{name:'Cimco Group',website:'https://www.cimco.com.mx/',turnover:'$10M-$100M'}], desc:'Primary nearshoring hub for NA automotive OEMs. Interiors, chassis, headliners, visor assemblies.', customs:{hts_code:'8708.29',duty_rate:'0% (USMCA)',compliance_note:'USMCA Rules of Origin. RVC ≥ 75%.'}, esg:{carbon_footprint:'Medium',ethical_rating:'A-',sustainability_note:'Water scarcity risk in Monterrey metro.'}, logistics:{port_wait_days:1,freight_cost_estimate:'$2.1k/Truck'}, industry_kpi:{label:'Tooling Lead',value:'12 Weeks'} },
    { id:'fb_auto_2', lat:42.3, lng:-83.0, hub:'DETROIT, USA', title:'Great Lakes Auto Cluster', companies:[{name:'Lear Corp',website:'https://www.lear.com/',turnover:'>$1B'},{name:'Magna International',website:'https://www.magna.com/',turnover:'>$1B'},{name:'Shape Corp',website:'https://www.shapecorp.com/',turnover:'$100M-$1B'},{name:'Gentex Corp',website:'https://www.gentex.com/',turnover:'$100M-$1B'}], desc:'Legacy US auto hub. Domestic sourcing for Ford, GM, Stellantis.', customs:{hts_code:'8708.29',duty_rate:'0% (Domestic)',compliance_note:'Buy America Act eligible.'}, esg:{carbon_footprint:'Medium',ethical_rating:'A',sustainability_note:'UAW unionized. EV transition investment active.'}, logistics:{port_wait_days:0,freight_cost_estimate:'$1.5k/Ground'}, industry_kpi:{label:'Proximity',value:'Same-Day JIT'} },
    { id:'fb_auto_3', lat:31.2, lng:121.4, hub:'SHANGHAI, CHINA', title:'East China Auto Zone', companies:[{name:'Yanfeng Automotive',website:'https://www.yfai.com/',turnover:'>$1B'},{name:'Huayu Auto',website:'https://www.hasco-group.com/',turnover:'>$1B'},{name:'Fuyao Glass',website:'https://www.fuyaogroup.com/',turnover:'>$1B'},{name:'Minth Group',website:'https://www.minthgroup.com/',turnover:'$100M-$1B'}], desc:'Scale production for auto plastics, electronics, and interiors.', customs:{hts_code:'8708.29',duty_rate:'25% (Sec 301)',compliance_note:'Section 301 tariffs active.'}, esg:{carbon_footprint:'High',ethical_rating:'B',sustainability_note:'Renewable grid transition by 2030.'}, logistics:{port_wait_days:5,freight_cost_estimate:'$4.5k/FEU'}, industry_kpi:{label:'Scale',value:'Unlimited'} },
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

// ── Port-level risk scores & active alerts ───────────────────────────────────
// Score 0–100 (higher = safer). Composite: WB country stability + port-specific
// factors (labor risk, congestion, weather, infrastructure, geopolitical proximity).
// Alerts are based on publicly known standing risk factors.
const PORT_RISK = {
  // ── USA East Coast ──
  'New York / Newark':        { score:52, alerts:[{ lvl:'warn', msg:'Chronic congestion — avg vessel dwell +1.5 days' }] },
  'Baltimore':                { score:55, alerts:[{ lvl:'warn', msg:'Francis Scott Key Bridge collapse reduced capacity; terminal rerouting ongoing' }] },
  'Savannah':                 { score:63, alerts:[] },
  'Charleston':               { score:65, alerts:[] },
  'Miami':                    { score:57, alerts:[{ lvl:'info', msg:'Hurricane exposure Jun–Nov; have contingency routing' }] },
  'Philadelphia':             { score:54, alerts:[] },
  // ── USA West Coast ──
  'Los Angeles / Long Beach': { score:46, alerts:[{ lvl:'warn', msg:'ILWU labor contract — periodic slowdowns & work-to-rule risk' }, { lvl:'warn', msg:'Congestion: avg vessel anchor wait 3–5 days at peak' }] },
  'Seattle / Tacoma':         { score:57, alerts:[{ lvl:'info', msg:'Winter weather delays Nov–Feb; fog disruptions' }] },
  'Oakland / San Francisco':  { score:54, alerts:[{ lvl:'info', msg:'Outer Harbor infrastructure constraints; berth productivity below benchmark' }] },
  // ── USA Gulf Coast ──
  'Houston':                  { score:50, alerts:[{ lvl:'warn', msg:'Hurricane/tropical storm exposure Jun–Nov (Cat 3+ landfall history)' }] },
  'New Orleans':              { score:46, alerts:[{ lvl:'warn', msg:'Hurricane exposure Jun–Nov' }, { lvl:'info', msg:'Mississippi River low-water risk in drought years — barge delays' }] },
  'Tampa':                    { score:58, alerts:[{ lvl:'info', msg:'Hurricane exposure Jun–Nov' }] },
  // ── USA Great Lakes ──
  'Detroit':                  { score:50, alerts:[] },
  'Chicago':                  { score:51, alerts:[{ lvl:'info', msg:'Inland port — high trucking dependency; I-290/I-94 corridor congestion' }] },
  'Cleveland':                { score:49, alerts:[] },
  'Pittsburgh':               { score:47, alerts:[{ lvl:'info', msg:'River port — Ohio River low-water periods cause barge delays' }] },
  // ── Canada ──
  'Vancouver':                { score:64, alerts:[{ lvl:'info', msg:'ILWU Canada labor tensions — historical rotating strikes' }] },
  'Prince Rupert':            { score:67, alerts:[] },
  'Halifax':                  { score:70, alerts:[] },
  'Montreal / St. Lawrence':  { score:68, alerts:[{ lvl:'info', msg:'Winter ice restrictions Jan–Mar; icebreaker assistance required' }] },
  'Toronto':                  { score:70, alerts:[] },
  'Winnipeg':                 { score:69, alerts:[] },
  // ── Mexico ──
  'Monterrey':                { score:33, alerts:[{ lvl:'high', msg:'Organized crime activity in Nuevo León — cargo theft elevated' }] },
  'Juárez':                   { score:25, alerts:[{ lvl:'high', msg:'High cartel activity — border crossing security incidents' }, { lvl:'warn', msg:'US-MX border crossing delays unpredictable' }] },
  'Tijuana':                  { score:28, alerts:[{ lvl:'high', msg:'Cargo theft risk; cartel-related port disruptions reported' }] },
  'Manzanillo':               { score:36, alerts:[{ lvl:'warn', msg:'Cartel influence in Colima state — port vicinity security incidents' }] },
  'Lázaro Cárdenas':          { score:30, alerts:[{ lvl:'high', msg:'Significant cartel presence; cargo extortion documented' }, { lvl:'warn', msg:'Labor unrest history at terminal' }] },
  'Veracruz':                 { score:38, alerts:[{ lvl:'warn', msg:'Port corruption risk — customs delays above average' }] },
  'Altamira':                 { score:36, alerts:[] },
  // ── China ──
  'Shenzhen':                 { score:40, alerts:[{ lvl:'warn', msg:'US Section 301 tariffs — 25%+ on most goods; verify HTS' }, { lvl:'info', msg:'Geopolitical risk: Taiwan Strait tension scenarios' }] },
  'Guangzhou':                { score:41, alerts:[{ lvl:'warn', msg:'Section 301 tariffs active' }] },
  'Hong Kong':                { score:38, alerts:[{ lvl:'warn', msg:'National Security Law — reduced autonomous trade status' }, { lvl:'warn', msg:'US no longer grants Hong Kong preferential treatment (same tariffs as China)' }] },
  'Shanghai':                 { score:41, alerts:[{ lvl:'warn', msg:'Section 301 tariffs; lockdown disruption history — assess contingency ports' }] },
  'Ningbo':                   { score:42, alerts:[{ lvl:'warn', msg:'Section 301 tariffs; typhoon exposure Jul–Sep' }] },
  'Suzhou':                   { score:43, alerts:[{ lvl:'info', msg:'Inland industrial hub — road/rail to Ningbo/Shanghai required' }] },
  'Tianjin':                  { score:40, alerts:[{ lvl:'info', msg:'Proximity to Beijing — heightened inspection activity reported' }] },
  'Dalian':                   { score:41, alerts:[{ lvl:'info', msg:'Winter ice risk Nov–Mar; icebreaker-assisted departures' }] },
  'Qingdao':                  { score:42, alerts:[] },
  // ── Japan ──
  'Tokyo / Yokohama':         { score:68, alerts:[{ lvl:'info', msg:'Seismic zone — earthquake contingency protocols recommended' }] },
  'Chiba':                    { score:69, alerts:[] },
  'Nagoya':                   { score:71, alerts:[{ lvl:'info', msg:'Seismic exposure; Nankai Trough scenario in long-range risk planning' }] },
  'Aichi':                    { score:72, alerts:[] },
  'Osaka':                    { score:69, alerts:[] },
  'Kobe':                     { score:68, alerts:[] },
  // ── South Korea ──
  'Busan':                    { score:60, alerts:[{ lvl:'info', msg:'North Korea ballistic missile tests — intermittent NOTAM disruptions' }] },
  'Ulsan':                    { score:58, alerts:[{ lvl:'info', msg:'Heavy industrial port — congestion during peak auto export season' }] },
  'Incheon':                  { score:59, alerts:[] },
  'Pyeongtaek':               { score:58, alerts:[] },
  'Seoul':                    { score:57, alerts:[] },
  // ── Taiwan ──
  'Taipei / Keelung':         { score:62, alerts:[{ lvl:'warn', msg:'PRC military exercises — periodic strait disruptions & airspace closures' }] },
  'Taoyuan':                  { score:63, alerts:[{ lvl:'info', msg:'Air freight hub; ground transport congestion near TSMC fabs' }] },
  'Hsinchu':                  { score:64, alerts:[] },
  'Taichung':                 { score:63, alerts:[] },
  'Kaohsiung':                { score:62, alerts:[{ lvl:'warn', msg:'Closest major port to Taiwan Strait flashpoint; contingency routing advised' }] },
  'Tainan':                   { score:63, alerts:[] },
  // ── Vietnam ──
  'Ho Chi Minh City':         { score:50, alerts:[{ lvl:'info', msg:'Ongoing anti-corruption crackdowns — customs processing slower' }] },
  'Binh Duong':               { score:51, alerts:[] },
  'Dong Nai':                 { score:50, alerts:[] },
  'Hanoi':                    { score:51, alerts:[] },
  'Hai Phong':                { score:50, alerts:[{ lvl:'info', msg:'Typhoon exposure May–Nov; port closures 2–3×/year on average' }] },
  // ── India ──
  'Bangalore':                { score:30, alerts:[{ lvl:'info', msg:'Landlocked — Bengaluru to Chennai/JNPT adds 1–2 transit days' }] },
  'Chennai':                  { score:28, alerts:[{ lvl:'info', msg:'Cyclone risk Oct–Dec (Bay of Bengal)' }] },
  'Mumbai / JNPT':            { score:29, alerts:[{ lvl:'warn', msg:'Port congestion at JNPT — avg dwell 4+ days' }, { lvl:'info', msg:'Monsoon disruptions Jun–Sep' }] },
  'Pune':                     { score:29, alerts:[] },
  'Mundra':                   { score:30, alerts:[] },
  'Delhi / Noida':            { score:27, alerts:[{ lvl:'info', msg:'Landlocked — requires ICD to Mundra/JNPT (3–4 days)' }] },
  'Jaipur':                   { score:27, alerts:[] },
  // ── Singapore ──
  'Port of Singapore':        { score:84, alerts:[] },
  'Jurong Island':            { score:83, alerts:[] },
  'Changi':                   { score:84, alerts:[] },
  // ── Germany ──
  'Hamburg':                  { score:68, alerts:[{ lvl:'info', msg:'GDL rail strikes periodic — alternate road routing needed' }] },
  'Bremen / Bremerhaven':     { score:67, alerts:[] },
  'Frankfurt am Main':        { score:68, alerts:[] },
  'Cologne / Duisburg':       { score:67, alerts:[{ lvl:'info', msg:'Rhine River low-water Aug–Oct limits barge capacity' }] },
  'Munich / Bavaria':         { score:68, alerts:[] },
  'Stuttgart':                { score:68, alerts:[] },
  'Nuremberg':                { score:67, alerts:[] },
  // ── UK ──
  'London / Felixstowe':      { score:60, alerts:[{ lvl:'info', msg:'Post-Brexit customs friction — additional documentation & delays at GB/EU border' }] },
  'Southampton':              { score:61, alerts:[] },
  'Dover':                    { score:59, alerts:[{ lvl:'warn', msg:'Post-Brexit border checks — peak queues 6–12 hrs; Operation Brock activated during surges' }] },
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
  'Istanbul':                 { score:20, alerts:[{ lvl:'high', msg:'Lira volatility — FX hedging essential; cost unpredictability high' }, { lvl:'warn', msg:'NATO-Russia tensions — Bosphorus transit restrictions risk under Montreux Convention' }] },
  'Bursa':                    { score:21, alerts:[{ lvl:'warn', msg:'Lira inflation risk; supplier payment terms volatile' }] },
  'Kocaeli':                  { score:20, alerts:[{ lvl:'info', msg:'Seismic zone — North Anatolian Fault proximity' }] },
  'Izmir / Aliağa':           { score:21, alerts:[{ lvl:'warn', msg:'Seismic risk; 2020 Izmir earthquake caused significant infrastructure damage' }] },
  'Mersin':                   { score:19, alerts:[{ lvl:'warn', msg:'Proximity to Syria — regional instability monitoring required' }] },
  'Adana':                    { score:19, alerts:[] },
  // ── South America (key ports) ──
  'São Paulo / Santos':       { score:47, alerts:[{ lvl:'info', msg:'Truckers\' strike history — have road alternatives' }] },
  'Rio de Janeiro':           { score:46, alerts:[] },
  'Buenos Aires / Exolgan':   { score:33, alerts:[{ lvl:'high', msg:'FX controls — parallel rate risk; USD payment restrictions' }, { lvl:'warn', msg:'Customs clearance averaging 7–10 days' }] },
  'Lagos / Apapa':            { score:10, alerts:[{ lvl:'high', msg:'Severe congestion — avg clearance 14–21 days' }, { lvl:'high', msg:'Cargo theft & port corruption documented' }, { lvl:'warn', msg:'FX restrictions on USD repatriation' }] },
  'Port Harcourt':            { score:9,  alerts:[{ lvl:'high', msg:'Niger Delta instability — vessel security incidents ongoing' }] },
  // ── Australia ──
  'Sydney / Port Botany':     { score:86, alerts:[] },
  'Melbourne':                { score:86, alerts:[{ lvl:'info', msg:'MUA labor negotiations — periodic terminal slowdowns historically' }] },
  'Brisbane':                 { score:85, alerts:[{ lvl:'info', msg:'Cyclone risk Nov–Apr (northern approaches)' }] },
  'Fremantle / Perth':        { score:86, alerts:[] },
  'Darwin':                   { score:84, alerts:[{ lvl:'info', msg:'Remote port — limited carrier calls; transshipment via Singapore often required' }] },
}

// ── Hub Stability Navigator data ─────────────────────────────────────────────
const HUB_CONTINENTS = ['Asia','North America','South America','Europe','Africa','Oceania']
const HUB_COUNTRIES = {
  'Asia':          ['China','Japan','South Korea','Taiwan','Vietnam','India','Singapore','Malaysia','Thailand','Indonesia','Bangladesh','Philippines'],
  'North America': ['USA','Canada','Mexico'],
  'South America': ['Brazil','Chile','Colombia','Peru','Argentina'],
  'Europe':        ['Germany','France','United Kingdom','Netherlands','Belgium','Spain','Italy','Poland','Czech Republic','Hungary','Romania','Turkey'],
  'Africa':        ['South Africa','Nigeria','Ghana','Morocco','Egypt','Ethiopia'],
  'Oceania':       ['Australia'],
}
const HUB_REGIONS = {
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
  const [showBom, setShowBom] = useState(false)
  const [showSanctions, setShowSanctions] = useState(false)
  const [showOcean, setShowOcean] = useState(false)
  const [showFta, setShowFta] = useState(false)
  const [isExportingPDF, setIsExportingPDF] = useState(false)
  const [turnoverFilter, setTurnoverFilter] = useState(null)
  const [showTour, setShowTour] = useState(false)
  const [activeMobileTab, setActiveMobileTab] = useState('intel')
  const [intelBrief, setIntelBrief] = useState(null)
  const [intelLoading, setIntelLoading] = useState(false)
  const [metalsTs, setMetalsTs] = useState(() => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
  const [hubNav, setHubNav] = useState({ level: 'continent', continent: null, country: null, region: null })

  // Map hub name string → ISO2 for stability badge lookup
  function getHubISO2(hubName) {
    const n = (hubName || '').toLowerCase()
    const map = {
      china:'CN', japan:'JP', mexico:'MX', vietnam:'VN', india:'IN',
      germany:'DE', 'united states':'US', usa:'US', taiwan:'TW',
      'south korea':'KR', korea:'KR', malaysia:'MY', thailand:'TH',
      bangladesh:'BD', indonesia:'ID', brazil:'BR', turkey:'TR',
      poland:'PL', italy:'IT', france:'FR', 'united kingdom':'GB',
      uk:'GB', netherlands:'NL', belgium:'BE', spain:'ES', canada:'CA',
      singapore:'SG', philippines:'PH',
    }
    for (const [k, v] of Object.entries(map)) { if (n.includes(k)) return v }
    return null
  }

  // Fire-and-forget intel fetch after a scan completes
  function triggerIntelFetch(opps, query) {
    setIntelBrief(null)
    setIntelLoading(true)
    fetch('/api/intel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ opportunities: opps, query })
    }).then(r => r.json()).then(data => {
      if (!data.error) setIntelBrief(data)
    }).catch(() => {}).finally(() => setIntelLoading(false))
  }


  // Auto-switch to hubs tab when scan returns data
  useEffect(() => {
    if (opportunities.length > 0) setActiveMobileTab('hubs')
  }, [opportunities.length])

  useEffect(() => {
    try {
      if (!localStorage.getItem('atlas_tour_done')) {
        setTimeout(() => setShowTour(true), 800)
      }
    } catch {}
  }, [])

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
    const metalsInterval = setInterval(() => setMetalsTs(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })), 60 * 1000)
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
      } else {
        // First-time visitor with no saved missions → auto-run a demo scan
        // so the globe is alive and populated before the tour even finishes
        try {
          const saved = localStorage.getItem('atlas_missions')
          const isFirstVisit = !saved || saved === '[]' || JSON.parse(saved).length === 0
          if (isFirstVisit) {
            setTimeout(() => handleSearch(null, 'lithium-ion batteries for EV assembly'), 1500)
          }
        } catch {}
      }
    }
    return () => { clearInterval(interval); clearInterval(metalsInterval) }
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
        triggerIntelFetch(data.opportunities, activeQuery)
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
      triggerIntelFetch(hubs, activeQuery)
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
          className="text-[10px] font-bold bg-emerald-500 text-black px-3 py-1.5 rounded-lg shrink-0 active:bg-emerald-400 transition-colors">
          SCAN
        </button>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="flex flex-1 overflow-hidden p-2 lg:p-4 gap-2 lg:gap-4 flex-col lg:flex-row">

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
          {showBom       && <BomAnalyzer onClose={() => setShowBom(false)} />}
          {showSanctions && <SanctionsChecker onClose={() => setShowSanctions(false)} />}
          {showOcean     && <OceanFreightRates onClose={() => setShowOcean(false)} />}
          {showFta       && <FtaChecker onClose={() => setShowFta(false)} />}
        </AnimatePresence>

        {/* ── GUIDED TOUR ── */}
        <AnimatePresence>
          {showTour && (
            <GuidedTour
              onComplete={() => {
                setShowTour(false)
                try { localStorage.setItem('atlas_tour_done', '1') } catch {}
              }}
              onStartScan={() => setShowSearch(true)}
            />
          )}
        </AnimatePresence>

        {/* ── RFQ MODAL ── */}
        <AnimatePresence>
          {showRFQ && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
              <motion.div initial={{y:20}} animate={{y:0}}
                className="bg-[#0a0a0a] border border-emerald-500/30 p-6 md:p-10 w-full max-w-3xl rounded-2xl shadow-[0_0_100px_rgba(16,185,129,0.15)] max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-[12px] font-bold text-emerald-400 tracking-[0.3em] uppercase flex items-center gap-3">
                    <Mail size={18} /> Smart RFQ Generator
                  </h2>
                  <button onClick={() => setShowRFQ(false)} className="text-slate-500 hover:text-white active:text-white transition-colors"><X size={24} /></button>
                </div>
                <textarea readOnly rows={13} value={marketData?.rfq_template}
                  className="w-full bg-[#111] border border-white/10 p-6 text-[13px] font-mono focus:outline-none rounded-xl mb-8 leading-relaxed text-slate-300" />
                <div className="flex gap-4">
                  <button
                    onClick={() => { navigator.clipboard.writeText(marketData?.rfq_template || ''); addLog('[SYSTEM] RFQ copied to clipboard.') }}
                    className="flex-1 h-14 bg-emerald-500 text-black font-bold uppercase text-[12px] tracking-widest hover:bg-emerald-400 active:bg-emerald-400 transition-all rounded-lg">
                    Copy to Clipboard
                  </button>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(`RFQ: ${searchQuery || profile.material}`)}&body=${encodeURIComponent(marketData?.rfq_template || '')}`}
                    onClick={() => addLog('[SYSTEM] Opening email client with RFQ draft.')}
                    className="flex-1 h-14 border border-white/10 text-white font-bold uppercase text-[12px] tracking-widest hover:bg-white/5 active:bg-white/5 transition-all rounded-lg flex items-center justify-center">
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
                className="bg-[#0a0a0a] border border-white/10 p-6 md:p-10 w-full max-w-2xl shadow-[0_0_80px_rgba(56,189,248,0.15)] relative rounded-2xl max-h-[90vh] overflow-y-auto">
                <button onClick={() => setShowSearch(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white active:text-white transition-colors">
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
                    className="w-full h-16 bg-emerald-500 text-black font-bold flex items-center justify-center gap-3 hover:bg-emerald-400 active:bg-emerald-400 transition-all disabled:opacity-50 text-[14px] uppercase tracking-widest rounded-xl">
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
        <aside className="hidden lg:flex w-96 flex-col gap-4 shrink-0 z-10 overflow-y-auto custom-scrollbar pr-1">

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
            <div onClick={() => setShowSearch(true)} data-tour="mission"
              className="p-3 bg-[#111] border border-white/5 cursor-pointer hover:border-sky-500/30 transition-all rounded-lg group">
              <div className="text-[10px] text-slate-600 uppercase mb-1 font-bold tracking-widest group-hover:text-sky-400 transition-all">
                Active Mission
              </div>
              <div className="text-[13px] font-bold text-sky-400 uppercase truncate">{profile.material}</div>
            </div>
          </div>

          {/* Hub Stability Navigator */}
          {(() => {
            const { level, continent, country, region } = hubNav
            const countryData = country ? HUB_REGIONS[country] : null
            const s = countryData?.score
            const barColor = s >= 60 ? 'bg-emerald-500' : s >= 35 ? 'bg-amber-500' : 'bg-rose-500'
            const textColor = s >= 60 ? 'text-emerald-400' : s >= 35 ? 'text-amber-400' : 'text-rose-400'
            const stabilityLabel = s >= 60 ? 'Stable' : s >= 35 ? 'Moderate' : 'High Risk'
            return (
              <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl" data-tour="stability">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-[10px] font-bold text-sky-400 tracking-[0.2em] uppercase flex items-center gap-2">
                    <Shield size={14} /> Hub Stability
                  </h2>
                  {level !== 'continent' && (
                    <button
                      onClick={() => {
                        if (level === 'country') setHubNav({ level:'continent', continent:null, country:null, region:null })
                        else if (level === 'region') setHubNav(n => ({ ...n, level:'country', country:null, region:null }))
                        else if (level === 'hubs') setHubNav(n => ({ ...n, level:'region', region:null }))
                      }}
                      className="text-[10px] text-slate-500 hover:text-sky-400 font-mono transition-colors flex items-center gap-1">
                      ← back
                    </button>
                  )}
                </div>

                {/* Breadcrumb */}
                {level !== 'continent' && (
                  <div className="flex items-center gap-1 mb-3 flex-wrap">
                    <span className="text-[10px] text-slate-600">{continent}</span>
                    {country && <><span className="text-[10px] text-slate-700">›</span><span className="text-[10px] text-slate-500">{country}</span></>}
                    {region  && <><span className="text-[10px] text-slate-700">›</span><span className="text-[10px] text-sky-500/70">{region}</span></>}
                  </div>
                )}

                {/* Country stability bar (shown once country selected) */}
                {countryData && (
                  <div className="mb-3 p-2.5 bg-[#111] border border-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-slate-300 uppercase">{country}</span>
                      <span className={`text-[11px] font-bold font-mono ${textColor}`}>◆ {s} / 100</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${barColor}`} style={{ width:`${s}%` }} />
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-slate-600">WB Political Stability</span>
                      <span className={`text-[10px] font-bold ${textColor}`}>{stabilityLabel}</span>
                    </div>
                  </div>
                )}

                {/* Level: Continents */}
                {level === 'continent' && (
                  <div className="grid grid-cols-2 gap-1.5">
                    {HUB_CONTINENTS.map(c => (
                      <button key={c}
                        onClick={() => setHubNav({ level:'country', continent:c, country:null, region:null })}
                        className="bg-[#111] border border-white/5 hover:border-sky-500/30 hover:bg-sky-500/5 rounded-lg p-2.5 text-left transition-all group">
                        <div className="text-[11px] font-bold text-slate-300 group-hover:text-sky-400 uppercase leading-tight">{c}</div>
                        <div className="text-[10px] text-slate-600 mt-0.5">{HUB_COUNTRIES[c]?.length} countries</div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Level: Countries */}
                {level === 'country' && (
                  <div className="grid grid-cols-2 gap-1.5">
                    {(HUB_COUNTRIES[continent] || []).map(cn => {
                      const d = HUB_REGIONS[cn]
                      const cs = d?.score
                      const tc = cs >= 60 ? 'text-emerald-400' : cs >= 35 ? 'text-amber-400' : 'text-rose-400'
                      return (
                        <button key={cn}
                          onClick={() => setHubNav(n => ({ ...n, level:'region', country:cn }))}
                          className="bg-[#111] border border-white/5 hover:border-sky-500/30 hover:bg-sky-500/5 rounded-lg p-2.5 text-left transition-all group">
                          <div className="text-[11px] font-bold text-slate-300 group-hover:text-sky-400 uppercase leading-tight truncate">{cn}</div>
                          {cs !== undefined && <div className={`text-[10px] font-bold mt-0.5 ${tc}`}>◆ {cs}</div>}
                        </button>
                      )
                    })}
                  </div>
                )}

                {/* Level: Regions/Coasts */}
                {level === 'region' && countryData && (
                  <div className="space-y-1.5">
                    {Object.keys(countryData.zones).map(zone => (
                      <button key={zone}
                        onClick={() => setHubNav(n => ({ ...n, level:'hubs', region:zone }))}
                        className="w-full bg-[#111] border border-white/5 hover:border-sky-500/30 hover:bg-sky-500/5 rounded-lg p-2.5 text-left transition-all group flex items-center justify-between">
                        <div>
                          <div className="text-[11px] font-bold text-slate-300 group-hover:text-sky-400 uppercase">{zone}</div>
                          <div className="text-[10px] text-slate-600 mt-0.5">{countryData.zones[zone].length} hubs</div>
                        </div>
                        <ChevronRight size={12} className="text-slate-700 group-hover:text-sky-400" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Level: Hubs */}
                {level === 'hubs' && countryData && region && (
                  <div className="space-y-2">
                    {(countryData.zones[region] || []).map((hub, i) => {
                      const pr = PORT_RISK[hub]
                      const ps = pr?.score ?? countryData.score
                      const pc = ps >= 60 ? 'bg-emerald-500' : ps >= 35 ? 'bg-amber-500' : 'bg-rose-500'
                      const pt = ps >= 60 ? 'text-emerald-400' : ps >= 35 ? 'text-amber-400' : 'text-rose-400'
                      const pl = ps >= 60 ? 'Stable' : ps >= 35 ? 'Moderate' : 'High Risk'
                      const alerts = pr?.alerts || []
                      const topAlert = alerts[0]
                      const alertBorder = topAlert?.lvl === 'high' ? 'border-rose-500/30' : topAlert?.lvl === 'warn' ? 'border-amber-500/20' : 'border-white/5'
                      return (
                        <div key={i} className={`bg-[#111] border rounded-lg p-2.5 ${alertBorder}`}>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <Anchor size={9} className="text-sky-500/50 shrink-0" />
                              <span className="text-[11px] font-bold text-slate-200 uppercase truncate">{hub}</span>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0 ml-2">
                              <span className={`text-[11px] font-bold font-mono ${pt}`}>◆ {ps}</span>
                              <span className={`text-[9px] font-bold px-1 py-0.5 rounded border ${ps >= 60 ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' : ps >= 35 ? 'text-amber-400 border-amber-500/20 bg-amber-500/5' : 'text-rose-400 border-rose-500/20 bg-rose-500/5'}`}>{pl}</span>
                            </div>
                          </div>
                          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-2">
                            <div className={`h-full rounded-full ${pc}`} style={{ width:`${ps}%` }} />
                          </div>
                          {alerts.length > 0 && (
                            <div className="space-y-1">
                              {alerts.map((a, j) => (
                                <div key={j} className={`flex items-start gap-1.5 text-[8px] leading-snug ${a.lvl === 'high' ? 'text-rose-400' : a.lvl === 'warn' ? 'text-amber-400' : 'text-slate-500'}`}>
                                  <span className="shrink-0 mt-0.5">{a.lvl === 'high' ? '▲' : a.lvl === 'warn' ? '⚠' : '●'}</span>
                                  <span>{a.msg}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          {alerts.length === 0 && <p className="text-[8px] text-slate-700">No active alerts</p>}
                        </div>
                      )
                    })}
                    <p className="text-[8px] text-slate-700 mt-1 text-center">Composite: WB stability + port-specific risk factors</p>
                  </div>
                )}
              </div>
            )
          })()}

          {/* Risk Panels */}
          <div className="flex flex-col gap-3">

            {/* Live Intelligence Brief */}
            {(intelLoading || intelBrief) && (
              <div className="bg-[#0a0a0a] border border-sky-500/20 p-4 rounded-xl">
                <h2 className="text-[10px] font-bold text-sky-400 tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
                  <Newspaper size={13} /> Live Trade Intelligence
                  {intelBrief && <span className="ml-auto text-[9px] text-slate-600">{intelBrief.articleCount} articles · {intelBrief.sourceCount} sources</span>}
                </h2>
                {intelLoading ? (
                  <div className="space-y-2">
                    <div className="h-2.5 bg-white/5 rounded animate-pulse w-full" />
                    <div className="h-2.5 bg-white/5 rounded animate-pulse w-4/5" />
                    <div className="h-2.5 bg-white/5 rounded animate-pulse w-3/5" />
                  </div>
                ) : intelBrief?.articles?.length > 0 ? (
                  <div className="space-y-2">
                    {intelBrief.articles.map((a, i) => (
                      <a key={i} href={a.url} target="_blank" rel="noopener noreferrer"
                        className="block group">
                        <div className="flex items-start gap-2">
                          <span className={`text-[8px] font-bold shrink-0 mt-0.5 ${a.tone < -3 ? 'text-rose-400' : a.tone < 0 ? 'text-amber-400' : 'text-emerald-400'}`}>●</span>
                          <div>
                            <p className="text-[11px] text-slate-300 leading-snug group-hover:text-white transition-colors">{a.title}</p>
                            <p className="text-[9px] text-slate-600 mt-0.5">{a.source}</p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-[10px] text-slate-600 italic">No recent trade news found.</p>
                )}
                <p className="text-[9px] text-slate-700 mt-3">GDELT · World Bank Political Stability Index</p>
              </div>
            )}

            {/* Global Threats */}
            <div className="bg-[#0a0a0a] border border-white/10 p-4 flex flex-col rounded-xl" data-tour="risks">
              <h2 className="text-[10px] font-bold text-rose-500 tracking-[0.2em] uppercase mb-3 flex items-center gap-2 shrink-0">
                <ShieldAlert size={14} /> Global Threats
                {risks.length > 0 && <span className="ml-auto text-[9px] text-slate-600">{risks.length} active</span>}
              </h2>
              <div className="space-y-2">
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
                      <div className="text-[12px] font-bold uppercase leading-snug">{r.title || r.risk}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sourcing Hubs */}
            <div className="bg-[#0a0a0a] border border-white/10 p-4 flex flex-col rounded-xl" data-tour="hubs">
              <h2 className="text-[10px] font-bold text-emerald-500 tracking-[0.2em] uppercase mb-3 flex items-center gap-2 shrink-0">
                <Factory size={14} /> Sourcing Hubs
                {opportunities.length > 0 && <span className="ml-auto text-[9px] text-slate-600">{opportunities.length} identified</span>}
              </h2>
              <div className="space-y-2">
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
                    <div className="text-[9px] text-emerald-400 font-bold mb-1 uppercase tracking-widest flex items-center gap-2">
                      {o.hub}
                      {(() => {
                        const iso2 = getHubISO2(o.hub)
                        const score = iso2 && intelBrief?.countryScores?.[iso2]
                        if (!score) return null
                        const c = score.stability >= 60 ? 'text-emerald-400' : score.stability >= 35 ? 'text-amber-400' : 'text-rose-400'
                        return <span className={`ml-auto font-mono text-[8px] ${c}`} title="World Bank Political Stability Score">◆ {score.stability}</span>
                      })()}
                    </div>
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
        <main className="flex flex-col gap-2 overflow-hidden min-w-0 shrink-0 lg:flex-1 lg:gap-4">

          {/* Globe */}
          <div className="h-[28vh] shrink-0 lg:h-auto lg:flex-1 bg-[#0a0a0a] border border-white/10 relative flex items-center justify-center overflow-hidden rounded-xl shadow-[inset_0_0_60px_rgba(0,0,0,1)] min-h-0" data-tour="globe">
            <div className="z-0 w-full h-full">
              <Globe risks={risks} opportunities={opportunities} autoRotate={autoRotate} />
            </div>

            {/* Globe controls — desktop only (overlaid on globe) */}
            <div className="hidden lg:flex absolute top-4 left-4 z-10 flex-col gap-2">
              <div className="flex items-center gap-2 bg-black/60 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md">
                <Activity size={12} className="text-emerald-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Live_Global_Stream</span>
              </div>
              <button onClick={() => setAutoRotate(!autoRotate)}
                className="flex items-center gap-2 bg-black/60 border border-white/10 px-3 py-1.5 hover:bg-sky-500/20 rounded-lg backdrop-blur-md transition-all text-white/70">
                {autoRotate ? <Pause size={12} /> : <Play size={12} />}
                <span className="text-[10px] font-bold uppercase tracking-widest">{autoRotate ? 'Pause' : 'Resume'}</span>
              </button>
              <button onClick={() => setShowTour(true)}
                className="flex items-center gap-2 bg-black/60 border border-white/10 px-3 py-1.5 hover:bg-sky-500/20 rounded-lg backdrop-blur-md transition-all text-white/50 hover:text-sky-400">
                <Map size={12} />
                <span className="text-[10px] font-bold uppercase tracking-widest">How it works</span>
              </button>
            </div>

            {/* Globe controls — mobile compact overlay (bottom strip, doesn't cover globe) */}
            <div className="lg:hidden absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between px-3 py-2 bg-black/70 backdrop-blur-sm">
              <div className="flex items-center gap-1.5">
                <Activity size={10} className="text-emerald-400" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400">Live Stream</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setAutoRotate(!autoRotate)}
                  className="flex items-center gap-1 bg-white/10 border border-white/10 px-2.5 py-1 rounded-lg text-white/70 active:bg-white/20 transition-all">
                  {autoRotate ? <Pause size={10} /> : <Play size={10} />}
                  <span className="text-[9px] font-bold uppercase">{autoRotate ? 'Pause' : 'Resume'}</span>
                </button>
                <button onClick={() => setShowTour(true)}
                  className="flex items-center gap-1 bg-white/10 border border-white/10 px-2.5 py-1 rounded-lg text-white/50 active:bg-white/20 transition-all">
                  <Map size={10} />
                  <span className="text-[9px] font-bold uppercase">Tour</span>
                </button>
              </div>
            </div>

            {/* ── STRATEGIC ADVISORY HUD ── */}
            <div className="hidden lg:flex absolute bottom-4 left-4 right-4 z-10 items-end justify-between gap-3">

              <div className="bg-black/95 border border-white/10 p-6 flex-1 shadow-[0_0_80px_rgba(0,0,0,0.9)] rounded-2xl backdrop-blur-xl min-w-0 border-t-sky-500/10" data-tour="directive">
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
                        {/* Turnover filter */}
                        <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                          <span className="text-[9px] text-slate-600 uppercase font-bold tracking-widest shrink-0">Size:</span>
                          {[null, '>$1B', '$100M-$1B', '$10M-$100M', '<$10M'].map(f => (
                            <button key={f ?? 'all'} onClick={() => setTurnoverFilter(f)}
                              className={`px-2 py-0.5 rounded text-[9px] font-bold border transition-all ${
                                turnoverFilter === f
                                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                                  : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-400'
                              }`}>
                              {f ?? 'All'}
                            </button>
                          ))}
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {(() => {
                            const filteredCompanies = (selectedNode.companies || []).filter(c =>
                              turnoverFilter === null || c.turnover === turnoverFilter
                            )
                            if (filteredCompanies.length === 0) {
                              return <p className="text-[10px] text-slate-600 italic col-span-3">No suppliers in this bracket for this hub.</p>
                            }
                            return filteredCompanies.map((c, i) => (
                              <a key={i} href={c.website || '#'} target="_blank" rel="noopener noreferrer"
                                className="text-[11px] text-slate-300 font-mono bg-white/5 p-3 border border-white/5 rounded-lg hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all flex items-center justify-between group">
                                <span className="truncate">{c.name}</span>
                                <div className="flex flex-col items-end gap-0.5 shrink-0 ml-1">
                                  {c.turnover && <span className="text-[8px] text-slate-600 font-mono">{c.turnover}</span>}
                                  <ExternalLink size={10} className="opacity-30 group-hover:opacity-100 text-emerald-400" />
                                </div>
                              </a>
                            ))
                          })()}
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
              <div className="flex flex-col gap-2 shrink-0" data-tour="tools">
                {/* Row 1 */}
                <div className="flex items-center gap-2 overflow-x-auto lg:flex-wrap lg:justify-end pb-0.5 no-scrollbar">
                  {[
                    { icon:<FileText size={12}/>,   label:'HS Code',    action:()=>setShowTariff(true),    color:'sky' },
                    { icon:<History size={12}/>,    label:`Archive (${missionHistory.length})`, action:()=>setShowHistory(true), color:'emerald' },
                    { icon:<BarChart3 size={12}/>,  label:'Compare',    action:()=>setShowComparison(true), color:'sky', disabled:opportunities.length < 2 },
                    { icon:<DollarSign size={12}/>, label:'TLC Calc',   action:()=>setShowTLC(true),       color:'emerald', disabled:opportunities.length === 0 },
                  ].map((t, i) => (
                    <button key={i} onClick={t.action} disabled={t.disabled}
                      className={`shrink-0 flex items-center gap-1.5 px-3 h-9 border rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all disabled:opacity-25
                        ${t.color==='emerald' ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10' : 'border-white/10 text-slate-400 hover:border-sky-500/30 hover:text-sky-400'}`}>
                      {t.icon}{t.label}
                    </button>
                  ))}
                </div>
                {/* Row 2 */}
                <div className="flex items-center gap-2 overflow-x-auto lg:flex-wrap lg:justify-end pb-0.5 no-scrollbar">
                  {[
                    { icon:<Scale size={12}/>,      label:'Incoterms',  action:()=>setShowIncoterms(true),  color:'purple' },
                    { icon:<ShieldAlert size={12}/>, label:'Risk Score', action:()=>setShowRisk(true),       color:'rose' },
                    { icon:<Anchor size={12}/>,     label:'Ports',      action:()=>setShowPorts(true),      color:'sky' },
                    { icon:<Zap size={12}/>,        label:'Compliance', action:()=>setShowCompliance(true), color:'amber' },
                  ].map((t, i) => (
                    <button key={i} onClick={t.action}
                      className={`shrink-0 flex items-center gap-1.5 px-3 h-9 border rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all
                        ${t.color==='rose'   ? 'border-rose-500/30 text-rose-400 hover:bg-rose-500/10' :
                          t.color==='purple' ? 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10' :
                          t.color==='amber'  ? 'border-amber-500/30 text-amber-400 hover:bg-amber-500/10' :
                          'border-white/10 text-slate-400 hover:border-sky-500/30 hover:text-sky-400'}`}>
                      {t.icon}{t.label}
                    </button>
                  ))}
                </div>
                {/* Row 3 — New Features */}
                <div className="flex items-center gap-2 overflow-x-auto lg:flex-wrap lg:justify-end pb-0.5 no-scrollbar" data-tour="new-tools">
                  {[
                    { icon:<Factory size={12}/>,  label:'BOM Analyzer',   action:()=>setShowBom(true),       color:'violet' },
                    { icon:<Shield size={12}/>,   label:'Sanctions',      action:()=>setShowSanctions(true), color:'rose' },
                    { icon:<Ship size={12}/>,     label:'Ocean Rates',    action:()=>setShowOcean(true),     color:'sky' },
                    { icon:<Leaf size={12}/>,     label:'FTA Check',      action:()=>setShowFta(true),       color:'emerald' },
                  ].map((t, i) => (
                    <button key={i} onClick={t.action}
                      className={`shrink-0 flex items-center gap-1.5 px-3 h-9 border rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all
                        ${t.color==='violet'  ? 'border-violet-500/30 text-violet-400 hover:bg-violet-500/10' :
                          t.color==='rose'    ? 'border-rose-500/30 text-rose-400 hover:bg-rose-500/10' :
                          t.color==='emerald' ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10' :
                          'border-white/10 text-slate-400 hover:border-sky-500/30 hover:text-sky-400'}`}>
                      {t.icon}{t.label}
                    </button>
                  ))}
                </div>
                {/* Primary CTAs */}
                <div className="flex items-center gap-2 justify-end" data-tour="pdf">
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
            MOBILE — TAB LAYOUT (lg:hidden)
        ════════════════════════════════════ */}
        <div className="lg:hidden flex flex-col flex-1 min-h-0 border border-white/10 rounded-xl overflow-hidden bg-[#0a0a0a]">

          {/* ── Tab Bar ── */}
          <div className="flex shrink-0 border-b border-white/10 bg-[#080808]">
            {[
              { id: 'intel',   label: 'Intel',   icon: <Zap size={13}/> },
              { id: 'hubs',    label: opportunities.length > 0 ? `Hubs (${opportunities.length})` : 'Hubs', icon: <Factory size={13}/> },
              { id: 'threats', label: risks.length > 0 ? `Threats (${risks.length})` : 'Threats', icon: <ShieldAlert size={13}/> },
              { id: 'tools',   label: 'Tools',   icon: <Target size={13}/> },
            ].map(tab => (
              <button key={tab.id}
                onClick={() => { setActiveMobileTab(tab.id); setSelectedNode(null) }}
                className={`flex-1 flex flex-col items-center gap-1 py-3 text-[9px] font-bold uppercase tracking-wider transition-all border-b-2 ${
                  activeMobileTab === tab.id
                    ? 'border-sky-500 text-sky-400 bg-sky-500/5'
                    : 'border-transparent text-slate-500 active:text-slate-300'
                }`}>
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* ── Tab Content ── */}
          <div className="flex-1 overflow-y-auto p-3 pb-20 space-y-3">

            {/* ── INTEL TAB ── */}
            {activeMobileTab === 'intel' && (
              <>
                {opportunities.length === 0 ? (
                  <div className="space-y-2 pt-1">
                    <p className="text-[9px] text-slate-600 uppercase tracking-widest font-bold mb-3">Try an example scan:</p>
                    {[
                      'IATF-certified brake pads for passenger vehicles',
                      'Neodymium magnets for EV motor assembly',
                      'Food-grade soy for QSR supply chain',
                      'Semiconductor wafers for automotive ECU',
                    ].map((q) => (
                      <button key={q} onClick={() => handleSearch(null, q)}
                        className="w-full text-left text-[11px] text-slate-500 hover:text-emerald-400 active:text-emerald-400 border border-white/5 hover:border-emerald-500/30 active:border-emerald-500/30 bg-[#111] hover:bg-emerald-500/5 active:bg-emerald-500/5 p-3 rounded-lg transition-all leading-snug">
                        → {q}
                      </button>
                    ))}
                  </div>
                ) : (
                  <>
                    {directive && (
                      <div className="bg-[#111] border border-sky-500/20 p-4 rounded-xl space-y-3">
                        <div className="text-[9px] font-bold text-sky-400 tracking-[0.3em] uppercase flex items-center gap-2">
                          <Zap size={11}/> Strategic Advisory
                        </div>
                        <p className="text-[12px] text-slate-300 leading-relaxed">{directive.summary}</p>
                        {directive.tariff_alert && (
                          <p className="text-[11px] text-amber-400 font-mono border-t border-white/5 pt-3">{directive.tariff_alert}</p>
                        )}
                      </div>
                    )}
                    <div className="bg-[#111] border border-white/5 p-4 rounded-xl">
                      <div className="text-[9px] font-bold text-sky-400 tracking-[0.2em] uppercase flex items-center gap-2 mb-3">
                        <BarChart3 size={11}/> Metals &amp; Materials
                        <div className="ml-auto flex items-center gap-1">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-[10px] text-slate-500 font-mono">{metalsTs}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          { n:'Brent',   p:'$89.24', c:'+1.2%', up:true,  spark:[68,72,70,74,71,76,74] },
                          { n:'Copper',  p:'$4.12',  c:'+2.4%', up:true,  spark:[58,60,57,62,63,65,68] },
                          { n:'Alum.',   p:'$2,350', c:'+0.5%', up:true,  spark:[72,70,73,71,74,72,74] },
                          { n:'Nickel',  p:'$18.4k', c:'-0.9%', up:false, spark:[80,77,75,78,74,72,70] },
                          { n:'R.Earth', p:'$142',   c:'+6.8%', up:true,  spark:[42,48,52,55,60,65,72] },
                          { n:'Steel',   p:'$840',   c:'-0.8%', up:false, spark:[75,73,76,72,70,68,67] },
                        ].map((item, i) => {
                          const mn = Math.min(...item.spark), mx = Math.max(...item.spark)
                          const pts = item.spark.map((v, j) => {
                            const x = (j / (item.spark.length - 1)) * 44
                            const y = 10 - ((v - mn) / (mx - mn + 0.01)) * 8
                            return `${x},${y}`
                          }).join(' ')
                          return (
                            <div key={i} className={`bg-[#0a0a0a] border rounded-lg p-2 text-center ${item.up ? 'border-emerald-500/10' : 'border-rose-500/10'}`}>
                              <div className="text-[7px] text-slate-600 uppercase font-bold mb-0.5 truncate">{item.n}</div>
                              <svg width="44" height="12" viewBox="0 0 44 12" className="mx-auto mb-0.5 opacity-70">
                                <polyline points={pts} fill="none" stroke={item.up ? '#34d399' : '#f87171'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <div className="text-[11px] font-bold text-white font-mono">{item.p}</div>
                              <div className={`text-[9px] font-bold ${item.up ? 'text-emerald-400' : 'text-rose-400'}`}>{item.c}</div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    {fxData?.rates && (
                      <div className="bg-[#111] border border-white/5 p-4 rounded-xl space-y-2">
                        <div className="text-[9px] font-bold text-purple-400 tracking-[0.2em] uppercase mb-2">Live FX Rates</div>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(fxData.rates).slice(0, 6).map(([code, info]) => (
                            <div key={code} className="bg-[#0a0a0a] border border-white/5 p-2.5 rounded-lg">
                              <div className="text-[8px] text-slate-600 uppercase font-bold mb-0.5">{code}</div>
                              <div className="text-[14px] font-bold text-white font-mono">{typeof info === 'object' ? info.rate : info}</div>
                              {info.label && <div className="text-[8px] text-slate-600 leading-tight">{info.label}</div>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <button onClick={() => setShowSearch(true)}
                      className="w-full py-3 bg-sky-500 text-black font-bold uppercase text-[11px] rounded-xl tracking-widest flex items-center justify-center gap-2 transition-all active:bg-sky-400">
                      New Mission <SearchCode size={13}/>
                    </button>
                  </>
                )}
              </>
            )}

            {/* ── HUBS TAB ── */}
            {activeMobileTab === 'hubs' && (
              <>
                {/* Hub detail view */}
                {selectedNode && isOpportunity ? (
                  <div className="space-y-3">
                    <button onClick={() => setSelectedNode(null)}
                      className="flex items-center gap-2 text-[10px] text-slate-400 active:text-sky-400 font-bold uppercase tracking-wider transition-all w-full bg-white/5 rounded-xl px-4 py-3">
                      <ChevronRight size={14} className="rotate-180 shrink-0"/> Back to Hubs
                    </button>
                    <div className="bg-[#111] border border-emerald-500/30 p-4 rounded-xl space-y-1">
                      <div className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">{selectedNode.hub}</div>
                      <div className="text-[14px] font-bold uppercase text-white leading-snug">{selectedNode.title}</div>
                      <p className="text-[11px] text-slate-400 leading-relaxed pt-1">{selectedNode.desc}</p>
                    </div>
                    {selectedNode.esg && (
                      <div className="bg-[#111] border border-emerald-500/20 p-4 rounded-xl flex items-center gap-3">
                        <div className="text-[32px] font-bold text-white shrink-0">{selectedNode.esg.ethical_rating}</div>
                        <div className="min-w-0">
                          <div className="text-[9px] text-emerald-400 font-bold uppercase mb-0.5">ESG · {selectedNode.esg.carbon_footprint}</div>
                          <p className="text-[10px] text-slate-500 italic leading-snug">{selectedNode.esg.sustainability_note}</p>
                        </div>
                      </div>
                    )}
                    {selectedNode.customs && (
                      <div className="bg-[#111] border border-sky-500/20 p-4 rounded-xl">
                        <div className="text-[9px] text-sky-400 font-bold uppercase mb-3 flex items-center gap-1.5"><FileText size={10}/> Regulatory</div>
                        <div className="grid grid-cols-2 gap-3">
                          <div><div className="text-[8px] text-slate-600 uppercase mb-0.5">HTS Code</div><div className="text-[14px] font-mono text-white">{selectedNode.customs.hts_code}</div></div>
                          <div><div className="text-[8px] text-slate-600 uppercase mb-0.5">Duty Rate</div><div className="text-[14px] font-mono text-emerald-400 font-bold">{selectedNode.customs.duty_rate}</div></div>
                          <div><div className="text-[8px] text-slate-600 uppercase mb-0.5">Lead Time</div><div className="text-[13px] font-mono text-white">{selectedNode.logistics?.port_wait_days ?? 'N/A'} days</div></div>
                          <div><div className="text-[8px] text-slate-600 uppercase mb-0.5">Est. Freight</div><div className="text-[13px] font-mono text-white">{selectedNode.logistics?.freight_cost_estimate || 'TBD'}</div></div>
                        </div>
                        {selectedNode.customs.compliance_note && (
                          <p className="text-[10px] text-slate-500 border-t border-white/5 mt-3 pt-3 leading-relaxed">{selectedNode.customs.compliance_note}</p>
                        )}
                      </div>
                    )}
                    {selectedNode.real_export_value_usd && (
                      <div className="bg-sky-500/10 border border-sky-500/25 p-3 rounded-xl flex items-center gap-3">
                        <CheckCircle size={16} className="text-sky-400 shrink-0"/>
                        <div>
                          <div className="text-[8px] text-sky-400 uppercase font-bold tracking-widest">UN Comtrade Official Data</div>
                          <div className="text-[13px] font-bold text-white">${(selectedNode.real_export_value_usd / 1e6).toLocaleString(undefined, {maximumFractionDigits:0})}M exported in {selectedNode.real_trade_data_year}</div>
                        </div>
                      </div>
                    )}
                    {selectedNode.companies?.length > 0 && (
                      <div className="bg-[#111] border border-white/5 p-4 rounded-xl space-y-2">
                        <div className="text-[9px] font-bold text-emerald-400 uppercase mb-1 flex items-center gap-1.5"><Factory size={10}/> Key Suppliers</div>
                        {selectedNode.companies.slice(0, 6).map((c, i) => (
                          <a key={i} href={c.website || '#'} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 bg-[#0a0a0a] border border-white/5 rounded-lg hover:border-emerald-500/30 transition-all">
                            <span className="text-[11px] text-slate-300 font-mono truncate">{c.name}</span>
                            <div className="flex items-center gap-1 shrink-0 ml-2">
                              {c.turnover && <span className="text-[8px] text-slate-600">{c.turnover}</span>}
                              <ExternalLink size={10} className="text-emerald-400 opacity-60"/>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button onClick={() => setShowTLC(true)} className="py-4 text-[11px] font-bold uppercase border border-emerald-500/30 text-emerald-400 rounded-xl active:bg-emerald-500/10 transition-all">TLC Calc</button>
                      <button onClick={() => setShowRFQ(true)} className="py-4 text-[11px] font-bold uppercase bg-sky-500 text-black rounded-xl active:bg-sky-400 transition-all">Generate RFQ</button>
                    </div>
                  </div>
                ) : (
                  /* Hubs list */
                  <div className="space-y-2">
                    {opportunities.length === 0 ? (
                      <div className="space-y-3 pt-1">
                        <p className="text-[11px] text-slate-600 italic">Run a mission scan to identify and rank sourcing hubs for your material.</p>
                        <button onClick={() => setShowSearch(true)}
                          className="w-full py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold uppercase text-[10px] rounded-xl hover:bg-emerald-500/15 active:bg-emerald-500/20 transition-all flex items-center justify-center gap-2">
                          <Factory size={12}/> Find Sourcing Hubs
                        </button>
                      </div>
                    ) : opportunities.map((o, i) => (
                      <button key={o.id || i} onClick={() => setSelectedNode(o)}
                        className="w-full text-left p-4 bg-[#111] border border-white/5 active:border-emerald-500/30 active:bg-emerald-500/5 rounded-xl transition-all">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">{o.hub}</div>
                          <ChevronRight size={14} className="text-slate-600"/>
                        </div>
                        <div className="text-[13px] font-bold uppercase leading-tight text-white">{o.title}</div>
                        <div className="flex items-center gap-3 mt-2">
                          {o.customs?.duty_rate && <span className="text-[10px] text-slate-500 font-mono">Duty: {o.customs.duty_rate}</span>}
                          {o.logistics?.port_wait_days !== undefined && <span className="text-[10px] text-slate-500 font-mono">Lead: {o.logistics.port_wait_days}d</span>}
                          {o.real_export_value_usd && <span className="text-[10px] text-sky-400 font-mono flex items-center gap-0.5"><CheckCircle size={9}/> ${(o.real_export_value_usd/1e6).toFixed(0)}M</span>}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* ── THREATS TAB ── */}
            {activeMobileTab === 'threats' && (
              <>
                {/* Risk detail view */}
                {selectedNode && isRisk ? (
                  <div className="space-y-3">
                    <button onClick={() => setSelectedNode(null)}
                      className="flex items-center gap-2 text-[10px] text-slate-400 active:text-sky-400 font-bold uppercase tracking-wider transition-all w-full bg-white/5 rounded-xl px-4 py-3">
                      <ChevronRight size={14} className="rotate-180 shrink-0"/> Back to Threats
                    </button>
                    <div className={`p-4 rounded-xl border space-y-3 ${
                      selectedNode.severity === 'CRITICAL' ? 'bg-red-900/10 border-red-500/30' :
                      selectedNode.severity === 'HIGH' ? 'bg-rose-900/10 border-rose-500/30' :
                      'bg-amber-900/10 border-amber-500/30'
                    }`}>
                      <div className="flex items-start gap-2">
                        <span className={`text-[8px] font-bold px-2 py-1 rounded border shrink-0 ${severityStyle(selectedNode.severity)}`}>
                          {selectedNode.severity || 'RISK'}
                        </span>
                        <div className="text-[14px] font-bold uppercase text-white leading-snug">{selectedNode.title || selectedNode.risk}</div>
                      </div>
                      <p className="text-[12px] text-slate-300 leading-relaxed">{selectedNode.desc}</p>
                    </div>
                    {selectedNode.mitigation && (
                      <div className="bg-[#111] border border-sky-500/20 p-4 rounded-xl space-y-2">
                        <div className="text-[9px] text-sky-400 uppercase font-bold tracking-widest flex items-center gap-1.5"><CheckCircle size={10}/> Mitigation Strategy</div>
                        <p className="text-[12px] text-slate-200 leading-relaxed">{selectedNode.mitigation}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button onClick={() => setShowCompliance(true)}
                        className="py-4 text-[11px] font-bold uppercase border border-amber-500/30 text-amber-400 rounded-xl active:bg-amber-500/10 transition-all">
                        Compliance Check
                      </button>
                      <button onClick={() => setShowRisk(true)}
                        className="py-4 text-[11px] font-bold uppercase bg-rose-500 text-white rounded-xl active:bg-rose-600 transition-all">
                        Risk Score
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Threats list */
                  <div className="space-y-2">
                    {/* Live Intel Brief — mobile */}
                    {(intelLoading || intelBrief) && (
                      <div className="bg-[#0a0a0a] border border-sky-500/20 p-4 rounded-xl">
                        <div className="text-[10px] font-bold text-sky-400 tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
                          <Newspaper size={12} /> Live Trade Intelligence
                          {intelBrief && <span className="ml-auto text-[9px] text-slate-600">{intelBrief.articleCount} articles</span>}
                        </div>
                        {intelLoading ? (
                          <div className="space-y-1.5">
                            <div className="h-2.5 bg-white/5 rounded animate-pulse w-full" />
                            <div className="h-2.5 bg-white/5 rounded animate-pulse w-4/5" />
                            <div className="h-2.5 bg-white/5 rounded animate-pulse w-3/5" />
                          </div>
                        ) : intelBrief?.articles?.length > 0 ? (
                          <div className="space-y-2">
                            {intelBrief.articles.slice(0, 4).map((a, i) => (
                              <a key={i} href={a.url} target="_blank" rel="noopener noreferrer" className="block group">
                                <div className="flex items-start gap-2">
                                  <span className={`text-[8px] font-bold shrink-0 mt-0.5 ${a.tone < -3 ? 'text-rose-400' : a.tone < 0 ? 'text-amber-400' : 'text-emerald-400'}`}>●</span>
                                  <div>
                                    <p className="text-[11px] text-slate-300 leading-snug group-active:text-white transition-colors">{a.title}</p>
                                    <p className="text-[9px] text-slate-600 mt-0.5">{a.source}</p>
                                  </div>
                                </div>
                              </a>
                            ))}
                          </div>
                        ) : null}
                        <p className="text-[9px] text-slate-700 mt-2">GDELT · World Bank</p>
                      </div>
                    )}
                    {risks.length === 0 ? (
                      <div className="space-y-3 pt-1">
                        <p className="text-[11px] text-slate-600 italic">Run a mission scan to surface active threats and compliance risks for your sourcing context.</p>
                        <button onClick={() => setShowSearch(true)}
                          className="w-full py-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold uppercase text-[10px] rounded-xl hover:bg-rose-500/15 active:bg-rose-500/20 transition-all flex items-center justify-center gap-2">
                          <ShieldAlert size={12}/> Run Threat Scan
                        </button>
                      </div>
                    ) : risks.map((r, i) => (
                      <button key={r.id || i} onClick={() => setSelectedNode(r)}
                        className="w-full text-left p-4 bg-[#111] border border-white/5 active:border-rose-500/30 active:bg-rose-500/5 rounded-xl transition-all">
                        <div className="flex items-start gap-3">
                          <span className={`text-[8px] font-bold px-2 py-1 rounded border shrink-0 mt-0.5 ${severityStyle(r.severity)}`}>
                            {r.severity || 'RISK'}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-bold uppercase leading-snug text-white">{r.title || r.risk}</div>
                            {r.desc && <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2">{r.desc}</p>}
                          </div>
                          <ChevronRight size={14} className="text-slate-600 shrink-0 mt-1"/>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* ── TOOLS TAB ── */}
            {activeMobileTab === 'tools' && (
              <div className="space-y-3">
                {/* Always-visible primary actions */}
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setShowSearch(true)}
                    className="flex items-center justify-center gap-2 py-3.5 bg-sky-500 text-black rounded-xl text-[10px] font-bold uppercase tracking-wider">
                    <SearchCode size={13}/> New Mission
                  </button>
                  <button onClick={exportToPDF} disabled={isExportingPDF || opportunities.length === 0}
                    className="flex items-center justify-center gap-2 py-3.5 bg-[#111] border border-white/10 text-slate-400 rounded-xl text-[10px] font-bold uppercase tracking-wider disabled:opacity-30">
                    <Download size={13}/> {isExportingPDF ? 'Generating...' : 'Export PDF'}
                  </button>
                </div>

                {/* Generate RFQ — primary CTA when scan has results */}
                {opportunities.length > 0 && (
                  <button onClick={() => setShowRFQ(true)}
                    className="w-full py-3.5 flex items-center justify-center gap-2 bg-emerald-500 text-black rounded-xl text-[10px] font-bold uppercase tracking-wider active:bg-emerald-400 transition-all">
                    <Mail size={13}/> Generate RFQ
                  </button>
                )}

                <div className="text-[8px] text-slate-600 uppercase font-bold tracking-widest pt-1">Intelligence Tools</div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'TLC Calculator',  icon: <DollarSign size={15}/>,  color: 'emerald', action: () => setShowTLC(true),         needsScan: false },
                    { label: 'Risk Score',       icon: <ShieldAlert size={15}/>, color: 'rose',    action: () => setShowRisk(true),        needsScan: false },
                    { label: 'HS Code Lookup',   icon: <FileText size={15}/>,    color: 'amber',   action: () => setShowTariff(true),      needsScan: false },
                    { label: 'Port Monitor',     icon: <Anchor size={15}/>,      color: 'sky',     action: () => setShowPorts(true),       needsScan: false },
                    { label: 'Incoterms 2020',   icon: <Ship size={15}/>,        color: 'purple',  action: () => setShowIncoterms(true),   needsScan: false },
                    { label: 'Compliance',       icon: <CheckCircle size={15}/>, color: 'emerald', action: () => setShowCompliance(true),  needsScan: false },
                    { label: 'Compare Regions',  icon: <Scale size={15}/>,       color: 'purple',  action: () => setShowComparison(true),  needsScan: true,  disabled: opportunities.length < 2 },
                    { label: 'Mission Archive',  icon: <History size={15}/>,     color: 'slate',   action: () => setShowHistory(true),     needsScan: false },
                    { label: 'BOM Analyzer',     icon: <Factory size={15}/>,     color: 'violet',  action: () => setShowBom(true),         needsScan: false },
                    { label: 'Sanctions Check',  icon: <Shield size={15}/>,      color: 'rose',    action: () => setShowSanctions(true),   needsScan: false },
                    { label: 'Ocean Rates',      icon: <Anchor size={15}/>,      color: 'sky',     action: () => setShowOcean(true),       needsScan: false },
                    { label: 'FTA Eligibility',  icon: <Leaf size={15}/>,        color: 'emerald', action: () => setShowFta(true),         needsScan: false },
                  ].map((t, i) => (
                    <button key={i} onClick={t.disabled ? undefined : t.action} disabled={t.disabled}
                      className={`flex flex-col items-center justify-center gap-2 p-5 rounded-xl border transition-all relative ${
                        t.disabled
                          ? 'bg-white/5 border-white/5 text-slate-700 cursor-not-allowed'
                          : t.color === 'emerald' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400 active:bg-emerald-500/20' :
                            t.color === 'rose'    ? 'bg-rose-500/5 border-rose-500/20 text-rose-400 active:bg-rose-500/20' :
                            t.color === 'sky'     ? 'bg-sky-500/5 border-sky-500/20 text-sky-400 active:bg-sky-500/20' :
                            t.color === 'amber'   ? 'bg-amber-500/5 border-amber-500/20 text-amber-400 active:bg-amber-500/20' :
                            t.color === 'purple'  ? 'bg-purple-500/5 border-purple-500/20 text-purple-400 active:bg-purple-500/20' :
                            t.color === 'violet'  ? 'bg-violet-500/5 border-violet-500/20 text-violet-400 active:bg-violet-500/20' :
                            'bg-white/5 border-white/10 text-slate-400 active:bg-white/10'
                      }`}>
                      {t.icon}
                      <span className="text-[9px] font-bold uppercase tracking-wider text-center leading-tight">{t.label}</span>
                      {t.disabled && t.needsScan && (
                        <span className="absolute top-1.5 right-1.5 text-[8px] font-bold text-slate-700 uppercase">2+ hubs</span>
                      )}
                    </button>
                  ))}
                </div>

              </div>
            )}

          </div>
        </div>

        {/* ════════════════════════════════════
            RIGHT SIDEBAR
        ════════════════════════════════════ */}
        <aside className="hidden lg:flex w-96 flex-col gap-4 shrink-0 z-10 overflow-y-auto custom-scrollbar pr-1">

          {/* Metals & Materials */}
          <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl shadow-xl shrink-0" data-tour="market">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[11px] font-bold text-sky-400 tracking-[0.2em] uppercase flex items-center gap-2">
                <BarChart3 size={14} /> Metals &amp; Materials
              </h2>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-slate-500 font-mono">{metalsTs}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { n:'Brent Crude', p:'$89.24', u:'/bbl', c:'+1.2%', up:true,  spark:[68,72,70,74,71,76,74] },
                { n:'Copper',      p:'$4.12',  u:'/lb',  c:'+2.4%', up:true,  spark:[58,60,57,62,63,65,68] },
                { n:'Aluminum',    p:'$2,350', u:'/mt',  c:'+0.5%', up:true,  spark:[72,70,73,71,74,72,74] },
                { n:'Nickel',      p:'$18.4k', u:'/mt',  c:'-0.9%', up:false, spark:[80,77,75,78,74,72,70] },
                { n:'Rare Earth',  p:'$142',   u:'/kg',  c:'+6.8%', up:true,  spark:[42,48,52,55,60,65,72] },
                { n:'HRC Steel',   p:'$840',   u:'/st',  c:'-0.8%', up:false, spark:[75,73,76,72,70,68,67] },
              ].map((item, i) => {
                const min = Math.min(...item.spark), max = Math.max(...item.spark)
                const pts = item.spark.map((v, j) => {
                  const x = (j / (item.spark.length - 1)) * 56
                  const y = 16 - ((v - min) / (max - min + 0.01)) * 14
                  return `${x},${y}`
                }).join(' ')
                return (
                  <div key={i} className={`bg-[#111] border rounded-lg p-2.5 transition-all ${item.up ? 'border-emerald-500/10 hover:border-emerald-500/25' : 'border-rose-500/10 hover:border-rose-500/25'}`}>
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <div className="text-[10px] text-slate-500 uppercase font-bold truncate leading-tight">{item.n}</div>
                      <svg width="58" height="18" viewBox="0 0 58 18" className="shrink-0 opacity-60">
                        <polyline points={pts} fill="none" stroke={item.up ? '#34d399' : '#f87171'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="text-[13px] font-bold text-white font-mono leading-none">{item.p}<span className="text-[10px] text-slate-600">{item.u}</span></div>
                    <div className={`text-[10px] font-bold mt-0.5 flex items-center gap-1 ${item.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {item.up ? <ArrowUpRight size={10}/> : <ArrowDownRight size={10}/>}{item.c}
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="text-[9px] text-slate-700 mt-2">Indicative reference prices — verify with exchange terminal.</p>
          </div>

          {/* Live FX Rates */}
          {fxData && (
            <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl shadow-xl shrink-0" data-tour="fx">
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
                      <div className="text-[10px] text-slate-600 mt-0.5 leading-tight">
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
                  className={`px-2 py-0.5 text-[10px] font-bold rounded transition-all flex items-center gap-1 ${
                    newsFilter === 'mission'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-600 hover:text-emerald-400 border border-white/5'
                  }`}>
                  ⚡ Mission
                </button>
              )}
              {[['all','All'],['china','🇨🇳'],['eu','🇪🇺'],['usa','🇺🇸'],['latam','🌎'],['india','🇮🇳']].map(([key, label]) => (
                <button key={key} onClick={() => setNewsFilter(key)}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded transition-all ${
                    newsFilter === key
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      : 'text-slate-700 hover:text-slate-400'
                  }`}>
                  {label}
                </button>
              ))}
              <span className="ml-auto text-[10px] text-slate-700 font-mono">{filteredNews.length}</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar min-h-0">
              {filteredNews.length === 0 ? (
                <p className="text-[10px] text-slate-700 italic py-2">
                  {newsFilter === 'mission' ? 'No news loaded yet — run a mission scan first.' : 'No articles match this filter.'}
                </p>
              ) : filteredNews.map((item, i) => (
                <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
                  className="block border-b border-white/5 pb-3 last:border-0 group">
                  <div className="text-[10px] text-slate-600 font-bold mb-1 uppercase tracking-widest flex items-center justify-between">
                    <span className="flex items-center gap-1">{item._mission && <span className="text-emerald-400">⚡</span>}{item.pubDate}</span>
                    <ExternalLink size={9} className="opacity-0 group-hover:opacity-100 text-sky-400 transition-all" />
                  </div>
                  <h3 className="text-xs font-bold leading-snug mb-0.5 group-hover:text-sky-400 transition-all uppercase tracking-tight text-slate-200">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-sans">{item.description}</p>
                </a>
              ))}
            </div>
          </div>

        </aside>
      </div>

      {/* System health pill — desktop only */}
      <div className="hidden lg:flex fixed bottom-5 left-5 z-[120] items-center gap-2 bg-black/80 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md shadow-2xl">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">System_Integrity: 100%</span>
      </div>

    </div>
  )
}