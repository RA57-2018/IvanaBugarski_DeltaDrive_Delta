import { useTranslation } from 'react-i18next';
import { Button, Grid, GridItem, Text as Info } from '@chakra-ui/react';

import { Feedback } from '@/pages';

interface VehicleProps {
  isHistory: boolean;
  data: [];
}

export const VehicleComponent = (props: VehicleProps) => {
  const [t] = useTranslation('common');

  const historyData = [
    {
      startingLocation: '',
      endingLocation: '',
      driverFirstName: 'John',
      driverLastName: 'Doe',
      totalPrice: '$25.00'
    },
    {
      startingLocation: '',
      endingLocation: '',
      driverFirstName: 'John1',
      driverLastName: 'Doe1',
      totalPrice: '$25.00'
    },
    {
      startingLocation: '',
      endingLocation: '',
      driverFirstName: 'John1',
      driverLastName: 'Doe1',
      totalPrice: '$25.00'
    }
  ];

  const vehicleData = props.data.slice(0, 10);

  const handleBookVehicle = (idVehicle: number) => {
    console.log('You successfully booked vehicle!' + idVehicle);
  };

  //kod feedbacka se salje id bas nemoj preko indeksa da ides (kad povezes sa back-om)

  return (
    <Grid
      display='flex'
      alignItems='center'
      justifyContent='center'>
      {props.isHistory ? (
        historyData.map((history, index) => (
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
            <Feedback idVehicle={index + 1}/>
          </GridItem>
        ))
      ) : (
        vehicleData.map((vehicle: any, index: number) => (
          <GridItem
            key={index}
            bg='blue.300'
            mb='5'
            mt='5'
            w='40%'
            flex='center'
            alignItems='center'
            justifyContent='center'
            height='50vh'
            ml='5'
            borderRadius='10'
            textColor='white'>
            <Info>{t('brand')}: {vehicle.brand}</Info>
            <Info>{t('driver')}: {vehicle.driverFirstName} {vehicle.driverLastName}</Info>
            <Info>{t('distanceFromPassenger')}: {vehicle.distanceFromPassenger}</Info>
            <Info>{t('rating')}: {vehicle.rating}</Info>
            <Info>{t('startingPrice')}: {vehicle.startingPrice}</Info>
            <Info>{t('pricePerKM')}: {vehicle.pricePerKM}</Info>
            <Info>{t('totalPrice')}: {vehicle.totalPrice} {t('eur')}</Info>
            <Button
              type='button'
              minW='100px'
              size='lg'
              top='15px'
              textColor='white'
              bg='blue.600'
              _hover={{bg: 'blue.400'}}
              ml={3}
              mb={3}
              cursor='pointer'
              onClick={() => handleBookVehicle(index)}>
              {t('bookVehicle')}
            </Button>
          </GridItem>
        ))
      )}
    </Grid>
  );
};