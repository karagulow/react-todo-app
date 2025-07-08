import { SquarePen } from 'lucide-react';
import { memo } from 'react';

interface EditButtonProps {
	onClick: () => void;
	size?: number;
}

export const EditButton: React.FC<EditButtonProps> = memo(
	({ size = 18, onClick }) => {
		return (
			<button type='button' className='cursor-pointer'>
				<SquarePen
					size={size}
					className='text-[#3a3a3a] hover:text-[#525252] transition-all duration-100'
					onClick={onClick}
				/>
			</button>
		);
	}
);
