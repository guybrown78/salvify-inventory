import '@radix-ui/themes/styles.css';
import '../globals.css';
import '../theme-config.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Container, Theme } from '@radix-ui/themes';


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Salvify Medical Inventory | Auth',
	description: 'Manage your medical inventory pain'
}



interface Props {
	children: React.ReactNode
}
const AuthLayout = ({ children }: Props) => {
	return (
		<html lang="en">
      <body className={inter.variable}>
				<Theme accentColor="grass">
					<main className='p-5'>
						<Container>
							{children}
						</Container>
					</main>
				</Theme>
			</body>
    </html>
	)
}

export default AuthLayout