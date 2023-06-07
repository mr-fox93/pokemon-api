import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useFavorite } from "./FavoritesContext";
import { Button, Icon, Popup } from "semantic-ui-react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { LoginContext } from "./LoginContext";
import { v4 as uuidv4 } from "uuid";
import { NewPokemonContext } from "./NewPokemonContext";
import { getPokemon, createPokemon, updatePokemon } from "./api"; // Przypuszczam, że umieściłeś funkcje API w pliku api.js

// (reszta importów i kodu...)

const PokemonCard = ({ pokemon, setPokemons }) => {
  const { userData } = useContext(LoginContext);
  const nav = useNavigate();
  const [editablePokemon, setEditablePokemon] = useState(pokemon);
  const [showEditFields, setShowEditFields] = useState(false);
  const { addFavorite, updateFavorite } = useFavorite();
  const { setNewPokemon } = useContext(NewPokemonContext);

  useEffect(() => {
    const fetchPokemon = async () => {
      const savedPokemon = await getPokemon(pokemon.id);
      if (savedPokemon) {
        setEditablePokemon(savedPokemon);
      }
    };

    fetchPokemon();
  }, [pokemon.id]);

  // (reszta kodu...)

  const onSubmit = async (data) => {
    setShowEditFields(false);
    const updatedPokemon = {
      // (reszta kodu...)
    };
    setEditablePokemon(updatedPokemon);
    await updatePokemon(updatedPokemon); // Dodano wywołanie API
    updateFavorite(updatedPokemon);
  };

  const saveAsNew = async (data) => {
    setShowEditFields(false);
    const newPokemon = {
      // (reszta kodu...)
    };
    setNewPokemon((prevPokemons) => {
      if (prevPokemons.some((pokemon) => pokemon.id === newPokemon.id)) {
        return null;
      } else {
        return [...prevPokemons, newPokemon];
      }
    });
    await createPokemon(newPokemon); // Dodano wywołanie API
  };

  // (reszta kodu...)
};

export default PokemonCard;
