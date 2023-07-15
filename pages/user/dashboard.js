import Image from "next/image";
import NavBar from "@/components/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Example() {
  const [dreams, setDreams] = useState([]);

  useEffect(() => {
    axios
      .get("/api/dream")
      .then((res) => {
        console.log(res.data.dreams);
        setDreams(res.data.dreams);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-black">
      <NavBar />
      <div className="mx-auto min-h-screen max-w-2xl px-4 pb-20 sm:px-6 sm:pb-32 lg:max-w-7xl lg:px-8">
        {dreams.length == 0 ? (
          <div className="flex justify-center items-center h-screen">
            <div className="grid grid-cols-1 justify-items-center space-y-4">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
              <span className="text-black">Cargando datos del servidor...</span>
            </div>
          </div>
        ) : (
          <div className="mt-11 grid grid-cols-1 items-start gap-x-6 gap-y-16 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {dreams.map((dream) => (
              <div key={dream.title} className="flex flex-col-reverse">
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-center text-gray-100 border-dashed border-2 py-2 px-1">
                    {dream.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">
                    {dream.description}
                  </p>
                </div>
                <Link
                  href={"/dream/" + dream._id}
                  className="aspect-h-1 aspect-w-1 overflow-hidden bg-gray-100"
                >
                  <Image
                    src={dream.thumbnail}
                    alt={dream.title}
                    unoptimized
                    className="object-cover object-center"
                    width={500}
                    height={500}
                  />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
