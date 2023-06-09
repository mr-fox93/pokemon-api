import { createContext, useState } from "react";

export const FightArenaContext = createContext();

export const FightArenaProvider = ({ children }) => {
  const [fightArena, setFightArena] = useState([]);
  const [winner, setWinner] = useState(null);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);

  const addPokemonToFightArena = (pokemon) => {
    if (ifExistFightPokemon(pokemon.id)) {
      setAlert(true);
    } else if (fightArena.length === 2) {
      setError(true);
    } else {
      setFightArena([...fightArena, pokemon]);
    }
  };

  const ifExistFightPokemon = (id) => {
    return fightArena.some((item) => item.id === id);
  };

  const clearArena = () => {
    setFightArena([]);
    setWinner(null);
  };

  const closeError = () => {
    setError(false);
  };

  const closeAlert = () => {
    setAlert(false);
  };

  const removeOnePokemon = (id) => {
    setFightArena(fightArena.filter((item) => item.id !== id));
  };

  return (
    <FightArenaContext.Provider
      value={{
        fightArena,
        addPokemonToFightArena,
        clearArena,
        winner,
        setWinner,
        alert,
        closeAlert,
        error,
        closeError,
        ifExistFightPokemon,
        removeOnePokemon,
        addPokemonToFightArena,
      }}
    >
      {children}
    </FightArenaContext.Provider>
  );
};
