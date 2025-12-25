import axios from "axios";

const COIN_API_URL = "https://api.coingecko.com/api/v3/coins/markets";

export const getAllCoin = async () => {
  try {
    const response = await axios.get(COIN_API_URL, {
      params: {
        vs_currency: "usd",
      },
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
      },
    });

    if (response.status === 200) {
      return response.data.map((coin: any) => ({
        id: coin.id,
        image: coin.image,
        name: coin.name,
        symbol: coin.symbol,
        current_price: coin.current_price,
        market_cap: coin.market_cap,
        priceChange24h: coin.price_change_percentage_24h?.toFixed(2),
      }));
    }
  } catch (error) {
    console.error("Error fetching coins:", error);
    return [];
  }
};
