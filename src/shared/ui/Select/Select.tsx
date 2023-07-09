import { ChangeEvent, useMemo } from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOption<T extends string> {
	value: T;
	content: string;
}

interface SelectProps<T extends string> {
	className?: string;
	label?: string;
	readOnly?: boolean;
	options?: SelectOption<T>[];
	value?: T;
	onChange?: (value: T) => void;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
	const { className, label, options, value, onChange, readOnly } = props;

	const optionsList = useMemo(() => {
		return options?.map((opt) => (
			<option key={opt.value} className={cls.option} value={opt.value}>
				{opt.content}
			</option>
		));
	}, [options]);

	const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		onChange?.(e.target.value as T);
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
};
