import { useEffect, useState } from "react";
import {
  GetManySwapsDocument,
  GetManyDomainsDocument,
  GetDomainByLabelNameDocument,
  GetDomainBySubdomainCountDocument,
  execute,
} from "../.graphclient/index";
import "./App.css";
import Navbar from "./components/Navbar";
import ENSForm from "./components/ENSForm";

function App() {
  const [result, setResult] = useState(null);

  const [domains, setDomains] = useState([]);

  useEffect(() => {
    execute(GetManySwapsDocument, {}).then((result) => {
      setResult(result.data.swaps);
      console.log(result.data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <main>
        <h1>The Graph Client Tutorial</h1>
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
          {result?.length > 0 && (
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
