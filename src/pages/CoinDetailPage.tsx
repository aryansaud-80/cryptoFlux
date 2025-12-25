import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Loader from "../components/Loader";

const CoinDetailPage = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinDetail = async () => {
      try {
        const coinDetail = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}`,
          {
            headers: {
              'x_cg_demo_api_key': import.meta.env.VITE_API_KEY,
            },
          }
        );

        setCoinData({
          name: coinDetail.data.name,
          symbol: coinDetail.data.symbol.toUpperCase(),
          logo: coinDetail.data.image.large,
          rank: coinDetail.data.market_cap_rank,
          price: coinDetail.data.market_data.current_price.usd,
          marketCap: coinDetail.data.market_data.market_cap.usd,
          high24h: coinDetail.data.market_data.high_24h.usd,
          low24h: coinDetail.data.market_data.low_24h.usd,
        });

        const chartResponse = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
          {
            params: { vs_currency: "usd", days: 10, interval: "daily" },
          }
        );

        const formattedChart = chartResponse.data.prices.map(
          (item: [number, number]) => ({
            date: new Date(item[0]).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            }),
            price: item[1],
          })
        );

        setChartData(formattedChart);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coin data:", error);
        setLoading(false);
      }
    };

    fetchCoinDetail();
  }, [coinId]);

  if (loading)
    return (
      <div className="h-100 flex items-center justify-center">
        <Loader />
      </div>
    );
  if (!coinData)
    return (
      <div className="text-center mt-20 text-slate-300">Coin not found</div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 sm:px-6 py-8">
      <div className="flex flex-col items-center gap-4 mb-10">
        <img
          src={coinData.logo}
          alt={coinData.name}
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-slate-700"
        />
        <h1 className="text-3xl sm:text-4xl font-bold">{coinData.name}</h1>
        <p className="text-slate-400 text-lg">{coinData.symbol}</p>
      </div>

      {/* 10-Day Price Chart */}
      <div className="bg-slate-900 rounded-xl p-6 mb-10 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-slate-200">
          Price Chart (Last 10 Days)
        </h2>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke="#2c2c2c" strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" domain={["auto", "auto"]} />
              <Tooltip
                formatter={(value: number | undefined) =>
                  value !== undefined ? `$${value.toLocaleString()}` : ""
                }
                contentStyle={{
                  backgroundColor: "#1e293b",
                  borderRadius: "8px",
                  border: "none",
                }}
                labelStyle={{ color: "#94a3b8" }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#06b6d4"
                strokeWidth={2}
                dot={{ r: 4, fill: "#06b6d4" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-slate-400">No chart data available</p>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 rounded-xl p-5 text-center shadow-md">
          <p className="text-slate-400 text-sm sm:text-base">Market Rank</p>
          <p className="font-bold text-xl sm:text-2xl">{coinData.rank}</p>
        </div>
        <div className="bg-slate-900 rounded-xl p-5 text-center shadow-md">
          <p className="text-slate-400 text-sm sm:text-base">Current Price</p>
          <p className="font-bold text-xl sm:text-2xl">
            ${coinData.price.toLocaleString()}
          </p>
        </div>
        <div className="bg-slate-900 rounded-xl p-5 text-center shadow-md">
          <p className="text-slate-400 text-sm sm:text-base">Market Cap</p>
          <p className="font-bold text-xl sm:text-2xl">
            ${coinData.marketCap.toLocaleString()}
          </p>
        </div>
        <div className="bg-slate-900 rounded-xl p-5 text-center shadow-md">
          <p className="text-slate-400 text-sm sm:text-base">24H High / Low</p>
          <p className="font-bold text-xl sm:text-2xl">
            ${coinData.high24h.toLocaleString()} / $
            {coinData.low24h.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoinDetailPage;
