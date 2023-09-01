import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
   Button as ButtonDeprecated,
   ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { memo } from 'react';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';

interface LangSwitcherProps {
   className?: string;
   short?: boolean;
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
   const { t, i18n } = useTranslation('translation');

   const toggle = async () => {
      i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
   };

   return (
      <ToggleFeatures
         feature="isAppRedesigned"
         on={
            <Button
               variant="clear"
               onClick={toggle}
               className={classNames('', {}, [className])}
            >
               {t(short ? 'Короткий язык' : 'Язык')}
            </Button>
         }
         off={
            <ButtonDeprecated
               theme={ButtonTheme.CLEAR_INVERTED}
               onClick={toggle}
               className={classNames('', {}, [className])}
            >
               {t(short ? 'Короткий язык' : 'Язык')}
            </ButtonDeprecated>
         }
      />
   );
});
