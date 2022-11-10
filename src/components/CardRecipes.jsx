import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { setItem, getItem } from '../services/converterLocalStorage';
import myContext from '../context/myContext';
import heartWhite from '../images/whiteHeartIcon.svg';
import heartBlack from '../images/blackHeartIcon.svg';
import clickFavorite from '../services/favoriteFunction';
import '../RecipeInProgress.css';

const copy = require('clipboard-copy');

function CardRecipes() {
  const [clipboard, setClipBoard] = useState();
  const {
    recipeId,
    favoriteRecipes,
    setFavoriteRecipes,
    doneRecipes,
    setDoneRecipes,
  } = useContext(myContext);

  const { pathname } = useLocation();

  const { id } = useParams();
  console.log(useParams());

  const { push } = useHistory();

  const [management, setManagement] = useState(false);
  const [data, setData] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [type, setType] = useState('');
  const [check, setCheck] = useState([]);

  useEffect(() => {
    const comparationFunction = async () => {
      let typeFood = '';
      let dataFood = {};
      const operationAsync = async () => {
        if (pathname.includes('drinks')) {
          typeFood = 'drinks';
          setType(typeFood);
          dataFood = await recipeId(id, typeFood);
          setData(dataFood);
        } else {
          typeFood = 'meals';
          setType(typeFood);
          dataFood = await recipeId(id, typeFood);
          setData(dataFood);
        }
      };
      await operationAsync();
      if (dataFood !== undefined && !management) {
        setManagement(true);
        const dataIngredientsKeys = Object.keys(dataFood)
          .filter((e) => e.includes('strIngredient'));
        const ingredientFiltered = dataIngredientsKeys
          .filter((e) => dataFood[e] !== null);
        const emptyFilter = ingredientFiltered.filter((e) => dataFood[e] !== '');
        setIngredients(emptyFilter);
      }
    };
    comparationFunction();
  }, [pathname, recipeId, id, management]);

  useEffect(() => {
    const localInProgressRecipes = getItem('inProgressRecipes');
    if (type !== '' && localInProgressRecipes[type][id]) {
      setCheck(localInProgressRecipes[type][id]);
    }
  }, [id, type]);

  const handleCheck = (ingredient) => {
    const returnLocalStorage = getItem('inProgressRecipes');
    if (!check.some((e) => e === ingredient)) {
      const localObject = {
        ...returnLocalStorage,
        [type]: { ...returnLocalStorage[type], [id]: [...check, ingredient] },
      };
      setItem('inProgressRecipes', localObject);
      setCheck([...check, ingredient]);
    } else {
      const localObject = {
        ...returnLocalStorage,
        [type]: {
          ...returnLocalStorage[type],
          [id]: check.filter((e) => e !== ingredient),
        },
      };
      setItem('inProgressRecipes', localObject);
      setCheck(check.filter((e) => e !== ingredient));
    }
  };

  const clickClipBoard = async () => {
    try {
      setClipBoard(true);
      let endPoint = `http://localhost:3000${pathname}`;
      endPoint = endPoint.replace('/in-progress', '');
      await copy(endPoint);
    } catch (error) {
      console.log(error);
      setClipBoard(false);
    }
  };
  const ingredientCondition = ingredients.length !== 0
    ? ingredients.length === check.length : false;

  const handleClick = () => {
    if (type === 'drinks') {
      const condition = doneRecipes.every((e) => +e.id !== +id);
      if (condition) {
        setDoneRecipes([...doneRecipes, {
          id: data.idDrink,
          nationality: '',
          name: data.strDrink,
          category: data.strCategory,
          image: data.strDrinkThumb,
          tags: data.strTags ? data.strTags.split(',') : [],
          alcoholicOrNot: data.strAlcoholic,
          type: type.replace('s', ''),
          doneDate: new Date().toISOString(),
        }]);
      }
    } else {
      const condition = !doneRecipes.some((e) => +e.idMeal === +id);
      if (condition) {
        setDoneRecipes([...doneRecipes, {
          id: data.idMeal,
          nationality: data.strArea,
          name: data.strMeal,
          category: data.strCategory,
          image: data.strMealThumb,
          tags: data.strTags.split(','),
          alcoholicOrNot: '',
          type: type.replace('s', ''),
          doneDate: new Date().toISOString(),
        }]);
      }
    }
    push('/done-recipes');
  };
  return (
    <div>
      {
        clipboard && <div data-testid="msg_copy_sucess">Link copied!</div>
      }
      <button type="button" onClick={ clickClipBoard } data-testid="share-btn">
        Compartilhar
      </button>
      <button
        type="button"
        onClick={ () => (
          clickFavorite({ favoriteRecipes, setFavoriteRecipes, data, type, id })) }
      >
        <img
          data-testid="favorite-btn"
          src={ favoriteRecipes.some((e) => e.id === id) ? heartBlack : heartWhite }
          alt={ id }
        />
      </button>
      {
        data !== undefined
          && (
            pathname.includes('drinks') ? (
              <section>
                <h1 data-testid="recipe-title">{ data.strGlass }</h1>
                <h3 data-testid="recipe-category">{ data.strCategory }</h3>
                <h5>{ data.strAlcoholic }</h5>
                <img
                  data-testid="recipe-photo"
                  src={ data.strDrinkThumb }
                  alt={ data.strDrink }
                />
                <section>
                  {
                    ingredients.map((steps, index) => (
                      <label
                        className={ check
                          .some((e) => e === data[steps]) ? 'checked' : undefined }
                        key={ index }
                        htmlFor={ `${index} - check` }
                        data-testid={ `${index}-ingredient-step` }
                      >
                        { data[steps] }
                        <input
                          type="checkbox"
                          id={ `${index} - check` }
                          onChange={ () => handleCheck(data[steps]) }
                          checked={ check.some((e) => e === data[steps]) }
                        />
                      </label>
                    ))
                  }
                </section>
                <p data-testid="instructions">{ data.strInstructions }</p>
              </section>
            ) : (
              <section>
                <h1 data-testid="recipe-title">{ data.strMeal }</h1>
                <h3 data-testid="recipe-category">{ data.strCategory }</h3>
                <img
                  data-testid="recipe-photo"
                  src={ data.strMealThumb }
                  alt={ data.strMeal }
                />
                <section>
                  {
                    ingredients.map((mealStep, index) => (
                      <label
                        className={ check
                          .some((e) => e === data[mealStep]) ? 'checked' : undefined }
                        key={ index }
                        htmlFor={ `${index} - check` }
                        data-testid={ `${index}-ingredient-step` }
                      >
                        { data[mealStep] }
                        <input
                          type="checkbox"
                          id={ `${index} - check` }
                          onChange={ () => handleCheck(data[mealStep]) }
                          checked={ check.some((e) => e === data[mealStep]) }
                        />
                      </label>
                    ))
                  }
                </section>

                <p data-testid="instructions">
                  { data.strInstructions }
                </p>
              </section>
            )
          )
      }
      <button
        type="button"
        data-testid="finish-recipe-btn"
        className="finish"
        disabled={ !ingredientCondition }
        onClick={ handleClick }
      >
        Finish Recipe
      </button>
    </div>
  );
}
export default CardRecipes;
