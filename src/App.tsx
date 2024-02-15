import { useEffect } from 'react';

import { Transition } from '@headlessui/react';
import { useRecoilState } from 'recoil';

import type { Content } from '@/types/content';

import Fv from '@/components/Fv';
import MainArea from '@/components/MainArea';
import setVhCssVar from '@/functions/setVhCssVar';
import { allArticlesState } from '@/globalStates/allArticlesState';
import pageState from '@/globalStates/pageState';
import useData from '@/hooks/useData';
import usePagination from '@/hooks/usePagination';

const App = () => {
  const [page, setpage] = useRecoilState(pageState);
  const [allArticles, setAllArticles] = useRecoilState(allArticlesState);
  const JSONData = useData<Content[]>('./data/contents.json');
  const { goToPage } = usePagination();

  useEffect(() => {
    if (JSONData) {
      setAllArticles(() => JSONData);
    }
  }, [setAllArticles, JSONData]);

  useEffect(() => {
    if (allArticles[0].id !== '') {
      // クエリから指定記事表示
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      if (id) {
        setpage('main');
        goToPage(id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allArticles]);

  useEffect(() => {
    setVhCssVar();
  }, []);

  return JSONData ? (
    <div className="grid h-[var(--vh-full)] overflow-hidden bg-sub05">
      <Transition
        className="col-span-full row-span-full h-full w-full"
        show={page === 'fv'}
        enter="transition-translate duration-700"
        enterFrom="translate-y-[-100%]"
        enterTo="translate-y-[0]"
        leave="transition-translate duration-700"
        leaveFrom="translate-y-[0]"
        leaveTo="translate-y-[-100%]"
        unmount={false}
      >
        <Fv />
      </Transition>
      <Transition
        className="col-span-full row-span-full h-full w-full"
        show={page === 'main'}
        enter="transition-translate duration-700"
        enterFrom="translate-y-[100%]"
        enterTo="translate-y-[0]"
        leave="transition-translate duration-700"
        leaveFrom="translate-y-[0]"
        leaveTo="translate-y-[100%]"
      >
        <MainArea />
      </Transition>
    </div>
  ) : null;
};

export default App;
