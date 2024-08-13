"use client";

import { FieldErrorMessage, Spinner } from "@/app/_components";
import { UserWithClients } from "@/app/_types/userTypes";
import {} from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Client } from "@prisma/client";
import { Button, Callout, Select, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type UserFormData = {}; //z.infer<typeof issueSchema>

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
		resolver: zodResolver(),
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
				<TextField.Root>
					<TextField.Input
						defaultValue={user?.name}
						placeholder="Name"
						{...register("name")}
					/>
				</TextField.Root>
				<FieldErrorMessage>{errors.name?.message}</FieldErrorMessage>

				<Select.Root>
					<Select.Trigger />
					<Select.Content>
						<Select.Group>
							<Select.Label>Client</Select.Label>
							{clients.map((client) => (
								<Select.Item key={client.id} value={client.id}>
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
			</form>
		</div>
	);
};

export default UserForm;
