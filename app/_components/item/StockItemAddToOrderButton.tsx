import { PlusCircledIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';

interface Props {
	title: string
	itemId: number
}


const StockItemAddToOrderButton = ({ itemId, title }:Props) => {
	return (
		<Button variant='outline' disabled>
			<PlusCircledIcon /> Add to Order
		</Button>
	)
}

export default StockItemAddToOrderButton