import dynamic from 'next/dynamic'
import OrderFormSkeleton from '../_components/OrderFormSkeleton'

const OrderForm = dynamic(
	() => import('../_components/OrderForm'),
	{
		ssr: false,
		loading: () => <OrderFormSkeleton />
	}
)
const NewOrderPage = () => {
	return (
		<OrderForm />
	)
}

export default NewOrderPage