"use server";
import { isAddress } from "@solana/addresses";
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

export async function isValidAddress(address: string) {
  const valid = isAddress(address);
  return valid;
}
