import { useTranslation } from 'react-i18next';
import { AxiosResponse } from 'axios';
import { Box, Button, VStack } from '@chakra-ui/react';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import { useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';

import { CustomInput } from '@/components';
import { UserRegistration } from '@/types';
import { useRegisterUserMutation } from '@/services';
import { useErrorToast, useSuccessToast } from '@/helpers';

export const RegistrationPage = () => {
  const [t] = useTranslation('common');
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();
  const queryClient = useQueryClient();

  const { mutate: register } = useRegisterUserMutation(queryClient, {
    onSuccess: (response?: AxiosResponse) => {
      successToast({ title: t('successfulEditUser', { response }) });
    },
    onError: () => {
      errorToast({ title: t('unsuccessfulEditUser') });
    }
  });

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    birthdayDate: new Date
  };

  const registrtionSchema = Yup.object().shape({
    email: Yup.string().email(t('emailInvalid'))
  });

  const handleSubmit = (values: UserRegistration) => {
    const formattedDate = format(new Date(values?.birthdayDate), 'yyyy-MM-dd 12:00:00.123456+00');
    const payload = {
      email: values?.email,
      password: values?.password,
      firstName: values?.firstName,
      lastName: values?.lastName,
      birthdayDate: new Date(formattedDate)
    };
    console.log(payload);
    register(payload);
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
                error={errors.email}
                isInvalid={!!errors.email && touched.email}
              />
              <CustomInput
                type='password'
                maxLength={50}
                name='password'
                label={t('password')}
                error={errors.password}
                isInvalid={!!errors.password && touched.password}
              />
              <CustomInput
                type='password'
                maxLength={50}
                name='confirmPassword'
                label={t('confirmPassword')}
                error={errors.confirmPassword}
                isInvalid={!!errors.confirmPassword && touched.confirmPassword}
              />
              <CustomInput
                type='text'
                maxLength={50}
                name='firstName'
                label={t('firstName')}
                error={errors.firstName}
                isInvalid={!!errors.firstName && touched.firstName}
              />
              <CustomInput
                type='text'
                maxLength={50}
                name='lastName'
                label={t('lastName')}
                error={errors.lastName}
                isInvalid={!!errors.lastName && touched.lastName}
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
                textColor='white'
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
