//endpoint for claim
import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { method, body, query } = req;

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  const nfts = db.collection("nft");

  switch (method) {
    case "GET":
      // Retrieve the nft with their wallet address
      {
        const { wallet } = query;
        const nftsList = await nfts.find({ owner: wallet }).toArray();
        res.status(200).json({ nfts: nftsList });
      }
      break;
    case "POST":
      // Create a new nft
      {
        // console.log(body);
        // console.log(query);
        const date = new Date();
        console.log("this is body", body);
        const newNft = {
          id: body.id,
          name: body.name,
          description: body.description,
          image: body.image,
          project: body.name,
          price: body.price,
          owner: body.owner,
          status: body.status,
          benefits: body.benefits,
          dream: body.dream,
          date: date,
        };

        const result = await nfts.insertOne(newNft);
        res.status(201).json({ message: "NFT created", nft_id: body.id });
      }

      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
  client.close();
}
