import { useState } from "react";
import {
  GetManySwapsDocument,
  execute,
  subscribe,
} from "../.graphclient/index";
import "./App.css";
import Navbar from "./components/Navbar";
import ENSForm from "./components/ENSForm";
import SwapsTable from "./components/SwapsTable";

function App() {
  const [domains, setDomains] = useState([]);
  const [swaps, setSwaps] = useState([]);
  const [showTab, setShowTab] = useState("ens-query");

  const subscribeLiveQuery = async () => {
    subscribe(GetManySwapsDocument, {})
      .then((result) => {
        console.log(result);
        result
          .next()
          .then((res) => {
            if (res) {
              if (res.value) {
                console.log(res.value);
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
      })
      .catch((error) => console.log(error));
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
        {showTab === "ens-query" && (
          <>
            <ENSForm domains={domains} setDomains={setDomains} />
            <div className="content-container">
              {domains.length > 0 && (
                <ul className="domains-list">
                  {domains.map((domain) => (
                    <li className="domains-list-element" key={domain.id}>
                      {domain.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
        {showTab === "dex-query" && (
          <div className="table-container">
            <SwapsTable swaps={swaps} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
