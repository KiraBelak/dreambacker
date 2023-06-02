import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { method, body, query } = req;
    
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const users = db.collection("users");
    
    switch (method) {
        case "GET":
            //obtener todos los contratos por mail
            
            
            {
                const {id} = query;
                const profile = await users.find({address:id}).toArray();
                res.status(200).json({ profile: profile });
            }
            
            
            // console.log('contrato', contrato);
            break;
        case "POST":
            //crear una dieta
            // console.log('body', body);
            {
                const date = new Date();
                const {id} = query;
                const newProfile = {
                    address: id,
                    nickname: body.nickname,                
                    created_at: date,
                }
    
                const result = await users.insertOne(newProfile);
                res.status(201).json({message:"Perfil creado", profile: result.ops});
            }
            
            break;
    }
    client.close();
}