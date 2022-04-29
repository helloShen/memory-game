/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Data from './data';
import '../css/App.css';
import Footer from '../footer/footer';
import CorrectAudioSrc from '../assets/audio/correct.wav';
import FailAudioSrc from '../assets/audio/fail.wav';

const gameSize = 30;
let history = [];
let notHistory = getNotHistory();
const correctAudio = new Audio(CorrectAudioSrc);
const failAudio = new Audio(FailAudioSrc);

function getNotHistory() {
  return Data
    .map((ele) => ele.id)
    .filter((ele) => !history.includes(ele.id));
}

/**
 * Return N random non duplicate elements from an array.
 * If N > arr.length, return the entire arr.
 * @param {Array} arr Data array.
 * @param {Number} n How many elements you want.
 */
function randomSubN(arr, n) {
  const arrCp = arr.map((ele) => ele);
  const sub = [];
  const size = Math.min(n, arrCp.length);
  for (let i = 0; i < size; i += 1) {
    const r = Math.floor(Math.random() * arrCp.length);
    sub.push(arrCp.splice(r, 1)[0]);
  }
  return sub;
}

/**
 * Pick 16 random images from the Data pool.
 * @returns {Array}
 */
function randomize() {
  const halfSize = Math.floor(gameSize / 2);
  const fromHistory = randomSubN(history, halfSize);
  const fromNotHistory = randomSubN(notHistory, halfSize);
  const result = fromHistory.concat(fromNotHistory);
  while (result.length < gameSize) {
    const rest = randomSubN(Data.map((ele) => ele.id), gameSize - result.length);
    rest.forEach((ele) => {
      if (!result.includes(ele)) result.push(ele);
    });
  }
  const resultImages = Data.filter((ele) => result.includes(ele.id));
  return shuffle(resultImages);
}

/**
 * Fisher–Yates Shuffle
 * Shuffle the array in a random order.
 */
function shuffle(arr) {
  let p = arr.length - 1;
  while (p > 0) {
    const r = Math.floor(Math.random() * (p + 1));
    const temp = arr[p];
    arr[p] = arr[r];
    arr[r] = temp;
    p -= 1;
  }
  return arr;
}

export default function App() {
  const [images, setImages] = useState(randomize());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(false);
  }, [images]);

  function handleClick(e) {
    setDisabled(true);
    const { id } = e.target;
    if (history.includes(id)) {
      failAudio.currentTime = 0;
      failAudio.play();
      if (score > bestScore) setBestScore(score);
      setScore(0);
      history = [];
      notHistory = getNotHistory();
    } else {
      correctAudio.currentTime = 0;
      correctAudio.play();
      setScore(score + 1);
      history.push(
        notHistory.splice(
          notHistory.findIndex((ele) => ele === id),
          1,
        )[0],
      );
    }
    setImages(randomize());
  }

  const cardsClassName = 'cards ' + ((disabled) ? 'disabled' : '');
  return (
    <div className="main">
      <div className="board">
        <div className="hero">
          <div className="title">LOL Memory Game</div>
          <div className="sub-title">Powered by React</div>
          <div className="description">The images get shuffled every-time they are clicked. You CAN NOT click on any image more than once or else your score resets to zero. So where is your limit?</div>
        </div>
        <div className="statistics">
          <div key="score-label" className="score">
            {'Score: '}
          </div>
          <div key="score-value" className="score">
            {score}
          </div>
          <div key="bestScore-label" className="bestscore">
            {'Best score: '}
          </div>
          <div key="bestScore-value" className="bestscore">
            {bestScore}
          </div>
        </div>
        <Footer
          sourceCode="https://github.com/helloShen/memory-game"
          githubLogo="black"
        />
      </div>
      <div className="cards-container">
        <Cards
          key="cards"
          cardsClassName={cardsClassName}
          images={images}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
}

function Cards({
  cardsClassName,
  images,
  handleClick,
}) {
  let id = 0;
  return (
    <div className={cardsClassName}>
      {images.map((image) => (
        <Card
          key={id++}
          image={image}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
}

function Card({ image, handleClick }) {
  const style = {
    backgroundImage: `url(${image.src})`,
  };

  return (
    <div
      id={image.id}
      className="card"
      style={style}
      onClick={handleClick}
    />
  );
}
