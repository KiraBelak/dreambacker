import { toast } from "react-hot-toast";


const mintNFT = async (
  contractAddress,
  tokenId,
  toAddress,
  fromAddress,
  privateKey
) => {
  return null;
};

async function getNFT(nft, setStatusText) {
 console.log("funciona", nft);
 const dream = nft;
 try {
  setStatusText("Dream obtained");
  // Build SHYFT's bodyParams with the information provided

  toast.loading("Generating NFT");
  
 

  // toast.success("beneficios obtenidos");
  const benefitsString = JSON.stringify({
    benefits: benefits,
    dream: dream,
    amount: amount,
    backed_at: new Date().toISOString(),
  });

  var myHeaders = new Headers();
  myHeaders.append("x-api-key", shyft_api_key);
  myHeaders.append("Content-Type", "multipart/form-data");

  var formdata = new FormData();
  formdata.append("network", network);
  formdata.append("wallet", "7APHQNvmRUXGto4PGZWmdW72wZ1DD17MaBmhhz9vt7Sp");
  formdata.append("name", dream.title);
  formdata.append("symbol", "DrB");
  formdata.append("description", dream.description);
  formdata.append("attributes", benefitsString);
  formdata.append("external_url", "https://shyft.to");
  formdata.append("receiver", publicKey);
  // formdata.append("max_supply", "0");
  // formdata.append("royalty", "5");
  // formdata.append("file", fileInput.files[0], "index.png");
  // formdata.append('service_charge', '{ "receiver": "499qpPLdqgvVeGvvNjsWi27QHpC8GPkPfuL5Cn2DtZJe",  "token": "DjMA5cCK95X333t7SgkpsG5vC9wMk7u9JV4w8qipvFE8",  "amount": 0.01}');

  // create a blob from dream.thumbnail which is a URL for an IPFS image
  toast.success("Generating NFT");
  await fetch(dream.thumbnail)
    .then((res) => res.blob())
    .then((blob) => {
      formdata.append("file", blob);
    });
  toast.success("NFT generated");
  // setStatusText("Generando NFT")
  const result = await axios.post(
    "https://api.shyft.to/sol/v1/nft/create_detach",
    formdata,
    {
      headers: {
        "x-api-key": shyft_api_key,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  toast.dismiss();
  // console.log("result",result)
  setStatusText("Succesfully Minted, signing NFT");
  toast.success("Succesfully Minted, signing NFT");
  signNFT(result.data.result.encoded_transaction);
  // console.log('data', response.data); // displaying the response
} catch (error) {
  // console.log(error);
  setStatusText(JSON.stringify(error));
}
};

export { mintNFT, getNFT };

const getBenefitPerks = (dream, amount) => {
  const { benefits } = dream;

  // order benefits by price ascending
  benefits.sort((a, b) => a.price - b.price);

  // loop through benefits and compare the amount against price, if amount is higher than price then return the price object
  for (let i = 0; i < benefits.length; i++) {
    if (amount >= benefits[i].price) {
      return benefits[i];
    }
  }

  return null;
};

const signNFT = async (nft) => {
  try {
    const result = await axios.post("/api/signnft", {
      network: network,
      nft: nft,
    });
    // console.log(result);
    toast.success("Transaction sent, NFT received 👏");
    let collected = dream.collected + amount;
    await axios.put(`/api/dream/${id}`, {
      collected: collected,
    });
    //esperamos 3 segundos y router push a la pagina de nft
    setTimeout(() => {
      router.push("/user/dashboard");
    }, 3000);

    setStatusText(
      `NFT signed succesfully https://solscan.io/tx/${result.data.result}?cluster=devnet`
    );
  } catch (error) {
    toast.error("An eror occurred.");
    // console.log(error);
  }
};