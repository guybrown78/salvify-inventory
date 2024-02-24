'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import classNames from 'classnames';
import { AiFillBug } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import { Box } from '@radix-ui/themes';

const NavBar = () => {

	const currentPath = usePathname();
	const links = [
		{ label: 'Dashboard', href: '/' },
		{ label: 'Issues', href: '/issues/list' },
	]
	
	const { status, data: session } = useSession();
	console.log(status)
	return (
		<nav className='flex items-center space-x-6 border-b mb-5 px-5 h-14'>
			<Link href="/"><AiFillBug /></Link>
			<ul className='flex space-x-6'>
				{links.map(link => 
				<li key={link.href}>
					<Link  className={classNames({
						'text-zinc-600': link.href === currentPath,
						'text-zinc-400': link.href !== currentPath,
						'hover:text-zinc-600 transition-colors': true
					})} href={link.href}>{link.label}</Link>
				</li>)}
			</ul>
			<Box>
				{ status === 'authenticated' && (
					<Link href="/api/auth/signout">Log out</Link>
				)}
				{ status === 'unauthenticated' && (
					<Link href="/api/auth/signin">Log in</Link>
				)}
			</Box>
		</nav>
	)
}

export default NavBar