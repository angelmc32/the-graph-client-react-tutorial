import React from "react";
import logo from "../logo.svg";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="logo-container">
        <img src={logo} className="the-graph-logo" alt="logo" />
        The Graph
      </div>
      <div className="links-container">
        <a className="link-element" href="/1">
          Docs
        </a>
        <a className="link-element" href="/2">
          The Graph Repo
        </a>
        <a className="link-element" href="/3">
          Tutorial Repo
        </a>
      </div>
    </div>
  );
};

export default Navbar;
