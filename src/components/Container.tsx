import React from 'react';
import { cn } from '../lib/utils';

interface ContainerProps {
	children: React.ReactNode;
	className?: string;
}

export const Container: React.FC<ContainerProps> = ({
	children,
	className,
}) => {
	return (
		<div className={cn('max-w-[640px] w-full px-5 mx-auto', className)}>
			{children}
		</div>
	);
};
