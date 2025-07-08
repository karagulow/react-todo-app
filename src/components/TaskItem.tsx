import React, { memo, useState } from 'react';
import { cn } from '../lib/utils';
import useTaskStore, { type ITask } from '../store/taskStore';
import { Checkbox } from './Checkbox';
import { DeleteButton } from './DeleteButton';
import { CheckButton } from './CheckButton';
import { EditButton } from './EditButton';

interface Props {
	className?: string;
	task: ITask;
}

export const TaskItem: React.FC<React.PropsWithChildren<Props>> = memo(
	({ className, task }) => {
		const toggleTask = useTaskStore(state => state.toggleTask);
		const deleteTask = useTaskStore(state => state.deleteTask);
		const editTask = useTaskStore(state => state.editTask);
		const setEditingTask = useTaskStore(state => state.setEditingTask);
		const editingTaskId = useTaskStore(state => state.editingTaskId);

		const isEditing = editingTaskId === task.id;
		const [newText, setNewText] = useState(task.text);

		const handleEdit = () => {
			editTask(task.id, newText);
			setEditingTask(null);
		};

		const handleKeyDown = (e: React.KeyboardEvent) => {
			if (e.key === 'Enter') {
				handleEdit();
			}
		};

		return (
			<li
				className={cn(
					'flex flex-row justify-between gap-3 items-center w-full bg-[#191919] rounded-lg p-4',
					className
				)}
				key={task.id}
			>
				<div className='flex flex-row items-center gap-3 font-medium text-[16px] text-[#eee]'>
					<Checkbox
						checked={task.completed}
						onChange={() => toggleTask(task.id)}
					/>
					{isEditing ? (
						<input
							type='text'
							value={newText}
							onChange={e => setNewText(e.target.value)}
							className='bg-transparent w-full outline-none'
							onKeyDown={handleKeyDown}
						/>
					) : (
						<span
							className={task.completed ? 'line-through text-[#8d8d8d]' : ''}
						>
							{task.text}
						</span>
					)}
				</div>

				<div className='flex items-center gap-2'>
					{isEditing ? (
						<CheckButton size={18} onClick={handleEdit} />
					) : (
						<EditButton size={18} onClick={() => setEditingTask(task.id)} />
					)}
					<DeleteButton size={18} onClick={() => deleteTask(task.id)} />
				</div>
			</li>
		);
	}
);
