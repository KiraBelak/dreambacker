import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { method, query } = req;

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  const dreams = db.collection("dreams");

  switch (method) {
    case "PUT":
      // Update the user's dream project information
      {
        const { dream, amount } = query;
        const dreamResult = await dreams.findOne({ _id: new ObjectId(dream) });
        if (!dreamResult) {
          res.status(404).json({ message: "Dream not found" });
          break;
        }
        const { collected } = dreamResult;

        const updatedDream = {
          collected: parseFloat(collected) + parseFloat(amount),
        };
        const result = await dreams.updateOne(
          { _id: new ObjectId(dream) },
          { $set: updatedDream }
        );
        console.log("updated Dream => ", result);
        res.status(201).json({ message: "Dream updated", dream: updatedDream });
      }
      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }

  client.close();
}
