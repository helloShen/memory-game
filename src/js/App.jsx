/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Data from './data';
import './App.css';

const gameSize = 16;
const history = [];

export default function App() {
  function shuffle(data) {
    const idx = [];
    while (idx.length < gameSize) {
      let r = -1;
      while (r < 0 || idx.includes(r)) {
        r = Math.floor(Math.random() * data.length);
      }
      idx.push(r);
    }
    return idx.map((num) => data[num]);
  }

  const [images, setImages] = useState(shuffle(Data));
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  function handleClick(e) {
    const { id } = e.target;
    if (history.includes(id)) {
      if (score > bestScore) setBestScore(score);
      setScore(0);
      history.length = 0;
    } else {
      setScore(score + 1);
      history.push(id);
    }
    setImages(shuffle(Data));
  }

  return (
    <Cards
      images={images}
      score={score}
      bestScore={bestScore}
      handleClick={handleClick}
    />
  );
}

function Cards({
  images,
  score,
  bestScore,
  handleClick,
}) {
  return (
    <>
      <div className="bestscore">
        {'Best score: '}
        {bestScore}
      </div>
      <div className="score">
        {'Score: '}
        {score}
      </div>
      <div className="cards">
        {images.map((image) => (<Card image={image} handleClick={handleClick} />))}
      </div>
    </>
  );
}

function Card({ image, handleClick }) {
  return (
    <div
      key={image.id}
      id={image.id}
      className="card"
      onClick={handleClick}
    >
      {image.name}
    </div>
  );
}
