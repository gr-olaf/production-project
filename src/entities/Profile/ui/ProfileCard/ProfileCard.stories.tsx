import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { FeatureFlagDecorator } from '@/shared/config/storybook/FeatureFlagDecorator/FeatureFlagDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

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

const primaryArgs = {
   data: {
      first: 'Firstname',
      lastname: 'Lastname',
      age: 25,
      city: 'City',
      username: 'Username',
      avatar: 'assets/storybook.jpg',
      currency: Currency.RUB,
      country: Country.Russia,
   },
   readOnly: true,
};

export const Primary = Template.bind({});
Primary.args = primaryArgs;

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = primaryArgs;
PrimaryRedesigned.decorators = [
   FeatureFlagDecorator({ isAppRedesigned: true }),
   NewDesignDecorator,
];

export const WithError = Template.bind({});
WithError.args = {
   error: 'Error',
};

export const WithIsLoading = Template.bind({});
WithIsLoading.args = {
   isLoading: true,
};
