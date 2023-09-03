import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '../../../Button/Button';
import cls from './ListBox.module.scss';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';
import { HStack } from '../../../Stack';
import { DropdownDirection } from '../../../../../types/ui';

export interface ListBoxItem<T extends string> {
   value: T;
   content: ReactNode;
   disabled?: boolean;
}

interface ListBoxProps<T extends string> {
   items: ListBoxItem<T>[];
   className?: string;
   value?: T;
   defaultValue?: T;
   onChange: (value: T) => void;
   readonly?: boolean;
   direction?: DropdownDirection;
   label?: string;
}

export const ListBox = <T extends string>(props: ListBoxProps<T>) => {
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

   const selectedItem = useMemo(() => {
      return items.find((item) => item.value === value);
   }, [items, value]);

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
               <Button variant="filled" disabled={readonly}>
                  {selectedItem?.content ?? defaultValue}
               </Button>
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
                              [popupCls.selected]: selected,
                           })}
                        >
                           {selected}
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
