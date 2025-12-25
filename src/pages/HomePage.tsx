import Hero from "../components/Hero";
import CryptoTable from "../components/CryptoTable";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      <main className="flex-grow">
        <Hero />
        <CryptoTable />
      </main>
    </div>
  );
};

export default HomePage;
