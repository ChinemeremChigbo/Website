import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Controls(props) {
  return (
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

          <img className={props.isSettings ? 'settingsOn' : 'settingsOff'} src="Contact.png" alt="Experience"></img>
          <div className="contactGrid">
            <div className="grid-item"></div>
            <div className="grid-item"></div>
            <div className="grid-item">
              {' '}
              <button
                aria-label="Devpost"
                className={props.isSettings ? 'settingsDevpost' : 'settingsDevpostOff'}
                onClick={() => window.open('https://devpost.com/ChinemeremChigbo', '_blank')}
              ></button>
            </div>
            <div className="grid-item">
              <button
                aria-label="Email"
                className={props.isSettings ? 'settingsEmail' : 'settingsEmailOff'}
                onClick={() => (window.location.href = 'mailto:chinemeremchigbo@outlook.com')}
              ></button>
            </div>
            <div className="grid-item">
              {' '}
              <button
                aria-label="Github"
                className={props.isSettings ? 'settingsGithub' : 'settingsGithubOff'}
                onClick={() => window.open('https://github.com/chinemeremchigbo', '_blank')}
              ></button>
            </div>
            <div className="grid-item">
              {' '}
              <button
                aria-label="LinkedIn"
                className={props.isSettings ? 'settingsLinkedIn' : 'settingsLinkedInOff'}
                onClick={() => window.open('https://www.linkedin.com/in/chinemeremchigbo/', '_blank')}
              ></button>
            </div>
            <div className="grid-item">
              {' '}
              <button
                aria-label="VSCO"
                className={props.isSettings ? 'settingsVSCO' : 'settingsVSCOOff'}
                onClick={() => window.open('https://vsco.co/chinemeremchigbo/gallery', '_blank')}
              ></button>
            </div>
            <div className="grid-item">
              {' '}
              <button
                aria-label="Youtube"
                className={props.isSettings ? 'settingsYoutube' : 'settingsYoutubeOff'}
                onClick={() => window.open('https://youtube.com/channel/UCsTrMTQ90BXwjRGkim9CyhQ', '_blank')}
              ></button>
            </div>
            <div className="grid-item"></div>
            <div className="grid-item"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Contacts(props) {
  const [isSettings, setIsSettings] = useState(true);
  return (
    <div>
      <Controls isSettings={isSettings} setIsSettings={setIsSettings} />
    </div>
  );
}

export default Contacts;
