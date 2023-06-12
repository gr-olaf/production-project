import 'app/styles/index.scss';
import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

interface RouterDecoratorProps {
	children?: ReactNode;
}

const RouterDecorator = ({ children }: RouterDecoratorProps) => {
	return <BrowserRouter>{children}</BrowserRouter>;
};

export default RouterDecorator;
