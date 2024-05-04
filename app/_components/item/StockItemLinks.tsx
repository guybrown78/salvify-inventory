import { Item } from '@prisma/client'
import { Flex } from '@radix-ui/themes'
import StockItemEMCButton from './StockItemEMCButton'
import StockItemInstructionsButton from './StockItemInstructionsButton'

const StockItemLinks = ({ item }: { item:Item }) => {

	return (
		<Flex py="2" gap="3" align="end" justify="end">
			<StockItemEMCButton 
				title={item.title}
				emcPilURL={item.emcPilURL}
			/>
			<StockItemInstructionsButton 
				title={item.title}
				instructionsURL={item.instructionsURL}
			/>
		</Flex>
	)
}

export default StockItemLinks