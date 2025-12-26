/**
 * ServiceLogic: The Universal Pricing Engine v3.0
 * Includes Regional Multipliers and 40+ Service Categories.
 */
export const ServiceLogic = {
  // Global Regional Adjustment (Purchasing Power Parity)
  regions: {
    USA_CAN: { label: 'North America (USD/CAD)', multiplier: 1.0 },
    EUROPE: { label: 'Europe (EUR/GBP)', multiplier: 1.1 },
    ASIA_PAC: { label: 'Asia Pacific', multiplier: 0.6 },
    LATAM_AFRICA: { label: 'Emerging Markets', multiplier: 0.4 }
  },

  categories: {
    HOME: "Home & Property",
    DIGITAL: "Digital & Creative",
    PROFESSIONAL: "Professional Services",
    LIFESTYLE: "Lifestyle & Personal"
  },

  niches: {
    // --- HOME & PROPERTY ---
    PLUMBING: { id: 'PLUMBING', cat: 'HOME', label: 'Plumbing', baseRate: 85, tasks: [{id:'leak', label:'Leak Repair', multiplier:1.0}, {id:'install', label:'Fixture Install', multiplier:1.2}] },
    ELECTRICAL: { id: 'ELECTRICAL', cat: 'HOME', label: 'Electrical', baseRate: 95, tasks: [{id:'rewire', label:'Rewiring', multiplier:1.5}, {id:'panel', label:'Panel Upgrade', multiplier:2.0}] },
    HVAC: { id: 'HVAC', cat: 'HOME', label: 'HVAC', baseRate: 110, tasks: [{id:'tuneup', label:'Tune-up', multiplier:1.0}, {id:'repair', label:'Repair', multiplier:1.6}] },
    ROOFING: { id: 'ROOFING', cat: 'HOME', label: 'Roofing', baseRate: 150, tasks: [{id:'patch', label:'Patch', multiplier:1.0}, {id:'full', label:'Full Roof', multiplier:5.5}] },
    SOLAR: { id: 'SOLAR', cat: 'HOME', label: 'Solar/Energy', baseRate: 130, tasks: [{id:'panel', label:'Panel Install', multiplier:1.0}, {id:'battery', label:'Battery System', multiplier:1.8}] },
    EV_CHARGING: { id: 'EV_CHARGING', cat: 'HOME', label: 'EV Charging', baseRate: 90, tasks: [{id:'standard', label:'Level 2 Install', multiplier:1.0}, {id:'tesla', label:'Supercharger', multiplier:2.0}] },
    CLEANING: { id: 'CLEANING', cat: 'HOME', label: 'Cleaning', baseRate: 45, tasks: [{id:'standard', label:'Standard', multiplier:1.0}, {id:'deep', label:'Deep Clean', multiplier:2.2}] },
    LANDSCAPING: { id: 'LANDSCAPING', cat: 'HOME', label: 'Landscaping', baseRate: 65, tasks: [{id:'mow', label:'Maintenance', multiplier:1.0}, {id:'design', label:'Hardscape', multiplier:2.5}] },
    PEST_CONTROL: { id: 'PEST_CONTROL', cat: 'HOME', label: 'Pest Control', baseRate: 80, tasks: [{id:'spray', label:'Basic Spray', multiplier:1.0}, {id:'termite', label:'Termite Tx', multiplier:3.0}] },
    POOL: { id: 'POOL', cat: 'HOME', label: 'Pool Service', baseRate: 75, tasks: [{id:'clean', label:'Maintenance', multiplier:1.0}, {id:'repair', label:'Pump Repair', multiplier:2.0}] },
    LOCKSMITH: { id: 'LOCKSMITH', cat: 'HOME', label: 'Locksmith', baseRate: 95, tasks: [{id:'rekey', label:'Rekey', multiplier:1.0}, {id:'emergency', label:'Lockout', multiplier:2.0}] },
    SECURITY: { id: 'SECURITY', cat: 'HOME', label: 'Security', baseRate: 105, tasks: [{id:'camera', label:'Cameras', multiplier:1.0}, {id:'alarm', label:'Smart Home', multiplier:2.5}] },

    // --- DIGITAL & CREATIVE ---
    WEB_DESIGN: { id: 'WEB_DESIGN', cat: 'DIGITAL', label: 'Web Design', baseRate: 125, tasks: [{id:'landing', label:'Landing Page', multiplier:1.0}, {id:'ecommerce', label:'E-com Store', multiplier:4.0}] },
    AI_CONSULTING: { id: 'AI_CONSULTING', cat: 'DIGITAL', label: 'AI Consulting', baseRate: 200, tasks: [{id:'chat', label:'Custom GPT', multiplier:1.0}, {id:'workflow', label:'Automation', multiplier:3.0}] },
    SEO: { id: 'SEO', cat: 'DIGITAL', label: 'SEO Services', baseRate: 140, tasks: [{id:'audit', label:'Audit', multiplier:1.0}, {id:'monthly', label:'Management', multiplier:3.0}] },
    COPYWRITING: { id: 'COPYWRITING', cat: 'DIGITAL', label: 'Copywriting', baseRate: 100, tasks: [{id:'blog', label:'Blog Post', multiplier:1.0}, {id:'sales', label:'Sales Page', multiplier:2.5}] },
    SOCIAL_MEDIA: { id: 'SOCIAL_MEDIA', cat: 'DIGITAL', label: 'Social Media', baseRate: 85, tasks: [{id:'posts', label:'Daily Posts', multiplier:1.0}, {id:'ads', label:'Ad Mgmt', multiplier:2.0}] },
    VIDEO_PROD: { id: 'VIDEO_PROD', cat: 'DIGITAL', label: 'Video Prod', baseRate: 175, tasks: [{id:'short', label:'Social Reel', multiplier:1.0}, {id:'commercial', label:'Commercial', multiplier:4.0}] },
    APP_DEV: { id: 'APP_DEV', cat: 'DIGITAL', label: 'App Dev', baseRate: 150, tasks: [{id:'mvp', label:'MVP Build', multiplier:5.0}, {id:'feature', label:'Single Feature', multiplier:1.0}] },

    // --- PROFESSIONAL ---
    LEGAL: { id: 'LEGAL', cat: 'PROFESSIONAL', label: 'Legal Consult', baseRate: 250, tasks: [{id:'review', label:'Doc Review', multiplier:1.0}, {id:'litigation', label:'Litigation', multiplier:3.0}] },
    FINANCIAL: { id: 'FINANCIAL', cat: 'PROFESSIONAL', label: 'Financial Plan', baseRate: 180, tasks: [{id:'tax', label:'Tax Prep', multiplier:1.0}, {id:'estate', label:'Estate Plan', multiplier:2.5}] },
    MARKETING: { id: 'MARKETING', cat: 'PROFESSIONAL', label: 'Marketing Strat', baseRate: 160, tasks: [{id:'consult', label:'Consulting', multiplier:1.0}, {id:'launch', label:'Full Launch', multiplier:4.5}] },
    TUTORING: { id: 'TUTORING', cat: 'PROFESSIONAL', label: 'Tutor/Coach', baseRate: 60, tasks: [{id:'standard', label:'K-12', multiplier:1.0}, {id:'testprep', label:'SAT/Prep', multiplier:1.8}] },
    RE_AGENT: { id: 'RE_AGENT', cat: 'PROFESSIONAL', label: 'Real Estate', baseRate: 120, tasks: [{id:'list', label:'Listing', multiplier:1.0}, {id:'close', label:'Closing', multiplier:4.0}] },
    VIRTUAL_ASST: { id: 'VIRTUAL_ASST', cat: 'PROFESSIONAL', label: 'Virtual Asst', baseRate: 35, tasks: [{id:'admin', label:'Admin', multiplier:1.0}, {id:'exec', label:'Exec Support', multiplier:2.0}] },

    // --- LIFESTYLE & PERSONAL ---
    PERSONAL_TRAIN: { id: 'PERSONAL_TRAIN', cat: 'LIFESTYLE', label: 'Fitness Coach', baseRate: 80, tasks: [{id:'session', label:'1on1', multiplier:1.0}, {id:'plan', label:'Nutrition', multiplier:2.0}] },
    PET_GROOMING: { id: 'PET_GROOMING', cat: 'LIFESTYLE', label: 'Pet Grooming', baseRate: 55, tasks: [{id:'wash', label:'Bath/Brush', multiplier:1.0}, {id:'full', label:'Full Clip', multiplier:1.6}] },
    AUTO_DETAIL: { id: 'AUTO_DETAIL', cat: 'LIFESTYLE', label: 'Auto Detail', baseRate: 70, tasks: [{id:'interior', label:'Interior', multiplier:1.0}, {id:'ceramic', label:'Ceramic Coat', multiplier:6.0}] },
    INTERIOR_DESIGN: { id: 'INTERIOR_DESIGN', cat: 'LIFESTYLE', label: 'Interior Design', baseRate: 130, tasks: [{id:'mood', label:'Mood Board', multiplier:1.0}, {id:'renovate', label:'Full Reno', multiplier:5.0}] },
    CARETAKING: { id: 'CARETAKING', cat: 'LIFESTYLE', label: 'Caretaking', baseRate: 40, tasks: [{id:'elderly', label:'Elderly Care', multiplier:1.0}, {id:'child', label:'Nanny/Sitter', multiplier:0.8}] },
    MASSAGE: { id: 'MASSAGE', cat: 'LIFESTYLE', label: 'Massage', baseRate: 95, tasks: [{id:'standard', label:'Swedish', multiplier:1.0}, {id:'deep', label:'Deep Tissue', multiplier:1.3}] },
    EVENT_PLAN: { id: 'EVENT_PLAN', cat: 'LIFESTYLE', label: 'Event Planner', baseRate: 150, tasks: [{id:'dayof', label:'Coordination', multiplier:1.0}, {id:'full', label:'Full Plan', multiplier:10.0}] },
  },

  multipliers: {
    scale: { small: 1.0, medium: 1.8, large: 3.5, enterprise: 8.0 },
    complexity: { simple: 1.0, moderate: 1.3, advanced: 1.7 },
    quality: { standard: 1.0, premium: 1.4, luxury: 2.0 },
    urgency: { standard: 1.0, rush: 1.5, immediate: 2.5 }
  }
};

export const calculateEstimate = (nicheKey, taskId, complexity, quality, urgency, scale, regionKey) => {
  const niche = ServiceLogic.niches[nicheKey];
  const region = ServiceLogic.regions[regionKey] || ServiceLogic.regions.USA_CAN;
  if (!niche) return 0;

  const task = niche.tasks.find(t => t.id === taskId) || niche.tasks[0];
  const base = niche.baseRate * (task?.multiplier || 1) * region.multiplier;
  const m = ServiceLogic.multipliers;

  return base * (m.scale[scale] || 1) * (m.complexity[complexity] || 1) * (m.quality[quality] || 1) * (m.urgency[urgency] || 1);
};