import { Typography, message } from 'antd';
import AceEditor from 'react-ace';
import * as React from 'react';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/snippets/javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

export const validateGenerateFunction = values => {
  try {
    const { generateFunction, dataModel } = values.setup;
    const fn = new Function('', `${generateFunction}; return generate();`);
    const individual = fn();
    const isValid = dataModel
      .map(({ name }) => individual[name] !== 'undefined' && typeof individual[name] === 'number')
      .reduce((acc, cur) => acc && cur, true);
    if (!isValid) message.error('Sua função de geração não é compatível com seu cromossomo!');
    return isValid;
  } catch (e) {
    console.log(e);
    message.error('Sua função de geração é inválida!');
    return false;
  }
};

const GenerateFunctionStep = ({ setFieldValue, values }) => {
  const initialValue = values.setup.dataModel.reduce((acc, cur) => ({ ...acc, [cur.name]: 0 }), {});
  React.useEffect(() => {
    if (!values.setup.generateFunction)
      setFieldValue('setup.generateFunction', `function generate() { \n  return ${JSON.stringify(initialValue)}; \n}`);
  }, []);
  return (
    <>
      <Typography.Title level={4}>
        Como esse cromossomo será gerado? (não altere a assinatura da função)
      </Typography.Title>
      <AceEditor
        mode="javascript"
        theme="monokai"
        name="setup.generateFunction"
        fontSize={14}
        width="100%"
        defaultValue={`function generate() { \n  return ${JSON.stringify(initialValue)}; \n}`}
        onChange={value => setFieldValue('setup.generateFunction', value)}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
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

export default GenerateFunctionStep;
