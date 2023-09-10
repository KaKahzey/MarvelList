import Link from 'next/link'
import './globals.css'


export default function RootLayout({ children }) {

  return (
    <div className="flex min-h-screen" >
      <header>
        <title>MARVEL Fanboy Dream Site</title>
        {/* paths better from root */}
        <link href="/public/images/logo.png"/>
        <div  id="navbar" className="h-full flex items-center absolute">
          <nav>
            <ul className="list-reset p-9 text-center">
              <li className="my-10"><Link href="/">Home</Link></li>
              <li className="my-10"><Link href="/posts/list">List</Link></li>
              <li className="my-10"><Link href="/posts/favorites">Favorites</Link></li>
              <li className="my-10"><Link href="/posts/tests">Tests</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="content">
        <main className="flex-grow">
          {children}
        </main>
        <footer className="text-center py-4">
          <p>&copy; 2023 Clearly mine. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
