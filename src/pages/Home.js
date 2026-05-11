import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCog, FaBoxOpen, FaHardHat, FaTools, FaLaptopCode,
  FaOilCan, FaBuilding, FaFlask, FaCity, FaHome, FaArrowUp, FaFire
} from 'react-icons/fa';
import { MdElevator } from 'react-icons/md';
import './Home.css';
import LegoDivider from '../components/LegoDivider';

/* ── Services data ── */
const SERVICES = [
  {
    icon: <FaLaptopCode />,
    title: 'IT Services',
    desc: 'Cutting-edge digital infrastructure, network solutions, and enterprise software tailored for the energy and facilities sectors.',
    color: 'var(--navy)',
    accent: '#fff',
    image: '/images/it-services.png',
  },
  {
    icon: <FaHardHat />,
    title: 'Construction',
    desc: 'Construction services for commercial and residential buildings, from ground-up builds to fit-outs, delivered on time and to specification.',
    color: 'var(--magenta)',
    accent: '#fff',
    image: '/images/construction.png',
  },
  {
    icon: <FaTools />,
    title: 'Installation',
    desc: 'Professional installation of mechanical, electrical, and structural systems including lifts, elevators and facility equipment.',
    color: 'var(--navy)',
    accent: '#fff',
    image: '/images/installation.png',
  },
  {
    icon: <FaBoxOpen />,
    title: 'Material Supply',
    desc: 'Reliable procurement and supply chain management for industrial-grade materials, ensuring quality and on-time delivery.',
    color: 'var(--magenta)',
    accent: '#fff',
    image: '/images/material-supply.png',
  },
  {
    icon: <FaCog />,
    title: 'Engineering',
    desc: 'End-to-end engineering design and consultancy for complex industrial and commercial projects — from concept to commissioning.',
    color: 'var(--navy)',
    accent: '#fff',
    image: '/images/engineering.png',
  },
  
];

/* ── Sectors data ── */
const SECTORS = [
  // { icon: <FaOilCan />, label: 'Oil & Gas' },
  // { icon: <FaFlask />, label: 'Petrochemical' },
  { icon: <FaLaptopCode />, label: 'IT' },
  { icon: <FaHome />, label: 'Residential' },
  { icon: <FaCity />, label: 'Commercial' },
  { icon: <MdElevator />, label: 'Lifts & Elevators' },
  { icon: <FaBuilding />, label: 'Facilities' },
  { icon: <FaFire />, label: 'Energy' },
];

/* ── Intersection Observer hook ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ── Stats counter ── */
function CountUp({ end, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.4);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / 60;
    const id = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(id); }
      else setCount(Math.floor(start));
    }, 20);
    return () => clearInterval(id);
  }, [inView, end]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const videoRef = useRef(null);
  const [servicesRef, servicesInView] = useInView();
  const [aboutRef, aboutInView] = useInView();
  const [sectorsRef, sectorsInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  // scroll-to-top button
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="home">

      {/* ── HERO ── */}
      <section className="hero">
        <video
          ref={videoRef}
          className="hero__video"
          src={process.env.PUBLIC_URL + "/hero.mp4"}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero__overlay" />
        <div className="hero__content container">
          {/* <div className="hero__tag fade-up">HORIZON ENGINEERING SERVICES</div> */}
          <h1 className="hero__title fade-up" style={{ animationDelay: '0.15s' }}>
            Building Energy,<br />Infrastructure,<br />and Life
          </h1>
          <div className="hero__tagline-block fade-up" style={{ animationDelay: '0.3s' }}>
            <p>Delivering integrated engineering, construction,<br />
              and technology solutions across industries</p>
          </div>
          <div className="hero__actions fade-up" style={{ animationDelay: '0.45s' }}>
            <a href="#services" className="hero__btn hero__btn--primary">Our Services</a>
            <Link to="/contact" className="hero__btn hero__btn--outline">Contact Us</Link>
          </div>
        </div>
        <div className="hero__scroll-hint">
          <span />
          <span />
          <span />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats">
        <div className="stats__inner container">
          {[
            { end: 40, suffix: '+', label: 'Years of Experience' },
            // { end: 300, suffix: '+', label: 'Projects Delivered' },
            // { end: 18, suffix: '', label: 'Countries Served' },
            // { end: 1200, suffix: '+', label: 'Professionals' },
          ].map(s => (
            <div className="stats__item" key={s.label}>
              <div className="stats__number">
                <CountUp end={s.end} suffix={s.suffix} />
              </div>
              <div className="stats__label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="services" id="services" ref={servicesRef}>
        <div className="container">
          <div className={`services__header${servicesInView ? ' animate' : ''}`}>
            <span className="section-label">What We Do</span>
            <h2 className="section-title">Our Core Services</h2>
            <p className="services__subtitle">
              Integrated capabilities across every stage of your project lifecycle.
            </p>
          </div>
          <div className="services__grid">
            {SERVICES.map((s, i) => (
              <div
                className={`service-card${servicesInView ? ' animate' : ''}`}
                key={s.title}
                style={{
                  animationDelay: `${0.1 + i * 0.1}s`,
                  '--card-color': s.color,
                  '--card-accent': s.accent,
                  '--card-image': `url(${s.image})`,
                }}
              >
                <div className="service-card__icon">{s.icon}</div>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.desc}</p>
                <div className="service-card__line" />
                <div className="service-card__hover-label">Learn More →</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <LegoDivider />
      {/* ── ABOUT ── */}
      <section className="about" id="about" ref={aboutRef}>
        <div className="about__visual">
          <div className="about__visual-card">
            <div className="about__visual-accent" />
            <img src={process.env.PUBLIC_URL + "/logo.jpeg"} alt="Horizon" className="about__logo-large" />
            <div className="about__visual-text">
              <span>Estd. 2025</span>
              <span>•</span>
              <span>Trusted Globally</span>
            </div>
          </div>
        </div>
        <div className={`about__content${aboutInView ? ' animate' : ''}`}>
          <span className="section-label">Who We Are</span>
          <h2 className="section-title">A Legacy of<br />Engineering Excellence</h2>
          {/* <p className="about__body">
            Horizon Engineering Services LLP is a multidisciplinary solutions provider with deep expertise 
            spanning oil & gas, petrochemical plants, facilities management, and next-generation IT 
            infrastructure. We bring together engineering precision, supply chain strength, and 
            construction capability under one roof — delivering projects that stand the test of time.
          </p> */}
          <p className="about__body">
            Horizon Engineering Services LLP is a multidisciplinary solutions provider with deep expertise 
            spanning facilities management, and next-generation IT 
            infrastructure. We bring together engineering precision, supply chain strength, and 
            construction capability under one roof — delivering projects that stand the test of time.
          </p>
          <p className="about__body">
            From large-scale industrial builds to smart commercial developments and innovative lift 
            and elevator installations, we are committed to quality, safety, and innovation at every step.
          </p>
          <Link to="/contact" className="about__cta">
            Reach Out to Us <span>→</span>
          </Link>
        </div>
      </section>

      {/* ── SECTORS ── */}
      <section className="sectors" ref={sectorsRef}>
        <div className="container">
          <div className={`sectors__header${sectorsInView ? ' animate' : ''}`}>
            <span className="section-label">Industries We Serve</span>
            <h2 className="section-title">Our Sectors</h2>
          </div>
          <div className="sectors__grid">
            {SECTORS.map((sec, i) => (
              <div
                className={`sector-tile${sectorsInView ? ' animate' : ''}`}
                key={sec.label}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="sector-tile__icon">{sec.icon}</div>
                <span className="sector-tile__label">{sec.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-banner" ref={ctaRef}>
        <div className={`cta-banner__inner container${ctaInView ? ' animate' : ''}`}>
          <div className="cta-banner__text">
            <h2 className="cta-banner__title">Ready to Build Something Exceptional?</h2>
            <p>Let's discuss your project. Our team is ready to deliver.</p>
          </div>
          <Link to="/contact" className="cta-banner__btn">Start a Conversation</Link>
        </div>
      </section>

      {/* Scroll to top */}
      {showTop && (
        <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}
