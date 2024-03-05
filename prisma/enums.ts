import { ItemCategory, ItemGrouping, ItemTypes } from "@prisma/client"

export interface BadgeMapType {
	label:string, 
	color: 'gray' | 'gold' | 'bronze' | 'brown' | 
		'yellow' | 'amber' | 'orange' | 'tomato' | 'red' | 'ruby' | 'crimson' | 'pink' | 'plum' | 'purple' | 'violet' | 'iris' | 'indigo' | 'blue' | 'cyan' | 'teal' | 'jade' | 'green' | 'grass' | 'lime' | 'mint' | 'sky'
}

export const convertMapToList = (map: Record<string, BadgeMapType>): { label: string; value: string }[] => {
  return Object.entries(map).map(([value, { label }]) => ({ label, value }));
};

export const convertEnumValuesToArray = (map: Record<string, BadgeMapType>): [string, ...string[]] => {
  return Object.keys(map) as [string, ...string[]];
};

const itemTypesMap: Record<
	ItemTypes, 
	BadgeMapType
	> = {
		NONE: { label: 'None', color: 'gray' },
		UNKNOWN: { label: 'Unknown', color: 'gold' },
		TABLET: { label: 'Tablet', color: 'yellow' },
		INJECTION: { label: 'Injection', color: 'tomato' },
		SPRAY: { label: 'Spray', color: 'pink' },
		LIQUID: { label: 'Luquid', color: 'purple' },
		SUPPOSITORY: { label: 'Suppository', color: 'indigo' },
		CAPSULE: { label: 'Capsule', color: 'cyan' },
		AMPOULE: { label: 'Ampoule', color: 'jade' },
		CREAM: { label: 'Cream', color: 'lime' },
		GEL: { label: 'Gel', color: 'sky' },
		TOPICAL: { label: 'Topical', color: 'amber' },
		BUCCAL: { label: 'Buccal', color: 'crimson' },
		PREFILLED_SYRINGE: { label: 'Prefilled Syringe', color: 'plum' },
		SYRINGE: { label: 'Syringe', color: 'violet' },
		DRESSING: { label: 'Dressing', color: 'blue' },
		DROPS: { label: 'Drops', color: 'teal' },
		PESSARY: { label: 'Pessary', color: 'green' },
		INHALER: { label: 'Inhaler', color: 'mint' },
	}

const itemCategoryMap: Record<
	ItemCategory, 
	BadgeMapType
	> = {
		NONE: { label: 'None', color: 'gray' },
		UNKNOWN: { label: 'Unknown', color: 'gold' },
		DRUG: { label: 'Drug', color: 'amber' },
		DRESSING: { label: 'Dressing', color: 'ruby' },
		DISPOSABLE: { label: 'Disposable', color: 'plum' },
		BEDDING: { label: 'Bedding', color: 'iris' },
		SPLINT: { label: 'Splint', color: 'cyan' },
		STRETCHER: { label: 'Stretcher', color: 'jade' },
		HARDWARE: { label: 'Hardware', color: 'sky' },
	}

const itemGroupingMap: Record<
	ItemGrouping, 
	BadgeMapType
	> = {
		NONE: { label: 'None', color: 'gray' },
		UNKNOWN: { label: 'Unknown', color: 'gold' },
		CARDIOVASCULAR: { label: 'Cardiovascular', color: 'yellow' },
		GASTROINTESTINAL: { label: 'Gastrointestinal', color: 'orange' },
		ANALGESICS_ANTISPASMODICS: { label: 'Analgesics Antispasmodics', color: 'red' },
		NERVOUS: { label: 'Nervous', color: 'crimson' },
		ALLERGY_ANAPHYLAXSIS: { label: 'Allergy Anaphylaxsis', color: 'plum' },
		RESPIRATORY: { label: 'Respiratory', color: 'violet' },
		ANTIINFECTION: { label: 'AntiInfection', color: 'indigo' },
		REHYDRATION: { label: 'Rehydration', color: 'cyan' },
		EXTERNAL: { label: 'External', color: 'jade' },
		RESUSCITATION: { label: 'Resuscitation', color: 'grass' },
		DRESSING: { label: 'Dressing Suture', color: 'mint' },
		INSTRUMENTS: { label: 'instruments', color: 'amber' },
		MONITORING: { label: 'Monitoring Equipment', color: 'tomato' },
		INJECTION_CATHETERIZATION: { label: 'Injection Perfusion Puncture Catheterisation', color: 'pink' },
		GENERAL: { label: 'General Equipment', color: 'purple' },
		IMMOBILIZATION: { label: 'Immobilization Equipment', color: 'iris' },
		ADDITIONAL: { label: 'Additional Equipment', color: 'blue' },
	}


const itemTypeList:{label:string, value:string}[] = convertMapToList(itemTypesMap);
const itemCategoryList:{label:string, value:string}[] = convertMapToList(itemCategoryMap);
const itemGroupingList:{label:string, value:string}[] = convertMapToList(itemGroupingMap);

const itemTypesValues:[string, ...string[]] = convertEnumValuesToArray(itemTypesMap);
const itemCategoryValues:[string, ...string[]] = convertEnumValuesToArray(itemCategoryMap);
const itemGroupingValues:[string, ...string[]] = convertEnumValuesToArray(itemGroupingMap);

export { 
	itemTypesValues, itemTypesMap, itemTypeList,
	itemCategoryValues, itemCategoryMap, itemCategoryList,
	itemGroupingValues, itemGroupingMap, itemGroupingList
}