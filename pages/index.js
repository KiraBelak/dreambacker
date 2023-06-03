import { Inter } from "next/font/google";
import { ConnectWallet } from "../components/connectwallet";
import MainLayout from "@/components/layouts/MainLayout";
import MovingGallery from "@/components/MovingGallery";
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
            {/* Your hero section content goes here */}
            <h1>Bienvenido a mi sitio!</h1>
            <p>Aquí va la info.</p>
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
