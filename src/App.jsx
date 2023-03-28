import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ENSForm from "./components/ENSForm";

function App() {
  const [result, setResult] = useState(null);

  const [domains, setDomains] = useState([]);

  // useEffect(() => {
  //   execute(GetManyDomainsDocument, {}).then((result) => {
  //     setResult(result);
  //     console.log(result);
  //   });
  // }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <main>
        <h1>The Graph Client Tutorial</h1>
        <ENSForm domains={domains} setDomains={setDomains} />
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
