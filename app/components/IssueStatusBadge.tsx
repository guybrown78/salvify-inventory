import { IssueStatus } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'



const issueStatusMap: Record<
	IssueStatus, 
	{ label:string, color: 'red' | 'violet' | 'green' }
	> = {
		OPEN: { label: 'Open', color: 'red' },
		IN_PROGRESS: { label: 'In Progress', color: 'violet' },
		CLOSE: { label: 'Closed', color: 'green' }
	}

const IssueStatusBadge = ({ issueStatus }: { issueStatus: IssueStatus }) => {
	return (
		<Badge color={issueStatusMap[issueStatus].color}>
			{ issueStatusMap[issueStatus].label }
		</Badge>
	)
}

export default IssueStatusBadge