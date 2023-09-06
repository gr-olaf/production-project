import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProfileCardDeprecated.module.scss';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import {
   Text as TextDeprecated,
   TextAlign,
   TextTheme,
} from '@/shared/ui/deprecated/Text';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';

import { Loader as LoaderDeprecated } from '@/shared/ui/deprecated/Loader';

import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
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

   const mods: Mods = {
      [cls.editing]: !readOnly,
   };

   if (isLoading) {
      return (
         <HStack
            justify="center"
            max
            className={classNames(cls.ProfileCardDeprecated, {}, [className])}
         >
            <LoaderDeprecated />
         </HStack>
      );
   }

   if (error) {
      return (
         <HStack
            justify="center"
            max
            className={classNames(cls.ProfileCardDeprecated, {}, [className])}
         >
            <TextDeprecated
               theme={TextTheme.ERROR}
               align={TextAlign.CENTER}
               title={t('Произожла ошибка при загрузке профиля')}
               text={t('Попробуйте обновить страницу')}
            />
         </HStack>
      );
   }

   return (
      <VStack
         gap="16"
         max
         className={classNames(cls.ProfileCardDeprecated, mods, [className])}
      >
         {data?.avatar && (
            <HStack justify="center" max>
               <AvatarDeprecated src={data.avatar} alt={data.avatar} />
            </HStack>
         )}
         <InputDeprecated
            readOnly={readOnly}
            value={data?.first}
            placeholder={t('Ваше имя')}
            onChange={onChangeFirstname}
            data-testid={'ProfileCard.firstname'}
         />
         <InputDeprecated
            readOnly={readOnly}
            value={data?.lastname}
            placeholder={t('Ваша фамилия')}
            onChange={onChangeLastname}
            data-testid={'ProfileCard.lastname'}
         />
         <InputDeprecated
            readOnly={readOnly}
            value={data?.age}
            placeholder={t('Ваш возраст')}
            onChange={onChangeAge}
         />
         <InputDeprecated
            readOnly={readOnly}
            value={data?.city}
            placeholder={t('Ваш город')}
            onChange={onChangeCity}
         />
         <InputDeprecated
            readOnly={readOnly}
            value={data?.username}
            placeholder={t('Введите имя пользователя')}
            onChange={onChangeUsername}
         />
         <InputDeprecated
            readOnly={readOnly}
            value={data?.avatar}
            placeholder={t('Введите ссылку на аватар')}
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
   );
});
