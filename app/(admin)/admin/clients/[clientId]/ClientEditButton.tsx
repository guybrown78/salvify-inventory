import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const ClientEditButton = ({ clientId }: { clientId: number }) => {
	return (
		<Button>
			<Pencil2Icon />
			<Link href={`/admin/clients/edit/${clientId}`}>Edit Client</Link>
		</Button>
	)
}

export default ClientEditButton