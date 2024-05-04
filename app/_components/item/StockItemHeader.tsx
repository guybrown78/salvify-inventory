import { Item } from '@prisma/client'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Flex, Heading } from '@radix-ui/themes'
import Link from 'next/link'
import LabelValueColumn from '../LabelValueColumn'
import StockItemAddToOrderButton from './StockItemAddToOrderButton'
import StockItemCategoryBadge from './StockItemCategoryBadge'
import StockItemGroupingBadge from './StockItemGroupingBadge'
import StockItemInformationButton from './StockItemInformationButton'
import StockItemLinks from './StockItemLinks'
import StockItemTypeBadge from './StockItemTypeBadge'


interface Props {
	item: Item
	showEdit:boolean
}

const StockItemHeader = ({ item, showEdit }: Props) => {
	return (
		<div className="bg-slate-50 shadow -mx-4 sm:-mx-6 md:-mx-6 lg:-mx-8 -mt-10">
			<div className="px-4 sm:px-6 lg:px-8">
				<Flex justify="between" py="6">

					<Flex direction="column">
						<Heading as='h1' size="5" weight="bold">{ item.title }</Heading>
						<Flex py="2" gap="3">
							<LabelValueColumn label="Type:">
								<StockItemTypeBadge itemType={item.type} />
							</LabelValueColumn>
							<LabelValueColumn label="Category:">
								<StockItemCategoryBadge itemCategory={item.category} />
							</LabelValueColumn>
							<LabelValueColumn label="Group:">
								<StockItemGroupingBadge itemGrouping={item.grouping} />
							</LabelValueColumn>
						</Flex>
					</Flex>

					<Flex direction="column" justify="between">
						<Flex gap="3" align="center" justify="end">
							
							<StockItemAddToOrderButton 
								title={item.title}
								itemId={item.id}
							/>
							<StockItemInformationButton 
								information={item.information} 
								title={item.title}
							/>
							{showEdit && (
								<Link href={`/stock-items/edit/${item.id}`}>
									<Button variant='solid'>
										<Pencil2Icon /> Edit
									</Button>
								</Link>
							)}
						</Flex>

						<StockItemLinks item={item}/>	
					</Flex>
					

				</Flex>
		
			</div>
		</div>
	)
}

export default StockItemHeader