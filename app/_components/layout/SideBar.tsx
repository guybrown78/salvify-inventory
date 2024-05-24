import { PropsWithChildren } from "react";
import Logo from "./Logo";

const SideBar = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
			<div className="flex h-16 shrink-0 items-center">
				<Logo classNames="h-6 max-h-6" />
			</div>

			{children}
		</div>
	);
};

export default SideBar;
