import { getUserAuthData } from '@/entities/User';
import AboutIconDeprecated from '@/shared/assets/icons/about-20-20.svg';
import ArticlesIconDeprecated from '@/shared/assets/icons/article-20-20.svg';
import MainIconDeprecated from '@/shared/assets/icons/main-20-20.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile-20-20.svg';

import AboutIcon from '@/shared/assets/icons/Info.svg';
import ArticlesIcon from '@/shared/assets/icons/article.svg';
import MainIcon from '@/shared/assets/icons/home.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';

import {
   getRouteAbout,
   getRouteArticles,
   getRouteMain,
   getRouteProfile,
} from '@/shared/const/router';
import { createSelector } from '@reduxjs/toolkit';
import { SidebarItemType } from '../types/sidebar';
import { toggleFeatures } from '@/shared/lib/features';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
   const sidebarItemsList: SidebarItemType[] = [
      {
         path: getRouteMain(),
         text: 'Главная страница',
         icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => MainIcon,
            off: () => MainIconDeprecated,
         }),
      },
      {
         path: getRouteAbout(),
         text: 'О сайте',
         icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => AboutIcon,
            off: () => AboutIconDeprecated,
         }),
      },
   ];

   if (userData) {
      sidebarItemsList.push(
         {
            path: getRouteProfile(userData.id),
            text: 'Страница профиля',
            icon: toggleFeatures({
               name: 'isAppRedesigned',
               on: () => ProfileIcon,
               off: () => ProfileIconDeprecated,
            }),
            authOnly: true,
         },
         {
            path: getRouteArticles(),
            text: 'Статьи',
            icon: toggleFeatures({
               name: 'isAppRedesigned',
               on: () => ArticlesIcon,
               off: () => ArticlesIconDeprecated,
            }),
            authOnly: true,
         },
      );
   }

   return sidebarItemsList;
});
