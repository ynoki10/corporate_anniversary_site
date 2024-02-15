import { useEffect, useRef } from 'react';

import { useSwipeable } from 'react-swipeable';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import 'simplebar-react/dist/simplebar.min.css';

import ContentsContainer from '@/components/ContentsContainer';
import Loading from '@/components/Loading';
import TimelineContainer from '@/components/TImelineContainer';
import {
  canBackToTopState,
  isFirstArticleState,
} from '@/globalStates/handleBackToTopState';
import pageState from '@/globalStates/pageState';
import useCurrentArticleId from '@/hooks/useCurrentArticleId';
import useTimelineItems from '@/hooks/useTimelineItems';

const MainArea = () => {
  const setPage = useSetRecoilState(pageState);
  const canBackToTop = useRecoilValue(canBackToTopState);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 上マウスホイールor上矢印キーでFVへ遷移（canBackToTopがtrueなら）
  useEffect(() => {
    const onwheel = (e: WheelEvent) => {
      if (e.deltaY < 0 && canBackToTop) {
        setPage(() => 'fv');
      }
    };

    const onArrowUpKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && canBackToTop) {
        setPage(() => 'fv');
      }
    };

    const containerEl = containerRef.current;
    containerEl?.addEventListener('wheel', onwheel);
    document.addEventListener('keydown', onArrowUpKeyDown);

    return () => {
      containerEl?.removeEventListener('wheel', onwheel);
      document.removeEventListener('keydown', onArrowUpKeyDown);
    };
  }, [containerRef, canBackToTop, setPage]);

  // 下フリックでFVへ遷移（canBackToTopがtrueなら）
  const swipeableHandlers = useSwipeable({
    onSwipedDown: () => {
      if (canBackToTop) {
        setPage(() => 'fv');
      }
    },
    delta: 20,
    swipeDuration: 250,
  });

  // swipeableとrefを共有する
  const swipeableRefPassthrough = (el: HTMLDivElement | null) => {
    swipeableHandlers.ref(el);
    containerRef.current = el;
  };

  // 先頭記事かどうかを判定
  const timelineItems = useTimelineItems();
  const [currentArticleId, __] = useCurrentArticleId();
  const setIsFirstArticle = useSetRecoilState(isFirstArticleState);
  useEffect(() => {
    setIsFirstArticle(currentArticleId === timelineItems[0].id);
  }, [timelineItems, currentArticleId, setIsFirstArticle]);

  return (
    <>
      <div
        className="h-[var(--vh-full)] bg-white"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...swipeableHandlers}
        ref={swipeableRefPassthrough}
      >
        <div className="mx-auto max-w-[1024px] lg:flex">
          <TimelineContainer />
          <ContentsContainer />
        </div>
      </div>
      <Loading />
    </>
  );
};

export default MainArea;
