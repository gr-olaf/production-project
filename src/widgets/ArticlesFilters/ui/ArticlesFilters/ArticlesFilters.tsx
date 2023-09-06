import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesFilters.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTabTypes } from '@/features/ArticleTabTypes';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import { Input } from '@/shared/ui/redesigned/Input';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ArticlesFiltersProps {
   className?: string;
   sort: ArticleSortField;
   order: SortOrder;
   type: ArticleType;
   search: string;
   onChangeSort: (newSort: ArticleSortField) => void;
   onChangeOrder: (newOrder: SortOrder) => void;
   onChangeType: (tab: ArticleType) => void;
   onChangeSearch: (search: string) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
   const {
      className,
      sort,
      order,
      type,
      search,
      onChangeSort,
      onChangeOrder,
      onChangeType,
      onChangeSearch,
   } = props;
   const { t } = useTranslation();

   return (
      <Card
         className={classNames(cls.ArticlesFilters, {}, [className])}
         padding="24"
      >
         <VStack gap="32">
            <Input
               placeholder={t('Поиск')}
               value={search}
               size="s"
               onChange={onChangeSearch}
               addonLeft={<Icon Svg={SearchIcon} />}
            />
            <ArticleTabTypes
               value={type}
               onChangeType={onChangeType}
               className={cls.tabs}
            />
            <ArticleSortSelector
               sort={sort}
               order={order}
               onChangeSort={onChangeSort}
               onChangeOrder={onChangeOrder}
            />
         </VStack>
      </Card>
   );
});
