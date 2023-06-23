import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';
import { ChangeEvent, memo, useMemo } from 'react';

export interface SelectOption {
	value: string;
	content: string;
}

interface SelectProps {
	className?: string;
	label?: string;
	readOnly?: boolean;
	options?: SelectOption[];
	value?: string;
	onChange?: (value: string) => void;
}

export const Select = memo((props: SelectProps) => {
	const { className, label, options, value, onChange, readOnly } = props;

	const optionsList = useMemo(() => {
		return options?.map((opt) => (
			<option key={opt.value} className={cls.option} value={opt.value}>
				{opt.content}
			</option>
		));
	}, [options]);

	const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		onChange?.(e.target.value);
	};

	const mods: Mods = {
		[cls.readOnly]: readOnly,
	};

	return (
		<div className={classNames(cls.Wrapper, mods, [className])}>
			{label && <span className={cls.label}>{label + '>'}</span>}
			<select
				className={cls.select}
				value={value}
				onChange={onChangeHandler}
				disabled={readOnly}
			>
				{optionsList}
			</select>
		</div>
	);
});
