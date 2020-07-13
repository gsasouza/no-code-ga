import {message, Typography} from 'antd';
import AceEditor from 'react-ace';
import * as React from 'react';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/snippets/javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';


export const validateTestFunction = values => {
  try {
    const { generateFunction, testFunction, dataModel } = values.setup;
    const generateFn = new Function('', `${generateFunction}; return generate();`);
    const avaliateFn = new Function('individual', `${testFunction}; return avaliate(individual);`);
    const individual = generateFn();
    console.log(avaliateFn)
    const fitness = avaliateFn(individual)
    console.log(fitness)
    return true
  } catch (e) {
    console.log(e);
    message.error('Sua função de geração é inválida!');
    return false;
  }
};

const TestFunctionStep = ({ setFieldValue, values }) => {
  return (
    <>
      <Typography.Title level={4}>Como esse cromossomo será avaliado? (não altere a assinatura da função)</Typography.Title>
      <AceEditor
        mode="javascript"
        theme="monokai"
        name="setup.testFunction"
        fontSize={14}
        width="100%"
        onChange={value => setFieldValue('setup.testFunction', value)}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        defaultValue={values.setup.testFunction}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </>
  );
};

export default TestFunctionStep;
