'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
const directions = [
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];
let bombcounts = 0;
const bom = (b: number[][]) => {
  const newbom = structuredClone(b);
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (bombcounts === 10 || newbom[y][x] === 100) {
        break;
      }
      if (newbom[y][x] !== 20) {
        const ram = Math.floor(Math.random() * 20);
        if (ram === 1) {
          newbom[y][x] = 100;
          bombcounts += 1;
          console.log(bombcounts);
        }
      }
    }
  }
  if (bombcounts !== 10) {
    console.log(80);
    return bom(newbom);
  }
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      let bommmmmmm = 0;
      if (newbom[y][x] !== 20 && newbom[y][x] !== 100) {
        for (const [dy, dx] of directions) {
          if (newbom[y + dy] !== undefined) {
            if (newbom[y + dy][x + dx] === 100) {
              bommmmmmm += 1;
            }
          }
        }
        if (bommmmmmm !== 0) {
          newbom[y][x] = 11 - 1 * bommmmmmm;
        }
      }
    }
  }
  return newbom;
};
export default function Home() {
  const [userinputs, setuserinputs] = useState([
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

  const [bombmap, setbombmap] = useState([
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
  type CountMap = Record<number, number>;
  const flat = userinputs.flat();
  const counts = flat.reduce<CountMap>((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {} as CountMap);
  console.log(counts[0]);
  console.log(8);
  console.log(userinputs);

  const clickHandler = (x: number, y: number) => {
    const newboard = structuredClone(userinputs);
    newboard[y][x] = 20;
    setuserinputs(newboard);
    if (counts[0] === 81) {
      setuserinputs(bom(newboard));
    }
  };
  const clickrightHandler = (x: number, y: number, event: React.MouseEvent) => {
    event.preventDefault();
    const newboard = structuredClone(userinputs);
    if (newboard[y][x] <= 3) newboard[y][x] += 1;
    if (newboard[y][x] === 3) {
      newboard[y][x] = 0;
    }
    setuserinputs(newboard);
  };
  console.log(userinputs);
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {userinputs.map((row, y) =>
          row.map((color, x) => (
            <button
              className={styles.cell}
              key={`${x}-${y}`}
              onClick={() => clickHandler(x, y)}
              onContextMenu={(event) => clickrightHandler(x, y, event)}
              style={{
                background: color === 20 ? '#c6c6c6' : '#4c545c',
                border: color === 20 ? 'none' : '#707880 #222a32 #222a32 #707880',
              }}
            >
              <div
                className={styles.samplecell}
                style={{
                  backgroundPosition:
                    color === 0 ? 30 * 1 : color === 100 ? -300 * 1 : -300 * 1 + 30 * color,
                }}
              />
            </button>
          )),
        )}
      </div>
    </div>
  );
}
