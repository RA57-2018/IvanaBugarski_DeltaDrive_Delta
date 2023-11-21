import { CustomNumberInput } from '@/components';
import { FeedbackType } from '@/types';
import { Box, Button, FormLabel, Textarea, VStack } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const Feedback = () => {
  const [t] = useTranslation('common');

  const initialValues = {
    comment: '',
    rating: 0
  };

  const registrtionSchema = Yup.object().shape({
    comment: Yup.string(),
    rating: Yup.number().required().max(5, t('max5')).min(1, t('min1'))
  });

  const handleSubmit = (values: FeedbackType) => {
    const payload = {
      comment: values?.comment,
      rating: values?.rating
    };
    console.log(values);
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
            {({ errors, touched }) => (
              <Form>
                <FormLabel>{t('addComment')}</FormLabel>
                <Field name='comment' as={Textarea} />
                <CustomNumberInput
                  name='rating'
                  label={t('rating')}
                  error={errors.rating}
                  isInvalid={!!errors.rating && touched.rating}
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