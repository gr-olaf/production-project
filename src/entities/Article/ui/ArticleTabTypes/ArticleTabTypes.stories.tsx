import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleTabTypes } from './ArticleTabTypes';

export default {
	title: 'entities/Article/ArticleTabTypes',
	component: ArticleTabTypes,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ArticleTabTypes>;

const Template: ComponentStory<typeof ArticleTabTypes> = (args) => (
	<ArticleTabTypes {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
