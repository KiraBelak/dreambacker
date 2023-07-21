import "@/styles/globals.css";
import { Wallet } from "@/src/wallet";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

const activeChainId = ChainId.SolanaDevNet;

export default function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider chainId={activeChainId}>
      <Wallet>
        <Component {...pageProps} />
      </Wallet>
    </ThirdwebProvider>
  );
}
