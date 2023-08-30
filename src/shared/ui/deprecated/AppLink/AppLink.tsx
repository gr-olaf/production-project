import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';
import { Link, LinkProps } from 'react-router-dom';
import { ReactNode, memo } from 'react';

export enum AppLinkTheme {
   PRIMARY = 'primary',
   SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
   className?: string;
   theme?: AppLinkTheme;
   children?: ReactNode;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const AppLink = memo((props: AppLinkProps) => {
   const {
      to,
      className,
      children,
      theme = AppLinkTheme.PRIMARY,
      ...otherProps
   } = props;

   return (
      <Link
         to={to}
         className={classNames(cls.AppLink, {}, [className, cls[theme]])}
         {...otherProps}
      >
         {children}
      </Link>
   );
});
