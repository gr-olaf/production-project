import { getArticleDetailsData } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import cls from './AddtionalInfoContainer.module.scss';
import { useNavigate } from 'react-router-dom';
import { getRouteArticleEdit } from '@/shared/const/router';

export const AddtionalInfoContainer = memo(() => {
   const article = useSelector(getArticleDetailsData);
   const navigate = useNavigate();

   const onEditArticle = useCallback(() => {
      if (article) {
         navigate(getRouteArticleEdit(article.id));
      }
   }, [article, navigate]);

   if (!article) {
      return null;
   }

   return (
      <Card className={cls.card} padding="24" border="partial">
         <ArticleAdditionalInfo
            author={article.user}
            createdAt={article.createdAt}
            views={article.views}
            onEdit={onEditArticle}
         />
      </Card>
   );
});
