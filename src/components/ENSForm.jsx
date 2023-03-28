import { useState } from "react";
import { GetManyDomainsDocument, execute } from "../../.graphclient/index";

const ENSForm = ({ domains = [], setDomains = () => null }) => {
  const [labelName, setLabelName] = useState("");
  const [minSubdomains, setMinSubdomains] = useState(1);
  const [maxSubdomains, setMaxSubdomains] = useState(5);

  const getManyDomains = () => {
    execute(GetManyDomainsDocument, {}).then((result) => {
      setDomains(result.data.domains);
      console.log(result.data.domains);
    });
  };

  return (
    <div className="ens-form-container">
      <div className="queries-inputs-container">
        <label htmlFor="labelName" className="query-param-label">
          ENS Domain (without .eth):
          <input
            onChange={(event) => setLabelName(event.target.value)}
            id="labelName"
            name="labelName"
            type="text"
            className="query-param-input"
            value={labelName}
          />
        </label>
        <label htmlFor="minSubdomains" className="query-param-label">
          Min Subdomains
          <input
            onChange={(event) => setMinSubdomains(event.target.value)}
            id="minSubdomains"
            name="minSubdomains"
            type="number"
            className="query-param-input"
            value={minSubdomains}
          />
        </label>
        <label htmlFor="maxSubdomains" className="query-param-label">
          Max Subdomains
          <input
            onChange={(event) => setMaxSubdomains(event.target.value)}
            id="maxSubdomains"
            name="maxSubdomains"
            type="number"
            className="query-param-input"
            value={maxSubdomains}
          />
        </label>
      </div>
      <div className="buttons-container">
        <button onClick={getManyDomains}>Query Many Domains</button>
        <button>Query One Domain</button>
        <button>Query Subdomains</button>
      </div>
      {domains.length > 0 && (
        <ul>
          {domains.map((domain) => (
            <li key={domain.id}>{domain.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ENSForm;
