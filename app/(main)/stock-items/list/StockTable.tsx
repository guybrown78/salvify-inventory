import { Link } from '@/app/_components';
import { StockItemTypeBadge, StockItemCategoryBadge, StockItemGroupingBadge } from '@/app/_components/';
import { Item } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table, TableCell, TableColumnHeaderCell } from '@radix-ui/themes';
import NextLink from 'next/link';

export interface ItemQuery {
	orderBy: keyof Item;
	page: string;
	pageSize: string;
}

interface Props {
	searchParams: ItemQuery;
	items: Item[]
}

const StockTable = ({  searchParams, items }: Props) => {
	return (
		<Table.Root variant='surface'>
			<Table.Header>
					<Table.Row>
						{columns.map((column) => (
							<TableColumnHeaderCell 
								key={column.value} 
								className={column.className}
							>
								<NextLink href={{
									query: { 
										orderBy:column.value
									}
								}}>
									{column.label}
								</NextLink>
							</TableColumnHeaderCell>
						))}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{items.map(item => (
						<Table.Row key={item.id}>
							<TableCell>
								<Link href={`/stock-items/${item.id}`}>
									{item.title}
								</Link>	
							</TableCell>
							<TableCell className='hidden md:table-cell'>
								<StockItemTypeBadge itemType={item.type} />
							</TableCell>
							<TableCell className='hidden md:table-cell'>
								<StockItemCategoryBadge itemCategory={item.category} />
							</TableCell>
							<TableCell className='hidden md:table-cell'>
								<StockItemGroupingBadge itemGrouping={item.grouping} />
							</TableCell>
							{/* <TableCell className='hidden md:table-cell'>{item.requiredCount}</TableCell> */}
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
	)
}


const columns:{ 
	label:string, 
	value: keyof Item,
	className?:string
}[] = [
	{ label: 'Stock Item', value: 'title'},
	{ label: 'Type', value: 'type', className:'hidden md:table-cell'},
	{ label: 'Category', value: 'category', className:'hidden md:table-cell'},
	{ label: 'Grouping', value: 'grouping', className:'hidden md:table-cell'},
	// { label: 'Required amount', value: 'requiredCount', className:'hidden md:table-cell'}
]

export const columnNames = columns.map(column => column.value);
export default StockTable