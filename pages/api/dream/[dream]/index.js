import { MongoClient, ObjectId } from "mongodb";

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
                
                const result = await dreams.findOne({_id:new ObjectId(dream)})
                console.log(result)
                res.status(200).json({ dream: result });
            }
            break;        
        case "PUT":
            // Update the users dream project information
            {
                const date = new Date();
                const {dream} = query;
                console.log("the dream",dream)
                const resulta = await dreams.findOne({_id:new ObjectId(dream)})
                const {collected} =body;
                if (collected) {
                    const updatedDream = {
                        title: body.title || resulta.title,
                    description: body.description || resulta.description,
                    main_goal: body.main_goal || resulta.main_goal,                    
                    benefits: body.benefits || resulta.benefits,
                    deadline: body.deadline || resulta.deadline,
                    updated_at: date,
                    collected: collected,
                }
                const result = await dreams.updateOne({_id:new ObjectId(dream)}, {$set: updatedDream});
                console.log("result",result)
                res.status(201).json({message:"lDream updated", dream: result});
            }
            



                const updatedDream = {
                    title: body.title || resulta.title,
                    description: body.description || resulta.description,
                    main_goal: body.main_goal || resulta.main_goal,                    
                    benefits: body.benefits || resulta.benefits,
                    deadline: body.deadline || resulta.deadline,
                    updated_at: date,
                }

                const result = await dreams.updateOne({_id:new ObjectId(dream)}, {$set: updatedDream});
                console.log("result",result)

                res.status(201).json({message:"lDream updated", dream: result});
            }

            break;
    }
    client.close();
}