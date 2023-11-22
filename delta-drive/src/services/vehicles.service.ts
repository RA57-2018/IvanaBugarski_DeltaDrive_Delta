import axios from 'axios';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';

import { apiUrl } from '@/helpers';
import { BookVehicleType, FeedbackType, Options } from '@/types';

const VEHICLE_API_URL = '/v1/vehicle';

const VEHICLE_QUERY_KEY = 'vehicle';
const VEHICLE_ID_QUERY_KEY = 'vehicleId';

export const vehiclesApi = {
  approveBookVehicle: (payload: BookVehicleType) => axios.post(`${apiUrl()}${VEHICLE_API_URL}/approveBookVehicle`, payload),
  bookVehicle: (payload: BookVehicleType) => axios.post(`${apiUrl()}${VEHICLE_API_URL}/bookVehicle`, payload),
  getAllVehicles: () => axios.get(`${apiUrl()}${VEHICLE_API_URL}/getAllVehicles`),
  getHistoryData: () => axios.get(`${apiUrl()}${VEHICLE_API_URL}/getHistory`),
  getVehiclesById: (id: string) => axios.get(`${apiUrl()}${VEHICLE_API_URL}/getVehiclesById/${id}`),
  sendFeedback: (payload: FeedbackType) => axios.post(`${apiUrl()}${VEHICLE_API_URL}/sendFeedback`, payload)
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

export const useGetAllVehiclesQuery = () => {
  return useQuery([VEHICLE_QUERY_KEY], vehiclesApi.getAllVehicles);
};

export const useGetHistoryDataQuery = () => {
  return useQuery([VEHICLE_QUERY_KEY], vehiclesApi.getHistoryData);
};

export const useGetVehiclesById = (id: string) => {
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
