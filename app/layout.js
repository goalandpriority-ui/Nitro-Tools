import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata = {
  title: 'Nitro Tools - All-in-One Toolkit',
  description: 'Lyrics editor, PDF tools, Image processing, Developer utilities, and more!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-dark-bg text-white">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
