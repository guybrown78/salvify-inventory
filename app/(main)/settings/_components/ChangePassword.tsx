"use client";

import { Button, TextField } from "@radix-ui/themes";
import ProfileWrapper from "./ProfileWrapper";
import { SessionUser } from "@/app/_types/types";
import { Spinner } from "@/app/_components";

interface Props {
	sessionUser:SessionUser
}


const ChangePassword = ({ sessionUser }: Props) => {
	return (	
		<ProfileWrapper
			title="Change password"
			description="Update your password associated with your account."
		>
			<form className="md:col-span-2">
				<div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
					<div className="col-span-full">
						<TextField.Root>
							<TextField.Input
								type="password"
								defaultValue=""
								placeholder="Current Password"
							/>
						</TextField.Root>
					</div>

					<div className="col-span-full">
						<TextField.Root>
							<TextField.Input
								type="password"
								defaultValue=""
								placeholder="New Password"
							/>
						</TextField.Root>
					</div>

					<div className="col-span-full">
						<TextField.Root>
							<TextField.Input
								type="password"
								defaultValue=""
								placeholder="Confirm Password"
							/>
						</TextField.Root>
					</div>
				</div>

				<div className="mt-8 flex">
					<Button type="submit" disabled>Change your Password</Button>
				</div>
			</form>
		</ProfileWrapper>
	);
};

export default ChangePassword;
