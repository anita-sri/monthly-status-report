import './App.css';
import 'aws-amplify';
import { TextAreaField, Button, CheckboxField, Flex } from '@aws-amplify/ui-react';
import axios from 'axios';
import { toXML } from 'jstoxml';
import ReactHtmlParser from 'html-react-parser';

  function postData() {
    const content =  document.getElementById('business_summary').value;
    const rules = getCheckBoxData();
    const input_text = {
      "text": content
    }
    const rules_xml = toXML(rules)
    const final_text = { "text": content, "rules":rules_xml}
    const url = 'https://qgux9ug2s3.execute-api.us-east-1.amazonaws.com/bedrock-stage/';
    const result_label = document.createElement("label");
    result_label.value = "Result";
    
    var isLoading = true;
    
    if(isLoading){
      if(document.getElementById("result") != undefined) document.getElementById("result").innerHTML = ""
      const loading = document.createElement("div");
      loading.id = "loading";
      loading.innerHTML = "Summarizing .....";
      document.getElementById('summary').appendChild(loading)
    }
    
    axios.post(url, JSON.stringify(final_text)).then ((response) => {
      if(document.getElementById("result") == undefined){
        const result = document.createElement("div");
        result.id = "result";
        //result.style.whiteSpace= 'pre-line';
        console.log((JSON.parse(response.data.body)).completion)
        const summary = JSON.parse(response.data.body).completion
        
        document.getElementById("loading").remove();
        isLoading = false;
        
        result.innerHTML = summary
       
        document.getElementById('summary').appendChild(result_label).appendChild(result);
     
      } else{
        const result = document.getElementById("result")
        const summary = JSON.parse(response.data.body).completion
        document.getElementById("loading").remove();
        isLoading = false;
        result.innerHTML = summary
        document.getElementById('summary').appendChild(result_label).appendChild(result);
        
      }
    })

  }
  
  function getCheckBoxData(){
    var rule1 ="";
    var rule2 ="";
    var rule3 ="";
    var rule4 ="";
    var rule5 ="";
    
    const rule1_text = document.getElementById("rule1")
    if(rule1_text.checked) {
      rule1 = "<rule>"+rule1_text.value+"</rule>"
    }
    const rule2_text = document.getElementById("rule2")
    if(rule2_text.checked) {
      rule2 = "<rule>"+rule2_text.value+"</rule>"
      
    }
    const rule3_text = document.getElementById("rule3")
    if(rule3_text.checked) {
     rule3 =  "<rule>"+rule3_text.value+"</rule>"
    }
    const rule4_text = document.getElementById("rule4")
    if(rule4_text.checked) {
     rule4 = "<rule>"+rule4_text.value+"</rule>"
   }
    const rule5_text = document.getElementById("rule5")
    if(rule5_text.checked) {
     rule5 = "<rule>"+rule5_text.value+"</rule>"
    }
 const rules = rule1+rule2+rule3+rule4+rule5
   // alert(rules);
    return rules;
  }

function App() {
  
  return (
    <Flex  id='summary'>
      <div className="App">
      <h2>Provide Business Summary: </h2>
      <TextAreaField id="business_summary" style={{width: "80%"}}></TextAreaField>
      <h3>Apply these rules while summarizing: </h3>
      </div>
      <CheckboxField label="Do not use any vague data." value="Do not use any vague data." name="rule1" id='rule1'/>
      <CheckboxField label="Provide alternatives to any Numerically vague expressions such as multiple, and various etc."  value="Provide alternatives to any Numerically vague expressions such as multiple, and various etc." name="rule2" id='rule2'/>      
      <CheckboxField label="Don't spell out common acronyms." value="Don't spell out common acronyms." name="rule3" id='rule3'/>      
      <CheckboxField label="Use lowercase for nouns and noun phrases that are not proper nouns." value="Use lowercase for nouns and noun phrases that are not proper nouns." name="rule4" id='rule4'/>      
      <CheckboxField label="Rephrase the sentenses longer than 25 words." value="Rephrase the sentenses longer than 25 words." name="rule5" id='rule5'/>      
      <Button onClick={postData}>Submit</Button>
    </Flex>
  );
}

export default App;

