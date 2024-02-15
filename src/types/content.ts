export type Content = {
  id: string;
  timelineOnly: boolean;
  year: string | null;
  month: string | null;
  title: string | null;
  category: string | null;
  headImagesNum: 0 | 1 | 2 | 3 | 4;
  body: string | null;
  bottomImagesNum: 0 | 1 | 2 | 3 | 4;
  body02: string | null;
  link: {
    text: string | null;
    url: string | null;
  } | null;
  interview: {
    company: string | null;
    name: string | null;
    position: string | null;
    body: string | null;
  } | null;
};
