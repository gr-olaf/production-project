import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';
import { VStack } from 'shared/ui/Stack';

interface SidebarProps {
	className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
	const [collapsed, setCollapsed] = useState(false);
	const sidebarItemsList = useSelector(getSidebarItems);

	const onToggle = () => {
		setCollapsed((prev) => !prev);
	};

	const itemsList = useMemo(() => {
		return sidebarItemsList.map((item) => (
			<SidebarItem key={item.path} item={item} collapsed={collapsed} />
		));
	}, [collapsed, sidebarItemsList]);

	return (
		<aside
			data-testid="sidebar"
			className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
				className,
			])}
		>
			<Button
				data-testid="sidebar-toggle"
				onClick={onToggle}
				className={cls.collapseBtn}
				theme={ButtonTheme.BACKGROUND_INVERTED}
				square
				size={ButtonSize.L}
			>
				{collapsed ? '>' : '<'}
			</Button>
			<VStack role="navigation" gap="8" className={cls.items}>
				{itemsList}
			</VStack>
			<div className={cls.switchers}>
				<ThemeSwitcher />
				<LangSwitcher className={cls.lang} short={collapsed} />
			</div>
		</aside>
	);
});
