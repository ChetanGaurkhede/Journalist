import { useState } from "react";
import "./App.css";
import TradingDashboard from "./components/layouts/TradingDashboard";
import Header from "./components/layouts/Header";

function App() {
  return (
    <>
      <Header />
      <TradingDashboard />
    </>
  );
}

export default App;
