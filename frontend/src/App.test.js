import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Welcome to TuCoach AI/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('renders start interview button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Start Interview/i);
  expect(buttonElement).toBeInTheDocument();
});