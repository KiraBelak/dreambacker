import axios from "axios";
import { MongoClient, ObjectId } from "mongodb";

const portfolio_endpoint =
  "https://api.shyft.to/sol/v1/wallet/get_portfolio?network=devnet&wallet=";
const searchnft_endpoint = "https://api.shyft.to/sol/v1/nft/search";
const shyft_api_key = "q4OzU_8-cc89oq-R";
const network = process.env.CHAIN_NETWORK;

export default async function handler(req, res) {
  const { method, body, query } = req;

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  const dreams = db.collection("dreams");

  switch (method) {
    case "GET":
      try {
        const { dream, publicKey } = query;
        console.log("Query from Server", query);

        const dreamObj = await dreams.findOne({ _id: new ObjectId(dream) });

        if (!dreamObj) {
          res.status(404).json({ message: "dream not found" });
        }

        console.log("dream", dreamObj._id);

        const result = await searchNFT(publicKey, dream);
        const nfts = result.data.result.nfts;

        //check if the dream title is inside the nfts array of objects, where the object has the property name
        const dreamExistsInNFTs = nfts.some(
          (nft) => nft.name == dreamObj.title
        );

        res.status(200).json({ is_backer: dreamExistsInNFTs });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
  }
}

const searchNFT = async (publicKey, dream) => {
  try {
    var params = {
      network: network,
      wallet: publicKey,
      creators: process.env.DRB_WALLET_ADDRESS,
      // attributes: JSON.stringify({dream: dream})
    };
    console.log("params", params);
    var headers = {
      "x-api-key": shyft_api_key,
      "Content-Type": "application/json",
    };

    // add params as a url query param to searchnft_endpoint
    const result = await axios.get(searchnft_endpoint, {
      params: params,
      headers: headers,
    });
    console.log("nft search response", result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getNFTPortfolio = async (publicKey) => {
  var myHeaders = new Headers();
  myHeaders.append("x-api-key", shyft_api_key);
  const result = axios.get(portfolio_endpoint + "" + publicKey);
  return result;
};
