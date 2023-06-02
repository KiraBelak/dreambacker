import { Inter } from "next/font/google";
import { ConnectWallet } from "../components/connectwallet";
import MainLayout from "@/components/layouts/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <MainLayout
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <ConnectWallet />
    </MainLayout>
  );
}
