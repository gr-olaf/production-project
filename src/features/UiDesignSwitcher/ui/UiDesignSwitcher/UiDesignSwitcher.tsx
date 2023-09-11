import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { getFeatureFlag, updateFeatureFlag } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { useSelector } from 'react-redux';

interface UiDesignSwitcherProps {
   className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
   const { className } = props;
   const { t } = useTranslation();
   const isAppRedesigned = getFeatureFlag('isAppRedesigned');
   const userData = useSelector(getUserAuthData);
   const dispatch = useAppDispatch();

   const items = [
      {
         content: t('Новый'),
         value: 'new',
      },
      {
         content: t('Старый'),
         value: 'old',
      },
   ];

   const onChange = (value: string) => {
      if (userData) {
         dispatch(
            updateFeatureFlag({
               userId: userData?.id,
               newFeatures: {
                  isAppRedesigned: value === 'new',
               },
            }),
         );
      }
   };

   return (
      <ListBox
         label={t('Вариант интерфейса')}
         items={items}
         value={isAppRedesigned ? 'new' : 'old'}
         onChange={onChange}
         className={className}
      />
   );
});
