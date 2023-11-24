import { initialAxiosResponse } from '@/helpers';
import { useGetHistoryDataQuery } from '@/services';
import { Grid, GridItem, Text as Info, Spinner } from '@chakra-ui/react';
import { Feedback } from './Feedback';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { UserContext } from '@/contexts';

export const HistoryPage = () => {
  const [t] = useTranslation('common');
  const { currentUser } = useContext(UserContext);

  const { data: historyData = initialAxiosResponse, isLoading } = useGetHistoryDataQuery(currentUser === null ? '' : currentUser.id);

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
              <Info>{t('driver')}: {history.driverFirstName} {history.driverLastName}</Info>
              <Feedback idVehicle={history.id}/>
            </GridItem>
          ))}
        </Grid>
      )}
    </>
  );
};