import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Home } from './';
import useTaskStore from '../../store/taskStore';

beforeEach(() => {
	useTaskStore.setState({ tasks: [] });
});

describe('Todo App', () => {
	it('добавление задачи через Enter и кнопку', () => {
		render(<Home />);

		const input = screen.getByPlaceholderText('Add new task...');

		fireEvent.change(input, { target: { value: 'Купить хлеб' } });
		fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
		expect(screen.getByText('Купить хлеб')).toBeInTheDocument();

		fireEvent.change(input, { target: { value: 'Сходить в спортзал' } });
		const addButton = screen.getByRole('button', { name: /add task/i });
		fireEvent.click(addButton);
		expect(screen.getByText('Сходить в спортзал')).toBeInTheDocument();
	});

	it('переключение completed и фильтры вкладок', () => {
		render(<Home />);

		const input = screen.getByPlaceholderText('Add new task...');
		fireEvent.change(input, { target: { value: 'Купить молоко' } });
		fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

		const checkbox = screen.getByRole('checkbox');
		fireEvent.click(checkbox);

		const taskText = screen.getByText('Купить молоко');
		expect(taskText).toHaveClass('line-through');

		const completedTab = screen.getByText('Completed');
		fireEvent.click(completedTab);
		expect(screen.getByText('Купить молоко')).toBeInTheDocument();

		const activeTab = screen.getByText('Active');
		fireEvent.click(activeTab);
		expect(screen.queryByText('Купить молоко')).not.toBeInTheDocument();
	});

	it('счётчик оставшихся и Clear completed', () => {
		render(<Home />);

		const input = screen.getByPlaceholderText('Add new task...');

		fireEvent.change(input, { target: { value: 'Задача 1' } });
		fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

		fireEvent.change(input, { target: { value: 'Задача 2' } });
		fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

		expect(screen.getByText('2 items left')).toBeInTheDocument();

		const checkboxes = screen.getAllByRole('checkbox');
		fireEvent.click(checkboxes[0]);

		expect(screen.getByText('1 items left')).toBeInTheDocument();

		const clearButton = screen.getByText('Clear completed');
		fireEvent.click(clearButton);

		expect(screen.queryByText('Задача 1')).not.toBeInTheDocument();
		expect(screen.getByText('1 items left')).toBeInTheDocument();
	});
});
