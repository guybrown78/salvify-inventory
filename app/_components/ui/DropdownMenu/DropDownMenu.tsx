import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import { ReactNode } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import DropDownMenuItem from "./DropDownMenuItem";

interface DropDownMenuProps {
	children: ReactNode;
	title?: string;
	icon?: ReactNode;
	showResponsiveTitle?: boolean;
}

export const DropDownMenu = ({
	children,
	title = "More",
	icon = (
		<HiEllipsisVertical aria-hidden="true" className="h-5 w-5 text-gray-500" />
	),
	showResponsiveTitle = false,
}: DropDownMenuProps) => {
	return (
		<Menu as="div" className="relative">
			<MenuButton className="inline-flex items-center -m-3 p-3">
				{showResponsiveTitle ? (
					<span className="hidden lg:inline-block mr-1">{title}</span>
				) : (
					<span className="sr-only">{title}</span>
				)}
				{icon}
			</MenuButton>
			<MenuItems
				transition
				className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
			>
				{children}
			</MenuItems>
		</Menu>
	);
};


export default DropDownMenu;
export { DropDownMenuItem }

