import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CoinContext } from "../context/CoinContext";
import type { Coin } from "../types/Types";

const CryptoTable = () => {
  const { filteredCoins, formatUSD } = useContext(CoinContext);
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-12 mb-12">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-slate-800 text-slate-300 text-left">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Coin</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">24H</th>
              <th className="px-4 py-3 hidden md:table-cell">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.slice(0, 10).map((coin: Coin, index: number) => (
              <tr
                key={coin.id}
                className="border-t border-slate-800 hover:bg-slate-800 cursor-pointer transition"
                onClick={() => navigate(`/coin/${coin.id}`)}
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <div>
                    <p className="text-slate-100 font-semibold">{coin.name}</p>
                    <p className="text-slate-400 text-sm">{coin.symbol}</p>
                  </div>
                </td>
                <td className="px-4 py-3">{formatUSD(coin.current_price)}</td>
                <td
                  className={`px-4 py-3 font-semibold ${
                    coin.priceChange24h.startsWith("-")
                      ? "text-rose-400"
                      : "text-emerald-400"
                  }`}
                >
                  {coin.priceChange24h}
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  {formatUSD(coin.market_cap)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable;
