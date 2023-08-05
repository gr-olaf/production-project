import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Dropdown } from '@/shared/ui/Popups';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
	getUserAuthData,
	isUserAdmin,
	isUserManager,
	userActions,
} from '@/entities/User';
import { RoutePaths } from '@/shared/const/router';
import { useTranslation } from 'react-i18next';

interface AvatarDropdownProps {
	className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const authData = useSelector(getUserAuthData);
	const isAdmin = useSelector(isUserAdmin);
	const isManager = useSelector(isUserManager);
	const dispatch = useAppDispatch();

	const onLogout = useCallback(() => {
		dispatch(userActions.logout());
	}, [dispatch]);

	const isAdminPanelAvailable = isAdmin || isManager;

	if (!authData) {
		return null;
	}

	return (
		<Dropdown
			className={classNames('', {}, [className])}
			trigger={<Avatar size={30} src={authData.avatar} />}
			items={[
				...(isAdminPanelAvailable
					? [
							{
								content: t('Админка'),
								href: RoutePaths.admin_panel,
							},
					  ]
					: []),
				{
					content: t('Профиль'),
					href: RoutePaths.profile + authData.id,
				},
				{
					content: t('Выйти'),
					onClick: onLogout,
				},
			]}
			direction="bottom left"
		/>
	);
});
