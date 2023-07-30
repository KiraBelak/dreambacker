import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { set } from "react-hook-form";

const ImageCarousel = () => {
  const [dreams, setDreams] = useState(null);
  const [images, setImages] = useState([]);
  const [titles, setTitles] = useState([]);

  const getDreams = async () => {
    try {
      // console.log("llamando endpoint");
      const response = await axios.get(`/api/dream`);
      // console.log("dreams", response.data);
      setDreams(response.data.dreams);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchImages = async () => {
    // console.log("mapeando dreams a dreamImages");
    const dreamImages = dreams.map((dream) => dream.thumbnail);
    const dreamTitles = dreams.map((dream) => dream.title);
    // console.log("dreamImages", dreamImages);
    setImages(dreamImages);
    setTitles(dreamTitles);
  };
  // obtener las imagenes del arreglo de objetos dreams
  // cada objecto tiene una propiedad llamada thumbnail
  // ese thumbnail es una URL que debemos guardar o agregar al arreglo images
  // una vez tengamos este arreglo, lo asignamos con setImages(images)

  useEffect(() => {
    if (dreams == null) return;
    // console.log("llamando funcion fetchImages");
    fetchImages();
  }, [dreams]);

  useEffect(() => {
    getDreams();
  }, []);

  return (
    <>
      <div className="w-80">
        <div className="relative w-full p-16 h-screen overflow-y-hidden">
          <div className="flex absolute right-6 -top-6 animate-marquee-infinite">
            <div className="grid grid-cols-1 w-72 justify-around space-y-20">
              {images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    key={index}
                    className="w-full border-2 border-gray-600 border-dashed"
                  />
                  <div className="">
                    <p className="text-gray-400 text-center px-2 py-1 border-gray-600 border-2 border-dashed">
                      {titles[index]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageCarousel;
