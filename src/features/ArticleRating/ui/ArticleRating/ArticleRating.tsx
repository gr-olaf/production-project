import { RatingCard } from '@/entities/Rating';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
   useGetArticleRating,
   useRateArticle,
} from '../../api/articleRatingApi';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';

export interface ArticleRatingProps {
   className?: string;
   articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
   const { className, articleId } = props;
   const { t } = useTranslation('article-details');
   const userData = useSelector(getUserAuthData);

   const { data, isLoading } = useGetArticleRating({
      userId: userData?.id ?? '',
      articleId,
   });
   const [rateArticleMutation] = useRateArticle();

   const handleRateArticle = useCallback(
      (starsCount: number, feedback?: string) => {
         try {
            rateArticleMutation({
               userId: userData?.id ?? '',
               articleId: articleId,
               rate: starsCount,
               feedback,
            });
         } catch (error) {
            console.log(error);
         }
      },
      [articleId, rateArticleMutation, userData?.id],
   );

   const onAccept = useCallback(
      (starsCount: number, feedback?: string) => {
         handleRateArticle(starsCount, feedback);
      },
      [handleRateArticle],
   );

   const onCancel = useCallback(
      (starsCount: number) => {
         handleRateArticle(starsCount);
      },
      [handleRateArticle],
   );

   if (isLoading) {
      return <Skeleton width={'100%'} height={120} />;
   }

   const rating = data?.[0];

   return (
      <RatingCard
         className={className}
         rate={rating?.rate}
         title={t('Оцените статью')}
         feedbackTitle={t(
            'Оставьте свой отзыв о статье, это поможет повысить качество',
         )}
         hasFeedback
         onAccept={onAccept}
         onCancel={onCancel}
      />
   );
});

export default ArticleRating;
