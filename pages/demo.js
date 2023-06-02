import { useContext } from "react";
import { WalletContext } from "../src/wallet";

export default function Home() {
  const { publicKey, setPublicKey } = useContext(WalletContext);
  // console.log("desde home", publicKey);

  var myHeaders = new Headers();
  myHeaders.append("x-api-key", "q4OzU_8-cc89oq-R");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://api.shyft.to/sol/v1/wallet/get_portfolio?network=devnet&wallet=${publicKey}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log("api", result))
    .catch((error) => console.log("error", error));

  return (
    <div>
      <h1>hola</h1>
    </div>
  );
}
