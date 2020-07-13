import * as React from 'react';
import styled from 'styled-components';
import { Steps, Button, PageHeader, Card } from 'antd';
import { Formik, Form } from 'formik';
import NameStep from './AlgorithmAddNameStep';
import DataModelStep from './AlgorithmAddDataModelStep';
import GenerateFunctionStep, { validateGenerateFunction } from './AlgortihmAddGenerateFunctionStep';
import TestFunctionStep, { validateTestFunction } from './AlgorithmAddTestFunctionStep';
import AlgorithmAddResultStep from './AlgorithmAddResultStep';

const FormContainer = styled.section`
  display: flex;
  margin-top: 3rem;
  flex-direction: column;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  margin-top: 2rem;
  > button:last-child {
    margin-left: 1rem;
  }
`;

const steps: {
  title: string;
  content: React.FC<any>;
  onBeforeNext?: (values: any) => boolean;
}[] = [
  {
    title: 'Descrição',
    content: NameStep,
  },
  {
    title: 'Cromossomo',
    content: DataModelStep,
  },
  {
    title: 'Criação',
    content: GenerateFunctionStep,
    onBeforeNext: validateGenerateFunction,
  },
  {
    title: 'Avaliação',
    content: TestFunctionStep,
    onBeforeNext: validateTestFunction,
  },
  {
    title: '',
    content: AlgorithmAddResultStep,
  },
];

const AlgorithmAdd = () => {
  const [step, setStep] = React.useState(0);
  const { content: Component, onBeforeNext } = steps[step];

  const handleSubmit = async () => {
    console.log('submit');
  };

  return (
    <>
      <PageHeader onBack={undefined} title="Novo Algoritmo" />
      <Card>
        <Steps current={step}>
          {steps.map(({ title }) => (
            <Steps.Step key={title} title={title} />
          ))}
        </Steps>
        <FormContainer>
          <Formik
            initialValues={{
              name: '',
              setup: {
                dataModel: [{ name: '', type: 'NUMBER' }],
                generateFunction: '',
                testFunction: 'function avaliate(individual) { \n  return 0; \n}',
              },
            }}
            onSubmit={() => {}}
          >
            {props => {
              const handleBack = () => {
                if (step - 1 < 0) return setStep(0);
                setStep(s => s - 1);
              };
              const handleNext = async () => {
                if (step >= steps.length) return handleSubmit();
                if (onBeforeNext && !onBeforeNext(props.values)) return;
                if (step + 1 >= steps.length) return setStep(steps.length - 1);
                setStep(s => s + 1);
              };
              return (
                <>
                  <Form>
                    <Component {...props} />
                  </Form>
                  {step < steps.length - 1 && (
                    <Actions>
                      <Button onClick={handleBack} disabled={step === 0}>
                        Voltar
                      </Button>
                      <Button type="primary" onClick={handleNext} disabled={step === steps.length}>
                        Avançar
                      </Button>
                    </Actions>
                  )}
                </>
              );
            }}
          </Formik>
        </FormContainer>
      </Card>
    </>
  );
};

export default AlgorithmAdd;
