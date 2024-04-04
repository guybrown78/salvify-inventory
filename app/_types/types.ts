import { Instance, Item, Location, Holding } from '@prisma/client';

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