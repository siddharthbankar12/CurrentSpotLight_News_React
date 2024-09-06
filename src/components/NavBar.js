import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const savedCategory = localStorage.getItem("selectedCategory") || "General";
  const [selectedCategory, setSelectedCategory] = useState(savedCategory);

  useEffect(() => {
    const savedCategory = localStorage.getItem("selectedCategory") || "General";
    setSelectedCategory(savedCategory);
  }, [location.pathname]); // Re-run this effect when the route changes

  const handleSelect = (category) => {
    setSelectedCategory(category);
    localStorage.setItem("selectedCategory", category);
  };

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            onClick={() => handleSelect("General")} // Update category on Home click
          >
            CurrentSpotLight
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
                  className="nav-link active"
                  aria-current="page"
                  to="/general"
                  onClick={() => handleSelect("General")} // Update category on Home click
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    News Category: {selectedCategory}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/business"
                        onClick={() => handleSelect("Business")}
                      >
                        Business
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/entertainment"
                        onClick={() => handleSelect("Entertainment")}
                      >
                        Entertainment
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/general"
                        onClick={() => handleSelect("General")}
                      >
                        General
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/health"
                        onClick={() => handleSelect("Health")}
                      >
                        Health
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/science"
                        onClick={() => handleSelect("Science")}
                      >
                        Science
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/sports"
                        onClick={() => handleSelect("Sports")}
                      >
                        Sports
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/technology"
                        onClick={() => handleSelect("Technology")}
                      >
                        Technology
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
