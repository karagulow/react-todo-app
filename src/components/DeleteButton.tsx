import { Trash } from 'lucide-react';
import { memo } from 'react';

interface DeleteButtonProps {
	onClick: () => void;
	size?: number;
}

export const DeleteButton: React.FC<DeleteButtonProps> = memo(
	({ size = 18, onClick }) => {
		return (
			<button type='button' className='cursor-pointer'>
				<Trash
					size={size}
					className='text-[#3a3a3a] hover:text-red-400 transition-all duration-100'
					onClick={onClick}
				/>
			</button>
		);
	}
);
