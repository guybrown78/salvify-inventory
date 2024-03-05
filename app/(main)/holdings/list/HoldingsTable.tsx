import { Link } from '@/app/_components';
import { Holding } from '@prisma/client';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { IconButton, Table, TableCell, TableColumnHeaderCell } from '@radix-ui/themes';
import NextLink from 'next/link';

interface Props {
	holdings: Holding[]
}

const HoldingsTable = ({ holdings }: Props) => {
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
								<Link href={`/holdings/${holding.id}`}>
									{holding.title}
								</Link>	
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