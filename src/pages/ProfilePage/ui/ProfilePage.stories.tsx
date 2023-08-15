import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import ProfilePage from './ProfilePage';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { Theme } from '@/shared/const/theme';

export default {
	title: 'pages/ProfilePage',
	component: ProfilePage,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
	StoreDecorator({
		profile: {
			form: {
				first: 'Firstname',
				lastname: 'Lastname',
				age: 25,
				city: 'City',
				username: 'Username',
				avatar: 'assets/storybook.jpg',
				currency: Currency.RUB,
				country: Country.Russia,
			},
			readonly: true,
		},
	}),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
	ThemeDecorator(Theme.DARK),
	StoreDecorator({
		profile: {
			form: {
				first: 'Firstname',
				lastname: 'Lastname',
				age: 25,
				city: 'City',
				username: 'Username',
				avatar: 'assets/storybook.jpg',
				currency: Currency.RUB,
				country: Country.Russia,
			},
			readonly: true,
		},
	}),
];
