'use client'

import Link from "next/link";
import { HiOutlineCog8Tooth } from "react-icons/hi2";

import { useSession } from "next-auth/react";

const ClientHeader = () => {

	const { status, data: session } = useSession();

	if(!session || !session!.user || !session!.user!.optionalClients?.length){
		return null
	}

	return (
		<div className="flex h-5 shrink-0 items-center border-b border-gray-200 bg-emerald-900 pr-4 shadow-sm ">
			<div className="flex flex-1 justify-between items-center px-5 lg:px-2">
				<h4 className="text-xs text-green-200">{session!.user!.clientName}</h4>

				<Link
					href="/settings/profile"
					className="text-xs text-green-200 flex gap-1 items-center underline"
				>
					<HiOutlineCog8Tooth /> Switch Client
				</Link>
			</div>
		</div>
	);
};

export default ClientHeader;
