// app/components/AddressDisplay.tsx

"use client";

import { useState } from "react";
import { getWallets } from "./actions";

export default function Home() {
  const [addresses, setAddresses] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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

  return (
    <div className="p-8 bg-white text-black">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="numWallets">Number of Wallets:</label>
        <input
          type="number"
          name="numWallets"
          placeholder="Enter number of wallets"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-fit px-3 py-1 rounded-full"
        >
          Submit
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
