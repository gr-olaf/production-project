import { RoutePaths } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg';
import ArticlesIcon from 'shared/assets/icons/article-20-20.svg';

export interface SidebarItemType {
	path: string;
	text: string;
	icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
	authOnly?: boolean;
}

export const SidebarItemsList: SidebarItemType[] = [
	{
		path: RoutePaths.main,
		text: 'Главная страница',
		icon: MainIcon,
	},
	{
		path: RoutePaths.about,
		text: 'О сайте',
		icon: AboutIcon,
	},
	{
		path: RoutePaths.profile,
		text: 'Страница профиля',
		icon: ProfileIcon,
		authOnly: true,
	},
	{
		path: RoutePaths.articles,
		text: 'Статьи',
		icon: ArticlesIcon,
		authOnly: true,
	},
];
