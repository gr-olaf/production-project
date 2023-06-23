import { classNames } from 'shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
	ProfileCard,
	fetchProfileData,
	getProfileError,
	getProfileForm,
	getProfileIsLoading,
	getProfileReadOnly,
	profileActions,
	profileReducer,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';

interface ProfilePageProps {
	className?: string;
}

const initialReducers: ReducerList = {
	profile: profileReducer,
};

const ProfilePage = ({ className }: ProfilePageProps) => {
	const dispatch = useAppDispatch();
	const formData = useSelector(getProfileForm);
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);
	const readOnly = useSelector(getProfileReadOnly);

	useEffect(() => {
		dispatch(fetchProfileData());
	}, [dispatch]);

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
			<div className={classNames('', {}, [className])}>
				<ProfilePageHeader />
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
			</div>
		</DynamicModuleLoader>
	);
};

export default ProfilePage;
