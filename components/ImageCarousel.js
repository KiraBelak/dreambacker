
import Image from 'next/image';

const images = [
    'https://res.cloudinary.com/ddh90ppnw/image/upload/v1685517607/superteam/FVPGrWqXsAEiGqk_ixg2ec.jpg',
    'https://res.cloudinary.com/ddh90ppnw/image/upload/v1685517607/superteam/FVPGrWqXsAEiGqk_ixg2ec.jpg',
    'https://res.cloudinary.com/ddh90ppnw/image/upload/v1685517607/superteam/FVPGrWqXsAEiGqk_ixg2ec.jpg',
    'https://res.cloudinary.com/ddh90ppnw/image/upload/v1685517607/superteam/FVPGrWqXsAEiGqk_ixg2ec.jpg',
    'https://res.cloudinary.com/ddh90ppnw/image/upload/v1685517607/superteam/FVPGrWqXsAEiGqk_ixg2ec.jpg',
    'https://res.cloudinary.com/ddh90ppnw/image/upload/v1685517607/superteam/FVPGrWqXsAEiGqk_ixg2ec.jpg',
    'https://res.cloudinary.com/ddh90ppnw/image/upload/v1685517607/superteam/FVPGrWqXsAEiGqk_ixg2ec.jpg',
    'https://res.cloudinary.com/ddh90ppnw/image/upload/v1685517607/superteam/FVPGrWqXsAEiGqk_ixg2ec.jpg',
    'https://res.cloudinary.com/ddh90ppnw/image/upload/v1685517607/superteam/FVPGrWqXsAEiGqk_ixg2ec.jpg',
    'https://res.cloudinary.com/ddh90ppnw/image/upload/v1685517607/superteam/FVPGrWqXsAEiGqk_ixg2ec.jpg',
    'https://res.cloudinary.com/ddh90ppnw/image/upload/v1685517607/superteam/FVPGrWqXsAEiGqk_ixg2ec.jpg',
    'https://res.cloudinary.com/ddh90ppnw/image/upload/v1685517607/superteam/FVPGrWqXsAEiGqk_ixg2ec.jpg',
    'https://res.cloudinary.com/ddh90ppnw/image/upload/v1685517607/superteam/FVPGrWqXsAEiGqk_ixg2ec.jpg',
    'https://res.cloudinary.com/ddh90ppnw/image/upload/v1685517607/superteam/FVPGrWqXsAEiGqk_ixg2ec.jpg',
    'https://res.cloudinary.com/ddh90ppnw/image/upload/v1685517607/superteam/FVPGrWqXsAEiGqk_ixg2ec.jpg',
    'https://res.cloudinary.com/ddh90ppnw/image/upload/v1685517607/superteam/FVPGrWqXsAEiGqk_ixg2ec.jpg',
    'https://res.cloudinary.com/ddh90ppnw/image/upload/v1685517607/superteam/FVPGrWqXsAEiGqk_ixg2ec.jpg',
    'https://res.cloudinary.com/ddh90ppnw/image/upload/v1685517607/superteam/FVPGrWqXsAEiGqk_ixg2ec.jpg',
    // Add more image URLs as needed
  ];
  
  const ImageCarousel = () => {
    return (
      <>
      <div className='w-80'>
        <div className="relative w-full p-16 h-screen overflow-y-hidden">
          <div className="flex absolute right-6 -top-6 animate-marquee-infinite">
            <div className='grid grid-cols-1 w-72 justify-around space-y-20'>
              {images.map((image, index) => (
                <Image
                  width={200}
                  height={100}
                  src={image}
                  alt={`Image ${index + 1}`}
                  key={index}
                  className="w-full rounded-2xl"
                />
              ))}
            </div>                          
          </div>
        </div>
      </div>
  </>
     
    );
  };
  
  export default ImageCarousel;