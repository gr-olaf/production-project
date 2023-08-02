import { ArticleDetails } from '@/entities/Article';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page/Page';
import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleRating } from '@/features/ArticleRating';

interface ArticleDetailsPageProps {
	className?: string;
}

const initialReducers: ReducersList = {
	articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = (props) => {
	const { className } = props;
	const { id } = useParams<{ id: string }>();

	if (!id) {
		return null;
	}

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfrerUnmount>
			<Page className={classNames('', {}, [className])}>
				<VStack gap="16" max>
					<ArticleDetailsPageHeader />
					<ArticleDetails id={id} />
					<ArticleRating articleId={id} />
					<ArticleRecommendationsList />
					<ArticleDetailsComments id={id} />
				</VStack>
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticleDetailsPage);
