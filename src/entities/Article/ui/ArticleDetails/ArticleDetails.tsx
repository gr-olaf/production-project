/* eslint-disable indent */
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Icon } from 'shared/ui/Icon/Icon';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';
import {
	getArticleDetailsData,
	getArticleDetailsError,
	getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleDetails.module.scss';
import { HStack, VStack } from 'shared/ui/Stack';

interface ArticleDetailsProps {
	className?: string;
	id: string;
}

const initialReducers: ReducersList = {
	articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
	const { className, id } = props;
	const { t } = useTranslation('article-details');
	const dispatch = useAppDispatch();
	const article = useSelector(getArticleDetailsData);
	const isLoading = useSelector(getArticleDetailsIsLoading);
	const error = useSelector(getArticleDetailsError);

	const renderBlock = useCallback((block: ArticleBlock) => {
		switch (block.type) {
			case ArticleBlockType.TEXT:
				return <ArticleTextBlockComponent key={block.id} block={block} />;
			case ArticleBlockType.CODE:
				return <ArticleCodeBlockComponent key={block.id} block={block} />;
			case ArticleBlockType.IMAGE:
				return <ArticleImageBlockComponent key={block.id} block={block} />;
			default:
				return null;
		}
	}, []);

	useEffect(() => {
		if (__PROJECT__ !== 'storybook') {
			dispatch(fetchArticleById(id));
		}
	}, [dispatch, id]);

	let content;

	if (isLoading) {
		content = (
			<>
				<Skeleton
					className={cls.avatar}
					width={200}
					height={200}
					border="50%"
				/>
				<Skeleton width={300} height={32} />
				<Skeleton width={600} height={24} />
				<Skeleton width="100%" height={200} />
				<Skeleton width="100%" height={200} />
			</>
		);
	} else if (error) {
		content = (
			<Text
				title={t('Произошла ошибка при загрузке статьи')}
				align={TextAlign.CENTER}
			/>
		);
	} else {
		content = (
			<>
				<HStack justify="center" max>
					<Avatar size={200} src={article?.img} className={cls.avatar} />
				</HStack>
				<VStack gap="4">
					<Text
						title={article?.title}
						text={article?.subtitle}
						size={TextSize.L}
					/>
					<HStack gap="8">
						<Icon Svg={EyeIcon} />
						<Text text={String(article?.views)} />
					</HStack>
					<HStack gap="8">
						<Icon Svg={CalendarIcon} />
						<Text text={article?.createdAt} />
					</HStack>
				</VStack>
				{article?.blocks.map(renderBlock)}
			</>
		);
	}

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfrerUnmount={true}>
			<VStack gap="16" className={classNames('', {}, [className])}>
				{content}
			</VStack>
		</DynamicModuleLoader>
	);
});
