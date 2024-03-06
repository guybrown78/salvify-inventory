import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'


const LocationsToolbar = ({ holdingId }: { holdingId: number}) => {
	return (
		<Flex justify="end">
			<Button>
				<Link href={`/holdings/${holdingId}/locations/new`}>New Location</Link>
			</Button>
		</Flex>
	)
}

export default LocationsToolbar