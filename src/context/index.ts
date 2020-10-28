import { createContext } from 'react';

interface Context {
  apiNum: number;
  startTime: Date;
  endTime: Date;
  onPrevClick: () => void;
  onNextClick: () => void;
}

const context = createContext({} as Context);

export default context;
