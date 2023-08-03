import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NotificationList } from './NotificationList';
import withMock from 'storybook-addon-mock';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
	title: 'entities/Notification/NotificationList',
	component: NotificationList,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	decorators: [withMock],
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => (
	<NotificationList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
	mockData: [
		{
			url: __API__ + '/notifications',
			method: 'GET',
			status: 200,
			response: [
				{
					id: '1',
					title: 'Уведомление',
					description: 'Комментарий 1',
				},
				{
					id: '2',
					title: 'Уведомление',
					description: 'Комментарий 2',
				},
				{
					id: '3',
					title: 'Уведомление',
					description: 'Комментарий 3',
				},
			],
		},
	],
};
