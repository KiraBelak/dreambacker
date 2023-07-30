//endpoint for claim
import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { method, body, query } = req;

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  const nfts = db.collection("nft");

  switch (method) {
    case "PUT":
      // Updated the status to claimed
      {
        const { wallet, nft } = query;
        const updatedNft = {
          status: "claimed", // 'claimed'
          updated_at: new Date(),
        };

        const result = await nfts.updateOne(
          { owner: wallet, id: nft },
          { $set: updatedNft }
        );

        res.status(201).json({ message: "NFT claimed!", nft: updatedNft });
      }

      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
  client.close();
}
