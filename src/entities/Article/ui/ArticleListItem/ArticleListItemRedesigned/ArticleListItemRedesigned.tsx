import EyeIcon from '@/shared/assets/icons/eye.svg';
import { getRouteArticleDetails } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
   ArticleBlockType,
   ArticleView,
} from '../../../model/consts/articleConsts';
import { ArticleTextBlock } from '../../../model/types/article';
import { ArticleListItemProps } from '../ArticleListItem';
import cls from './ArticleListItemRedesigned.module.scss';

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
   const { className, article, view, target } = props;
   const { t } = useTranslation('article');

   const types = <Text text={article.type.join(', ')} className={cls.types} />;
   const views = (
      <HStack gap="8">
         <Icon Svg={EyeIcon} />
         <Text text={String(article.views)} className={cls.views} />
      </HStack>
   );

   if (view === ArticleView.BIG) {
      const textBlock = article.blocks.find(
         (block) => block.type === ArticleBlockType.TEXT,
      ) as ArticleTextBlock;

      return (
         <Card
            max
            padding="24"
            className={classNames(cls.ArticleListItem, {}, [
               className,
               cls[view],
            ])}
            data-testid="ArticleListItem"
         >
            <VStack max gap="16">
               <HStack max gap="8">
                  <Avatar size={32} src={article.user.avatar} />
                  <Text text={article.user.username} bold />
                  <Text text={article.createdAt} />
               </HStack>
               <Text title={article.title} bold />
               <Text title={article.subtitle} size="s" bold />
               <AppImage
                  fallback={<Skeleton width={'100%'} height={250} />}
                  src={article.img}
                  alt={article.title}
                  className={cls.img}
               />
               {textBlock && (
                  <Text
                     text={textBlock.paragraphs.slice(0, 2).join(' ')}
                     className={cls.textBlock}
                  />
               )}
               <HStack max justify="between">
                  <AppLink
                     to={getRouteArticleDetails(article.id)}
                     target={target}
                  >
                     <Button>{t('Читать далее')}</Button>
                  </AppLink>
                  {views}
               </HStack>
            </VStack>

            <div className={cls.footer}></div>
         </Card>
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
