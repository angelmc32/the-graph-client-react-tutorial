import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ENSComponent from "./components/ENSComponent";
import SwapsComponent from "./components/SwapsComponent";

const App = () => {
  const [swaps, setSwaps] = useState([]);
  const [showTab, setShowTab] = useState("ens-query");
  const [isLoading, setIsLoading] = useState(false);

  const subscribeLiveQuery = async () => {
    // To do...
  };

  const showComponent = async (component = "ens-query") => {
    setShowTab(component);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <main>
        <h1>The Graph Client Tutorial</h1>
        <div className="tabs-container">
          <button
            className={showTab === "ens-query" ? "selected" : ""}
            onClick={() => showComponent("ens-query")}
          >
            ENS Domain Query
          </button>
          <button
            className={showTab === "dex-query" ? "selected" : ""}
            onClick={() => showComponent("dex-query")}
          >
            Swaps Live Query
          </button>
        </div>
        <hr className="divider" />
        {showTab === "ens-query" && <ENSComponent />}
        {showTab === "dex-query" && (
          <SwapsComponent isLoading={isLoading} swaps={swaps} />
        )}
      </main>
    </div>
  );
};

export default App;
