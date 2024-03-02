'use client'

import Link from "next/link";
import classNames from 'classnames';
import { usePathname } from "next/navigation";
import {
	HiCalendar,
	HiOutlineChartPie,
	HiOutlineCog6Tooth,
	HiOutlineDocumentDuplicate,
	HiOutlineFolder,
	HiOutlineHome,
	HiOutlineUser,
	HiOutlineTicket
} from "react-icons/hi2";

import { MdShelves } from "react-icons/md";

const navigation = [
  { name: 'Dashboard', href: '/', icon: HiOutlineHome },
  { name: 'Issues', href: '/issues/list', icon: HiOutlineTicket },
	{ name: 'Stock', href: '/stock/list', icon: MdShelves },
  // { name: 'Projects', href: '#', icon: HiOutlineFolder, current: false },
  // { name: 'Calendar', href: '#', icon: HiCalendar, current: false },
  // { name: 'Documents', href: '#', icon: HiOutlineDocumentDuplicate, current: false },
  // { name: 'Reports', href: '#', icon: HiOutlineChartPie, current: false },
]
// const teams = [
//   { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
//   { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
//   { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
// ]


const NavColumn = () => {
	const currentPath = usePathname();

	return (
		<nav className="flex flex-1 flex-col">
		<ul role="list" className="flex flex-1 flex-col gap-y-7">
			<li>
				<ul role="list" className="-mx-2 space-y-1">
					{navigation.map((item) => (
						<li key={item.name}>
							<Link
								href={item.href}
								className={classNames(
									item.href === currentPath
										? 'bg-gray-50 text-green-600'
										: 'text-gray-700 hover:text-green-600 hover:bg-gray-50',
									'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
								)}
							>
								<item.icon
									className={classNames(
										item.href === currentPath ? 'text-green-600' : 'text-gray-400 group-hover:text-green-600',
										'h-6 w-6 shrink-0'
									)}
									aria-hidden="true"
								/>
								{item.name}
							</Link>
						</li>
					))}
				</ul>
			</li>
			{/* 
			<li>
				<div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
				<ul role="list" className="-mx-2 mt-2 space-y-1">
					{teams.map((team) => (
						<li key={team.name}>
							<a
								href={team.href}
								className={classNames(
									team.current
										? 'bg-gray-50 text-indigo-600'
										: 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
									'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
								)}
							>
								<span
									className={classNames(
										team.current
											? 'text-indigo-600 border-indigo-600'
											: 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
										'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
									)}
								>
									{team.initial}
								</span>
								<span className="truncate">{team.name}</span>
							</a>
						</li>
					))}
				</ul>
			</li> 
			*/}
			{/* 
			<li className="mt-auto">
				<a
					href="#"
					className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
				>
					<HiOutlineCog6Tooth
						className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
						aria-hidden="true"
					/>
					Settings
				</a>
			</li> 
			*/}
		</ul>
	</nav>
	)
}

export default NavColumn