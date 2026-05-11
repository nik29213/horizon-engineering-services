import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import './Contact.css';

/* ─── Replace YOUR_WEB3FORMS_ACCESS_KEY with your actual key from web3forms.com ─── */
const WEB3FORMS_KEY = 'be8eda4c-5f6d-4326-b0d6-6ddacb6efc58';

const SERVICES_LIST = [
  'IT Services',
  'Construction',
  'Installation',
  'Material Supply',
  'Engineering',
  'General Enquiry',
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');

    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `New Enquiry from ${form.name} – Horizon Engineering Services LLP`,
      from_name: form.name,
      ...form,
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="contact-page">
      {/* Hero strip */}
      <div className="contact-hero">
        <div className="contact-hero__overlay" />
        <div className="contact-hero__content container">
          <span className="section-label">Get In Touch</span>
          <h1 className="contact-hero__title">Let's Build Together</h1>
          <p className="contact-hero__sub">
            Tell us about your project and we'll get back to you within 24 hours.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="contact-body container">
        {/* Info sidebar */}
        <aside className="contact-info">
          <h3 className="contact-info__heading">Contact Information</h3>

          <div className="contact-info__items">
            <div className="contact-info__item">
              <span className="contact-info__icon"><FaEnvelope /></span>
              <div>
                <div className="contact-info__label">Email</div>
                <a href="mailto:info@horizonengineering.com" className="contact-info__value">
                  info@horizonengineering.com
                </a>
              </div>
            </div>
            <div className="contact-info__item">
              <span className="contact-info__icon"><FaPhone /></span>
              <div>
                <div className="contact-info__label">Phone</div>
                <a href="tel:+911234567890" className="contact-info__value">
                  +91 12345 67890
                </a>
              </div>
            </div>
            <div className="contact-info__item">
              <span className="contact-info__icon"><FaMapMarkerAlt /></span>
              <div>
                <div className="contact-info__label">Headquarters</div>
                <span className="contact-info__value">New Delhi, India</span>
              </div>
            </div>
          </div>

          <div className="contact-info__services">
            <div className="contact-info__label" style={{ marginBottom: '0.75rem' }}>Our Services</div>
            {SERVICES_LIST.filter(s => s !== 'General Enquiry').map(s => (
              <div className="contact-info__tag" key={s}>{s}</div>
            ))}
          </div>
        </aside>

        {/* Form */}
        <div className="contact-form-wrap">
          {status === 'success' ? (
            <div className="contact-success">
              <FaCheckCircle className="contact-success__icon" />
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. Our team will respond to your enquiry within 24 hours.</p>
              <button className="contact-success__back" onClick={() => setStatus('idle')}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <h3 className="contact-form__title">Send Us a Message</h3>

              {status === 'error' && (
                <div className="contact-form__error">
                  Something went wrong. Please try again or email us directly.
                </div>
              )}

              <div className="contact-form__row">
                <div className="contact-form__group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="John Smith"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="contact-form__group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="contact-form__row">
                <div className="contact-form__group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="contact-form__group">
                  <label htmlFor="service">Service of Interest</label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                  >
                    <option value="">Select a service…</option>
                    {SERVICES_LIST.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="contact-form__group">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Please describe your project or query…"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              {/* Honeypot for spam protection */}
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

              <button
                type="submit"
                className="contact-form__submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Send Message →'}
              </button>

              <p className="contact-form__note">
                * Required fields. Powered by{' '}
                <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer">
                  Web3Forms
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
