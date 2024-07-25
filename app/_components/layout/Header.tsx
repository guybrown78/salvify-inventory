'use client'

import HeaderSearch from "../search/HeaderSearch";
import AuthDropdown from './AuthDropdown';
import UserNotification from './UserNotification';

import { useLayoutContext } from "@/app/_providers/LayoutProvider";
import {
	HiBars3
} from "react-icons/hi2";


const Header = () => {

	const { updateIsSidebarOpen } = useLayoutContext();

	return (
		//gap-x-4 sm:gap-x-6 sm:px-6 lg:px-8 px-4
		<div className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b border-gray-200 bg-white pr-4 shadow-sm ">
            <button type="button" className="m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => updateIsSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <HiBars3 className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

		{/* gap-x-4 self-stretch lg:gap-x-6"> */}
		<div className="flex flex-1 self-stretch"> 
			<HeaderSearch />
			<div className="flex items-center gap-x-4 lg:gap-x-6 ml-4 lg:ml-0">
				<UserNotification />
				<div 
					className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" 
				/>
				<AuthDropdown />
			</div>
		</div>

	</div>
	)
}

export default Header