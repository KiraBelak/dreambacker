import {
    clusterApiUrl,
    Connection,
    Keypair,
    Transaction,
  } from "@solana/web3.js";
  import { NodeWallet } from "@metaplex/js";
  import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
  import { decode } from "bs58";
  import { Buffer } from "buffer";

const privateKey = "5Bhtz8KYJd2vXbSz1q5SxpZzMa6pjduADoTT5Z2gMjXUL7GzFnRctnSobXRjQ4DHQPhM8WsDj8WQddr9Gp8VTShv"

export default async function handler(req, res) {
    const {nft, network} = req.query;
    try {
        const result = await confirmTransactionFromBackend(network,nft,privateKey);
        return res.status(200).json({result});
    }catch(error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

export async function confirmTransactionFromBackend(network, encodedTransaction, privateKey) {
    const connection = new Connection(clusterApiUrl(network), "confirmed");
    const feePayer = Keypair.fromSecretKey(decode(privateKey));
    const wallet = new NodeWallet(feePayer);
    const recoveredTransaction = Transaction.from(Buffer.from(encodedTransaction, "base64"));
    const signedTx = await wallet.signTransaction(recoveredTransaction);
    const confirmTransaction = await connection.sendRawTransaction(signedTx.serialize());
    return confirmTransaction;
}
