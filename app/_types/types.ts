import { Instance, Item, Location, Holding, UserRole } from '@prisma/client';

export interface InstancesWithLocation extends Instance{
	location:Location
}
export interface InstancesWithLocationAndItem extends InstancesWithLocation{
	item:Item
}
export interface ItemWithInstances extends Item{
	instances?:InstancesWithLocation[]
}

export interface HoldingWithLocations extends Holding
 {
  locations: Location[];
}

export interface SessionUser
 {
	firstname: string | null
	surname: string | null
	name: string
	email: string
	image?: string | null
	role: UserRole
	clientId: number
}