import React from 'react'

interface Props {
	children: React.ReactNode
}
const AuthLayout = ({ children }: Props) => {
	return (
		<div className="h-full">
			{/* <aside className="bg-base-300 p-5 mr-5">Admin Sidebar</aside> */}
			<div className="h-full flex justify-center items-center">
				{ children }
			</div>
		</div>
	)
}

export default AuthLayout