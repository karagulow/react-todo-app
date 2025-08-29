import { Check } from 'lucide-react';
import React, { memo } from 'react';

interface CheckboxProps {
	checked: boolean;
	onChange: () => void;
}

export const Checkbox: React.FC<CheckboxProps> = memo(
	({ checked, onChange }) => {
		return (
			<label
				className='flex items-center justify-center cursor-pointer size-5 min-h-5 min-w-5 rounded-sm border-[#3a3a3a] border-[2px] group transition-colors'
				onClick={onChange}
				role='checkbox'
				aria-checked={checked}
			>
				<Check
					className={`opacity-0 group-hover:opacity-100 ${
						checked ? 'opacity-100' : ''
					} transition-opacity duration-200`}
					size={14}
					color='#3a3a3a'
				/>
			</label>
		);
	}
);
