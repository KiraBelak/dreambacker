import { Inter } from "next/font/google";
import MainLayout from "@/components/layouts/MainLayout";
import { ConnectWallet } from "@/components/ConnectWallet";
import Link from "next/link";
import { WalletContext } from "../src/wallet";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import ImageCarousel from "@/components/ImageCarousel";
import { useWallet } from "@solana/wallet-adapter-react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  //funcion asincrona para obtener el perfil del usuario

  const { publicKey } = useWallet();

  useEffect(() => {
    if (publicKey) {
      getProfile();
    }
  }, [publicKey]);

  const getProfile = async () => {
    toast.loading("Loading profile...");
    try {
      const response = await axios.get(`/api/user/${publicKey}`);
      console.log(response.data);
      if (response.data.profile != null) {
        toast.dismiss();
        toast.success("Profile loaded");
        router.push("/user/dashboard");
      } else {
        toast.dismiss();
        toast.success("Create Profile");
        router.push("/createprofile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Toaster position="bottom-center" reverseOrder={false} />
      <MainLayout>
        <div className="page-container mx-0 md:mx-20">
          <div className="hero-section">
            <div className="mx-auto flex flex-col max-w-2xl lg:mx-0">
              <h1 className="font-manrope mt-24 text-4xl font-bold tracking-tight text-white sm:mt-10 sm:text-6xl">
                Where Dreamers meet Backers{" "}
              </h1>
              <p className="font-manrope mt-6 text-xl leading-8 text-white">
                Fuel Dreams, Ignite Possibilities: Empowering Innovators through
                Crypto Crowdfunding!
              </p>
              <div className="flex w-full justify-start items-center">
                <div className="mt-10 flex justify-between items-center w-2/3">
                  <ConnectWallet />

                  <p className="py-2 px-4 text-white rounded-md font-manrope">
                    Connect your wallet to explore or create projects{" "}
                  </p>
                  <div className="h-screen absolute right-6">
                    <ImageCarousel />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
}
