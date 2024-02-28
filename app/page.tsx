import Image from 'next/image'
import { Pagination } from '@/app/components'
import LatestIssues from './LatestIssues'

export default function Home(
	{ searchParams }: { searchParams: { page: string } }
) {
  return (
    <div>
			<LatestIssues />
		</div>
  )
}
