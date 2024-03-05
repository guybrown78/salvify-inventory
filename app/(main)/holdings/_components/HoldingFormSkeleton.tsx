import { Box } from '@radix-ui/themes'
import { Skeleton } from '@/app/_components'

const HoldingFormSkeleton = () => {
	return (
		<Box className='max-w-xl'>
			<Skeleton height="2rem"/>
		</Box>
	)
}

export default HoldingFormSkeleton