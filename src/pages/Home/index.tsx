import { useMemo, useState } from 'react';
import { AddTask, Container, Tabs, TaskList, Title } from '../../components';
import useTaskStore from '../../store/taskStore';

export const Home = () => {
	const tabs = ['All', 'Active', 'Completed'];
	const [activeTab, setActiveTab] = useState(tabs[0]);
	const { tasks, clearCompletedTasks } = useTaskStore();

	const filteredTasks = useMemo(() => {
		return tasks.filter(task => {
			if (activeTab === 'All') return true;
			if (activeTab === 'Active') return !task.completed;
			return task.completed;
		});
	}, [tasks, activeTab]);

	const activeTasksCount = useMemo(() => {
		return tasks.filter(task => !task.completed).length;
	}, [tasks]);

	return (
		<Container>
			<div className='flex flex-col h-screen py-5 gap-5'>
				<Title text='ToDo App' size='lg' className='text-center' />

				<div className='flex flex-col gap-5 w-full p-4 sm:p-7.5 bg-[#262626] rounded-[10px] sm:rounded-[20px] flex-grow overflow-hidden'>
					<AddTask />
					<Tabs
						items={tabs}
						activeItem={activeTab}
						setActiveItem={setActiveTab}
					/>
					<div className='flex-grow overflow-y-auto custom-scrollbar'>
						{filteredTasks.length > 0 ? (
							<TaskList tasks={filteredTasks} />
						) : (
							<p className='font-medium text-[16px] text-[#8d8d8d] text-center'>
								The list is empty
							</p>
						)}
					</div>
					<div className='flex flex-row justify-between items-center shrink-0'>
						<p className='font-medium text-[16px] text-[#8d8d8d]'>
							{activeTasksCount} items left
						</p>
						<button
							className='font-medium text-[16px] text-[#8d8d8d] cursor-pointer hover:text-[#eee] transition-all duration-100'
							type='button'
							onClick={clearCompletedTasks}
						>
							Clear completed
						</button>
					</div>
				</div>
			</div>
		</Container>
	);
};
