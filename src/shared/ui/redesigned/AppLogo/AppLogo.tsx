import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import AppSvg from '../../../assets/icons/app-image.svg';
import { HStack } from '../Stack';

interface AppLogoProps {
   className?: string;
   size?: number;
}

export const AppLogo = memo((props: AppLogoProps) => {
   const { className, size = 50 } = props;

   return (
      <HStack
         max
         justify="center"
         className={classNames(cls.appLogoWrapper, {}, [className])}
      >
         <AppSvg
            className={cls.appLogo}
            width={size}
            height={size}
            color="black"
         />
         <div className={cls.gradientBig} />
         <div className={cls.gradientSmall} />
      </HStack>
   );
});
