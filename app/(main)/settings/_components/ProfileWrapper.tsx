import React, { ReactNode } from 'react'

interface Props {
	title:string
	description:string
	children:ReactNode
}
const ProfileWrapper = ({ title, description, children }: Props) => {
	return (
		<div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-16 md:grid-cols-3">
			<div>
				<h2 className="text-base font-semibold leading-7 text-slate-700">{title}</h2>
				<p className="mt-1 text-sm leading-6 text-slate-900">{description}</p>
			</div>
			{children}
		</div>
	)
}

export default ProfileWrapper