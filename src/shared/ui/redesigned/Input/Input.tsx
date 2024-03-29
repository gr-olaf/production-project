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
import { Text } from '../Text';
import { HStack } from '../Stack';

type HTMLInputProps = Omit<
   InputHTMLAttributes<HTMLInputElement>,
   'value' | 'onChange' | 'readOnly' | 'size'
>;

type InputSize = 's' | 'm' | 'l';

interface InputProps extends HTMLInputProps {
   className?: string;
   value?: string | number;
   label?: string;
   onChange?: (value: string) => void;
   autoFocus?: boolean;
   readOnly?: boolean;
   addonLeft?: ReactNode;
   addonRight?: ReactNode;
   size?: InputSize;
}

export const Input = memo((props: InputProps) => {
   const {
      className,
      value,
      label,
      onChange,
      type = 'text',
      placeholder,
      autoFocus,
      readOnly,
      addonLeft,
      addonRight,
      size = 'm',
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

   const input = (
      <div
         className={classNames(cls.InputWrapper, mods, [className, cls[size]])}
      >
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

   if (label) {
      return (
         <HStack gap="8" max>
            <Text text={label} />
            {input}
         </HStack>
      );
   }

   return input;
});
