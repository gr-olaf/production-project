import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps extends React.SVGAttributes<SVGElement> {
   className?: string;
   Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}

export const Icon = memo((props: IconProps) => {
   const { className, Svg, width = 32, height = 32, ...otherProps } = props;

   return (
      <Svg
         className={classNames(cls.Icon, {}, [className])}
         {...otherProps}
         width={width}
         height={height}
      />
   );
});
