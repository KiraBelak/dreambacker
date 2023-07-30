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
        const { wallet, nft } = query;
        console.log("nft_id => ", nft);
        const nftData = await nfts.findOne({ owner: wallet, id: nft });
        res.status(200).json({ nft: nftData });
      }
      break;
    case "PUT":
      // Update the user's nft
      {
        const { wallet } = query;
        const updatedNft = {
          name: body.name,
          description: body.description,
          image: body.image,
          updated_at: new Date(),
        };

        const result = await nfts.updateOne(
          { owner: wallet },
          { $set: updatedNft }
        );

        res.status(201).json({ message: "NFT updated", nft: updatedNft });
      }

      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
  client.close();
}
