'use client'

import { useLayoutContext } from '@/app/_providers/LayoutProvider';
import classNames from 'classnames';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaKitMedical } from "react-icons/fa6";
import {
	HiOutlineHome,
	HiOutlineTicket
} from "react-icons/hi2";
import { MdShelves } from "react-icons/md";

const commonNavigation = [
  { name: 'Dashboard', href: '/', rootHref: null, icon: HiOutlineHome },
  { name: 'Issues', href: '/issues/list', rootHref:'/issues', icon: HiOutlineTicket },
	{ name: 'Stock', href: '/stock-items/list', rootHref:'/stock-items', icon: MdShelves },
	{ name: 'Holdings', href: '/holdings/list', rootHref:'/holdings', icon: FaKitMedical },
]

const NavColumn = () => {

	const { updateIsSidebarOpen } = useLayoutContext()
	const currentPath = usePathname();
	const router = useRouter();
	
	const isRouteSelected = (href:string, rootHref: string | null) => {
    return rootHref 
			? currentPath === href || currentPath.startsWith(rootHref)
			: currentPath === href;
  };
	

	return (
		<nav className="flex flex-1 flex-col">
			<ul role="list" className="flex flex-1 flex-col gap-y-7">
				<li>
					<ul role="list" className="-mx-2 space-y-1">
						{commonNavigation.map((item) => (
							<li key={item.name}>
								<Link href={item.href}>
									<div 
										className={classNames(
											isRouteSelected(item.href, item.rootHref)
												? 'bg-gray-50 text-green-600'
												: 'text-gray-700 hover:text-green-600 hover:bg-gray-50',
											'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
										)}
										onClick={() => { updateIsSidebarOpen(false) }}
									>
										{item.icon && (
											<item.icon
												className={classNames(
												isRouteSelected(item.href, item.rootHref) 
														? 'text-green-600' 
														: 'text-gray-400 group-hover:text-green-600',
													'h-5 w-5 shrink-0'
												)}
												aria-hidden="true"
											/>
										)}
										{item.name}
									</div>
									
								</Link>
							</li>
						))}
					</ul>
				</li>
			</ul>
		</nav>
	)
}

export default NavColumn