

import '../globals.css'
import '@radix-ui/themes/styles.css';
import '../theme-config.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Container, Theme, ThemePanel } from '@radix-ui/themes'

import AuthProvider from '../auth/Provider';
import QueryClientProvider from '../QueryClientProvider';
import classNames from 'classnames';
import Main from '@/app/_components/layout/Main';
import { LayoutProvider } from '@/app/_providers/LayoutProvider'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Salvify Medical Inventory',
	description: 'Manage your medical inventory pain'
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-fill">
      <body className={classNames('h-full', inter.variable)}>
				<QueryClientProvider>
					<AuthProvider>
						<Theme accentColor="grass">
							<LayoutProvider>
								<Main>
									{children}
								</Main>
							</LayoutProvider>
						</Theme>
					</AuthProvider>
				</QueryClientProvider>
			</body>
    </html>
  )
}
