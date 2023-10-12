import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin-ext'] });

export const metadata = {
  title: 'kod.is',
  description: 'Keep and Share Notes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          document.documentElement.setAttribute('data-bs-theme', localStorage.getItem('theme') || 'light');
          `
          }}
        />
      </body>
    </html>
  )
}
