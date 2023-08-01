import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import StarIcon from '../../assets/icons/star.svg';
import { Icon } from '../Icon/Icon';

interface StarRatingProps {
	className?: string;
	onSelect?: (starsCount: number) => void;
	size?: number;
	selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
	const { className, size = 30, selectedStars = 0, onSelect } = props;
	const [currentStarsCount, setCurrentStarsCount] = useState(0);
	const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

	const onHover = (starsCount: number) => () => {
		if (!isSelected) {
			setCurrentStarsCount(starsCount);
		}
	};

	const onLeave = () => {
		if (!isSelected) {
			setCurrentStarsCount(0);
		}
	};

	const onClick = (starsCount: number) => () => {
		if (!isSelected) {
			onSelect?.(starsCount);
			setCurrentStarsCount(starsCount);
			setIsSelected(true);
		}
	};

	return (
		<div className={classNames('', {}, [className])}>
			{stars.map((starNumber) => (
				<Icon
					className={classNames(
						cls.starIcon,
						{
							[cls.hovered]: currentStarsCount >= starNumber,
							[cls.normal]: currentStarsCount < starNumber,
							[cls.selected]: isSelected,
						},
						[]
					)}
					key={starNumber}
					Svg={StarIcon}
					width={size}
					height={size}
					onMouseEnter={onHover(starNumber)}
					onMouseLeave={onLeave}
					onClick={onClick(starNumber)}
				/>
			))}
		</div>
	);
});
