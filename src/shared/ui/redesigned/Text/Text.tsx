import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';
import { memo } from 'react';

export type TextVariant = 'primary' | 'error' | 'accent';

export type TextAlign = 'center' | 'left' | 'right';

export type TextSize = 's' | 'm' | 'l';

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToClass: Record<TextSize, string> = {
   s: 'h3',
   m: 'h2',
   l: 'h1',
};

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
   s: 'h3',
   m: 'h2',
   l: 'h1',
};

interface TextProps {
   className?: string;
   title?: string;
   text?: string;
   variant?: TextVariant;
   align?: TextAlign;
   size?: TextSize;
   bold?: boolean;

   'data-testid'?: string;
}

export const Text = memo((props: TextProps) => {
   const {
      className,
      title,
      text,
      variant = 'primary',
      align = 'left',
      size = 'm',
      bold,
      'data-testid': dataTestId = 'Text',
   } = props;

   const HeaderTag = mapSizeToHeaderTag[size];
   const sizeClass = mapSizeToClass[size];

   const classNamesList = [className, cls[variant], cls[align], sizeClass];

   return (
      <div
         className={classNames(cls.Text, { [cls.bold]: bold }, classNamesList)}
      >
         {title && (
            <HeaderTag
               className={cls.title}
               data-testid={`${dataTestId}.Header`}
            >
               {title}
            </HeaderTag>
         )}
         {text && (
            <p className={cls.text} data-testid={`${dataTestId}.Paragraph`}>
               {text}
            </p>
         )}
      </div>
   );
});
