import React from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Goal Setter</Link>
      </div>
      <ul>
        <li>
          <Link to="/login">
            <LoginIcon /> Login
          </Link>
        </li>
        <li>
          <Link to="/register">
            <AccountCircleIcon /> Register
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
