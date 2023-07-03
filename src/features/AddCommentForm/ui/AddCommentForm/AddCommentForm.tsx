import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import {
	getAddCommentFormError,
	getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';
import {
	addCommentFormActions,
	addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';
import cls from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
	className?: string;
	onSendComment: (text: string) => void;
}

const initialReducers: ReducersList = {
	addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
	const { className, onSendComment } = props;
	const { t } = useTranslation();
	const text = useSelector(getAddCommentFormText);
	const error = useSelector(getAddCommentFormError);
	const dispatch = useAppDispatch();

	const onCommentTextChange = useCallback(
		(value: string) => {
			dispatch(addCommentFormActions.setText(value));
		},
		[dispatch]
	);

	const onSendHandler = useCallback(() => {
		onSendComment(text || '');
		onCommentTextChange('');
	}, [onCommentTextChange, onSendComment, text]);

	return (
		<DynamicModuleLoader reducers={initialReducers}>
			<div className={classNames(cls.AddCommentForm, {}, [className])}>
				<Input
					className={cls.input}
					placeholder={t('Введите текст комментария')}
					value={text}
					onChange={onCommentTextChange}
				/>
				<Button onClick={onSendHandler}>{t('Отправить')}</Button>
			</div>
		</DynamicModuleLoader>
	);
});

export default AddCommentForm;