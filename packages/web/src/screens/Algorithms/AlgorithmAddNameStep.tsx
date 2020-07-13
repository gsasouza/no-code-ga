import { Input, Typography } from 'antd';
import { Field } from 'formik';
import * as React from 'react';

const NameStep = () => (
  <>
    <Typography.Title level={4}>Qual o nome do seu algoritmo?</Typography.Title>
    <Field as={Input} placeholder="Insira o nome" name="name" />
  </>
);

export default NameStep;
