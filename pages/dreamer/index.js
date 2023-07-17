import React, {useContext, useState} from 'react';
import {WalletContext} from '../../src/wallet';
import MainLayout from "@/components/layouts/MainLayout";
<<<<<<< HEAD
=======
import { useWallet } from '@solana/wallet-adapter-react';
>>>>>>> 2553d35359bae392eec86a35193b246b7d65d2ab




export default function Dreamer(){
<<<<<<< HEAD
    const {publicKey, setPublicKey} = useContext(WalletContext);
=======
    const {publicKey} = useWallet();
>>>>>>> 2553d35359bae392eec86a35193b246b7d65d2ab
    const [project, setProject] = useState(null);
    


    
    return(
        <MainLayout>
        {project ? (
            <div>
                <h1> 
                    {project.name}
                </h1>
             
                </div>
        ) : (
            <div>
                <h1>no hay proyecto</h1>
                </div>
        )}
        </MainLayout>
    )
}