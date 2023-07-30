import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import Image from "next/image";
import dummyData from "@/jsons/dummyNFTs.json";
import { useRouter } from "next/router";
import Loading from "@/components/common/Loading";

import { mintNFT } from "@lib/claimnft";

export default function Example() {
  const router = useRouter();
  const [selectedNFT, setSelectedNFT] = useState({});
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    console.log("id", id);
    if (!id) return;
    // TODO: Call the API endpoint to get the NFT data instead of dummyData
    const nft = dummyData.find((nft) => nft.id === id);
    console.log("nft", nft);
    setLoading(false);
    if (!nft) {
      setNotFound(true);
      return;
    }
    setSelectedNFT(nft);
  }, [id]);

  return (
    <>
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
        <div className="bg-white">
          <div className="pb-16 pt-6 sm:pb-24">
            <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
                <div className="lg:col-span-5 lg:col-start-8">
                  <div className="flex justify-between">
                    <h1 className="text-xl font-medium text-gray-900">
                      {selectedNFT.name}
                    </h1>
                    <p className="text-xl font-medium text-gray-900">
                      {selectedNFT.price} SOL
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <h1 className="text-xl font-medium text-gray-900">
                      {selectedNFT.project}
                    </h1>
                  </div>
                </div>

                {/* Image gallery */}
                <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                  <h2 className="sr-only">Images</h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                    <Image
                      src={selectedNFT.image}
                      alt={selectedNFT.name}
                      className={"lg:col-span-2 lg:row-span-2 rounded-lg"}
                      width={4200}
                      height={2600}
                    />
                  </div>
                </div>

                <div className="mt-8 lg:col-span-5">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Redeem
                  </button>

                  {/* Product details */}
                  <div className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">
                      Description
                    </h2>

                    <div
                      className="prose prose-sm mt-4 text-gray-500"
                      dangerouslySetInnerHTML={{
                        __html: selectedNFT.description,
                      }}
                    />
                  </div>

                  <div className="mt-8 border-t border-gray-200 pt-8">
                    <h2 className="text-sm font-medium text-gray-900">
                      Benefits:
                    </h2>

                    <div className="prose prose-sm mt-4 text-gray-500">
                      <ul role="list">
                      {(selectedNFT?.benefits.length > 1) && selectedNFT?.benefits?.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      {(selectedNFT?.benefits?.length === 1) && <li>{selectedNFT?.benefits[0]}</li>
                      }

                        {/* {selectedNFT?.benefits?.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))} */}
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
