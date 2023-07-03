import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { Icon } from 'shared/ui/Icon/Icon';
import { Text } from 'shared/ui/Text/Text';
import {
	Article,
	ArticleBlockType,
	ArticleTextBlock,
	ArticleView,
} from '../../model/types/article';
import cls from './ArticleListItem.module.scss';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button } from 'shared/ui/Button/Button';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';

interface ArticleListItemProps {
	className?: string;
	article: Article;
	view: ArticleView;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
	const { className, article, view } = props;
	const { t } = useTranslation();
	const navigate = useNavigate();

	const onOpenArticle = useCallback(() => {
		navigate(RoutePaths.article_details + article.id);
	}, [article.id, navigate]);

	const types = <Text text={article.type.join(', ')} className={cls.types} />;
	const views = (
		<>
			<Text text={String(article.views)} className={cls.views} />
			<Icon Svg={EyeIcon} />
		</>
	);
	const img = <img src={article.img} alt={article.title} className={cls.img} />;

	if (view === ArticleView.BIG) {
		const textBlock = article.blocks.find(
			(block) => block.type === ArticleBlockType.TEXT
		) as ArticleTextBlock;

		return (
			<div
				className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
			>
				<Card>
					<div className={cls.header}>
						<Avatar size={30} src={article.user.avatar} />
						<Text text={article.user.username} className={cls.username} />
						<Text text={article.createdAt} className={cls.date} />
					</div>
					<Text text={article.title} className={cls.title} />
					{types}
					{img}
					{textBlock && (
						<ArticleTextBlockComponent
							block={textBlock}
							className={cls.textBlock}
						/>
					)}
					<div className={cls.footer}>
						<Button onClick={onOpenArticle}>{t('Читать далее')}</Button>
						{views}
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div className={classNames('', {}, [className, cls[view]])}>
			<Card onClick={onOpenArticle}>
				<div className={cls.imageWrapper}>
					{img}
					<Text text={article.createdAt} className={cls.date} />
				</div>
				<div className={cls.infoWrapper}>
					{types}
					{views}
				</div>
				<Text text={article.title} className={cls.title} />
			</Card>
		</div>
	);
});