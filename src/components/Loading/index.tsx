import { Transition } from '@headlessui/react';
import { useRecoilValue } from 'recoil';

import isCatetegoryLoadingState from '@/globalStates/isCategoryLoadingState';

const Loading = () => {
  const isLoading = useRecoilValue(isCatetegoryLoadingState);

  return (
    <Transition
      show={isLoading}
      className="relative z-50"
      enter="transition-opacity duration-700"
      enterFrom="opacity-0"
      enterTo="opacity-1"
      leave="transition-opacity duration-700"
      leaveFrom="opacity-1"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 grid place-items-center bg-[rgba(255,255,255,.9)]">
        <div className="flex items-end gap-x-2.5">
          <img
            className="person-animation"
            src="./images/person.svg"
            alt=""
            width={62}
            height={63}
          />
          <div className="flex gap-x-2.5">
            <span className="dot-animation h-2.5 w-2.5 rounded-full" />
            <span className="dot-animation h-2.5 w-2.5 rounded-full" />
            <span className="dot-animation h-2.5 w-2.5 rounded-full" />
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Loading;
