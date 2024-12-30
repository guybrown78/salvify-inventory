import { Instance, Item, Location, Holding, UserRole, HoldingItem, Order, OrderItem, RemoveInstance, User, HoldingType, Client, OptionalClient } from '@prisma/client';

export interface InstancesWithLocation extends Instance{
	location:Location
}

export interface InstancesWithLocationAndItem extends InstancesWithLocation{
	item:Item
}
export interface ItemWithInstances extends Item{
	instances?:InstancesWithLocation[]
}

export interface ItemWithInstancesHoldingItems extends ItemWithInstances{
	holdingItems?:HoldingItem[]
}

export interface HoldingWithLocations extends Holding
 {
  locations: Location[];
}

export interface LocationWithHolding extends Location
 {
  holding: Holding;
}

export interface OrderItemWithItem extends OrderItem{
	item:Item
}
export interface OrderWithItems extends Order{
	orderItems:OrderItemWithItem[]
}

export interface OrderWithOrderItems extends Order{
	orderItems:OrderItem[]
}

export interface RemoveInstanceWithItemLocationUser extends RemoveInstance{
	instance:InstancesWithLocationAndItem,
	location:Location,
	removedBy:User
}

export interface HoldingSummaryType {
	title:string,
	id:number,
	type: HoldingType
	removed: number;
	low: number;
	expiring: number;
}