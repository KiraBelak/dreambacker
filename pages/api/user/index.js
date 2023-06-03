import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    const { method, body, query } = req;
    
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const users = db.collection("users");
    
    switch (method) {
        case "POST":
            // Create a new profile
            {
                const date = new Date();
                const {wallet} = query;
                const newProfile = { 
                    wallet: wallet,
                    nickname: body.nickname,                
                    created_at: date,
                    updated_at: date,
                }
    
                const result = await users.insertOne(newProfile);
                res.status(201).json({message:"Profile created", profile: result.ops});
            }            
            break;        
    }
    client.close();
}