"use server";
// app/api/generate-wallets/route.ts

import { Keypair } from "@solana/web3.js";

export async function getWallets(numWallets: number) {
  const wallets = [];
  for (let i = 0; i < numWallets; i++) {
    const keypair = Keypair.generate();
    wallets.push(keypair.publicKey.toBase58());
  }
  return wallets;
}
