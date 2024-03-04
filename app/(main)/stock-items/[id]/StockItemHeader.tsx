import { Item } from '@prisma/client'
import { Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'


interface Props {
	item?: Item
}

const StockItemHeader = ({ item }: Props) => {
	return (
		<div className="bg-slate-50 shadow -mx-2 md:-mx-8 -my-10">
			<div className="px-4 sm:px-6 lg:px-8">
				<Flex justify="between" py="6">
					<Flex direction="column">
						<Text as='h1' size="5" weight="bold">{ item.title }</Text>
					</Flex>
					<Flex gap="3" align="center" justify="end">
						<Link href={`/stock-items/edit/${item.id}`}>Edit</Link>
					</Flex>
				</Flex>
		
			</div>
		</div>
	)
}

export default StockItemHeader