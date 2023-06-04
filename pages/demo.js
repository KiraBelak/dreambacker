import { useContext, useEffect } from "react";
import { WalletContext } from "../src/wallet";
import NavBar from "../components/NavBar";

export default function Home() {
  const { publicKey, setPublicKey } = useContext(WalletContext);
  // console.log("desde home", publicKey);

  const getPortfolio = async (publicKey) => {
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
  };

  useEffect(() => {
    if (publicKey) {
      getPortfolio(publicKey);
    }
  }, [publicKey]);

  return (
    <div>
      <NavBar />
      <h1>hola</h1>
    </div>
  );
}
