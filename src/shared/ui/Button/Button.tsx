import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';
import { ButtonHTMLAttributes, ReactNode, memo } from 'react';

export enum ButtonTheme {
	CLEAR = 'clear',
	CLEAR_INVERTED = 'clearInverted',
	OUTLINE = 'outline',
	OUTLINE_RED = 'outlineRed',
	BACKGROUND = 'background',
	BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
	M = 'size_m',
	L = 'size_l',
	XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	/**
	 * Тема кнопки. Отвечает за визуал (в рамке, без стилей, противоположный теме приложения цвет и тд)
	 */
	theme?: ButtonTheme;
	/**
	 * Флаг, делающий кнопку квадратной
	 */
	square?: boolean;
	/**
	 * Флаг, делающий кнопку квадратной
	 */
	size?: ButtonSize;
	/**
	 * Флаг, отвечающий за работу кнопки
	 */
	disabled?: boolean;
	children?: ReactNode;
	/**
	 * Увеличивает кнопку на всю свободную ширину
	 */
	fullWidth?: boolean;
}

export const Button = memo((props: ButtonProps) => {
	const {
		className,
		children,
		theme = ButtonTheme.OUTLINE,
		square,
		size = ButtonSize.M,
		disabled,
		fullWidth,
		...otherProps
	} = props;

	const mods: Mods = {
		[cls.square]: square,
		[cls.disabled]: disabled,
		[cls.fullWidth]: fullWidth,
	};

	return (
		<button
			disabled={disabled}
			className={classNames(cls.Button, mods, [
				className,
				cls[theme],
				cls[size],
			])}
			{...otherProps}
		>
			{children}
		</button>
	);
});
