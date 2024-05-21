"use client";
import { orderStatusList } from "@/prisma/enums";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const OrderStatusFilter = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	return (
		<Select.Root
			defaultValue={searchParams.get("status") || ""}
			onValueChange={(status) => {
				const params = new URLSearchParams();
				if (status) params.append("status", status);
				if (searchParams.get("orderBy"))
					params.append("orderBy", searchParams.get("orderBy")!);
				const query = params.size ? "?" + params.toString() : ""; //status ? `?status=${status}` : ''
				router.push("/orders/list" + query);
			}}
		>
			<Select.Trigger />
			<Select.Content>
				<Select.Item value="">All</Select.Item>
				{orderStatusList.map((status) => (
					<Select.Item key={status.value || "All"} value={status.value || ""}>
						{status.label}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	);
};

export default OrderStatusFilter;
