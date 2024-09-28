import { Instance, Item, Location, Holding, UserRole, HoldingItem, Order, OrderItem, RemoveInstance, User, HoldingType, Client } from '@prisma/client';

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

export interface SessionUser
{
	id: string,
	firstname: string | null
	surname: string | null
	name: string
	email: string
	image?: string | null
	role: UserRole
	clientId: number
	clientName?: string | null
	optionalClients?: Client[]
}

export interface OrderItemWithItem extends OrderItem{
	item:Item
}
export interface OrderWithItems extends Order{
	orderItems:OrderItemWithItem[]
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