import { ItemCategory, ItemGrouping, ItemTypes } from "@prisma/client"



const itemTypesValues:[string, ...string[]] = [
  "NONE",
  "UNKNOWN",
  "TABLET",
  "INJECTION",
  "SPRAY",
  "LIQUID",
  "SUPPOSITORY",
  "CAPSULE",
  "AMPOULE",
  "CREAM",
  "GEL",
  "TOPICAL",
  "BUCCAL",
  "PREFILLED_SYRINGE",
  "SYRINGE",
  "DRESSING",
  "DROPS",
  "PESSARY",
  "INHALER",
]

const itemTypesMap: Record<
	ItemTypes, 
	{ 
		label:string, 
		color: 'gray' | 'red' | 'violet' | 'green' 
	}
	> = {
		NONE: { label: 'None', color: 'gray' },
		UNKNOWN: { label: 'Unknown', color: 'gray' },
		TABLET: { label: 'Tablet', color: 'gray' },
		INJECTION: { label: 'Injection', color: 'gray' },
		SPRAY: { label: 'Spray', color: 'gray' },
		LIQUID: { label: 'Luquid', color: 'gray' },
		SUPPOSITORY: { label: 'Suppository', color: 'gray' },
		CAPSULE: { label: 'Capsule', color: 'gray' },
		AMPOULE: { label: 'Ampoule', color: 'gray' },
		CREAM: { label: 'Cream', color: 'gray' },
		GEL: { label: 'Gel', color: 'gray' },
		TOPICAL: { label: 'Topical', color: 'gray' },
		BUCCAL: { label: 'Buccal', color: 'gray' },
		PREFILLED_SYRINGE: { label: 'Prefilled Syringe', color: 'gray' },
		SYRINGE: { label: 'Syringe', color: 'gray' },
		DRESSING: { label: 'Dressing', color: 'gray' },
		DROPS: { label: 'Drops', color: 'gray' },
		PESSARY: { label: 'Pessary', color: 'gray' },
		INHALER: { label: 'Inhaler', color: 'gray' },
	}


const itemCategoryValues:[string, ...string[]] = [
  "NONE",
  "UNKNOWN",
  "DRUG",
  "DRESSING",
  "DISPOSABLE",
  "BEDDING",
  "SPLINT",
  "STRETCHER",
  "HARDWARE",
]

const itemCategoryMap: Record<
	ItemCategory, 
	{ 
		label:string, 
		color: 'gray' | 'red' | 'violet' | 'green' 
	}
	> = {
		NONE: { label: 'None', color: 'gray' },
		UNKNOWN: { label: 'Unknown', color: 'gray' },
		DRUG: { label: 'Drug', color: 'gray' },
		DRESSING: { label: 'Dressing', color: 'gray' },
		DISPOSABLE: { label: 'Disposable', color: 'gray' },
		BEDDING: { label: 'Bedding', color: 'gray' },
		SPLINT: { label: 'Splint', color: 'gray' },
		STRETCHER: { label: 'Stretcher', color: 'gray' },
		HARDWARE: { label: 'Hardware', color: 'gray' },
	}

const itemGroupingValues:[string, ...string[]] = [
  "NONE",
  "UNKNOWN",
  "CARDIOVASCULAR",
  "GASTROINTESTINAL",
  "ANALGESICSANTISPASMODICS",
  "NERVOUS",
  "ALLERGYANAPHYLAXSIS",
  "RESPIRATORY",
  "ANTIINFECTION",
  "REHYDRATION",
  "EXTERNAL",
  "RESUSCITATION",
  "DRESSING",
  "INSTRUMENTS",
  "MONITORING",
  "CATHETERIZATION",
  "GENERAL",
  "IMMOBILIZATION",
  "ADDITIONAL",
]
const itemGroupingMap: Record<
	ItemGrouping, 
	{ 
		label:string, 
		color: 'gray' | 'red' | 'violet' | 'green' 
	}
	> = {
		NONE: { label: 'None', color: 'gray' },
		UNKNOWN: { label: 'Unknown', color: 'gray' },
		CARDIOVASCULAR: { label: 'Cardiovascular', color: 'gray' },
		GASTROINTESTINAL: { label: 'Gastrointestinal', color: 'gray' },
		ANALGESICS_ANTISPASMODICS: { label: 'Analgesics Antispasmodics', color: 'gray' },
		NERVOUS: { label: 'Nervous', color: 'gray' },
		ALLERGY_ANAPHYLAXSIS: { label: 'Allergy Anaphylaxsis', color: 'gray' },
		RESPIRATORY: { label: 'Respiratory', color: 'gray' },
		ANTIINFECTION: { label: 'AntiInfection', color: 'gray' },
		REHYDRATION: { label: 'Rehydration', color: 'gray' },
		EXTERNAL: { label: 'External', color: 'gray' },
		RESUSCITATION: { label: 'Resuscitation', color: 'gray' },
		DRESSING: { label: 'Dressing Suture', color: 'gray' },
		INSTRUMENTS: { label: 'instruments', color: 'gray' },
		MONITORING: { label: 'Monitoring Equipment', color: 'gray' },
		INJECTION_CATHETERIZATION: { label: 'Injection Perfusion Puncture Catheterisation', color: 'gray' },
		GENERAL: { label: 'General Equipment', color: 'gray' },
		IMMOBILIZATION: { label: 'Immobilization Equipment', color: 'gray' },
		ADDITIONAL: { label: 'Additional Equipment', color: 'gray' },
	}

export { itemTypesValues, itemTypesMap, itemCategoryValues, itemCategoryMap, itemGroupingValues, itemGroupingMap }