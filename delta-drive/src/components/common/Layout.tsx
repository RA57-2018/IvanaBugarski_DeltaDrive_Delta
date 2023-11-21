import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Spacer,
  Text as Info,
  VStack
} from '@chakra-ui/react';
import { UserContext } from '@/contexts';
import { useContext } from 'react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [t] = useTranslation('common');
  const { currentUser } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    navigate('/homePage');
    window.location.reload();
  };

  return (
    <>
      <Flex p='10px' backgroundColor='blue.300' alignItems='center' verticalAlign='center'>
        <Button
          variant='unstyled'
          onClick={() => {
            navigate('/homePage');
            window.location.reload();
          }}
          fontWeight='400'
          textColor='white'
          fontSize='30'>
          {t('deltaDrive')}
        </Button>
        <Box w='100px' />
        <Spacer />
        <>
          <Button
            mr='2'
            bg='blue.500'
            _hover={{ bg: 'blue.400' }}
            textColor='white'
            onClick={() => navigate('/loginPage')}>
            {t('login')}
          </Button>
          <Button
            mr='2'
            bg='blue.500'
            _hover={{ bg: 'blue.400' }}
            textColor='white'
            onClick={() => navigate('/registrationPage')}>
            {t('registraton')}
          </Button>
        </>
      </Flex>
      {children}
    </>
  );
};
