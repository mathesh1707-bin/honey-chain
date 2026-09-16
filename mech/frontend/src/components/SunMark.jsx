export default function SunMark({ className = "h-10 w-10" }) {
  return (
    <svg viewBox="0 0 40 40" className={className}>
      <defs>
        <radialGradient id="sunGrad" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#FFD873" />
          <stop offset="100%" stopColor="#FF9100" />
        </radialGradient>
      </defs>
      {Array.from({ length: 8 }).map((_, i) => (
        <rect
          key={i}
          x="19"
          y="1"
          width="2"
          height="7"
          rx="1"
          fill="#FF9100"
          transform={`rotate(${i * 45} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="11" fill="url(#sunGrad)" />
    </svg>
  );
}