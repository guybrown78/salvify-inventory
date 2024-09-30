import React from 'react'

const DeleteAccount = () => {
	return (
		<div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
		<div>
			<h2 className="text-base font-semibold leading-7 text-slate-700">Delete account</h2>
			<p className="mt-1 text-sm leading-6 text-slate-900">
				No longer want to use our service? You can delete your account here. This action is not reversible.
				All information related to this account will be deleted permanently.
			</p>
		</div>

		<form className="flex items-start md:col-span-2">
			<button
				type="submit"
				className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-red-400"
			>
				Yes, delete my account
			</button>
		</form>
	</div>
	)
}

export default DeleteAccount