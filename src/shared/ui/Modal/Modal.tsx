import { useTheme } from '@/app/providers/ThemeProvider';
import { ReactNode } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
	className?: string;
	children?: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
	lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
	const { className, children, isOpen, onClose, lazy } = props;
	const { theme } = useTheme();
	const { close, isClose, isMounted } = useModal({
		animationDelay: ANIMATION_DELAY,
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
				className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}
			>
				<Overlay onClick={close} />
				<div className={cls.content}>{children}</div>
			</div>
		</Portal>
	);
};
