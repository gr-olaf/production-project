import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import React, {
	InputHTMLAttributes,
	memo,
	useEffect,
	useRef,
	useState,
} from 'react';

type HTMLInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string | number;
	onChange?: (value: string) => void;
	autoFocus?: boolean;
	readOnly?: boolean;
}

export const Input = memo((props: InputProps) => {
	const {
		className,
		value,
		onChange,
		type = 'text',
		placeholder,
		autoFocus,
		readOnly,
		...otherProps
	} = props;

	const ref = useRef<HTMLInputElement>(null);
	const [isFocused, setIsFocused] = useState(false);
	const [caretPosition, setCaretPosition] = useState(0);

	const isCaretVisible = isFocused && !readOnly;

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
		setCaretPosition(e.target.value.length);
	};

	const onBlur = () => {
		setIsFocused(false);
	};

	const onFocus = () => {
		setIsFocused(true);
	};

	const onSelect = (e: any) => {
		setCaretPosition(e?.target?.selectionStart || 0);
	};

	useEffect(() => {
		if (autoFocus) {
			setIsFocused(true);
			ref.current?.focus();
		}
	}, [autoFocus]);

	const mods: Mods = {
		[cls.readOnly]: readOnly,
	};

	return (
		<div className={classNames(cls.InputWrapper, mods, [className])}>
			{placeholder && (
				<div className={cls.placeholder}>{placeholder + '>'}</div>
			)}
			<div className={cls.caretWrapper}>
				<input
					ref={ref}
					readOnly={readOnly}
					className={cls.input}
					type={type}
					value={value}
					onChange={onChangeHandler}
					onFocus={onFocus}
					onBlur={onBlur}
					onSelect={onSelect}
					autoFocus
					{...otherProps}
				/>
				{isCaretVisible && (
					<span className={cls.caret} style={{ left: `${caretPosition}ch` }}>
						&nbsp;
					</span>
				)}
			</div>
		</div>
	);
});
