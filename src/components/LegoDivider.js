import React, { useRef, useEffect, useState } from 'react';
import './LegoDivider.css';

const ROWS = [
  [
    { color: '#9B2D7F', studs: 4, span: 4 },
    { color: '#2B2D7E', studs: 2, span: 2 },
    { color: '#9B2D7F', studs: 4, span: 4 },
    { color: '#2B2D7E', studs: 2, span: 2 },
    { color: '#9B2D7F', studs: 4, span: 4 },
    { color: '#2B2D7E', studs: 2, span: 2 },
  ],
  [
    { color: '#2B2D7E', studs: 2, span: 2 },
    { color: '#9B2D7F', studs: 4, span: 4 },
    { color: '#2B2D7E', studs: 2, span: 2 },
    { color: '#9B2D7F', studs: 4, span: 4 },
    { color: '#2B2D7E', studs: 2, span: 2 },
    { color: '#9B2D7F', studs: 4, span: 4 },
  ],
  [
    { color: '#9B2D7F', studs: 2, span: 2 },
    { color: '#2B2D7E', studs: 4, span: 4 },
    { color: '#9B2D7F', studs: 2, span: 2 },
    { color: '#2B2D7E', studs: 4, span: 4 },
    { color: '#9B2D7F', studs: 2, span: 2 },
    { color: '#2B2D7E', studs: 4, span: 4 },
  ],
];

export default function LegoDivider() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="lego-divider" ref={ref}>
      <div className="lego-divider__label">
        <span>Engineered</span>
        <span className="lego-divider__dot" />
        <span>Built</span>
        <span className="lego-divider__dot" />
        <span>Delivered</span>
      </div>

      <div className={`lego-divider__wall${inView ? ' animate' : ''}`}>
        {ROWS.map((row, ri) => (
          <div className="lego-divider__row" key={ri}>
            {row.map((brick, bi) => (
              <div
                key={bi}
                className="lego-divider__brick"
                style={{
                  '--b-color': brick.color,
                  '--b-delay': `${ri * 0.15 + bi * 0.08}s`,
                  flex: brick.span,
                }}
              >
                <div className="lego-divider__studs">
                  {Array.from({ length: brick.studs }).map((_, s) => (
                    <div key={s} className="lego-divider__stud" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="lego-divider__tagline">
        <h3>Every project starts with a single brick.</h3>
        <p>We lay the foundation. You see the vision come to life.</p>
      </div>
    </section>
  );
}
