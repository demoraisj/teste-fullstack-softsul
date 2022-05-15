import type { FC, Ref } from 'react';

type Props = {
	name: string;
	label: string;
	value: string | number;
	type: string;
	setter: (value: string | number) => void;
	autoComplete?: string;
	required?: boolean;
	ref?: Ref<any>;
};

const Input: FC<Props> = (props) => {
	const { name, label, value, type, setter, ref, autoComplete, required } = props;

	return (
		<div>
			<label htmlFor={name} className="block text-sm font-medium text-gray-700">
				{label}
			</label>
			<div className="mt-1">
				<input
					ref={ref}
					type={type}
					name={name}
					id={name}
					value={value}
					autoComplete={autoComplete}
					required={required}
					onChange={(e) => setter(e.target.value)}
					className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
				/>
			</div>
		</div>
	);
};

Input.defaultProps = {
	autoComplete: 'off',
	required: false,
	ref: undefined,
};

export default Input;
