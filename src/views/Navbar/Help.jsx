//Hooks
import { useState } from "react";
import { useHelpQuestions } from "../../hooks/useHelpQuestions"

//NPM/React
import { Link } from "react-router-dom";

//Assets
import alligator1 from '../../assets/emotes/alligator1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

export const Help = () => {
    const [helpQuestions] = useHelpQuestions();
    const [openIndex, setOpenIndex] = useState(null); 
  
    const toggleDropdown = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    return (
    <div className="help-wrapper    fade-in-fwd">
        <h1>HELP</h1>
    
      <section className="help-container">
        <div className="help-container-questions fade-in-fwd">
        {helpQuestions.map((question, index) => (
          <div key={index} className="help-question-container">
            <button onClick={() => toggleDropdown(index)}>
                {
                openIndex === index ? <FontAwesomeIcon icon={faCaretUp} /> 
                : <FontAwesomeIcon icon={faCaretDown} /> 
                }
                <p>{question.question}</p>
            </button>
            {openIndex === index && 
              <p className='open'>
                <p>{question.answer}</p>
              </p>
            }
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
                <img src={alligator1} alt="thinking emoji" />
            </div>
        </div>
       
      </section>
    </div>
    );
};
