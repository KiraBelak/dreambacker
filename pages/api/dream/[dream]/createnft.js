import { MongoClient } from "mongodb";

// Create a post request that attempts to make a phantom wallet transaction with the currently logged in user
// If the transaction is successful, a registry is added to dream_backers collection
// If the transaction is unsuccessful, do nothing
export default async function handler(req, res) {
  const { method, body, query } = req;

  const { dream, publicKey, quantity } = query;

  // return res.status(200).json({ message: query });

  if (!publicKey) {
    res.status(400).json({ message: "No public key provided", query: query });
    return;
  }

  if (!dream) {
    res.status(400).json({ message: "No dream id provided", query: query });
    return;
  }

  if (!quantity) {
    res.status(400).json({ message: "No quantity provided", query: query });
    return;
  }

  console.log("query received", query);

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  const dreamCollection = db.collection("dreams");
  console.log("obtained dreams collection...");
  switch (method) {
    case "POST":
      console.log("post method");
      try {
        // check if dream exists with the provided dream
        console.log("fetching dream");
        const dreamObj = dreamCollection.findOne({ _id: dream });
        console.log("dream", dreamObj);
        if (!dreamObj) {
          res.status(404).json({ message: "Dream not found" });
          return;
        }
        // Build SHYFT's bodyParams with the information provided

        const benefits = getBenefitPerks(dreamObj, quantity);

        //if benefits is null then return a 200 response with a message saying that the user has not reached any benefits
        console.log("benefits", benefits);
        if (!benefits) {
          res
            .status(200)
            .json({ message: "User has not reached any benefits" });
          return;
        }

        const benefitsString = JSON.stringify({
          benefits: benefits,
          dream: dreamObj,
          quantity: quantity,
          backed_at: new Date().toISOString(),
        });

        var myHeaders = new Headers();
        myHeaders.append("x-api-key", process.env.SHYFT_API_KEY);

        var formdata = new FormData();

        formdata.append("network", process.env.CHAIN_NETWORK ?? "devnet");
        formdata.append("creator_wallet", process.env.DRB_WALLET_ADDRESS);
        formdata.append("name", dreamObj.title);
        formdata.append("symbol", "DRB");
        formdata.append("description", dreamObj.description);
        formdata.append("attributes", benefitsString);
        formdata.append("receiver", publicKey);

        // create a blob from dreamObj.thumbnail which is a URL for an IPFS image
        await fetch(dreamObj.thumbnail)
          .then((res) => res.blob())
          .then((blob) => {
            formdata.append("image", blob);
          });

        // formdata.append("external_url", "https://shyft.to");
        // formdata.append("max_supply", "1");
        // formdata.append("royalty", "5");
        // formdata.append("fee_payer", publicKey);
        // formdata.append("service_charge",{
        //     "receiver": "499qpPLdqgvVeGvvNjsWi27QHpC8GPkPfuL5Cn2DtZJe",
        //     "amount": 0.00001
        // })

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };

        const result = await fetch(
          "https://api.shyft.to/sol/v2/nft/create",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));

        // if the result is successful then add a registry to the nfts collection
        if (!result.success) {
          res.status(500).json({ message: "Error creating NFT" });
        }

        const nftCollection = db.collection("nfts");
        const registry = {
          dream: dream,
          token: result.result.mint,
        };
        await nftCollection.insertOne(registry);
        res.status(200).json({ message: "NFT created successfully" });
      } catch (error) {
        res.status(500).json({ message: "Error creating NFT" });
      }
      break;
  }
  client.close();
}

const getBenefitPerks = (dream, quantity) => {
  const { benefits } = dream;

  // order benefits by price ascending
  benefits.sort((a, b) => a.price - b.price);

  // loop through benefits and compare the quantity against price, if quantity is higher than price then return the price object
  for (let i = 0; i < benefits.length; i++) {
    if (quantity >= benefits[i].price) {
      return benefits[i];
    }
  }

  return null;
};
