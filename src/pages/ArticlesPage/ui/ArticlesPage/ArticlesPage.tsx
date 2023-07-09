import { ArticleList } from 'entities/Article';
import { FC, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from 'widgets/Page/Page';
import {
	getArticlesPageError,
	getArticlesPageIsLoading,
	getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { fetchNextArticlesList } from '../../model/services/fetchNextArticlesList/fetchNextArticlesList';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import {
	articlesPageReducer,
	getArticles,
} from '../../model/slice/articlesPageSlice';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import cls from './ArticlesPage.module.scss';
import { useSearchParams } from 'react-router-dom';

interface ArticlesPageProps {
	className?: string;
}

const initialReducers: ReducersList = {
	articlesPage: articlesPageReducer,
};

const ArticlesPage: FC<ArticlesPageProps> = (props) => {
	const { className } = props;
	const dispatch = useAppDispatch();
	const articles = useSelector(getArticles.selectAll);
	const isLoading = useSelector(getArticlesPageIsLoading);
	const error = useSelector(getArticlesPageError);
	const view = useSelector(getArticlesPageView);
	const [searchParams] = useSearchParams();

	const onLoadNextPart = useCallback(() => {
		dispatch(fetchNextArticlesList());
	}, [dispatch]);

	useInitialEffect(() => {
		dispatch(initArticlesPage(searchParams));
	});

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfrerUnmount={false}>
			<Page
				onScrollEnd={onLoadNextPart}
				className={classNames(cls.ArticlesPage, {}, [className])}
			>
				<ArticlesPageFilters />
				<ArticleList
					isLoading={isLoading}
					view={view}
					articles={articles}
					className={cls.list}
				/>
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticlesPage);
