import { useContext, useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { WalletContext } from "@/src/wallet";
import { useWallet } from "@solana/wallet-adapter-react";

const backers = {
  featured: [
    {
      id: 1,
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 2,
      avatarSrc:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More backers...
  ],
};

const relatedProducts = [
  {
    id: 1,
    name: "Proyecto Genérico",
    category: "Web3",
    href: "#",
    price: "$49",
    imageSrc:
      "https://res.cloudinary.com/dzdqwcqj0/image/upload/v1685750833/DreamBacker/1_yxfrkb.png",
    imageAlt:
      "Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.",
  },
  // More products...
];

export default function DreamPage() {
  const router = useRouter();
  const [dream, setDream] = useState(null);
  const [isBacker, setIsBacker] = useState(false);

  const { id } = router.query;
  const { publicKey } = useWallet();
  const [isOwner, setIsOwner] = useState(false);

  const getDream = async () => {
    try {
      const response = await axios.get(`/api/dream/${id}`);
      setDream(response.data.dream);
    } catch (error) {
      console.log(error);
    }
  };

  const getIsBacker = async () => {
    try {
      const response = await axios.get(
        `/api/dream/${id}/isbacker?publicKey=${publicKey}`
      );
      console.log("is_backer", response.data.is_backer);
      setIsBacker(response.data.is_backer);
    } catch (error) {
      console.log(error);
    }
  };

  const getOwner = async () => {
    try {
      const response = await axios.get(`/api/dream?wallet=${publicKey}`);
      if (response.data.dreams.length > 0) {
        const isOwner = response.data.dreams.some(
          (dream) => dream.wallet === publicKey
        );
        setIsOwner(isOwner);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id != null && id !== undefined) {
      getDream();
    }
    getOwner();
    getIsBacker();
  }, [id]);

  if (!dream) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />

      <div className="bg-black">
        <div className="p-6">
          {dream == null ? (
            <div className="flex justify-center items-center h-screen">
              <div className="grid grid-cols-1 justify-items-center space-y-4">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
                <span>Cargando datos del servidor...</span>
              </div>
            </div>
          ) : (
            <div className="mx-auto px-4 pb-24 pt-14 sm:px-6 sm:pb-32 sm:pt-16 lg:max-w-7xl lg:px-8">
              {/* Product */}
              <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
                {/* Product image */}
                <div className="lg:col-span-4 lg:row-end-1">
                  <div className="relative aspect-h-3 aspect-w-4 overflow-hidden bg-gray-100">
                    <img
                      src={dream.thumbnail}
                      alt={"thumbnail"}
                      className="object-cover object-center"
                      width={200}
                      height={100}
                    />
                    {isOwner && (
                      <Link
                        href={`/dream/${dream._id}/edit`}
                        className="absolute inset-0 bg-white h-11 w-28 text-center rounded-full text-black items-center p-2"
                      >
                        ✏ Editar
                      </Link>
                    )}
                  </div>
                </div>

                {/* Product details */}
                <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
                  <div className="flex flex-col-reverse">
                    <div className="mt-4">
                      <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        {dream.title}
                      </h1>
                      <p>
                        <span className="text-lg tracking-tight text-white sm:text-xl">
                          Meta {parseFloat(dream.main_goal)} SOL
                        </span>
                      </p>
                      <span>
                        Recolectado {parseFloat(dream.collected ?? 0)} SOL
                      </span>
                      <div className="relative w-1/2">
                        {/* Barra porcentual de meta */}
                        <div className="relative rounded-full h-4 w-full bg-gray-100">
                          <div
                            className="absolute rounded-full h-4 bg-green-400"
                            style={{
                              width: `${
                                (parseFloat(dream.collected ?? 0) * 100) /
                                  parseFloat(dream.main_goal) <
                                100
                                  ? parseFloat(dream.collected) ?? 0 > 0
                                    ? (parseFloat(dream.collected ?? 0) * 100) /
                                      parseFloat(dream.main_goal)
                                    : 0
                                  : 100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                      <p>
                        Deadline {new Date(dream.deadline).toLocaleString()}
                      </p>
                      <p className="mt-2 text-sm text-white">
                        Última actualización{" "}
                        <time dateTime={dream.updated_at}>
                          {new Date(dream.updated_at).toLocaleString()}
                        </time>
                      </p>
                    </div>
                  </div>

                  <p className="mt-6 text-white">{dream.description}</p>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                    <Link href={`/dream/${id}/donate`}>
                      <button
                        type="button"
                        className="flex w-full items-center justify-center border border-transparent bg-white px-8 py-3 text-base font-medium text-black hover:bg-black hover:text-white hover:border-2 hover:border-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                      >
                        Donar SOL
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="flex w-full items-center justify-center  px-8 py-3 text-base font-medium bg-graybacker text-white hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                      Otra cantidad{" "}
                    </button>
                  </div>

                  <div className="mt-10 bg-white pt-2 px-2">
                    <h3 className="text-lg px-2 text-center w-36 font-semibold text-white bg-black">
                      Beneficios
                    </h3>
                    {dream.benefits.map((benefit, benefitIdx) => (
                      <div key={benefitIdx} className="mt-6 px-2">
                        <h4 className="text-sm font-medium text-black">
                          Donación mínima de {benefit.price} SOL
                        </h4>
                        <ul>
                          {benefit.perks.map((perk, perkIdx) => (
                            <li
                              key={perkIdx}
                              className="mt-2 text-sm text-white"
                            >
                              {perk}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {isBacker > 0 && (
                  <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
                    <h3 className="font-bold text-xl">
                      Ya eres un backer de este proyecto 😎
                    </h3>
                  </div>
                )}
              </div>

              {/* Related products */}
              <div className="mx-auto mt-24 max-w-2xl sm:mt-32 lg:max-w-none">
                <div className="flex items-center justify-between space-x-4">
                  <h2 className="text-lg font-medium text-white">
                    Otros proyectos{" "}
                  </h2>
                  <a
                    href="#"
                    className="whitespace-nowrap text-sm font-medium text-white hover:text-indigo-500"
                  >
                    Ver todos <span aria-hidden="true"> &rarr;</span>
                  </a>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                  {relatedProducts.map((product) => (
                    <div key={product.id} className="group relative">
                      <div className="aspect-h-3 aspect-w-4 overflow-hidden  bg-gray-100">
                        <img
                          src={product.imageSrc}
                          alt={product.imageAlt}
                          className="object-cover object-center"
                          width={200}
                          height={100}
                        />
                        <div
                          className="flex items-end p-4 opacity-0 group-hover:opacity-100"
                          aria-hidden="true"
                        >
                          <div className="w-full rounded-md bg-white bg-opacity-75 px-4 py-2 text-center text-sm font-medium text-white backdrop-blur backdrop-filter">
                            View Product
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-white">
                        <h3>
                          <a href="#">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.name}
                          </a>
                        </h3>
                        <p>{product.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-white">
                        {product.category}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
