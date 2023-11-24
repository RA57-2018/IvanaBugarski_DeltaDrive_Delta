import { initialAxiosResponse, useErrorToast, useSuccessToast } from '@/helpers';
import { useFinishRideMutation, useGetHistoryDataQuery } from '@/services';
import { Button, Grid, GridItem, Text as Info, Spinner } from '@chakra-ui/react';
import { Feedback } from './Feedback';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { UserContext } from '@/contexts';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

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
  //dodaj da ako je success za book da se onda stavi da nije slobodan ostalima, kad se finishuje tada je slobodan svima

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Grid
          display='flex'
          alignItems='center'
          justifyContent='center'>
          {historyData?.data?.map((history: any, index: number) => (
            <GridItem
              key={index}
              bg='blue.300'
              mb='5'
              mt='5'
              w='full'
              flex='center'
              alignItems='center'
              justifyContent='center'
              height='20vh'
              ml='5'
              borderRadius='10'
              textColor='white'>
              <Info>{t('startingLocation')}: {history.startingLocation}</Info>
              <Info>{t('endingLocation')}: {history.endingLocation}</Info>
              <Info>{t('totalPrice')}: {history.totalPrice} {'eur'}</Info>
              <Info>{t('driver')}: {history.firstName} {history.lastName}</Info>
              <Feedback idVehicle={history.id}/>
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
            </GridItem>
          ))}
        </Grid>
      )}
    </>
  );
};