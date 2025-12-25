import { createContext, useEffect, useState } from "react";
import { getAllCoin } from "../api/Api";
import type { Coin } from "../types/Types";

export const CoinContext = createContext({} as any);

type Currency = {
  code: string;
  symbol: string;
};

const CoinContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [allCoins, setAllCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [currency, setCurrency] = useState<Currency>({
    code: "USD",
    symbol: "$",
  });

  const formatUSD = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };


  useEffect(() => {
    const fetchCoins = async () => {
      const coins = await getAllCoin();
      setAllCoins(coins);
      setFilteredCoins(coins);
    };

    fetchCoins();
  }, [currency]);

  const values = {
    allCoins,
    setAllCoins,
    currency,
    setCurrency,
    formatUSD,
    filteredCoins,
    setFilteredCoins
  };

  return <CoinContext.Provider value={values}>{children}</CoinContext.Provider>;
};

export default CoinContextProvider;
