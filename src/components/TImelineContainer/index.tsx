import { useCallback, useEffect, useRef, useState } from 'react';

import { IoChevronForwardCircleSharp } from 'react-icons/io5';
import { useClickAway } from 'react-use';
import { useSetRecoilState } from 'recoil';

import CategorySelect from '@/components/CategorySelect';
import Timeline from '@/components/Timeline';
import { isOnTimelineState } from '@/globalStates/handleBackToTopState';

const TimelineContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const setIsOnTimeline = useSetRecoilState(isOnTimelineState);
  const timelineEl = useRef<HTMLDivElement>(null);

  // ボタンをクリック・タップで年表エリアを開閉
  const onButtonClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  // 年表エリア以外をクリック・タップで年表を閉じる
  useClickAway(timelineEl, () => {
    setIsOpen(false);
  });

  // 年表エリアを操作中か判定してGlobalStateにセット（FVに戻れるかの判定条件として使用）
  useEffect(() => {
    const timelineDiv = timelineEl.current;
    const mouseenterHandler = () => {
      setIsOnTimeline(true);
    };
    const mouseleaveHandler = () => {
      setIsOnTimeline(false);
    };
    const touchstartHandler = () => {
      setIsOnTimeline(true);
    };
    const touchendHandler = () => {
      setTimeout(() => {
        setIsOnTimeline(false);
      });
    };

    timelineDiv?.addEventListener('mouseenter', mouseenterHandler);
    timelineDiv?.addEventListener('mouseleave', mouseleaveHandler);
    timelineDiv?.addEventListener('touchstart', touchstartHandler);
    timelineDiv?.addEventListener('touchend', touchendHandler);

    return () => {
      timelineDiv?.removeEventListener('mouseenter', mouseenterHandler);
      timelineDiv?.removeEventListener('mouseleave', mouseleaveHandler);
      timelineDiv?.removeEventListener('touchstart', touchstartHandler);
      timelineDiv?.removeEventListener('touchend', touchendHandler);
    };
  }, [timelineEl, setIsOnTimeline]);

  return (
    <div
      ref={timelineEl}
      className={`fixed left-0 top-0 z-20 w-[280px] shrink-0 bg-main01 transition-transform duration-500 lg:relative lg:w-[400px] lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : 'translate-x-[-100%]'
      }`}
    >
      <div className="absolute left-0 top-0 z-10 w-full rounded-b-[20px] bg-main02 p-5">
        <CategorySelect />
      </div>
      <div className="h-[var(--vh-full)] pb-4 pt-16">
        <a
          href="/"
          className="ml-7 mr-5 mt-4 block transition-opacity hover:opacity-80"
        >
          <img
            className="block w-full"
            src="./images/banner.jpg"
            alt="社長からのメッセージ"
            width={300}
            height={100}
          />
        </a>
        <Timeline />
      </div>
      <button
        type="button"
        className="absolute right-0 top-[60%] flex h-[180px] w-10 -translate-y-1/2 translate-x-[100%] flex-col items-center justify-center gap-y-1 rounded-r bg-main01 text-base text-white lg:hidden"
        onClick={onButtonClick}
      >
        <span className="writing-vertical tracking-widest">
          会社の年表
        </span>
        <IoChevronForwardCircleSharp
          className={`text-[1.2em] transition-transform duration-500 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>
    </div>
  );
};

export default TimelineContainer;
