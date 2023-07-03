import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
	className?: string;
	articles?: Article[];
	isLoading?: boolean;
	view?: ArticleView;
}

const getSkeletons = (view: ArticleView) => {
	return new Array(view === ArticleView.SMALL ? 9 : 3)
		.fill(0)
		.map((item, index) => <ArticleListItemSkeleton key={index} view={view} />);
};

export const ArticleList = memo((props: ArticleListProps) => {
	const { className, articles, isLoading, view = ArticleView.SMALL } = props;

	const renderArticle = (article: Article) => {
		return <ArticleListItem key={article.id} article={article} view={view} />;
	};

	if (articles?.length === 0) {
		return null;
	}

	if (isLoading) {
		return (
			<div className={classNames('', {}, [className, cls[view]])}>
				{getSkeletons(view)}
			</div>
		);
	}

	return (
		<div className={classNames('', {}, [className, cls[view]])}>
			{articles?.map(renderArticle)}
		</div>
	);
});
