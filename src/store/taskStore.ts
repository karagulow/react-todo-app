import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface ITask {
	id: string;
	text: string;
	completed: boolean;
}

export interface TaskStore {
	tasks: ITask[];
	addTask: (text: string) => void;
	deleteTask: (id: string) => void;
	toggleTask: (id: string) => void;
	editTask: (id: string, newText: string) => void;
	setEditingTask: (id: string | null) => void;
	editingTaskId: string | null;
	clearCompletedTasks: () => void;
}

const useTaskStore = create<TaskStore>()(
	persist(
		set => ({
			tasks: [],

			addTask: text =>
				set(state => ({
					tasks: [...state.tasks, { id: uuidv4(), text, completed: false }],
				})),

			deleteTask: id =>
				set(state => ({
					tasks: state.tasks.filter(task => task.id !== id),
				})),

			toggleTask: id =>
				set(state => ({
					tasks: state.tasks.map(task =>
						task.id === id ? { ...task, completed: !task.completed } : task
					),
				})),
			editTask: (id, newText) =>
				set(state => ({
					tasks: state.tasks.map(task =>
						task.id === id ? { ...task, text: newText } : task
					),
				})),

			setEditingTask: id =>
				set(() => ({
					editingTaskId: id,
				})),
			clearCompletedTasks: () =>
				set(state => ({
					tasks: state.tasks.filter(task => !task.completed),
				})),

			editingTaskId: null,
		}),
		{
			name: 'task-storage',
		}
	)
);

export default useTaskStore;
