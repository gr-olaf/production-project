import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import {
	MutableRefObject,
	ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Portal } from 'shared/ui/Portal/Portal';
import { useTheme } from 'app/providers/ThemeProvider';

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

	const [isClose, setIsClose] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
	const { theme } = useTheme();

	const mods: Mods = {
		[cls.opened]: isOpen,
		[cls.closed]: isClose,
	};

	const closeHandler = useCallback(() => {
		if (onClose) {
			setIsClose(true);
			timeRef.current = setTimeout(() => {
				onClose();
				setIsClose(false);
			}, ANIMATION_DELAY);
		}
	}, [onClose]);

	const onContentClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeHandler();
			}
		},
		[closeHandler]
	);

	useEffect(() => {
		if (isOpen) {
			setIsMounted(true);
		}
	}, [isOpen]);

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', onKeyDown);
		}

		return () => {
			clearTimeout(timeRef.current);
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [isOpen, onKeyDown]);

	if (lazy && !isMounted) {
		return null;
	}

	return (
		<Portal>
			<div
				className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}
			>
				<div className={cls.overlay} onClick={closeHandler}>
					<div className={cls.content} onClick={onContentClick}>
						{children}
					</div>
				</div>
			</div>
		</Portal>
	);
};
