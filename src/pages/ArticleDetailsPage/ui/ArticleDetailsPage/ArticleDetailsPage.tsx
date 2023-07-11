import { ArticleDetails, ArticleList } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { AddCommentForm } from 'features/AddCommentForm';
import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Page } from 'widgets/Page/Page';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { articleDetailsPageReducer } from '../../model/slice';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import { getArticleRecommendations } from '../../model/slice/articleDetailsRecommendationsSlice';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';

interface ArticleDetailsPageProps {
	className?: string;
}

const initialReducers: ReducersList = {
	articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = (props) => {
	const { className } = props;
	const { t } = useTranslation('article-details');
	const { id } = useParams<{ id: string }>();
	const comments = useSelector(getArticleComments.selectAll);
	const recommendations = useSelector(getArticleRecommendations.selectAll);
	const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
	const recommendationsIsLoading = useSelector(
		getArticleRecommendationsIsLoading
	);
	const dispatch = useAppDispatch();

	useInitialEffect(() => {
		dispatch(fetchCommentsByArticleId(id));
		dispatch(fetchArticleRecommendations());
	});

	const onSendComment = useCallback(
		(text: string) => {
			dispatch(addCommentForArticle(text));
		},
		[dispatch]
	);

	if (!id) {
		return (
			<Page className={classNames(cls.articleDetailsPage, {}, [className])}>
				{t('Статья не найдена')}
			</Page>
		);
	}

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfrerUnmount>
			<Page className={classNames('', {}, [className])}>
				<ArticleDetailsPageHeader />
				<ArticleDetails id={id} />
				<Text
					size={TextSize.L}
					title={t('Рекомендуем')}
					className={cls.commentTitle}
				/>
				<ArticleList
					articles={recommendations}
					isLoading={recommendationsIsLoading}
					className={cls.recommendations}
					target="_blank"
				/>
				<Text
					size={TextSize.L}
					title={t('Комментарии')}
					className={cls.commentTitle}
				/>
				<AddCommentForm onSendComment={onSendComment} />
				<CommentList isLoading={commentsIsLoading} comments={comments} />
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticleDetailsPage);
