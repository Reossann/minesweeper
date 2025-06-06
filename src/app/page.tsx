'use client';

import React, { useEffect, useRef, useState } from 'react';
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
const bom = (b: number[][], Deka: number, Sumbom: number) => {
  const newbom = structuredClone(b);
  for (let y = 0; y < Deka; y++) {
    for (let x = 0; x < Deka; x++) {
      if (bombcounts === Sumbom || newbom[y][x] === 15) {
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
  if (bombcounts !== Sumbom) {
    return bom(newbom, Deka, Sumbom);
  }
  for (let y = 0; y < Deka; y++) {
    for (let x = 0; x < Deka; x++) {
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

const calc = (bombmap: number[][], userinputs: number[][], Deka: number) => {
  const newcalc = structuredClone(bombmap);
  for (let y = 0; y < Deka; y++) {
    for (let x = 0; x < Deka; x++) {
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

const bomcalc = (bombmap: number[][], userinputs: number[][], Deka: number) => {
  const newcalc = structuredClone(bombmap);
  for (let y = 0; y < Deka; y++) {
    for (let x = 0; x < Deka; x++) {
      newcalc[y][x] = bombmap[y][x] + userinputs[y][x];
      if (newcalc[y][x] === 35) {
        return 5000;
      }
    }
  }
};

const remove_all = (calcboard: number[][], userinputs: number[][], Deka: number) => {
  const newuser = structuredClone(userinputs);
  for (let y = 0; y < Deka; y++) {
    for (let x = 0; x < Deka; x++) {
      if (newuser[y][x] === 20) {
        if (23 <= calcboard[y][x] && calcboard[y][x] <= 30) {
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
            newuser[y + dy][x + dx] = 20;
            calcboard[y + dy][x + dx] = 20;
            return remove_all(calcboard, newuser, Deka);
          }
          if (3 <= calcboard[y + dy][x + dx] && calcboard[y + dy][x + dx] <= 10) {
            newuser[y + dy][x + dx] = 20;
            calcboard[y + dy][x + dx] = 20 + calcboard[y + dy][x + dx];
            continue;
          }
        }
      }
    }
  }
  return calcboard;
};

let timer = 4;

export default function Home() {
  const [boardsize, setboardsize] = useState(0);

  const [select, setselect] = useState('');

  const [dekasa, setdekasa] = useState(9);

  const [bombom, setbombom] = useState(10);

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
  const f_sele = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setselect(value);
  };
  //サイズ変更
  const sizechange0 = () => {
    console.log(800);
    const newboard = [];
    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        row.push(0);
      }
      newboard.push(row);
    }
    flag.current = true;
    setbombom(10);
    setdekasa(9);
    setboardsize(0);
    setuserinputs(newboard);
    setbombmap(newboard);
  };

  const sizechange1 = () => {
    console.log(800);
    const newboard = [];
    for (let i = 0; i < 16; i++) {
      const row = [];
      for (let j = 0; j < 16; j++) {
        row.push(0);
      }
      newboard.push(row);
    }
    flag.current = true;
    setbombom(40);
    setdekasa(16);
    setboardsize(230);
    setuserinputs(newboard);
    setbombmap(newboard);
  };

  const clickHandler = (x: number, y: number) => {
    const newboard = structuredClone(userinputs);
    if (newboard[y][x] !== 1 && newboard[y][x] !== 2) {
      newboard[y][x] = 20;
    }
    setuserinputs(newboard);
    if (counts[0] === dekasa ** 2) {
      setbombmap(bom(newboard, dekasa, bombom));
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

  const boooom = bomcalc(bombmap, userinputs, dekasa);
  if (boooom === 5000) {
    setInterval(() => {
      timer -= 1;
      if (timer === 0) {
        location.reload();
      }
    }, 1000);
  }
  const C = calc(bombmap, userinputs, dekasa);
  const CC = remove_all(C, userinputs, dekasa);
  console.log(userinputs);
  const [uptimer, setuptimer] = useState(0);
  const flag = useRef(true);
  useEffect(() => {
    {
      if (flag.current) {
        flag.current = false;
        return;
      }
      setInterval(() => {
        setuptimer((uptimer) => uptimer + 1);
      }, 1000);
    }
  }, [bombmap]);
  console.log(uptimer);
  console.log(bombmap);
  return (
    <div className={styles.container}>
      <div className={styles.boardP}>
        <div className={styles.boardP2}>
          <div className={styles.boardP3}>
            {uptimer}
            <select onChange={sizechange1}>
              <option value={1}>1</option>
              <option>2</option>
            </select>
            <div
              className={styles.board}
              style={{ width: 270 + boardsize, height: 270 + boardsize }}
            >
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
