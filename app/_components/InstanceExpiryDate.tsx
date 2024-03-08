import { Text } from '@radix-ui/themes'
import moment from 'moment'
import React from 'react'

interface Props {
	expiryDate: string | null
	showCountdown: boolean
}
const InstanceExpiryDate = ({ expiryDate, showCountdown }: Props) => {
	if(!expiryDate){
		return null
	}
	const now = moment();
	const expDate = moment(expiryDate);
	return (
		<Text as="div" className='inline-flex items-center'>
			<span>
				{expDate.format('Do MMM YYYY')}
			</span>
			{
				showCountdown && (
					<>
						<span>&nbsp;</span>
						<span>({expDate.endOf('day').fromNow()})</span>
					</>
				)
			}
			
		</Text>
	)
}

export default InstanceExpiryDate