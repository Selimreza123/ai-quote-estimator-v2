import './globals.css'
export const metadata = { title: 'AI Quote Estimator' }
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-zinc-50">{children}</body>
    </html>
  )
}