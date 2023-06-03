import { Inter } from "next/font/google";
import { ConnectWallet } from "../components/connectwallet";
import MainLayout from "@/components/layouts/MainLayout";
import MovingGallery from "@/components/MovingGallery";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <MainLayout>
        <ConnectWallet />
        <div className="page-container">
          <div className="hero-section">
            {/* Your hero section content goes here */}
            <h1>Welcome to my website!</h1>
            <p>This is the hero section content.</p>
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
