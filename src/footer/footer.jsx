/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
import React from 'react';
import css from './footer.css';
import BlackGithubImg from './github_black.png';
import WhiteGithubImg from './github_white.png';

// eslint-disable-next-line react/prop-types
export default function Footer({ githubLogo, sourceCode }) {
  const year = new Date().getFullYear();
  const logo = (githubLogo === 'black') ? BlackGithubImg : WhiteGithubImg;
  // customize style on ".footer.footer-custom"
  return (
    <div className="footer footer-custom">
      <div className="footer-main">
        <span className="footer-copyright">
          © Copyright MIT - <span className="footer-email">hireme.shen@gmail.com</span>
        </span>
        <a href={sourceCode}>
          <img className="footer-icon" src={logo} alt="github logo" />
        </a>
        <a href={sourceCode}>
          <span className="footer-source">Source code</span>
        </a>
      </div>
      <div className="footer-year">
        2021-
        {year}
      </div>
    </div>
  );
}
