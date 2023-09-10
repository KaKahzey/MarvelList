import RootLayout from "@/app/layout"
import '/app/./globals.css'
export default function Home() {
  return (
    <RootLayout>
      <div className="flex min-h-screen flex-col items-center p-24 home">
        <SecondHome />
        <img src="/images/apiLogo.png" alt="api logo" />
      </div>
    </RootLayout>
    
  )
}
export function SecondHome() {
  return(
    <img src="/images/marvelLogo.png" alt="Marvel logo" />
  )
}
