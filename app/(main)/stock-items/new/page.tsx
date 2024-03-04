import dynamic from 'next/dynamic'
import StockItemFormSkeleton from '../_components/StockItemFormSkeleton';

const StockItemForm = dynamic(
	() => import('../_components/StockItemForm'),
	{
		ssr: false,
		loading: () => <StockItemFormSkeleton />
	}
);
const NewStockItemsPage = () => {
	return (
		<StockItemForm />
	)
}

export default NewStockItemsPage