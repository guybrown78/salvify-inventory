import { Item } from '@prisma/client'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Flex, Text, Heading, Button, IconButton } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'


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
					</Flex>
					<Flex gap="3" align="center" justify="end">
						{showEdit && (
							<Link href={`/stock-items/edit/${item.id}`}>
								<IconButton variant="ghost">
									<Pencil2Icon width="18" height="18" />
								</IconButton>
							</Link>
						)}
					</Flex>
				</Flex>
		
			</div>
		</div>
	)
}

export default StockItemHeader