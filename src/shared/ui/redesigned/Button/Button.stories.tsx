import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button } from './Button';
import { Theme } from '@/shared/const/theme';

export default {
   title: 'shared/Button',
   component: Button,
   argTypes: {
      backgroundColor: { control: 'color' },
   },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
   children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
   children: 'Text',
   variant: 'clear',
};

export const Outline = Template.bind({});
Outline.args = {
   children: 'Text',
   variant: 'outlined',
};

export const OutlineSizeM = Template.bind({});
OutlineSizeM.args = {
   children: 'Text',
   variant: 'outlined',
   size: 'm',
};

export const OutlineSizeL = Template.bind({});
OutlineSizeL.args = {
   children: 'Text',
   variant: 'outlined',
   size: 'l',
};

export const OutlineSizeXL = Template.bind({});
OutlineSizeXL.args = {
   children: 'Text',
   variant: 'outlined',
   size: 'xl',
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
   children: 'Text',
   variant: 'outlined',
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Disabled = Template.bind({});
Disabled.args = {
   children: 'Text',
   variant: 'outlined',
   disabled: true,
};
