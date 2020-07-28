import React from "react";
import logo from "./logo.svg";
import "./component.css";

export default function Home() {

    return (
        <div className="Home">
        <img src={logo} className="Home-logo" alt="logo" />
        </div>
    );
}