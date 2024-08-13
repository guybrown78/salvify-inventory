import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const UserEditButton = ({ userId }: { userId: string }) => {
	return (
		<Button>
			<Pencil2Icon />
			<Link href={`/admin/users/edit/${userId}`}>Edit User</Link>
		</Button>
	)
}

export default UserEditButton