import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
	getArticlesPageHasMore,
	getArticlesPageIsLoading,
	getArticlesPageNum,
} from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchNextArticlesList = createAsyncThunk<
	void,
	void,
	ThunkConfig<string>
>('articles/fetchNextArticlesList', async (_, thunkAPI) => {
	const { getState, dispatch } = thunkAPI;

	const isLoading = getArticlesPageIsLoading(getState());
	const hasMore = getArticlesPageHasMore(getState());
	const page = getArticlesPageNum(getState());

	if (hasMore && !isLoading) {
		dispatch(articlesPageActions.setPage(page + 1));
		dispatch(fetchArticlesList({ page: page + 1 }));
	}
});
