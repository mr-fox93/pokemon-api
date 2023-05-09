import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FavoriteContext, useFavorite } from "./FavoritesContext";
import FavoriteCard from "./FavoriteCard";
import { SearchContext } from "./SearchContext";
import { Modal, Header, Button, Icon } from "semantic-ui-react";

const FavoritesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const Favorites = () => {
  const { favorites } = useContext(FavoriteContext);
  const { search } = useContext(SearchContext);
  const { removeAll } = useFavorite();
  const [openModal, setOpenModal] = useState(false);

  const filtredFavorites = favorites.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const showModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const confirmRemoveAll = () => {
    removeAll();
    closeModal();
  };
  return (
    <>
      <Modal open={openModal} onClose={closeModal} basic size="small">
        <Header icon="warning" content="Remove All Pokemons" />
        <Modal.Content>
          <p>Are you sure you want to remove all pokemons from favorites?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={closeModal}>
            <Icon name="remove" /> No
          </Button>
          <Button color="green" inverted onClick={confirmRemoveAll}>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>

      <ButtonContainer>
        {filtredFavorites.length === 0 ? (
          <div></div>
        ) : (
          <Button className="ui negative basic button" onClick={showModal}>
            Remove All
          </Button>
        )}
      </ButtonContainer>
      <FavoritesGrid>
        {filtredFavorites.length === 0 ? (
          <div>Nothing here</div>
        ) : (
          filtredFavorites.map((pokemon) => (
            <FavoriteCard key={pokemon.id} pokemon={pokemon} />
          ))
        )}
      </FavoritesGrid>
    </>
  );
};

export default Favorites;
