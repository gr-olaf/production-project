import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

interface LangSwitcherProps {
	className?: string;
	short?: boolean;
}

export const LangSwitcher = ({ className, short }: LangSwitcherProps) => {
	const { t, i18n } = useTranslation('translation');

	const toggle = async () => {
		i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
	};

	return (
		<Button
			theme={ButtonTheme.CLEAR_INVERTED}
			onClick={toggle}
			className={classNames('', {}, [className])}
		>
			{t(short ? 'Короткий язык' : 'Язык')}
		</Button>
	);
};
