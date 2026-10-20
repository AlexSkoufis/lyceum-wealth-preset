// Line art for the Lyceum preset, drawn in currentColor so CSS sets the ink.
// Etchings: "temple" (five disciplines), "cups" (purpose), "tree" (legacy).

const S = { fill: "none", stroke: "currentColor", strokeWidth: 3, strokeLinejoin: "round", strokeLinecap: "round" };
const thin = { ...S, strokeWidth: 1.6 };
const label = { fill: "currentColor", stroke: "none", fontFamily: "var(--font-display)", textAnchor: "middle" };

// Column centres in percent of the drawing width; content.disciplines.items[].x uses the same values.
const COLUMNS = [22, 36, 50, 64, 78];

function Temple({ columns }) {
  return (
    <>
      <path {...S} d="M200 272L700 92l500 180z" />
      <path {...thin} d="M268 252L700 118l432 134z" />
      <text {...label} x="700" y="228" fontSize="30" letterSpacing="4">
        GOALS &amp; MINIMUM OUTCOMES
      </text>
      <rect {...S} x="190" y="272" width="1020" height="52" />
      <path {...thin} d="M190 298h1020" />
      {COLUMNS.map((p, i) => {
        const cx = p * 14;
        return (
          <g key={p}>
            <path {...S} d={`M${cx - 64} 324h128v24H${cx - 64}z M${cx - 44} 348h88v482h-88z M${cx - 64} 830h128v26H${cx - 64}z`} />
            <path {...thin} d={`M${cx - 32} 356v466 M${cx + 22} 356v466 M${cx - 20} 356v40 M${cx - 20} 782v40 M${cx + 10} 356v40 M${cx + 10} 782v40`} />
            <path {...thin} d={`M${cx + 34} 370l10 -10 M${cx + 34} 410l10 -10 M${cx + 34} 450l10 -10 M${cx + 34} 490l10 -10 M${cx + 34} 530l10 -10 M${cx + 34} 570l10 -10 M${cx + 34} 610l10 -10 M${cx + 34} 650l10 -10 M${cx + 34} 690l10 -10 M${cx + 34} 730l10 -10 M${cx + 34} 770l10 -10 M${cx + 34} 810l10 -10`} />
            <text {...label} fontSize="24" letterSpacing="3" transform={`translate(${cx + 3} 590) rotate(-90)`}>
              {columns[i]?.toUpperCase()}
            </text>
          </g>
        );
      })}
      <rect {...S} x="160" y="856" width="1080" height="36" />
      <rect {...S} x="120" y="892" width="1160" height="40" />
      <rect {...S} x="80" y="932" width="1240" height="46" />
      <text {...label} x="700" y="964" fontSize="24" letterSpacing="6">
        HISTORY · ANALYSIS · RESEARCH
      </text>
      <path {...thin} d="M40 1010h1320 M90 1030h60 M190 1030h90 M340 1030h40 M450 1030h110 M640 1030h70 M780 1030h120 M960 1030h50 M1080 1030h90 M1230 1030h60" />
    </>
  );
}

function Goblet({ x, y, tilt, text }) {
  return (
    <g transform={`rotate(${tilt} ${x + 300} ${y})`}>
      <path {...S} d={`M${x} ${y}h300c0 120-70 196-150 196S${x} ${y + 120} ${x} ${y}z`} />
      <path {...thin} d={`M${x + 22} ${y + 44}h256`} />
      <path {...thin} d={`M${x + 60} ${y + 80}c20 40 50 70 90 76 M${x + 52} ${y + 64}c26 56 64 92 98 100`} />
      <path {...S} d={`M${x + 150} ${y + 196}v84 M${x + 82} ${y + 296}c0-10 30-16 68-16s68 6 68 16-30 16-68 16-68-6-68-16z`} />
      <text {...label} x={x + 150} y={y + 360} fontSize="26" letterSpacing="3" transform={`rotate(${-tilt} ${x + 150} ${y + 350})`}>
        {text.toUpperCase()}
      </text>
    </g>
  );
}

function Cups({ cups }) {
  return (
    <g transform="translate(50 -20)">
      <Goblet x={110} y={150} tilt={24} text={cups[0]} />
      <path {...S} d="M402 268c30 40 50 90 46 190" />
      <path {...thin} d="M416 280c22 40 36 86 34 176" />
      <Goblet x={450} y={470} tilt={16} text={cups[1]} />
      <path {...S} d="M748 560c26 40 40 90 36 170" />
      <path {...thin} d="M760 572c18 40 28 80 26 154" />
      <Goblet x={790} y={740} tilt={0} text={cups[2]} />
      <path {...thin} d="M10 1130h1080 M70 1148h80 M210 1148h120 M410 1148h60 M550 1148h140 M770 1148h70 M910 1148h110" />
    </g>
  );
}

function Tree({ parts }) {
  return (
    <>
      <path
        {...S}
        d="M600 92c70 0 120 40 140 86 60-14 132 20 150 84 64 10 112 66 104 132 54 40 64 118 20 168-30 36-82 50-128 40-30 46-92 64-146 44-34 30-90 36-136 14-46 22-104 16-140-16-50 12-104-10-130-54-52-6-94-50-96-104-42-40-44-110-4-152-6-64 44-122 108-128 24-58 92-92 156-74 26-24 64-40 102-40z"
      />
      <path {...thin} d="M380 300c20-30 60-44 96-36 M620 190c40-16 92-6 120 26 M820 330c32 8 56 34 62 66 M330 470c-10 34 4 70 34 90 M840 560c30-6 58 6 74 30 M560 600c30 18 74 18 104 0 M460 380c30-10 64 0 82 24 M700 420c34-6 66 12 78 40" />
      <text {...label} x="600" y="386" fontSize="34" letterSpacing="6">
        {parts[2].toUpperCase()}
      </text>
      <path {...S} d="M548 660c6 70 0 130-14 196h132c-14-66-20-126-14-196" />
      <path {...thin} d="M560 700c40 20 60 60 54 120 M640 690c-30 30-36 80-24 140 M520 640l-60-60 M680 640l60-70" />
      <rect x="470" y="752" width="260" height="44" fill="var(--etching-bg, var(--paper))" />
      <text {...label} x="600" y="784" fontSize="26" letterSpacing="4">
        {parts[1].toUpperCase()}
      </text>
      <path {...S} d="M220 856h760" />
      <path {...thin} d="M560 856c-40 40-120 60-200 120 M590 856c-10 50-60 100-90 170 M620 856c20 60 70 100 110 160 M650 856c60 30 150 50 230 110 M540 856c-80 10-190 20-280 70 M670 856c90 6 190 24 270 64" />
      <text {...label} x="600" y="1080" fontSize="28" letterSpacing="5">
        {parts[0].toUpperCase()}
      </text>
    </>
  );
}

export function Etching({ name, labels = [], title, className = "" }) {
  const box = name === "temple" ? "0 0 1400 1060" : "0 0 1200 1160";
  return (
    <svg className={className} viewBox={box} role="img" aria-label={title}>
      {name === "temple" && <Temple columns={labels} />}
      {name === "cups" && <Cups cups={labels} />}
      {name === "tree" && <Tree parts={labels} />}
    </svg>
  );
}

// Seal emblem: a fluted column inside a double ring.
export function Emblem({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="60" cy="60" r="48" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M34 36h52l-6 8H40z M42 48h36v4H42z M46 52h28v38H46z M38 90h44v6H38z M34 96h52v4H34z" fill="currentColor" />
      <path d="M53 55v32M60 55v32M67 55v32" stroke="var(--emblem-cut, var(--ink))" strokeWidth="2" />
    </svg>
  );
}

// Horizontal logo: emblem plus wordmark.
export function Wordmark({ className = "", label }) {
  return (
    <svg className={className} viewBox="0 0 410 106" role="img" aria-label={label}>
      <g transform="translate(3 3)">
        <circle cx="50" cy="50" r="47" fill="none" stroke="var(--gold)" strokeWidth="2.6" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--gold)" strokeWidth="1" />
        <path d="M28 30h44l-5 7H33z M35 40h30v3H35z M38 43h24v32H38z M31 75h38v5H31z M28 80h44v3H28z" fill="var(--gold)" />
      </g>
      <text x="124" y="62" fill="currentColor" fontFamily="var(--font-display)" fontSize="50" letterSpacing="4">
        LYCEUM
      </text>
      <text x="126" y="88" fill="currentColor" fontFamily="var(--font-sans)" fontSize="13.5" letterSpacing="5.2">
        WEALTH MANAGEMENT
      </text>
    </svg>
  );
}

// Engraved monogram in place of a portrait photo.
export function Medallion({ initials, className = "", id }) {
  return (
    <svg className={className} viewBox="0 0 400 500" role="img" aria-label={`Monogram ${initials}`} preserveAspectRatio="xMidYMax slice">
      <defs>
        <pattern id={`hatch-${id}`} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0v10" stroke="var(--gold)" strokeWidth="1" opacity="0.45" />
        </pattern>
      </defs>
      <rect width="400" height="500" fill={`url(#hatch-${id})`} />
      <circle cx="200" cy="270" r="128" fill="var(--paper)" stroke="var(--gold)" strokeWidth="2" />
      <text x="200" y="306" textAnchor="middle" fill="var(--ink)" fontFamily="var(--font-display)" fontStyle="italic" fontSize="104">
        {initials}
      </text>
    </svg>
  );
}
