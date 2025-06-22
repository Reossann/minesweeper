import React from 'react';
import styles from '../app/page.module.css';

type HeaderProps = {
  Bomnumber: number;
  uptimer: number;
  restart: () => void;
  Clear: number;
  children: React.ReactNode;
};

export const Header = ({ Bomnumber, uptimer, restart, Clear, children }: HeaderProps) => {
  return (
    <div className={styles.boardP}>
      <div className={styles.boardP2}>
        <div className={styles.boardP3}>
          <div className={styles.input}>
            <div className={styles.numberbox}>
              <div
                className={styles.digital}
                style={{
                  backgroundPositionX: -29 + Math.floor(Bomnumber / 100) * -21.9,
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
          <div className={styles.midline} /> {children}
        </div>
      </div>
    </div>
  );
};
