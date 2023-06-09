import { memo } from 'react';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text } from 'shared/ui/Text/Text';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';
import { VStack } from 'shared/ui/Stack';

interface CommentCardProps {
	className?: string;
	comment?: Comment;
	isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
	const { className, comment, isLoading } = props;

	if (isLoading) {
		return (
			<div
				className={classNames(cls.CommentCard, {}, [className, cls.loading])}
			>
				<div className={cls.header}>
					<Skeleton height={30} width={30} border="50%" />
					<Skeleton height={16} width={100} className={cls.username} />
				</div>
				<Skeleton height={50} width={'100%'} className={cls.text} />
			</div>
		);
	}

	if (!comment) {
		return null;
	}

	return (
		<VStack
			gap="8"
			max
			className={classNames(cls.CommentCard, {}, [className])}
		>
			<AppLink to={RoutePaths.profile + comment.user.id} className={cls.header}>
				{comment.user.avatar ? (
					<Avatar size={30} src={comment.user.avatar} />
				) : null}
				<Text text={comment.user.username} className={cls.username} />
			</AppLink>
			<Text text={comment.text} />
		</VStack>
	);
});
