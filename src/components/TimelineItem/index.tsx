import type { MouseEvent, RefObject } from 'react';
import { useEffect, useRef } from 'react';

import type { Content } from '@/types/content';

import useCurrentArticleId from '@/hooks/useCurrentArticleId';
import usePagination from '@/hooks/usePagination';
import useTimelineItems from '@/hooks/useTimelineItems';

type Props = {
  content: Content;
  scrollAreaRef: RefObject<HTMLElement>;
};

const TimelineItem = (props: Props) => {
  const {
    content: { id, timelineOnly, year, month, title, category },
    scrollAreaRef,
  } = props;
  const [currentArticleID, _] = useCurrentArticleId();
  const itemRef = useRef<HTMLLIElement>(null);
  const items = useTimelineItems();
  const { goToPage } = usePagination();

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    goToPage(id);
  };

  useEffect(() => {
    if (currentArticleID === id) {
      const scrollAreaEl = scrollAreaRef?.current;
      const itemEl = itemRef?.current;
      if (scrollAreaEl && itemEl) {
        scrollAreaEl?.scrollTo({
          top: itemEl?.offsetTop,
          left: 0,
          behavior: 'smooth',
        });
      }
    }
  }, [id, currentArticleID, scrollAreaRef, items]);

  return (
    <li
      className={`relative pl-3 before:absolute before:top-1.5 before:-left-1.5 before:block before:h-[11px] before:w-[11px] before:rounded-full before:border before:content-[''] ${
        currentArticleID === id && !timelineOnly
          ? 'before:bg-white'
          : 'before:bg-main01'
      }`}
      ref={itemRef}
    >
      {timelineOnly ? (
        <p>
          <span className="flex items-center gap-x-2">
            {year && (
              <span className="text-lg font-medium text-white">
                {month ? `${year}年${month}月` : `${year}年`}
              </span>
            )}
            <span className="rounded-md bg-sub04 py-0.5 px-1.5 text-xs text-main01 transition-[background-color]">
              {category || ''}
            </span>
          </span>
          {title && (
            <span
              className="mt-2 font-light text-white"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
        </p>
      ) : (
        <button onClick={onClick} type="button" className="group text-left">
          <span className="flex items-center gap-x-2">
            {year && (
              <span className="text-lg font-medium text-white">
                {month ? `${year}年${month}月` : `${year}年`}
              </span>
            )}
            <span className="rounded-md bg-sub04 py-0.5 px-1.5 text-xs text-main01 transition-[background-color] group-hover:bg-sub03">
              {category}
            </span>
          </span>
          {title && (
            <span
              className="mt-2 font-light text-white underline"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
        </button>
      )}
    </li>
  );
};

export default TimelineItem;
