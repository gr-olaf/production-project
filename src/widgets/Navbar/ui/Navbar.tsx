import { getUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { NotificationButton } from '@/features/NotificationButton';
import { getRouteArticleCreate } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import {
   Button as ButtonDeprecated,
   ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import cls from './Navbar.module.scss';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';

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

   const mainClass = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => cls.NavbarRedesigned,
      off: () => cls.Navbar,
   });

   if (authData) {
      return (
         <ToggleFeatures
            feature="isAppRedesigned"
            on={
               <header className={classNames(mainClass, {}, [className])}>
                  <HStack gap="16" className={cls.actions}>
                     <NotificationButton />
                     <AvatarDropdown />
                  </HStack>
               </header>
            }
            off={
               <header className={classNames(mainClass, {}, [className])}>
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
      <header className={classNames(mainClass, {}, [className])}>
         <ToggleFeatures
            feature="isAppRedesigned"
            on={
               <div className={cls.links}>
                  <Button variant="clear" onClick={onShowModal}>
                     {t('Войти')}
                  </Button>
               </div>
            }
            off={
               <div className={cls.links}>
                  <ButtonDeprecated
                     theme={ButtonTheme.CLEAR_INVERTED}
                     onClick={onShowModal}
                  >
                     {t('Войти')}
                  </ButtonDeprecated>
               </div>
            }
         />

         {isAuthModal && (
            <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
         )}
      </header>
   );
});
