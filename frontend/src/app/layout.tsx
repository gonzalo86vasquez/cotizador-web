import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';

/* Space Grotesk — geometric display font for industrial precision */
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
});

/* Inter — modern body font with excellent readability */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'CotizadorSAC - Repuestos para Molinos SAC',
  description:
    'Plataforma de cotizacion de piezas y repuestos para molinos SAC utilizados en faenas mineras. Catalogo completo de revestimientos, pernos, lifters y mas.',
  keywords: [
    'molinos SAC',
    'repuestos mineria',
    'piezas industriales',
    'revestimientos',
    'lifters',
    'mineria chile',
  ],
  authors: [{ name: 'CotizadorSAC' }],
  creator: 'CotizadorSAC',
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: 'https://cotizadorsac.cl',
    siteName: 'CotizadorSAC',
    title: 'CotizadorSAC - Repuestos para Molinos SAC',
    description:
      'Plataforma de cotizacion de piezas y repuestos para molinos SAC utilizados en faenas mineras.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <a href="#main-content" className="skip-link">
            Saltar al contenido principal
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
