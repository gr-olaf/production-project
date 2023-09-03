import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';
import { ButtonHTMLAttributes, ReactNode, memo } from 'react';

export type ButtonVariant = 'clear' | 'outlined' | 'filled';

export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   className?: string;
   /**
    * Тема кнопки. Отвечает за визуал (в рамке, без стилей, противоположный теме приложения цвет и тд)
    */
   variant?: ButtonVariant;
   /**
    * Флаг, делающий кнопку квадратной
    */
   square?: boolean;
   /**
    * Флаг, делающий кнопку квадратной
    */
   size?: ButtonSize;
   /**
    * Флаг, отвечающий за работу кнопки
    */
   disabled?: boolean;
   children?: ReactNode;
   /**
    * Увеличивает кнопку на всю свободную ширину
    */
   fullWidth?: boolean;
}

export const Button = memo((props: ButtonProps) => {
   const {
      className,
      children,
      variant = 'outlined',
      square,
      size = 'm',
      disabled,
      fullWidth,
      ...otherProps
   } = props;

   const mods: Mods = {
      [cls.square]: square,
      [cls.disabled]: disabled,
      [cls.fullWidth]: fullWidth,
   };

   const classNameList = [className, cls[variant], cls[size]];

   return (
      <button
         disabled={disabled}
         className={classNames(cls.Button, mods, classNameList)}
         {...otherProps}
      >
         {children}
      </button>
   );
});
