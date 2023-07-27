import NavBar from "../../components/NavBar";
import Image from "next/image";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

const Claim = () => {
  const [nftPendientes, setNftPendientes] = useState([]);
  const wallet = useWallet();

  const dummyData = [
    {
      name: "NFT 1",
      description: "NFT 1",
      project: "Project 1",
      image: "https://dummyimage.com/420x260",
      price: 100,
      owner: "0x123456789",
      status: "Pending",
    },
    {
      name: "NFT 2",
      description: "NFT 2",
      project: "Project 2",
      image: "https://dummyimage.com/420x260",
      price: 100,
      owner: "0x123456789",
      status: "Claimed",
    },
    {
      name: "NFT 3",
      description: "NFT 3",
      project: "Project 3",
      image: "https://dummyimage.com/420x260",
      price: 200,
      owner: "0x987654321",
      status: "Pending",
    },
    {
      name: "NFT 4",
      description: "NFT 4",
      project: "Project 4",
      image: "https://dummyimage.com/420x260",
      price: 150,
      owner: "0x987654321",
      status: "Claimed",
    },
    {
      name: "NFT 5",
      description: "NFT 5",
      project: "Project 5",
      image: "https://dummyimage.com/420x260",
      price: 300,
      owner: "0x123456789",
      status: "Pending",
    },
    {
      name: "NFT 6",
      description: "NFT 6",
      project: "Project 6",
      image: "https://dummyimage.com/420x260",
      price: 250,
      owner: "0x987654321",
      status: "Claimed",
    },
    {
      name: "NFT 7",
      description: "NFT 7",
      project: "Project 7",
      image: "https://dummyimage.com/420x260",
      price: 175,
      owner: "0x123456789",
      status: "Pending",
    },
    {
      name: "NFT 8",
      description: "NFT 8",
      project: "Project 8",
      image: "https://dummyimage.com/420x260",
      price: 225,
      owner: "0x987654321",
      status: "Claimed",
    },
    {
      name: "NFT 9",
      description: "NFT 9",
      project: "Project 9",
      image: "https://dummyimage.com/420x260",
      price: 275,
      owner: "0x123456789",
      status: "Pending",
    },
    {
      name: "NFT 10",
      description: "NFT 10",
      project: "Project 10",
      image: "https://dummyimage.com/420x260",
      price: 200,
      owner: "0x987654321",
      status: "Claimed",
    },
  ];

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
                          <p className="mt-1">${nft.price} SOL</p>
                          <p className="mt-1">{nft.project}</p>
                          <p className="mt-1">{nft.status}</p>
                          {/* // Boton para reclamar el NFT */}
                          <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                            Reclamar
                          </button>
                        </div>
                      </div>
                    ))
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

export default Claim;
