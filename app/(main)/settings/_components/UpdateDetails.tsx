"use client";

import { Button, TextField } from "@radix-ui/themes";
import ProfileWrapper from "./ProfileWrapper";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patchUserSchema } from "@/app/validationSchema";
import { FieldErrorMessage, Spinner } from "@/app/_components";
import axios from "axios";
import { useSessionUserContext } from "@/app/_providers/SessionUserProvider";
import { useRouter } from "next/navigation";
import { SessionUser } from "@/app/_types/types";

interface Props {
  sessionUser: SessionUser;
}

const UpdateDetails = ({ sessionUser }: Props) => {
  const router = useRouter();
  const { updateSessionUser } = useSessionUserContext(); 
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
      const { data: updatedSessionUser } = await axios.get("/api/users/me");
      updateSessionUser(updatedSessionUser); 

			reset({
        firstname: updatedSessionUser.firstname || "",
        surname: updatedSessionUser.surname || "",
        email: updatedSessionUser.email || "",
      });

      router.refresh();
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