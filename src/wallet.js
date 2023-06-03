import { createContext, useState} from "react";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [publicKey, setPublicKey] = useState(null);
    // console.log("desde context");
    // console.log("wallet", publicKey);
    
    return (
        <WalletContext.Provider value={{ publicKey, setPublicKey }}>
            {children}
        </WalletContext.Provider>
    );
};