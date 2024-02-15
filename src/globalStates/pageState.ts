import { atom } from 'recoil';

const pageState = atom<'fv' | 'main'>({
  key: 'page',
  default: 'fv',
});

export default pageState;
