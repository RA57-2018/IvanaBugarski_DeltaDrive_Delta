import axios from 'axios';
import { QueryClient, useMutation } from '@tanstack/react-query';

import { apiUrl } from '@/helpers';
import { FeedbackType, Options } from '@/types';

const VEHICLE_API_URL = '/v1/vehicle';

const VEHICLE_QUERY_KEY = 'vehicle';

export const vehiclesApi = {
  sendFeedback: (payload: FeedbackType) => axios.post(`${apiUrl()}${VEHICLE_API_URL}/sendFeedback`, payload),
};

export const useSendFeedbackMutation = (queryClient: QueryClient, options: Options) => {
  return useMutation(vehiclesApi.sendFeedback, {
    onSuccess: (response) => {
      options.onSuccess(response);
      queryClient.invalidateQueries([VEHICLE_QUERY_KEY]);
    },
    onError: (error) => {
      options.onError(error);
    }
  });
};
