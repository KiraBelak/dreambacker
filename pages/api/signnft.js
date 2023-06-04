export default async function handler(req, res) {
    const {publicKey, nft} = req.query;
    console.log("publicKey",publicKey);
    console.log("dream",nft);
    try {
        const web3 = require('@solana/web3.js');
        const connection = new Connection(
            clusterApiUrl(process.env.CHAIN_NETWORK),
            "confirmed",
            );
    
        const secret = process.env.PAYER_PRIVATE_KEY;
        const from = web3.Keypair.fromSecretKey(new Uint8Array(secret))
    
        const to = web3.Keypair.fromPublicKey(new Uint8Array(publicKey))
    
        const signature = await web3.sendAndConfirmTransaction(
            connection,
            tx,
            [from],
        );
    
        return res.status(200).json({signature});
    }catch(error) {
        console.log(error);
        return res.status(500).json({error});
    }
}