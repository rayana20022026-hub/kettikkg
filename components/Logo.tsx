import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <defs>
        <linearGradient id="gtk-logo" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#375ef5" />
          <stop offset="1" stopColor="#1a33c4" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#gtk-logo)" />
      <path
        d="M11 26c0-2.8 2.2-5 5-5h8"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29 14c0 2.8-2.2 5-5 5h-8"
        stroke="#fbbf24"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="11" cy="26" r="3.2" fill="#fff" />
      <circle cx="29" cy="14" r="3.2" fill="#fbbf24" />
    </svg>
  );
}
