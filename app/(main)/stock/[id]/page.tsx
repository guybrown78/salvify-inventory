import React from 'react'


interface Props {
	params: { id: string }
}


const StockItemPage = ({ params }: Props) => {
	return (
		<div>StockItemPage { params.id }</div>
	)
}

export default StockItemPage