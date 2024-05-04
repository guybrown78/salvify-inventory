import { itemCategoryMap } from '@/prisma/enums'
import { ItemCategory } from '@prisma/client'
import { Badge } from '@radix-ui/themes'


const StockItemCategoryBadge = ({ itemCategory }: { itemCategory: ItemCategory | null }) => {

	if(!itemCategory) return <></>
	
	return (
		<Badge color={itemCategoryMap[itemCategory]?.color}>
			{ itemCategoryMap[itemCategory]?.label }
		</Badge>
	)
}

export default StockItemCategoryBadge