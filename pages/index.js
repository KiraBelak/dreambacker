import Image from 'next/image'
import { Inter } from 'next/font/google'
import {ConnectWallet} from '../components/connectwallet'
import Link from 'next/link'





const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <ConnectWallet />
    
    <Link href="/demo" className="inline-flex py=4 h-8 flex-col items-center  w-52 justify-center bg-purple-500 font-bold text-white">
      
        Demo
    </Link>

    </main>
  )
}
