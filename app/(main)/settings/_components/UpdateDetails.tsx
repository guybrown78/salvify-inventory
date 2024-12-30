"use client";

import { FieldErrorMessage, Spinner } from "@/app/_components";
import { patchUserSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ProfileWrapper from "./ProfileWrapper";

interface Props {
	sessionUser: Session["user"]
}

const UpdateDetails = ({ sessionUser }: Props) => {
	const { update } = useSession(); // Access update function
  const router = useRouter();
  const [error, setError] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty }, 
		reset
  } = useForm({
    resolver: zodResolver(patchUserSchema), 
    defaultValues: {
      firstname: sessionUser.firstname || "",
      surname: sessionUser.surname || "",
      email: sessionUser.email || "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setError(""); 
    setIsSubmitting(true); 

    try {
      // Send API request to update user details
      await axios.patch(`/api/users/${sessionUser.id}`, data);

			const updateSession = await axios.post("/api/auth/update-session", data);

			if (updateSession.status === 200) {
				// Optionally, you can trigger a page refresh to reflect the changes
				
				reset(data);
				await update();
				// router.refresh();
			} else {
				setError("Failed to update the session");
			}
			

      // router.refresh();
    } catch (error) {
      setError("Failed to update your details. Please try again.");
    } finally {
      setIsSubmitting(false); 
    }
  });

  return (
    <ProfileWrapper
      title="Personal Information"
      description="Manage your personal details and ensure your information is up to date. If you update your email address, it will change the way you sign in to your account in the future."
    >
      <form onSubmit={onSubmit} className="md:col-span-2">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          {/* Firstname Field */}
          <div className="sm:col-span-3">
            <TextField.Root>
              <TextField.Input
                type="text"
                placeholder="Firstname"
                {...register("firstname")} 
              />
            </TextField.Root>
            <FieldErrorMessage>{errors.firstname?.message}</FieldErrorMessage>
          </div>

          {/* Surname Field */}
          <div className="sm:col-span-3">
            <TextField.Root>
              <TextField.Input
                type="text"
                placeholder="Surname"
                {...register("surname")}
              />
            </TextField.Root>
            <FieldErrorMessage>{errors.surname?.message}</FieldErrorMessage>
          </div>

          {/* Email Address Field */}
          <div className="col-span-full">
            <TextField.Root>
              <TextField.Input
                type="email"
                placeholder="Email Address"
                {...register("email")} 
              />
            </TextField.Root>
            <FieldErrorMessage>{errors.email?.message}</FieldErrorMessage>
          </div>
        </div>

        {/* Submission Button */}
        <div className="mt-8 flex">
          <Button
            type="submit"
            disabled={!isDirty || isSubmitting} 
          >
            {isSubmitting ? "Updating" : "Update"} your Details{" "}
            {isSubmitting && <Spinner />}
          </Button>
        </div>

        {/* Error Message */}
        {error && <FieldErrorMessage>{error}</FieldErrorMessage>}
      </form>
    </ProfileWrapper>
  );
};

export default UpdateDetails;