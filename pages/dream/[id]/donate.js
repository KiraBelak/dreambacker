import { Input } from "@/components/forms/fields";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";
import { SystemProgram, Transaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { v4 as uuidv4 } from "uuid";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const includedFeatures = [
  "Private forum access",
  "Member resources",
  "Entry to annual conference",
  "Official member t-shirt",
];

const SOLANA_NETWORK = process.env.NEXT_PUBLIC_CHAIN_NETWORK;

export default function Example() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  
  const [dream, setDream] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [explorerLink, setExplorerLink] = useState(null);
  const [statusText, setStatusText] = useState("");
  
  const network = SOLANA_NETWORK
  const [loading, setLoading] = useState(false);

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
    if (id != null && id != undefined) {
      getDream();
    }
  }, [id]);

  useEffect(() => {
    if (amount != null && amount != undefined) {
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
    try {
      // const connection = new Connection(clusterApiUrl(SOLANA_NETWORK), "confirmed");
      const balance = await connection.getBalance(publicKey);
      // console.log("balance", balance)
      const balancenew = balance / LAMPORTS_PER_SOL;
      // console.log("balance new", balancenew)

      setBalance(balancenew);
    } catch (err) {
      // console.error("error al obtener el balance", err);
      toast.error("Error retrieving balance");
    }
  };

  const onClick = async () => {
    setLoading(true);

    if (!publicKey) throw new WalletNotConnectedError();
    if (!receiver) throw new Error("Receiver is null");

    if (amount <= 0) {
      toast.error("You must enter a valid amount");
      return;
    }

    if (balance < amount) {
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
    // console.log("transaction", transaction);

    const {
      context: { slot: minContextSlot },
      value: { blockhash, lastValidBlockHeight },
    } = await connection.getLatestBlockhashAndContext();

    try {
      toast.loading("Sending transaction");
      // console.log("transaction", transaction );
      // console.log("connection", connection );
      const signature = await sendTransaction(transaction, connection, {
        minContextSlot,
      });
      // console.log("signature", signature);

      await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature,
      });

      // console.log("signature", signature);

      const confirmation = await connection.confirmTransaction(signature, {
        commitment: "confirmed",
      });

      // console.log("confirmation", confirmation);

      if (confirmation.err) {
        // console.log("confirmation", confirmation);
        toast.dismiss();
        toast.error("Transaction cancelled.");
        return;
      }

      const { slot } = confirmation.value;
      // console.info(`Transaction ${signature} confirmed in block ${slot}`);
      const solanaExplorerLink = `https://explorer.solana.com/tx/${signature}?cluster=${SOLANA_NETWORK}`;
      // console.log("solanaExplorerLink", solanaExplorerLink);
      // await getNFT();

      setExplorerLink(solanaExplorerLink);

      const res = await registerNFT();

      setTimeout(() => {
        toast.dismiss();
        toast.success("Transaction confirmed.");
        if (res.nft_id) {
          toast.success("your nft is waiting for you");
          router.push(`/user/claim/${res.nft_id}`);
        }
      }, 1000);

      return;
    } catch (err) {
      // console.error("Error: ", err.message);
      if (err.message == "User rejected the request.") {
        toast.error("Transaction cancelled.");
      }
    }
  };

  const registerNFT = async () => {
    try {
      const benefits = getBenefitPerks(dream, amount);

      //if benefits is null then return a 200 response with a message saying that the user has not reached any benefits
      setStatusText("Benefits obtained " + JSON.stringify(benefits));
      if (!benefits) {
        setStatusText("User has not reached any benefits");
        toast.error("User has not reached any benefits");
        return;
      }

      //if benefits is null then return a 200 response with a message saying that the user has not reached any benefits
      setStatusText("Benefits obtained " + JSON.stringify(benefits));
      if (!benefits) {
        setStatusText("Sorry but you are not eligible for any benefits or NFT");
        toast.error("Sorry but you are not eligible for any benefits or NFT");
        return;
      }

      // toast.success("beneficios obtenidos");
      const benefitsString = JSON.stringify({
        benefits: benefits,
        dream: dream,
        amount: amount,
        backed_at: new Date().toISOString(),
      });
      // toast.success("benefits obtain " + benefitsString);
      //logic to create the NFT claim
      // "id": 1,
      // "name": "NFT 1",
      // "description": "NFT 1",
      // "project": "Project 1",
      // "image": "https://dummyimage.com/420x260",
      // "price": 100,
      // "owner": "0x123456789",
      // "status": "Pending",
      // "benefits": ["Benefit 1", "Benefit 2"]
      //create id with uuidv4

      const bodyParams = {
        id: uuidv4(),
        name: dream.title,
        description: dream.description,
        project: dream.title,
        image: dream.thumbnail,
        price: amount,
        owner: publicKey,
        status: "Pending",
        benefits: benefits,
        dream: dream,
      };

      // console.log("bodyParams", bodyParams);
      const nft = await axios.post("/api/claim", bodyParams);
      // console.log("nft", nft)
      if ((nft.status = 201)) {
        return nft.data;
      }
    } catch (error) {
      // console.log(error);
      toast.error("Error creating NFT");
    }
  };
  // console.log("the dream", dream)

  const getBenefitPerks = (dream, amount) => {
    const { benefits } = dream;

    // order benefits by price ascending
    benefits.sort((a, b) => a.price - b.price);

    // loop through benefits and compare the amount against price, if amount is higher than price then return the price object
    for (let i = 0; i < benefits.length; i++) {
      if (amount >= benefits[i].price) {
        return benefits[i];
      }
    }

    return null;
  };

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
                👏 Voluntary Donation ✌️
              </h3>
              <p className="mt-6 text-base leading-7 text-gray-600">
                You are free to donate the amount you wish; your donation will
                be allocated to the project you have chosen. Your donation does
                not imply the acquisition of shares or participation in the
                projects, but it grants you access to exclusive benefits.
              </p>
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                  Benefits
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
                    Support {dream.title}
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
                    disabled={(amount <= 0, loading)}
                    type="submit"
                    className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                    disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={onClick}
                  >
                    {loading ? "Loading..." : " DONATE"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-10">
            <p className=" mt-2 text-lg leading-8 text-gray-600">
              When you make a donation with Solana, you are making a voluntary
              contribution to support projects and causes that interest you.
              Your donation does not imply the acquisition of shares or
              participation in the funded projects.
            </p>
            <p className=" mt-2 text-lg leading-8 text-gray-600">
              We use Solana {`&#39`} s blockchain technology to ensure the
              security and transparency of your donations. Transactions with
              Solana are fast and secure, providing you with peace of mind when
              making your contribution.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
