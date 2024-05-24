import '@radix-ui/themes/styles.css';
import '../globals.css';
import '../theme-config.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Container, Theme } from '@radix-ui/themes';
import classNames from 'classnames';


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Salvify Medical Inventory | Auth',
	description: 'Manage your medical inventory pain',
	icons: {
    icon: '/icon.png',
  },
}



interface Props {
	children: React.ReactNode
}
const AuthLayout = ({ children }: Props) => {
	return (
		<html lang="en" className="min-h-screen">
      <body className={classNames('min-h-screen',inter.variable)}>
				<Theme accentColor="grass" className='min-h-screen'>
					<main className='absolute min-w-full flex h-full min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"'>
						<Container className={classNames()}>
							{children}
						</Container>
					</main>
				</Theme>
			</body>
    </html>
	)
}

export default AuthLayout