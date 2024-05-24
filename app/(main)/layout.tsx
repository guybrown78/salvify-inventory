

import '../globals.css'
import '@radix-ui/themes/styles.css';
import '../theme-config.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Container, Theme, ThemePanel } from '@radix-ui/themes'

import AuthProvider from '../auth/Provider';
import QueryClientProvider from '../_providers/QueryClientProvider';
import classNames from 'classnames';

import { LayoutProvider } from '@/app/_providers/LayoutProvider'
import { HoldingProvider } from '@/app/_providers/HoldingProvider'
import { ReactNode } from 'react';
import { SessionUserProvider } from '../_providers/SessionUserProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Salvify Medical Inventory',
	description: 'Manage your medical inventory pain',
	icons: {
    icon: '/icon.png',
  },
}

interface LayoutProps {
	children: ReactNode,
}

export default function RootLayout({
  children,
}: LayoutProps) {

  return (
    <html lang="en" className="h-fill">
      <body className={classNames('h-full', inter.variable)}>
				<QueryClientProvider>
					<AuthProvider>
						<Theme accentColor="grass">
							<SessionUserProvider>
							<LayoutProvider>
							<HoldingProvider>

									{children}

							</HoldingProvider>
							</LayoutProvider>
							</SessionUserProvider>
						</Theme>
					</AuthProvider>
				</QueryClientProvider>
			</body>
    </html>
  )
}
