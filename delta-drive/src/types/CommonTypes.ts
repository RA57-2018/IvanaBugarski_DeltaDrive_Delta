import { AxiosResponse } from 'axios';

export type Options = {
  onSuccess: (response?: AxiosResponse) => void;
  onError: (error?: unknown) => void;
  enabled?: boolean;
};
