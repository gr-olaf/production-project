import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from '../ArticleListItem.module.scss';
import {
   ArticleView,
   ArticleBlockType,
} from '../../../model/consts/articleConsts';
import { ArticleTextBlock } from '../../../model/types/article';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Button } from '@/shared/ui/deprecated/Button';
import { Card } from '@/shared/ui/deprecated/Card';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleListItemProps } from '../ArticleListItem';
import { Text } from '@/shared/ui/deprecated/Text';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';

export const ArticleListItemDeprecated = memo((props: ArticleListItemProps) => {
   const { className, article, view, target } = props;
   const { t } = useTranslation('article');

   const types = <Text text={article.type.join(', ')} className={cls.types} />;
   const views = (
      <>
         <Text text={String(article.views)} className={cls.views} />
         <Icon Svg={EyeIcon} />
      </>
   );

   if (view === ArticleView.BIG) {
      const textBlock = article.blocks.find(
         (block) => block.type === ArticleBlockType.TEXT,
      ) as ArticleTextBlock;

      return (
         <div
            className={classNames(cls.ArticleListItem, {}, [
               className,
               cls[view],
            ])}
            data-testid="ArticleListItem"
         >
            <Card>
               <div className={cls.header}>
                  <Avatar size={30} src={article.user.avatar} />
                  <Text text={article.user.username} className={cls.username} />
                  <Text text={article.createdAt} className={cls.date} />
               </div>
               <Text text={article.title} className={cls.title} />
               {types}
               <AppImage
                  fallback={<Skeleton width={'100%'} height={250} />}
                  src={article.img}
                  alt={article.title}
                  className={cls.img}
               />
               {textBlock && (
                  <ArticleTextBlockComponent
                     block={textBlock}
                     className={cls.textBlock}
                  />
               )}
               <div className={cls.footer}>
                  <AppLink
                     to={getRouteArticleDetails(article.id)}
                     target={target}
                  >
                     <Button>{t('Читать далее')}</Button>
                  </AppLink>
                  {views}
               </div>
            </Card>
         </div>
      );
   }

   return (
      <AppLink
         target={target}
         to={getRouteArticleDetails(article.id)}
         className={classNames('', {}, [className, cls[view]])}
         data-testid="ArticleListItem"
      >
         <Card>
            <div className={cls.imageWrapper}>
               <AppImage
                  fallback={<Skeleton width={200} height={200} />}
                  src={article.img}
                  alt={article.title}
                  className={cls.img}
               />
               <Text text={article.createdAt} className={cls.date} />
            </div>
            <div className={cls.infoWrapper}>
               {types}
               {views}
            </div>
            <Text text={article.title} className={cls.title} />
         </Card>
      </AppLink>
   );
});
