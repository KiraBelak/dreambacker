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
                const {dream} = query;
                const result = await dreams.find({id:dream}).toArray();
                res.status(200).json({ dream: result });
            }
            break;        
        case "PUT":
            // Update the users dream project information
            {
                const date = new Date();
                const {dream} = query;
                const updatedDream = {
                    title: body.nickname,
                    description: body.description,
                    main_goal: body.main_goal,
                    benefits: body.benefits,
                    deadline: body.deadline,
                    nft_prompt: body.nft_prompt, 
                    created_at: date,
                    updated_at: date,
                }

                const result = await dreams.updateOne({id:dream}, {$set: updatedDream});

                res.status(201).json({message:"Dream updated", dream: result});
            }

            break;
    }
    client.close();
}