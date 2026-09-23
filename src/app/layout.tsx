import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ProposalProvider } from '@/context/ProposalContext';
import { LicenseProvider } from '@/context/LicenseContext';
import { Header } from '@/components/Header';
import { AppModals } from '@/components/modals/AppModals';

export const viewport: Viewport = {
  themeColor: '#1e3a8a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'PropostaPRO - Gerador Profissional de Propostas Comerciais em PDF',
  description:
    'Crie propostas comerciais em PDF vetorial A4 de alta conversão para freelancers, autônomos e prestadores de serviços.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'PropostaPRO',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <LicenseProvider>
          <ProposalProvider>
            <Header />
            {children}
            <AppModals />
          </ProposalProvider>
        </LicenseProvider>
      </body>
    </html>
  );
}
