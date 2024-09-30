"use client";

import { Button, TextField } from "@radix-ui/themes";
import ProfileWrapper from "./ProfileWrapper";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "@/app/validationSchema";
import { FieldErrorMessage, Spinner } from "@/app/_components";
import axios, { AxiosError } from "axios";
import { SessionUser } from "@/app/_types/types";

interface Props {
	sessionUser:SessionUser
}


const ChangePassword = ({ sessionUser }: Props) => {

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	const {
    handleSubmit,
    register,
    formState: { errors, isValid, isDirty },
    reset, 
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange", 
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });


	const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    setError("");

    try {
      await axios.patch(`/api/users/${sessionUser.id}/change-password`, {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
				confirmNewPassword: data.confirmNewPassword,
      });

      reset();

    } catch (error) {
      if(axios.isAxiosError(error)){
				const status = error.response?.status;
      	const data = error.response?.data;
				if (status && status !== 404 && status !== 500) {
					setError(data);
				} else {
					setError("An unexpected error occured");
				}
			}else {
				// Handle non-Axios errors (if necessary)
				setError("An unexpected error occurred");
			}
    } finally {
      setIsSubmitting(false);
    }
  });



	return (	
		<ProfileWrapper
			title="Change password"
			description="Update your password associated with your account."
		>
			<form className="md:col-span-2" autoComplete="off" onSubmit={onSubmit}>
				<div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
					<div className="col-span-full">
						<TextField.Root>
							<TextField.Input
								type="password"
								defaultValue=""
								placeholder="Current Password"
								autoComplete="off" 
								{...register("currentPassword")}
							/>
						</TextField.Root>
						<FieldErrorMessage>{errors.currentPassword?.message}</FieldErrorMessage>
					</div>

					<div className="col-span-full">
						<TextField.Root>
							<TextField.Input
								type="password"
								defaultValue=""
								placeholder="New Password"
								autoComplete="new-password" 
								{...register("newPassword")}
							/>
						</TextField.Root>
						<FieldErrorMessage>{errors.newPassword?.message}</FieldErrorMessage>
					</div>

					<div className="col-span-full">
						<TextField.Root>
							<TextField.Input
								type="password"
								defaultValue=""
								placeholder="Confirm Password"
								autoComplete="new-password"
								{...register("confirmNewPassword")}
							/>
						</TextField.Root>
						<FieldErrorMessage>{errors.confirmNewPassword?.message}</FieldErrorMessage>
					</div>
				</div>

				<div className="mt-8 flex">
					<Button type="submit" disabled={!isDirty || !isValid || isSubmitting}>
  
						{isSubmitting ? "Changeing" : "Change"} your Password{" "}
            {isSubmitting && <Spinner />}
          </Button>
				</div>
				{error && <FieldErrorMessage>{error}</FieldErrorMessage>}

			</form>
		</ProfileWrapper>
	);
};

export default ChangePassword;
