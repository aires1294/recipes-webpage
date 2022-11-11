import React, { useContext, useEffect } from 'react';
import myContext from '../context/myContext';

export default function MealsCarousel() {
  const { apiMealsDetails, setApiMealsDetails } = useContext(myContext);

  useEffect(() => {
    const setApiMeals = async () => {
      const numberSix = 6;
      const responseApiMeals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      /* console.log(responseApi); */
      const result = await responseApiMeals.json();
      setApiMealsDetails(result.meals.slice(0, numberSix));
    }; setApiMeals();
  }, []);

  return (
    <div>
      MealsCarousel
      <div style={ { overflowX: 'scroll', display: 'flex' } }>
        {apiMealsDetails.map((e, index) => (
          <div
            style={ { width: '51%' } }
            key={ index }
            data-testid={ `${index}-recommendation-card` }
          >
            <img
              src={ e.strMealThumb }
              alt="meals"
            />
            <p data-testid={ `${index}-recommendation-title` }>{e.strMeal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
