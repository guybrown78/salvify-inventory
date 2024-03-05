import React from 'react'
import { Button, Callout, Flex, Select, Text, TextField } from '@radix-ui/themes';
import { ControllerProps, ControllerRenderProps } from 'react-hook-form';

interface Props{
	field:any,
	label: string
	list:{label: string, value:string}[] | []
}
const StockItemSelect = ({ field, label, list }: Props) => {
	return (
		<Select.Root 
			onValueChange={field.onChange} 
			{...field}
		>
			<Select.Trigger />
			<Select.Content>
				<Select.Group>
					<Select.Label>{label}</Select.Label>
					{
						list?.map(item => <Select.Item key={`${label.toLocaleLowerCase()}_${item.value}`} value={item.value}>{item.label}</Select.Item>)
					}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	)
}

export default StockItemSelect