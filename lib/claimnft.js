import { toast } from "react-hot-toast";
import axios from "axios";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  Transaction,
} from "@solana/web3.js";
import { NodeWallet } from "@metaplex/js";
import { decode } from "bs58";
import { Buffer } from "buffer";

const shyft_api_key = process.env.NEXT_PUBLIC_SHYFT_API_KEY;
const network = process.env.NEXT_PUBLIC_CHAIN_NETWORK;

console.log("shyft_api_key", shyft_api_key);
console.log("network", network);

const loaderToast = (message) => {
  toast.dismiss();
  toast.loading(message);
};

async function getNFT(nft, setStatusText, wallet, connection) {
  const { publicKey } = wallet;
  // console.log("connection", connection);
  try {
    // Build SHYFT's bodyParams with the information provided
    // console.log("shyft_api_key", shyft_api_key);
    loaderToast("Preparing metadata");

    // toast.success("beneficios obtenidos");
    const benefitsString = JSON.stringify({
      benefits: nft.benefits[Object.keys(nft.benefits)[0]],
      dream: nft.dream,
      amount: nft.benefits.price,
      backed_at: nft.date,
    });

    // console.log("benefitsString", benefitsString);
    loaderToast("Preparing headers");
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", shyft_api_key);
    myHeaders.append("Content-Type", "multipart/form-data");

    var formdata = new FormData();
    formdata.append("network", network);

    formdata.append(
      "creator_wallet",
      // "7APHQNvmRUXGto4PGZWmdW72wZ1DD17MaBmhhz9vt7Sp"
      publicKey
    );
    formdata.append("name", nft.dream.title);
    formdata.append("symbol", "DrB");
    formdata.append("description", nft.dream.description);
    formdata.append("attributes", benefitsString);
    // formdata.append("external_url", "https://shyft.to");
    // formdata.append("receiver", publicKey);
    // formdata.append("max_supply", "0");
    // formdata.append("royalty", "5");
    // formdata.append("file", fileInput.files[0], "index.png");
    // formdata.append("service_charge", {
    //   receiver: publicKey,
    //   amount: 0.01,
    // });
    // create a blob from dream.thumbnail which is a URL for an IPFS image
    loaderToast("Fetching image");
    await fetch(nft.image)
      .then((res) => res.blob())
      .then((blob) => {
        formdata.append("image", blob);
      });

    loaderToast("Minting NFT");
    // setStatusText("Generando NFT")
    const result = await axios.post(
      "https://api.shyft.to/sol/v2/nft/create",
      formdata,
      {
        headers: {
          "x-api-key": shyft_api_key,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // console.log("Minting Result =>", result);
    loaderToast("Signing NFT");
    const signResult = await confirmTransactionFromFrontend(
      connection,
      result.data.result.encoded_transaction,
      wallet
    );

    toast.dismiss();
    toast.success("Transaction sent, NFT received 👏");
  } catch (error) {
    // console.log(error);
    setStatusText(JSON.stringify(error));
  }
}

export { getNFT };

async function confirmTransactionFromFrontend(
  connection,
  encodedTransaction,
  wallet
) {
  // console.log(encodedTransaction);
  const recoveredTransaction = Transaction.from(
    Buffer.from(encodedTransaction, "base64")
  );
  const signedTx = await wallet.signTransaction(recoveredTransaction);
  const confirmTransaction = await connection.sendRawTransaction(
    signedTx.serialize()
  );
  return confirmTransaction;
}

const signNFT = async (nft, wallet, connection) => {
  const { sendTransaction } = wallet;
  // console.log("nft", nft);
  // console.log("wallet", wallet);
  // console.log("connection", connection);

  const {
    context: { slot: minContextSlot },
    value: { blockhash, lastValidBlockHeight },
  } = await connection.getLatestBlockhashAndContext();

  // console.log("minContextSlot", minContextSlot);

  try {
    toast.loading("sending transaction");

    // console.log("1nft", nft);
    // console.log("2connection", connection);
    // console.log("3minContextSlot", minContextSlot);

    const signature = await sendTransaction(nft, connection, {
      minContextSlot,
    });

    // console.log("signature", signature);

    await connection.confirmTransaction(
      blockhash,
      lastValidBlockHeight,
      signature
    );

    const confirmation = await connection.confirmTransaction(signature, {
      commitment: "confirmed",
    });

    // console.log("confirmation", confirmation);

    if (confirmation.value.err) {
      toast.dismiss();
      toast.error("Transaction failed");
      return;
    }

    const { slot } = confirmation.value;

    const solanaExplorerLink = `https://explorer.solana.com/tx/${signature}?cluster=${network}`;

    // const result = await axios.post("/api/signnft", {
    //   network: network,
    //   nft: nft,
    // });
    // // console.log(result);
    // toast.success("Transaction sent, NFT received 👏");
    // let collected = dream.collected + amount;
    // await axios.put(`/api/dream/${id}`, {
    //   collected: collected,
    // });
    // //esperamos 3 segundos y router push a la pagina de nft
    // setTimeout(() => {
    //   router.push("/user/dashboard");
    // }, 3000);

    // setStatusText(
    //   `NFT signed succesfully https://solscan.io/tx/${result.data.result}?cluster=devnet`
    // );
  } catch (error) {
    toast.error("An eror occurred.");
    // console.log(error);
  }
};
