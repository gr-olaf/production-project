import {
	MutableRefObject,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';

interface UseModalProps {
	onClose?: () => void;
	isOpen?: boolean;
	animationDelay: number;
}

export function useModal({ onClose, isOpen, animationDelay }: UseModalProps) {
	const [isClose, setIsClose] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

	const close = useCallback(() => {
		if (onClose) {
			setIsClose(true);
			timeRef.current = setTimeout(() => {
				onClose();
				setIsClose(false);
			}, animationDelay);
		}
	}, [animationDelay, onClose]);

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				close();
			}
		},
		[close]
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

	return {
		isClose,
		isMounted,
		close,
	};
}
