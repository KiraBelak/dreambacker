//endpoint for claim
import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { method, body, query } = req;
    
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const nfts = db.collection("nft");

    switch (method) {
        case "GET":
            // Retrieve the nft with their wallet address
            {
                const {wallet} = query;
                const nft = await nfts.findOne({owner:wallet});
                res.status(200).json({ nft: nft });
            }
            break;
        case "POST":
            // Create a new nft
            {
                // console.log(body);
                // console.log(query);
                const date = new Date();
                const {wallet} = query;
                const newNft = { 
                    owner: wallet,
                    name: body.name,
                    description: body.description,
                    image: body.image,
                    created_at: date,
                    updated_at: date,
                }
    
                const result = await nfts.insertOne(newNft);
                res.status(201).json({message:"NFT created", nft: result.ops});
            }
            
            break;
        case "PUT":
            // Update the user's nft
            {
                const {wallet} = query;
                const updatedNft = {
                    name: body.name,
                    description: body.description,
                    image: body.image,
                    updated_at: new Date(),
                }

                const result = await nfts.updateOne({owner:wallet}, {$set: updatedNft});

                res.status(201).json({message:"NFT updated", nft: updatedNft});
            }

            break;
        default:
            res.status(405).json({message:"Method not allowed"});
            break;
        
    }
    client.close();
}
            