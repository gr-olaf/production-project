import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleSortSelector.module.scss';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select';
import { SortOrder } from '@/shared/types/sort';
import { ArticleSortField } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleSortSelectorProps {
   className?: string;
   sort: ArticleSortField;
   order: SortOrder;
   onChangeSort: (newSort: ArticleSortField) => void;
   onChangeOrder: (newOrder: SortOrder) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
   const { className, sort, order, onChangeOrder, onChangeSort } = props;
   const { t } = useTranslation('article');

   const orderOptions = useMemo<SelectOption<SortOrder>[]>(
      () => [
         {
            value: 'asc',
            content: t('возрастанию'),
         },
         {
            value: 'desc',
            content: t('убыванию'),
         },
      ],
      [t],
   );

   const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
      () => [
         {
            value: ArticleSortField.CREATED,
            content: t('дате создания'),
         },
         {
            value: ArticleSortField.TITLE,
            content: t('заголовку'),
         },
         {
            value: ArticleSortField.VIEWS,
            content: t('количеству просмотров'),
         },
      ],
      [t],
   );

   return (
      <ToggleFeatures
         feature="isAppRedesigned"
         on={
            <VStack
               gap="8"
               className={classNames(cls.ArticleSortSelectorRedesigned, {}, [
                  className,
               ])}
            >
               <Text text={t('Сортировать ПО')} />
               <ListBox
                  items={sortFieldOptions}
                  value={sort}
                  onChange={onChangeSort}
               />
               <ListBox
                  items={orderOptions}
                  value={order}
                  onChange={onChangeOrder}
               />
            </VStack>
         }
         off={
            <div
               className={classNames(cls.ArticleSortSelector, {}, [className])}
            >
               <Select
                  label={t('Сортировать ПО')}
                  options={sortFieldOptions}
                  value={sort}
                  onChange={onChangeSort}
               />
               <Select
                  label={t('по')}
                  options={orderOptions}
                  value={order}
                  onChange={onChangeOrder}
               />
            </div>
         }
      />
   );
});
