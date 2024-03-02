'use client'

import {
	HiOutlineBell
} from "react-icons/hi2";

const UserNotification = () => {
	return null;
	return (
		<button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
			<span className="sr-only">View notifications</span>
			<HiOutlineBell className="h-6 w-6" aria-hidden="true" />
		</button>
	)
}

export default UserNotification