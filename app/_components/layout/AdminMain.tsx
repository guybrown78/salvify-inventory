import authOptions from "@/app/auth/authOptions";
import { PropsWithChildren } from "react";
import AdminNavColumn from "./AdminNavColumn";
import Header from "./Header";
import SideBar from "./SideBar";
import SideDrawer from "./SideDrawer";

import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import NoDataMessage from "../NoDataMessage";

const AdminMain = async ({ children }: PropsWithChildren) => {
	const session = await getServerSession(authOptions);

	if (!session) {
		notFound();
	}

	if (session.user.role !== UserRole.SUPERADMIN) {
		return (
			<>
				<SideDrawer>
					<AdminNavColumn />
				</SideDrawer>

				<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-56 xl:w-72 lg:flex-col">
					<SideBar>
						<AdminNavColumn />
					</SideBar>
				</div>

				<div className="lg:pl-56 xl:pl-72">
					<Header />
					<main className="py-10">
						<div className="px-4 sm:px-6 lg:px-8">
							<NoDataMessage>You do not have access!</NoDataMessage>
						</div>
					</main>
				</div>
			</>
		);
	}
	return (
		<>
			<SideDrawer>
				<AdminNavColumn />
			</SideDrawer>

			{/* Static sidebar for desktop */}
			<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-56 xl:w-72 lg:flex-col">
				<SideBar>
					<AdminNavColumn />
				</SideBar>
			</div>

			<div className="lg:pl-56 xl:pl-72">
				<Header />
				<main className="py-10">
					<div className="px-4 sm:px-6 lg:px-8">{children}</div>
				</main>
			</div>
		</>
	);
};

export default AdminMain;
