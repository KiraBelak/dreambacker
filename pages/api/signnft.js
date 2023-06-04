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
import base58 from "bs58";

const secretKey = "5Bhtz8KYJd2vXbSz1q5SxpZzMa6pjduADoTT5Z2gMjXUL7GzFnRctnSobXRjQ4DHQPhM8WsDj8WQddr9Gp8VTShv"

export default async function handler(req, res) {
    const {nft, network} = req.body;
    try {
        const result = await confirmTransactionFromBackend(network,nft);
        return res.status(200).json({result});
    }catch(error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

export async function confirmTransactionFromBackend(network, encodedTransaction) {
    console.log("secret_key", secretKey)
    console.log("network", network);
    console.log("encoded tx", encodedTransaction)
    const connection = new Connection(clusterApiUrl(network), "confirmed");
    console.log("connection",connection)
    const privateKey = Uint8Array.from(base58.decode(secretKey));
    console.log("priv key",privateKey)
    const feePayer = Keypair.fromSecretKey(privateKey);
    console.log("feePayer",feePayer);
    const wallet = new NodeWallet(feePayer);
    const recoveredTransaction = Transaction.from(Buffer.from(encodedTransaction, "base64"));
    const signedTx = await wallet.signTransaction(recoveredTransaction);
    const confirmTransaction = await connection.sendRawTransaction(signedTx.serialize());
    console.log(confirmTransaction)
    return confirmTransaction;
}
