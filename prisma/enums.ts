import { HoldingType, ItemCategory, ItemGrouping, ItemTypes, OrderStatus, RemoveInstanceReason, UserRole } from "@prisma/client"

export interface SelectMapType {
	label:string, 
}
export interface BadgeMapType extends SelectMapType {
	color: 'gray' | 'gold' | 'bronze' | 'brown' | 
		'yellow' | 'amber' | 'orange' | 'tomato' | 'red' | 'ruby' | 'crimson' | 'pink' | 'plum' | 'purple' | 'violet' | 'iris' | 'indigo' | 'blue' | 'cyan' | 'teal' | 'jade' | 'green' | 'grass' | 'lime' | 'mint' | 'sky'
}



export const convertMapToList = (map: Record<string, SelectMapType | BadgeMapType>): { label: string; value: string }[] => {
  return Object.entries(map).map(([value, { label }]) => ({ label, value }));
};

export const convertEnumValuesToArray = (map: Record<string, SelectMapType |BadgeMapType>): [string, ...string[]] => {
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
		LIQUID: { label: 'Liquid', color: 'purple' },
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
		GAS: { label: 'Gas', color: 'iris' },
		SUSPENSION: { label: 'Suspension', color: 'bronze' },
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
		INSTRUMENTS: { label: 'Instruments', color: 'amber' },
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



const removeInstanceReasonMap: Record<
	RemoveInstanceReason, 
	SelectMapType
	> = {
		USED: { label: 'Item(s) used for treatment' },
		DAMAGED: { label: 'Item(s) are damaged' },
		LOST: { label: 'Item(s) have been lost' },
		STOLEN: { label: 'Item(s) have been stolen' },
		EXPIRED: { label: 'Item(s) have expired' },
		RECALLED: { label: 'Item(s) have been recalled by the manufacturer' },
		REMOVED: { label: 'Item(s) have been removed/recalled by admin' },
		OTHER: { label: 'Other reason' },
	}
const removeInstanceReasonList:{label:string, value:string}[] = convertMapToList(removeInstanceReasonMap);
const removeInstanceReasonValues:[string, ...string[]] = convertEnumValuesToArray(removeInstanceReasonMap);


const orderStatusMap: Record<
	OrderStatus, 
	BadgeMapType
	> = {
		OPEN: { label: 'Open', color: 'orange' },
		ORDERED: { label: 'Ordered', color: 'plum' },
		RECEIVED: { label: 'Recieved', color: 'violet' },
		COMPLETE: { label: 'Complete', color: 'mint' },
		CLOSED: { label: 'Closed', color: 'tomato' }
	}
const orderStatusList:{label:string, value:string}[] = convertMapToList(orderStatusMap);
const orderStatusValues:[string, ...string[]] = convertEnumValuesToArray(orderStatusMap);


const holdingTypeMap: Record<
	HoldingType, 
	SelectMapType
	> = {
		STORE: { label: 'Store' },
		FACILITY: { label: 'Facility' },
		FLEET: { label: 'Fleet' },
		EVENT: { label: 'Event' },
		GENERAL: { label: 'General' },
	}
const holdingTypeList:{label:string, value:string}[] = convertMapToList(holdingTypeMap);
const holdingTypeValues:[string, ...string[]] = convertEnumValuesToArray(holdingTypeMap);



const userRoleMap: Record<
	UserRole, 
	SelectMapType
	> = {
		USER: { label: 'User' },
		ADMIN: { label: 'Admin' },
		SUPERADMIN: { label: 'SuperAdmin' },
	}
const userRoleList:{label:string, value:string}[] = convertMapToList(userRoleMap);
const userRoleValues:[string, ...string[]] = convertEnumValuesToArray(userRoleMap);


export { 
	itemTypesValues, itemTypesMap, itemTypeList,
	itemCategoryValues, itemCategoryMap, itemCategoryList,
	itemGroupingValues, itemGroupingMap, itemGroupingList,
	removeInstanceReasonValues, removeInstanceReasonMap, removeInstanceReasonList,
	orderStatusValues, orderStatusMap, orderStatusList,
	holdingTypeValues, holdingTypeMap, holdingTypeList,
	userRoleValues, userRoleMap, userRoleList
}