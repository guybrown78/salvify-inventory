"use client";

import { useHoldingContext } from "@/app/_providers/HoldingProvider";
import debounce from "lodash/debounce";
import { useParams } from "next/navigation";
import { ChangeEvent, ChangeEventHandler, useState } from "react";

import { HiMagnifyingGlass } from "react-icons/hi2";
import SearchResults from "./SearchResults";

const HeaderSearch = () => {
	const [showResults, setShowResults] = useState(false);
	const [searchString, setSearchString] = useState<string>("");
	const { currentHolding, isHoldingSelected } = useHoldingContext();

	const params = useParams();

	const onSearchChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
		if (
			searchString.length > 0 &&
			searchString !== " " &&
			searchString !== ""
		) {
			setShowResults(true);
			setSearchString(searchString);
		} else {
			setShowResults(false);
			setSearchString("");
		}
	};

	const clearSearch = () => {
		setShowResults(false);
		setSearchString("");
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const searchInput: string = e.target.value;
		if (searchInput.length > 0 && searchInput !== " " && searchInput !== "") {
			setShowResults(true);
			setSearchString(searchInput);
		} else {
			setShowResults(false);
			setSearchString("");
		}
		debouncedOnSearchChange;
	};
	const debouncedOnSearchChange = debounce(onSearchChange, 250);

	return (
		<form
			className="relative flex flex-1 "
			action="#"
			method="GET"
			autoComplete="off"
		>
			<label htmlFor="search-field" className="sr-only">
				Search
			</label>
			<HiMagnifyingGlass
				className="pointer-events-none absolute inset-y-0 left-2 h-full w-5 text-gray-400"
				aria-hidden="true"
			/>
			<input
				id="search-field"
				className="block h-full w-full border-0 py-0 pl-8 pr-5 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:outline-green-600 sm:text-sm"
				placeholder="Search..."
				onChange={handleChange}
				value={searchString}
				type="search"
				name="search"
			/>

			{showResults && (
				<div className="animate-fade flex fixed bg-white top-16 left-0 lg:left-56 xl:left-72 right-0 p-8 shadow-lg max-h-9/10 overflow-y-hidden flex-col">
					<div className="relative flex-1 h-full max-h-full overflow-y-auto">
						<SearchResults
							searchString={searchString}
							holding={
								params.holdingId
									? currentHolding
										? currentHolding
										: null
									: null
							}
							onClearSearch={clearSearch}
						/>
					</div>
				</div>
			)}
		</form>
	);
};

export default HeaderSearch;
