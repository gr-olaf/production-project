import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import AppSvg from '../../assets/icons/app-image.svg';
import { HStack } from '../Stack';

interface AppLogoProps {
   className?: string;
}

export const AppLogo = memo((props: AppLogoProps) => {
   const { className } = props;

   return (
      <HStack
         max
         justify="center"
         className={classNames(cls.appLogoWrapper, {}, [className])}
      >
         <div className={cls.gradientBig} />
         <div className={cls.gradientSmall} />
         <AppSvg className={cls.appLogo} />
      </HStack>
   );
});
