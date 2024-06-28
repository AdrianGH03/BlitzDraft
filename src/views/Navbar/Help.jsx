//Hooks
import { useState } from "react";
import { useHelpQuestions } from "../../hooks/useHelpQuestions"

//NPM/React
import { Link } from "react-router-dom";


export const Help = () => {
    const [helpQuestions] = useHelpQuestions();
    const [openIndex, setOpenIndex] = useState(null); 
    const sionEmote = '/emotes/sion1.png'
    const toggleDropdown = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    return (
    <div className="help-wrapper fade-in-fwd">
        <h1>Help</h1>
    
      <section className="help-container fade-in-fwd">
        <div className="help-container-questions fade-in-fwd">
        {helpQuestions.map((question, index) => (
          <div key={index} className="help-question-container">
            <button onClick={() => toggleDropdown(index)}>
                
                <p className="help-question">{question.question}</p>
            </button>
            
              <p className='open'>
                <span className="help-answer">{question.answer}</span>
              </p>
            
          </div>
        ))}
        </div>
        <div className="help-container-2 fade-in-fwd">
            <div className="help-usefullinks">
                <h2>Useful Links</h2>
                <Link to="/tutorial">Tutorial</Link>
                <Link to="/guides">Guides</Link>
                <Link to="/game/difficulty">Game</Link>
            </div>

            <div className="help-emote">
                <img src={sionEmote} alt="thinking emoji" />
            </div>
        </div>
       
      </section>
    </div>
    );
};
