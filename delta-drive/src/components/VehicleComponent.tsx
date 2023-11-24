import { useTranslation } from 'react-i18next';
import { AxiosResponse } from 'axios';
import { Button, Grid, GridItem, Text as Info } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { Feedback } from '@/pages';
import { useErrorToast, useSuccessToast } from '@/helpers';
import { useBookVehicleMutation } from '@/services';
import { BookVehicleType } from '@/types';

interface VehicleProps {
  isHistory: boolean;
  data: any;
}

export const VehicleComponent = (props: VehicleProps) => {
  const [t] = useTranslation('common');
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();
  const queryClient = useQueryClient();
  const currentUser = '';

  return (
    <></>
  );
};