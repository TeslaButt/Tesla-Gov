import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tesla-Gov | Stellar DAO',
  description: 'Frictionless governance tool for Stellar communities by teslabutt',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col relative overflow-x-hidden`}>
        {/* Subtle background glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        
        <nav className="w-full glass-panel sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-stellar flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20">
                TG
              </div>
              <span className="font-bold text-xl tracking-tight text-white">Tesla-Gov</span>
            </div>
            <button className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all font-medium text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Connect Wallet
            </button>
          </div>
        </nav>
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </main>
        
        <footer className="border-t border-white/5 py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
            <p>Built for the Stellar Drips Wave program by <a href="https://github.com/teslabutt" className="text-primary hover:text-white transition-colors">teslabutt</a></p>
          </div>
        </footer>
      </body>
    </html>
  );
}
