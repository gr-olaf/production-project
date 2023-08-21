import { getUserAuthData } from '@/entities/User';
import AboutIcon from '@/shared/assets/icons/about-20-20.svg';
import ArticlesIcon from '@/shared/assets/icons/article-20-20.svg';
import MainIcon from '@/shared/assets/icons/main-20-20.svg';
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg';
import {
   getRouteAbout,
   getRouteArticles,
   getRouteMain,
   getRouteProfile,
} from '@/shared/const/router';
import { createSelector } from '@reduxjs/toolkit';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
   const sidebarItemsList: SidebarItemType[] = [
      {
         path: getRouteMain(),
         text: 'Главная страница',
         icon: MainIcon,
      },
      {
         path: getRouteAbout(),
         text: 'О сайте',
         icon: AboutIcon,
      },
   ];

   if (userData) {
      sidebarItemsList.push(
         {
            path: getRouteProfile(userData.id),
            text: 'Страница профиля',
            icon: ProfileIcon,
            authOnly: true,
         },
         {
            path: getRouteArticles(),
            text: 'Статьи',
            icon: ArticlesIcon,
            authOnly: true,
         },
      );
   }

   return sidebarItemsList;
});
