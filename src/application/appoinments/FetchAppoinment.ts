import { ENV } from '../../config/env';

export const fetchAppoinments = async () => {
  if (ENV !== 'mock') {
    throw new Error('Not implemented');
  }

  return { };
};
