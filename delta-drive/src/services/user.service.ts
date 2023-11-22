import axios from 'axios';
import { QueryClient, useMutation } from '@tanstack/react-query';

import { apiUrl } from '@/helpers';
import { Options, UserRegistration } from '@/types';

const USER_API_URL = '/v1/user';

const USER_QUERY_KEY = 'user';

export const usersApi = {
  register: (payload: UserRegistration) => axios.post(`${apiUrl()}${USER_API_URL}/registration`, payload),
};

export const useRegisterUserMutation = (queryClient: QueryClient, options: Options) => {
  return useMutation(usersApi.register, {
    onSuccess: (response) => {
      options.onSuccess(response);
      queryClient.invalidateQueries([USER_QUERY_KEY]);
    },
    onError: (error) => {
      options.onError(error);
    }
  });
};
