import React, { memo, useState } from 'react';
import { Plus } from 'lucide-react';
import useTaskStore from '../store/taskStore';

const PlusIcon = memo(() => <Plus />);

export const AddTask: React.FC = memo(() => {
	const addTask = useTaskStore(state => state.addTask);

	const [taskText, setTaskText] = useState('');

	const handleAddTask = () => {
		if (taskText.trim() === '') return;
		addTask(taskText);
		setTaskText('');
	};

	const handleTaskTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTaskText(e.target.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleAddTask();
		}
	};

	return (
		<div className='flex flex-row items-center gap-[10px] w-full'>
			<input
				className='w-full h-10 rounded-lg bg-[#191919] border-[2px] border-[#3a3a3a] px-4 text-4 font-regular text-[#eee] placeholder:text-[#8d8d8d] outline-none'
				type='text'
				placeholder='Add new task...'
				value={taskText}
				onChange={handleTaskTextChange}
				onKeyDown={handleKeyDown}
			/>
			<button
				className='flex justify-center items-center size-9 min-h-10 min-w-10 rounded-lg bg-[#eee] hover:opacity-80 duration-200 active:scale-95'
				type='button'
				aria-label='add task'
				onClick={handleAddTask}
			>
				<PlusIcon />
			</button>
		</div>
	);
});
