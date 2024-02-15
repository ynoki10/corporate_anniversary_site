import { useRef } from 'react';

import SimpleBar from 'simplebar-react';

import 'simplebar-react/dist/simplebar.min.css';

import TimelineItem from '@/components/TimelineItem';
import useTimelineItems from '@/hooks/useTimelineItems';

const Timeline = () => {
  const items = useTimelineItems();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  return (
    <SimpleBar
      className="timeline-container h-[calc(100%-100px)] overflow-y-auto lg:h-[calc(100%-140px)]"
      scrollableNodeProps={{ ref: scrollAreaRef }}
    >
      <nav className="min-h-full pl-9 pr-5 pt-4">
        <ul className="relative flex min-h-[calc(var(--vh-full)-320px)] flex-col gap-y-12 pb-6 before:absolute before:top-4 before:left-[-1px] before:h-[calc(100%-32px)] before:w-[1px] before:bg-white before:content-[''] lg:min-h-[calc(var(--vh-full)-396px)]">
          {items.map((item) => (
            <TimelineItem
              key={item.id}
              content={item}
              scrollAreaRef={scrollAreaRef}
            />
          ))}
        </ul>
      </nav>
    </SimpleBar>
  );
};

export default Timeline;
