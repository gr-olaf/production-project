import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import StarIcon from '../../../assets/icons/star.svg';
import { Icon as IconDeprecated } from '../../deprecated/Icon/Icon';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Icon } from '../Icon';

interface StarRatingProps {
   className?: string;
   onSelect?: (starsCount: number) => void;
   size?: number;
   selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
   const { className, size = 30, selectedStars = 0, onSelect } = props;
   const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
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
      <div
         className={classNames(
            toggleFeatures({
               name: 'isAppRedesigned',
               on: () => cls.StarRatingRedesigned,
               off: () => cls.StarRating,
            }),
            {},
            [className],
         )}
      >
         {stars.map((starNumber) => {
            const commonProps = {
               className: classNames(
                  cls.starIcon,
                  {
                     [cls.hovered]: currentStarsCount >= starNumber,
                     [cls.normal]: currentStarsCount < starNumber,
                     [cls.selected]: isSelected,
                  },
                  [],
               ),
               key: starNumber,
               Svg: StarIcon,
               width: size,
               height: size,
               onMouseEnter: onHover(starNumber),
               onMouseLeave: onLeave,
               onClick: onClick(starNumber),
               'data-testid': 'StarRating.' + starNumber,
               'data-selected': currentStarsCount >= starNumber,
            };
            return (
               <ToggleFeatures
                  key={starNumber}
                  feature="isAppRedesigned"
                  on={<Icon {...commonProps} />}
                  off={<IconDeprecated {...commonProps} />}
               />
            );
         })}
      </div>
   );
});
