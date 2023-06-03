import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    const { method, body, query } = req;
    
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const dreams = db.collection("dreams");
    
    switch (method) {
        case "GET":
            // Retrieve the dream's information with it's id
            {
                // res.status(200).json({ message: "GET" });
                const {user_id} = query;
                const result = await dreams.find({user_id:user_id}).toArray();
                res.status(200).json({ dreams: result });
            }
            break;       
    }
    client.close();
}