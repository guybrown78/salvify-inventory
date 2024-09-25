"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema } from "@/app/validationSchema"; // Assuming the schema is defined here
import { Box, Button, Callout, Flex, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { FieldErrorMessage, Spinner } from "@/app/_components";
import { ClientWithUserItems } from "@/app/_types/clientTypes";

type ClientFormData = z.infer<typeof clientSchema>;

interface Props {
  client?: ClientWithUserItems
}


const ClientForm = ({ client }: Props) => {
  const router = useRouter();

  // Setup react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client?.name || "",
    },
  });

  const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setError(""); // Reset error before submission
    try {
			setIsSubmitting(true);
      if (client) {
        await axios.patch(`/api/clients/${client.id}`, data);
      } else {
        await axios.post("/api/clients", data);
      }
      router.push("/admin/clients/list");
			router.refresh();
    } catch (err) {
			setIsSubmitting(false);
      setError("An unexpected error occurred");
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
                placeholder="Client Name"
                {...register("name")}
              />
            </TextField.Root>
            <FieldErrorMessage>
              {errors.name?.message}
             </FieldErrorMessage>
		
          </Box>

          <Button disabled={isSubmitting}>
            {client ? "Update Client" : "Create New Client"}{" "}
            {isSubmitting && <Spinner />}
          </Button>
        </Flex>
      </form>
    </div>
  );
};

export default ClientForm;