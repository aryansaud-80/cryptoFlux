import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CoinDetail from "./pages/CoinDetailPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/coin/:coinId" element={<CoinDetail />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  );
};
export default App;
