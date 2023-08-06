import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Modal } from './Modal';
import { Theme } from '@/shared/const/theme';

export default {
	title: 'shared/Modal',
	component: Modal,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	isOpen: true,
	children:
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt iusto quaerat necessitatibus modi odit. Quam distinctio quo quibusdam maxime	illum!',
};

export const Secondary = Template.bind({});
Secondary.args = {
	isOpen: true,
	children:
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt iusto quaerat necessitatibus modi odit. Quam distinctio quo quibusdam maxime	illum!',
};
Secondary.decorators = [ThemeDecorator(Theme.DARK)];
