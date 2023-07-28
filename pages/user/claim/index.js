import NavBar from "@/components/NavBar";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import NFTCard from "@/components/NFTCard";
import dummyData from "@/jsons/dummyNFTs.json";

const ClaimIndex = () => {
  const [nftPendientes, setNftPendientes] = useState([]);
  const wallet = useWallet();

  useEffect(() => {
    if (!wallet.connected) return;
    // const getNftPendientes = async () => {
    //   const { data } = await axios.get("/api/user/claim");
    //   setNftPendientes(data.nft);
    // };
    // getNftPendientes();
    setNftPendientes(dummyData);
  }, [wallet]);

  return (
    <div>
      <NavBar />
      {/* Pagina de claim de nft si tienes pendiente */}
      <div className="container">
        <div className="row">
          <div className="col-md-12 w-screen text-center">
            {/* CONTAINER HEADER */}
            <div className="flex flex-1 items-center justify-center px-5 mx-auto mt-10">
              <div>
                <h1>Available NFTs</h1>
                <h3>You can claim the following NFTs</h3>
              </div>
              <div>
                {/* SEARCH FILTER */}
                {/* TODO: Add a Search input field that calls the API endpoint with a filter value by project name */}
              </div>
            </div>
            {/* NFTs GRID */}
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-10 mx-auto">
                <div className="flex flex-wrap -m-4">
                  {nftPendientes.length > 0 ? (
                    nftPendientes.map((nft, i) => <NFTCard key={i} nft={nft} />)
                  ) : (
                    //pagina de no hay NFT pendientes con boton para ver los proyectos disponibles
                    <div className="container">
                      <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-col flex-wrap -m-4">
                          <h1>No tienes NFT pendientes</h1>
                          <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                            Ver proyectos
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimIndex;
