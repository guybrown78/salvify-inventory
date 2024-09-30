"use client";

import { Button, TextField } from "@radix-ui/themes";
import ProfileWrapper from "./ProfileWrapper";
import { SessionUser } from "@/app/_types/types";
import { Spinner } from "@/app/_components";

interface Props {
	sessionUser:SessionUser
}


const UpdateDetails = ({ sessionUser }: Props) => {
	return (
		<ProfileWrapper
			title="Personal Information"
			description="Manage your personal details and ensure your information is up to date. If you update your email address, it will change the way you sign in to your account in the future."
		>
			<form className="md:col-span-2">
				<div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
					<div className="sm:col-span-3">
						<TextField.Root>
							<TextField.Input
								type="text"
								defaultValue=""
								placeholder="Firstname"
							/>
						</TextField.Root>
					</div>

					<div className="sm:col-span-3">
						<TextField.Root>
							<TextField.Input
								type="text"
								defaultValue=""
								placeholder="Surname"
							/>
						</TextField.Root>
					</div>

					<div className="col-span-full">
						<TextField.Root>
							<TextField.Input
								type="email"
								defaultValue=""
								placeholder="Email Address"
							/>
						</TextField.Root>
					</div>
				</div>

				<div className="mt-8 flex">
					<Button type="submit" disabled>Update your Details</Button>
				</div>
			</form>
		</ProfileWrapper>
	);
};

export default UpdateDetails;
