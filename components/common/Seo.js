import { NextSeo } from "next-seo";

const Seo = (props) => {
  const title = "dreambacker - The Leading Crypto Crowdfunding Platform";
  const description =
    "Fueling innovation and turning dreams into reality through our leading crypto crowdfunding platform. Join us today!";

  const url = "https://www.dreambacker.tech/";
  const openGraphUrl = "https://www.dreambacker.tech/";
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={url}
      openGraph={{
        url: { url },
        title,
        description,
        images: [
          {
            url: "https://res.cloudinary.com/dzdqwcqj0/image/upload/v1689557058/DreamBacker/Disen%CC%83o_sin_ti%CC%81tulo_1_bgf6ob.png",
            width: 800,
            height: 600,
            alt: "dreambacker",
            type: "image/png",
          },
        ],
        site_name: "dreambacker.tech",
      }}
    />
  );
};

export default Seo;
