// app/components/AddressDisplay.tsx

"use client";

import { useState } from "react";
import { getWallets, isValidAddress } from "./actions";

export default function Home() {
  const [addresses, setAddresses] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingIsValidResponse, setLoadingIsValidResponse] =
    useState<boolean>(false);
  // const [state, formAction] = useActionState(getWallets, null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading((prev) => true);
    const formData = new FormData(event.currentTarget);
    const numWallets = Number(formData.get("numWallets"));
    const wallets = await getWallets(numWallets);
    setLoading((prev) => false);
    setAddresses((prev) => wallets);
  };

  const handleAddressValidation = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoadingIsValidResponse((prev) => true);
    const formData = new FormData(event.currentTarget);
    const address = formData.get("solanaAddress") as string;
    const valid = await isValidAddress(address);
    setLoadingIsValidResponse((prev) => false);
    alert(`${address} is a ${valid ? "valid" : "invalid"} Solana address`);
  };

  return (
    <div className="p-8 bg-white text-black">
      <form onSubmit={handleAddressValidation} className="flex flex-col gap-2">
        <input
          type="text"
          name="solanaAddress"
          placeholder="Enter Solana address to validate"
          required
        />
        <button
          type="submit"
          className={`bg-blue-500 text-white w-fit px-3 py-1 rounded-full ${
            loadingIsValidResponse ? "opacity-50" : ""
          }`}
          disabled={loadingIsValidResponse}
        >
          {loadingIsValidResponse ? "Validating..." : "Validate Address"}
        </button>
      </form>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-20">
        <input
          type="number"
          name="numWallets"
          placeholder="Enter number of wallets"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-fit px-3 py-1 rounded-full"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Wallets"}
        </button>
        <div>{loading && "loading..."}</div>
        {addresses.length > 0 && (
          <div className="mt-10">
            <button
              className="bg-blue-500 text-white w-fit px-3 py-1 rounded-full"
              onClick={() => navigator.clipboard.writeText(addresses.join(","))}
            >
              copy to clipboard
            </button>
            <div className="text-sm overflow-auto w-fit p-4 shadow-lg ">
              {addresses.map((address) => (
                <p key={address}>{address}</p>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
