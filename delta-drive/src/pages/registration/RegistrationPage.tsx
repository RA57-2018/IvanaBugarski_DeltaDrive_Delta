import { useTranslation } from 'react-i18next';
import { Box, Button, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { CustomInput } from '@/components';
import { useQueryClient } from '@tanstack/react-query';
import { UserRegistration } from '@/types';

export const RegistrationPage = () => {
  const [t] = useTranslation('common');
  const queryClient = useQueryClient();

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    birthdayDate: new Date
  };

  const registrtionSchema = Yup.object().shape({
    email: Yup.string().email(t('emailInvalid')).required('emailRequired'),
    password: Yup.string().required(t('passRequired')),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], t('passMatch')).required(t('passRequired')),
    firstName: Yup.string().required(t('firstNameRequired')),
    lastName: Yup.string().required(t('lastNameRequired'))
  });

  const handleSubmit = (values: UserRegistration) => {
    const payload = {
      email: values?.email,
      password: values?.password,
      firstName: values?.firstName,
      lastName: values?.lastName,
      birthdayDate: values?.birthdayDate
    };
    console.log(payload);
  };

  return (
    <VStack
      display='flex'
      alignItems='center'
      justifyContent='center'
      mt={5}>
      <Box boxShadow='2xl' backgroundColor='blue.300' borderRadius='10' padding='2%' textColor='white'>
        <Formik
          validateOnMount
          validateOnChange
          initialValues={initialValues}
          validationSchema={registrtionSchema}
          onSubmit={handleSubmit}>
          {({ errors, touched }) => (
            <Form>
              <CustomInput
                type='email'
                maxLength={50}
                name='email'
                label={t('email')}
              />
              <CustomInput
                type='password'
                maxLength={50}
                name='password'
                label={t('password')}
              />
              <CustomInput
                type='password'
                maxLength={50}
                name='confirmPassword'
                label={t('confirmPassword')}
              />
              <CustomInput
                type='text'
                maxLength={50}
                name='firstName'
                label={t('firstName')}
              />
              <CustomInput
                type='text'
                maxLength={50}
                name='lastName'
                label={t('lastName')}
              />
              <CustomInput
                type='date'
                maxLength={50}
                name='birthdayDate'
                label={t('birthdayDate')}
              />
              <Button
                type='submit'
                minW='100px'
                size='lg'
                top='15px'
                bg='blue.600'
                _hover={{bg: 'blue.400'}}
                ml={3}
                mb={3}
                cursor='pointer'>
                {t('save')}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </VStack>
  );
};
