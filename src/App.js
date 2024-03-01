import './App.css';
import 'aws-amplify';
import { TextAreaField } from '@aws-amplify/ui-react';
import { Button } from '@aws-amplify/ui-react';
import { CheckboxField, Flex } from '@aws-amplify/ui-react';
    

function App() {
  return (
    <Flex >
      <div ClassName="App">
      <h2>Provide Business Summary: </h2>
      <TextAreaField></TextAreaField>
      <h3>Apply these rules while summarizing: </h3>
      </div>
      <CheckboxField label="Do not use any vague data." name="rule1"/>
      <CheckboxField label="Provide alternatives to any Numerically vague expressions such as multiple, and various etc." name="rule2"/>      
      <CheckboxField label="Don't spell out common acronyms." name="rule3"/>      
      <CheckboxField label="Use lowercase for nouns and noun phrases that are not proper nouns." name="rule4"/>      
      <CheckboxField label="Rephrase the sentenses longer than 25 words." name="rule5"/>      
      <Button>Submit</Button>
    </Flex>
  );
}

export default App;
