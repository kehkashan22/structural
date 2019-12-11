import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a href="#" className="navbar-brand">
            Structural
        </a >
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/" activeClassName="is-active" exact={true}>Home</NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link" to="/people" activeClassName="is-active">Employees</NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link" to="/departments" activeClassName="is-active">Departments</NavLink>
                </li>
            </ul>
        </div>
    </nav >
);

export default Header;