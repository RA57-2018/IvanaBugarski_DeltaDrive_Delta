import axios from 'axios';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';

import { apiUrl } from '@/helpers';
import { BookVehicleType, FeedbackType, FinishType, Options } from '@/types';

const VEHICLE_QUERY_KEY = 'vehicle';
const VEHICLE_ID_QUERY_KEY = 'vehicleId';

export const vehiclesApi = {
  bookVehicle: (payload: BookVehicleType) => axios.post(`${apiUrl()}/bookVehicle`, payload),
  finishRide: (payload: FinishType) => axios.post(`${apiUrl()}/finishRide`, payload),
  getAllVehicles: () => axios.get(`${apiUrl()}/getAllVehicles`),
  getHistoryData: (id: string) => axios.get(`${apiUrl()}/getHistory/${id}`),
  getVehiclesById: (id: number) => axios.get(`${apiUrl()}/getVehiclesById/${id}`),
  sendFeedback: (payload: FeedbackType) => axios.post(`${apiUrl()}/sendFeedback`, payload)
};

export const useBookVehicleMutation = (queryClient: QueryClient, options: Options) => {
  return useMutation(vehiclesApi.bookVehicle, {
    onSuccess: (response) => {
      options.onSuccess(response);
      queryClient.invalidateQueries([VEHICLE_QUERY_KEY]);
    },
    onError: (error) => {
      options.onError(error);
    }
  });
};

export const useFinishRideMutation = (queryClient: QueryClient, options: Options) => {
  return useMutation(vehiclesApi.finishRide, {
    onSuccess: (response) => {
      options.onSuccess(response);
      queryClient.invalidateQueries([VEHICLE_QUERY_KEY]);
    },
    onError: (error) => {
      options.onError(error);
    }
  });
};

export const useGetAllVehiclesQuery = () => {
  return useQuery([VEHICLE_QUERY_KEY], vehiclesApi.getAllVehicles);
};

export const useGetHistoryDataQuery = (id: string) => {
  return useQuery([VEHICLE_QUERY_KEY], () => vehiclesApi.getHistoryData(id), {enabled: !!id});
};

export const useGetVehiclesByIdQuery = (id: number) => {
  return useQuery([VEHICLE_ID_QUERY_KEY], () => vehiclesApi.getVehiclesById(id), {enabled: !!id});
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
