import React, { useEffect, useState } from 'react';
import styles from '../app/page.module.css';

type DifficultySelectorProps = {
  selectedDifficulty: string;
  onDifficultyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  // フォームのイベントの代わりに、設定したい値だけを引数で受け取るように変更
  onCustomSubmit: (width: number, height: number, bombs: number) => void;
  // 親コンポーネントの爆弾数を表示するために受け取る
  currentBombCount: number;
};

export const DifficultySelector = ({
  selectedDifficulty,
  onDifficultyChange,
  onCustomSubmit,
  currentBombCount,
}: DifficultySelectorProps) => {
  // カスタムフォームの入力値をこのコンポーネント内で管理する
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(12);
  // 爆弾数の入力値は、親の`bombom` stateと同期させる
  const [bombs, setBombs] = useState(currentBombCount);

  // 難易度変更などで親のbombom stateが変わったら、こちらの入力値も同期させる
  useEffect(() => {
    setBombs(currentBombCount);
  }, [currentBombCount]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // ページの再読み込みを防ぐ
    onCustomSubmit(width, height, bombs); // 親に設定値を渡す
  };

  return (
    <>
      <select value={selectedDifficulty} onChange={onDifficultyChange}>
        <option value={1}>初級</option>
        <option value={2}>中級</option>
        <option value={3}>上級</option>
        <option value={4}>カスタム</option>
      </select>
      {selectedDifficulty === '4' && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="W">幅：</label>
          <input
            className={styles.input}
            id="W"
            type="number"
            name="W"
            value={width}
            onChange={(e) => setWidth(Math.floor(Number(e.target.value)))}
          />
          <label htmlFor="H">高さ：</label>
          <input
            className={styles.input}
            id="H"
            type="number"
            name="H"
            value={height}
            onChange={(e) => setHeight(Math.floor(Number(e.target.value)))}
          />
          <label htmlFor="B">爆弾数：</label>
          <input
            className={styles.input}
            id="B"
            type="number"
            name="B"
            value={bombs}
            onChange={(e) => setBombs(Math.floor(Number(e.target.value)))}
          />
          <button type="submit">更新</button>
        </form>
      )}
    </>
  );
};
