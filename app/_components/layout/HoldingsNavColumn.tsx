'use client'

import { useHoldingContext } from '@/app/_providers/HoldingProvider';
import { useLayoutContext } from '@/app/_providers/LayoutProvider';
import { Holding } from '@prisma/client';
import classNames from 'classnames';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import HoldingNavTitle from './HoldingNavTitle';


const holdingsNavigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Locations', href: '/locations' },
  { name: 'Stock', href: '/stock' },
  { name: 'Stock Item Usage', href: '/stock-item-usage' },
  { name: 'Removed Items', href: '/removed-items' },
  { name: 'Low Stock Items', href: '/low-stock-items' },
  { name: 'Expiring Items', href: '/expiring-items' },
];

const getHoldingNav = (holding:Holding) => {
	const arr = [...holdingsNavigation]
	if(holding && holding.type === 'STORE'){
		arr.splice(4, 0, {
			name: 'Add Instances', 
			href: '/add',
		});
	}
	return arr
}
const HoldingsNavColumn = () => {

	const { currentHolding } = useHoldingContext()
	const { updateIsSidebarOpen } = useLayoutContext()
	const currentPath = usePathname();
	const router = useRouter();
	
	const isRouteSelected = (href:string) => {
		return currentPath === `/holdings/${currentHolding?.id}${href}`
  };
	
	const navigation = getHoldingNav(currentHolding!);

	return (
		<nav className="flex flex-1 flex-col">
		
			<div className='h-6'>
				<HoldingNavTitle />
			</div>

			<ul role="list" className="flex flex-1 flex-col gap-y-7">
				<li>
					<ul role="list" className="-mx-2 space-y-1">
						{navigation.map((item) => (
							<li key={item.name}>
								<Link
									href={`/holdings/${currentHolding?.id}${item.href}`}
								>
									<div 
										className={classNames(
											isRouteSelected(item.href)
												? 'bg-gray-50 text-green-600'
												: 'text-gray-700 hover:text-green-600 hover:bg-gray-50',
											'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
										)}
										onClick={() => { updateIsSidebarOpen(false) }}
									>
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

export default HoldingsNavColumn