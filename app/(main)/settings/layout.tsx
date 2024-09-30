import Main from "@/app/_components/layout/Main";
import { PropsWithChildren } from "react";

const SettingsItemsLayout = ({ children }: PropsWithChildren) => {
	return <Main>{children}</Main>;
};

export default SettingsItemsLayout;
