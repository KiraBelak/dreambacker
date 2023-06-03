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
        case "POST":
            // Create a new dream project
            {
                const date = new Date();
                const {dream} = query;
                const newDream = { 
                    id: dream,
                    user_id: body.user_id,
                    title: body.nickname,
                    description: body.description,
                    main_goal: body.main_goal,
                    goals: body.goals,
                    deadline: body.deadline,
                    created_at: date,
                    updated_at: date,
                }
    
                const result = await dreams.insertOne(newDream);
                res.status(201).json({message:"Dream created", profile: result.ops});
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
                    goals: body.goals,
                    deadline: body.deadline,
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