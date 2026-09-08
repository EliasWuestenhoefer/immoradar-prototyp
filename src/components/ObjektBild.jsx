
export function ObjektBild({ type, tall }) {
  const gid = "g" + type.replace(/[^a-zA-Z]/g, "");
  return (
    <div className={"obj-art" + (tall ? " tall" : "")}>
      <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#EFEEE8" /><stop offset="100%" stopColor="#DBDBD3" />
          </linearGradient>
        </defs>
        <rect width="320" height="180" fill={`url(#${gid})`} />
        <g stroke="#9AA3AE" strokeWidth="1.1" fill="none" opacity="0.4">
          {Array.from({ length: 9 }).map((_, i) => <line key={i} x1={i * 40} y1="0" x2={i * 40} y2="180" />)}
        </g>
        {type === "Mehrfamilienhaus" && (
          <g>
            <rect x="72" y="46" width="112" height="112" fill="#25344B" opacity="0.93" />
            <rect x="184" y="78" width="70" height="80" fill="#3B4D66" opacity="0.9" />
            <g fill="#EFEEE8" opacity="0.85">
              {[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => <rect key={r + "-" + c} x={86 + c * 32} y={60 + r * 26} width="16" height="14" />))}
              {[0, 1, 2].map((r) => [0, 1].map((c) => <rect key={"b" + r + c} x={196 + c * 28} y={92 + r * 24} width="14" height="12" />))}
            </g>
          </g>
        )}
        {type === "Einfamilienhaus" && (
          <g>
            <path d="M84 84 160 40l76 44v74H84z" fill="#25344B" opacity="0.93" />
            <rect x="150" y="112" width="22" height="46" fill="#EFEEE8" opacity="0.9" />
            <g fill="#EFEEE8" opacity="0.85"><rect x="106" y="98" width="26" height="22" /><rect x="190" y="98" width="26" height="22" /></g>
          </g>
        )}
        {type === "Sonstiges" && (
          <g>
            <path d="M56 92 104 66l48 26v66H56z" fill="#3B4D66" opacity="0.9" />
            <path d="M152 92 200 66l48 26v66h-96z" fill="#25344B" opacity="0.93" />
            <g fill="#EFEEE8" opacity="0.85"><rect x="74" y="118" width="34" height="40" /><rect x="176" y="112" width="48" height="46" /></g>
          </g>
        )}
        <rect x="0" y="158" width="320" height="22" fill="#25344B" opacity="0.12" />
      </svg>
    </div>
  );
}
