'use client';

import { useState } from 'react';
import styles from './page.module.css';
document.oncontextmenu = function () {
  return false;
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
                style={{ backgroundPosition: color === 0 ? 30 * 1 : -300 * 1 + 30 * color }}
              />
            </button>
          )),
        )}
      </div>
    </div>
  );
}
