import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';
// import Provider from '../context/myProvider';
import { categoriesDrinks, categoriesMeals } from './mocks/categoriesMock';

describe('Testando o componente Recipes', () => {
  test('Verificando as botões de acesso ', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/meals'); });
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const subimtButton = screen.getByTestId('login-submit-btn');
    const profileTopBtn = screen.getByTestId('profile-top-btn');
    const searchTopBtn = screen.getByTestId('search-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    userEvent.type(emailInput, 'email@teste.com');
    userEvent.type(passwordInput, '123456');
    userEvent.click(subimtButton);
    expect(profileTopBtn).toBeInTheDocument();
    expect(searchTopBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
  test('Verificando as 5 categorias de drinks ', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => categoriesDrinks,
    }));
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/drinks'); });
    const categoryDrink = await screen.findByText(/cocoa/i);
    expect(categoryDrink).toBeInTheDocument();
  });
  test('Verificando as 5 categorias de meals ', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => categoriesMeals,
    }));
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/meals'); });
    const categoryMeals = await screen.findByText(/beef/i);
    expect(categoryMeals).toBeInTheDocument();
  });
});
