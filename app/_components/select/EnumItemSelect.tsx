import { Select } from "@radix-ui/themes";

interface Props {
	field: any;
	label: string;
	list: { label: string; value: string }[] | [];
}
const EnumItemSelect = ({ field, label, list }: Props) => {
	return (
		<Select.Root onValueChange={field.onChange} {...field}>
			<Select.Trigger />
			<Select.Content>
				<Select.Group>
					<Select.Label>{label}</Select.Label>
					{list?.map((item) => (
						<Select.Item
							key={`${label.toLocaleLowerCase()}_${item.value}`}
							value={item.value}
						>
							{item.label}
						</Select.Item>
					))}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	);
};

export default EnumItemSelect;
