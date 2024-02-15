import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { allArticlesState } from '@/globalStates/allArticlesState';
import isArticleLoadingState from '@/globalStates/isArticleLoadingState';
import isCategoryLoadingState from '@/globalStates/isCategoryLoadingState';
import selectedCategoryState from '@/globalStates/selectedCategoryState';
import useCurrentArticle from '@/hooks/useCurrentArticle';
import useCurrentArticleId from '@/hooks/useCurrentArticleId';

const useSelectedCategory = () => {
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCategoryState,
  );
  const [_, setCurrentAtricleId] = useCurrentArticleId();
  const allArticles = useRecoilValue(allArticlesState);
  const setIsCategoryLoading = useSetRecoilState(isCategoryLoadingState);
  const setIsArticleLoading = useSetRecoilState(isArticleLoadingState);
  const currentArticle = useCurrentArticle();

  const setter = (cat: string, loading = true) => {
    const set = () => {
      if (cat === '' && currentArticle.timelineOnly) {
        setCurrentAtricleId(allArticles[0].id);
      }
      if (cat !== '') {
        const catItems = allArticles.filter(
          (article) => article.category === cat,
        );
        const firstDisplayItem = catItems.find((item) => !item.timelineOnly);
        setCurrentAtricleId(firstDisplayItem?.id || catItems[0].id);
      }
      setSelectedCategory(cat);
    };

    if (loading) {
      setIsCategoryLoading(true);
      setIsArticleLoading({
        loading: true,
        direction: 'none',
      });

      setTimeout(() => {
        set();
        setIsCategoryLoading(false);
      setIsArticleLoading({
        loading: false,
        direction: 'none',
      });
      }, 750);
    } else {
      set();
    }
  };

  return [selectedCategory, setter] as const;
};

export default useSelectedCategory;
