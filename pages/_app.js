import '@/styles/globals.css'
import { WalletProvider } from '@/src/wallet'

export default function App({ Component, pageProps }) {
  return(
    <WalletProvider>
  <Component {...pageProps} />
  </WalletProvider>
  )
}
