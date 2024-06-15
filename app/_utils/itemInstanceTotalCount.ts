import { ItemWithInstancesHoldingItems } from "../_types/types";


export const calculateItemInstanceTotal = (item:ItemWithInstancesHoldingItems):number => {
	let total = 0;
	item.instances?.forEach(instance => total += instance.quantity) 
	return total
}
