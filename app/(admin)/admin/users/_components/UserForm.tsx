"use client";

import { FieldErrorMessage, Spinner } from "@/app/_components";
import { UserWithClients } from "@/app/_types/userTypes";
import { userSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Client } from "@prisma/client";
import { Box, Button, Callout, Flex, Select, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';

type UserFormData = z.infer<typeof userSchema>

interface Props {
	clients: Client[];
	user?: UserWithClients;
}

const UserForm = ({ clients, user }: Props) => {
	const router = useRouter();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<UserFormData>({
		resolver: zodResolver(userSchema),
	});
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = handleSubmit(async (data) => {});

	return (
		<div className="max-w-xl">
			{error && (
				<Callout.Root color="red" className="mb-5">
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form className="space-y-3" onSubmit={onSubmit}>
				<Flex direction='column' gap="5">

					<Box>
						<TextField.Root>
							<TextField.Input
								defaultValue={user?.firstname || ""}
								placeholder="Firstname"
								{...register("firstname")}
							/>
						</TextField.Root>
						<FieldErrorMessage>{errors.firstname?.message}</FieldErrorMessage>
					</Box>

					<Box>
						<TextField.Root>
							<TextField.Input
								defaultValue={user?.surname || ""}
								placeholder="Surname"
								{...register("surname")}
							/>
						</TextField.Root>
						<FieldErrorMessage>{errors.surname?.message}</FieldErrorMessage>
					</Box>

					<Box>
						<TextField.Root>
							<TextField.Input
								type="email"
								defaultValue={user?.email || ""}
								placeholder="Email"
								{...register("email")}
							/>
						</TextField.Root>
						<FieldErrorMessage>{errors.email?.message}</FieldErrorMessage>
					</Box>

					<Select.Root>
						<Select.Trigger />
						<Select.Content>
							<Select.Group>
								<Select.Label>Client</Select.Label>
								{clients.map((client) => (
									<Select.Item key={client.id} value={String(client.id)}>
										{client.name}
									</Select.Item>
								))}
							</Select.Group>
						</Select.Content>
					</Select.Root>

					<Button disabled={isSubmitting}>
						{user ? "Update User" : "Create New User"}{" "}
						{isSubmitting && <Spinner />}
					</Button>

				</Flex>
			
				
			</form>
		</div>
	);
};

export default UserForm;
