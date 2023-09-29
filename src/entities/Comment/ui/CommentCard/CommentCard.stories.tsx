import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CommentCard } from './CommentCard';
import { FeatureFlagDecorator } from '@/shared/config/storybook/FeatureFlagDecorator/FeatureFlagDecorator';

export default {
   title: 'entities/Comment/CommentCard',
   component: CommentCard,
   argTypes: {
      backgroundColor: { control: 'color' },
   },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
   <CommentCard {...args} />
);

const normalArgs = {
   comment: {
      id: '1',
      text: 'Hello world',
      user: {
         id: '1',
         username: 'Grolaf',
      },
   },
};

export const Normal = Template.bind({});
Normal.args = normalArgs;

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = normalArgs;
NormalRedesigned.decorators = [FeatureFlagDecorator({ isAppRedesigned: true })];

export const Loading = Template.bind({});
Loading.args = {
   comment: {
      id: '1',
      text: 'Hello world',
      user: {
         id: '1',
         username: 'Grolaf',
      },
   },
   isLoading: true,
};
