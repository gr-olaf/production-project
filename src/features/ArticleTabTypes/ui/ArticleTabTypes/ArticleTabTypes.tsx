import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TabItem, Tabs } from '@/shared/ui/deprecated/Tabs';
import { ArticleType } from '@/entities/Article';

interface ArticleTabTypesProps {
   className?: string;
   value: ArticleType;
   onChangeType: (tab: ArticleType) => void;
}

export const ArticleTabTypes = memo((props: ArticleTabTypesProps) => {
   const { className, value, onChangeType } = props;
   const { t } = useTranslation('article');

   const typeTabs = useMemo<TabItem[]>(
      () => [
         {
            value: ArticleType.ALL,
            content: t('Все статьи'),
         },
         {
            value: ArticleType.IT,
            content: t('Айти'),
         },
         {
            value: ArticleType.SCIENCE,
            content: t('Наука'),
         },
         {
            value: ArticleType.ECONOMICS,
            content: t('Экономика'),
         },
      ],
      [t],
   );

   const onTabClick = useCallback(
      (tab: TabItem) => {
         onChangeType(tab.value as ArticleType);
      },
      [onChangeType],
   );

   return (
      <Tabs
         tabs={typeTabs}
         value={value}
         onTabClick={onTabClick}
         className={classNames('', {}, [className])}
      ></Tabs>
   );
});
