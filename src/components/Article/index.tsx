import type { RefObject } from 'react';
import { useEffect } from 'react';

import { useRecoilValue } from 'recoil';

import isArticleLoadingState from '@/globalStates/isArticleLoadingState';
import useCurrentArticle from '@/hooks/useCurrentArticle';

type Props = {
  containerRef: RefObject<HTMLElement>;
};

const Article = (props: Props) => {
  const { containerRef } = props;
  const {
    id,
    timelineOnly = false,
    year = null,
    month = null,
    category = null,
    title = null,
    headImagesNum = 0,
    body = null,
    bottomImagesNum = 0,
    body02 = null,
    link = null,
    interview = null,
  } = useCurrentArticle();

  useEffect(() => {
    containerRef.current?.scroll(0, 0);
  }, [id, containerRef]);

  const isLoading = useRecoilValue(isArticleLoadingState);
  const animClass = () => {
    const inOut = isLoading.loading ? 'fade-out' : 'fade-in';
    let direction = '';
    if (isLoading.direction === 'prev') {
      direction = '-down';
    }
    if (isLoading.direction === 'next') {
      direction = '-up';
    }

    return inOut + direction;
  };

  const headImages =
    headImagesNum !== 0
      ? Array.from({ length: headImagesNum }).map(
          (_, i) => `./images/articles/${id}/head0${i + 1}.jpg`,
        )
      : null;

  const bottomImages =
    bottomImagesNum !== 0
      ? Array.from({ length: bottomImagesNum }).map(
          (_, i) => `./images/articles/${id}/bottom0${i + 1}.jpg`,
        )
      : null;

  if (timelineOnly) {
    return null;
  }

  return (
    <article
      className={`flex flex-col gap-y-6 transition-opacity duration-500 ${animClass()}`}
    >
      {/* 日付・タイトル・カテゴリなど */}
      <div>
        <div className="flex gap-x-3">
          <p className="text-2xl text-main01">
            {month ? (
              <>
                <span className="font-en text-4xl">{year}</span>
                <span className="mx-1">年</span>
                <span className="font-en text-4xl">{month}</span>
                <span className="ml-1">月</span>
              </>
            ) : (
              <>
                <span className="font-en text-4xl">{year}</span>
                <span className="ml-1">年</span>
              </>
            )}
          </p>
        </div>
        <h2
          className="text-2xl font-medium text-main01"
          dangerouslySetInnerHTML={{ __html: title ?? '' }}
        />
        <p className="mt-2 inline-block rounded-md bg-sub04 py-1.5 px-2 text-sm font-medium text-main01 lg:mt-3">
          {category}
        </p>
      </div>
      {/* 日付・タイトル・カテゴリなど */}

      {/* メイン画像 */}
      {headImages && (
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2">
          {headImages.map((image, i) => (
            <img
              key={image}
              src={image}
              alt=""
              width={550}
              height={310}
              className={`w-full ${
                headImages.length === 1 && i === 0 ? 'col-span-2' : ''
              } ${headImages.length === 3 && i === 0 ? 'col-span-2' : ''}`}
            />
          ))}
        </div>
      )}
      {/* メイン画像 */}

      {/* 本文 */}
      {body && (
        <div
          className="[&_b:font-bold] font-light [&_h3]:border-b [&_h3]:border-gt04 [&_h3]:pb-2 [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-main01 [&>*+*]:mt-6 [&_p]:lg:leading-8"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      )}
      {/* 本文 */}

      {/* 下部画像 */}
      {bottomImages && (
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2">
          {bottomImages.map((image, i) => (
            <img
              key={image}
              src={image}
              alt=""
              width={550}
              height={310}
              className={`w-full ${
                bottomImages.length === 1 && i === 0 ? 'col-span-2' : ''
              } ${bottomImages.length === 3 && i === 0 ? 'col-span-2' : ''}`}
            />
          ))}
        </div>
      )}
      {/* 下部画像 */}

      {/* 本文2 */}
      {body02 && (
        <div
          className="[&_b:font-bold] font-light [&_h3]:border-b [&_h3]:border-gt04 [&_h3]:pb-2 [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-main01 [&>*+*]:mt-6 [&_p]:lg:leading-8"
          dangerouslySetInnerHTML={{ __html: body02 }}
        />
      )}
      {/* 本文2 */}

      {/* リンク */}
      {link && (
        <div className="text-right">
          <a
            href={link.url || ''}
            target="_blank"
            className="group inline-flex items-center gap-x-2 lg:gap-x-3"
            rel="noreferrer"
          >
            <span
              className="text-base underline"
              dangerouslySetInnerHTML={{ __html: link.text ?? '' }}
            />
            <span className="grid aspect-square w-[clamp(1.625rem,1.336rem+1.23vw,2.125rem)] place-items-center rounded-full bg-main01 transition-[background] group-hover:bg-main02">
              <img
                className="w-2.5 lg:w-3"
                src="./images/icon-external.svg"
                alt="別ウインドウで開く"
                width={13}
                height={13}
              />
            </span>
          </a>
        </div>
      )}
      {/* リンク */}

      {/* インタビュー */}
      {interview && (
        <div className="flex flex-col gap-y-8 bg-sub05 p-5 pb-8 lg:p-7 lg:pb-10">
          <h3 className="border-b border-gt04 pb-2 text-xl font-medium uppercase text-main01">
            Interview
          </h3>
          <div className="flex flex-col gap-y-2.5 lg:flex-row lg:items-center lg:gap-x-5">
            <img
              className="mx-auto w-[120px] shrink-0 lg:mx-0"
              src={`./images/articles/${id}/interview.jpg`}
              alt=""
              width={120}
              height={120}
            />
            <div>
              {interview.company && (
                <p
                  className="text-sm font-medium"
                  dangerouslySetInnerHTML={{ __html: interview.company }}
                />
              )}
              {interview.name && (
                <p
                  className="mt-1 text-lg font-medium"
                  dangerouslySetInnerHTML={{ __html: interview.name }}
                />
              )}
              {interview.position && (
                <p
                  className="mt-1 text-sm font-medium text-gt02"
                  dangerouslySetInnerHTML={{
                    __html: interview.position,
                  }}
                />
              )}
            </div>
          </div>
          {interview.body && (
            <div
              className="[&_b:font-bold] font-light [&>*+*]:mt-6 [&_p]:lg:leading-8 [&_h4]:border-b [&_h4]:border-gt04 [&_h4]:pb-2 [&_h4]:text-xl [&_h4]:font-medium [&_h4]:text-main01"
              dangerouslySetInnerHTML={{
                __html: interview.body
                  .replace(/<h3/g, '<h4')
                  .replace(/<\/h3>/g, '</h4>'),
              }}
            />
          )}
        </div>
      )}
      {/* インタビュー */}
    </article>
  );
};

export default Article;
