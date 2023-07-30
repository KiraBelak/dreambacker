import { toast } from "react-hot-toast";
import axios from "axios";
import { Transaction } from "@solana/web3.js";

import { Buffer } from "buffer";

const shyft_api_key = process.env.NEXT_PUBLIC_SHYFT_API_KEY;
const network = process.env.NEXT_PUBLIC_CHAIN_NETWORK;

// console.log("shyft_api_key", shyft_api_key);
// console.log("network", network);

const loaderToast = (message) => {
  toast.dismiss();
  toast.loading(message);
};

async function getNFT(nft, wallet, connection) {
  const { publicKey } = wallet;

  try {
    // Build SHYFT's bodyParams with the information provided
    loaderToast("Preparing metadata");

    const benefitsString = JSON.stringify({
      benefits: nft.benefits[Object.keys(nft.benefits)[0]],
      dream: nft.dream,
      amount: nft.benefits.price,
      backed_at: nft.date,
    });

    loaderToast("Preparing headers");
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", shyft_api_key);
    myHeaders.append("Content-Type", "multipart/form-data");

    var formdata = new FormData();
    formdata.append("network", network);

    formdata.append("creator_wallet", publicKey);
    formdata.append("name", nft.dream.title);
    formdata.append("symbol", "DrB");
    formdata.append("description", nft.dream.description);
    formdata.append("attributes", benefitsString);

    // create a blob from dream.thumbnail which is a URL for an IPFS image
    loaderToast("Fetching image");
    await fetch(nft.image)
      .then((res) => res.blob())
      .then((blob) => {
        formdata.append("image", blob);
      });

    loaderToast("Minting NFT");
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

    await confirmTransactionFromFrontend(
      connection,
      result.data.result.encoded_transaction,
      wallet
    );

    toast.dismiss();

    // TODO: Update NFT Data on MongoDB to status claimed

    toast.success("Transaction sent, NFT received 👏");

    setTimeout(() => {
      window.location.href = "/user/dashboard";
    }, 2000);
  } catch (error) {
    toast.dismiss();
    // console.log(error);
    // setStatusText(JSON.stringify(error));
    return;
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
  try {
    const signedTx = await wallet.signTransaction(recoveredTransaction);
    const confirmTransaction = await connection.sendRawTransaction(
      signedTx.serialize()
    );
    return confirmTransaction;
  } catch (error) {
    if (error.message === "User denied transaction signature") {
      toast.dismiss();
      toast.error("Transaction denied");
      // Handle the error here. For example, you can log it or show an alert to the user.
      console.log("The user has denied the transaction.");
    } else {
      // Rethrow the error if it is not the one we are checking for
      toast.error("Transaction failed");
      throw error;
    }
  }
}
