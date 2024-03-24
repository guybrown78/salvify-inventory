import { useHoldingContext } from '@/app/_providers/HoldingProvider';
import { useLayoutContext } from '@/app/_providers/LayoutProvider';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { Flex } from '@radix-ui/themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const HoldingNavTitle = () => {

	const { currentHolding } = useHoldingContext();
	const { updateIsSidebarOpen } = useLayoutContext()

	const router = useRouter();

	return (
		<Link 
			href="/holdings/list" 
			onClick={() => { updateIsSidebarOpen(false); }}
			className='absolute left-0 right-0 top-16 h-7 text-slate-50 py-1 px-6 bg-slate-800 text-sm'
		>
			<Flex gap="3" align="center" width="100%">
				<ArrowLeftIcon width="16" height="16" />
				{currentHolding ? currentHolding?.title : 'loading...'}
			</Flex>
		</Link>
	)
}

export default HoldingNavTitle