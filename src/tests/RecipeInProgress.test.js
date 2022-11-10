import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

describe('Testando o componente Recipes In Progress', () => {
  test('Verificando as configurações das fotos no meals ', async () => {
    // renderWithRouter(<App />);
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/meals/52977/in-progress'); });
    const recipePhoto = screen.getByTestId('recipe-photo');
    const recipeTitle = screen.getByTestId('recipe-title');
    const shareBtn = screen.getByTestId('share-btn');
    const favoriteBtn = screen.getByTestId('favorite-btn');
    const recipeCategory = screen.getByTestId('recipe-category');
    const instructions = screen.getByTestId('instructions');
    const finishRecipe = screen.getByTestId('finish-recipe-btn');
    const ingredientStep = screen.getByTestId(/ingredient-step/i);
    expect(recipePhoto).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    userEvent.type(shareBtn);
    userEvent.type(favoriteBtn);
    expect(recipeCategory).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(finishRecipe).toBeInTheDocument();
    expect(ingredientStep).toBeInTheDocument();
  });
  test('Verificando as configurações das fotos no drinks ', async () => {
    // renderWithRouter(<App />);
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/drinks/15997/in-progress'); });
    const recipePhoto = screen.getByTestId('recipe-photo');
    const recipeTitle = screen.getByTestId('recipe-title');
    const shareBtn = screen.getByTestId('share-btn');
    const favoriteBtn = screen.getByTestId('favorite-btn');
    const recipeCategory = screen.getByTestId('recipe-category');
    const instructions = screen.getByTestId('instructions');
    const finishRecipe = screen.getByTestId('finish-recipe-btn');
    const ingredientStep = screen.getByTestId(/ingredient-step/i);
    expect(recipePhoto).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    userEvent.type(shareBtn);
    userEvent.type(favoriteBtn);
    expect(recipeCategory).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(finishRecipe).toBeInTheDocument();
    expect(ingredientStep).toBeInTheDocument();
  });
  test('V ', async () => {
    // renderWithRouter(<App />);
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/drinks/15997/in-progress'); });
    const texto = screen.getByAltText('Finish Recipe');
    expect(texto).toBeInTheDocument();
  });
});
