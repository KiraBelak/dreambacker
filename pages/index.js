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
        <div>
          <MovingGallery />
        </div>
      </MainLayout>
    </div>
  );
}
