import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Todo App title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Todo App/i);
  expect(titleElement).toBeInTheDocument();
});

test('can add a new task', () => {
  render(<App />);
  
  const inputElement = screen.getByPlaceholderText(/Enter a new task/i);
  const addButton = screen.getByText(/Add Task/i);
  
  // Simulate user typing a new task
  fireEvent.change(inputElement, { target: { value: 'Learn testing' } });
  expect(inputElement.value).toBe('Learn testing');
  
  // Simulate user clicking the add button
  fireEvent.click(addButton);
  
  // Check if the new task is added to the list
  const taskElement = screen.getByText(/Learn testing/i);
  expect(taskElement).toBeInTheDocument();
});

test('can delete a task', () => {
  render(<App />);
  
  const inputElement = screen.getByPlaceholderText(/Enter a new task/i);
  const addButton = screen.getByText(/Add Task/i);
  
  // Ajouter une nouvelle tache 
  fireEvent.change(inputElement, { target: { value: 'Learn testing' } });
  fireEvent.click(addButton);
  
  // Je vérifie si la tache est ajouté à la liste 
  const taskElement = screen.getByText(/Learn testing/i);
  expect(taskElement).toBeInTheDocument();
  
  // Simulation de l'utilisateur cliquant sur le button delete
  const deleteButton = screen.getByText(/Delete/i);
  fireEvent.click(deleteButton);
  
  // Vérifie si la tache est supprimer de la liste 
  expect(taskElement).not.toBeInTheDocument();
});
