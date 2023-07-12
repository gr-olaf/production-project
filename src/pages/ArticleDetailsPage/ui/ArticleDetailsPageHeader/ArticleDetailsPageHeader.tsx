import { getArticleDetailsData } from 'entities/Article';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { getCanEditArticle } from '../../model/selectors/article';
import cls from './ArticleDetailsPageHeader.module.scss';

interface ArticleDetailsPageHeaderProps {
	className?: string;
}

export const ArticleDetailsPageHeader = memo(
	(props: ArticleDetailsPageHeaderProps) => {
		const { className } = props;
		const { t } = useTranslation('article-details');
		const navigate = useNavigate();
		const article = useSelector(getArticleDetailsData);
		const canEdit = useSelector(getCanEditArticle);

		const onBackToList = useCallback(() => {
			navigate(RoutePaths.articles);
		}, [navigate]);

		const onEditArticle = useCallback(() => {
			navigate(`${RoutePaths.article_details}${article?.id}/edit`);
		}, [article?.id, navigate]);

		return (
			<div
				className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}
			>
				<Button onClick={onBackToList}>{t('Назад к списку')}</Button>
				{canEdit && (
					<Button onClick={onEditArticle} className={cls.editBtn}>
						{t('Редактировать')}
					</Button>
				)}
			</div>
		);
	}
);
