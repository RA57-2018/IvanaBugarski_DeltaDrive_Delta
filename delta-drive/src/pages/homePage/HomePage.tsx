import { VehicleComponent } from '@/components';
import { Box, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Marker, MapContainer, TileLayer } from 'react-leaflet';
import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import { DefaultIcon } from '@/helpers';

export const HomePage = () => {
  const [t] = useTranslation('common');
  const navigate = useNavigate();
  const [position, setPosition] = useState({lat: 45.2428032, lng: 19.849218322071287});
  const markerRef = useRef<any>(null);
  const myAPIKey = 'b6618ad7359b4f779daeae7e35233c67';
  const isSearched = false;

  L.Marker.prototype.options.icon = DefaultIcon;

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker !== null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    [],
  );

  useEffect(() => {
    const reverseGeocodingUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${position.lat}&lon=${position.lng}&apiKey=${myAPIKey}`;
    fetch(reverseGeocodingUrl).then(result => result.json())
      .then(featureCollection => {
        console.log(featureCollection.features[0].properties);
      });
  }, [position]);

  return (
    <>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        mt='5'
        mb='5'>
        <MapContainer
          id='chooseLocation'
          center={[45.2428032, 19.849218322071287]}
          zoom={16}
          scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy;
            <a href="https://www.openstreetmap.org/copyright">
              OpenStreetMap
            </a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker
            draggable={true}
            position={position}
            eventHandlers={eventHandlers}
            ref={markerRef}>
          </Marker>
        </MapContainer>
      </Box>
      {isSearched && (
        <>
          <Box>
            <VehicleComponent isHistory={false} />
          </Box>
          <Button
            type='button'
            minW='100px'
            size='lg'
            top='15px'
            bg='blue.600'
            _hover={{ bg: 'blue.400' }}
            ml={3}
            mb={3}
            cursor='pointer'
            onClick={() => navigate('/feedback')}>
            {t('feedback')}
          </Button>
          <Button
            type='button'
            minW='100px'
            size='lg'
            top='15px'
            bg='blue.600'
            _hover={{ bg: 'blue.400' }}
            ml={3}
            mb={3}
            cursor='pointer'
            onClick={() => navigate('/historyPage')}>
            {t('history')}
          </Button>
        </>
      )}
    </>
  );
};
