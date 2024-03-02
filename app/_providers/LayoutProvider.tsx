'use client'

import React, { ReactNode, useContext, useState } from "react";

type layoutContextType = {
	isSidebarOpen:boolean,
	updateIsSidebarOpen:(flag:boolean) => void,
	currentPageTitle:string
	updateCurrentPageTitle:(value:string) => void
};

const layoutContextDefaultValues: layoutContextType = {
	isSidebarOpen: false,
	updateIsSidebarOpen:(flag:boolean) => {},
	currentPageTitle: "Dashboard",
	updateCurrentPageTitle:(value:string) => {},
};

const LayoutContext = React.createContext<layoutContextType>(layoutContextDefaultValues);

export function useLayoutContext() {
	return useContext(LayoutContext);
}

type Props = {
	children: ReactNode;
};

export function LayoutProvider({ children }: Props) {


	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
	const [currentPageTitle, setCurrentPageTitle] = useState<string>("Dashboard");

	const updateIsSidebarOpen = (flag:boolean) => {
		setIsSidebarOpen(flag);
	};

	const updateCurrentPageTitle = (value:string) => {
		setCurrentPageTitle(value);
	};

	const value = {
		isSidebarOpen,
		updateIsSidebarOpen,

		currentPageTitle,
		updateCurrentPageTitle
	}

	return (
		<>
			<LayoutContext.Provider value={value}>
				{children}
			</LayoutContext.Provider>
		</>
	);
}

