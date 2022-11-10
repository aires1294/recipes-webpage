import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Provider from './context/myProvider';
import Login from './Pages/Login';
import Meals from './Pages/Meals';
import Profile from './Pages/Profile';
import Drinks from './Pages/Drinks';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import MealDetails from './components/MealDetails';
import DrinkDetails from './components/DrinkDetails';
import RecipeInProgress from './Pages/RecipeInProgress';
import RecipeDetails from './Pages/RecipeDetails';

function App() {
  return (
    /* <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
    </div> */
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ DrinkDetails } />
        <Route exact path="/meals/:id" component={ MealDetails } />
        <Route
          exact
          path="/meals/:id/in-progress"
          component={ RecipeInProgress }
        />
        <Route
          path="/drinks/:id/in-progress"
          component={ RecipeInProgress }
        />
      </Switch>
    </Provider>
  );
}

export default App;
