import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTabTypes } from '@/features/ArticleTabTypes';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui//deprecated/Card';
import { Input } from '@/shared/ui/deprecated/Input';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useArticlesFilters } from '../../lib/hooks/useArticlesFilters';
import cls from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
   className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
   const { className } = props;
   const { t } = useTranslation('article');
   const {
      sort,
      order,
      type,
      view,
      search,
      onChangeSort,
      onChangeOrder,
      onChangeType,
      onChangeView,
      onChangeSearch,
   } = useArticlesFilters();

   return (
      <div className={classNames('', {}, [className])}>
         <div className={cls.sortWrapper}>
            <ArticleSortSelector
               sort={sort}
               order={order}
               onChangeSort={onChangeSort}
               onChangeOrder={onChangeOrder}
            />
            <ArticleViewSelector view={view} onViewClick={onChangeView} />
         </div>
         <Card className={cls.search}>
            <Input
               placeholder={t('Поиск')}
               value={search}
               onChange={onChangeSearch}
            />
         </Card>
         <ArticleTabTypes
            value={type}
            onChangeType={onChangeType}
            className={cls.tabs}
         />
      </div>
   );
});
