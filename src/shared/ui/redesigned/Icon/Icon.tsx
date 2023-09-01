import { SVGAttributes, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

type SvgProps = Omit<SVGAttributes<SVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
   className?: string;
   Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}

interface NonClickabaleIconProps extends IconBaseProps {
   clickable?: false;
}

interface ClickabaleIconProps extends IconBaseProps {
   clickable: true;
   onClick: () => void;
}

type IconProps = NonClickabaleIconProps | ClickabaleIconProps;

export const Icon = memo((props: IconProps) => {
   const { className, Svg, width = 32, height = 32, ...otherProps } = props;

   const icon = (
      <Svg
         className={classNames(cls.Icon, {}, [className])}
         {...otherProps}
         width={width}
         height={height}
         onClick={undefined}
      />
   );

   if (props.clickable) {
      return (
         <button
            type="button"
            className={cls.button}
            onClick={props.onClick}
            style={{ width, height }}
         >
            {icon}
         </button>
      );
   }

   return icon;
});
