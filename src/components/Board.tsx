import styles from '../app/page.module.css';

type BoardProps = {
  boardData: number[][];
  width: number;
  height: number;
  onCellClick: (x: number, y: number) => void;
  onCellRightClick: (x: number, y: number, event: React.MouseEvent) => void;
};

export const Board = ({ boardData, width, height, onCellClick, onCellRightClick }: BoardProps) => {
  return (
    <div className={styles.board} style={{ width: 30 * width, height: 30 * height }}>
      {boardData.map((row, y) =>
        row.map((color, x) => (
          <button
            className={styles.cell}
            key={`${x}-${y}`}
            onClick={() => onCellClick(x, y)}
            onContextMenu={(event) => onCellRightClick(x, y, event)}
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
                    : color === 35
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
  );
};
