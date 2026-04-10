import React, { useState, useEffect } from "react";

export function EnvelopeOpening({ onComplete, onMusicStart }: { onComplete: () => void, onMusicStart?: () => void }) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (opened) {
      if (onMusicStart) onMusicStart();
      const timer = setTimeout(() => {
        onComplete();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [opened, onComplete, onMusicStart]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500&display=swap');

        * {
          box-sizing: border-box;
        }

        html, body, #root {
          width: 100%;
          min-height: 100%;
          margin: 0;
          background: #e9e5df;
        }

        .scene {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: radial-gradient(circle at center, #f2eadf 0%, #dcd1c4 100%);
          perspective: 1500px;
          overflow: hidden;
          font-family: "Cormorant Garamond", serif;
        }

        .envelope-container {
          position: relative;
          width: min(460px, 92vw);
          height: min(680px, 85vh);
          cursor: pointer;
          transition: transform 0.6s ease;
          transform-style: preserve-3d;
        }

        .envelope-container:not(.is-open):hover {
          transform: scale(1.02);
        }

        /* Envelope Back Base */
        .envelope-base {
          position: absolute;
          inset: 0;
          background: #f4f0ea;
          border-radius: 4px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          z-index: 1;
        }

        /* Card Container */
        .card-container {
          position: absolute;
          inset: 0;
          background: #fffcf8;
          border-radius: 4px;
          z-index: 2;
          overflow: hidden;
          box-shadow: inset 0 0 20px rgba(0,0,0,0.02);
          transform: scale(1);
          transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .envelope-container.is-open .card-container {
          transform: scale(1.03); /* slight popup effect when opened */
          z-index: 4; /* Card rises above flap once opened */
        }

        /* Elegant Thin Gold Border inside Card */
        .card-border {
          position: absolute;
          inset: 16px;
          border: 1px solid rgba(212, 175, 55, 0.6);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px 20px;
          text-align: center;
        }

        /* Inner corner frame (optional detailing) */
        .card-border::before {
          content: '';
          position: absolute;
          inset: 6px;
          border: 1px solid rgba(212, 175, 55, 0.15);
        }

        /* Floral Graphics */
        .floral-branch {
          position: absolute;
          width: 220px;
          height: auto;
          opacity: 0.85;
          pointer-events: none;
        }
        
        .floral-top-right {
          top: -15px;
          right: -15px;
          transform: rotate(15deg);
        }

        .floral-bottom-left {
          bottom: -20px;
          left: -20px;
          transform: rotate(195deg);
          width: 260px;
        }

        /* Typography */
        .text-eyebrow {
          font-family: 'Times New Roman', serif;
          font-size: 11px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #5a5c51;
          margin-bottom: 24px;
          margin-top: auto;
          z-index: 2;
        }

        .text-names {
          font-family: "Great Vibes", cursive;
          font-size: 64px;
          line-height: 1;
          color: #1a1a1a;
          margin: 0 0 30px 0;
          font-weight: 400;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .text-ampersand {
          font-family: "Great Vibes", cursive;
          font-size: 45px;
          display: block;
          margin: -5px 0;
          color: #d4af37;
        }

        .text-details {
          font-family: 'Times New Roman', serif;
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #3b3d36;
          line-height: 2;
          margin-bottom: auto;
          z-index: 2;
        }

        .text-date {
          display: block;
          margin: 14px 0;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.3em;
        }

        /* Envelope Fold (Left Flap) */
        .flap-left {
          position: absolute;
          top: 0;
          left: 0;
          width: 66%;
          height: 100%;
          background: #f1ebd8;
          background-image: url("https://www.transparenttextures.com/patterns/cream-paper.png");
          border-right: 1px solid rgba(0,0,0,0.08);
          box-shadow: 10px 0 25px -10px rgba(0,0,0,0.3);
          transform-origin: left center;
          transform: rotateY(0deg);
          transition: transform 1.5s cubic-bezier(0.25, 1, 0.3, 1), box-shadow 1.5s ease;
          z-index: 5;
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
        }

        /* Add inner shadow to flap to give thickness */
        .flap-left::after {
          content: '';
          position: absolute;
          inset: 0;
          box-shadow: inset -3px 0 8px rgba(0,0,0,0.04);
          pointer-events: none;
        }

        .envelope-container.is-open .flap-left {
          transform: rotateY(-140deg);
          box-shadow: -15px 0 25px -10px rgba(0,0,0,0.15);
        }

        /* Satin Ribbon */
        .ribbon-wrap {
          position: absolute;
          top: 55%;
          transform: translateY(-50%);
          width: 100%;
          z-index: 6;
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .envelope-container.is-open .ribbon-wrap {
          opacity: 0;
          transform: translateY(-50%) scale(1.05);
          pointer-events: none;
        }

        .ribbon-band {
          width: 100%;
          height: 54px;
          background: linear-gradient(
            to bottom, 
            #e4d7c5 0%, 
            #fdfbf7 25%, 
            #e0ceba 50%, 
            #fdfbf7 75%, 
            #d6c4ae 100%
          );
          box-shadow: 0 4px 6px rgba(0,0,0,0.1), inset 0 1px rgba(255,255,255,0.5);
        }

        /* Bow Container */
        .bow-center {
          position: absolute;
          top: 27px; /* center of ribbon band */
          left: 55%; /* Offset to sit nicely on the flap edge */
          transform: translate(-50%, -50%);
          width: 160px;
          height: 100px;
        }

        /* Image Bow styling */
        .bow-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          mix-blend-mode: multiply;
          filter: drop-shadow(0 6px 8px rgba(0,0,0,0.15)) contrast(1.05);
          transform: scale(1.6);
        }

        .instruction-toast {
          position: absolute;
          bottom: -60px;
          left: 50%;
          transform: translateX(-50%);
          color: #72685c;
          font-family: "Montserrat", sans-serif;
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          opacity: 1;
          transition: opacity 0.5s;
          white-space: nowrap;
        }

        .envelope-container.is-open .instruction-toast {
          opacity: 0;
        }

        @media (max-width: 600px) {
          .envelope-container {
            width: 340px;
            height: 520px;
          }
          .text-names {
            font-size: 50px;
          }
          .text-ampersand {
            font-size: 36px;
          }
          .floral-branch {
            width: 160px;
          }
          .floral-bottom-left {
            width: 190px;
          }
          .bow-center {
            width: 140px;
            height: 90px;
          }
        }
      `}</style>

      <div className="scene">
        <div
          className={`envelope-container ${opened ? 'is-open' : ''}`}
          onClick={() => {
            if (!opened) setOpened(true);
          }}
        >
          {/* Base shadow behind the card */}
          <div className="envelope-base"></div>

          {/* Inner Card */}
          <div className="card-container">
            <div className="card-border">
              {/* Floral Ornaments (SVG) */}
              <svg className="floral-branch floral-top-right" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <g fill="#A6B3A0" opacity="0.8">
                  <path d="M100,50 Q130,20 180,30 Q160,60 130,70 Q110,80 100,50 Z" />
                  <path d="M120,60 Q150,50 170,80 Q140,110 110,90 Q100,70 120,60 Z" />
                  <path d="M110,80 Q120,110 90,140 Q60,120 70,100 Q90,80 110,80 Z" />
                  <circle cx="150" cy="50" r="4" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" />
                  <circle cx="140" cy="70" r="5" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" />
                  <circle cx="110" cy="110" r="3" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" />
                </g>
                <path d="M200,0 Q120,40 50,150" stroke="#8A9684" strokeWidth="2" fill="none" />
              </svg>

              <svg className="floral-branch floral-bottom-left" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <g fill="#9FB098" opacity="0.85">
                  <path d="M40,150 Q70,110 130,120 Q110,160 80,170 Q50,180 40,150 Z" />
                  <path d="M70,130 Q100,100 120,140 Q90,180 60,160 Q40,140 70,130 Z" />
                  <path d="M90,150 Q110,180 70,200 Q40,180 60,160 Q80,140 90,150 Z" />
                  <path d="M110,130 Q140,100 160,140 Q130,180 100,160 Q80,140 110,130 Z" />
                  <path d="M140,110 Q170,80 190,120 Q160,160 130,140 Q110,120 140,110 Z" />
                  <circle cx="100" cy="140" r="7" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" />
                  <circle cx="80" cy="170" r="5" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" />
                  <circle cx="120" cy="160" r="5" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" />
                  <circle cx="150" cy="130" r="4" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" />
                </g>
                <path d="M0,200 Q80,160 180,60" stroke="#8A9684" strokeWidth="2" fill="none" />
              </svg>

              <div className="text-eyebrow">Promise of Love</div>

              <h1 className="text-names">
                Samadhi
                <span className="text-ampersand">&</span>
                Madhawa
              </h1>

              <div className="text-details">
                Request the honour of your presence<br />
                <span className="text-date">Saturday 19 September 2026 At 3:30 PM</span>
                St. Antony's Church<br />
                Kongodamulla, Katana
              </div>
            </div>
          </div>

          {/* Opening Left Flap */}
          <div className="flap-left"></div>

          {/* Ribbon Wrapper */}
          <div className="ribbon-wrap">
            <div className="ribbon-band"></div>
            <div className="bow-center">
              {/* Photorealistic Satin Bow Image */}
              <img src="/ivory_satin_bow-removebg-preview.png" alt="Satin Bow" className="bow-image" />
            </div>
          </div>

          <div className="instruction-toast">Click to unwrap</div>
        </div>
      </div>
    </>
  );
}