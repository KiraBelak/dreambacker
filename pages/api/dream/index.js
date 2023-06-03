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
        case "POST":
            // Create a new dream project
            {
                const date = new Date();
                const {dream} = query;
                const newDream = { 
                    user_id: body.user_id, //id del objeto del usuario
                    title: body.nickname, // nombre del proyecto
                    description: body.description, //descripcion del proyecto
                    main_goal: body.main_goal, //meta de soles del proyecto
                    benefits: body.benefits, // beneficios del proyecto
                    deadline: body.deadline, // fecha limite del proyecto                    
                    created_at: date, // fecha de creacion del proyecto
                    updated_at: date, // fecha de actualizacion del proyecto
                }
    
                const result = await dreams.insertOne(newDream);
                res.status(201).json({message:"Dream created", profile: result.ops});
            }            
            break;
    }
    client.close();
}