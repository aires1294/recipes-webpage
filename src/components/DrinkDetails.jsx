import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import myContext from '../context/myContext';

export default function DrinkDetails() {
//   const { apiMealsDetails, setApiMealsDetails } = useContext(myContext);
  const { apiRecipeDetails, setApiRecipeDetails } = useContext(myContext);
  const paramsUrl = useParams();
  const [ingrediente, setIngrediente] = useState([]);
  const [measure, setMeasure] = useState([]);

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
    };
    setApi();
  }, []);

  return (
    <div>
      DrinkDetails
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
    </div>
  );
}
