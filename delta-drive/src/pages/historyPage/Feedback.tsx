import { useTranslation } from 'react-i18next';
import { AxiosResponse } from 'axios';
import { Box, Button, FormLabel, Textarea, VStack } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';

import { CustomNumberInput } from '@/components';
import { useErrorToast, useSuccessToast } from '@/helpers';
import { useSendFeedbackMutation } from '@/services';
import { FeedbackType } from '@/types';

interface FeedbackProps {
  idVehicle: number;
}

export const Feedback = (props: FeedbackProps) => {
  const [t] = useTranslation('common');
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();
  const queryClient = useQueryClient();

  const { mutate: sendFeedback } = useSendFeedbackMutation(queryClient, {
    onSuccess: (response?: AxiosResponse) => {
      successToast({ title: t('successfulEditUser', { response }) });
    },
    onError: (error) => {
      console.error('Error sending feedback:', error);
      errorToast({ title: t('unsuccessfulEditUser') });
    }
  });

  const initialValues = {
    content: '',
    rating: 0
  };

  const registrtionSchema = Yup.object().shape({
    content: Yup.string(),
    rating: Yup.number().required('ratingRequired').max(5, t('max5')).min(1, t('min1'))
  });

  const handleSubmit = (values: FeedbackType) => {
    const payload = {
      content: values?.content,
      rating: values?.rating,
      //idVehicle: props.idVehicle
    };
    console.log(payload);
    sendFeedback(payload);
  };

  return (
    <>
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
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <FormLabel>{t('addComment')}</FormLabel>
                <Field name='content' as={Textarea} />
                <CustomNumberInput
                  name='rating'
                  label={t('rating')}
                  max={5}
                  min={1}
                  onChange={(changeEvent: string) => setFieldValue('rating', Number(changeEvent))}
                  error={errors.rating}
                  isInvalid={!!errors.rating && touched.rating}
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
                  {t('send')}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </VStack>
    </>
  );
};