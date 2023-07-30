import Image from "next/image";
import Link from "next/link";

const NFTCard = ({ nft }) => {
  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <a className="block relative h-48 overflow-hidden">
        <Image
          alt={nft.name}
          className="object-cover object-center w-full h-full block"
          src={nft.image}
          fill="responsive"
          unoptimized
        />
      </a>
      <div className="mt-2">
        <h3 className="text-gray-400 title-font mb-1 text-lg">{nft.project}</h3>
        <p className="text-gray-400 title-font font-medium twoLines">
          {nft.description}
        </p>
        <p className="text-gray-400 title-font text-lg font-medium mb-2">
          status: {nft.status}
        </p>
        {/* // Boton para reclamar el NFT */}
        {nft.status === "claimed" ? (
          <Link
            href={`/dream/${nft.dream._id}`}
            className="flex text-sm font-medium text-center items-center justify-center bg-white text-black border-dashed border-2 py-2 px-1 "
          >
            Dream page
          </Link>
        ) : (
          <Link
            href={`/user/claim/${nft.id}`}
            className="flex text-sm font-medium text-center items-center justify-center bg-white text-black border-dashed border-2 py-2 px-1 hover:bg-black hover:text-white"
          >
            Claim
          </Link>
        )}
      </div>
    </div>
  );
};

export default NFTCard;
