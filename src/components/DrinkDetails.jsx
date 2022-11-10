import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import myContext from '../context/myContext';
import MealsCarousel from './MealsCarousel';
import ShareIcon from '../images/shareIcon.svg';

export default function DrinkDetails({ history }) {
  const { apiRecipeDetails, setApiRecipeDetails } = useContext(myContext);
  const paramsUrl = useParams();
  console.log(useParams());
  const [ingrediente, setIngrediente] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [copyMessage, setCopyMessage] = useState(false);
  const [favoritesDrinks, setFavoritesDrinks] = useState([]);
  /* const [apiMealsDetails, setApiMealsDetails] = useContext(myContext); */

  const handleButtonDetails = () => {
    history.push(`/drinks/${paramsUrl.id}/in-progress`);
  };

  useEffect(() => {
    const setApi = async () => {
      const responseApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${paramsUrl.id}`);
      console.log(responseApi);
      const result = await responseApi.json();
      setApiRecipeDetails(result);
      const respondeResult = result.drinks[0];
      const getIngrediente = Object.entries(respondeResult)
        .filter((ingred) => ingred[0].includes('strIngredient')
        && ingred[1] !== '' && ingred[1] !== null).map((ingred) => ingred[1]);
      setIngrediente(getIngrediente);
      const getMesure = Object.entries(respondeResult)
        .filter((mesure) => mesure[0].includes('strMeasure')
        && mesure[1] !== '' && mesure[1] !== null).map((mesure) => mesure[1]);
      setMeasure(getMesure);
      /* console.log(favoriteRecipes); */
      setFavoritesDrinks(JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
    };
    setApi();
  }, []);

  /* useEffect(() => {
    const setApiMeals = async () => {
      const numberSix = 6;
      const responseApiMeals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const result = await responseApiMeals.json();
      setApiMealsDetails(result.meals.slice(0, numberSix));
      const teste = result.meals.slice(0, numberSix);
      console.log(teste);
    }; setApiMeals();
  }, []); */

  const handleShareButton = () => {
    copy(`http://localhost:3000${history.location.pathname}`);
    setCopyMessage(true);
  };

  const handleFavoriteButton = () => {
    const newFavoritesDrinks = [...favoritesDrinks, {
      id: apiRecipeDetails?.drinks[0].idDrink,
      type: 'drink',
      nationality: '',
      category: apiRecipeDetails?.drinks[0].strCategory,
      alcoholicOrNot: apiRecipeDetails?.drinks[0].strAlcoholic,
      name: apiRecipeDetails?.drinks[0].strDrink,
      image: apiRecipeDetails?.drinks[0].strDrinkThumb }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoritesDrinks));
  };

  return (
    <div>
      <div>
        <button
          className="fixed-bottom"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleButtonDetails }
        >
          Start Recipe
        </button>
      </div>
      {copyMessage && (<p>Link copied!</p>)}
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShareButton }
      >
        <img src={ ShareIcon } alt="img share button" />
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleFavoriteButton }
      >
        Favorite
      </button>
      <br />
      <br />
      DrinkDetails:
      {
        apiRecipeDetails?.drinks !== undefined
          ? (
            <>
              <img
                data-testid="recipe-photo"
                src={ apiRecipeDetails?.drinks[0].strDrinkThumb }
                alt={ apiRecipeDetails?.drinks[0].strDrink }
              />
              <h1 data-testid="recipe-title">{apiRecipeDetails?.drinks[0].strDrink}</h1>
              <h2 data-testid="recipe-category">
                {apiRecipeDetails?.drinks[0].strAlcoholic}
              </h2>

              {ingrediente.map((ingredient, index) => (
                <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                  {ingredient}
                </p>))}

              {measure.map((ingred, index) => (
                <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                  {ingred}
                </p>))}

              <p data-testid="instructions">
                {apiRecipeDetails?.drinks[0].strInstructions}

              </p>
            </>
          ) : (<p>Loading</p>)
      }
      <MealsCarousel />
      {/* <div>
        {apiMealsDetails.map((e, index) => (
          <div key={ index }>
            <p data-testid={ `${index}-recommendation-card` } />
            <img
              src={ e.strMealThumb }
              alt="meals"
              data-testid={ `${index}-recommendation-title` }
            />
          </div>
        ))}
      </div> */}
    </div>
  );
}

DrinkDetails.propTypes = {
  history: PropTypes.shape(),
}.isRequired;
