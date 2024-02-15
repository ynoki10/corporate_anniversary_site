import PcSlider from '@/components/PcSlider';
import SpSlider from '@/components/SpSlider';

const FvContents = () => (
  <>
    <header className="relative z-10 bg-white py-5">
      <div className="mx-auto box-content max-w-[1120px] px-5 md:px-8 lg:px-10">
        <h1 className="text-xl font-bold">
          Anniversary Site
        </h1>
      </div>
    </header>
    <div className="relative z-10 grid grow items-center">
      <div className="min-w-full pt-5 pb-10">
        <div className="relative z-20 mx-auto box-content max-w-[1120px] px-5 md:px-8 lg:px-10">
          <div>
            <p className="text-3xl font-bold text-main01">
              JSONのデータから
              <br />
              年表コンテンツを作成。
            </p>
            <p className="mt-3 text-sm font-bold text-main01 md:text-base">
              企業周年記念サイト
            </p>
          </div>
        </div>
        <div className="mt-16 lg:mt-16">
          <div className="lg:hidden">
            <SpSlider />
          </div>
          <div className="hidden lg:block">
            <PcSlider />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default FvContents;
