import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import {
	DynamicModuleLoader,
	ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

export interface LoginFormProps {
	className?: string;
}

const initialReducers: ReducerList = {
	loginForm: loginReducer,
};

const LoginForm = memo(({ className }: LoginFormProps) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const username = useSelector(getLoginUsername);
	const password = useSelector(getLoginPassword);
	const isLoading = useSelector(getLoginIsLoading);
	const error = useSelector(getLoginError);

	const onChangeUsername = useCallback(
		(value) => {
			dispatch(loginActions.setUsername(value));
		},
		[dispatch]
	);
	const onChangePassword = useCallback(
		(value) => {
			dispatch(loginActions.setPassword(value));
		},
		[dispatch]
	);
	const onLoginClick = useCallback(() => {
		dispatch(loginByUsername({ username, password }));
	}, [dispatch, username, password]);

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfrerUnmount>
			<div className={classNames(cls.LoginForm, {}, [className])}>
				<Text title={t('Авторизация')} />
				{error && (
					<Text text={t('Неверный логин или пароль')} theme={TextTheme.ERROR} />
				)}
				<Input
					autoFocus
					type="text"
					className={cls.input}
					placeholder={t('Имя пользователя')}
					onChange={onChangeUsername}
					value={username}
				/>
				<Input
					type="text"
					className={cls.input}
					placeholder={t('Пароль')}
					onChange={onChangePassword}
					value={password}
				/>
				<Button
					className={cls.loginBtn}
					theme={ButtonTheme.OUTLINE}
					onClick={onLoginClick}
					disabled={isLoading}
				>
					{t('Войти')}
				</Button>
			</div>
		</DynamicModuleLoader>
	);
});

export default LoginForm;
