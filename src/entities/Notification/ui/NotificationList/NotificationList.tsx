import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationList.module.scss';
import { useNotifications } from '../../api/notificationApi';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { toggleFeatures } from '@/shared/lib/features';

interface NotificationListProps {
   className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
   const { className } = props;
   const { data, isLoading } = useNotifications(null, {
      pollingInterval: 5000,
   });

   const Skeleton = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => SkeletonRedesigned,
      off: () => SkeletonDeprecated,
   });

   if (isLoading) {
      return (
         <VStack
            gap="16"
            className={classNames(cls.NotificationList, {}, [className])}
         >
            <Skeleton width={'100%'} height={'80px'} border="8px" />
            <Skeleton width={'100%'} height={'80px'} border="8px" />
            <Skeleton width={'100%'} height={'80px'} border="8px" />
         </VStack>
      );
   }

   return (
      <VStack
         gap="16"
         className={classNames(cls.NotificationList, {}, [className])}
      >
         {data?.map((item) => (
            <NotificationItem key={item.id} item={item} />
         ))}
      </VStack>
   );
});
