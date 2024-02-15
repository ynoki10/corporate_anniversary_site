import { useRecoilValue } from 'recoil';

import { allArticlesState } from '@/globalStates/allArticlesState';
import useCurrentArticleId from '@/hooks/useCurrentArticleId';

const useCurrentArticle = () => {
  const [currentArticleId, _] = useCurrentArticleId();
  const allArticles = useRecoilValue(allArticlesState);

  const currentArticle = allArticles.find(
    (item) => item.id === currentArticleId,
  );

  return currentArticle || allArticles[0];
};

export default useCurrentArticle;
