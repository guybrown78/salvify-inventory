"use client"

import { FieldErrorMessage, Spinner } from "@/app/_components";
import axios, { AxiosError } from "axios";
import { Flex, Heading, Text, Grid, Button, Checkbox } from '@radix-ui/themes'
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Client } from "@prisma/client";


interface Props {
	clients: Client[];
	userOptionalClients: Client[]
	userId: string
}

const UserOptionalClientsForm = ({ clients, userOptionalClients, userId }: Props) => {

	const router = useRouter();
	//
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm<{ selectedClients: number[] }>({
		defaultValues:{
			selectedClients: userOptionalClients.map(client => client.id)
		}
	});
	//
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const selectedClients = watch("selectedClients");

	const hasChanges = JSON.stringify(selectedClients.sort()) !== JSON.stringify(userOptionalClients.map(c => c.id).sort());

	const onSubmit = handleSubmit(async (data) => {
		console.log("Submit", data)
		setIsSubmitting(true)
		try{
			console.log("SEND")
			await axios.patch(`/api/admin/users/${userId}/clients`, {
        clientIds: data.selectedClients,  
      });
      router.refresh();  
		} catch (error) {
			setError("An unexpected error occurred");
		} finally {
			setIsSubmitting(false);
		}
	});


	return (
		<form className="space-y-3" onSubmit={onSubmit}>
			<Flex direction="column" gap="1">
				<Grid columns={{ initial: "2", sm: "3", md:"4", lg: "6"}} gap="2" align="center" >
					{
						clients.map(client => (
							<div key={client.id}>
								<Flex align="center" gap="2">
									<Controller
										name="selectedClients"
										control={control}
										render={({ field }) => (
											<Checkbox
												id={"c-"+client.id}
												checked={selectedClients.includes(client.id)}
												onCheckedChange={(checked) => {
													const newSelectectedClients = checked 
														? [...field.value, client.id] 
														: field.value.filter(id => id !== client.id);
													setValue("selectedClients", newSelectectedClients);
												}}
											/>
										)}
									/>
									<label className="Label" htmlFor={"c-"+client.id}>
										<Text size="1">{client.name}</Text>
      						</label>
								</Flex>
								
							</div>
						))
					}
				</Grid>

				<Button disabled={!hasChanges || isSubmitting} type="submit">
					{isSubmitting ? "Updating Users Optional Clients" : "Updating Users Optional Clients"}{" "}
					{isSubmitting && <Spinner />}
				</Button>

			</Flex>
		</form>
	)
}

export default UserOptionalClientsForm