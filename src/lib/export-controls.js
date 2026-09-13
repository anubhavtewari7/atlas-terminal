const ECCN_RULES = [
  // ── Category 0: Nuclear & Miscellaneous ──
  {
    eccn: '0A001', level: 'CONTROLLED', regime: ['NSG','NTL'],
    keywords: ['nuclear reactor','fission','enrichment','uranium','plutonium','heavy water','centrifuge cascade','nuclear fuel','subcritical assembly','nuclear weapon'],
    title: 'Nuclear reactors & equipment',
    desc: 'Export license required for virtually all destinations. BIS/DOE coordination required. Extremely restricted.',
    action: 'Do NOT export without specific DOE/BIS authorization. Legal counsel required.',
    color: 'rose',
  },
  // ── Category 1: Materials, Chemicals, Microorganisms, Toxins ──
  {
    eccn: '1C350', level: 'CONTROLLED', regime: ['CWC','AG'],
    keywords: ['chemical weapon','nerve agent','mustard gas','sarin','vx agent','tabun','precursor chemical','thiodiglycol','phosphorus trichloride','phosphorus oxychloride','triethanolamine','dimethyl methylphosphonate'],
    title: 'Chemical weapon precursors',
    desc: 'Australia Group / CWC Schedule 1-2-3 precursors. License required for all destinations.',
    action: 'License required from BIS. Contact your export compliance team immediately.',
    color: 'rose',
  },
  {
    eccn: '1C010', level: 'CONTROLLED', regime: ['NSG','MT'],
    keywords: ['carbon fiber structural','carbon fibre structural','aramid fiber composite','kevlar composite','graphite fiber aerospace','high-modulus carbon','pitch-based carbon'],
    title: 'Advanced composite materials',
    desc: 'High-performance carbon/aramid fiber for aerospace and missile applications. MT/NSG controls apply.',
    action: 'Verify end-use and end-user. License likely required for controlled countries.',
    color: 'amber',
  },
  // ── Category 2: Materials Processing ──
  {
    eccn: '2B001', level: 'CONTROLLED', regime: ['WA','NSG'],
    keywords: ['cnc machine tool','5-axis machining','multi-axis cnc','precision lathe','electrical discharge machine','edm machine','ultra-precision turning','laser cutting 0.1 micron','ion beam machining'],
    title: 'Machine tools (precision CNC)',
    desc: 'High-precision machine tools controlled under Wassenaar Arrangement. License required for certain destinations.',
    action: 'Check accuracy specifications against EAR §742.4 thresholds before export.',
    color: 'amber',
  },
  // ── Category 3: Electronics ──
  {
    eccn: '3A001', level: 'CONTROLLED', regime: ['WA'],
    keywords: ['asic defense','radiation-hardened','rad-hard','space-grade processor','high-reliability semiconductor','itar chip','defense chip','military ic','milspec ic','mil-spec semiconductor'],
    title: 'Advanced/defense electronic components',
    desc: 'Defense or space-grade electronics. Wassenaar and potentially ITAR dual-use controls.',
    action: 'Classify by performance specs. License required for many non-allied destinations.',
    color: 'amber',
  },
  {
    eccn: '3A090', level: 'POSSIBLE', regime: ['WA','CCL'],
    keywords: ['advanced chip','a100 gpu','h100 gpu','high-bandwidth memory','hbm chip','advanced ai chip','high-performance ai accelerator','neural processing unit','300mm wafer advanced'],
    title: 'Advanced computing semiconductors',
    desc: 'Recently added EAR controls (Oct 2023+) on advanced AI chips and HBM. Strict China/Russia restrictions.',
    action: 'Check BIS Entity List and October 2023 IFR rules before shipping to China, Russia, or their affiliates.',
    color: 'amber',
  },
  // ── Category 4: Computers ──
  {
    eccn: '4A003', level: 'POSSIBLE', regime: ['WA'],
    keywords: ['high performance computer','supercomputer','hpc cluster','data center gpu cluster','petaflop','exaflop','aggregate performance','top500'],
    title: 'High-performance computers',
    desc: 'Computers exceeding BIS performance thresholds require license for certain destinations.',
    action: 'Evaluate against APP thresholds in EAR Part 774, ECCN 4A003.',
    color: 'amber',
  },
  // ── Category 5: Telecommunications & Information Security ──
  {
    eccn: '5A002', level: 'POSSIBLE', regime: ['WA'],
    keywords: ['encryption hardware','cryptographic module','aes-256 hardware','hsm module','quantum key distribution','qkd system','secure communication module','fips 140','end-to-end encryption hardware','vpn appliance'],
    title: 'Encryption / information security equipment',
    desc: 'Hardware with non-standard encryption may require EAR classification and self-classification filing.',
    action: 'File annual self-classification report with BIS. May need license for embargoed countries.',
    color: 'amber',
  },
  // ── Category 7: Navigation & Avionics ──
  {
    eccn: '7A001', level: 'CONTROLLED', regime: ['WA','MT'],
    keywords: ['inertial navigation system','ins ','gyroscope high performance','accelerometer precision','navigation sensor aerospace','ring laser gyro','fiber optic gyroscope','mems imu aerospace','ins/gps integrated','attitude heading reference'],
    title: 'Inertial navigation / avionics',
    desc: 'High-accuracy INS and IMUs are Wassenaar + MTCR controlled. Often ITAR if designed for missiles.',
    action: 'Determine if ITAR or EAR applies. Most precision INS are USML Category XV or ECCN 7A001.',
    color: 'rose',
  },
  {
    eccn: '7A002', level: 'CONTROLLED', regime: ['WA','MT'],
    keywords: ['accelerometer missile','gyroscope missile','guided missile','ballistic trajectory','missile guidance','unmanned aerial vehicle payload','uav autopilot','drone guidance','range 300km','cruise missile'],
    title: 'Missile guidance components',
    desc: 'MTCR Annex Category I/II — missile guidance, cruise missiles, capable UAVs. Extreme restriction.',
    action: 'Likely ITAR USML Category IV or XV. Full State Dept licensing required. Attorney required.',
    color: 'rose',
  },
  // ── Category 9: Aerospace & Propulsion ──
  {
    eccn: '9A004', level: 'CONTROLLED', regime: ['WA','NSG','MT'],
    keywords: ['rocket engine','rocket motor','solid propellant','liquid propellant','hypersonic','re-entry vehicle','launch vehicle','space launch','orbital vehicle','sounding rocket','jet engine military'],
    title: 'Rocket / space launch propulsion',
    desc: 'Rocket engines and propulsion components. NSG, MTCR, and Wassenaar all apply.',
    action: 'ITAR or EAR depending on design. State/Commerce license mandatory for virtually all foreign recipients.',
    color: 'rose',
  },
  // ── ITAR — US Munitions List ──
  {
    eccn: 'USML', level: 'ITAR', regime: ['ITAR','USML'],
    keywords: ['itar','usml','military firearm','military weapon','m16','m4 rifle','artillery','howitzer','mortar','tank component','armored vehicle','night vision military','thermal weapon sight','military explosive','detonator','military drone','combat drone','weapon system'],
    title: 'US Munitions List (ITAR)',
    desc: 'Subject to ITAR. Export requires State Department Directorate of Defense Trade Controls (DDTC) license.',
    action: 'Register with DDTC. No export, re-export, or transfer without prior DDTC authorization. Penalties: up to $1M/violation.',
    color: 'rose',
  },
  // ── Dual-use electronics / sensors ──
  {
    eccn: '6A002', level: 'POSSIBLE', regime: ['WA'],
    keywords: ['infrared sensor','thermal imaging camera','focal plane array','fpa sensor','lidar defense','laser rangefinder','hyperspectral sensor','night vision camera','short-wave infrared','swir camera','uncooled microbolometer'],
    title: 'Sensors / lasers / thermal imaging',
    desc: 'Thermal/IR sensors with performance above EAR thresholds. Wassenaar dual-use controls.',
    action: 'Compare specs against ECCN 6A002 parameters. License likely for Russia, China, and arms-embargoed countries.',
    color: 'amber',
  },
]

// ── EAR99 positive signals (no control likely) ────────────────────────────
const EAR99_SIGNALS = [
  'commodity part','commercial off the shelf','cots','standard fastener','commercial bolt',
  'standard bearing','standard seal','packing material','foam packaging','corrugated box',
  'standard plastic part','commercial spring','standard gasket','off-the-shelf electronics',
  'consumer product','household','office furniture','clothing','apparel','food',
  'standard pump','commercial vehicle','standard wire','commercial cable',
]

export function analyzeExportControls(text) {
  const t = typeof text === 'string' ? text.toLowerCase() : ''
  const hits = []

  for (const rule of ECCN_RULES) {
    const matched = rule.keywords.filter(kw => t.includes(kw))
    if (matched.length > 0) {
      hits.push({ ...rule, matchedKeywords: matched })
    }
  }

  const ear99Signals = EAR99_SIGNALS.filter(kw => t.includes(kw))

  if (hits.length === 0) {
    // Absence of a keyword hit is not evidence of an export classification.
    return {
      verdict: 'UNCLASSIFIED -- MANUAL REVIEW',
      level: 'unknown',
      hits: [],
      ear99Signals,
      summary: 'No catalog triggers matched. The description is insufficient to determine an export classification or licensing requirement.',
      recommendation: 'Obtain a documented classification and review destination, end-user, and end-use restrictions before shipping.',
    }
  }

  const hasItar   = hits.some(h => h.level === 'ITAR')
  const hasCtrl   = hits.some(h => h.level === 'CONTROLLED')
  const hasPoss   = hits.some(h => h.level === 'POSSIBLE')

  const verdict = hasItar ? 'ITAR LIKELY' : hasCtrl ? 'EAR CONTROLLED' : 'REVIEW NEEDED'
  const level   = hasItar ? 'itar' : hasCtrl ? 'controlled' : 'possible'

  return { verdict, level, hits, ear99Signals, summary: '', recommendation: '' }
}

