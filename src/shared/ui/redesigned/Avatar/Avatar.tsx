import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { CSSProperties, useMemo } from 'react';
import { AppImage } from '../../redesigned/AppImage';
import UserIcon from '../../../assets/icons/user-filled.svg';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

interface AvatarProps {
   className?: string;
   src?: string;
   size?: number;
   alt?: string;
}

export const Avatar = (props: AvatarProps) => {
   const { className, src, size = 100, alt } = props;

   const styles = useMemo<CSSProperties>(() => {
      return {
         height: size,
         width: size,
      };
   }, [size]);

   const fallback = <Skeleton width={size} height={size} border="50%" />;
   const errorFallback = <Icon width={size} height={size} Svg={UserIcon} />;

   return (
      <AppImage
         fallback={fallback}
         errorFallback={errorFallback}
         src={src}
         alt={alt}
         style={styles}
         className={classNames(cls.Avatar, {}, [className])}
      />
   );
};
