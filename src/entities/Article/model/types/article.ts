import { User } from '@/entities/User';
import { ArticleBlockType, ArticleType } from '../consts/articleConsts';

export interface ArticleBlockBase {
   id: string;
   type: ArticleBlockType;
}

export interface ArticleCodeBlock extends ArticleBlockBase {
   type: ArticleBlockType.CODE;
   code: string;
}

export interface ArticleTextBlock extends ArticleBlockBase {
   type: ArticleBlockType.TEXT;
   title?: string;
   paragraphs: string[];
}

export interface ArticleImageBlock extends ArticleBlockBase {
   type: ArticleBlockType.IMAGE;
   title: string;
   src: string;
}

export type ArticleBlock =
   | ArticleCodeBlock
   | ArticleTextBlock
   | ArticleImageBlock;

export interface Article {
   id: string;
   title: string;
   subtitle: string;
   img: string;
   views: number;
   createdAt: string;
   type: ArticleType[];
   user: User;
   blocks: ArticleBlock[];
}
