import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Input } from '@/shared/ui/redesigned/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
   const {
      className,
      data,
      isLoading,
      error,
      readOnly,
      onChangeFirstname,
      onChangeLastname,
      onChangeAge,
      onChangeCity,
      onChangeUsername,
      onChangeAvatar,
      onChangeCurrency,
      onChangeCountry,
   } = props;
   const { t } = useTranslation('profile');

   if (isLoading) {
      return (
         <Card padding="24" max>
            <VStack gap="32">
               <HStack justify="center" max>
                  <Skeleton width={128} height={128} border="100%" />
               </HStack>
               <HStack gap="32" max>
                  <VStack gap="16" max>
                     <Skeleton width={'100%'} height={38} />
                     <Skeleton width={'100%'} height={38} />
                     <Skeleton width={'100%'} height={38} />
                     <Skeleton width={'100%'} height={38} />
                  </VStack>
                  <VStack gap="16" max>
                     <Skeleton width={'100%'} height={38} />
                     <Skeleton width={'100%'} height={38} />
                     <Skeleton width={'100%'} height={38} />
                     <Skeleton width={'100%'} height={38} />
                  </VStack>
               </HStack>
            </VStack>
         </Card>
      );
   }

   if (error) {
      return (
         <HStack
            justify="center"
            max
            className={classNames('', {}, [className])}
         >
            <Text
               variant="error"
               align="center"
               title={t('Произожла ошибка при загрузке профиля')}
               text={t('Попробуйте обновить страницу')}
            />
         </HStack>
      );
   }

   return (
      <Card padding="24" max className={classNames('', {}, [className])}>
         <VStack gap="32">
            {data?.avatar && (
               <HStack justify="center" max>
                  <Avatar size={128} src={data.avatar} alt={data.avatar} />
               </HStack>
            )}
            <HStack gap="24" max>
               <VStack gap="16" max>
                  <Input
                     readOnly={readOnly}
                     value={data?.first}
                     label={t('Имя')}
                     onChange={onChangeFirstname}
                     data-testid={'ProfileCard.firstname'}
                  />
                  <Input
                     readOnly={readOnly}
                     value={data?.lastname}
                     label={t('Фамилия')}
                     onChange={onChangeLastname}
                     data-testid={'ProfileCard.lastname'}
                  />
                  <Input
                     readOnly={readOnly}
                     value={data?.age}
                     label={t('Возраст')}
                     onChange={onChangeAge}
                  />
                  <Input
                     readOnly={readOnly}
                     value={data?.city}
                     label={t('Город')}
                     onChange={onChangeCity}
                  />
               </VStack>
               <VStack gap="16" max>
                  <Input
                     readOnly={readOnly}
                     value={data?.username}
                     label={t('Имя пользователя')}
                     onChange={onChangeUsername}
                  />
                  <Input
                     readOnly={readOnly}
                     value={data?.avatar}
                     label={t('Ссылка на аватар')}
                     onChange={onChangeAvatar}
                  />
                  <CurrencySelect
                     value={data?.currency}
                     onChange={onChangeCurrency}
                     readOnly={readOnly}
                  />
                  <CountrySelect
                     value={data?.country}
                     onChange={onChangeCountry}
                     readOnly={readOnly}
                  />
               </VStack>
            </HStack>
         </VStack>
      </Card>
   );
});
