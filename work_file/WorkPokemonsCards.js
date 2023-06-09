import React, { useEffect, useState, useContext, useMemo } from "react";
import PokemonCard from "./PokemonCard";
import styled from "styled-components";
import { SearchContext } from "./SearchContext";
import { useFavorite } from "./FavoritesContext";
import { Message } from "semantic-ui-react";
import { ThemeContext } from "./ThemeContext";

const PokemonsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 10px;
`;

const SelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Select = styled.select`
  background-color: transparent;
  padding: 0.5rem;
  border-radius: 6px;
`;

const Wrapper = styled.body`
  height: 100vh;
`;

const PokemonsCards = () => {
  const [pokemons, setPokemons] = useState([]);
  const { search } = useContext(SearchContext);
  const { error, closeError } = useFavorite();
  const [type, setType] = useState("");
  const { theme } = useContext(ThemeContext);
  const [editedPokemons, setEditedPokemons] = useState([]);

  const fetchPokemons = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const data = await response.json();
    const results = await Promise.all(
      data.results.map(async (result) => {
        const response = await fetch(result.url);
        return await response.json();
      })
    );
    setPokemons(results);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const filteredByTypeAndSearch = useMemo(() => {
    return type
      ? pokemons.filter(
          (pokemon) =>
            pokemon.name.toLowerCase().includes(search.toLowerCase()) &&
            pokemon.types[0].type.name === type
        )
      : pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(search.toLowerCase())
        );
  }, [search, pokemons, type]);

  const handleChangeType = (e) => {
    setType(e.target.value);
  };

  return (
    <>
      <Wrapper
        style={{
          backgroundColor: theme ? "#720e9e" : "papayawhip",
        }}
      >
        <SelectWrapper>
          <Select onChange={handleChangeType}>
            <option value="">choose your type...</option>
            <option value="grass">Grass</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="electric">Electric</option>
          </Select>
        </SelectWrapper>

        {error && (
          <Message
            negative
            className="ui huge message"
            onDismiss={closeError}
            header="This pokemon is already in your favorites !   "
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
            }}
          />
        )}
        <PokemonsGrid>
          {filteredByTypeAndSearch.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              setEditedPokemons={setEditedPokemons}
            />
          ))}
          {editedPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </PokemonsGrid>
      </Wrapper>
    </>
  );
};

export default PokemonsCards;
