import React from 'react'

const LogoutAllSessions = () => {
	return (
		<div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
		<div>
			<h2 className="text-base font-semibold leading-7 text-slate-700">Log out other sessions</h2>
			<p className="mt-1 text-sm leading-6 text-slate-900">
				Please enter your password to confirm you would like to log out of your other sessions across all of
				your devices.
			</p>
		</div>

		<form className="md:col-span-2">
			<div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
				<div className="col-span-full">
					<label htmlFor="logout-password" className="block text-sm font-medium leading-6 text-slate-700">
						Your password
					</label>
					<div className="mt-2">
						<input
							id="logout-password"
							name="password"
							type="password"
							autoComplete="current-password"
							className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-slate-700 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>
			</div>

			<div className="mt-8 flex">
				<button
					type="submit"
					className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
				>
					Log out other sessions
				</button>
			</div>
		</form>
	</div>
	)
}

export default LogoutAllSessions