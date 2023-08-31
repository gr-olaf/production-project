import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SidebarItem.module.scss';
import { useTranslation } from 'react-i18next';
import { SidebarItemType } from '../../model/types/sidebar';
import {
   AppLink as AppLinkDeprecated,
   AppLinkTheme,
} from '@/shared/ui/deprecated/AppLink';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface SidebarItemProps {
   item: SidebarItemType;
   collapsed: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
   const { item, collapsed } = props;
   const { t } = useTranslation();

   const isAuth = useSelector(getUserAuthData);

   if (item.authOnly && !isAuth) {
      return null;
   }

   return (
      <ToggleFeatures
         feature="isAppRedesigned"
         on={
            <AppLink
               to={item.path}
               className={classNames(
                  cls.item,
                  { [cls.collapsed]: collapsed },
                  [],
               )}
            >
               <Icon Svg={item.icon} />
               <span className={cls.link}>{t(item.text)}</span>
            </AppLink>
         }
         off={
            <AppLinkDeprecated
               to={item.path}
               className={classNames(
                  cls.item,
                  { [cls.collapsed]: collapsed },
                  [],
               )}
               theme={AppLinkTheme.SECONDARY}
            >
               <item.icon className={cls.icon} />
               <span className={cls.link}>{t(item.text)}</span>
            </AppLinkDeprecated>
         }
      />
   );
});
