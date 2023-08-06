/* eslint-disable grolaf-plugin/layer-imports */
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { Theme } from '@/shared/const/theme';
import { Story } from '@storybook/react';

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) =>
	(
		<ThemeProvider initialTheme={theme}>
			<div className={`app ${theme}`}>
				<StoryComponent />
			</div>
		</ThemeProvider>
	);
