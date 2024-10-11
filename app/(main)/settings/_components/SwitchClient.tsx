"use client";

import { FieldErrorMessage, Spinner } from "@/app/_components";
import { SessionUser } from "@/app/_types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Select, Text } from "@radix-ui/themes";
import { useState } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import ProfileWrapper from "./ProfileWrapper";
import { useSessionUserContext } from "@/app/_providers/SessionUserProvider"
import { useRouter } from "next/navigation";
import { Client } from "@prisma/client";

const switchClientSchema = z.object({
	clientId: z.string().min(1, "Please select a client."),
});

interface Props {
	sessionUser: SessionUser;
	clients: Client[]
}

const SwitchClient = ({ sessionUser, clients }: Props) => {

	const router = useRouter();

	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { updateSessionUser } = useSessionUserContext();

	const {
		handleSubmit,
		control,
		watch,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(switchClientSchema),
		defaultValues: {
			clientId: String(sessionUser?.clientId), // default to current client
		},
	});

	const selectedClientId = watch("clientId");

	const onSubmit = handleSubmit(async (data) => {

		// if (selectedClientId === String(sessionUser?.clientId)) return;
		setError('');
		setIsSubmitting(true);
	
		try {

			await axios.post(`/api/users/${sessionUser.id}/switch-client`, {
				newClientId: data.clientId,
			});
			const updatedSessionUser = await axios.get('/api/users/me')
			updateSessionUser(updatedSessionUser.data);
			router.refresh();  

		} catch (error) {
			setIsSubmitting(false);
			setError("An unexpected error occurred");
		} finally {
			setIsSubmitting(false);
		}
	});

	if (!sessionUser?.optionalClients?.length) {
		return null;
	}

	return (
		<ProfileWrapper
			title="Switch Client"
			description="Switch between clients to view or manage their specific details."
		>
			<form className="md:col-span-2" onSubmit={onSubmit}>
				<div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
					<div className="col-span-full">
						<Text>
							Current Selected Client:{" "}
							<span className="font-bold">{sessionUser?.clientName}</span>
						</Text>
					</div>

					<div className="col-span-full">
						<Controller
							name="clientId"
							control={control}
							render={({ field }) => (
								<Select.Root onValueChange={field.onChange} {...field}>
									<Select.Trigger />
									<Select.Content>
										<Select.Group>
											<Select.Label>Client</Select.Label>
											{sessionUser?.optionalClients?.map((client) => (
												<Select.Item key={client.clientId} value={String(client.clientId)}>
													{clients.filter(c => c.id === client.clientId)[0].name || ""}
												</Select.Item>
											))}
										</Select.Group>
									</Select.Content>
								</Select.Root>
							)}
						/>
						<FieldErrorMessage>{errors.clientId?.message}</FieldErrorMessage>
					</div>
				</div>

				<div className="mt-8 flex">
				<Button
            type="submit"
            disabled={isSubmitting || selectedClientId === String(sessionUser?.clientId)}
          >
            {isSubmitting ? "Switching" : "Switch"} Current Client{" "}
            {isSubmitting && <Spinner />}
          </Button>
				</div>
			</form>
		</ProfileWrapper>
	);
};

export default SwitchClient;
