"use client";

import { FieldErrorMessage, Spinner } from "@/app/_components";
import Logo from "@/app/_components/layout/Logo";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	Callout,
	Card,
	Flex,
	Heading,
	TextField,
} from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
interface Props {
	credentialsError?: boolean;
}

const loginSchema = z.object({
	email: z
		.string()
		.min(1, "Enter a your email address.")
		.email("This is not a valid email."),
	password: z
		.string()
		.min(8, "Password should be at least 8 characters.")
		.max(65535),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = ({ credentialsError }: Props) => {
	const appName: string = "Salvify";
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});
	const [error, setError] = useState(credentialsError ? "Signin failed." : "");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = handleSubmit(async (data) => {
		try {
			setIsSubmitting(true);
			await signIn("credentials", {
				...data,
				redirect: true,
				callbackUrl: "/",
			});
		} catch (error) {
			setIsSubmitting(false);
			console.log(error);
			setError("An unexpected error occured");
		}
	});

	return (
		<div className="w-full mx-auto max-w-md space-y-8">
			<div className="max-w-lg mx-auto flex flex-col items-center">
				<Card className="min-w-full">
					<Flex direction="column" gap="5">
						<Logo classNames="h-11 max-h-11" />
						<Heading size="5" align="center">
							Sign in to your account
						</Heading>
						{error && (
							<Callout.Root color="red" className="mb-5">
								<Callout.Text>{error}</Callout.Text>
							</Callout.Root>
						)}
						<form className="space-y-3 w-full" onSubmit={onSubmit}>
							<TextField.Root>
								<TextField.Input placeholder="Email" {...register("email")} />
							</TextField.Root>
							<FieldErrorMessage>{errors.email?.message}</FieldErrorMessage>
							<TextField.Root>
								<TextField.Input
									type="password"
									placeholder="Password"
									{...register("password")}
								/>
							</TextField.Root>
							<FieldErrorMessage>{errors.password?.message}</FieldErrorMessage>
							<Button disabled={isSubmitting} className="w-full">
								{!isSubmitting ? "Sign in" : "Signing in"}{" "}
								{isSubmitting && <Spinner />}
							</Button>
						</form>
					</Flex>
				</Card>
			</div>
		</div>
	);
};

export default Login;
