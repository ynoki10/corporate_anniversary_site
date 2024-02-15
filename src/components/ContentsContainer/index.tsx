import { useRef, useEffect } from 'react';

import { CgCloseO } from 'react-icons/cg';
import { FiArrowUp } from 'react-icons/fi';
import { useSwipeable } from 'react-swipeable';
import { useScroll } from 'react-use';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import SimpleBar from 'simplebar-react';

import Article from '@/components/Article';
import { isTopOfContentState } from '@/globalStates/handleBackToTopState';
import isArticleLoadingState from '@/globalStates/isArticleLoadingState';
import usePagination from '@/hooks/usePagination';
import useSelectedCategory from '@/hooks/useSelectedCategory';

const ContentsContainer = () => {
  const setIsTopOfContent = useSetRecoilState(isTopOfContentState);
  const scrollAreaRef = useRef<HTMLElement | null>(null);
  const { y } = useScroll(scrollAreaRef);
  const isArticleLoading = useRecoilValue(isArticleLoadingState);

  // 最上部までスクロールされているかを判定（FVに戻れるかの判定条件として使用）
  useEffect(() => {
    if (y <= 0) {
      setIsTopOfContent(() => true);
    } else {
      setIsTopOfContent(() => false);
    }
  }, [y, setIsTopOfContent]);

  const { prev, next, goToTop } = usePagination();

  // スクロールでページ移動
  useEffect(() => {
    const scrollAreaEl = scrollAreaRef.current;
    const onwheel = (e: WheelEvent) => {
      if (!isArticleLoading.loading) {
        if (e.deltaY < 0 && y <= 0) {
          prev();
        }

        if (
          e.deltaY > 0 &&
          scrollAreaEl &&
          Number(scrollAreaEl?.offsetHeight) + Number(y) >=
            Number(scrollAreaEl?.scrollHeight) - 1
        ) {
          next();
        }
      }
    };

    scrollAreaEl?.addEventListener('wheel', onwheel);

    return () => {
      scrollAreaEl?.removeEventListener('wheel', onwheel);
    };
  }, [scrollAreaRef, prev, next, y, isArticleLoading]);

  // スワイプでページ移動
  const swipeableHandlers = useSwipeable({
    onSwipedDown: () => {
      if (y <= 0) {
        prev();
      }
    },
    onSwipedUp: () => {
      const scrollAreaEl = scrollAreaRef.current;
      if (
        scrollAreaRef.current &&
        Number(scrollAreaEl?.offsetHeight) + Number(y) >=
          Number(scrollAreaEl?.scrollHeight)
      ) {
        next();
      }
    },
    delta: 20,
    swipeDuration: 250,
  });

  // swipeableとrefを共有する
  const swipeableRefPassthrough = (el: HTMLElement | null) => {
    swipeableHandlers.ref(el);
    scrollAreaRef.current = el;
  };

  // カテゴリクリア
  const [selectedCategory, setSelectedCategory] = useSelectedCategory();
  const onClickClear = () => {
    setSelectedCategory('');
  };

  const onClickTopButton = () => {
    goToTop();
    scrollAreaRef.current?.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative h-[var(--vh-full)] w-full">
      <SimpleBar
        className="main-container ml-auto mr-auto box-content  h-full max-w-[35em] overflow-y-auto pr-5 pl-12 lg:mr-0 lg:pl-5"
        scrollableNodeProps={{
          ...swipeableHandlers,
          ref: swipeableRefPassthrough,
        }}
      >
        <div className="min-h-full pt-6 pb-20 lg:pt-10">
          {selectedCategory && (
            <div className="flex items-center justify-between rounded-full bg-sub04 py-2 px-5 text-base font-bold text-main01 lg:hidden">
              <span>絞り込み：{selectedCategory}</span>
              <button
                type="button"
                className="ml-2 flex shrink-0 items-center"
                onClick={onClickClear}
              >
                クリア
                <CgCloseO className="ml-0.5 text-lg" />
              </button>
            </div>
          )}
          <Article containerRef={scrollAreaRef} />
        </div>
      </SimpleBar>
      <button
        type="button"
        className="absolute bottom-[30px] right-8 z-10 inline-flex items-center rounded-full border-2 border-main01 bg-white py-1 px-4 text-base font-medium text-main01 transition-[background-color] hover:bg-main05 lg:right-0 lg:py-1.5 lg:px-5"
        onClick={onClickTopButton}
      >
        <span>トップ</span>
        <FiArrowUp className="ml-1 text-[1.1em] lg:mt-0.5" />
      </button>
    </div>
  );
};

export default ContentsContainer;
