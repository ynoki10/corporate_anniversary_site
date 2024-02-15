import { useRecoilValue } from 'recoil';

import { allArticlesState } from '@/globalStates/allArticlesState';
import selectedCategoryState from '@/globalStates/selectedCategoryState';

const useTimelineItems = () => {
  const allArticles = useRecoilValue(allArticlesState);
  const selectedCategory = useRecoilValue(selectedCategoryState);

  if (!selectedCategory) {
    return allArticles;
  }

  return allArticles.filter((article) => article.category === selectedCategory);
};

export default useTimelineItems;
