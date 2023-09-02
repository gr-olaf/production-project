import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '../../../Button/Button';
import cls from './ListBox.module.scss';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';
import { HStack } from '../../../Stack';
import { DropdownDirection } from '../../../../../types/ui';

export interface ListBoxItem {
   value: string;
   content: ReactNode;
   disabled?: boolean;
}

interface ListBoxProps {
   items: ListBoxItem[];
   className?: string;
   value?: string;
   defaultValue?: string;
   onChange: (value: string) => void;
   readonly?: boolean;
   direction?: DropdownDirection;
   label?: string;
}

export const ListBox = (props: ListBoxProps) => {
   const {
      items,
      className,
      value,
      defaultValue,
      onChange,
      readonly,
      direction = 'bottom right',
      label,
   } = props;

   const optionsClasses = [mapDirectionClass[direction], popupCls.menu];

   return (
      <HStack gap="4">
         {label && <span>{`${label}>`}</span>}
         <HListBox
            as={'div'}
            disabled={readonly}
            className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
            value={value}
            onChange={onChange}
         >
            <HListBox.Button as="div" className={popupCls.trigger}>
               <Button disabled={readonly}>{value ?? defaultValue}</Button>
            </HListBox.Button>
            <HListBox.Options
               className={classNames(cls.options, {}, optionsClasses)}
            >
               {items.map((item) => (
                  <HListBox.Option
                     key={item.value}
                     value={item.value}
                     disabled={item.disabled}
                     as={Fragment}
                  >
                     {({ active, selected }) => (
                        <li
                           className={classNames(cls.item, {
                              [popupCls.active]: active,
                              [popupCls.disabled]: item.disabled,
                           })}
                        >
                           {selected && '!!!'}
                           {item.content}
                        </li>
                     )}
                  </HListBox.Option>
               ))}
            </HListBox.Options>
         </HListBox>
      </HStack>
   );
};
