'use client';

import { useState } from 'react';
import styles from './page.module.css';
const calcTotalPoint = (arr: number[], counter: number) => {
  const sum = arr.reduce((p, c) => p + c);
  return sum + counter;
};
const sum1 = (n: number): number => {
  if (n <= 0) {
    return n;
  } else {
    return n + sum1(n - 1);
  }
};
const sum2 = (n: number, n2: number): number => {
  return n >= n2 ? n : n + sum2(n + 1, n2);
};
const sum3 = (n: number, n2: number): number => {
  return ((n2 - n + 1) / 2) * (n + n2);
};
console.log(sum1(10));
console.log(sum2(4, 10));
console.log(sum3(4, 10));
const down = (n: number) => {
  if (n >= 0) {
    down(n - 1);
  }
};
down(10);

export default function Home() {
  const [board, setboard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [samplePoints, setSamplePoints] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  console.log(samplePoints);
  const [sampleCounter, setSampleCounter] = useState(0);
  console.log(sampleCounter);
  const clickHandler = () => {
    const newSamplePoints = structuredClone(samplePoints);
    newSamplePoints[sampleCounter] += 1;
    setSamplePoints(newSamplePoints);
    setSampleCounter((sampleCounter + 1) % 14);
  };
  const TotalPoint = calcTotalPoint(samplePoints, sampleCounter);
  console.log(TotalPoint);
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => <button className={styles.cell} key={`${x}-${y}`} />),
        )}
      </div>
    </div>
  );
}
