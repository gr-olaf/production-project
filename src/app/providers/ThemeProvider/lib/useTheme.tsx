import { useContext, useEffect } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

interface UseThemeResult {
	toggleTheme: () => void;
	theme: Theme;
}

const useTheme = (): UseThemeResult => {
	const { theme, setTheme } = useContext(ThemeContext);

	const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;

	const toggleTheme = () => {
		setTheme(newTheme);
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
	};

	useEffect(() => {
		document.body.className = newTheme;
	}, [newTheme]);

	return { theme, toggleTheme };
};

export default useTheme;
