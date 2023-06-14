import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { useTranslation } from 'react-i18next';
import { Modal } from 'shared/ui/Modal/Modal';
import { useCallback, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

interface NavbarProps {
	className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
	const { t } = useTranslation();

	const [isAuthModal, setIsAuthModal] = useState(false);

	const onToggleModal = useCallback(() => {
		setIsAuthModal((prev) => !prev);
	}, []);

	return (
		<div className={classNames(cls.Navbar, {}, [className])}>
			<div className={cls.links}>
				<Button theme={ButtonTheme.CLEAR_INVERTED} onClick={onToggleModal}>
					{t('Войти')}
				</Button>
			</div>
			<Modal isOpen={isAuthModal} onClose={onToggleModal}>
				{t(
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt iusto quaerat necessitatibus modi odit. Quam distinctio quo quibusdam maxime	illum!'
				)}
			</Modal>
		</div>
	);
};
