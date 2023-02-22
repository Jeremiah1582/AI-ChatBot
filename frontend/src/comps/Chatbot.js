import React, { useState, useContext, useEffect} from 'react';
import robotHead from "../images/ChatbotImage.gif"
import axios from 'axios'; 
import { MyContext } from '../context/contextAPI';
import Button from 'react-bootstrap/Button'





const Chatbot = () => {
  const {backendHostLink} = useContext(MyContext)
  const [userInput, setUserInput] = useState(''); 
  const [question, setQuestion] = useState('')
  const [botResponse, setBotResponse] = useState('');
  const [waiting, setWaiting] = useState(false)
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
    setWaiting(true)
    e.preventDefault();
    setQuestion(userInput)
};

useEffect(() => {
  if (question !==''){
    try {
       axios
       .post(`${backendHostLink}/chatbot`, question,{
          headers: {
            'Content-Type':'application/json'
          },
        }).then(async response => {
          if(await response){
            console.log(response);
            setBotResponse(response.data.data);
            setUserInput('');
            setWaiting(false)
          }
        });
      
    } catch (error) {
      console.log('There was an error with your request',error);
    }
  }
}, [question])



  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <img className='chatbotImg' src={robotHead} alt="robot head" />
        <p>How can i help you today?</p>
      </div>
      <div className="chatbot-body">
        <form onSubmit={(e)=>handleSubmit(e)}>
          <input type="text" value={userInput} onChange={handleChange} placeholder="Type your message here..." />
          {waiting? (
              <Button animation="grow" disabled className='submitButton' variant="secondary" type="submit">Loading...</Button>
          ):(
          <Button className='submitButton' variant="success" type="submit">Submit</Button>
          ) }
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
