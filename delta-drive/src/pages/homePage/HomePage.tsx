import { Box, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const [t] = useTranslation('common');
  const navigate = useNavigate();

  return (
    <>
      <Box>{'Lista vozila'}</Box>
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
        onClick={() => navigate('/feedback')}>
        {t('feedback')}
      </Button>
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
        onClick={() => navigate('/bookVehiclePage')}>
        {t('bookVehicle')}
      </Button>
    </>
  );
};
