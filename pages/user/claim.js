import NavBar from "../../components/NavBar";
import Image from "next/image";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";


const Claim = () => {
    const [nftPendientes, setNftPendientes] = useState(null);
    const wallet = useWallet();
    console.log(wallet.publicKey.toBase58());

    useEffect(() => {
        const getNftPendientes = async () => {
            const { data } = await axios.get("/api/user/claim");
            setNftPendientes(data.nft);
        };
        getNftPendientes();
    }, []);

  return (
    <div>
      <NavBar />
      {/* Pagina de claim de nft si tienes pendiente */}
      <div className="container">
        <div className="row">
          <div className="col-md-12 w-screen text-center">
            <h1>NFT Pendientes</h1>
            {/* Secction para las cartas de NFT pendientes */}
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                  {nftPendientes == !null? (
                    nftPendientes.map((nft, i) => (
                        <div key={i} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                          <a className="block relative h-48 rounded overflow-hidden">
                            <Image
                              alt={nft.name}
                              className="object-cover object-center w-full h-full block"
                              src={nft.image}
                              fill="responsive"
                              unoptimized
                            />
                          </a>
                          <div className="mt-4">
                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                              {nft.name}
                            </h3>
                            <h2 className="text-gray-900 title-font text-lg font-medium">
                              {nft.description}
                            </h2>
                            <p className="mt-1">${nft.price}</p>
                            <p className="mt-1">{nft.owner}</p>
                            <p className="mt-1">{nft.status}</p>
                            {/* // Boton para reclamar el NFT */}
                            <button 
                            className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                            >
                              Reclamar
                            </button>
                          </div>
                        </div>
                    ))
                  ): 
                    (
                        //pagina de no hay NFT pendientes con boton para ver los proyectos disponibles
                        <div className="container">
                             <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col flex-wrap -m-4">
                                    <h1>No tienes NFT pendientes</h1>
                                    <button
                                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                                    >
                                        Ver proyectos
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                        

                  
                  }
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Claim;
