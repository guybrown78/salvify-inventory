
import authOptions from "@/app/auth/authOptions";
import { PropsWithChildren, ReactNode } from 'react';
import Header from './Header';
import SideDrawer from './SideDrawer';
import SideBar from './SideBar';
import NavColumn from './NavColumn';
import AdminNavColumn from './AdminNavColumn';

import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { getSessionUser } from "@/app/_utils/getSessionUser";
import { UserRole } from "@prisma/client";
import NoDataMessage from "../NoDataMessage";

const AdminMain = async ({ children }:PropsWithChildren) => {

	const session = await getServerSession(authOptions);

	if(!session){
		notFound();
	}
	const sessionUser = await getSessionUser();
	if(sessionUser?.role !== UserRole.SUPERADMIN){
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
		)
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
					<div className="px-4 sm:px-6 lg:px-8">
						{ children }
					</div>
				</main>

			</div>

    </>
	)
}

export default AdminMain