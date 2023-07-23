import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Article } from '../../model/types/article';
import { ArticleView } from '../../model/consts/articleConsts';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
	className?: string;
	articles: Article[];
	isLoading?: boolean;
	view?: ArticleView;
	target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) => {
	return new Array(view === ArticleView.SMALL ? 9 : 3)
		.fill(0)
		.map((item, index) => <ArticleListItemSkeleton key={index} view={view} />);
};

export const ArticleList = memo((props: ArticleListProps) => {
	const {
		className,
		articles,
		isLoading,
		view = ArticleView.SMALL,
		target,
	} = props;
	const { t } = useTranslation('article');

	const renderArticle = (article: Article) => {
		return (
			<ArticleListItem
				key={article.id}
				article={article}
				view={view}
				target={target}
			/>
		);
	};

	if (!isLoading && articles.length === 0) {
		return (
			<div className={classNames('', {}, [className, cls[view]])}>
				<Text title={t('Статьи не найдены')} size={TextSize.L} />
			</div>
		);
	}

	return (
		<div className={classNames('', {}, [className, cls[view]])}>
			{articles.length > 0 ? articles.map(renderArticle) : null}
			{isLoading && getSkeletons(view)}
		</div>
	);
});
