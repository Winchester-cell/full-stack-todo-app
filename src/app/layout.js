import '@/styles/globals.css'
import { Providers } from './( providers )/providers';
import Navbar from '@/components/Modules/Navbar/Navbar';
import QueryProvider from './( providers )/QueryProvider';
import { ToastProvider } from '@/context/ToastContext';
import SplashScreen from '@/components/SplashScreen/SplashScreen';
import localFont from "next/font/local";

const bebasBold = localFont({
  src: "../fonts/bebas/Bold.otf", 
  variable: "--font-bebasBold",
  style: "normal",
  display: "swap",
});

const main = localFont({
  src: "../fonts/main/InterVariable.ff710c09.woff2", 
  variable: "--font-main",
  style: "normal",
  display: "swap",
});


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true} className={`${bebasBold.variable} ${main.variable}`}>
      <body className='bg-[var(--colorA)]'>
        <QueryProvider>
          <Providers>
            <ToastProvider>
              <SplashScreen />
              <Navbar />
              {children}
            </ToastProvider>
          </Providers>
        </QueryProvider>
      </body>
    </html>
  );
}
