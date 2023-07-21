import React, { useState, useContext } from "react";
import axios from "axios";
import { ConnectWallet } from "@/components/ConnectWallet";
import { WalletContext } from "@/src/wallet";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useWallet } from "@solana/wallet-adapter-react";
const ProfileForm = () => {
  const { publicKey } = useWallet();
  const [nickname, setNickname] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el nickname al backend o realizar cualquier otra acción necesaria.
    console.log(`Nickname: ${nickname}`);
    console.log(`Public Key: ${publicKey}`);
    //axios para crear el perfil

    const createProfile = async (publicKey, nickname) => {
      toast.loading("Creating profile...");
      const wallet = publicKey;
      try {
        const response = await axios.post(`/api/user/${wallet}`, { nickname });
        // console.log(response);
        if (response.status === 201) {
          toast.dismiss();
          toast.success("Profile created correctly");
          router.push("/user/dashboard");
        }
      } catch (error) {
        toast.dismiss();
        toast.error("Error while creating profile");
        console.log(error);
      }
    };
    createProfile(publicKey, nickname);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="hidden">
        <ConnectWallet />
      </div>

      <div className="bg-gray-800 p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">
          Create a username
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full bg-gray-700 text-white border-2 border-gray-700 rounded py-2 px-4 mb-4"
            placeholder="Write your username"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
          >
            Save{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
