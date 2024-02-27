import Image from 'next/image'
import { Pagination } from '@/app/components'

export default function Home() {
  return (
    <div>

			<Pagination 
				itemCount={100} 
				pageSize={10} 
				currentPage={10}
			/>
		</div>
  )
}
