import { Inter } from '@next/font/google';
import Link from 'next/link';
import cn from 'classnames';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const year = new Date().getFullYear();

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={cn(inter.className)}>
      {children}
      <footer
        className={cn(
          inter.className,
          'flex flex-col sm:flex-row justify-between items-center max-w-screen-2xl px-6 lg:px-12 mx-auto py-8 space-y-4 sm:space-y-0 w-full'
        )}
      >
        <p className="text-sm opacity-30">
          {`© ${year} by Fabian Lee | In Time Life Calendar`}
        </p>
        <ul className="flex text-sm space-x-4">
          <li className="hover:opacity-100 opacity-30 transition-opacity">
            <a href="https://github.com/fabianlee1211/in-time-life-calendar">
              GitHub
            </a>
          </li>
          <li className="hover:opacity-100 opacity-30 transition-opacity">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://sugarfabby.com"
            >
              Find Me
            </a>
          </li>
        </ul>
      </footer>
    </main>
  );
}
