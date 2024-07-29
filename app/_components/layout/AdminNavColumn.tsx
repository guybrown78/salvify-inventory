'use client'

import { useLayoutContext } from '@/app/_providers/LayoutProvider';
import classNames from 'classnames';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AdminNavTitle from './AdminNavTitle';



const adminNavigation = [
  { name: 'Clients', href: '/admin/clients', rootHref:'admin/clients' },
	{ name: 'Users', href: '/admin/users', rootHref:'/admin/users' }]

const AdminNavColumn = () => {

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

			<div className='h-6'>
				<AdminNavTitle />
			</div>

			<ul role="list" className="flex flex-1 flex-col gap-y-7">
				<li>
					<ul role="list" className="-mx-2 space-y-1">
						{adminNavigation.map((item) => (
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

export default AdminNavColumn