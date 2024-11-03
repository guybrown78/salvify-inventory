import { Item } from "@prisma/client";
import PageHeaderBannerWrapper from "../PageHeaderBannerWrapper";
import StockItemCategoryBadge from "./StockItemCategoryBadge";
import StockItemGroupingBadge from "./StockItemGroupingBadge";
import StockItemLinks from "./StockItemLinks";
import StockItemTypeBadge from "./StockItemTypeBadge";

import LabelValueRow from "../LabelValueRow";
import StockItemActions from "./StockItemActions";
interface Props {
	item: Item;
	showEdit: boolean;
}

const StockItemHeader = ({ item, showEdit }: Props) => {
	return (
		<PageHeaderBannerWrapper>
			<div className="my-8">
				<div className="flex items-start justify-between">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
						{item.title}
					</h2>

					<StockItemActions
						title={item.title}
						itemId={item.id}
						showEdit={showEdit}
					/>
				</div>

				<div className="lg:flex lg:items-end lg:justify-between mt-2">
					<div className="min-w-0 flex-1">
						<div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
							<div className="mt-2 flex items-center text-sm text-gray-500">
								<LabelValueRow label="Type:">
									<StockItemTypeBadge itemType={item.type} />
								</LabelValueRow>
							</div>
							<div className="mt-2 flex items-center text-sm text-gray-500">
								<LabelValueRow label="Category:">
									<StockItemCategoryBadge itemCategory={item.category} />
								</LabelValueRow>
							</div>
							<div className="mt-2 flex items-center text-sm text-gray-500">
								<LabelValueRow label="Group:">
									<StockItemGroupingBadge itemGrouping={item.grouping} />
								</LabelValueRow>
							</div>
						</div>
					</div>
					<div className="mt-4 lg:mt-0">
						<StockItemLinks item={item} />
					</div>
				</div>
			</div>
		</PageHeaderBannerWrapper>
	);
};

export default StockItemHeader;
