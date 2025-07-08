import React, { memo } from 'react';
import { cn } from '../lib/utils';
import type { ITask } from '../store/taskStore';
import { TaskItem } from './TaskItem';

interface Props {
	className?: string;
	tasks: ITask[];
}

export const TaskList: React.FC<React.PropsWithChildren<Props>> = memo(
	({ className, tasks }) => {
		return (
			<ul className={cn('flex flex-col gap-2 w-full', className)}>
				{tasks.map(task => (
					<TaskItem key={task.id} task={task} />
				))}
			</ul>
		);
	}
);
