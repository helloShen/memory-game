/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Data from './data';
import './App.css';

const gameSize = 16;
let history = [];
let notHistory = getNotHistory();

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

  function handleClick(e) {
    const { id } = e.target;
    if (history.includes(id)) {
      if (score > bestScore) setBestScore(score);
      setScore(0);
      history = [];
      notHistory = getNotHistory();
    } else {
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

  return (
    <>
      <div key="bestScore" className="bestscore">
        {'Best score: '}
        {bestScore}
      </div>
      <div key="score" className="score">
        {'Score: '}
        {score}
      </div>
      <Cards
        key="cards"
        images={images}
        score={score}
        bestScore={bestScore}
        handleClick={handleClick}
      />
    </>
  );
}

function Cards({
  images,
  handleClick,
}) {
  let id = 0;
  return (
    <div className="cards">
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
  return (
    <div
      className="card"
      onClick={handleClick}
    >
      <img
        id={image.id}
        src={image.src}
        alt={`${image.id}.jpg`}
      />
    </div>
  );
}
