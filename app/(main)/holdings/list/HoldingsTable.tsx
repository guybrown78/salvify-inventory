'use client'

import { Link } from '@/app/_components';
import { useHoldingContext } from '@/app/_providers/HoldingProvider';
import { Holding } from '@prisma/client';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button, IconButton, Table, TableCell, TableColumnHeaderCell } from '@radix-ui/themes';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

interface Props {
	holdings: Holding[]
}

const HoldingsTable = ({ holdings }: Props) => {

	const { updateIsHoldingSelected, updateCurrentHolding } = useHoldingContext();
	const router = useRouter()
	return (
		<Table.Root variant='surface'>
			<Table.Header>
				<Table.Row>
					{/* {columns.map((column) => ( */}
						<TableColumnHeaderCell>
							Holding
						</TableColumnHeaderCell>
					{/* ))} */}
					<TableColumnHeaderCell>Edit</TableColumnHeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{holdings.map(holding => (
					<Table.Row key={holding.id}>
							<TableCell>
								<Button 
									onClick={() => {
										updateCurrentHolding(holding);
										router.push(`/holdings/${holding.id}/dashboard`)
									}}
								>
									{holding.title}
								</Button>	
							</TableCell>

							<TableCell>
								<NextLink href={`/holdings/edit/${holding.id}`}>
									<IconButton variant="ghost">
										<Pencil2Icon width="18" height="18" />
									</IconButton>
								</NextLink>
							</TableCell>

					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	)
}

export default HoldingsTable