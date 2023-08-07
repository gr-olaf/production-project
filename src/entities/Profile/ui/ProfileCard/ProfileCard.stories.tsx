import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProfileCard } from './ProfileCard';
import Avatar from '@/shared/assets/tests/storybook.jpg';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';

export default {
	title: 'entities/ProfileCard',
	component: ProfileCard,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
	<ProfileCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
	data: {
		first: 'Firstname',
		lastname: 'Lastname',
		age: 25,
		city: 'City',
		username: 'Username',
		avatar: Avatar,
		currency: Currency.RUB,
		country: Country.Russia,
	},
	readOnly: true,
};

export const WithError = Template.bind({});
WithError.args = {
	error: 'Error',
};

export const WithIsLoading = Template.bind({});
WithIsLoading.args = {
	isLoading: true,
};
