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
      if (bombcounts === 10 || newbom[y][x] === 15) {
        break;
      }
      if (newbom[y][x] !== 20) {
        const ram = Math.floor(Math.random() * 20);
        if (ram === 1) {
          newbom[y][x] = 15;
          bombcounts += 1;
        }
      }
    }
  }
  if (bombcounts !== 10) {
    return bom(newbom);
  }
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      let bommmmmmm = 0;
      if (newbom[y][x] !== 15) {
        for (const [dy, dx] of directions) {
          if (newbom[y + dy] !== undefined) {
            if (newbom[y + dy][x + dx] === 15) {
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

const calc = (bombmap: number[][], userinputs: number[][]) => {
  const newcalc = structuredClone(bombmap);
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (userinputs[y][x] === 1 || userinputs[y][x] === 2) {
        newcalc[y][x] = userinputs[y][x];
        continue;
      }
      if (newcalc[y][x] === userinputs[y][x]) {
        continue;
      }
      newcalc[y][x] = bombmap[y][x] + userinputs[y][x];
    }
  }
  return newcalc;
};

const bomcalc = (bombmap: number[][], userinputs: number[][]) => {
  const newcalc = structuredClone(bombmap);
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      newcalc[y][x] = bombmap[y][x] + userinputs[y][x];
      if (newcalc[y][x] === 35) {
        return 5000;
      }
    }
  }
};

const remove_all = (calcboard: number[][], userinputs: number[][]) => {
  const newuser = structuredClone(userinputs);
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (newuser[y][x] === 20) {
        console.log(x, y);
        if (23 <= calcboard[y][x] && calcboard[y][x] <= 30) {
          console.log(444);
          continue;
        }

        for (const [dy, dx] of directions) {
          if (calcboard[y + dy] === undefined) {
            continue;
          }
          if (calcboard[y + dy][x + dx] === 15) {
            calcboard[y][x] = calcboard[y][x] + 20;
            break;
          }
          if (calcboard[y + dy][x + dx] === 0) {
            console.log('rrrr');
            newuser[y + dy][x + dx] = 20;
            calcboard[y + dy][x + dx] = 20;
            return remove_all(calcboard, newuser);
          }
          if (3 <= calcboard[y + dy][x + dx] && calcboard[y + dy][x + dx] <= 10) {
            console.log(999);
            newuser[y + dy][x + dx] = 20;
            calcboard[y + dy][x + dx] = 20 + calcboard[y + dy][x + dx];
            continue;
          }
        }
      }
    }
  }
  console.log(99);
  console.log(calcboard);
  return calcboard;
};
let timer = 4;
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
  const flat = bombmap.flat();
  const counts = flat.reduce<CountMap>((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {} as CountMap);

  const clickHandler = (x: number, y: number) => {
    const newboard = structuredClone(userinputs);
    if (newboard[y][x] !== 1 && newboard[y][x] !== 2) {
      newboard[y][x] = 20;
    }
    setuserinputs(newboard);
    if (counts[0] === 81) {
      setbombmap(bom(newboard));
    }
  };
  const clickrightHandler = (x: number, y: number, event: React.MouseEvent) => {
    event.preventDefault();
    console.log(x, y);
    console.log(50);
    const newboard = structuredClone(userinputs);
    if (newboard[y][x] <= 3) newboard[y][x] += 1;
    if (newboard[y][x] === 3) {
      newboard[y][x] = 0;
    }
    setuserinputs(newboard);
  };

  const boooom = bomcalc(bombmap, userinputs);
  if (boooom === 5000) {
    setInterval(() => {
      timer -= 1;
      if (timer === 0) {
        location.reload();
      }
    }, 1000);
  }
  const C = calc(bombmap, userinputs);
  console.log(C);
  console.log(1);
  const CC = remove_all(C, userinputs);
  console.log(100);
  console.log(bombmap);
  console.log(userinputs);
  return (
    <div className={styles.container}>
      <div className={styles.boardP}>
        <div className={styles.boardP2}>
          <div className={styles.boardP3}>
            <div className={styles.board}>
              {CC.map((row, y) =>
                row.map((color, x) => (
                  <button
                    className={styles.cell}
                    key={`${x}-${y}`}
                    onClick={() => clickHandler(x, y)}
                    onContextMenu={(event) => clickrightHandler(x, y, event)}
                    style={{
                      border: color >= 20 ? '1px solid #808080' : '#fff #808080 #808080 #fff',
                    }}
                  >
                    <div
                      className={styles.samplecell}
                      style={{
                        backgroundPosition:
                          color === 20
                            ? 30 * 1
                            : color === 1
                              ? -270 * 1
                              : color === 2
                                ? -240 * 1
                                : color === 100
                                  ? -300 * 1
                                  : color === 120
                                    ? -300 * 1
                                    : -900 * 1 + 30 * color,
                      }}
                    />
                  </button>
                )),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
