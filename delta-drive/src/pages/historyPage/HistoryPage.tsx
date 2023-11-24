import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AxiosResponse } from 'axios';
import { Box, Button, Grid, GridItem, Text as Info, Spinner } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { UserContext } from '@/contexts';
import { Feedback } from './Feedback';
import { initialAxiosResponse, useErrorToast, useSuccessToast } from '@/helpers';
import { useFinishRideMutation, useGetHistoryDataQuery } from '@/services';

export const HistoryPage = () => {
  const [t] = useTranslation('common');
  const { currentUser } = useContext(UserContext);
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();
  const queryClient = useQueryClient();

  const { data: historyData = initialAxiosResponse, isLoading } = useGetHistoryDataQuery(currentUser === null ? '' : currentUser.id);

  const { mutate: finishRide } = useFinishRideMutation(queryClient, {
    onSuccess: (response?: AxiosResponse) => {
      successToast({ title: t('successfulRideFinish', { response }) });
      console.log(response);
    },
    onError: () => {
      errorToast({ title: t('unsuccessfulRideFinish') });
    }
  });

  const handleFinishRide = (rideId: number) => {
    const payload = {
      rideId: rideId
    };
    finishRide(payload);
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Grid templateColumns='repeat(2, 1fr)' gap={10} p={5}>
          {historyData?.data?.map((history: any, index: number) => (
            <div key={index}>
              <GridItem
                bg='blue.300'
                w='full'
                height='40%'
                borderRadius='10'
                textColor='white'>
                <Box ml={3}>
                  <Info>{t('startingLocation')}: {history.startingLocation}</Info>
                  <Info>{t('endingLocation')}: {history.endingLocation}</Info>
                  <Info>{t('totalPrice')}: {history.totalPrice} {t('eur')}</Info>
                  <Info>{t('driver')}: {history.firstName} {history.lastName}</Info>
                </Box>
                <Feedback idVehicle={history.id}/>
                {!history.isEnded && (
                  <Button
                    type='button'
                    minW='100px'
                    size='lg'
                    top='15px'
                    bg='blue.600'
                    textColor='white'
                    _hover={{ bg: 'blue.400' }}
                    ml={3}
                    mb={3}
                    cursor='pointer'
                    onClick={() => handleFinishRide(history.id)}>
                    {t('finishRide')}
                  </Button>
                )}
              </GridItem>
            </div>
          ))}
        </Grid>
      )}
    </>
  );
};
