import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './ProfileCard.module.scss';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Profile } from '../../model/types/profile';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency, CurrencySelect } from 'entities/Currency';
import { Country } from 'entities/Country/model/types/country';
import { CountrySelect } from 'entities/Country';

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
			<div
				className={classNames(cls.ProfileCard, {}, [className, cls.loading])}
			>
				<Loader />
			</div>
		);
	}

	if (error) {
		return (
			<div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
				<Text
					theme={TextTheme.ERROR}
					align={TextAlign.CENTER}
					title={t('Произожла ошибка при загрузке профиля')}
					text={t('Попробуйте обновить страницу')}
				/>
			</div>
		);
	}

	return (
		<div className={classNames(cls.ProfileCard, mods, [className])}>
			{data?.avatar && (
				<div className={cls.avatarWrapper}>
					<Avatar src={data.avatar} alt={data.avatar} />
				</div>
			)}
			<Input
				readOnly={readOnly}
				value={data?.first}
				placeholder={t('Ваше имя')}
				className={cls.input}
				onChange={onChangeFirstname}
			/>
			<Input
				readOnly={readOnly}
				value={data?.lastname}
				placeholder={t('Ваша фамилия')}
				className={cls.input}
				onChange={onChangeLastname}
			/>
			<Input
				readOnly={readOnly}
				value={data?.age}
				placeholder={t('Ваш возраст')}
				className={cls.input}
				onChange={onChangeAge}
			/>
			<Input
				readOnly={readOnly}
				value={data?.city}
				placeholder={t('Ваш город')}
				className={cls.input}
				onChange={onChangeCity}
			/>
			<Input
				readOnly={readOnly}
				value={data?.username}
				placeholder={t('Введите имя пользователя')}
				className={cls.input}
				onChange={onChangeUsername}
			/>
			<Input
				readOnly={readOnly}
				value={data?.avatar}
				placeholder={t('Введите ссылку на аватар')}
				className={cls.input}
				onChange={onChangeAvatar}
			/>
			<CurrencySelect
				className={cls.input}
				value={data?.currency}
				onChange={onChangeCurrency}
				readOnly={readOnly}
			/>
			<CountrySelect
				className={cls.input}
				value={data?.country}
				onChange={onChangeCountry}
				readOnly={readOnly}
			/>
		</div>
	);
};
