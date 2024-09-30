"use client";

import { FieldErrorMessage, Spinner } from "@/app/_components";
import EnumItemSelect from "@/app/_components/select/EnumItemSelect";
import { UserWithClients } from "@/app/_types/userTypes";
import { adminUserSchema } from "@/app/validationSchema";
import { userRoleList } from "@/prisma/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { Client, UserRole } from "@prisma/client";
import {
	Box,
	Button,
	Callout,
	Flex,
	Select,
	TextField,
	Text
} from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type UserFormData = z.infer<typeof adminUserSchema>;

const filteredUserRoleList = userRoleList.filter(
	(role) => role.value !== UserRole.SUPERADMIN
);

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
		setValue,
	} = useForm<UserFormData>({
		resolver: zodResolver(adminUserSchema),
	});

	//
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = handleSubmit(async (data) => {
		setError('')
		try {
			setIsSubmitting(true);
			if (user) {
				await axios.patch("/api/admin/users/" + user.id, data);
			} else {
				await axios.post("/api/admin/users", data);
			}
			router.push("/admin/users/list");
			router.refresh();
		} catch (error) {
			setIsSubmitting(false);
			if(axios.isAxiosError(error)){
				const status = error.response?.status;
      	const data = error.response?.data;
				if (status && status !== 404 && status !== 500) {
					setError(`${status}: ${data}`);
				} else {
					setError("An unexpected error occured");
				}
			}else {
				// Handle non-Axios errors (if necessary)
				setError("An unexpected error occurred");
			}
		
		}
	});

	return (
		<div className="max-w-xl">
			{error && (
				<Callout.Root color="red" className="mb-5">
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form className="space-y-3" onSubmit={onSubmit}>
				<Flex direction="column" gap="5">
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

					{
						!user && (
							<>
							<Box>
								<TextField.Root>
									<TextField.Input
										type="email"
										defaultValue=""
										placeholder="Email"
										{...register("email")}
									/>
								</TextField.Root>
								<FieldErrorMessage>{errors.email?.message}</FieldErrorMessage>
							</Box>

							<Box>
								<TextField.Root>
									<TextField.Input
										type="password"
										placeholder="Password"
										{...register("password")}
									/>
								</TextField.Root>
								<FieldErrorMessage>{errors.password?.message}</FieldErrorMessage>
							</Box>

							<Box>
								<TextField.Root>
									<TextField.Input
										type="password"
										placeholder="Confirm Password"
										{...register("confirmPassword")}
									/>
								</TextField.Root>
								<FieldErrorMessage>
									{errors.confirmPassword?.message}
								</FieldErrorMessage>
							</Box>
							</>
						)
					}
					

					<Flex direction='column'>
						<Text size='1'>
							Client:
						</Text>
						<Controller
							control={control}
							name="client"
							defaultValue={user ? String(user.clientId) : ""}
							disabled={isSubmitting}
							render={({ field: { onChange, value } }) => (
								<Select.Root
									onValueChange={(newValue) => {
										setValue("client", newValue); 
										onChange(newValue); 
									}}
									value={value} 
								>
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
							)}
						/>
						<FieldErrorMessage>{errors.client?.message}</FieldErrorMessage>
					</Flex>
					
			

					{/* Role Selection */}
					<Flex direction='column'>
						<Text size='1'>
							User Role:
						</Text>
						<Controller
							control={control}
							name="role"
							defaultValue={user?.role || UserRole.ADMIN}
							render={({ field }) => (
								<EnumItemSelect
									field={field}
									label="Role"
									list={filteredUserRoleList}
								/>
							)}
						/>
						<FieldErrorMessage>{errors.role?.message}</FieldErrorMessage>
					</Flex>
				

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
