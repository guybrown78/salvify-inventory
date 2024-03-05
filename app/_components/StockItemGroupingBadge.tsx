import { itemGroupingMap } from '@/prisma/enums'
import { ItemGrouping } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

const StockItemGroupingBadge = ({ itemGrouping }: { itemGrouping: ItemGrouping | null}) => {

	if(!itemGrouping) return <></>

	return (
		<Badge color={itemGroupingMap[itemGrouping]?.color}>
			{ itemGroupingMap[itemGrouping]?.label }
		</Badge>
	)
}

export default StockItemGroupingBadge