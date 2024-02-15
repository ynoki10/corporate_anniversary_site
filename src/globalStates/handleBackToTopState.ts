import { atom, selector } from 'recoil';

export const isOnTimelineState = atom<boolean>({
  key: 'isOnTimeline',
  default: false,
});

export const isFirstArticleState = atom<boolean>({
  key: 'isFirstArticle',
  default: false,
});

export const isTopOfContentState = atom<boolean>({
  key: 'isTopOfContent',
  default: true,
});

export const canBackToTopState = selector<boolean>({
  key: 'canBackToTopState',
  get: ({ get }) => {
    const isOnTimeline = get(isOnTimelineState);
    const isFirstArticle = get(isFirstArticleState);
    const isTopOfContent = get(isTopOfContentState);

    return !isOnTimeline && isFirstArticle && isTopOfContent;
  },
});
