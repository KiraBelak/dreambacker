import React, {useContext, useState} from 'react';
import {WalletContext} from '../../src/wallet';
import MainLayout from "@/components/layouts/MainLayout";




export default function Dreamer(){
    const {publicKey, setPublicKey} = useContext(WalletContext);
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