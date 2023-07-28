import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '../../model/consts/articleConsts';
import ListIcon from '@/shared/assets/icons/list-24-24.svg';
import TiledIcon from '@/shared/assets/icons/tiled-24-24.svg';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon/Icon';

interface ArticleViewSelectorProps {
	className?: string;
	view: ArticleView;
	onViewClick: (view: ArticleView) => void;
}

const viewTypes = [
	{
		view: ArticleView.BIG,
		icon: ListIcon,
	},
	{
		view: ArticleView.SMALL,
		icon: TiledIcon,
	},
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
	const { className, view, onViewClick } = props;

	const onClick = (newView: ArticleView) => {
		return () => {
			onViewClick(newView);
		};
	};

	return (
		<div className={classNames('', {}, [className])}>
			{viewTypes.map((viewType) => (
				<Button
					key={viewType.view}
					theme={ButtonTheme.CLEAR}
					onClick={onClick(viewType.view)}
				>
					<Icon
						Svg={viewType.icon}
						className={classNames(
							'',
							{ [cls.notSelected]: viewType.view !== view },
							[]
						)}
					/>
				</Button>
			))}
		</div>
	);
});
