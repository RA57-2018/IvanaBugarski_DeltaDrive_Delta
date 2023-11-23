import axios from 'axios';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';

import { apiUrl } from '@/helpers';
import { Options, UserRegistration } from '@/types';

const USER_API_URL = '/v1/user';

const USER_QUERY_KEY = 'user';
const TOKEN_QUERY_KEY = 'token';
const TOKEN_REFRESH_QUERY_KEY = 'token-refresh';

export const usersApi = {
  token: (email: string, pass: string) =>
    axios.post(`${apiUrl()}${USER_API_URL}/token`, { email: email, password: pass }),
  register: (payload: UserRegistration) => axios.post(`${apiUrl()}${USER_API_URL}/registration`, payload),
  refreshToken: (refreshToken: string) =>
    axios.post(`${apiUrl()}${USER_API_URL}/refreshToken`, { refresh: refreshToken }),
};

export const useGetTokenQuery = (email: string, pass: string, enabled: boolean) => {
  return useQuery([TOKEN_QUERY_KEY], () => usersApi.token(email, pass), { enabled: enabled });
};

export const useRefreshTokenQuery = (accessToken: string) => {
  return useQuery([TOKEN_REFRESH_QUERY_KEY], () => usersApi.refreshToken(accessToken));
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
