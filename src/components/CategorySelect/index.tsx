import { useMemo } from 'react';

import { Disclosure, Transition } from '@headlessui/react';
import { CgCloseO } from 'react-icons/cg';
import { useRecoilValue } from 'recoil';

import CategorySelectButton from '@/components/CategorySelect/Button';
import { categoriesState } from '@/globalStates/allArticlesState';
import useSelectedCategory from '@/hooks/useSelectedCategory';

const CategorySelect = () => {
  const categories = useRecoilValue(categoriesState);
  const categoriesSeparated = useMemo(() => {
    const halfLength = Math.ceil(categories.length / 2);
    const firstArr = categories.slice(0, halfLength);
    const secondArr = categories.slice(halfLength);

    return [[...firstArr], [...secondArr]];
  }, [categories]);

  const [selectedCategory, setSelectedCategory] = useSelectedCategory();

  const onClickClear = () => {
    setSelectedCategory('');
  };

  return (
    <Disclosure>
      {({ open }) => (
        <>
          {selectedCategory ? (
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-white">
                絞り込み：{selectedCategory}
              </span>
              <button
                type="button"
                className="ml-2 flex shrink-0 items-center text-base font-bold text-white"
                onClick={onClickClear}
              >
                クリア
                <CgCloseO className="ml-1 text-lg" />
              </button>
            </div>
          ) : (
            <Disclosure.Button className="-m-1 flex w-full items-center justify-between p-1">
              <p className="text-base font-bold text-white">
                年表カテゴリで絞り込み
              </p>
              <div
                className={`relative h-5 w-5 rounded-full bg-main01 before:absolute before:top-[50%] before:left-[50%] before:block before:h-[1px] before:w-2.5 before:translate-x-[-50%] before:translate-y-[-50%] before:rotate-[90deg] before:bg-white before:transition-transform before:content-[''] after:absolute after:top-[50%] after:left-[50%] after:block after:h-[1px] after:w-2.5 after:translate-x-[-50%] after:translate-y-[-50%] after:bg-white after:content-[''] ${
                  open ? 'before:rotate-[180deg]' : ''
                }`}
              >
                <span className="sr-only">カテゴリメニューを開く</span>
              </div>
            </Disclosure.Button>
          )}
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel>
              {({ close }) => (
                <>
                  {/* 狭幅の場合は全カテゴリを2段に分けて横スクロール */}
                  <div className="mt-2.5 overflow-x-auto lg:hidden">
                    <div className="flex flex-col gap-y-2">
                      <div className="flex gap-x-2 whitespace-nowrap">
                        {categoriesSeparated[0].map(
                          (text) =>
                            text && (
                              <CategorySelectButton
                                key={text}
                                categoryName={text}
                                close={close}
                              />
                            ),
                        )}
                      </div>
                      <div className="flex gap-x-2 whitespace-nowrap">
                        {categoriesSeparated[1].map(
                          (text) =>
                            text && (
                              <CategorySelectButton
                                key={text}
                                categoryName={text}
                                close={close}
                              />
                            ),
                        )}
                      </div>
                    </div>
                  </div>

                  {/* PC幅ではスクロールさせずに全て表示 */}
                  <div className="mt-2.5 hidden flex-wrap gap-x-3 gap-y-2.5 lg:flex">
                    {categories.map(
                      (text) =>
                        text && (
                          <CategorySelectButton
                            key={text}
                            categoryName={text}
                            close={close}
                          />
                        ),
                    )}
                  </div>
                </>
              )}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default CategorySelect;
