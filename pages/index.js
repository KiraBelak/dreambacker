import { Inter } from "next/font/google";
import { ConnectWallet } from "../components/connectwallet";
import MainLayout from "@/components/layouts/MainLayout";
import MovingGallery from "@/components/MovingGallery";
import Link from "next/link";
import { WalletContext } from "../src/wallet";
import { useRouter } from "next/router";
import { useContext } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { publicKey, setPublicKey } = useContext(WalletContext);
  const router = useRouter();


  if (publicKey) {
    console.log("the public",publicKey);
    router.push("/dreamer");
  }
  


  return (
    <div>
      <MainLayout>
        <div className="page-container">
          <div className="hero-section">
            <div className="mx-auto flex flex-col max-w-2xl lg:mx-0">
              <h1 className="mt-24 text-4xl font-bold tracking-tight text-indigo-600 sm:mt-10 sm:text-6xl">
                One liner
              </h1>
              <p className="mt-6 text-lg leading-8 text-indigo-600"> Frase. </p>
              <div className="mt-10 ml-5 flex justify-center items-center content-center">
              <div href="/" className="mr-10">
                <ConnectWallet className=''/>
              </div>
              <Link href="/" className="">
                <button className="px-2 py-1 mt-4 bg-indigo-600 text-white rounded-md text-xl  w-full text-center">
                  Explorar
                </button>
              </Link>
              </div>
            </div>
          </div>
          <div className="moving-gallery-container">
            <MovingGallery />
          </div>
        </div>
      </MainLayout>

      <style jsx>{`
        .page-container {
          display: flex;
        }

        .hero-section {
          flex: 1;
          padding: 20px;
        }

        .moving-gallery-container {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}
