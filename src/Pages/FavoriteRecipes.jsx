import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const [favoritesRecipes, setFavoritesRecipes] = useState([]);

  const favoriteRecipes = () => {
    setFavoritesRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
  };

  useEffect(() => {
    favoriteRecipes();
  }, []);

  return (
    <main>
      <Header />
      Receitas Favoritas
      <br />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Food
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      { favoritesRecipes.map((card, index) => (
        <div key={ card.id }>
          <img
            src={ card.image }
            alt={ card.name }
            width="150px"
            data-testid={ `${index}-horizontal-image` }
          />
          {card.alcoholicOrNot.includes('Alcoholic')
            ? (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {card.alcoholicOrNot}
              </p>)
            : (
              <p data-testid={ `${index}-horizontal-top-text` }>
                { card.nationality}
                {' '}
                -
                {' '}
                { card.category }
              </p>)}
          <p data-testid={ `${index}-horizontal-name` }>
            { card.name }
          </p>
          <button
            className="btn-fav"
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn ` }
            value={ card.id }
            src={ blackHeartIcon }
          >
            {/* Favorite btn
            {' '} */}
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              // src={ recipeFavorites.some((rec) => rec.id === recipe.id)
              //   ? blackHeartIcon : whiteHeartIcon }
              src={ blackHeartIcon }
              alt="Botão Favoritado"
            />
          </button>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            value={ card.id }
            src={ shareIcon }
          >
            {/* {' '}
            Share button
            {' '} */}
            <img
              data-testid="horizontal-share-btn"
              src={ shareIcon }
              alt="Botão Compartilhar"
            />
          </button>
        </div>
      ))}
    </main>
  );
}

export default FavoriteRecipes;
