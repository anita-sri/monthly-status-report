import './App.css';
import 'aws-amplify';
import { TextAreaField } from '@aws-amplify/ui-react';
import { Button } from '@aws-amplify/ui-react';
import { CheckboxField, Flex } from '@aws-amplify/ui-react';
//import fetch from '@node-fetch';
import axios from 'axios';

  function postData() {
    const content =  document.getElementById('business_summary').value;
    const url = 'https://qgux9ug2s3.execute-api.us-east-1.amazonaws.com/bedrock-stage/';

    
    axios.post(url, JSON.stringify(content)).then ((response) => {
      const result = document.createElement("div")
      const result_label = document.createElement("label");
      result_label.value = "Result";
      console.log((JSON.parse(response.data.body)).completion)
      const summary = JSON.parse(response.data.body).completion
      result.innerHTML = JSON.stringify(summary)
     
      document.getElementById('summary').appendChild(result_label).appendChild(result);
     
    })

  }

function App() {
  
  return (
    <Flex  id='summary'>
      <div className="App">
      <h2>Provide Business Summary: </h2>
      <TextAreaField id="business_summary"></TextAreaField>
      <h3>Apply these rules while summarizing: </h3>
      </div>
      <CheckboxField label="Do not use any vague data." name="rule1" id='rule1'/>
      <CheckboxField label="Provide alternatives to any Numerically vague expressions such as multiple, and various etc." name="rule2" id='rule2'/>      
      <CheckboxField label="Don't spell out common acronyms." name="rule3" id='rule3'/>      
      <CheckboxField label="Use lowercase for nouns and noun phrases that are not proper nouns." name="rule4" id='rule4'/>      
      <CheckboxField label="Rephrase the sentenses longer than 25 words." name="rule5" id='rule5'/>      
      <Button onClick={postData}>Submit</Button>
    </Flex>
  );
}

export default App;

