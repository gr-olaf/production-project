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
import { Page } from '@/widgets/Page';
import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleRating } from '@/features/ArticleRating';
import { getFeatureFlag } from '@/shared/lib/features';
import { Counter } from '@/entities/Counter';

interface ArticleDetailsPageProps {
   className?: string;
}

const initialReducers: ReducersList = {
   articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = (props) => {
   const { className } = props;
   const { id } = useParams<{ id: string }>();
   const isArticleRatingEnabled = getFeatureFlag('isArticleRatingEnabled');
   const isCounterEnabled = getFeatureFlag('isCounterEnabled');

   console.log(isArticleRatingEnabled);

   if (!id) {
      return null;
   }

   return (
      <DynamicModuleLoader reducers={initialReducers} removeAfrerUnmount>
         <Page className={classNames('', {}, [className])}>
            <VStack gap="16" max>
               <ArticleDetailsPageHeader />
               <ArticleDetails id={id} />
               {isArticleRatingEnabled && <ArticleRating articleId={id} />}
               {isCounterEnabled && <Counter />}
               <ArticleRecommendationsList />
               <ArticleDetailsComments id={id} />
            </VStack>
         </Page>
      </DynamicModuleLoader>
   );
};

export default memo(ArticleDetailsPage);
