import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { WalletContext } from "../src/wallet";
import {
  Connection,
  SystemProgram,
  Transaction,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  SendTransactionError,
} from "@solana/web3.js";
import Link from "next/link";

const { toast, Toaster } = require("react-hot-toast");

const SOLANA_NETWORK = "devnet";

export function ConnectWallet(props) {
  const { publicKey, setPublicKey } = useContext(WalletContext);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    let key = window?.localStorage?.getItem("publicKey"); //obtener la key del localstorage
    if (key) setPublicKey(key);
    if (key) getBalance(key);
  }, []);

  const connectWallet = async () => {
    // console.log("click");
    //si phantom no esta instalado
    const provider = window?.phantom?.solana;
    const { solana } = window;
    if (!provider?.isPhantom || !solana?.isPhantom) {
      toast.error("Phantom wallet is not installed");
      setTimeout(() => {
        window.open("https://phantom.app/", "_blank");
      }, 2000);
      return;
    }
    //si phantom esta instalado
    let phantom;
    if (provider?.isPhantom) phantom = provider;
    const { publicKey } = await phantom.connect();
    console.log("ahi esta tu chingadera", publicKey.toString());
    setPublicKey(publicKey.toString());
    window?.localStorage?.setItem("publicKey", publicKey.toString());
    toast.success("Wallet connected 👻");
    getBalance(publicKey);
  };

  const signOut = () => {
    if (window) {
      const { solana } = window;
      window.localStorage.removeItem("publicKey");
      setPublicKey(null);
      solana.disconnect();
      toast.success("Wallet disconnected 👻");
      router.push("/");
    }
  };

  //funcion para obtener el balance de la wallet
  const getBalance = async (publicKey) => {
    try {
      const connection = new Connection(
        clusterApiUrl(SOLANA_NETWORK),
        "confirmed"
      );
      const balance = await connection.getBalance(new PublicKey(publicKey));
      const balancenew = balance / LAMPORTS_PER_SOL;
      setBalance(balancenew);
    } catch (err) {
      console.error("error al obtener el balance", err);
      toast.error("error al obtener el balance");
    }
  };

  const handleReceiverChange = (e) => {
    setReceiver(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <>
      <Toaster position="bottom-center" />
      <div className="flex flex-col h-full">
        <div className="flex flex-col place-items-center justify-center">
          {publicKey ? (
            <div className="flex flex-col place-items-center justify-center">
              <div
                className="flex flex-row place-items-center justify-center"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <p className="text-2xl font-bold text-purple-500">
                  Tu wallet: {"  "}
                </p>
                <p className="text-2xl font-bold text-purple-500">
                  {publicKey.substring(0, 3) +
                    "..." +
                    publicKey.substring(publicKey.length - 7, publicKey.length)}
                </p>
              </div>
              {open ? (
                <div className="absolute top-10 mt-12 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  <Link
                    href="/user/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Desconectar wallet 🥲
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <button
              type="submit"
              className="inline-flex py=4 h-8 flex-col items-center  w-52 justify-center bg-purple-500 font-bold text-white"
              onClick={() => {
                connectWallet();
              }}
            >
              Conectar tu wallet 👻
            </button>
          )}
        </div>
      </div>
    </>
  );
}
