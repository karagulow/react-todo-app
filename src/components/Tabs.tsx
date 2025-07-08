import { motion } from 'framer-motion';
import { memo } from 'react';

interface TabsProps {
	items: string[];
	activeItem: string;
	setActiveItem: (item: string) => void;
}

export const Tabs: React.FC<TabsProps> = memo(
	({ items, activeItem, setActiveItem }) => {
		return (
			<div className='relative shrink-0 w-full overflow-x-auto'>
				<div className='flex flex-row items-center justify-between gap-1.5 bg-[#191919] rounded-[8px] p-1 w-full mx-auto'>
					{items.map((item, index) => {
						const isActive = activeItem === item;

						return (
							<button
								key={index}
								className='relative w-full px-3 py-1 font-medium text-[14px] cursor-pointer group whitespace-nowrap'
								onClick={() => setActiveItem(item)}
							>
								{isActive && (
									<motion.div
										layoutId={`active-indicator`}
										className='absolute w-full inset-0 bg-[#262626] rounded-[6px] z-9'
										transition={{ type: 'spring', stiffness: 500, damping: 50 }}
									/>
								)}

								<span
									className={`relative z-9 transition group-hover:text-[#eee] ${
										isActive ? 'text-[#eee]' : 'text-[#8d8d8d]'
									}`}
								>
									{item}
								</span>
							</button>
						);
					})}
				</div>
			</div>
		);
	}
);
