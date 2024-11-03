import { Badge, Text } from '@radix-ui/themes'
import moment from 'moment'
import React from 'react'

interface Props {
	expiryDate: string | Date | null
	showCountdown?: boolean
	size?: 'sm' | 'md' | 'lg'
	asBadge?: boolean
}
const InstanceExpiryDate = ({ expiryDate, showCountdown, size, asBadge }: Props) => {
	if(!expiryDate){
		return null
	}

	const expDate = moment(
		expiryDate instanceof Date ? expiryDate.toISOString() : expiryDate
	);
	if (!expDate.isValid()) {
		return null; // Invalid date handling
	}

	const dateFormat = "MM-DD-YYYY";
	// const date = new Date(expiryDate)
	// const expDate = moment(date);

	if(asBadge){
		const now = moment()
		const days:number = expDate.endOf('day').diff(now, 'days');
		const color:"red" | "orange" | "green" = days <= 30 ? 'red' : days < 60 ? 'orange' : 'green'
		return (
			<Badge color={color}>
				<InstanceExpiryDateText 
					momentDate={expDate} 
					showCountdown={showCountdown} 
					size={size || "md"} 
				/>
			</Badge>
		)
	}
	
	return (
		<InstanceExpiryDateText 
			momentDate={expDate} 
			showCountdown={showCountdown}
			size={size || "md"} 
		/>)
}


interface DateTextProps {
	momentDate: moment.Moment
	showCountdown?: boolean
	size: 'sm' | 'md' | 'lg'
}
const InstanceExpiryDateText = ({ momentDate, showCountdown, size }: DateTextProps) => {
	const dateSize = size === "sm" ? '1' : size === "lg" ? '5' : '3'
	return (
		<Text as="div" className='inline-flex items-center' size={dateSize}>
			<span>
				{momentDate.format('Do MMM YYYY')}
			</span>
			{
				showCountdown && (
					<>
						<span>&nbsp;</span>
						<span>({momentDate.endOf('day').fromNow()})</span>
					</>
				)
			}
		</Text>
	)
}
export default InstanceExpiryDate