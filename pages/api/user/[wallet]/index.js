import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { method, body, query } = req;
    
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const users = db.collection("users");
    
    switch (method) {
        case "GET":
            // Retrieve the user's profile with their wallet address
            {
                const {wallet} = query;                
                const profile = await users.findOne({wallet:wallet});
                res.status(200).json({ profile: profile });
            }
            break;
        case "POST":
            // Create a new profile
            {
                // console.log(body);
                // console.log(query);
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
        case "PUT":
            // Update the user's profile
            {
                const {wallet} = query;
                const updatedProfile = {
                    nickname: body.nickname,
                    updated_at: new Date(),
                }

                const result = await users.updateOne({wallet:wallet}, {$set: updatedProfile});

                res.status(201).json({message:"Profile updated", profile: updatedProfile});
            }

            break;
    }
    client.close();
}