import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import {
	ProfileCard,
	ValidateProfileError,
	fetchProfileData,
	getProfileError,
	getProfileForm,
	getProfileIsLoading,
	getProfileReadOnly,
	getProfileValidateErrors,
	profileActions,
	profileReducer,
} from 'entities/Profile';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from 'shared/ui/Stack';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Page } from 'widgets/Page/Page';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

interface ProfilePageProps {
	className?: string;
}

const initialReducers: ReducersList = {
	profile: profileReducer,
};

const ProfilePage = ({ className }: ProfilePageProps) => {
	const { t } = useTranslation('profile');
	const dispatch = useAppDispatch();
	const formData = useSelector(getProfileForm);
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);
	const readOnly = useSelector(getProfileReadOnly);
	const validateErrors = useSelector(getProfileValidateErrors);
	const { id } = useParams<{ id: string }>();

	const validateErrorsTranslates = {
		[ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
		[ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
		[ValidateProfileError.INCORRECT_CITY]: t('Город обязателен'),
		[ValidateProfileError.NO_DATA]: t('Данные не указаны'),
		[ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
	};

	useInitialEffect(() => {
		if (id) {
			dispatch(fetchProfileData(id));
		}
	});

	const onChangeFirstname = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ first: value || '' }));
		},
		[dispatch]
	);

	const onChangeLastname = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ lastname: value || '' }));
		},
		[dispatch]
	);

	const onChangeAge = useCallback(
		(value?: string) => {
			const validateValue = value?.replace(/\D+/gm, '');
			dispatch(
				profileActions.updateProfile({ age: Number(validateValue || 0) })
			);
		},
		[dispatch]
	);

	const onChangeCity = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ city: value || '' }));
		},
		[dispatch]
	);

	const onChangeUsername = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ username: value || '' }));
		},
		[dispatch]
	);

	const onChangeAvatar = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ avatar: value || '' }));
		},
		[dispatch]
	);

	const onChangeCurrency = useCallback(
		(value: Currency) => {
			dispatch(profileActions.updateProfile({ currency: value }));
		},
		[dispatch]
	);

	const onChangeCountry = useCallback(
		(value: Country) => {
			dispatch(profileActions.updateProfile({ country: value }));
		},
		[dispatch]
	);

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfrerUnmount>
			<Page className={classNames('', {}, [className])}>
				<VStack gap="16" max>
					<ProfilePageHeader />
					{validateErrors?.length &&
						validateErrors.map((err) => (
							<Text
								key={err}
								theme={TextTheme.ERROR}
								text={validateErrorsTranslates[err]}
							/>
						))}
					<ProfileCard
						data={formData}
						isLoading={isLoading}
						error={error}
						readOnly={readOnly}
						onChangeFirstname={onChangeFirstname}
						onChangeLastname={onChangeLastname}
						onChangeAge={onChangeAge}
						onChangeCity={onChangeCity}
						onChangeUsername={onChangeUsername}
						onChangeAvatar={onChangeAvatar}
						onChangeCurrency={onChangeCurrency}
						onChangeCountry={onChangeCountry}
					/>
				</VStack>
			</Page>
		</DynamicModuleLoader>
	);
};

export default ProfilePage;
