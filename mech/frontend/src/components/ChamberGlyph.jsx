export default function ChamberGlyph({ heaterOn, fanOn }) {
  return (
    <svg viewBox="0 0 120 100" className="h-24 w-32 shrink-0">
      <rect x="6" y="6" width="108" height="88" rx="6" fill="none" stroke="#2B140A" strokeOpacity="0.25" strokeWidth="2" />
      <line x1="14" y1="40" x2="106" y2="40" stroke="#2B140A" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="4 3" />
      <rect
        x="14"
        y="72"
        width="92"
        height="10"
        rx="2"
        fill={heaterOn ? "#DF301C" : "#2B140A22"}
        className={heaterOn ? "animate-ember" : ""}
      />
      <circle
        cx="98"
        cy="84"
        r="6"
        fill="none"
        stroke={fanOn ? "#4C9A3A" : "#2B140A44"}
        strokeWidth="2"
        className={fanOn ? "animate-spin-slow" : ""}
      />
      <line x1="98" y1="79" x2="98" y2="89" stroke={fanOn ? "#4C9A3A" : "#2B140A44"} strokeWidth="1.5" />
      <line x1="93" y1="84" x2="103" y2="84" stroke={fanOn ? "#4C9A3A" : "#2B140A44"} strokeWidth="1.5" />
    </svg>
  );
}