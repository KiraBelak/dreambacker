import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Loading from "@/components/common/Loading";
import axios from "axios";
import { getNFT } from "@/lib/claimnft";
import { Toaster } from "react-hot-toast";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

export default function Example() {
  const router = useRouter();
  const [selectedNFT, setSelectedNFT] = useState({});
  const [mintedNFT, setMintedNFT] = useState(null);
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [statusText, setStatusText] = useState("");
  const wallet = useWallet();
  const { publicKey } = wallet;
  const { connection } = useConnection();

  useEffect(() => {
    // console.log("id", id);
    if (!id) return;

    if (!wallet.connected || !id) return;
    const getNFTData = async () => {
      const { publicKey } = wallet;
      const { data } = await axios.get(`/api/claim/${id}?wallet=${publicKey}`);
      const { nft } = data;
      if (!nft) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setSelectedNFT(nft);
      setLoading(false);
    };

    getNFTData();
  }, [wallet, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    getNFT(selectedNFT, wallet, connection);
  };

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <NavBar />
      {loading ? (
        <Loading />
      ) : notFound ? (
        <div className="flex justify-center items-center h-screen">
          <div className="grid grid-cols-1 justify-items-center space-y-4">
            <span className="text-white">NFT not found</span>
          </div>
        </div>
      ) : (
        <div className="bg-black">
          <div className="pb-16 pt-6 sm:pb-24">
            <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
                <div className="lg:col-span-5 lg:col-start-8">
                  <div className="flex justify-between">
                    <h1 className="text-xl font-medium text-white">
                      Claim your NFT for helping this project!
                    </h1>
                    {/* <p className="text-xl font-medium text-white">
                      {selectedNFT.price} SOL
                    </p> */}
                  </div>
                  <div className="flex justify-between">
                    <h1 className="text-xl font-medium text-white">
                      {selectedNFT.project}
                    </h1>
                  </div>
                </div>

                {/* Image gallery */}
                <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                    <Image
                      src={selectedNFT.image}
                      alt={selectedNFT.name}
                      className={"lg:col-span-2 lg:row-span-2"}
                      width={4200}
                      height={2600}
                    />
                  </div>
                </div>

                <div className="mt-8 lg:col-span-5">
                  <button
                    onClick={handleSubmit}
                    className="flex w-full text-sm font-medium text-center items-center justify-center bg-white text-black border-dashed border-2 py-2 px-1 hover:bg-black hover:text-white"
                  >
                    Redeem NFT
                  </button>
                  <p className="mt-4 text-center text-sm text-white">
                    {statusText}
                  </p>
                  {/* Product details */}
                  <div className="mt-10">
                    <h2 className="text-sm font-medium text-white">
                      Description
                    </h2>

                    <div
                      className="prose prose-sm mt-4 text-white"
                      dangerouslySetInnerHTML={{
                        __html: selectedNFT.description,
                      }}
                    />
                  </div>
                  {/* Aqui van los benefits */}
                  <div className="mt-8 border-t border-gray-200 pt-8">
                    <h2 className="text-sm font-medium text-white">
                      Benefits:
                    </h2>

                    <div className="prose prose-sm mt-4 text-white">
                      <ul>
                        <li>
                          {
                            selectedNFT.benefits[
                              Object.keys(selectedNFT.benefits)[0]
                            ]
                          }
                        </li>
                        <li>{selectedNFT.benefits.perks[0]}</li>
                        {/* <li>{selectedNFT.benefits.price}</li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
