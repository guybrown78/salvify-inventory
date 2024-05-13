import { Link, NoDataMessage } from '@/app/_components';
import { StockItemTypeBadge, StockItemCategoryBadge, StockItemGroupingBadge } from '@/app/_components/';
import LabelValueRow from '@/app/_components/LabelValueRow';
import { ItemWithInstancesHoldingItems } from '@/app/_types/types';
import { Item } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Flex, Table, TableCell, TableColumnHeaderCell } from '@radix-ui/themes';
import NextLink from 'next/link';

interface Props {
	items: ItemWithInstancesHoldingItems[]
	holdingId:number
}

const StockTable = ({ items, holdingId }: Props) => {

	if(!items.length)
		return (<NoDataMessage>There are currently no items in this holding.</NoDataMessage>)

	console.log(items)

	const calculateTotal = (item:ItemWithInstancesHoldingItems) => {
		let total = 0;
		item.instances?.forEach(instance => total += instance.quantity) 
		return total
	}

	const getMinRequiredCount = (item:ItemWithInstancesHoldingItems) => {
		if(item.holdingItems && item.holdingItems.length){
			return item.holdingItems[0].requiredMinCount ?? 0
		}
		return "-"
	}
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
								<Link href={`/holdings/${holdingId}/stock/${item.id}`}>
									{item.title}
								</Link>	
								<div className="block md:hidden">
									<Flex gap="1" mt="2">
										<StockItemTypeBadge itemType={item.type} />
										<StockItemCategoryBadge itemCategory={item.category} />
										<StockItemGroupingBadge itemGrouping={item.grouping} />
									</Flex>
								</div>
								<div className="block md:hidden">
									<Flex gap="3" mt="3">
										<LabelValueRow label='Required count'>
											{getMinRequiredCount(item)}
										</LabelValueRow>
										<LabelValueRow label='Instances count'>
											{item.instances ? item.instances.length : 0}
										</LabelValueRow>
									</Flex>
								</div>
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
							<TableCell className='hidden md:table-cell'>{getMinRequiredCount(item)}</TableCell>
							<TableCell className='hidden md:table-cell'>{item.instances ? item.instances.length : 0}</TableCell>
							<TableCell>{calculateTotal(item)}</TableCell>
						</Table.Row>
					))}
					
				</Table.Body>
			</Table.Root>
	)
}


const columns:{ 
	label:string, 
	value?: keyof ItemWithInstancesHoldingItems,
	className?:string
}[] = [
	{ label: 'Stock Item', value: 'title'},
	{ label: 'Type', value: 'type', className:'hidden md:table-cell'},
	{ label: 'Category', value: 'category', className:'hidden md:table-cell'},
	{ label: 'Grouping', value: 'grouping', className:'hidden md:table-cell'},
	{ label: 'Required min amount', value: 'requiredCount', className:'hidden md:table-cell'},
	{ label: 'Instances Count', value: 'instances', className:'hidden md:table-cell'},
	{ label: 'Total Stock Count'}
]

export const columnNames = columns.map(column => column.value);
export default StockTable