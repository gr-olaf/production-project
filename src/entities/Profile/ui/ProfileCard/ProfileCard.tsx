import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProfileCard.module.scss';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';
import { Input } from '@/shared/ui/deprecated/Input';
import { Profile } from '../../model/types/profile';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { CountrySelect } from '@/entities/Country';
import { HStack, VStack } from '@/shared/ui/Stack';

interface ProfileCardProps {
   className?: string;
   data?: Profile;
   isLoading?: boolean;
   error?: string;
   readOnly?: boolean;
   onChangeFirstname?: (value?: string) => void;
   onChangeLastname?: (value?: string) => void;
   onChangeAge?: (value?: string) => void;
   onChangeCity?: (value?: string) => void;
   onChangeUsername?: (value?: string) => void;
   onChangeAvatar?: (value?: string) => void;
   onChangeCurrency?: (value: Currency) => void;
   onChangeCountry?: (value: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
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
            className={classNames(cls.ProfileCard, {}, [className])}
         >
            <Loader />
         </HStack>
      );
   }

   if (error) {
      return (
         <HStack
            justify="center"
            max
            className={classNames(cls.ProfileCard, {}, [className])}
         >
            <Text
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
         className={classNames(cls.ProfileCard, mods, [className])}
      >
         {data?.avatar && (
            <HStack justify="center" max>
               <Avatar src={data.avatar} alt={data.avatar} />
            </HStack>
         )}
         <Input
            readOnly={readOnly}
            value={data?.first}
            placeholder={t('Ваше имя')}
            onChange={onChangeFirstname}
            data-testid={'ProfileCard.firstname'}
         />
         <Input
            readOnly={readOnly}
            value={data?.lastname}
            placeholder={t('Ваша фамилия')}
            onChange={onChangeLastname}
            data-testid={'ProfileCard.lastname'}
         />
         <Input
            readOnly={readOnly}
            value={data?.age}
            placeholder={t('Ваш возраст')}
            onChange={onChangeAge}
         />
         <Input
            readOnly={readOnly}
            value={data?.city}
            placeholder={t('Ваш город')}
            onChange={onChangeCity}
         />
         <Input
            readOnly={readOnly}
            value={data?.username}
            placeholder={t('Введите имя пользователя')}
            onChange={onChangeUsername}
         />
         <Input
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
};
