import "@/styles/globals.css";
import { WalletProvider } from "@/src/wallet";

export default function MyApp({ Component, pageProps }) {
  return (
    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>
  );
}
