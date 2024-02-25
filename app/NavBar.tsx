'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import classNames from 'classnames';
import { AiFillBug } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';

const NavBar = () => {

	const currentPath = usePathname();
	const links = [
		{ label: 'Dashboard', href: '/' },
		{ label: 'Issues', href: '/issues/list' },
	]
	
	const { status, data: session } = useSession();
	// console.log(status)
	return (
		<Container>
			<nav className='border-b mb-5 px-5 py-3'>
				<Flex justify="between">
					<Flex align="center" gap="3">
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
					</Flex>
					<Box>
						{ status === 'authenticated' && (
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									<Avatar
										src={session!.user!.image!}
										fallback="?"
										size="2"
										radius="full"
										className="cursor-pointer"
										referrerPolicy="no-referrer"
									/>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content>
									<DropdownMenu.Label>
										<Text size="2">{session!.user!.name}</Text>
									</DropdownMenu.Label>
									<DropdownMenu.Label>
										<Text size="2">{session!.user!.email}</Text>
									</DropdownMenu.Label>
									<DropdownMenu.Item>
										<Link href="/api/auth/signout">Log out</Link>
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>

						)}
						{ status === 'unauthenticated' && (
							<Link href="/api/auth/signin">Log in</Link>
						)}
					</Box>
				</Flex>

			</nav>
		</Container>
	
	)
}

export default NavBar