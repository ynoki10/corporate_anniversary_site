import { atom } from 'recoil';

const currentArticleIdState = atom<string>({
  key: 'currentArticleId',
  default: '',
});

export default currentArticleIdState;
