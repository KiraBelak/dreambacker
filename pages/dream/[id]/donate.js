import { Input } from "@/components/forms/fields";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";
import { SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';

import { useConnection, useWallet } from "@solana/wallet-adapter-react";


const includedFeatures = [
  "Private forum access",
  "Member resources",
  "Entry to annual conference",
  "Official member t-shirt",
];

const SOLANA_NETWORK = "devnet";

export default function Example() {

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [dream, setDream] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [explorerLink, setExplorerLink] = useState(null);
  const [statusText, setStatusText] = useState("");
  const shyft_api_key = "q4OzU_8-cc89oq-R";
  const network = process.env.CHAIN_NETWORK ?? "devnet";

  const router = useRouter();
  const { id } = router.query;

  const getDream = async () => {
    try {
      const response = await axios.get(`/api/dream/${id}`);
      // console.log("response", response);
      setReceiver(response.data.dream.wallet);
      setDream(response.data.dream);      

    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if(id != null && id != undefined){
      getDream();
    }
  }, [id]);

  useEffect(() => {
    if(amount != null && amount != undefined){
      // console.log("amount", amount);
    }
  }, [amount]);


  useEffect(() => {
    if (publicKey != null && publicKey != undefined) {

      getBalance(publicKey);
    }
  }, [publicKey]);


  useEffect(() => {
    if (id != null && id != undefined) getDream();
  }, [id]);

  const getBalance = async () => {
    try{
      // const connection = new Connection(clusterApiUrl(SOLANA_NETWORK), "confirmed");
      const balance = await connection.getBalance(publicKey);
      // console.log("balance", balance)
      const balancenew = balance / LAMPORTS_PER_SOL;
      // console.log("balance new", balancenew)

      setBalance(balancenew);
    } catch (err){
      // console.error("error al obtener el balance", err);
      toast.error("error al obtener el balance");
    }


  }


  
  
  const onClick = async () => {
    if (!publicKey) throw new WalletNotConnectedError();
    if(!receiver) throw new Error("receiver is null");
    
    if(amount <= 0){
      toast.error("You must enter a valid amount");
      return;
    }
    
    if(balance < amount ){
      // console.log("balance",balance);
      // console.log("amount",amount);
      toast.error("You do not have enough SOL for this transaction");
      return;
    }
    
    // console.log("amount", amount);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: receiver,
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight }
    } = await connection.getLatestBlockhashAndContext();

    try{
      // console.log("transaction", transaction );
      // console.log("connection", connection );      
      const signature = await sendTransaction(transaction, connection, { minContextSlot });
      
      await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });

      const confirmation = await connection.confirmTransaction(signature,{
        commitment: "confirmed",
      });

      if(confirmation.err){
        // console.log("confirmation", confirmation);
        toast.error("Transaction cancelled.");
        return;
      }
      
      const {slot} = confirmation.value;
      console.info(`Transaction ${signature} confirmed in block ${slot}`);
      const solanaExplorerLink= `https://explorer.solana.com/tx/${signature}?cluster=${SOLANA_NETWORK}`;

      
      await getNFT();

      toast.success("Transaction confirmed 👏");
      setExplorerLink(solanaExplorerLink);
      return;
    }catch(err){
      // console.error("Error: ", err.message);
      if(err.message == "User rejected the request."){
        toast.error("Transaction cancelled.");
      }
      
    }
  };

  const getNFT = async () => {
    try {
      setStatusText("dream obtained");
      // Build SHYFT's bodyParams with the information provided

      toast.loading("generating NFT");

      const benefits = getBenefitPerks(dream, amount);

      //if benefits is null then return a 200 response with a message saying that the user has not reached any benefits
      setStatusText("benefits obtained " + JSON.stringify(benefits));
      if (!benefits) {
        setStatusText("user has not reached any benefits");
        return;
      }

        //if benefits is null then return a 200 response with a message saying that the user has not reached any benefits
        setStatusText("beneficios obtenidos "+JSON.stringify(benefits));
        if(!benefits) {
            setStatusText("Sorry but you are not eligible for any benefits or NFT")
            return;
        }
        
        // toast.success("beneficios obtenidos");
        const benefitsString = JSON.stringify({
            benefits: benefits,
            dream: dream,
            amount: amount,
            backed_at: new Date().toISOString()
        });

        var myHeaders = new Headers();
        myHeaders.append("x-api-key", shyft_api_key);
        myHeaders.append("Content-Type", "multipart/form-data");
        
        var formdata = new FormData();
        formdata.append("network", network);
        formdata.append("wallet", "7APHQNvmRUXGto4PGZWmdW72wZ1DD17MaBmhhz9vt7Sp");
        formdata.append("name", dream.title);
        formdata.append("symbol", "DrB");
        formdata.append("description", dream.description);
        formdata.append("attributes", benefitsString);
        formdata.append("external_url", "https://shyft.to");
        formdata.append("receiver", publicKey);
        // formdata.append("max_supply", "0");
        // formdata.append("royalty", "5");
        // formdata.append("file", fileInput.files[0], "index.png");
        // formdata.append('service_charge', '{ "receiver": "499qpPLdqgvVeGvvNjsWi27QHpC8GPkPfuL5Cn2DtZJe",  "token": "DjMA5cCK95X333t7SgkpsG5vC9wMk7u9JV4w8qipvFE8",  "amount": 0.01}');
        
        // create a blob from dream.thumbnail which is a URL for an IPFS image
        toast.success("generando NFT");
        await fetch(dream.thumbnail)
        .then(res => res.blob())
        .then(blob => {
            formdata.append("file", blob);
        })
        toast.success("NFT generado");
        // setStatusText("Generando NFT")
        const result = await axios.post("https://api.shyft.to/sol/v1/nft/create_detach", formdata, {
            headers: {
                "x-api-key": shyft_api_key,
                "Content-Type": "multipart/form-data"
                }
            })
          toast.dismiss();
        // console.log("result",result)
        setStatusText("Minteo Exitoso, firmando NFT")
        toast.success("Minteo Exitoso, firmando NFT");
        signNFT(result.data.result.encoded_transaction);
        // console.log('data', response.data); // displaying the response
    } catch (error) {
        // console.log(error);
        setStatusText(JSON.stringify(error));
    }         
}

  const signNFT = async (nft) => {
    try {
      const result = await axios.post("/api/signnft",{                
            network:network,
            nft:nft
      });
        // console.log(result);
        toast.success("Transaccion enviada y NFT recibido 👏");
        let collected = dream.collected + amount;
        await  axios.put(`/api/dream/${id}`,
        { 
          collected: collected,
        });
      //esperamos 3 segundos y router push a la pagina de nft
        setTimeout(() => {
            router.push("/user/dashboard");
        }, 3000);


        setStatusText(`NFT Firmado exitosamente https://solscan.io/tx/${result.data.result}?cluster=devnet`)

    }catch(error) {
          toast.error("Hubo algun error.")
        // console.log(error);
    }
  }        

  const getBenefitPerks = (dream, amount) => {
    const {benefits} = dream;

    // order benefits by price ascending
    benefits.sort((a, b) => a.price - b.price);

    // loop through benefits and compare the amount against price, if amount is higher than price then return the price object
    for(let i = 0; i < benefits.length; i++) {
        if(amount >= benefits[i].price) {
            return benefits[i];
        }
    }    
    
    return null;
  }

  if (dream === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="bg-white py-24 sm:py-32">
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {dream.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {dream.description}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                👏 Donacion Voluntaria ✌️
              </h3>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Eres libre de donar la cantidad que desees, tu donación será
                destinada al proyecto que has elegido. Tu donación no implica la
                adquisición de acciones ni participación en los proyectos
                pero te da acceso a beneficios exclusivos.
                
              </p>
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                  Beneficios
                </h4>
                <div className="h-px flex-auto bg-gray-100" />
              </div>
              <ul
                role="list"
                className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
              >
                {includedFeatures.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className="h-6 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs px-8">
                  <p className="text-base font-semibold text-gray-600">
                    Apoya a {dream.title}
                  </p>
                  <div className="mt-6 flex items-baseline justify-center gap-x-2">
                    <Input
                      className="text-2xl font-bold text-right pr-2 text-gray-900 w-2/3 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md"                      
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />

                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                      SOL
                    </span>
                  </div>
                  
                  <button
                    disabled={amount <= 0}
                    className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                    disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={onClick}
                  >
                    DONATE
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="p-10">
            <p className=" mt-2 text-lg leading-8 text-gray-600">
              Al realizar una donación con Solana, estás realizando una
              contribución voluntaria para apoyar proyectos y causas que te
              interesan. Tu donación no implica la adquisición de acciones ni
              participación en los proyectos financiados.
            </p>
            <p className=" mt-2 text-lg leading-8 text-gray-600">
              Utilizamos la tecnología blockchain de Solana para garantizar la
              seguridad y transparencia de tus donaciones. Las transacciones con
              Solana son rápidas y seguras, lo que te brinda tranquilidad al
              realizar tu contribución.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}