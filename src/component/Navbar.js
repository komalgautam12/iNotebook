import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {}, [location]);
  const logout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  about
                </Link>
              </li>
            </ul>
            {console.log(localStorage.getItem("jwt"))}
            {!localStorage.getItem("jwt") ? (
              <>
                <ul className="navbar-nav mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/login" ? "active" : ""
                      } type="text" `}
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/signup" ? "active" : ""
                      } type="text"   `}
                      to="/signup"
                    >
                      Signup
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              <button
                className={`btn btn-outline-success`}
                type="text"
                onClick={logout}
              >
                logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
