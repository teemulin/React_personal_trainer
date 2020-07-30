import React from 'react'
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./component.css";

const Navigator = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-light  navi-div">
                <Link className="navbar-brand" to="/">J.Smith's Personal Training</Link>
                <div>
                <ul className="navbar-nav mr-auto">                
                    <li className="nav-item">
                    <Link className="nav-link" to="/customers">Customers</Link>
                    </li>
                    
                    <li className="nav-item">
                    <Link className="nav-link" to="/trainings">Trainings</Link>
                    </li>
                </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navigator;