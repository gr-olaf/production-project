import { ArticleDetails } from '@/entities/Article';
import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
   DynamicModuleLoader,
   ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/Card';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
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

   if (!id) {
      return null;
   }

   return (
      <DynamicModuleLoader reducers={initialReducers} removeAfrerUnmount>
         <Page className={classNames('', {}, [className])}>
            <VStack gap="16" max>
               <ArticleDetailsPageHeader />
               <ArticleDetails id={id} />
               <ToggleFeatures
                  feature="isArticleRatingEnabled"
                  on={<ArticleRating articleId={id} />}
                  off={<Card>{t('Оценка статей скоро появится')}</Card>}
               />
               <ArticleRecommendationsList />
               <ArticleDetailsComments id={id} />
            </VStack>
         </Page>
      </DynamicModuleLoader>
   );
};

export default memo(ArticleDetailsPage);
