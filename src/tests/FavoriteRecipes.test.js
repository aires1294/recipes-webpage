import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

describe('Testando o componente Favorite', () => {
  test('Verificando os data-testid ', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push(favoriteRecipes); });
    const all = screen.getByTestId('filter-by-all-btn');
    const meal = screen.getByTestId('filter-by-meal-btn');
    const drink = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(all);
    userEvent.click(drink);
    expect(all).toBeInTheDocument();
    expect(meal).toBeInTheDocument();
    expect(drink).toBeInTheDocument();
  });
  test('Verificando as imagens', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push(favoriteRecipes); });
    const getFavBtn = await screen.findByTestId('0-horizontal-favorite-btn');
    const getBtn = screen.getByRole('button', { name: /all/i });
    expect(getBtn).toBeInTheDocument();
    userEvent.click(getFavBtn);
  });
});
