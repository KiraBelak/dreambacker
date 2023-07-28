import Image from "next/image";
import Link from "next/link";

const NFTCard = ({ nft }) => {
  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
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
        <Link
          href={`/user/claim/${nft.id}`}
          className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
        >
          Claim
        </Link>
      </div>
    </div>
  );
};

export default NFTCard;
