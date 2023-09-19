/* eslint-disable indent */
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
   DynamicModuleLoader,
   ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import {
   Text as TextDeprecated,
   TextAlign,
   TextSize,
} from '@/shared/ui/deprecated/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
   getArticleDetailsData,
   getArticleDetailsError,
   getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import cls from './ArticleDetails.module.scss';
import { renderArticleBlock } from './renderArticleBlock';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface ArticleDetailsProps {
   className?: string;
   id?: string;
}

const initialReducers: ReducersList = {
   articleDetails: articleDetailsReducer,
};

const Deprecated = () => {
   const article = useSelector(getArticleDetailsData);

   return (
      <>
         <HStack justify="center" max>
            <Avatar size={200} src={article?.img} className={cls.avatar} />
         </HStack>
         <VStack gap="4" data-testid="ArticleDetails.Info">
            <TextDeprecated
               title={article?.title}
               text={article?.subtitle}
               size={TextSize.L}
            />
            <HStack gap="8">
               <Icon Svg={EyeIcon} />
               <TextDeprecated text={String(article?.views)} />
            </HStack>
            <HStack gap="8">
               <Icon Svg={CalendarIcon} />
               <TextDeprecated text={article?.createdAt} />
            </HStack>
         </VStack>
         {article?.blocks.map(renderArticleBlock)}
      </>
   );
};

const Redesigned = () => {
   const article = useSelector(getArticleDetailsData);

   return (
      <>
         <Text title={article?.title} size="l" bold />
         <Text title={article?.subtitle} />
         <AppImage
            src={article?.img}
            fallback={<Skeleton width={'100%'} height={420} border="16" />}
            className={cls.image}
         />
         {article?.blocks.map(renderArticleBlock)}
      </>
   );
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
   const { className, id } = props;
   const { t } = useTranslation('article-details');
   const dispatch = useAppDispatch();
   const isLoading = useSelector(getArticleDetailsIsLoading);
   const error = useSelector(getArticleDetailsError);

   useEffect(() => {
      if (__PROJECT__ !== 'storybook') {
         dispatch(fetchArticleById(id));
      }
   }, [dispatch, id]);

   let content;

   if (isLoading) {
      content = (
         <>
            <SkeletonDeprecated
               className={cls.avatar}
               width={200}
               height={200}
               border="50%"
            />
            <SkeletonDeprecated width={300} height={32} />
            <SkeletonDeprecated width={600} height={24} />
            <SkeletonDeprecated width="100%" height={200} />
            <SkeletonDeprecated width="100%" height={200} />
         </>
      );
   } else if (error) {
      content = (
         <TextDeprecated
            title={t('Произошла ошибка при загрузке статьи')}
            align={TextAlign.CENTER}
         />
      );
   } else {
      content = (
         <ToggleFeatures
            feature="isAppRedesigned"
            on={<Redesigned />}
            off={<Deprecated />}
         />
      );
   }

   return (
      <DynamicModuleLoader reducers={initialReducers} removeAfrerUnmount={true}>
         <VStack gap="16" max className={classNames('', {}, [className])}>
            {content}
         </VStack>
      </DynamicModuleLoader>
   );
});
