import { NextSeo } from "next-seo";

const Seo = (props) => {
  const title = "DreamBacker";
  const description = "Crowdfunding";
  const url = "";
  const openGraphUrl = "";
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
            url: "https://res.cloudinary.com/todoenminutos/image/upload/w_800,h_600,c_fill/v1653181513/Todo%20en%20Minutos%20Productos/57433830_padded_logo_floptp.pnga",
            width: 800,
            height: 600,
            alt: "Todo en Minutos",
            type: "image/png",
          },
        ],
        site_name: "todoenminutos.com",
      }}
    />
  );
};

export default Seo;
