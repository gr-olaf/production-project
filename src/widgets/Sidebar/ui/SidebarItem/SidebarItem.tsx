import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SidebarItem.module.scss';
import { useTranslation } from 'react-i18next';
import { SidebarItemType } from '../../model/items';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { memo } from 'react';

interface SidebarItemProps {
	item: SidebarItemType;
	collapsed: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
	const { item, collapsed } = props;
	const { t } = useTranslation();

	return (
		<AppLink
			to={item.path}
			className={classNames(cls.item, { [cls.collapsed]: collapsed }, [])}
			theme={AppLinkTheme.SECONDARY}
		>
			<item.icon className={cls.icon} />
			<span className={cls.link}>{t(item.text)}</span>
		</AppLink>
	);
});
