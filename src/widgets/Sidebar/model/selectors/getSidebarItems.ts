import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import AboutIcon from '@/shared/assets/icons/about-20-20.svg';
import MainIcon from '@/shared/assets/icons/main-20-20.svg';
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg';
import ArticlesIcon from '@/shared/assets/icons/article-20-20.svg';
import { RoutePaths } from '@/shared/const/router';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
	const sidebarItemsList: SidebarItemType[] = [
		{
			path: RoutePaths.main,
			text: 'Главная страница',
			icon: MainIcon,
		},
		{
			path: RoutePaths.about,
			text: 'О сайте',
			icon: AboutIcon,
		},
	];

	if (userData) {
		sidebarItemsList.push(
			{
				path: RoutePaths.profile + userData.id,
				text: 'Страница профиля',
				icon: ProfileIcon,
				authOnly: true,
			},
			{
				path: RoutePaths.articles,
				text: 'Статьи',
				icon: ArticlesIcon,
				authOnly: true,
			}
		);
	}

	return sidebarItemsList;
});
