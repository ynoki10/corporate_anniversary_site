import { useCallback, useEffect, useRef } from 'react';

import { useSwipeable } from 'react-swipeable';
import { useSetRecoilState } from 'recoil';

import FvContents from '@/components/FvContents';
import pageState from '@/globalStates/pageState';
import usePagination from '@/hooks/usePagination';
import useTimelineItems from '@/hooks/useTimelineItems';

const Fv = () => {
  const setpage = useSetRecoilState(pageState);
  const timeleineItems = useTimelineItems();
  const containerRef = useRef<HTMLElement | null>(null);
  const { goToPage } = usePagination();

  const goToMain = useCallback(() => {
    setpage(() => 'main');
    goToPage(timeleineItems[0].id);
  }, [goToPage, timeleineItems, setpage]);

  // 下マウスホイールor下矢印キーでメインコンテンツへ遷移
  useEffect(() => {
    const onwheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        goToMain();
      }
    };

    const onArrowDownKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        goToMain();
      }
    };

    const containerEl = containerRef.current;
    containerEl?.addEventListener('wheel', onwheel);
    document.addEventListener('keydown', onArrowDownKeyDown);

    return () => {
      containerEl?.removeEventListener('wheel', onwheel);
      document.removeEventListener('keydown', onArrowDownKeyDown);
    };
  }, [containerRef, goToMain]);

  // 上フリックでメインコンテンツへ遷移
  const swipeableHandlers = useSwipeable({
    onSwipedUp: () => {
      goToMain();
    },
    delta: 20,
    swipeDuration: 250,
  });

  // swipeableとrefを共有する
  const swipeableRefPassthrough = (el: HTMLElement | null) => {
    swipeableHandlers.ref(el);
    containerRef.current = el;
  };

  return (
    <section
      className="relative flex h-full max-h-[var(--vh-full)] flex-col overflow-x-hidden bg-sub05"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...swipeableHandlers}
      ref={swipeableRefPassthrough}
    >
      <FvContents />
    </section>
  );
};

export default Fv;
