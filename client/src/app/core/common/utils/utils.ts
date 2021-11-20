import { v4 } from 'uuid';

export const getAndLogUuid = (): string => {
  const _id = v4();
  console.log(_id);
  return _id;
};
