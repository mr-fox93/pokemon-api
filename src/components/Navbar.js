import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import pokeLogo from "../images/poke.png";
import { ThemeContext } from "./ThemeContext";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { SearchContext } from "./SearchContext";
import { Button, Input } from "semantic-ui-react";
import { LoginContext } from "./LoginContext";

export const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { search, setSearch } = useContext(SearchContext);
  const { userData, setUserData } = useContext(LoginContext);

  const toggleTheme = () => {
    setTheme(!theme);
  };

  return (
    <div>
      <div
        className="ui tiny menu"
        style={{
          backgroundColor: theme ? "black" : "papayawhip",
          color: theme ? "white" : "black",
          borderRadius: "0px",
        }}
      >
        <img
          src={pokeLogo}
          alt="poke"
          className="custom-logo"
          style={{
            width: "70px",
            height: "70px",
            marginRight: "10px",
            backgroundColor: theme ? "black" : "papayawhip",
          }}
        />

        <Link style={{ color: theme ? "white" : "black" }} to="/" class="item">
          Home
        </Link>
        <Link
          style={{ color: theme ? "white" : "black" }}
          to="/favorites"
          class="item"
        >
          Favorites
        </Link>
        <Link
          style={{ color: theme ? "white" : "black" }}
          to="/arena"
          class="item"
        >
          Fight Arena
        </Link>

        <div
          class="right menu"
          style={{ display: "flex", alignItems: "center" }}
        >
          {userData ? (
            <button onClick={() => setUserData(null)}>Log out</button>
          ) : null}
          <div class="item">
            {userData ? `Logged in as ${userData.name}` : "Not logged in"}
          </div>
          <Input
            icon="search icon"
            class="ui icon input"
            style={{
              backgroundColor: theme ? "black" : "papayawhip",
              color: theme ? "white" : "black",
              height: "40px",
              marginRight: "15px",
            }}
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div class="item">
            <div class="item">
              <ThemeToggleButton onChange={toggleTheme} checked={theme} />
            </div>
            <a
              style={{ fontWeight: "bold", fontSize: "15px" }}
              href="https://github.com/mr-fox93"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="github icon" /> mr-fox93
            </a>
          </div>
          <div class="item">
            <Link to="/register" class="ui primary button">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
