import '../styles/globals.css';
import QueryProvider from './QueryProvider';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Anokha 2025',
  description: 'Tech Fair of Amrita Vishwa Vidyapeetham, Coimbatore',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="bottom-center" />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
