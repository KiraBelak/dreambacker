import "@/styles/globals.css";
<<<<<<< HEAD
import { WalletProvider } from "@/src/wallet";
=======
import { Wallet } from "@/src/wallet";
>>>>>>> 2553d35359bae392eec86a35193b246b7d65d2ab
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'

const activeChainId = ChainId.SolanaDevNet;


export default function MyApp({ Component, pageProps }) {
  return (
      <ThirdwebProvider chainId={activeChainId}>
<<<<<<< HEAD
    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>
    </ThirdwebProvider>
=======
        <Wallet>
          <Component {...pageProps} />
        </Wallet>
      </ThirdwebProvider>
>>>>>>> 2553d35359bae392eec86a35193b246b7d65d2ab
  );
}
