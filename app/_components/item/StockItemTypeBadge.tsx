import { itemTypesMap } from '@/prisma/enums'
import { ItemTypes } from '@prisma/client'
import { Badge } from '@radix-ui/themes'

const StockItemTypeBadge = ({ itemType }: { itemType: ItemTypes | null}) => {

	if(!itemType) return <></>
	
	return (
		<Badge color={itemTypesMap[itemType]?.color}>
			{ itemTypesMap[itemType]?.label }
		</Badge>
	)
}

export default StockItemTypeBadge