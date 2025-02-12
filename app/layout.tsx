import React from 'react';
import Head from 'next/head';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
// import { InternetCheck } from '@/utils';
import { Footer } from '@/components/Footer/footer';
import { Navbar } from '@/components/Navbar/navbar';

const inter = Inter({ subsets: ['latin'] });
// const spectral = Spectral({
//   subsets: ['latin'],
//   weight: ['400', '700'],
// });
// const poppins = Poppin({
//   weight: ["300", "400", "500", "600", "700", "800", "900"],
//   subsets: ["latin"],
// });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <Head>
        <script src="/flickity.pkgd.min.js" async></script>
      </Head> */}
      <body className={inter.className}>
        <Navbar />
        {children}
        {/* <InternetCheck /> */}
        <Footer />
      </body>
    </html>
  );
}
