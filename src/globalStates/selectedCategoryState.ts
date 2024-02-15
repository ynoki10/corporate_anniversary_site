import { atom } from 'recoil';

const selectedCategoryState = atom<string>({
  key: 'selectedCategory',
  default: '',
});

export default selectedCategoryState;
