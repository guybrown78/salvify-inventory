import { PropsWithChildren, ReactNode } from 'react';
import Header from './Header';
import SideDrawer from './SideDrawer';
import SideBar from './SideBar';
import HoldingsSideBar from './HoldingsSideBar';
import HoldingsNavColumn from './HoldingsNavColumn';

const HoldingsMain = ({ children }:PropsWithChildren) => {
	return (
		<>
			<SideDrawer>
				<HoldingsNavColumn />
			</SideDrawer>

			{/* Static sidebar for desktop */}
			<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-56 xl:w-72 lg:flex-col">
				<HoldingsSideBar />
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

export default HoldingsMain