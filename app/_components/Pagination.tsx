'use client'

import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
// import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'

interface Props {
	itemCount: number;
	pageSize: number;
	currentPage: number;

}

const Pagination = ({ itemCount, pageSize, currentPage}: Props) => {

	const [totalPages, setTotalPages] = useState<number>(Math.ceil(itemCount/pageSize));

	useEffect(() => {
    setTotalPages(Math.ceil(itemCount/pageSize))
  }, [pageSize, itemCount])

	const router = useRouter();
	const searchParams = useSearchParams();

	const pageCount = Math.ceil(itemCount / pageSize);
	// if(pageCount <= 1 && currentPage === 1) return null;


	const changePage = (page: number) => {
		const params = new URLSearchParams(searchParams);
		params.set('page', page.toString());
		router.push('?' + params.toString());
	}
	const changePageSize = (pageSize: number) => {
		const params = new URLSearchParams(searchParams);
		params.set('pageSize', pageSize.toString());
		router.push('?' + params.toString());
	}
	

	return (
		<Flex justify="between">
			<Flex align="center">
				<p className="text-sm">
					Showing <span className="font-medium">{(pageSize * (currentPage - 1 )) + 1}</span> to <span className="font-medium">{ (currentPage - 1) + 1 === totalPages ? itemCount : (pageSize * (currentPage - 1)) + pageSize }</span> of{' '}
					<span className="font-medium">{ itemCount }</span> results
				</p>
			</Flex>


			<div className='hidden md:flex'>
				<label htmlFor="showPerPage" className="block text-sm font-medium text-gray-700 sr-only">
					Show number of items per page
				</label>
					<select
						id="showPerPage"
						name="showPerPage"
						className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-5 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"

						value={pageSize}
						onChange={e => {
							changePageSize(Number(e.target.value))
						}}
					>
						{[10, 20, 50, 75, 100].map(pageSize => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize} per page
							</option>
						))}
					</select>
			</div>

			<Flex align="center" gap="2">
				<Text size="2">Page {currentPage} of {pageCount}</Text>

				<Button color="gray" variant="soft" disabled={currentPage === 1} onClick={() => changePage(1)}>
					<DoubleArrowLeftIcon />
				</Button>
				<Button color="gray" variant="soft" disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>
					<ChevronLeftIcon />
				</Button>

				<Button color="gray" variant="soft" disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)}>
					<ChevronRightIcon />
				</Button>
				<Button color="gray" variant="soft" disabled={currentPage === pageCount} onClick={() => changePage(pageCount)}>
					<DoubleArrowRightIcon />
				</Button>

			</Flex>
		</Flex>

	)
}

export default Pagination