import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo, Name } from '../BlueprintLogo';
import './Navbar.scss';
import { Button } from '../button/Button';

const Navbar = () => {
  const MobileMenuIcon = () => {
    return (
      //Original menu icon (before any animation)
      <ul>
        <svg
          className="navbar__navigation__mobile__menu-button __menu-icon-1"
          width="28"
          height="21"
          viewBox="0 0 28 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleClick}
        >
          <path
            className="navbar__navigation__mobile__menu-button __menu-icon-1"
            d="M2 2H26M2 10.95H26M2 19.25H26"
            strokeWidth="2.5"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
        </svg>
      </ul>
    );
  };
  const MobileMenuIconAnimation = () => {
    return (
      <ul className="navbar__navigation__mobile__dropdown">
        <div onClick={handleClick} className="navbar__navigation__mobile__overlay"></div>
        {navOptions.map((item) => (
          <div className="navbar__navigation__mobile__links" key={item.name}>
            <Link onClick={handleClick} to={item.link}>
              {item.name}
            </Link>
          </div>
        ))}
        {specialNavOptions.map((item) => (
          <div className="navbar__navigation__mobile__links__special" key={item.name}>
            <Link onClick={handleClick} to={item.link}>
              {item.name}
            </Link>
          </div>
        ))}
        {/* Menu Animation SVGs */}
        <svg
          className="navbar__navigation__mobile__menu-button __menu-icon-2"
          width="34"
          height="31"
          viewBox="0 0 34 31"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="navbar__navigation__mobile__menu-button __menu-icon-2"
            d="M12.15 2L20.75 7M10.6 27.65L8.04999 18.1M15.25 23.45L23.8 28.4M22.95 22.4L31.55 17.45M26.75 14.5V4.55M2 13.8L10.6 8.89999"
            strokeWidth="2.5"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          className="navbar__navigation__mobile__menu-button __menu-icon-3"
          width="34"
          height="31"
          viewBox="0 0 34 31"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="navbar__navigation__mobile__menu-button __menu-icon-3"
            d="M12.15 2L20.75 7M10.6 27.65L8.04999 18.1M15.25 23.45L23.8 28.4M22.95 22.4L31.55 17.45M26.75 14.5V4.55M2 13.8L10.6 8.89999"
            strokeWidth="2.5"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          className="navbar__navigation__mobile__menu-button __menu-icon-4"
          width="34"
          height="30"
          viewBox="0 0 34 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="navbar__navigation__mobile__menu-button __menu-icon-4"
            d="M7.61175 4.05C10.3451 0.983336 14.2784 2.43333 19.4118 8.39999M12.9118 27.85C8.81177 28.0833 7.04508 24.2833 7.61175 16.45M26.0117 26.3C23.2784 29.3333 19.3451 27.8667 14.2118 21.9M31.6118 12.6C32.8784 16.5 29.6451 19.1833 21.9118 20.65M2.26176 16.45C1.01072 12.5352 4.24405 9.85182 11.9618 8.39999M22.3618 2C26.3618 2.83333 27.0618 6.96666 24.4618 14.4"
            strokeWidth="2.5"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          className="navbar__navigation__mobile__menu-button __menu-icon-5"
          width="32"
          height="31"
          viewBox="0 0 32 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="navbar__navigation__mobile__menu-button __menu-icon-5"
            d="M7.08225 8.2C6.58225 7.53333 6.59894 6.81667 7.13227 6.05C7.93227 4.85 10.0656 3.5 13.5323 2C14.7989 5.36667 16.7323 7.66666 19.3323 8.89999C19.8656 9.13333 20.4489 9.33333 21.0823 9.5M18.9323 3.45C19.3323 2.78333 19.9989 2.51666 20.9323 2.64999C22.3656 2.94999 24.4323 4.43332 27.1323 7.09999C24.4656 9.53332 23.0656 12.1833 22.9323 15.05C22.9323 15.65 22.9823 16.2667 23.0823 16.9M28.0323 11.65C28.8656 11.5167 29.4823 11.8667 29.8823 12.7C30.5489 14.0333 30.6489 16.5833 30.1823 20.35C26.6489 19.7167 23.6823 20.2167 21.2823 21.85C20.8156 22.2167 20.3656 22.6167 19.9323 23.05M14.2823 28C13.9661 28.7669 13.3494 29.1169 12.4323 29.05C10.9587 28.9438 8.70869 27.7604 5.68226 25.5C7.97184 22.7271 8.99685 19.9104 8.75727 17.05C8.70232 16.4521 8.59398 15.8521 8.43226 15.25M25.7823 23.45C26.3156 24.0833 26.3156 24.7833 25.7823 25.55C24.9823 26.7833 22.8323 28.15 19.3323 29.65C18.0989 26.25 16.1656 23.9333 13.5323 22.7C12.9989 22.4667 12.4323 22.2667 11.8323 22.1M4.38227 20.35C3.58227 20.4833 2.98225 20.1333 2.58225 19.3C1.94892 17.9667 1.83226 15.4167 2.23226 11.65C5.79893 12.25 8.7656 11.7333 11.1323 10.1C11.5989 9.73332 12.0656 9.33333 12.5323 8.89999"
            strokeWidth="2.5"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
        </svg>
        {/* Last animation frame / Blueprint logo */}
        <svg
          className="navbar__navigation__mobile__menu-button __menu-icon-6"
          onClick={handleClick}
          width="31"
          height="30"
          viewBox="0 0 31 30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="navbar__navigation__mobile__menu-button __menu-icon-6"
            d="M12.05 29.4542H10.2L11.1 29.9542C11.4 30.0208 11.6167 29.9708 11.75 29.8042C11.8523 29.6832 11.9523 29.5665 12.05 29.4542ZM8.54999 18.6042C8.68332 17.8042 8.75 16.9875 8.75 16.1542C8.75 14.8542 8.61667 13.6375 8.35001 12.5042C7.65001 12.7708 6.86667 13.0042 6 13.2042C6.2 14.1375 6.29999 15.2708 6.29999 16.6042C6.26665 17.5375 6.11667 18.4875 5.85001 19.4542C5.71667 20.1208 5.41668 21.2375 4.95001 22.8042L4.20001 25.5542C4.13335 25.8208 4.21668 26.0208 4.45001 26.1542L10.2 29.4542H12.05C12.6437 28.7604 13.1271 28.2271 13.5 27.8542L14.55 26.8042L12.75 25.1542C12.3167 25.5208 11.9667 25.8542 11.7 26.1542L10.95 27.1042L6.85001 24.7542L7.85001 21.7542C8.25001 20.1542 8.48332 19.1042 8.54999 18.6042ZM19.95 29.4542H18.75L18.9 29.6042C19.0667 29.7708 19.2667 29.8042 19.5 29.7042L19.95 29.4542ZM12.95 21.0042C11.75 20.3708 10.6167 19.8875 9.54999 19.5542C9.44999 20.1208 9.25001 20.9042 8.95001 21.9042C9.98335 22.2375 11.0167 22.7208 12.05 23.3542C12.8167 23.8542 13.5833 24.4542 14.35 25.1542C14.6833 25.4542 15.5 26.2708 16.8 27.6042L18.75 29.4542H19.95L26.2 25.9042C26.4333 25.7375 26.5167 25.5208 26.45 25.2542L25.15 21.3542L22.8 22.0542L23.65 24.6042L19.5 26.9542C18.5333 25.8208 17.8167 25.0375 17.35 24.6042C16.45 23.6708 15.65 22.9375 14.95 22.4042C13.7833 21.6042 13.1167 21.1375 12.95 21.0042ZM29.8 19.1042C30.0667 19.0375 30.2 18.8708 30.2 18.6042V11.0042C30.2 10.7375 30.05 10.5708 29.75 10.5042L25.7 9.65416L25.15 12.0042L27.75 12.5542V17.2542C26.7833 17.3875 25.7333 17.6042 24.6 17.9042C23.2667 18.2375 22.2333 18.5542 21.5 18.8542C21.0333 19.0208 20.2833 19.3708 19.25 19.9042C18.25 20.4708 17.25 21.1875 16.25 22.0542L18.05 23.7542C19.0167 22.9208 19.9667 22.2708 20.9 21.8042C21.6 21.4708 22.5 21.1208 23.6 20.7542C23.8 20.6875 24.9333 20.3875 27 19.8542L29.8 19.1042ZM15.6 3.25416L17.4 4.90416L19.2 2.90416L23.35 5.30417C22.95 6.30417 22.6167 7.30417 22.35 8.30417C21.95 9.60417 21.7 10.6542 21.6 11.4542C21.4667 12.2208 21.4 13.0208 21.4 13.8542C21.4 15.1875 21.5333 16.4042 21.8 17.5042L24.15 16.8542C23.9167 15.7542 23.8333 14.6042 23.9 13.4042C23.9333 12.7708 24.0667 11.8208 24.3 10.5542C24.4 10.1542 24.7167 9.05416 25.25 7.25416L26 4.45416C26.0667 4.22083 25.9833 4.03749 25.75 3.90416L19.05 0.10417C18.8167 -0.0624966 18.6 -0.0291724 18.4 0.204161L15.6 3.25416ZM12.1 6.35417C11.1333 7.1875 10.1833 7.8375 9.25 8.30417C8.55 8.6375 7.64999 8.9875 6.54999 9.35417C6.34999 9.42084 5.21666 9.72083 3.14999 10.2542L0.350006 11.0042C0.116673 11.0708 0 11.2375 0 11.5042V19.1042C0 19.3708 0.133327 19.5375 0.399994 19.6042L4.45001 20.4542L5 18.1042L2.39999 17.5542V12.8542C3.36666 12.7208 4.41665 12.5042 5.54999 12.2042C6.88332 11.8708 7.91666 11.5542 8.64999 11.2542C9.11666 11.0875 9.86666 10.7375 10.9 10.2042C11.9 9.63749 12.9 8.92083 13.9 8.05417L12.1 6.35417ZM7.35001 7.95416L6.5 5.45416L10.65 3.10417L12.8 5.45416C13.7667 6.42083 14.5667 7.15416 15.2 7.65416C15.7333 8.08749 16.4 8.5375 17.2 9.00416C18.2667 9.6375 19.4 10.1375 20.6 10.5042C20.7 9.9375 20.9 9.15416 21.2 8.15416C20.0667 7.78749 19.0333 7.28749 18.1 6.65416C17.6333 6.35416 16.8667 5.77082 15.8 4.90416C15.2667 4.43749 14.45 3.60416 13.35 2.40416L11.3 0.404158C11.1 0.204158 10.8833 0.187503 10.65 0.35417L3.95001 4.15416C3.71668 4.28749 3.63335 4.4875 3.70001 4.75416L5 8.65416L6.54999 8.25416L7.35001 7.95416Z"
          />
        </svg>
      </ul>
    );
  };
  const navOptions = [
    { name: 'About', link: '/about' },
    { name: 'Projects', link: '/projects' },
    { name: 'Students', link: '/students' },
    { name: 'Contact', link: '/contact' },
  ]; //navbar options that need to look different on mobile and desktop
  const specialNavOptions = [
    { name: 'Join Our Team', link: '/join' },
    { name: 'For Nonprofits', link: '/nonprofits' },
  ];
  const [clicked, setClicked] = useState(false);
  const handleClick = () => setClicked(!clicked);
  return (
    //SVG of Blueprint Logo and Name
    <div className="background">
      <div className="navbar">
        <div className="navbar__logo">
          <Link to="/">
            <Logo />
            <Name />
          </Link>
        </div>
        <div className="navbar__navigation">
          <div className="navbar__navigation__desktop">
            {navOptions.map((item) => (
              <div className="navbar__navigation__desktop__links" key={item.name}>
                <Link to={item.link}>{item.name}</Link>
              </div>
            ))}
            {/* Special Custom Linked Buttons for "Join Our Team" and "For Non-profits" */}
            <Link to="/join">
              <Button className="navbar__navigation__desktop__links__special" color="secondary" variant="outline">
                Join Our Team
              </Button>
            </Link>
            <div className="navbar__navigation__desktop__links__divider" />
            <Link to="/nonprofits">
              <Button className="navbar__navigation__desktop__links__special" color="secondary" variant="solid">
                For Nonprofits
              </Button>
            </Link>
            <div className="navbar__navigation__desktop__links__divider" />
          </div>
        </div>
        <div className="navbar__navigation__mobile">{clicked ? <MobileMenuIcon /> : <MobileMenuIconAnimation />}</div>
      </div>
    </div>
  );
};

export default Navbar;
