import { PropsWithChildren } from "react";

const PageHeaderBannerWrapper = ({ children }: PropsWithChildren) => {
	return (
		<div className="bg-slate-50 shadow -mx-3 md:-mx-8 -my-10">
			<div className="px-4 sm:px-6 lg:px-8">{children}</div>
		</div>
	);
};

export default PageHeaderBannerWrapper;
