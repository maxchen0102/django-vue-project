// NavBar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          網站標誌
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                  className={({isActive}) =>
                      `nav-link ${isActive ? 'active' : ''}`
                  }
                  to="/"
              >
                首頁
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                  className={({isActive}) =>
                      `nav-link ${isActive ? 'active' : ''}`
                  }
                  to="/about"
              >
                關於我們
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                  className={({isActive}) =>
                      `nav-link ${isActive ? 'active' : ''}`
                  }
                  to="/contact"
              >
                聯絡我們
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                  className={({isActive}) =>
                      `nav-link ${isActive ? 'active' : ''}`
                  }
                  to="/test2"
              >
                test2
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

