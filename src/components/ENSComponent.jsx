import { useState } from "react";
import logo from "../logo.svg";

const ENSComponent = () => {
  const [domains, setDomains] = useState([]);
  const [labelName, setLabelName] = useState("");
  const [minSubdomains, setMinSubdomains] = useState(1);
  const [maxSubdomains, setMaxSubdomains] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const getManyDomains = (event) => {
    event.preventDefault();
    // To do...
  };

  const getDomainsByLabelName = (event) => {
    event.preventDefault();
    // To do...
  };

  const getDomainsBySubdomainCount = (event) => {
    event.preventDefault();
    // To do...
  };

  return (
    <div className="ens-container">
      <div className="ens-form-container">
        <form className="ens-form">
          <div className="ens-input-container">
            <button onClick={getManyDomains}>Query Many Domains</button>
          </div>
          <div className="ens-input-container">
            <label htmlFor="labelName" className="ens-param-label">
              ENS Domain (without .eth):
            </label>
            <input
              onChange={(event) => setLabelName(event.target.value)}
              id="labelName"
              name="labelName"
              type="text"
              className="ens-param-input"
              value={labelName}
            />
            <button onClick={getDomainsByLabelName}>Query One Domain</button>
          </div>
          <div className="ens-input-container">
            <label htmlFor="minSubdomains" className="ens-param-label">
              Min Subdomains
            </label>
            <input
              onChange={(event) => setMinSubdomains(event.target.value)}
              id="minSubdomains"
              name="minSubdomains"
              type="number"
              className="ens-param-input"
              value={minSubdomains}
            />
            <label htmlFor="maxSubdomains" className="ens-param-label">
              Max Subdomains
              <input
                onChange={(event) => setMaxSubdomains(event.target.value)}
                id="maxSubdomains"
                name="maxSubdomains"
                type="number"
                className="ens-param-input"
                value={maxSubdomains}
              />
            </label>
            <button onClick={getDomainsBySubdomainCount}>
              Query Subdomains
            </button>
          </div>
        </form>
      </div>
      <div className="list-container">
        {isLoading && (
          <div className="loader-container">
            <img className="loader" src={logo} />
            Loading...
          </div>
        )}
        {!isLoading && domains.length > 0 && (
          <ul className="list-domains">
            {domains.map((domain) => (
              <li className="list-element-domains" key={domain.id}>
                <a
                  href={`https://etherscan.io/address/${domain.owner.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {domain.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ENSComponent;
