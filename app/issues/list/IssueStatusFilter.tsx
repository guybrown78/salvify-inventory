'use client'

import { IssueStatus } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import React from 'react'

const statuses:{ label: string, value?: IssueStatus}[] = [
	{ label: 'All' },
	{ label: 'Open', valid: 'OPEN' },
	{ label: 'In Progress', valid: 'IN_PROGRESS' },
	{ label: 'Closed', valid: 'CLOSED' }
]

const IssueStatusFilter = () => {
	return (
		<Select.Root>
			<Select.Trigger placeholder='Filter by status...' />
			<Select.Content>
				{statuses.map(status => (
					<Select.Item key={status.value} value={status.value || ''}>
						{status.label}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	)
}

export default IssueStatusFilter