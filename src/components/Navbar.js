import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import pokeLogo from "../images/poke.png";
import { ThemeContext } from "./ThemeContext";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { SearchContext } from "./SearchContext";
import { Button, Input } from "semantic-ui-react";
import { LoginContext } from "./LoginContext";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
  &.active {
    color: white !important;
    background-color: #e5d7bf !important;
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125) !important;
    transform: translateY(2px);
  }
`;
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

        <StyledNavLink
          style={{ color: theme ? "white" : "black" }}
          to="/"
          className="item"
        >
          Home
        </StyledNavLink>
        <StyledNavLink
          style={{ color: theme ? "white" : "black" }}
          to="/favorites"
          className="item"
        >
          Favorites
        </StyledNavLink>
        <StyledNavLink
          style={{ color: theme ? "white" : "black" }}
          to="/arena"
          className="item"
        >
          Fight Arena
        </StyledNavLink>

        <div
          class="right menu"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div class="item">{userData ? `Welcome ${userData.name}` : null}</div>
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
            {userData ? (
              <Button
                className="ui negative basic button"
                onClick={() => setUserData(null)}
              >
                Log Out
              </Button>
            ) : (
              <Link to="/register" class="ui primary button">
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
