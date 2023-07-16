import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from '../Button/Button';
import cls from './ListBox.module.scss';

export interface ListBoxItem {
	value: string;
	content: ReactNode;
	disabled?: boolean;
}

interface ListBoxProps {
	items: ListBoxItem[];
	className?: string;
	value?: string;
	defaultValue?: string;
	onChange: (value: string) => void;
	readonly?: boolean;
}

export const ListBox = (props: ListBoxProps) => {
	const { items, className, value, defaultValue, onChange, readonly } = props;

	return (
		<HListBox
			as={'div'}
			disabled={readonly}
			className={classNames(cls.ListBox, {}, [className])}
			value={value}
			onChange={onChange}
		>
			<HListBox.Button className={cls.trigger}>
				<Button>{value ?? defaultValue}</Button>
			</HListBox.Button>
			<HListBox.Options className={cls.options}>
				{items.map((item) => (
					<HListBox.Option
						key={item.value}
						value={item.value}
						disabled={item.disabled}
						as={Fragment}
					>
						{({ active, selected }) => (
							<li
								className={classNames(cls.item, {
									[cls.active]: active,
									[cls.disabled]: item.disabled,
								})}
							>
								{selected && '!!!'}
								{item.content}
							</li>
						)}
					</HListBox.Option>
				))}
			</HListBox.Options>
		</HListBox>
	);
};
