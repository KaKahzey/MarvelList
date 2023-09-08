import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'


export default function RootLayout({ children }) {

  return (
    <div className="flex">
      <header>
        <title>MARVEL Fanboy Dream Site</title>
        {/* paths better from root */}
        <link href="/images/logo.png"/>
        <div  id="navbar" className="h-full flex items-center absolute">
          <nav>
            <ul className="list-reset p-9 text-center">
              <li className="my-10"><Link href="/">Home</Link></li>
              <li className="my-10"><Link href="/posts/list">List</Link></li>
              <li className="my-10"><Link href="/posts/list">Favorites</Link></li>
              <li className="my-10"><Link href="/posts/tests">Tests</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        {children}
      </main>
      <footer>

      </footer>
    </div>
  )
}
