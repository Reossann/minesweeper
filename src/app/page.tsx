'use client';

import { useState } from 'react';
import styles from './page.module.css';
document.oncontextmenu = function () {
  return false;
};
let bombcounts = 0;
const bom = (b: number[][]) => {
  const newbom = structuredClone(b);
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (bombcounts === 10 || newbom[y][x] === 100) {
        break;
      }
      const ram = Math.floor(Math.random() * 10);
      if (ram === 1) {
        newbom[y][x] = 100;
        bombcounts += 1;
        console.log(bombcounts);
      }
    }
  }
  if (bombcounts !== 10) {
    console.log(80);
    return bom(newbom);
  }
  return newbom;
};
let first = 0;
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

  const clickHandler = (x: number, y: number) => {
    const newboard = structuredClone(userinputs);
    newboard[y][x] = 20;
    setuserinputs(newboard);
  };
  const clickleftHandler = (x: number, y: number) => {
    const newboard = structuredClone(userinputs);
    if (newboard[y][x] <= 3) newboard[y][x] += 1;
    if (newboard[y][x] === 3) {
      newboard[y][x] = 0;
    }
    setuserinputs(newboard);
  };
  if (first === 0) {
    first += 1;
    setuserinputs(bom(bombmap));
  }
  type CountMap = Record<number, number>;
  const flat = bombmap.flat();
  const counts = flat.reduce<CountMap>((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {} as CountMap);

  console.log(8);
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
              onContextMenu={() => clickleftHandler(x, y)}
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
