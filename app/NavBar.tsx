'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import classNames from 'classnames';
import { AiFillBug } from 'react-icons/ai'

const NavBar = () => {

	const currentPath = usePathname();
	const links = [
		{ label: 'Dashboard', href: '/' },
		{ label: 'Issues', href: '/issues' },
	]
	return (
		<nav className='flex items-center space-x-6 border-b mb-5 px-5 h-14'>
			<Link href="/"><AiFillBug /></Link>
			<ul className='flex space-x-6'>
				{links.map(link => 
					<Link key={link.href} className={classNames({
						'text-zinc-600': link.href === currentPath,
						'text-zinc-400': link.href !== currentPath,
						'hover:text-zinc-600 transition-colors': true
					})} href={link.href}>{link.label}</Link>)}
				<li></li>
			</ul>
		</nav>
	)
}

export default NavBar