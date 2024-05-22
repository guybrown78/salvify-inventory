"use client";

import { FieldErrorMessage, Spinner } from "@/app/_components";
import { holdingSchema } from "@/app/validationSchema";
import { holdingTypeList } from "@/prisma/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { Holding } from "@prisma/client";
import {
	Button,
	Callout,
	Flex,
	Select,
	Switch,
	Text,
	TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type HoldingFormData = z.infer<typeof holdingSchema>;

interface Props {
	holding?: Holding;
}

const HoldingForm = ({ holding }: Props) => {
	const router = useRouter();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<HoldingFormData>({ resolver: zodResolver(holdingSchema) });

	// register("canAddIncidents")

	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		setValue("canAddIncidents", holding?.canAddIncidents ?? false);
	}, []);

	const onSubmit = handleSubmit(async (data) => {
		try {
			setIsSubmitting(true);
			if (holding) {
				await axios.patch("/api/holdings/" + holding.id, data);
			} else {
				await axios.post("/api/holdings", data);
			}
			router.push("/holdings/list");
			router.refresh();
		} catch (error) {
			setIsSubmitting(false);
			setError("An unexpected error occured");
		}
	});

	return (
		<div className="max-w-xl">
			{error && (
				<Callout.Root color="red" className="mb-5">
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form className="space-y-5" onSubmit={onSubmit}>
				<Flex gap="2" direction="column">
					<Text size="1">Holding title</Text>
					<TextField.Root>
						<TextField.Input
							defaultValue={holding?.title}
							placeholder="Holding Title/Name"
							{...register("title")}
						/>
					</TextField.Root>
					<FieldErrorMessage>{errors.title?.message}</FieldErrorMessage>
				</Flex>

				<Flex gap="2" direction="column">
					<Text size="1">Optional secondary field</Text>
					<TextField.Root>
						<TextField.Input
							defaultValue={holding?.field || ""}
							placeholder="Secondary field (optional)"
							{...register("field")}
						/>
					</TextField.Root>
					<FieldErrorMessage>{errors.field?.message}</FieldErrorMessage>
				</Flex>

				<Flex gap="2" align="center">
					<Text size="2">
						Allow Stock Incidents to be added direct into this Holding?
					</Text>
					<Switch
						radius="full"
						onCheckedChange={(checked) => {
							setValue("canAddIncidents", checked);
						}}
						defaultChecked={holding?.canAddIncidents ?? false}
					/>
					<FieldErrorMessage>
						{errors.canAddIncidents?.message}
					</FieldErrorMessage>
				</Flex>

				<Flex direction="column" gap="1">
					<Text size="2">Type of holding</Text>
					<Controller
						control={control}
						name="type"
						defaultValue={holding?.type || ""}
						render={({ field }) => {
							return (
								<Select.Root onValueChange={field.onChange} {...field}>
									<Select.Trigger />
									<Select.Content>
										<Select.Group>
											<Select.Label>Holding Type</Select.Label>
											{holdingTypeList.map((item) => (
												<Select.Item key={item.value} value={item.value}>
													{item.label}
												</Select.Item>
											))}
										</Select.Group>
									</Select.Content>
								</Select.Root>
							);
						}}
					/>
					<FieldErrorMessage>{errors.type?.message}</FieldErrorMessage>
				</Flex>

				<Button disabled={isSubmitting}>
					{holding ? "Update Holding" : "Create New Holding"}{" "}
					{isSubmitting && <Spinner />}
				</Button>
			</form>
		</div>
	);
};

export default HoldingForm;
