import { ComponentStory, ComponentMeta } from '@storybook/react';
import ArticlesPage from './ArticlesPage';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Article } from '@/entities/Article';

export default {
   title: 'pages/ArticlesPage/ArticlesPage',
   component: ArticlesPage,
   argTypes: {
      backgroundColor: { control: 'color' },
   },
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = (args) => (
   <ArticlesPage {...args} />
);

const article: Article = {
   id: '1',
   img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png',
   createdAt: '',
   views: 123,
   user: { id: '1', username: '123' },
   blocks: [],
   type: [],
   title: '123',
   subtitle: 'asfsa',
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
   mockData: [
      {
         url:
            __API__ +
            '/articles?_expand=user&_limit=9&_page=2&_sort=createdAt&_order=asc&q=',
         method: 'GET',
         status: 200,
         response: [
            { ...article, id: '1' },
            { ...article, id: '2' },
            { ...article, id: '3' },
         ],
      },
   ],
};
