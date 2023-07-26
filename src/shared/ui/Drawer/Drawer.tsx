import { ReactNode, memo } from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './Drawer.module.scss';
import { useTheme } from 'app/providers/ThemeProvider';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';
import { useModal } from 'shared/lib/hooks/useModal/useModal';

interface DrawerProps {
	className?: string;
	children: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
	lazy?: boolean;
}

export const Drawer = memo((props: DrawerProps) => {
	const { className, children, onClose, isOpen, lazy } = props;
	const { theme } = useTheme();
	const { close, isClose, isMounted } = useModal({
		animationDelay: 300,
		isOpen,
		onClose,
	});

	const mods: Mods = {
		[cls.opened]: isOpen,
		[cls.closed]: isClose,
	};

	if (lazy && !isMounted) {
		return null;
	}

	return (
		<Portal>
			<div
				className={classNames(cls.Drawer, mods, [
					className,
					theme,
					'app_drawer',
				])}
			>
				<Overlay onClick={close} />
				<div className={cls.content}>{children}</div>
			</div>
		</Portal>
	);
});
