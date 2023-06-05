import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './styles/index.scss';
import { Link } from 'react-router-dom';
import { MainPageAsync } from './pages/MainPage/MainPage.async';
import { AboutPageAsync } from './pages/AboutPage/AboutPage.async';
import useTheme from './theme/useTheme';
import { classNames } from './helpers/classNames/classNames';

export const App = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<div className={classNames('app', {}, [theme])}>
			<button onClick={toggleTheme}>TOGGLE</button>
			<Link to="/">Main page</Link>
			<Link to="/about">About page</Link>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/" element={<MainPageAsync />} />
					<Route path="/about" element={<AboutPageAsync />} />
				</Routes>
			</Suspense>
		</div>
	);
};
