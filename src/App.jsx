import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ExampleQueryDocument, execute } from "../.graphclient/index";

function App() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    execute(ExampleQueryDocument, {}).then((result) => {
      setResult(result);
      console.log(result);
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Graph Client Example</p>
        <fieldset>
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
        </fieldset>
      </header>
    </div>
  );
}

export default App;
