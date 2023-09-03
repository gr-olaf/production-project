import { memo } from 'react';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { useArticlesFilters } from '../../lib/hooks/useArticlesFilters';

interface FiltersContainerProps {
   className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
   const { className } = props;
   const {
      sort,
      order,
      type,
      search,
      onChangeSort,
      onChangeOrder,
      onChangeType,
      onChangeSearch,
   } = useArticlesFilters();

   return (
      <ArticlesFilters
         className={className}
         sort={sort}
         order={order}
         type={type}
         search={search}
         onChangeSort={onChangeSort}
         onChangeOrder={onChangeOrder}
         onChangeType={onChangeType}
         onChangeSearch={onChangeSearch}
      />
   );
});
