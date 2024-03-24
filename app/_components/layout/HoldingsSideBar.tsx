import React, { PropsWithChildren } from 'react'
import HoldingsNavColumn from './HoldingsNavColumn'

const HoldingsSideBar = () => {
	return (
		<div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
			<div className="flex h-16 shrink-0 items-center">
				{/* logo */}
			</div>

			<HoldingsNavColumn /> 
			
		</div>
)}

export default HoldingsSideBar