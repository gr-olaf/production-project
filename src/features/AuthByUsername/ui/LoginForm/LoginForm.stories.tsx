import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LoginForm from './LoginForm';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
	title: 'features/LoginForm',
	component: LoginForm,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => (
	<LoginForm {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
	StoreDecorator({
		loginForm: { username: 'Username', password: 'Password' },
	}),
];

export const withError = Template.bind({});
withError.args = {};
withError.decorators = [
	StoreDecorator({
		loginForm: { username: 'Username', password: 'Password', error: 'Error' },
	}),
];

export const isLoading = Template.bind({});
isLoading.args = {};
isLoading.decorators = [
	StoreDecorator({
		loginForm: { isLoading: true },
	}),
];
