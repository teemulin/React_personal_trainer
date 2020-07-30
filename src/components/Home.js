import React from "react";
import logo from "./logo.svg";
import "./component.css";

export default function Home() {

    return (
        <div className="Home">
            Welcome traveller!
        <img src={logo} className="Home-logo" alt="logo" />
        </div>
    );
}