import { useLayoutContext } from "@/app/_providers/LayoutProvider";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";

const AdminNavTitle = () => {
	const { updateIsSidebarOpen } = useLayoutContext();

	return (
		<Link
			href="/"
			onClick={() => {
				updateIsSidebarOpen(false);
			}}
			className="absolute left-0 right-0 top-16 h-7 text-red-50 py-1 px-6 bg-red-800 text-sm"
		>
			<Flex gap="3" align="center" width="100%">
				<ArrowLeftIcon width="16" height="16" />
				Admin
			</Flex>
		</Link>
	);
};

export default AdminNavTitle;
