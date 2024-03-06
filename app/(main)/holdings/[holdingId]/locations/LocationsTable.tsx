'use client'

import { Link } from '@/app/_components';
import { useHoldingContext } from '@/app/_providers/HoldingProvider';
import { Holding, Location } from '@prisma/client';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button, IconButton, Table, TableCell, TableColumnHeaderCell } from '@radix-ui/themes';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

interface HoldingWithLocations extends Holding {
  locations: Location[];
}

interface Props {
	holding: HoldingWithLocations
}

const LocationsTable = ({ holding }: Props) => {
	return (
		<Table.Root variant='surface'>
			<Table.Header>
				<Table.Row>
					<TableColumnHeaderCell>
						Locations
					</TableColumnHeaderCell>
					<TableColumnHeaderCell>Edit</TableColumnHeaderCell>
					<TableColumnHeaderCell>Delete</TableColumnHeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{holding.locations?.map(location => (
					<Table.Row key={location.id}>
							<TableCell>
								{location.title}
							</TableCell>

							<TableCell>
							</TableCell>

							<TableCell>
								
							</TableCell>

					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	)
}

export default LocationsTable