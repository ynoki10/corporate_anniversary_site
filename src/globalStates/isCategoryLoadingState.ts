import { atom } from 'recoil';

const isCategoryLoadingState = atom<boolean>({
  key: 'isCategoryLoading',
  default: false,
});

export default isCategoryLoadingState;
