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

   const userInfo = (
      <>
         <Avatar size={32} src={article.user.avatar} className={cls.avatar} />
         <Text bold text={article.user.username} />
      </>
   );

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
                  {userInfo}
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
         data-testid="ArticleListItem"
         target={target}
         to={getRouteArticleDetails(article.id)}
         className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
         <Card className={cls.card} border="partial" padding="0">
            <AppImage
               fallback={<Skeleton width={'100%'} height={200} />}
               alt={article.title}
               src={article.img}
               className={cls.img}
            />
            <VStack className={cls.info} gap="4">
               <Text title={article.title} className={cls.title} />
               <VStack gap="4" className={cls.footer} max>
                  <HStack justify="between" max>
                     <Text text={article.createdAt} className={cls.date} />
                     {views}
                  </HStack>
                  <HStack gap="4">{userInfo}</HStack>
               </VStack>
            </VStack>
         </Card>
      </AppLink>
   );
});
