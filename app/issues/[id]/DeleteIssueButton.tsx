import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
	return (
		<Button color='red'>
			Delete Issue
			{/* <Pencil2Icon /> */}
			{/* <Link href={`/issues/${issueId}/edit`}>Delete Issue</Link> */}
		</Button>
	)
}

export default DeleteIssueButton