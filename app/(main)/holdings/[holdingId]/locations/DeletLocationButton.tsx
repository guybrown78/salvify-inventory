import { TrashIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import React from 'react'

const DeletLocationButton = () => {
	return (
		<IconButton color="crimson" variant="soft">
			<TrashIcon width="18" height="18" />
		</IconButton>
	)
}

export default DeletLocationButton