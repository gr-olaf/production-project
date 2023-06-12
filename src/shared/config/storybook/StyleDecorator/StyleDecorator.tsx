import 'app/styles/index.scss';
import { FC } from 'react';

const StyleDecorator: FC = ({ children }) => {
	return <div>{children}</div>;
};

export default StyleDecorator;
