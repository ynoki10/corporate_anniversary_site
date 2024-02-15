import { atom } from 'recoil';

type IsArticleLoadingState = {
  loading: boolean;
  direction: 'prev' | 'next' | 'none';
};

const isArticleLoadingState = atom<IsArticleLoadingState>({
  key: 'isArticleLoading',
  default: { loading: false, direction: 'none' },
});

export default isArticleLoadingState;
