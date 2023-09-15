import { useTranslation } from 'react-i18next';
import { memo, useEffect, useState } from 'react';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Text } from '@/shared/ui/deprecated/Text';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice';
import { Drawer } from '@/shared/ui/redesigned/Drawer';

export const ArticlePageGreeting = memo(() => {
   const { t } = useTranslation();
   const [isOpen, setIsOpen] = useState(false);
   const { isArticlesPageWasOpened } = useJsonSettings();
   const dispatch = useAppDispatch();
   const isMobile = useDevice();

   useEffect(() => {
      if (!isArticlesPageWasOpened) {
         setIsOpen(true);
         dispatch(saveJsonSettings({ isArticlesPageWasOpened: true }));
      }
   }, [dispatch, isArticlesPageWasOpened]);

   const onClose = () => setIsOpen(false);

   const text = (
      <Text
         title={t('Добро пожаловать на страницу статей')}
         text={t(
            'Здесь вы можете искать и просматривать статьи на различные темы',
         )}
      />
   );

   if (isMobile) {
      return (
         <Drawer isOpen={isOpen} lazy onClose={onClose}>
            {text}
         </Drawer>
      );
   }

   return (
      <Modal lazy isOpen={isOpen} onClose={onClose}>
         {text}
      </Modal>
   );
});
