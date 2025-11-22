import React from 'react';

export default function FoxLogo() {
  return (
    <div className="inline-flex items-center justify-center logo-glow">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className="h-8 w-8 sm:h-10 sm:w-10"
        aria-label="NewsFlow fox logo"
      >
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFEDD5" />
            <stop offset="100%" stopColor="#FFEAD1" />
          </linearGradient>
          <linearGradient id="fur" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="url(#bg)" />
        <g transform="translate(8,10)">
          <path d="M24 6 L32 0 L40 6 C36 10 34 12 32 14 C30 12 28 10 24 6 Z" fill="url(#fur)" />
          <path d="M16 14 C16 8 22 6 32 14 C42 6 48 8 48 14 C48 26 42 36 32 36 C22 36 16 26 16 14 Z" fill="url(#fur)" />
          <path d="M32 22 C26 22 22 26 22 30 C26 32 28 33 32 33 C36 33 38 32 42 30 C42 26 38 22 32 22 Z" fill="#fff7ed" />
          <circle cx="26" cy="22" r="2.5" fill="#1f2937" />
          <circle cx="38" cy="22" r="2.5" fill="#1f2937" />
          <path d="M32 28 C31 29 33 29 32 28 Z" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
          <path d="M20 18 C22 16 24 16 26 18" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
          <path d="M38 18 C40 16 42 16 44 18" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}