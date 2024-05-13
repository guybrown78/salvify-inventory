import Main from '@/app/_components/layout/Main'
import React, { PropsWithChildren } from 'react'

const OrdersLayout = ({ children }:PropsWithChildren) => {
	return (
		<Main>{children}</Main>
	)
}

export default OrdersLayout