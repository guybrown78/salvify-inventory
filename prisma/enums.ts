import { ItemTypes } from "@prisma/client"



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
		TABLET: { label: 'Tablet', color: 'green' },
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
  "MONITORINGE",
  "CATHETERIZATION",
  "GENERAL",
  "IMMOBILIZATION",
  "ADDITIONAL",
]


export { itemTypesValues, itemTypesMap, itemCategoryValues, itemGroupingValues }