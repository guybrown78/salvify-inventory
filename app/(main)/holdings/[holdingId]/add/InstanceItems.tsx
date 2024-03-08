'use client'

import { Box, Heading } from '@radix-ui/themes';
import React, { useState, useEffect } from 'react'
import AddInstanceForm from './AddInstanceForm';
import { Instance, Item, Location } from '@prisma/client';
import axios from 'axios';
import InstancesTable from './InstancesTable';

interface Props{
	holdingId: number
	items: Item[]
	locations: Location[]
}

export interface InstanceWithLocation extends Instance {
  location: Location;
}

const InstanceItems = ({ holdingId, items, locations }: Props) => {

	const [selectedItem, setSelectedItem] = useState<Item | null>(null)
	const [instances, setInstances] = useState<InstanceWithLocation[] | null>(null)

	const handleSelectItem = (selectedItem: Item | null) => {
		setSelectedItem(selectedItem)
  };

	const handleUpdateInstances = () => {
		fetchInstances();
  };

	// Fetch instances for the selected item when it changes
	const fetchInstances = async () => {
		if (selectedItem) {
			try {
				const results = await axios.get(`/api/holdings/${holdingId}/items/${selectedItem.id}/instances`);
				if(results.data){
					setInstances(results.data)
				}
			} catch (error) {
				console.error('Error fetching instances:', error);
				setInstances(null);
			}
		} else {
			setInstances(null);
		}
	};

	useEffect(() => {
    fetchInstances();
  }, [selectedItem]);

	return (
		<>
			<Box className="max-w-2xl">
				<AddInstanceForm 
					items={items} 
					locations={locations} 
					onSelectItem={handleSelectItem}
					onInstanceAdded={handleUpdateInstances}
				/>
			</Box>
			
			{instances && (
				<Box>
						<div className="flex justify-between border-t border-slate-200 my-6" />
						<Heading mb="3" as="h3" size="3">
							Existing Instances ({ instances.length })
						</Heading>
						<InstancesTable instances={instances} />
				</Box>
			)}
			
		</>

	)
}

export default InstanceItems