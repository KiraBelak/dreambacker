// import { useState, useEffect, useContext } from "react";
// import { useRouter } from "next/router";
// import { WalletContext } from "../src/wallet";
// import {
//   Connection,
//   SystemProgram,
//   Transaction,
//   PublicKey,
//   LAMPORTS_PER_SOL,
//   clusterApiUrl,
//   SendTransactionError,
// } from "@solana/web3.js";
// import Link from "next/link";
// this comment is for pushing to deploy merge to master
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import dynamic from "next/dynamic";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

// const { toast, Toaster } = require("react-hot-toast");

// const SOLANA_NETWORK = "devnet";

export function ConnectWallet(props) {
  const DynamicWalletMultiButton = dynamic(
    () =>
      import("@solana/wallet-adapter-react-ui").then(
        (mod) => mod.WalletMultiButton
      ),
    { ssr: false }
  );

  // const { connection } = useConnection();
  const { publicKey } = useWallet();
  // const [open, setOpen] = useState(false);

  // const router = useRouter();
  // const [balance, setBalance] = useState(0);

  // useEffect(() => {
  //   let key = window?.localStorage?.getItem("publicKey"); //obtener la key del localstorage
  //   if (key) setPublicKey(key);
  //   if (key) getBalance(key);
  // }, []);

  // const connectWallet = async () => {
  //   // console.log("click");
  //   //si phantom no esta instalado
  //   const provider = window?.phantom?.solana;
  //   const { solana } = window;
  //   if (!provider?.isPhantom || !solana?.isPhantom) {
  //     toast.error("Phantom wallet is not installed");
  //     setTimeout(() => {
  //       window.open("https://phantom.app/", "_blank");
  //     }, 2000);
  //     return;
  //   }
  //   //si phantom esta instalado
  //   let phantom;
  //   if (provider?.isPhantom) phantom = provider;
  //   const { publicKey } = await phantom.connect();
  //   console.log("ahi esta tu chingadera", publicKey.toString());
  //   setPublicKey(publicKey.toString());
  //   window?.localStorage?.setItem("publicKey", publicKey.toString());
  //   toast.success("Wallet connected 👻");
  //   getBalance(publicKey);
  // };

  // const signOut = () => {
  //   if (window) {
  //     const { solana } = window;
  //     window.localStorage.removeItem("publicKey");
  //     setPublicKey(null);
  //     solana.disconnect();
  //     toast.success("Wallet disconnected 👻");
  //     router.push("/");
  //   }
  // };

  //funcion para obtener el balance de la wallet
  // const getBalance = async (publicKey) => {
  //   try {
  //     const connection = new Connection(
  //       clusterApiUrl(SOLANA_NETWORK),
  //       "confirmed"
  //     );
  //     const balance = await connection.getBalance(new PublicKey(publicKey));
  //     const balancenew = balance / LAMPORTS_PER_SOL;
  //     setBalance(balancenew);
  //   } catch (err) {
  //     console.error("error al obtener el balance", err);
  //     toast.error("error al obtener el balance");
  //   }
  // };

  // const handleReceiverChange = (e) => {
  //   setReceiver(e.target.value);
  // };

  // const handleUrlChange = (e) => {
  //   setUrl(e.target.value);
  // };

  return (
    <WalletModalProvider>
      <DynamicWalletMultiButton
        style={{
          width: "100%",
          height: "100%",
          background: "white",
          color: "black",
          borderRadius: "0px",
          border: "none",
          paddingLeft: "70px",
        }}
      />

      {/* <WalletDisconnectButton /> */}
    </WalletModalProvider>
  );
}
