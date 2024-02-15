import { useRecoilState, useRecoilValue } from 'recoil';

import { allArticlesState } from '../globalStates/allArticlesState';

import currentArticleIdState from '@/globalStates/currentArticleIdState';
import useTimelineItems from '@/hooks/useTimelineItems';

const useCurrentArticleId = () => {
  const allArticles = useRecoilValue(allArticlesState);
  const [currentId, setCurrentId] = useRecoilState(currentArticleIdState);
  const timelineItems = useTimelineItems();

  const setter = (id: string) => {
    const isValidId = allArticles.some((item) => item.id === id);
    const targetId = isValidId ? id : timelineItems[0].id;
    setCurrentId(() => targetId);
  };

  return [currentId, setter] as const;
};

export default useCurrentArticleId;
