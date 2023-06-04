
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
  
  //import { ShyftWallet } from '../types';
  
export async function confirmTransactionFromBackend(network, encodedTransaction, privateKey) {
    const connection = new Connection(clusterApiUrl(network), "confirmed");
    const feePayer = Keypair.fromSecretKey(decode(privateKey));
    const wallet = new NodeWallet(feePayer);
    const recoveredTransaction = Transaction.from(Buffer.from(encodedTransaction, "base64"));
    const signedTx = await wallet.signTransaction(recoveredTransaction);
    const confirmTransaction = await connection.sendRawTransaction(signedTx.serialize());
    return confirmTransaction;
}

export async function confirmTransactionFromFrontend(connection, encodedTransaction, wallet) {
    console.log(encodedTransaction);
    const recoveredTransaction = Transaction.from(Buffer.from(encodedTransaction, "base64"));
    const signedTx = await wallet.signTransaction(recoveredTransaction);
    const confirmTransaction = await connection.sendRawTransaction(signedTx.serialize());
    return confirmTransaction;
}


//   export async function confirmTransactionFromBackend(
//     network: string | undefined,
//     encodedTransaction:
//       | WithImplicitCoercion<string>
//       | {
//           [Symbol.toPrimitive](
//             hint: /* eslint-disable @typescript-eslint/no-unsafe-assignment */
//             /* eslint-disable @typescript-eslint/no-unsafe-member-access */
//             /* eslint-disable @typescript-eslint/no-unsafe-call */
//             "string"
//           ): string;
//         },
//     privateKey: string
//   ) {
//     const connection = new Connection(clusterApiUrl(network), "confirmed");
//     const feePayer = Keypair.fromSecretKey(decode(privateKey));
//     const wallet = new NodeWallet(feePayer);
//     const recoveredTransaction = Transaction.from(
//       Buffer.from(encodedTransaction, "base64")
//     );
//     const signedTx = await wallet.signTransaction(recoveredTransaction);
//     const confirmTransaction = await connection.sendRawTransaction(
//       signedTx.serialize()
//     );
//     return confirmTransaction;
//   }
  
//   export async function confirmTransactionFromFrontend(
//     connection: { sendRawTransaction: (arg0: any) => any },
//     encodedTransaction:
//       | WithImplicitCoercion<string>
//       | { [Symbol.toPrimitive](hint: "string"): string },
//     wallet: { signTransaction: (arg0: Transaction) => any }
//   ) {
//     console.log(encodedTransaction);
//     const recoveredTransaction = Transaction.from(
//       Buffer.from(encodedTransaction, "base64")
//     );
//     const signedTx = await wallet.signTransaction(recoveredTransaction);
//     const confirmTransaction = await connection.sendRawTransaction(
//       signedTx.serialize()
//     );
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//     return confirmTransaction;
//   }