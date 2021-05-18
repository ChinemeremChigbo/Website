import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Controls(props) {
  return (
    <body onLoad={() => props.setIsSettings(true)}>
      <div className="backgroundBack">
        <div className={props.isRules || props.isSettings ? 'backgroundBlurred' : 'background'}>
          <div>
            <Link onClick={props.handleClick} to={'/game'}>
              <button
                aria-label="Done"
                className={props.isSettings ? 'settingsDone' : 'settingsDoneOff'}
                onClick={() => props.setIsSettings(false)}
              ></button>
            </Link>
            <img className={props.isSettings ? 'settingsOn' : 'settingsOff'} src="About.png" alt="Experience"></img>
          </div>
        </div>
      </div>
    </body>
  );
}

function About(props) {
  const [isSettings, setIsSettings] = useState(false);
  return (
    <div>
      <Controls isSettings={isSettings} setIsSettings={setIsSettings} />
    </div>
  );
}

export default About;
