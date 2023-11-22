import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Marker, MapContainer, TileLayer, Popup, Polyline } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Text as Info } from '@chakra-ui/react';
import L from 'leaflet';

import { VehicleComponent } from '@/components';
import { DefaultMarkerIcon, RedMarkerIcon, VehicleMarkerIcon, calculateDistance } from '@/helpers';

export const HomePage = () => {
  const [t] = useTranslation('common');
  const navigate = useNavigate();
  const destinationMarkerRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const mapRef = useRef<any>(null);
  const [destination, setDestination] = useState({lat: 45.255930, lng: 19.846320});
  const [nearestAvailableVehicles, setNearestAvailableVehicles] = useState<any>();
  const [position, setPosition] = useState({ lat: 45.2428032, lng: 19.849218322071287 });

  L.Marker.prototype.options.icon = DefaultMarkerIcon;
  const myAPIKey = 'b6618ad7359b4f779daeae7e35233c67';
  const isSearched = false;
  //const orsApiKey = '5b3ce3597851110001cf6248e367516454a345f48b0ed339fd4612c3';

  const csvData = [
    {brand: 'Audi', firstName: 'Allison', lastName: 'Royden', latitude: '45.21645414007418', longitude: '19.848281178208055', available: false, startPrice: '10.405094574404158EUR', pricePerKM: '1.5237046745427651EUR'},
    { brand: 'Aston Martin Lagonda Ltd', firstName: 'Allison', lastName: 'Royden', latitude: '45.21645414007418', longitude: '19.848281178208055', available: true, startPrice: '10.405094574404158EUR', pricePerKM: '1.5237046745427651EUR'},
    { brand: 'LEXUS', firstName: 'Allison', lastName: 'Royden', latitude: '45.22345305430188', longitude: '19.83082933457773', available: false, startPrice: '10.405094574404158EUR', pricePerKM: '1.5237046745427651EUR'},
    { brand: 'Audi', firstName: 'Allison', lastName: 'Royden', latitude: '45.262776103747605', longitude: '19.866401987510415', available: true, startPrice: '10.405094574404158EUR', pricePerKM: '1.5237046745427651EUR'},
    { brand: 'Dodge', firstName: 'Allison', lastName: 'Royden', latitude: '45.2270612743376', longitude: '19.836243969656948', available: false, startPrice: '10.405094574404158EUR', pricePerKM: '1.5237046745427651EUR'},
    { brand: 'MAZDA', firstName: 'Allison', lastName: 'Royden', latitude: '45.28215333042547', longitude: '19.800982908909283', available: true, startPrice: '10.405094574404158EUR', pricePerKM: '1.5237046745427651EUR'},
    { brand: 'Audi', firstName: 'Allison', lastName: 'Royden', latitude: '45.29945492843008', longitude: '19.844297003241515', available: true, startPrice: '10.405094574404158EUR', pricePerKM: '1.5237046745427651EUR'},
    { brand: 'Aston Martin Lagonda Ltd', firstName: 'Allison', lastName: 'Royden', latitude: '45.26465635329234', longitude: '19.8379866738206', available: true, startPrice: '10.405094574404158EUR', pricePerKM: '1.5237046745427651EUR'},
    { brand: 'Bentley', firstName: 'Allison', lastName: 'Royden', latitude: '45.29953896987899', longitude: '19.880643245594662', available: false, startPrice: '10.405094574404158EUR', pricePerKM: '1.5237046745427651EUR'},
    { brand: 'RAM', firstName: 'Allison', lastName: 'Royden', latitude: '45.226846241954064', longitude: '19.839414266674314', available: false, startPrice: '10.405094574404158EUR', pricePerKM: '1.5237046745427651EUR'},
    { brand: 'Roush', firstName: 'Bernardino', lastName: 'Danel', latitude: '45.26209175173838', longitude: '19.836733731194897', available: false, startPrice: '10.405094574404158EUR', pricePerKM: '1.5237046745427651EUR'},
    { brand: 'Volvo', firstName: 'Allison', lastName: 'Royden', latitude: '45.238319779725494', longitude: '19.810359597732457', available: false, startPrice: '10.405094574404158EUR', pricePerKM: '1.5237046745427651EUR'},
    { brand: 'Jaguar', firstName: 'Allison', lastName: 'Royden', latitude: '45.204205166231176', longitude: '19.821658287825695', available: false, startPrice: '10.405094574404158EUR', pricePerKM: '1.5237046745427651EUR'},
    { brand: 'MAZDA', firstName: 'Allison', lastName: 'Royden', latitude: '45.21949014049426', longitude: '19.798772403836473', available: true, startPrice: '10.405094574404158EUR', pricePerKM: '1.5237046745427651EUR'},
    { brand: 'CHEVROLET', firstName: 'Allison', lastName: 'Royden', latitude: '45.28703786707572', longitude: '19.853352110430713', available: false, startPrice: '10.405094574404158EUR', pricePerKM: '1.5237046745427651EUR'},
    { brand: 'MASERATI', firstName: 'Allison', lastName: 'Royden', latitude: '45.29804937445813', longitude: '19.878864637212104', available: false, startPrice: '10.405094574404158EUR', pricePerKM: '1.5237046745427651EUR'},
    { brand: 'ALFA ROMEO', firstName: 'Allison', lastName: 'Royden', latitude: '45.295945743171906', longitude: '19.857674174593402', startPrice: '10.405094574404158EUR', pricePerKM: '1.5237046745427651EUR', available: false },
    { brand: 'Mercedes-Benz', firstName: 'Osvando', lastName: 'Nicolaios', latitude: '45.21676339966129', longitude: '19.8396462179364', startPrice: '2.4629580725247315EUR', pricePerKM: '1.390698997245516EUR', available: true },
    { brand: 'Roush', firstName: 'Rossane', lastName: 'Jessica', latitude: '45.266559868005444', longitude: '19.829707954977223', startPrice: '9.364469311550952EUR', pricePerKM: '1.504112436608676EUR', available: true },
    { brand: 'Mini', firstName: 'Rue', lastName: 'Henrik', latitude: '45.234728393171295', longitude: '19.822851909980773', startPrice: '1.7459564675100006EUR', pricePerKM: '1.1939296054078634EUR', available: false },
    { brand: 'Honda', firstName: 'Libbey', lastName: 'Ernest', latitude: '45.282891901118944', longitude: '19.876434018077504', startPrice: '5.449373131830329EUR', pricePerKM: '1.2475192510221107EUR', available: true },
    { brand: 'Bentley', firstName: 'Lupita', lastName: 'Bennet', latitude: '45.28048677687581', longitude: '19.84440858189661', startPrice: '10.496768111188889EUR', pricePerKM: '1.1702439175398553EUR', available: false },
    { brand: 'MASERATI', firstName: 'Residencia', lastName: 'Casper', latitude: '45.22998109542515', longitude: '19.837153864471194', startPrice: '9.574431191837565EUR', pricePerKM: '1.554999380283847EUR', available: true },
    { brand: 'Dodge', firstName: 'Andreas', lastName: 'Adolfo', latitude: '45.26593983765105', longitude: '19.832946913832068', startPrice: '8.510688070544214EUR', pricePerKM: '1.7380170039298EUR', available: true },
    { brand: 'Subaru', firstName: 'Luz', lastName: 'Jacqui', latitude: '45.282357438284876', longitude: '19.870750281402625', startPrice: '7.389799555041893EUR', pricePerKM: '1.3275739312198804EUR', available: true },
    { brand: 'Chevrolet', firstName: 'Jerome', lastName: 'Hoj', latitude: '45.26187929944556', longitude: '19.852975472519034', startPrice: '4.833445837024005EUR', pricePerKM: '1.332259599316662EUR', available: true },
    { brand: 'Jeep', firstName: 'Greening', lastName: 'Brockie', latitude: '45.27581522657397', longitude: '19.81159033912005', startPrice: '4.416711302958615EUR', pricePerKM: '1.1547939566454073EUR', available: true },
    { brand: 'GMC', firstName: 'Brehan', lastName: 'Leonardo', latitude: '45.284932615672936', longitude: '19.861347707346106', startPrice: '10.543527811952874EUR', pricePerKM: '1.0165564995215457EUR', available: true },
    { brand: 'Chevrolet', firstName: 'Trace', lastName: 'Gerry', latitude: '45.29089149182936', longitude: '19.82844424583245', startPrice: '8.368466873577997EUR', pricePerKM: '1.6389965205075372EUR', available: true },
    { brand: 'Jeep', firstName: 'Iya', lastName: 'Jhonatan', latitude: '45.276139257770936', longitude: '19.843919556371958', startPrice: '7.314957794295983EUR', pricePerKM: '1.6328898520108956EUR', available: false },
    { brand: 'Jaguar', firstName: 'Mannix', lastName: 'Gisella', latitude: '45.29626624757272', longitude: '19.804770086487757', startPrice: '3.2823166597464395EUR', pricePerKM: '1.6910908453429156EUR', available: false },
    { brand: 'Cadillac', firstName: 'Misael', lastName: 'Gizelle', latitude: '45.26093879127531', longitude: '19.796892550971364', startPrice: '4.528765037827812EUR', pricePerKM: '1.0686156356587282EUR', available: true },
    { brand: 'Porsche', firstName: 'Chrissy', lastName: 'Tanyia', latitude: '45.27944916851804', longitude: '19.785822522191463', startPrice: '2.028265801352166EUR', pricePerKM: '1.4492458808602435EUR', available: false },
    { brand: 'BMW', firstName: 'Jacques', lastName: 'Lane', latitude: '45.21379025361213', longitude: '19.79774102895696', startPrice: '4.055436177433148EUR', pricePerKM: '1.7987752163597301EUR', available: true },
    { brand: 'Mini', firstName: 'Jerildy', lastName: 'Tzipora', latitude: '45.26373409468961', longitude: '19.820524995264094', startPrice: '3.156359811608757EUR', pricePerKM: '1.6770837896990307EUR', available: false },
    { brand: 'Land Rover', firstName: 'Oja', lastName: 'Chin', latitude: '45.25691463089621', longitude: '19.858970871427317', startPrice: '10.747802492089736EUR', pricePerKM: '1.26487632045056EUR', available: false },
    { brand: 'Chrysler', firstName: 'Russell', lastName: 'Rune', latitude: '45.223988703409404', longitude: '19.82120333904412', startPrice: '7.442289794627493EUR', pricePerKM: '1.669900944787707EUR', available: true },
    { brand: 'Volvo', firstName: 'Jessa', lastName: 'Tetiana', latitude: '45.22820856361037', longitude: '19.86479493022796', startPrice: '4.989849053623997EUR', pricePerKM: '1.4501630881251706EUR', available: true },
  ];

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker !== null) {
          const markerPosition = marker.getLatLng();
          setPosition(markerPosition);
        }
      },
    }),
    [],
  );

  const destinationEventHandlers = useMemo(() => ({
    dragend() {
      const marker = destinationMarkerRef.current;
      if (marker !== null) {
        const destinationPosition = marker.getLatLng();
        setDestination(destinationPosition);
        const userLatLng = L.latLng(position.lat, position.lng);
        const destinationLatLng = L.latLng(destinationPosition.lat, destinationPosition.lng);
        const distance = userLatLng.distanceTo(destinationLatLng);
        console.log('Distance to destination:', distance);
      }
    },
  }), [position]);

  useEffect(() => {
    if (position) {
      const reverseGeocodingUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${position.lat}&lon=${position.lng}&apiKey=${myAPIKey}`;
      fetch(reverseGeocodingUrl)
        .then((result) => result.json())
        .then((featureCollection) => {
          //console.log(featureCollection.features[0].properties);
        })
        .catch((reverseGeocodingError) => {
          console.error('Error in reverse geocoding:', reverseGeocodingError);
        });
    }
  }, [position, myAPIKey]);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (geoPosition) => {
          const { latitude, longitude } = geoPosition.coords;
          setPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  }, []);

  const calculateTotalPriceForVehicles = (currentLatLng: any, destinationLatLng: any, vehicles: any) => {
    const distance = calculateDistance(currentLatLng, destinationLatLng);
    const vehiclesTotalPrices = vehicles.map((data: any) => {
      const totalPrice = parseFloat(data.startPrice) + parseFloat(data.pricePerKM) * distance;
      return { ...data, totalPrice };
    });
    return vehiclesTotalPrices;
  };

  const getNearestAvailableVehicles = () => {
    const currentLatLng = { lat: position.lat, lng: position.lng };
    const destinationLatLng = { lat: destination.lat, lng: destination.lng };
    const availableVehicles = csvData.filter((data) => data.available === true);
    const vehiclesTotalPrices = calculateTotalPriceForVehicles(
      currentLatLng,
      destinationLatLng,
      availableVehicles
    );
    setNearestAvailableVehicles(
      vehiclesTotalPrices
        .sort((a: any, b: any) => a.totalPrice - b.totalPrice)
        .slice(0, 10)
    );
  };

  useEffect(() => {
    if (destination) {
      getNearestAvailableVehicles();
    }
  }, [destination]);

  //ako nije jos niko ulogovan samo prikazati delta drive slova napraviti

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
          center={position}
          zoom={14}
          scrollWheelZoom={true}
          ref={mapRef}>
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
          {destination && (
            <Marker
              draggable={true}
              position={destination}
              eventHandlers={destinationEventHandlers}
              ref={destinationMarkerRef}
              icon={RedMarkerIcon}
            />
          )}
          {nearestAvailableVehicles &&
            nearestAvailableVehicles.map((data: any, index: number) => (
              <Marker
                key={index}
                position={[parseFloat(data.latitude), parseFloat(data.longitude)]}
                icon={VehicleMarkerIcon}>
                <Popup>
                  <Box>
                    <Info>{t('brand')}: {data.brand}</Info>
                    <Info>{t('name')}: {data.firstName} {data.lastName}</Info>
                    <Info>{t('startPrice')}: {data.startPrice}</Info>
                    <Info>{t('pricePerKM')}: {data.pricePerKM}</Info>
                  </Box>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </Box>
      {nearestAvailableVehicles &&
        nearestAvailableVehicles.slice(0, 10).map((index: number) => (
          <Box key={index}>
            <VehicleComponent isHistory={false} data={nearestAvailableVehicles} />
          </Box>
        ))}
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
        onClick={() => navigate('/historyPage')}>
        {t('history')}
      </Button>
      {isSearched && (
        <>
          <Button
            type='button'
            minW='100px'
            size='lg'
            top='15px'
            textColor='white'
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
            textColor='white'
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
      <Info fontSize='xxx-large' textColor='blue.800'>{t('welcomeToDeltaDrive')}</Info>
    </>
  );
};
