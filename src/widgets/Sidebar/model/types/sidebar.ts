export interface SidebarItemType {
	path: string;
	text: string;
	icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
	authOnly?: boolean;
}
