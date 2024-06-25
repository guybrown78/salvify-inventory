
import prisma from '@/prisma/client'
import { Flex } from '@radix-ui/themes'
import RemovedItemsToolbar from './RemovedItemsToolbar'
import RemovedItemsTable from './RemovedItemsTable'
import { RemoveInstanceWithItemLocationUser } from '@/app/_types/types'

interface Props {
	clientId: number
	holdingId: number
}


const RemovedItems = async ({ clientId, holdingId }: Props) => {

	const removedInstances = await prisma.removeInstance.findMany({
    where: {
      holdingId: holdingId,
      clientId: clientId,
    },
    include: {
      instance: {
        include: {
          item: true, // Include related item data
        },
      },
      location: true,  
      removedBy: true,
    },
  });

  if (!removedInstances) {
    return null;
  }


	return (
		<Flex direction="column" gap="3">
			<RemovedItemsToolbar />
			<RemovedItemsTable 
				removedInstances={removedInstances as RemoveInstanceWithItemLocationUser[]}
			/>
			
		</Flex>
		// <div>
    //   {removedInstances.map((instance) => (
    //     <div key={instance.id}>
    //       <p>ID: {instance.id}</p>
    //       <p>Reason: {instance.reason}</p>
    //       {/* Add more fields as needed */}
    //     </div>
    //   ))}
    // </div>
	)
}

export default RemovedItems