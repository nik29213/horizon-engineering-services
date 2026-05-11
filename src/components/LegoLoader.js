import React, { useEffect, useState } from 'react';
import './LegoLoader.css';

const BRICKS = [
  { color: '#9B2D7F', row: 0, col: 0, studs: 2 },
  { color: '#2B2D7E', row: 0, col: 2, studs: 2 },
  { color: '#9B2D7F', row: 0, col: 4, studs: 2 },
  { color: '#2B2D7E', row: 1, col: 0, studs: 2 },
  { color: '#9B2D7F', row: 1, col: 2, studs: 2 },
  { color: '#2B2D7E', row: 1, col: 4, studs: 2 },
  { color: '#9B2D7F', row: 2, col: 0, studs: 2 },
  { color: '#2B2D7E', row: 2, col: 2, studs: 2 },
  { color: '#9B2D7F', row: 2, col: 4, studs: 2 },
];

export default function LegoLoader() {
  const [hiding, setHiding] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => setHiding(true), 2200);
    const removeTimer = setTimeout(() => setHidden(true), 2800);
    return () => { clearTimeout(hideTimer); clearTimeout(removeTimer); };
  }, []);

  if (hidden) return null;

  return (
    <div className={`lego-loader${hiding ? ' lego-loader--hide' : ''}`}>
      <div className="lego-loader__content">
        <div className="lego-loader__grid">
          {BRICKS.map((brick, i) => (
            <div
              key={i}
              className="lego-brick"
              style={{
                '--brick-color': brick.color,
                '--brick-delay': `${i * 0.12}s`,
                gridColumn: `${brick.col + 1} / span 2`,
                gridRow: `${brick.row + 1}`,
              }}
            >
              <div className="lego-brick__face">
                {Array.from({ length: brick.studs }).map((_, s) => (
                  <div key={s} className="lego-brick__stud" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="lego-loader__text">
          <img src="/logo.png" alt="HES Logo" className="lego-loader__logo" />
          <span>H</span><span>E</span><span>S</span>
        </div>
        <p className="lego-loader__sub">Building your experience...</p>
      </div>
    </div>
  );
}
