import React, { createContext, useState, useEffect } from "react";
import {
  Connection,
  SystemProgram,
  Transaction,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";
import { useRouter } from "next/router";
const magiosPublicKey = "E8fEhxvSxRfoVCAWbtab1nsimWcaWcoaAsRp4bp8X2up";
const SOLANA_NETWORK = process.env.CHAIN_NETWORK;

const sendtx = {};

sendtx.sendTransaction = async (price, data) => {
    try {
      //provider
      const provider = window?.phantom?.solana;

      //connection
      const connection = new Connection(
        clusterApiUrl(SOLANA_NETWORK),
        "confirmed"
      );

      //keys
      const fromPubkey = new PublicKey(publicKey);
      const toPubkey = new PublicKey(magiosPublicKey);

      //getbalance
      const balance = await connection.getBalance(new PublicKey(publicKey));

      //check if it has enough balance
      if (balance < LAMPORTS_PER_SOL * price) {
        toast.error("You don't have enough balance");
        return;
      }

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports: LAMPORTS_PER_SOL * price, // 1 SOL
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = fromPubkey;

      //sign transaction
      const transactionsignature = await provider.signTransaction(transaction);

      //send transaction
      const txid = await connection.sendRawTransaction(
        transactionsignature.serialize()
      );
      console.info(`Transaction ${txid} sent`);

      //wait for confirmation
      const confirmation = await connection.confirmTransaction(txid, {
        commitment: "singleGossip",
      });

      const { slot } = confirmation.value;

      console.info(`Transaction ${txid} confirmed in block ${slot}`);

      const solanaExplorerLink = `https://explorer.solana.com/tx/${txid}?cluster=devnet`;
      return solanaExplorerLink;
    } catch (error) {
      console.error("ERROR SEND TRANSACTION", error);
      toast.error("Something went wrong sending the transaction");
    }
  };
