export { default } from 'next-auth/middleware';

export const config = {
	matcher: [
		'/',
		'/issues/list',
		'/issues/new',
		'/issues/edit',
		'/issues/:id*',
		'/stock-items/list',
		'/stock-items/new',
		'/stock-items/edit',
		'/stock-items/:id*',
		'/holdings/list',
		'/holdings/new',
		'/holdings/edit',
		'/holdings/:id*',
		'/orders/list',
		'/orders/new',
		'/orders/edit',
		'/orders/:id*',
	]
}