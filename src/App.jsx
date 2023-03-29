import { useState } from "react";
import { GetManySwapsDocument, subscribe } from "../.graphclient/index";
import "./App.css";
import Navbar from "./components/Navbar";
import ENSComponent from "./components/ENSComponent";
import SwapsComponent from "./components/SwapsComponent";

function App() {
  const [swaps, setSwaps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTab, setShowTab] = useState("ens-query");

  const subscribeLiveQuery = async () => {
    setIsLoading(true);
    subscribe(GetManySwapsDocument, {})
      .then((result) => {
        result
          .next()
          .then((res) => {
            if (res) {
              if (res.value) {
                // Leaving this to show live query on demo
                console.log(
                  ` Last registered swap value: $ ${parseFloat(
                    res.value.data.swaps[0].amountUSD
                  ).toFixed(2)}`
                );
                setSwaps(res.value.data.swaps);
              }
            }
            if (res.value.isLive) {
              setTimeout(() => {
                subscribeLiveQuery();
              }, 5000);
            } else {
              result.return();
            }
          })
          .catch((e) => console.log(e));
        if (!result) {
          return null;
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const showComponent = async (component = "ens-query") => {
    if (component === "dex-query") {
      await subscribeLiveQuery();
    }
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
}

export default App;
