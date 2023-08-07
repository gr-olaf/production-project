import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import { VStack } from '@/shared/ui/Stack';

interface CommentListProps {
	className?: string;
	comments?: Comment[];
	isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
	const { className, comments, isLoading } = props;
	const { t } = useTranslation();

	if (isLoading) {
		return (
			<VStack gap="16" className={classNames('', {}, [className])}>
				<CommentCard isLoading />
				<CommentCard isLoading />
				<CommentCard isLoading />
			</VStack>
		);
	}

	if (!comments?.length) {
		return <Text text={t('Комментарии отсутствуют')} />;
	}

	return (
		<VStack gap="16" max className={classNames('', {}, [className])}>
			{comments?.map((comment) => (
				<CommentCard key={comment.id} comment={comment} isLoading={isLoading} />
			))}
		</VStack>
	);
});
