"use client";

import { holdingTypeList } from "@/prisma/enums";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const HoldingTypeFilter = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	return (
		<Select.Root
			defaultValue={searchParams.get("type") || ""}
			onValueChange={(type) => {
				const params = new URLSearchParams();
				if (type) params.append("type", type);
				if (searchParams.get("orderBy"))
					params.append("orderBy", searchParams.get("orderBy")!);
				const query = params.size ? "?" + params.toString() : ""; //status ? `?status=${status}` : ''
				router.push("/holdings/list" + query);
			}}
		>
			<Select.Trigger />
			<Select.Content>
				<Select.Item value="">All</Select.Item>
				{holdingTypeList.map((type) => (
					<Select.Item key={type.value} value={type.value || ""}>
						{type.label}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	);
};

export default HoldingTypeFilter;
