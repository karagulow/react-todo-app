import { Check } from 'lucide-react';
import { memo } from 'react';

interface CheckButtonProps {
	onClick: () => void;
	size?: number;
}

export const CheckButton: React.FC<CheckButtonProps> = memo(
	({ size = 18, onClick }) => {
		return (
			<button type='button' className='cursor-pointer'>
				<Check
					size={size}
					className='text-[#3a3a3a] hover:text-green-300 transition-all duration-100'
					onClick={onClick}
				/>
			</button>
		);
	}
);
