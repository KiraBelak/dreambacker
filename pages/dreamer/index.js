import React, { useContext, useState } from "react";
import { WalletContext } from "../../src/wallet";
import MainLayout from "@/components/layouts/MainLayout";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Dreamer() {
  const { publicKey, setPublicKey } = useContext(WalletContext);
  const [project, setProject] = useState(null);

  return (
    <MainLayout>
      {project ? (
        <div>
          <h1>{project.name}</h1>
        </div>
      ) : (
        <div>
          <h1>There are no projects</h1>
        </div>
      )}
    </MainLayout>
  );
}
