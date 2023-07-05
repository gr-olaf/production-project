import { ArticleView } from 'entities/Article';
import { useEffect } from 'react';

export function useInitialEffect(callback: () => void, view?: ArticleView) {
	useEffect(() => {
		if (__PROJECT__ !== 'storybook') {
			callback();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [view]);
}
