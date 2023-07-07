import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { AddCommentForm } from 'features/AddCommentForm';
import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Button } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import {
	articleDetailsCommentsReducer,
	getArticleComments,
} from '../../model/slice/articleDetailsCommentsSlice';
import cls from './ArticleDetailsPage.module.scss';
import { Page } from 'widgets/Page/Page';

interface ArticleDetailsPageProps {
	className?: string;
}

const initialReducers: ReducersList = {
	articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = (props) => {
	const { className } = props;
	const { t } = useTranslation('article-details');
	const { id } = useParams<{ id: string }>();
	const comments = useSelector(getArticleComments.selectAll);
	const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useInitialEffect(() => dispatch(fetchCommentsByArticleId(id)));

	const onSendComment = useCallback(
		(text: string) => {
			dispatch(addCommentForArticle(text));
		},
		[dispatch]
	);

	const onBackToList = useCallback(() => {
		navigate(RoutePaths.articles);
	}, [navigate]);

	if (!id) {
		return (
			<Page className={classNames(cls.articleDetailsPage, {}, [className])}>
				{t('Статья не найдена')}
			</Page>
		);
	}

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfrerUnmount>
			<Page className={classNames(cls.articleDetailsPage, {}, [className])}>
				<Button onClick={onBackToList}>{t('Назад к списку')}</Button>
				<ArticleDetails id={id} />
				<Text title={t('Комментарии')} className={cls.commentTitle} />
				<AddCommentForm onSendComment={onSendComment} />
				<CommentList isLoading={commentsIsLoading} comments={comments} />
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticleDetailsPage);
