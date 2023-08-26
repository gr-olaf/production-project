import { classNames } from '@/shared/lib/classNames/classNames';
import {
   DynamicModuleLoader,
   ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from '@/widgets/Page';
import { FC, memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchNextArticlesList } from '../../model/services/fetchNextArticlesList/fetchNextArticlesList';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { articlesPageReducer } from '../../model/slice/articlesPageSlice';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import cls from './ArticlesPage.module.scss';
import { ArticlePageGreeting } from '@/features/ArticlePageGreeting';

interface ArticlesPageProps {
   className?: string;
}

const initialReducers: ReducersList = {
   articlesPage: articlesPageReducer,
};

const ArticlesPage: FC<ArticlesPageProps> = (props) => {
   const { className } = props;
   const [searchParams] = useSearchParams();
   const dispatch = useAppDispatch();

   const onLoadNextPart = useCallback(() => {
      dispatch(fetchNextArticlesList());
   }, [dispatch]);

   useInitialEffect(() => {
      dispatch(initArticlesPage(searchParams));
   });

   return (
      <DynamicModuleLoader
         reducers={initialReducers}
         removeAfrerUnmount={false}
      >
         <Page
            onScrollEnd={onLoadNextPart}
            className={classNames(cls.ArticlesPage, {}, [className])}
            data-testid="ArticlesPage"
         >
            <ArticlesPageFilters />
            <ArticleInfiniteList className={cls.list} />
            <ArticlePageGreeting />
         </Page>
      </DynamicModuleLoader>
   );
};

export default memo(ArticlesPage);
