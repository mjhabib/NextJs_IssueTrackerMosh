import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from './NavBar';
import { Container, Theme, ThemePanel } from '@radix-ui/themes';
import AuthProvider from '@src/auth/Provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'Followed by Mosh Hamedani',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.variable}>
        <AuthProvider>
          <Theme appearance='light' accentColor='purple' radius='large'>
            <NavBar />
            <main className='p-5'>
              <Container>{children}</Container>
            </main>
            {/* <ThemePanel /> */}
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
