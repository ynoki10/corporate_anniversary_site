import { useRecoilValue, useSetRecoilState } from 'recoil';

import { allArticlesState } from '@/globalStates/allArticlesState';
import isArticleLoadingState from '@/globalStates/isArticleLoadingState';
import useCurrentArticleId from '@/hooks/useCurrentArticleId';
import useSelectedCategory from '@/hooks/useSelectedCategory';

const usePagination = () => {
  const allArticles = useRecoilValue(allArticlesState);
  const [selectedCategory, _] = useSelectedCategory();
  const [currentArticleId, setCurrentArticleId] = useCurrentArticleId();
  const setIsArticleLoading = useSetRecoilState(isArticleLoadingState);

  const items =
    selectedCategory === ''
      ? allArticles.filter((item) => !item.timelineOnly)
      : allArticles.filter(
          (item) => item.category === selectedCategory && !item.timelineOnly,
        );
  const currentItemIndex = items.findIndex(
    (item) => item.id === currentArticleId,
  );

  const prev = (callback?: () => void) => {
    const prevItem =
      currentItemIndex !== -1 ? items[currentItemIndex - 1] : null;
    if (prevItem) {
      setIsArticleLoading({
        loading: true,
        direction: 'prev',
      });
      setTimeout(() => {
        setCurrentArticleId(prevItem.id);
      }, 500);
      setTimeout(() => {
        setIsArticleLoading({
          loading: false,
          direction: 'prev',
        });
      }, 500);

      if (callback) {
        callback();
      }
    }
  };

  const next = (callback?: () => void) => {
    const nextItem =
      currentItemIndex !== -1 ? items[currentItemIndex + 1] : null;
    if (nextItem) {
      setIsArticleLoading({
        loading: true,
        direction: 'next',
      });
      setTimeout(() => {
        setCurrentArticleId(nextItem.id);
      }, 500);
      setTimeout(() => {
        setIsArticleLoading({
          loading: false,
          direction: 'next',
        });
      }, 500);

      if (callback) {
        callback();
      }
    }
  };

  const goToPage = (id: string, callback?: () => void) => {
    if (items.some((item) => item.id === id)) {
      setIsArticleLoading({
        loading: true,
        direction: 'none',
      });
      setTimeout(() => {
        setCurrentArticleId(id);
      }, 500);
      setTimeout(() => {
        setIsArticleLoading({
          loading: false,
          direction: 'none',
        });
      }, 750);

      if (callback) {
        callback();
      }
    }
  };

  const goToTop = (callback?: () => void) => {
    if (currentItemIndex !== 0) {
      setIsArticleLoading({
        loading: true,
        direction: 'prev',
      });
      setTimeout(() => {
        setCurrentArticleId(items[0].id);
      }, 500);
      setTimeout(() => {
        setIsArticleLoading({
          loading: false,
          direction: 'prev',
        });
      }, 500);

      if (callback) {
        callback();
      }
    }
  };

  return { prev, next, goToPage, goToTop };
};

export default usePagination;
