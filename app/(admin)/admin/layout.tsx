import "@radix-ui/themes/styles.css";
import "../../globals.css";
import "../../theme-config.css";

import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import QueryClientProvider from "@/app/_providers/QueryClientProvider";
import classNames from "classnames";
import AuthProvider from "../../auth/Provider";

import { LayoutProvider } from "@/app/_providers/LayoutProvider";
import { ReactNode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "Salvify Medical Inventory",
	description: "Manage your medical inventory pain",
	icons: {
		icon: "/icon.png",
	},
};

interface LayoutProps {
	children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
	return (
		<html lang="en" className="h-fill">
			<body className={classNames("h-full", inter.variable)}>
				<QueryClientProvider>
					<AuthProvider>
						<Theme accentColor="grass">
							<LayoutProvider>
								{children}
								<SpeedInsights />
							</LayoutProvider>
						</Theme>
					</AuthProvider>
				</QueryClientProvider>
			</body>
		</html>
	);
}
