import React from "react";
import { useLocation } from "react-router-dom";

function Navi() {
  let location = useLocation();

  return (
    <div>
      <nav className="navs">
        <div className="navs-container">
          <div className="navbar-brands">Timetable</div>
          <div className="nav-secondary">
            {location.pathname === "/admin" ? (
              <a href="/dashboard" className="navs-link">
                Dashboard
              </a>
            ) : null}
            {location.pathname === "/mentor/timetable" ? (
              <a
                href="/mentor/credentials"
                className="navs-link"
                onClick={() => window.localStorage.clear()}
              >
                Log Out
              </a>
            ) : null}
            {location.pathname === "/dashboard" ? (
              <>
                <a href="/admin/credentials" className="navs-link">
                  Admin
                </a>

                <a href="/mentor/credentials" className="navs-link">
                  Mentor
                </a>
              </>
            ) : null}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navi;
