import { Flex } from '@radix-ui/themes'
import React from 'react'
import HoldingsToolbar from './HoldingsToolbar'
import HoldingsTable from './HoldingsTable'
import prisma from '@/prisma/client'
import { NoDataMessage } from '@/app/_components'
import Main from '@/app/_components/layout/Main'

import { getSessionUser } from '@/app/_utils/getSessionUser'


const HoldingListPage = async () => {

	const sessionUser = await getSessionUser();

	// Check if sessionUser is null or undefined
  if (!sessionUser) {
    // Handle the case where sessionUser is not available
    return (
      <Flex direction="column" gap="3">
        <NoDataMessage>
          Session user data is not available
        </NoDataMessage>
      </Flex>
    );
  }

	const holdings = await prisma.holding?.findMany({ 
		where: { clientId: sessionUser!.clientId! }, 
		orderBy: { title: 'asc'},
		include: { locations: true } 
	});

	if(!holdings || !holdings.length)
		return (
			<Main>
				<Flex direction="column" gap="3">
					<HoldingsToolbar />
					<NoDataMessage>
						There are currently no holdings for { sessionUser!.clientName! }.
					</NoDataMessage>
				</Flex>
			</Main>
	);

	return (
		<Main>
			<Flex direction="column" gap="3">
				<HoldingsToolbar />
				<HoldingsTable holdings={holdings} />
			</Flex>
		</Main>
	)
}

export const dynamic = 'force-dynamic';

export default HoldingListPage