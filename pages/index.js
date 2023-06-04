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

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { publicKey, setPublicKey } = useContext(WalletContext);
  const router = useRouter();

  //funcion asincrona para obtener el perfil del usuario
  const getProfile = async (publicKey) => {
    const wallet = publicKey;
    toast.loading("Cargando perfil...");
    try {
      const response = await axios.get(`/api/user/${wallet}`);
      console.log(response.data);
      if (response.data.profile != null) {
        toast.dismiss();
        toast.success("Perfil cargado");
        router.push("/user/dashboard");
      } else {
        toast.dismiss();
        toast.success("Crea tu perfil");
        router.push("/createprofile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (publicKey) {
      getProfile(publicKey);
    }
  }, [publicKey]);

  return (
    <div>
      <Toaster position="bottom-center" reverseOrder={false} />
      <MainLayout>
        <div className="page-container mx-0 md:mx-20">
          <div className="hero-section">
            <div className="mx-auto flex flex-col max-w-2xl lg:mx-0">
              <h1 className="font-manrope mt-24 text-4xl font-bold tracking-tight text-indigo-600 sm:mt-10 sm:text-6xl">
                Convierte sueños en realidad{" "}
              </h1>
              <p className="font-manrope mt-6 text-xl leading-8 text-indigo-600">
                Una plataforma para apoyar proyectos y ganar recompensas, con
                una simple donación de SOL
              </p>
              <div className="flex w-full justify-center items-center">
                <div className="mt-10 flex justify-between items-center w-2/3">
                  <div href="/">
                    <ConnectWallet />
                  </div>
                  <p className="py-2 px-4 text-white rounded-md font-manrope">
                    Una vez conectada podrás Explorar o Crear Proyectos{" "}
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
