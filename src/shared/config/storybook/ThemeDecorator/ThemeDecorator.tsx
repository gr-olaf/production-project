import { Theme } from 'app/providers/ThemeProvider';
import 'app/styles/index.scss';
import { ReactNode } from 'react';

interface ThemeDecoratorProps {
	children?: ReactNode;
	theme: Theme;
}

const ThemeDecorator = ({ children, theme }: ThemeDecoratorProps) => {
	return <div className={`app ${theme}`}>{children}</div>;
};

export default ThemeDecorator;
