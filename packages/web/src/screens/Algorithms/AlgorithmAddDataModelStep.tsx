import { Button, Input, Select, Typography } from 'antd';
import { Field, FieldArray } from 'formik';
import * as React from 'react';
import styled from 'styled-components';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const Row = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  margin-top: 1rem;
  > div {
    width: 100%;
  }
  > div:last-child {
    margin-left: 1rem;
  }
`;

const DataModelStep = props => {
  const { values, setFieldValue } = props;
  return (
    <>
      <Typography.Title level={4}>Como é o seu cromossomo?</Typography.Title>
      <FieldArray
        name="setup.dataModel"
        render={arrayHelpers => (
          <>
            {values.setup.dataModel.map(({ type, name }, index) => (
              <Row key={index}>
                <Button
                  shape="circle"
                  icon={<MinusOutlined />}
                  disabled={index === 0}
                  style={{ margin: '0 8px 0 0' }}
                  onClick={() => arrayHelpers.remove(index)}
                />
                <div>
                  <Typography>Nome do Campo</Typography>
                  <Field as={Input} placeholder="" name={`setup.dataModel.${index}.name`} defaultValue={name} />
                </div>
                <div>
                  <Typography>Tipo do Campo</Typography>
                  <Field
                    as={Select}
                    defaultValue={type}
                    name={`setup.dataModel.${index}.type`}
                    style={{ width: '100%' }}
                    onChange={value => setFieldValue(`setup.dataModel.${index}.type`, value)}
                  >
                    <Select.Option value="NUMBER">Número</Select.Option>
                    <Select.Option value="NUMBER_ARRAY">Array de Número</Select.Option>
                  </Field>
                </div>
              </Row>
            ))}

            <Button
              type="dashed"
              onClick={() => arrayHelpers.push({ name: '', type: 'NUMBER' })}
              style={{ marginTop: '1rem', width: '100%' }}
            >
              <PlusOutlined /> Adicionar Campo
            </Button>
          </>
        )}
      />
    </>
  );
};

export default DataModelStep;
