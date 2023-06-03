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
                const {user_id} = query;
                if(user_id == undefined){
                    const result = await dreams.find().toArray();
                    res.status(200).json({ dreams: result });
                }else{
                    const result = await dreams.find({user_id:user_id}).toArray();
                    res.status(200).json({ dreams: result });
                }
            }
            break;       
    }
    client.close();
}