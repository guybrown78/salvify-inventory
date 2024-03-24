'use client'

import { useHoldingContext } from '@/app/_providers/HoldingProvider';
import { useLayoutContext } from '@/app/_providers/LayoutProvider';
import { Holding } from '@prisma/client';
import classNames from 'classnames';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import HoldingNavTitle from './HoldingNavTitle';

import { 
	BiSolidPlusCircle,
	BiSolidMinusCircle 
} from "react-icons/bi";
import { 
	TbCircleArrowDownFilled,
	TbAlertCircleFilled
} from "react-icons/tb";
import { Text } from '@radix-ui/themes';

const holdingsNavigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Locations', href: '/locations' },
  { name: 'Stock', href: '/stock' },
  { name: 'Stock Item Usage', href: '/stock-item-usage' },
  // { name: 'Removed Items', href: '/removed-items' },
  // { name: 'Low Stock Items', href: '/low-stock-items' },
  // { name: 'Expiring Items', href: '/expiring-items' },
];

const quickLinksNavigation = [
  { name: 'Removed Items', href: '/removed-items', icon: BiSolidMinusCircle, color:'text-violet-600' },
	{ name: 'Low Stock Items', href: '/low-stock-items', icon: TbCircleArrowDownFilled, color:'text-amber-600' },
	{ name: 'Expiring Items',href: '/expiring-items', icon: TbAlertCircleFilled, color:'text-red-600' },
]




const getHoldingNav = (holding:Holding) => {
	const arr = [...quickLinksNavigation]
	if(holding && holding.type === 'STORE'){
		arr.splice(1, 0, {
			name: 'Add Instances', 
			href: '/add',
			icon: BiSolidPlusCircle,
			color: 'text-cyan-600'
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
		return currentPath.startsWith(`/holdings/${currentHolding?.id}${href}`)
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
						
						{holdingsNavigation.map((item) => (
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


				<li>
					<ul role="list" className="-mx-2 space-y-1">
						<li><Text size="2">Quick links</Text></li>
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
											'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold items-center'
										)}
										onClick={() => { updateIsSidebarOpen(false) }}
									>
										{item.icon && (
											<item.icon
												className={classNames(
												isRouteSelected(item.href) 
														? 'text-green-600' 
														: `${item.color} group-hover:text-green-600`,
													'h-4 w-4 shrink-0'
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

export default HoldingsNavColumn