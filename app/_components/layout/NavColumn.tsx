'use client'

import { useHoldingContext } from '@/app/_providers/HoldingProvider';
import classNames from 'classnames';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaKitMedical } from "react-icons/fa6";
import {
	HiOutlineHome,
	HiOutlineTicket
} from "react-icons/hi2";
import { MdShelves } from "react-icons/md";
import HoldingNavTitle from './HoldingNavTitle';
import { useLayoutContext } from '@/app/_providers/LayoutProvider';


const commonNavigation = [
  { name: 'Dashboard', href: '/', rootHref: null, icon: HiOutlineHome },
  { name: 'Issues', href: '/issues/list', rootHref:'/issues', icon: HiOutlineTicket },
	{ name: 'Stock', href: '/stock-items/list', rootHref:'/stock-items', icon: MdShelves },
	{ name: 'Holdings', href: '/holdings/list', rootHref:'/holdings', icon: FaKitMedical },
]

const holdingsNavigation = [
  { name: 'Dashboard', href: '/dashboard', rootHref: null, icon: null },
  { name: 'Locations', href: '/locations', rootHref: null, icon: null },
  { name: 'Stock', href: '/stock', rootHref: null, icon: null },
  { name: 'Stock Item Usage', href: '/stock-item-usage', rootHref: null, icon: null },
  { name: 'Removed Items', href: '/removed-items', rootHref: null, icon: null },
  { name: 'Low Stock Items', href: '/low-stock-items', rootHref: null, icon: null },
  { name: 'Expiring Items', href: '/expiring-items', rootHref: null, icon: null },
];

const NavColumn = () => {

	const { isHoldingSelected, currentHolding } = useHoldingContext()
	const { updateIsSidebarOpen } = useLayoutContext()
	const currentPath = usePathname();
	const router = useRouter();
	
	const isRouteSelected = (href:string, rootHref: string | null) => {
		if(isHoldingSelected){
			return currentPath === `/holdings/${currentHolding?.id}${href}`
		}
    return rootHref 
			? currentPath === href || currentPath.startsWith(rootHref)
			: currentPath === href;
  };
	
	const navigation = isHoldingSelected ? holdingsNavigation : commonNavigation;


	return (
		<nav className="flex flex-1 flex-col">
		{isHoldingSelected && (
			<div className='h-6'>
				<HoldingNavTitle />
			</div>
		)}
		<ul role="list" className="flex flex-1 flex-col gap-y-7">
			<li>
				<ul role="list" className="-mx-2 space-y-1">
					{navigation.map((item) => (
						<li key={item.name}>
							<Link
								href={isHoldingSelected ? `/holdings/${currentHolding?.id}${item.href}` : item.href}
							>
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
												'h-6 w-6 shrink-0'
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