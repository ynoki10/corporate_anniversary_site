import { atom, selector } from 'recoil';

import type { Content } from '@/types/content';

export const allArticlesState = atom<Content[]>({
  key: 'allArticles',
  default: [
    {
      id: '',
      timelineOnly: false,
      year: null,
      month: null,
      category: null,
      title: null,
      headImagesNum: 0,
      body: null,
      bottomImagesNum: 0,
      body02: null,
      link: null,
      interview: null,
    },
  ],
});

export const categoriesState = selector<(string | null)[]>({
  key: 'categories',
  get: ({ get }) => {
    const allArticles = get(allArticlesState);
    const categories = allArticles
      .filter((item) => item.category !== null)
      .map((item) => item.category);

    // その他を最後に持ってくる
    const sortedCategories = categories
      .filter((item) => item !== 'その他')
      .concat(categories.filter((item) => item === 'その他'));

    // 重複を削除
    const categoriesUnique = [...new Set(sortedCategories)];

    return categoriesUnique;
  },
});
