import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Comment } from '../../model/types/comment';
import cls from './CommentList.module.scss';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
	className?: string;
	comments?: Comment[];
	isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
	const { className, comments, isLoading } = props;
	const { t } = useTranslation();

	if (!comments?.length) {
		return <Text text={t('Комментарии отсутствуют')} />;
	}

	return (
		<div className={classNames('', {}, [className])}>
			{comments?.map((comment) => (
				<CommentCard
					key={comment.id}
					comment={comment}
					isLoading={isLoading}
					className={cls.comment}
				/>
			))}
		</div>
	);
});
