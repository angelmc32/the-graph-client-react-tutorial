import { useEffect, useState } from "react";
import usePollingLive from "@graphprotocol/client-polling-live";
import {
  GetManySwapsDocument,
  GetManyDomainsDocument,
  GetDomainByLabelNameDocument,
  GetDomainBySubdomainCountDocument,
  getMeshOptions,
  execute,
  subscribe,
} from "../.graphclient/index";
import "./App.css";
import Navbar from "./components/Navbar";
import ENSForm from "./components/ENSForm";

function App() {
  const [result, setResult] = useState(null);

  const [domains, setDomains] = useState([]);

  // onExecute({
  //   args: { document: GetManySwapsDocument },
  //   executeFn: execute(GetManySwapsDocument, {}),
  //   setExecuteFn: testFn,
  // });

  const testFn = async () => {
    subscribe(GetManySwapsDocument, {})
      .then((result) => {
        console.log(result);
        result
          .next()
          .then((res) => {
            console.log(res);
            if (res) {
              if (res.value) {
                console.log(res.value);
                setResult(res.value.data.swaps);
              }
            }
            if (res.value.isLive) {
              setTimeout(() => {
                testFn();
              }, 6000);
            } else {
              result.return();
            }
          })
          .catch((e) => console.log(e));
        if (!result) {
          console.log(result);
          console.log(">:(");
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    // console.log(
    //   onExecute({
    //     args: { document: GetManySwapsDocument },
    //     executeFn: GetManySwapsQuery,
    //     setExecuteFn: GetManyLiveSwaps,
    //   })
    // );
    // console.log(GetManySwapsDocument);
    // subscribe(GetManySwapsDocument, {})
    //   .then((result) => {
    //     const repeater = result;
    //     console.log(result);
    //     result
    //       .next()
    //       .then((res) => {
    //         console.log(res);
    //         if (res) {
    //           if (res.value) {
    //             console.log(res.value);
    //             setResult(res.value.data.swaps);
    //           }
    //         }
    //         // if (res.isLive) {
    //         //   result.return();
    //         // }
    //       })
    //       .catch((e) => console.log(e));
    //     if (!result) {
    //       console.log(result);
    //       console.log(">:(");
    //     }
    //   })
    //   .catch((error) => console.log(error));
  }, []);

  const getLiveSwaps = () => {
    execute(GetManySwapsDocument, {}).then((result) => {
      console.log(result);
      if (result.data && result.data.swaps) {
        setResult(result.data.swaps);
      } else {
        console.log(result.data);
        console.log(">:(");
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <main>
        <h1>The Graph Client Tutorial</h1>
        <button onClick={testFn}>Get Swaps</button>
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
          {result && result.length > 0 && (
            <table className="swaps-list">
              <thead>
                <tr>
                  <th>Pair 1</th>
                  <th>Pair 2</th>
                  <th>USD Value</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {result.map((swap) => (
                  <tr className="swaps-table-row" key={swap.id}>
                    <td>{swap.pair.token0.symbol}</td>
                    <td>{swap.pair.token1.symbol}</td>
                    <td>$ {parseFloat(swap.amountUSD).toFixed(2)}</td>
                    <td>{new Date(swap.timestamp * 1000).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
      <div className="content-container">
        {result?.data && (
          <form>
            <label>Data</label>
            <br />
            <textarea
              value={JSON.stringify(result.data, null, 2)}
              readOnly
              rows={25}
            />
          </form>
        )}
        {result?.errors && (
          <form>
            <label>Error</label>
            <br />
            <textarea
              value={JSON.stringify(result.errors, null, 2)}
              readOnly
              rows={25}
            />
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
