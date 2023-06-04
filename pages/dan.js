import { WalletContext } from "@/src/wallet";
import { useContext, useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import axios from "axios";

export default function Dan() {
    const {publicKey} = useContext(WalletContext);
    const [dream, setDream] = useState(null);
    const [statusText, setStatusText] = useState("");
    const quantity = 0.001;

    const shyft_api_key = "q4OzU_8-cc89oq-R"
    const network = process.env.CHAIN_NETWORK ?? "devnet"
    const drbwallet = process.env.DRB_WALLET_ADDRESS ?? "7APHQNvmRUXGto4PGZWmdW72wZ1DD17MaBmhhz9vt7Sp"

    const getDream = async () => {
        try{
            const res = await fetch(`/api/dream?wallet=${publicKey}`);
            const data = await res.json();
            const dream = data.dreams[0];
            console.log("dream",dream);
            setDream(dream);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        
        if(!publicKey) return;
        console.log("publicKey",publicKey);
        getDream();
    }, [publicKey]);

    // useEffect(() => {
    //     if(!dream) return;
    //     createNFT();            
    // }, [dream])


    const createCandyMachine = async () => {
        var myHeaders = new Headers();
        myHeaders.append("x-api-key", shyft_api_key);

        var raw = JSON.stringify({
            "network": "devnet",
            "wallet": dream.wallet,
            "symbol": "DRB",
            "max_supply": 0,
            "royalty": 300,
            "collection": "7KnYuwbcG3EDLBnpYTovGN1WjpB1WvvyNuMgjRezG33s",
            "items_available": 25,
            "amount": 0.4
        });
        try {

        }catch(error) {
            console.log(error);
        }
    }

    const getNFT = async () => {
        try {
            setStatusText("dream obtained")
            // Build SHYFT's bodyParams with the information provided

            const benefits = getBenefitPerks(dream, quantity);

            //if benefits is null then return a 200 response with a message saying that the user has not reached any benefits
            setStatusText("beneficios obtenidos "+JSON.stringify(benefits));
            if(!benefits) {
                setStatusText("user has not reached any benefits")
                return;
            }
            
            const benefitsString = JSON.stringify({
                benefits: benefits,
                dream: dream,
                quantity: quantity,
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
            formdata.append("receiver", "B3ooUEwR86WmshDUXnX3iS5DYiAjyjNvmt1opkgP3kPW");
            // formdata.append("max_supply", "0");
            // formdata.append("royalty", "5");
            // formdata.append("file", fileInput.files[0], "index.png");
            // formdata.append('service_charge', '{ "receiver": "499qpPLdqgvVeGvvNjsWi27QHpC8GPkPfuL5Cn2DtZJe",  "token": "DjMA5cCK95X333t7SgkpsG5vC9wMk7u9JV4w8qipvFE8",  "amount": 0.01}');
            
            // create a blob from dream.thumbnail which is a URL for an IPFS image
            await fetch(dream.thumbnail)
            .then(res => res.blob())
            .then(blob => {
                formdata.append("file", blob);
            })
            
            setStatusText("Generando NFT")
            const result = await axios.post("https://api.shyft.to/sol/v1/nft/create_detach", formdata, {
                headers: {
                    "x-api-key": shyft_api_key,
                    "Content-Type": "multipart/form-data"
                    }
                })

            console.log("result",result)
            setStatusText("Minteo Exitoso, firmando NFT")
            signNFT(result.data.result.encoded_transaction);
            // console.log('data', response.data); // displaying the response
            
        } catch (error) {
            console.log(error);
            setStatusText(JSON.stringify(error));
        }         
    }

    const signNFT = async (nft) => {
        try {
           const result = await axios.post("/api/signnft",{                
                network:network,
                nft:nft
           });
            console.log(result);
            setStatusText(`NFT Firmado exitosamente https://solscan.io/tx/${result.data.result}?cluster=devnet`)

        }catch(error) {
            console.log(error);
        }
    }        
    
    const getBenefitPerks = (dream, quantity) => {
        const {benefits} = dream;
    
        // order benefits by price ascending
        benefits.sort((a, b) => a.price - b.price);
    
        // loop through benefits and compare the quantity against price, if quantity is higher than price then return the price object
        for(let i = 0; i < benefits.length; i++) {
            if(quantity >= benefits[i].price) {
                return benefits[i];
            }
        }    
        
        return null;
    }

    return (
        <>
            <NavBar />
            <div className="flex w-full justify-center items-center md:py-20">
                <div className="grid grid-cols-1 w-full md:w-1/2 bg-gray-500 rounded-2xl p-8">
                    <h1 className="text-xl text-white font-bold">Welcome to my world, beep bop</h1>
                    <p className="text-white mt-4">This is a test page to see if I can connect to a MongoDB database.</p>
                    <span>
                        {publicKey}
                    </span>
                    {
                        dream &&
                        <>
                            <button
                                className="btn btn-primary mt-4 bg-blue-500"
                                onClick={getNFT}
                            >
                                Obtener NFT
                            </button>
                            <p>
                                {statusText}
                            </p>
                        </>
                    }
                </div>
                
            </div>
        </>
  );
}
