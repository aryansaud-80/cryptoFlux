import { useContext, useState } from "react";
import { CoinContext } from "../context/CoinContext";
import type { Coin } from "../types/Types";

const Hero = () => {
  const [input, setInput] = useState("");
  const { setFilteredCoins, allCoins } = useContext(CoinContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const searchCoins = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) {
      setFilteredCoins(allCoins);
      return;
    }

    const lower = input.toLowerCase();
    const results = allCoins.filter((coin: Coin) =>
      coin.id.toLowerCase().includes(lower)
    );

    setFilteredCoins(results);
    setInput("");
  };

  return (
    <section className="flex items-center justify-center min-h-[80vh] px-6">
      <div className="flex flex-col items-center gap-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          <span className="block text-slate-100">Largest</span>
          <span className="block bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Crypto Marketplace
          </span>
        </h1>

        <p className="text-slate-400 max-w-xl text-base md:text-lg">
          Welcome to the world’s largest cryptocurrency marketplace. Track
          real-time prices and search your favorite coins instantly.
        </p>

        <div className="w-full max-w-lg">
          <form
            onSubmit={(e) => searchCoins(e)}
            className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-2 focus-within:border-cyan-400 transition"
          >
            <input
              type="text"
              placeholder="Search crypto..."
              className="flex-1 bg-transparent px-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none"
              value={input}
              onChange={handleInputChange}
              required
            />

            <button className="bg-gradient-to-r from-cyan-400 to-indigo-400 text-slate-900 font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition">
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
