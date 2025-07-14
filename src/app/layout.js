import '@/styles/globals.css'
import { Providers } from './(providers)/providers';
import Navbar from '@/components/Modules/Navbar/Navbar';
import QueryProvider from './(providers)/QueryProvider';
import { ToastProvider } from '@/context/ToastContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className='bg-[var(--colorA)]'>
        <QueryProvider>
          <Providers>
            <ToastProvider>
              <Navbar />
              {children}
            </ToastProvider>
          </Providers>
        </QueryProvider>
      </body>
    </html>
  );
}
