	"use client";

	import { Button, TextField } from "@radix-ui/themes";
	import ProfileWrapper from "./ProfileWrapper";
import Link from "next/link";

	const Logout = () => {
		return (
			<ProfileWrapper
				title="Log out"
				description="Sign out of your account securely."
			>
				<div className="md:col-span-2">
					<div className="flex">
						
						<Link href="/api/auth/signout">
							<Button type="button" variant="outline">Log out</Button>
						</Link>
					</div>
				</div>
			</ProfileWrapper>
		);
	};

	export default Logout;
