'use client'

import { Link } from '@/app/_components';
import { useHoldingContext } from '@/app/_providers/HoldingProvider';
import { Holding, Location } from '@prisma/client';
import { MagnifyingGlassIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { Button, Flex, IconButton, Table, TableCell, TableColumnHeaderCell, Text } from '@radix-ui/themes';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import DeletLocationButton from './DeletLocationButton';

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
					<TableColumnHeaderCell align='right' width="55px">&nbsp;</TableColumnHeaderCell>
					<TableColumnHeaderCell align='right' width="55px">&nbsp;</TableColumnHeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{holding.locations?.map(location => (
					<Table.Row key={location.id}>
							<TableCell>
								<Flex direction="column" justify="center"  height="100%">
									<Text as="div" weight="bold">{location.title}</Text>
									<Text as="div">{location.field || ""}</Text>
								</Flex>
								
							</TableCell>


							<TableCell align='center' justify="end" width="55px">
								<Flex direction="column" justify="center"  height="100%">
									<NextLink href={`/holdings/${holding.id}/locations/edit/${location.id}`}>
										<IconButton color="gray" variant="soft">
											<Pencil2Icon width="18" height="18" />
										</IconButton>
									</NextLink>
									
								</Flex>
							</TableCell>

							<TableCell align='right' justify="end" width="55px">
								<Flex direction="column" justify="center"  height="100%">
									<DeletLocationButton />
								</Flex>
							</TableCell>

					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	)
}

export default LocationsTable