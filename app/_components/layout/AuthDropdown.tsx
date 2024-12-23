"use client";

import { Skeleton } from "@/app/_components";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Box, Button, DropdownMenu, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";

const AuthDropdown = () => {
	const { status, data: session } = useSession();

	if (status === "loading") return <Skeleton width="3rem" />;

	if (status === "unauthenticated") {
		return (
			<Link className="nav-link" href="/api/auth/signin">
				Login
			</Link>
		);
	}

	if (!session?.user) {
		return <Skeleton width="3rem" />;
	}

	console.log(" -- session!.user -- ");
	console.log(session!.user);

	return (
		<Box>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{/* <Avatar
						src={session!.user!.image!}
						fallback="?"
						size="2"
						radius="full"
						className="cursor-pointer"
						// referrerPolicy="no-referrer"
					/>  */}
					<Text size="2" className="cursor-pointer flex items-center">
						{session.user!.name}
						<span className="ml-2">
							<ChevronDownIcon />
						</span>
					</Text>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Label>
						<Text size="2">{session!.user!.email}</Text>
					</DropdownMenu.Label>

					{session!.user && (
						<DropdownMenu.Label>
							<Text size="2">{session!.user!.clientName}</Text>
						</DropdownMenu.Label>
					)}

					<DropdownMenu.Item>
						<Link href="/settings/profile">Profile Settings</Link>
					</DropdownMenu.Item>
					<Link href="/api/auth/signout" className="mt-2">
						<Button variant="outline" className="w-full">
							Log out
						</Button>
					</Link>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Box>
	);
};

export default AuthDropdown;
