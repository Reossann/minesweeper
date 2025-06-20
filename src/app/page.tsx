'use client';

import { useEffect, useRef, useState } from 'react';
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
//ボム作って数字出す関数
const bom = (b: number[][], w: number, h: number, Sumbom: number, bombcounts: number) => {
  let croneboms = bombcounts;
  const newbom = structuredClone(b);
  if (h > w) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (croneboms === Sumbom) {
          break;
        }
        if (newbom[y][x] !== 20) {
          const ram = Math.floor(Math.random() * 20);
          if (ram === 1) {
            if (newbom[y][x] !== 15) {
              newbom[y][x] = 15;
              croneboms += 1;
            }
          }
        }
      }
    }
    if (croneboms !== Sumbom) {
      return bom(newbom, w, h, Sumbom, croneboms);
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
  } else {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (croneboms === Sumbom) {
          break;
        }
        if (newbom[y][x] !== 20) {
          const ram = Math.floor(Math.random() * 20);
          if (ram === 1) {
            if (newbom[y][x] !== 15) {
              newbom[y][x] = 15;
              croneboms += 1;
            }
          }
        }
      }
    }
    if (croneboms !== Sumbom) {
      return bom(newbom, w, h, Sumbom, croneboms);
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
  }
  return newbom;
};
//userinputsとbombmap合体関数
const calc = (bombmap: number[][], userinputs: number[][], w: number, h: number) => {
  const newcalc = structuredClone(bombmap);
  if (h > w) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (userinputs[y][x] === bombmap[y][x]) {
          continue;
        }
        if (userinputs[y][x] === 1 || userinputs[y][x] === 2) {
          newcalc[y][x] = userinputs[y][x];
          continue;
        }
        if (newcalc[y][x] === userinputs[y][x]) {
          continue;
        }
        if (newcalc[y][x] === 55) {
          continue;
        }
        newcalc[y][x] = bombmap[y][x] + userinputs[y][x];
        if (newcalc[y][x] === 35) {
          newcalc[y][x] = 70;
        }
      }
    }
  } else {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (userinputs[y][x] === bombmap[y][x]) {
          continue;
        }
        if (userinputs[y][x] === 1 || userinputs[y][x] === 2) {
          newcalc[y][x] = userinputs[y][x];
          continue;
        }
        if (newcalc[y][x] === userinputs[y][x]) {
          continue;
        }
        if (newcalc[y][x] === 55) {
          continue;
        }
        newcalc[y][x] = bombmap[y][x] + userinputs[y][x];
        if (newcalc[y][x] === 35) {
          newcalc[y][x] = 70;
        }
      }
    }
  }
  return newcalc;
};
//押したとこが爆弾か否か
const bomcalc = (bombmap: number[][], userinputs: number[][], w: number, h: number) => {
  const newcalc = structuredClone(bombmap);
  if (h > w) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        newcalc[y][x] = bombmap[y][x] + userinputs[y][x];
        if (newcalc[y][x] === 35) {
          return 5000;
        }
      }
    }
  } else {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        newcalc[y][x] = bombmap[y][x] + userinputs[y][x];
        if (newcalc[y][x] === 35) {
          return 5000;
        }
      }
    }
  }
  return 0;
};
//再帰関数
const remove_all = (
  calcboard: number[][],
  userinputs: number[][],
  w: number,
  h: number,
  trigger: number,
) => {
  const newuser = structuredClone(userinputs);
  const anocalcboard = structuredClone(calcboard);
  if (h > w) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (newuser[y][x] === 20) {
          if (calcboard[y][x] >= 35) {
            continue;
          }
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
              return remove_all(calcboard, newuser, w, h, trigger);
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
  } else {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (newuser[y][x] === 20) {
          if (anocalcboard[y][x] >= 35) {
            continue;
          }
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
              return remove_all(calcboard, newuser, w, h, trigger);
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
  }
  if (trigger === 5000) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (calcboard[y][x] === 15) {
          calcboard[y][x] = 35;
        }
      }
    }
  }
  return calcboard;
};
//成功か否かを判定する関数
const clearChecker = (
  clearboard: number[][],
  w: number,
  h: number,
  Bnum: number,
  boooom: number,
) => {
  let opennum = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (clearboard[y][x] >= 20) {
        opennum += 1;
      }
    }
  }
  if (opennum === w * h - Bnum) {
    return 1;
  }
  if (boooom === 5000) {
    return 2;
  }
  return 0;
};

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

  const Bomnummake = (Flags: number, bombom: number, Cl: number) => {
    if (Cl === 1) {
      return bombom;
    }
    if (Flags === undefined) {
      return 0;
    } else {
      return Flags;
    }
  };

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
  const flatB = bombmap.flat();
  const Bcounts = flatB.reduce<CountMap>((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {} as CountMap);

  const flatU = userinputs.flat();
  const Ucounts = flatU.reduce<CountMap>((acc, curr) => {
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
    const newboard = [];
    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        row.push(0);
      }
      newboard.push(row);
    }
    flag.current = true;
    setuptimer(0);
    setbombom(10);
    setdekasa([9, 9]);
    setuserinputs(newboard);
    setbombmap(newboard);
  };

  //中級
  const sizechange1 = () => {
    const newboard = [];
    for (let i = 0; i < 16; i++) {
      const row = [];
      for (let j = 0; j < 16; j++) {
        row.push(0);
      }
      newboard.push(row);
    }
    flag.current = true;
    setuptimer(0);
    setbombom(40);
    setdekasa([16, 16]);
    setuserinputs(newboard);
    setbombmap(newboard);
  };

  //上級
  const sizechange2 = () => {
    const newboard = [];
    for (let i = 0; i < 16; i++) {
      const row = [];
      for (let j = 0; j < 30; j++) {
        row.push(0);
      }
      newboard.push(row);
    }
    flag.current = true;
    setuptimer(0);
    setbombom(99);
    setdekasa([30, 16]);
    setuserinputs(newboard);
    setbombmap(newboard);
  };

  //カスタム
  const sizechange3 = () => {
    if (bombom === 1) {
      return;
    }
    const newboard = [];
    for (let i = 0; i < 12; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push(0);
      }
      newboard.push(row);
    }
    flag.current = true;
    setuptimer(0);
    setbombom(8);
    setdekasa([10, 12]);
    setuserinputs(newboard);
    setbombmap(newboard);
  };
  const custom = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fromdata = new FormData(event.currentTarget);
    const newboard = [];
    for (let i = 0; i < Number(fromdata.get('H')); i++) {
      const row = [];
      for (let j = 0; j < Number(fromdata.get('W')); j++) {
        row.push(0);
      }
      newboard.push(row);
    }
    if (Number(fromdata.get('H')) * Number(fromdata.get('W')) <= Number(fromdata.get('B'))) {
      flag.current = true;
      setdekasa([Number(fromdata.get('W')), Number(fromdata.get('H'))]);
      setbombom(Math.floor(Number(fromdata.get('H')) * Number(fromdata.get('W'))) / 3);
      setuserinputs(newboard);
      setbombmap(newboard);
      return;
    }
    flag.current = true;
    setdekasa([Number(fromdata.get('W')), Number(fromdata.get('H'))]);
    setbombom(Number(fromdata.get('B')));
    setuserinputs(newboard);
    setbombmap(newboard);
  };

  const clickHandler = (x: number, y: number) => {
    if (boooom === 5000 || Clear) {
      return;
    }
    const newboard = structuredClone(userinputs);
    if (newboard[y][x] !== 1 && newboard[y][x] !== 2) {
      newboard[y][x] = 20;
    }
    setuserinputs(newboard);

    if (Bcounts[0] === dekasa[0] * dekasa[1]) {
      const boms = 0;
      setbombmap(bom(newboard, dekasa[0], dekasa[1], bombom, boms));
    }
  };

  const boooom = bomcalc(bombmap, userinputs, dekasa[0], dekasa[1]);
  const C = calc(bombmap, userinputs, dekasa[0], dekasa[1]);
  const CC = remove_all(C, userinputs, dekasa[0], dekasa[1], boooom);
  const Clear = clearChecker(CC, dekasa[0], dekasa[1], bombom, boooom);
  if (Clear === 1) {
    for (let y = 0; y < dekasa[1]; y++) {
      for (let x = 0; x < dekasa[0]; x++) {
        if (CC[y][x] === 15) {
          CC[y][x] = 1;
        }
      }
    }
  }
  const Bomnumber = bombom - Bomnummake(Ucounts[1], bombom, Clear);

  const [uptimer, setuptimer] = useState(0);
  const flag = useRef(true);
  useEffect(() => {
    {
      if (flag.current) {
        flag.current = false;
        return;
      }
      if (boooom === 5000 || Clear) {
        return;
      }

      const Interbal = setInterval(() => {
        setuptimer((uptimer) => uptimer + 1);
      }, 1000);
      return () => clearInterval(Interbal);
    }
  }, [bombmap, boooom, Clear]);
  //restert
  const restart = () => {
    const newboard = [];
    for (let i = 0; i < dekasa[1]; i++) {
      const row = [];
      for (let j = 0; j < dekasa[0]; j++) {
        row.push(0);
      }
      newboard.push(row);
    }
    setuptimer(0);
    setuserinputs(newboard);
    setbombmap(newboard);
    flag.current = true;
    return;
  };

  const clickrightHandler = (x: number, y: number, event: React.MouseEvent) => {
    if (boooom === 5000 || Clear) {
      return;
    }
    event.preventDefault();
    console.log(x, y);
    console.log(50);
    const newboard = structuredClone(userinputs);
    if (CC[y][x] < 20) {
      if (newboard[y][x] <= 3) newboard[y][x] += 1;
      if (newboard[y][x] === 3) {
        newboard[y][x] = 0;
      }
      setuserinputs(newboard);
    }
  };

  return (
    <div className={styles.container}>
      <select value={select} onChange={f_sele}>
        <option value={1}>初級</option>
        <option value={2}>中級</option>
        <option value={3}>上級</option>
        <option value={4}>カスタム</option>
      </select>
      {select === '4' && (
        <form onSubmit={custom}>
          <label htmlFor="W">幅：</label>
          <input className={styles.input} id="W" type="number" name="W" defaultValue={10} />
          <label htmlFor="H">高さ：</label>
          <input className={styles.input} id="H" type="number" name="H" defaultValue={12} />
          <label htmlFor="B">爆弾数：</label>
          <input
            className={styles.input}
            id="B"
            type="number"
            name="B"
            value={bombom}
            onChange={(e) => setbombom(Number(e.target.value))}
          />
          <button>更新</button>
        </form>
      )}
      <div
        className={styles.boardB}
        style={{ width: 70 + dekasa[0] * 30, height: 160 + dekasa[1] * 30 }}
      >
        <div className={styles.boardP}>
          <div className={styles.boardP2}>
            <div className={styles.boardP3}>
              <div className={styles.input}>
                <div className={styles.numberbox}>
                  <div
                    className={styles.digital}
                    style={{
                      backgroundPositionX: -29 + Math.floor(Bomnumber / 100) * 21.9,
                      backgroundPositionY: -50,
                    }}
                  />
                  <div
                    className={styles.digital}
                    style={{
                      backgroundPositionX: -29 + Math.floor((Bomnumber % 100) / 10) * -21.9,
                      backgroundPositionY: -50,
                    }}
                  />
                  <div
                    className={styles.digital}
                    style={{
                      backgroundPositionX: -29 + (Bomnumber % 10) * -21.9,
                      backgroundPositionY: -50,
                    }}
                  />
                </div>
                <div className={styles.rest}>
                  <div
                    className={styles.mini}
                    onClick={restart}
                    style={{ backgroundPositionX: -330 + Clear * -30 }}
                  />
                </div>
                <div className={styles.numberbox}>
                  <div
                    className={styles.digital}
                    style={{
                      backgroundPositionX: -29 + Math.floor(uptimer / 100) * -21.9,
                      backgroundPositionY: -50,
                    }}
                  />
                  <div
                    className={styles.digital}
                    style={{
                      backgroundPositionX: -29 + Math.floor((uptimer % 100) / 10) * -21.9,
                      backgroundPositionY: -50,
                    }}
                  />
                  <div
                    className={styles.digital}
                    style={{
                      backgroundPositionX: -29 + (uptimer % 10) * -21.9,
                      backgroundPositionY: -50,
                    }}
                  />
                </div>
              </div>
              <div className={styles.midline} />
              <div
                className={styles.board}
                style={{ width: 30 * dekasa[0], height: 30 * dekasa[1] }}
              >
                {CC.map((row, y) =>
                  row.map((color, x) => (
                    <button
                      className={styles.cell}
                      key={`${x}-${y}`}
                      onClick={() => clickHandler(x, y)}
                      onContextMenu={(event) => clickrightHandler(x, y, event)}
                      style={{
                        border: color >= 20 ? '1px solid #808080' : '5px solid #808080',
                        borderTopColor: color >= 20 ? '#808080' : '#fff',
                        borderLeftColor: color >= 20 ? '#808080' : '#fff',
                        backgroundColor: color === 70 ? 'red' : '#c6c6c6',
                      }}
                    >
                      <div
                        className={styles.samplecell}
                        style={{
                          backgroundPosition:
                            color === 20
                              ? 30 * 1
                              : //爆弾
                                color === 35
                                ? -300
                                : color === 70
                                  ? -300
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
    </div>
  );
}
