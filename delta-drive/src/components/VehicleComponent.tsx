import { Button, Grid, GridItem, Text as Info } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

interface VehicleProps {
  isHistory: boolean;
}

export const VehicleComponent = (props: VehicleProps) => {
  const [t] = useTranslation('common');

  const data = [
    {
      brand: 'Toyota',
      driverFirstName: 'John',
      driverLastName: 'Doe',
      distanceFromPassenger: '500 meters',
      rating: '4.5',
      startingPrice: '$10.00',
      pricePerKM: '$1.50',
      totalPrice: '$25.00'
    },
    {
      brand: 'Audi',
      driverFirstName: 'John1',
      driverLastName: 'Doe1',
      distanceFromPassenger: '300 meters',
      rating: '5',
      startingPrice: '$10.00',
      pricePerKM: '$1.50',
      totalPrice: '$25.00'
    },
    {
      brand: 'Audi',
      driverFirstName: 'John1',
      driverLastName: 'Doe1',
      distanceFromPassenger: '300 meters',
      rating: '5',
      startingPrice: '$10.00',
      pricePerKM: '$1.50',
      totalPrice: '$25.00'
    }
  ];

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

  const handleBookVehicle = (idVehicle: number) => {
    console.log('You successfully booked vehicle!' + idVehicle);
  };

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
            borderRadius='10'>
            <Info>{t('startingLocation')}: {history.startingLocation}</Info>
            <Info>{t('endingLocation')}: {history.endingLocation}</Info>
            <Info>{t('totalPrice')}: {history.totalPrice}</Info>
            <Info>{t('driver')}: {history.driverFirstName} {history.driverLastName}</Info>
          </GridItem>
        ))
      ) : (
        data.map((vehicle, index) => (
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
            borderRadius='10'>
            <Info>{t('brand')}: {vehicle.brand}</Info>
            <Info>{t('driver')}: {vehicle.driverFirstName} {vehicle.driverLastName}</Info>
            <Info>{t('distanceFromPassenger')}: {vehicle.distanceFromPassenger}</Info>
            <Info>{t('rating')}: {vehicle.rating}</Info>
            <Info>{t('startingPrice')}: {vehicle.startingPrice}</Info>
            <Info>{t('pricePerKM')}: {vehicle.pricePerKM}</Info>
            <Info>{t('totalPrice')}: {vehicle.totalPrice}</Info>
            <Button
              type='button'
              minW='100px'
              size='lg'
              top='15px'
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