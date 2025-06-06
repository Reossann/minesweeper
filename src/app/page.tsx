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
const bom = (b: number[][], w: number, h: number, Sumbom: number) => {
  const newbom = structuredClone(b);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (bombcounts === Sumbom) {
        break;
      }
      if (newbom[y][x] !== 20) {
        const ram = Math.floor(Math.random() * 20);
        if (ram === 1) {
          if (newbom[y][x] !== 15) {
            newbom[y][x] = 15;
            bombcounts += 1;
          }
        }
      }
    }
  }
  if (bombcounts !== Sumbom) {
    return bom(newbom, w, h, Sumbom);
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
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

const calc = (bombmap: number[][], userinputs: number[][], w: number, h: number) => {
  const newcalc = structuredClone(bombmap);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
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

const bomcalc = (bombmap: number[][], userinputs: number[][], w: number, h: number) => {
  const newcalc = structuredClone(bombmap);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      newcalc[y][x] = bombmap[y][x] + userinputs[y][x];
      if (newcalc[y][x] === 35) {
        return 5000;
      }
    }
  }
};

const remove_all = (calcboard: number[][], userinputs: number[][], w: number, h: number) => {
  const newuser = structuredClone(userinputs);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
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
            return remove_all(calcboard, newuser, w, h);
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
  const [select, setselect] = useState('');

  const [dekasa, setdekasa] = useState([9, 9]);

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
    if (value === '1') {
      sizechange0();
    } else if (value === '2') {
      sizechange1();
    } else if (value === '3') {
      sizechange2();
    } else if (value === '4') {
      sizechange3();
    }
  };
  //初級
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
    setdekasa([9, 9]);
    setuserinputs(newboard);
    setbombmap(newboard);
  };
  //中級
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
    setdekasa([16, 16]);
    setuserinputs(newboard);
    setbombmap(newboard);
  };
  //上級
  const sizechange2 = () => {
    console.log(800);
    const newboard = [];
    for (let i = 0; i < 16; i++) {
      const row = [];
      for (let j = 0; j < 30; j++) {
        row.push(0);
      }
      newboard.push(row);
    }
    flag.current = true;
    setbombom(99);
    setdekasa([30, 16]);
    setuserinputs(newboard);
    setbombmap(newboard);
  };
  //カスタム
  const sizechange3 = () => {
    console.log(800);
    const newboard = [];
    for (let i = 0; i < 2; i++) {
      const row = [];
      for (let j = 0; j < 2; j++) {
        row.push(0);
      }
      newboard.push(row);
    }
    flag.current = true;
    setbombom(1);
    setdekasa([2, 2]);
    setuserinputs(newboard);
    setbombmap(newboard);
  };

  const Wchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newboard = [];
    for (let i = 0; i < dekasa[1]; i++) {
      const row = [];
      for (let j = 0; j < Number(event.target.value); j++) {
        row.push(0);
      }
      newboard.push(row);
    }
    flag.current = true;
    setbombom(1);
    setdekasa([Number(event.target.value), dekasa[1]]);
    setuserinputs(newboard);
    setbombmap(newboard);
  };

  const Hchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newboard = [];
    for (let i = 0; i < Number(event.target.value); i++) {
      const row = [];
      for (let j = 0; j < dekasa[0]; j++) {
        row.push(0);
      }
      newboard.push(row);
    }
    flag.current = true;
    setbombom(1);
    setdekasa([dekasa[0], Number(event.target.value)]);
    setuserinputs(newboard);
    setbombmap(newboard);
  };

  const Bchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newboard = [];
    for (let i = 0; i < dekasa[0]; i++) {
      const row = [];
      for (let j = 0; j < dekasa[1]; j++) {
        row.push(0);
      }
      newboard.push(row);
    }
    flag.current = true;
    setbombom(Number(event.target.value));
    setdekasa([dekasa[0], dekasa[1]]);
    setuserinputs(newboard);
    setbombmap(newboard);
  };

  const customsize = (event: React.FormEvent<HTMLFormElement>) => {
    const newboard = [];
    for (let i = 0; i < dekasa[0]; i++) {
      const row = [];
      for (let j = 0; j < dekasa[1]; j++) {
        row.push(0);
      }
      newboard.push(row);
    }
    flag.current = true;
    setuserinputs(newboard);
    setbombmap(newboard);
  };

  const clickHandler = (x: number, y: number) => {
    const newboard = structuredClone(userinputs);
    if (newboard[y][x] !== 1 && newboard[y][x] !== 2) {
      newboard[y][x] = 20;
    }
    setuserinputs(newboard);
    if (counts[0] === dekasa[0] * dekasa[1]) {
      setbombmap(bom(newboard, dekasa[0], dekasa[1], bombom));
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

  const boooom = bomcalc(bombmap, userinputs, dekasa[0], dekasa[1]);
  if (boooom === 5000) {
    setInterval(() => {
      timer -= 1;
      if (timer === 0) {
        location.reload();
      }
    }, 1000);
  }
  const C = calc(bombmap, userinputs, dekasa[0], dekasa[1]);
  const CC = remove_all(C, userinputs, dekasa[0], dekasa[1]);
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
            <select value={select} onChange={f_sele}>
              <option value={1}>初級</option>
              <option value={2}>中級</option>
              <option value={3}>上級</option>
              <option value={4}>カスタム</option>
            </select>
            {select === '4' && (
              <form>
                <label htmlFor="W">幅：</label>
                <input
                  className={styles.input}
                  id="W"
                  type="text"
                  value={dekasa[0]}
                  name="W"
                  onChange={Wchange}
                />
                <label htmlFor="H">高さ：</label>
                <input
                  className={styles.input}
                  id="H"
                  type="text"
                  value={dekasa[1]}
                  name="H"
                  onChange={Hchange}
                />
                <label htmlFor="B">爆弾数：</label>
                <input
                  className={styles.input}
                  id="B"
                  type="text"
                  value={bombom}
                  name="B"
                  onChange={Bchange}
                />
                <button>更新</button>
              </form>
            )}

            <div className={styles.board} style={{ width: 30 * dekasa[0], height: 30 * dekasa[1] }}>
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
