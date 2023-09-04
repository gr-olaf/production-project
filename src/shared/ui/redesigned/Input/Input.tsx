import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import React, {
   InputHTMLAttributes,
   ReactNode,
   memo,
   useEffect,
   useRef,
   useState,
} from 'react';

type HTMLInputProps = Omit<
   InputHTMLAttributes<HTMLInputElement>,
   'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
   className?: string;
   value?: string | number;
   onChange?: (value: string) => void;
   autoFocus?: boolean;
   readOnly?: boolean;
   addonLeft?: ReactNode;
   addonRight?: ReactNode;
}

export const Input = memo((props: InputProps) => {
   const {
      className,
      value,
      onChange,
      type = 'text',
      placeholder,
      autoFocus,
      readOnly,
      addonLeft,
      addonRight,
      ...otherProps
   } = props;

   const ref = useRef<HTMLInputElement>(null);
   const [isFocused, setIsFocused] = useState(false);

   const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
   };

   const onBlur = () => {
      setIsFocused(false);
   };

   const onFocus = () => {
      setIsFocused(true);
   };

   useEffect(() => {
      if (autoFocus) {
         setIsFocused(true);
         ref.current?.focus();
      }
   }, [autoFocus]);

   const mods: Mods = {
      [cls.readOnly]: readOnly,
      [cls.focused]: isFocused,
      [cls.withAddonLeft]: Boolean(addonLeft),
      [cls.withAddonRight]: Boolean(addonRight),
   };

   return (
      <div className={classNames(cls.InputWrapper, mods, [className])}>
         <div className={cls.addonLeft}>{addonLeft}</div>
         <input
            ref={ref}
            readOnly={readOnly}
            className={cls.input}
            type={type}
            value={value}
            onChange={onChangeHandler}
            onFocus={onFocus}
            onBlur={onBlur}
            autoFocus={autoFocus}
            placeholder={placeholder}
            {...otherProps}
         />
         <div className={cls.addonRight}>{addonRight}</div>
      </div>
   );
});
