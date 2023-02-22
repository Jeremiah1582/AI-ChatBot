import React, { useState, useContext} from 'react';
import robotHead from "../images/ChatbotImage.gif"
import axios from 'axios'; 
import { MyContext } from '../context/contextAPI';
import Button from 'react-bootstrap/Button'





const Chatbot = () => {
  const {backendHostLink} = useContext(MyContext)
  const [userInput, setUserInput] = useState(''); 
  const [question, setQuestion] = useState('')
  const [botResponse, setBotResponse] = useState('');
  const [suggestedQuestions, setSuggestedQuestions] = useState([
    { id: 1, question: 'What is your name?' },
    { id: 2, question: 'What can you do?' },
    { id: 3, question: 'What is the weather like today?' },
    { id: 4, question: 'What is the meaning of life?' },
  ]);

  console.log('the question you asked is...',question);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuestion(userInput)
    if (question !==''){
      try {
         axios
         .post(`${backendHostLink}/chatbot`,question,{
            headers: {
              'Content-Type':'application/json'
            },
          })
          .then(response => {
            if(response){
              console.log(response);
              setBotResponse(response.data.data);
              setUserInput('');
            }
          });
        
      } catch (error) {
        console.log('There was an error with your request',error);
      }
    }
  };
  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <img className='chatbotImg' src={robotHead} alt="robot head" />
        <p>ChatBot</p>
      </div>
      <div className="chatbot-body">
        <form onSubmit={(e)=>handleSubmit(e)}>
          <input type="text" value={userInput} onChange={handleChange} placeholder="Type your message here..." />
          <Button className='submitButton' variant="success" type="submit">Submit</Button>
        </form>
        {botResponse!==''?(
          <p>{botResponse}</p>
        ):null}
        {userInput || botResponse !==''?null:(
        <div className="suggested-questions">
          <p>Suggested Questions:</p>
          
            {suggestedQuestions.map(question => (
              <Button 
              variant='secondary' 
              key={question.id} 
              onClick={() => setUserInput(question.question)}>
                {question.question}
              </Button>
            ))}
          
        </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
