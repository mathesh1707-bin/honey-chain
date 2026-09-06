export default function BeeLogo({ size = 28, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 2 L35 11 V29 L20 38 L5 29 V11 Z"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M20 12 C24 12 26 15 26 18 C26 21 24 22 20 22 C16 22 14 21 14 18 C14 15 16 12 20 12 Z"
        fill={color}
      />
      <line x1="16" y1="14" x2="24" y2="14" stroke="var(--parchment, #F1EAD9)" strokeWidth="1.2" />
      <line x1="15" y1="18" x2="25" y2="18" stroke="var(--parchment, #F1EAD9)" strokeWidth="1.2" />
      <line x1="16" y1="21" x2="24" y2="21" stroke="var(--parchment, #F1EAD9)" strokeWidth="1.2" />
      <path d="M20 8 L20 12" stroke={color} strokeWidth="1.5" />
      <circle cx="17" cy="7" r="1.3" fill={color} />
      <circle cx="23" cy="7" r="1.3" fill={color} />
    </svg>
  );
}