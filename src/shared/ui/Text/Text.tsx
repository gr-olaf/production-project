import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';
import { memo } from 'react';

export enum TextTheme {
	PRIMARY = 'primary',
	INVERTED = 'inverted',
	ERROR = 'error',
}

export enum TextAlign {
	CENTER = 'center',
	LEFT = 'left',
	RIGHT = 'right',
}

export enum TextSize {
	S = 'size_s',
	M = 'size_m',
	L = 'size_l',
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
	[TextSize.S]: 'h3',
	[TextSize.M]: 'h2',
	[TextSize.L]: 'h1',
};

interface TextProps {
	className?: string;
	title?: string;
	text?: string;
	theme?: TextTheme;
	align?: TextAlign;
	size?: TextSize;
}

export const Text = memo((props: TextProps) => {
	const {
		className,
		title,
		text,
		theme = TextTheme.PRIMARY,
		align = TextAlign.LEFT,
		size = TextSize.M,
	} = props;

	const HeaderTag = mapSizeToHeaderTag[size];

	const classNamesList = [className, cls[theme], cls[align], cls[size]];

	return (
		<div className={classNames(cls.Text, {}, classNamesList)}>
			{title && <HeaderTag className={cls.title}>{title}</HeaderTag>}
			{text && <p className={cls.text}>{text}</p>}
		</div>
	);
});
