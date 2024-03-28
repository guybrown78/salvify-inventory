import { Flex, Text } from '@radix-ui/themes';
import InstanceExpiryDate from '../InstanceExpiryDate';

interface Props{
	locationTitle: string
	expiryDate: string
	locationPreTitle?: string
}
const InstanceLocationExpiryHeader = ({ locationTitle, expiryDate, locationPreTitle = "Location:" }:Props) => {
	return (
		<Flex justify="between">
			<Flex gap="1" align="end">
				<Text>{locationPreTitle}</Text>
				<Text size="4" weight="bold">{locationTitle}</Text>
			</Flex>
			<InstanceExpiryDate 
				expiryDate={expiryDate} 
				size="sm" 
				asBadge
			/>
		</Flex>
	)
}

export default InstanceLocationExpiryHeader