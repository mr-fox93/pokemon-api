import "./App.css";
import { Route, Routes } from "react-router-dom";
import Favorites from "./components/Favorites";
import { Navbar } from "./components/Navbar";
import { ThemeProvider } from "./components/ThemeContext";
import Login from "./components/Login";
import PokemonsCards from "./components/PokemonsCards";
import { SearchProvider } from "./components/SearchContext";
import { FavoritesProvider } from "./components/FavoritesContext";
import FightArena from "./components/FightArena";
import Register from "./components/Register";
import { LoginProvider } from "./components/LoginContext";
import PokemonMoreCard from "./components/PokemonMoreCard";
import UserPanel from "./components/UserPanel";

function App() {
  const ErrorPage = () => {
    return (
      <div>
        <h1>404 </h1>
        <p>Page not found</p>
      </div>
    );
  };
  return (
    <>
      <LoginProvider>
        <ThemeProvider>
          <SearchProvider>
            <FavoritesProvider>
              <header style={{ position: "sticky", top: 0, zIndex: 1000 }}>
                <Navbar />
              </header>

              <Routes>
                <Route path="/" element={<PokemonsCards />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/register" element={<Register />} />
                <Route path="/arena" element={<FightArena />} />
                <Route path="/login" element={<Login />} />
                <Route path="/user" element={<UserPanel />} />
                <Route
                  path="/pokemon/:pokemonName"
                  element={<PokemonMoreCard />}
                />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </FavoritesProvider>
          </SearchProvider>
        </ThemeProvider>
      </LoginProvider>
    </>
  );
}

export default App;
