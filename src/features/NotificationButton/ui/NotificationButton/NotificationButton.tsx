import { NotificationList } from 'entities/Notification';
import { memo, useCallback, useState } from 'react';
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { Popover } from 'shared/ui/Popups';
import cls from './NotificationButton.module.scss';
import { Drawer } from 'shared/ui/Drawer/Drawer';
import { useDevice } from 'shared/lib/hooks/useDevice/useDevice';

interface NotificationButtonProps {
	className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
	const { className } = props;
	const isMobile = useDevice();

	const [isOpen, setIsOpen] = useState(false);

	const onOpenDrawer = useCallback(() => {
		setIsOpen(true);
	}, []);

	const onCloseDrawer = useCallback(() => {
		setIsOpen(false);
	}, []);

	const trigger = (
		<Button onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
			<Icon Svg={NotificationIcon} inverted />
		</Button>
	);

	if (isMobile) {
		return (
			<>
				{trigger}
				<Drawer isOpen={isOpen} onClose={onCloseDrawer}>
					<NotificationList />
				</Drawer>
			</>
		);
	}

	return (
		<Popover
			className={classNames(cls.NotificationButton, {}, [className])}
			trigger={trigger}
			direction="bottom left"
		>
			<NotificationList className={cls.notifications} />
		</Popover>
	);
});
