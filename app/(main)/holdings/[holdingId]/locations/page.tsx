import { notFound } from 'next/navigation';
import HoldingHeader from '../HoldingHeader';
import { HoldingPageProps, fetchHolding } from '../holdingQuery';
import { Button, Flex } from '@radix-ui/themes'
import { NoDataMessage } from '@/app/_components';
import LocationsToolbar from './LocationsToolbar';
import LocationsTable from './LocationsTable';

const HoldingLocationsPage = async ({ params }: HoldingPageProps) => {
	const holding = await fetchHolding(parseInt(params.holdingId))

	if(!holding)
		notFound();

	return (
		<Flex direction="column" gap="3">
			<LocationsToolbar holdingId={parseInt(params.holdingId)} />
			{!holding.locations?.length && (
				<NoDataMessage>
					<p>There are currently no locations in this holding.<br />To create a location, click &apos;New Location&apos;.</p>
				</NoDataMessage>
			)}
			{holding.locations.length > 0 && (<LocationsTable holding={holding}/>)}
		</Flex>
	)
}

export default HoldingLocationsPage