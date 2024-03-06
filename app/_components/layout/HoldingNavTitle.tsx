import { useHoldingContext } from '@/app/_providers/HoldingProvider'
import { useLayoutContext } from '@/app/_providers/LayoutProvider';
import React from 'react'
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { Button, Flex, Box } from '@radix-ui/themes';

const HoldingNavTitle = () => {

	const { isHoldingSelected, currentHolding, updateIsHoldingSelected, updateCurrentHolding } = useHoldingContext();
	const { updateIsSidebarOpen } = useLayoutContext()

	const router = useRouter();

	if(!isHoldingSelected)
		return null;

	return (
		<button 
			onClick={() => {
				updateIsHoldingSelected(false);
				updateCurrentHolding(null);
				updateIsSidebarOpen(false);
				router.push('/holdings/list')
			}}
			className='absolute left-0 right-0 top-16 h-8 text-slate-50 py-1 px-6 bg-slate-800 text-sm'
		>
			<Flex gap="3" align="center" width="100%">
				<ArrowLeftIcon width="16" height="16" />
				{currentHolding?.title}
			</Flex>
		</button>
	)
}

export default HoldingNavTitle