import React from "react";
import logo from "../logo.svg";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <a
        href="https://thegraph.com/"
        className="logo-container"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={logo} className="the-graph-logo" alt="logo" />
        The Graph
      </a>
      <div className="links-container">
        <a
          className="link-element"
          href="https://thegraph.com/docs/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Docs
        </a>
        <a
          className="link-element"
          href="https://github.com/graphprotocol/graph-client"
          target="_blank"
          rel="noopener noreferrer"
        >
          The Graph Repo
        </a>
        <a
          className="link-element"
          href="https://github.com/angelmc32/the-graph-client-react-tutorial"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tutorial Repo
        </a>
      </div>
    </div>
  );
};

export default Navbar;
