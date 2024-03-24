import { Instance, Item, Location } from '@prisma/client';

export interface InstancesWithLocation extends Instance{
	location:Location
}
export interface ItemWithInstances extends Item{
	instances?:InstancesWithLocation[]
}