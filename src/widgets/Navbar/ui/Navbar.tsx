import { getUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { NotificationButton } from '@/features/NotificationButton';
import { getRouteArticleCreate } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import cls from './Navbar.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';

interface NavbarProps {
   className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
   const { t } = useTranslation();

   const [isAuthModal, setIsAuthModal] = useState(false);
   const authData = useSelector(getUserAuthData);

   const onCloseModal = useCallback(() => {
      setIsAuthModal(false);
   }, []);

   const onShowModal = useCallback(() => {
      setIsAuthModal(true);
   }, []);

   if (authData) {
      return (
         <ToggleFeatures
            feature="isAppRedesigned"
            on={
               <header
                  className={classNames(cls.NavbarRedesigned, {}, [className])}
               >
                  <HStack gap="16" className={cls.actions}>
                     <NotificationButton />
                     <AvatarDropdown />
                  </HStack>
               </header>
            }
            off={
               <header className={classNames(cls.Navbar, {}, [className])}>
                  <Text
                     className={cls.appName}
                     title={t('Grolaf App')}
                     theme={TextTheme.INVERTED}
                  />
                  <AppLink
                     to={getRouteArticleCreate()}
                     theme={AppLinkTheme.SECONDARY}
                  >
                     {t('Создать статью')}
                  </AppLink>
                  <HStack gap="16" className={cls.actions}>
                     <NotificationButton />
                     <AvatarDropdown />
                  </HStack>
               </header>
            }
         />
      );
   }

   return (
      <header className={classNames(cls.Navbar, {}, [className])}>
         <div className={cls.links}>
            <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={onShowModal}>
               {t('Войти')}
            </Button>
         </div>
         {isAuthModal && (
            <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
         )}
      </header>
   );
});
