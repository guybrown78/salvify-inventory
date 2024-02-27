import Image from 'next/image'
import { Pagination } from '@/app/components'

export default function Home(
	{ searchParams }: { searchParams: { page: string } }
) {
  return (
    <div>

			<Pagination 
				itemCount={250} 
				pageSize={25} 
				currentPage={parseInt(searchParams.page)}
			/>
		</div>
  )
}
