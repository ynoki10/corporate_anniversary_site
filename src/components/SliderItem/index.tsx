import { useSetRecoilState } from 'recoil';

import pageState from '@/globalStates/pageState';
import usePagination from '@/hooks/usePagination';

type Props = {
  image: string;
  category: string;
  targetId: string;
  link?: string | null;
  isSmall?: boolean;
};

const SliderItem = (props: Props) => {
  const { image, category, targetId, link = null, isSmall = false } = props;

  const setpage = useSetRecoilState(pageState);
  const { goToPage } = usePagination();

  const onClick = () => {
    setpage('main');
    goToPage(targetId);
  };

  return link ? (
    <a
      href={link}
      className={`group grid overflow-hidden rounded-md bg-gray-300 shadow-[0_0_16px_rgba(29,68,87,0.26)] ${
        isSmall
          ? 'w-[clamp(94px,17.5vh-8px,190px)]'
          : 'w-[clamp(220px,35vh,413px)]'
      }`}
    >
      <img
        className="z-0 col-span-full row-span-full h-auto w-full transition-[filter] duration-300 group-hover:brightness-[0.8]"
        src={image}
        alt=""
        width={410}
        height={410}
      />
      <span className="z-10 col-span-full row-span-full mt-auto w-fit rounded-bl-md rounded-tr-md bg-sub04 px-2 py-1.5 text-xs text-main01 transition-[background-color] duration-300 group-hover:bg-sub03">
        {category}
      </span>
    </a>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className={`group grid overflow-hidden rounded-md bg-gray-300 shadow-[0_0_16px_rgba(29,68,87,0.26)] ${
        isSmall
          ? 'w-[clamp(94px,17.5vh-8px,190px)]'
          : 'w-[clamp(220px,35vh,413px)]'
      }`}
    >
      <img
        className="z-0 col-span-full row-span-full h-auto w-full transition-[filter] duration-300 group-hover:brightness-[0.8]"
        src={image}
        alt=""
        width={410}
        height={410}
      />
      <span className="z-10 col-span-full row-span-full mt-auto w-fit rounded-bl-md rounded-tr-md bg-sub04 px-2 py-1.5 text-xs text-main01 transition-[background-color] duration-300 group-hover:bg-sub03">
        {category}
      </span>
    </button>
  );
};

SliderItem.defaultProps = {
  link: null,
  isSmall: false,
};

export default SliderItem;
