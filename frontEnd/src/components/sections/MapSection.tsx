import { useEffect, useRef, useState } from "react";
import "../../styles/mapSection.css";

const CITIES = [
  { id: "sp",  name: "São Paulo",       x: 410, y: 370, state: "SP" },
  { id: "rj",  name: "Rio de Janeiro",  x: 445, y: 390, state: "RJ" },
  { id: "bh",  name: "Belo Horizonte",  x: 420, y: 340, state: "MG" },
  { id: "cu",  name: "Curitiba",        x: 400, y: 415, state: "PR" },
  { id: "poa", name: "Porto Alegre",    x: 385, y: 455, state: "RS" },
  { id: "ssv", name: "Salvador",        x: 490, y: 285, state: "BA" },
  { id: "rec", name: "Recife",          x: 515, y: 240, state: "PE" },
  { id: "for", name: "Fortaleza",       x: 490, y: 185, state: "CE" },
  { id: "man", name: "Manaus",          x: 250, y: 145, state: "AM" },
  { id: "bel", name: "Belém",           x: 395, y: 150, state: "PA" },
  { id: "bsb", name: "Brasília",        x: 385, y: 295, state: "DF" },
  { id: "goi", name: "Goiânia",         x: 360, y: 315, state: "GO" },
  { id: "mct", name: "Campo Grande",    x: 330, y: 360, state: "MS" },
  { id: "flo", name: "Florianópolis",   x: 405, y: 435, state: "SC" },
  { id: "nta", name: "Natal",           x: 530, y: 210, state: "RN" },
];

const MEDS = [
  "Amoxicilina 500mg", "Dipirona 1g", "Losartana 50mg", "Metformina 850mg",
  "Omeprazol 20mg", "Atorvastatina 40mg", "Levotiroxina 50mcg", "Azitromicina 500mg",
  "Ibuprofeno 600mg", "Sinvastatina 20mg",
];

const FEED_MSGS = [
  (a: string, b: string, m: string) => `Match: ${a} → ${b} (${m})`,
  (a: string, b: string, m: string) => `${a} enviando ${m} para ${b}`,
  (a: string, b: string, m: string) => `Chamado resolvido: ${m} em ${b}`,
];

interface CityData {
  id: string; name: string; x: number; y: number; state: string;
  color: string; isShort: boolean;
}

interface FeedItem { id: number; text: string; }
interface MatchLine { id: number; x1: number; y1: number; x2: number; y2: number; prog: number; }
interface PulseRing { id: number; cx: number; cy: number; r: number; opacity: number; }

export default function MapSection() {
  const [matchCount, setMatchCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [medCount, setMedCount]       = useState(0);
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [lines, setLines] = useState<MatchLine[]>([]);
  const [pulses, setPulses] = useState<PulseRing[]>([]);
  const [cities, setCities] = useState<CityData[]>([]);
  const idRef = useRef(0);

  // Assign random colors to cities
  useEffect(() => {
    const assigned = CITIES.map((c) => ({
      ...c,
      isShort: Math.random() > 0.5,
      color: Math.random() > 0.5 ? "#f97316" : "#22c55e",
    }));
    assigned.forEach((c) => { c.color = c.isShort ? "#f97316" : "#22c55e"; });
    setCities(assigned);
  }, []);

  // Animate stats on mount
  useEffect(() => {
    const targets = [{ set: setMatchCount, val: 1247, dur: 1200 }, { set: setActiveCount, val: 312, dur: 900 }, { set: setMedCount, val: 58, dur: 700 }];
    const timers = targets.map(({ set, val, dur }) => {
      const step = val / (dur / 16);
      let cur = 0;
      return setInterval(() => {
        cur = Math.min(cur + step, val);
        set(Math.round(cur));
        if (cur >= val) clearInterval(timers[targets.indexOf({ set, val, dur })]);
      }, 16);
    });
    const delay = setTimeout(() => {}, 400);
    return () => { timers.forEach(clearInterval); clearTimeout(delay); };
  }, []);

  const fireMatch = () => {
    if (cities.length === 0) return;
    const shorts = cities.filter((c) => c.isShort);
    const longs  = cities.filter((c) => !c.isShort);
    if (!shorts.length || !longs.length) return;
    const a = shorts[Math.floor(Math.random() * shorts.length)];
    const b = longs[Math.floor(Math.random() * longs.length)];
    if (a.id === b.id) return;
    const med = MEDS[Math.floor(Math.random() * MEDS.length)];
    const msgFn = FEED_MSGS[Math.floor(Math.random() * FEED_MSGS.length)];
    const lid = ++idRef.current;

    // Add pulse ring
    const pid = ++idRef.current;
    setPulses((prev) => [...prev, { id: pid, cx: a.x, cy: a.y, r: 4, opacity: 0.8 }]);
    const growPulse = setInterval(() => {
      setPulses((prev) =>
        prev.map((p) =>
          p.id === pid ? { ...p, r: p.r + 1.2, opacity: p.opacity - 0.05 } : p
        ).filter((p) => p.opacity > 0)
      );
    }, 30);
    setTimeout(() => clearInterval(growPulse), 600);

    // Animate line
    setLines((prev) => [...prev, { id: lid, x1: a.x, y1: a.y, x2: a.x, y2: a.y, prog: 0 }]);
    const animLine = setInterval(() => {
      setLines((prev) =>
        prev.map((l) => {
          if (l.id !== lid) return l;
          const prog = Math.min(l.prog + 0.025, 1);
          return { ...l, x2: a.x + (b.x - a.x) * prog, y2: a.y + (b.y - a.y) * prog, prog };
        })
      );
    }, 20);

    setTimeout(() => {
      clearInterval(animLine);
      setLines((prev) => prev.filter((l) => l.id !== lid));
      setMatchCount((c) => c + 1);
      setFeed((prev) => [{ id: idRef.current++, text: msgFn(a.state, b.state, med) }, ...prev].slice(0, 4));
    }, 40 * 40 + 800);
  };

  useEffect(() => {
    if (cities.length === 0) return;
    const delays = [800, 1600, 2800, 4000].map((d) => setTimeout(fireMatch, d));
    const interval = setInterval(fireMatch, 3200);
    return () => { delays.forEach(clearTimeout); clearInterval(interval); };
  }, [cities]);

  return (
    <section className="section mapsection" id="mapa">
      <div className="section-container">
        <div className="section-header reveal">
          <div className="section-tag">Ao vivo</div>
          <h2 className="section-title">Matches acontecendo <span className="green">agora</span> no Brasil</h2>
          <p className="section-desc">
            Veja em tempo real as conexões sendo feitas entre farmácias que precisam e
            farmácias que têm medicamentos disponíveis.
          </p>
        </div>

        <div className="map-wrapper reveal">
          <svg className="map-svg" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#eef4ec" />
                <stop offset="100%" stopColor="#f5f7f4" />
              </radialGradient>
            </defs>
            <rect width="800" height="600" fill="url(#bgGrad)" />

            {/* Brazil outline */}
            <path
              d="M 310 60 L 340 55 L 380 58 L 420 65 L 460 70 L 490 80 L 510 95
                 L 530 110 L 545 130 L 550 155 L 545 175 L 555 195
                 L 565 215 L 570 240 L 560 260 L 545 275 L 530 290
                 L 515 310 L 505 335 L 498 360 L 490 385 L 478 410
                 L 462 430 L 445 448 L 425 462 L 405 472 L 385 478
                 L 365 480 L 345 475 L 325 465 L 308 450 L 295 432
                 L 285 412 L 278 390 L 272 368 L 268 345 L 262 322
                 L 252 300 L 240 280 L 228 262 L 218 244 L 210 225
                 L 205 205 L 202 185 L 205 165 L 212 148 L 222 133
                 L 235 120 L 250 108 L 265 96 L 282 82 L 295 70 Z"
              fill="#e8f0e5"
              stroke="#c9d9c3"
              strokeWidth="1.5"
            />

            {/* State lines */}
            {[
              "M 310 60 L 300 140 L 310 200 L 340 220 L 380 210 L 420 180 L 450 160 L 490 80",
              "M 300 140 L 240 180 L 218 244",
              "M 310 200 L 290 260 L 268 345",
              "M 340 220 L 350 290 L 345 350",
              "M 420 180 L 430 260 L 420 320",
              "M 450 160 L 460 240 L 490 310 L 505 335",
            ].map((d, i) => (
              <path key={i} d={d} fill="none" stroke="#d4e0cf" strokeWidth="0.8" strokeDasharray="3,4" />
            ))}

            {/* Pulse rings */}
            {pulses.map((p) => (
              <circle key={p.id} cx={p.cx} cy={p.cy} r={p.r} fill="none"
                stroke="#22c55e" strokeWidth="1.5" opacity={p.opacity} />
            ))}

            {/* Match lines + dots */}
            {lines.map((l) => (
              <g key={l.id}>
                <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                  stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.7" />
                <circle cx={l.x2} cy={l.y2} r="3" fill="#3b82f6" />
              </g>
            ))}

            {/* City dots */}
            {cities.map((c) => (
              <g key={c.id} transform={`translate(${c.x},${c.y})`}>
                <circle r="8" fill={c.color} opacity="0.15" />
                <circle r="4" fill={c.color} stroke="#fff" strokeWidth="1.5" />
                <text x="7" y="4" fontSize="9" fill="#5a5f56" fontFamily="DM Sans, sans-serif">
                  {c.state}
                </text>
              </g>
            ))}
          </svg>

          {/* Sidebar stats */}
          <div className="map-sidebar">
            <div className="map-stat-pill">
              <div className="map-stat-pill-value">{matchCount.toLocaleString("pt-BR")}</div>
              <div className="map-stat-pill-label">Matches hoje</div>
            </div>
            <div className="map-stat-pill">
              <div className="map-stat-pill-value">{activeCount.toLocaleString("pt-BR")}</div>
              <div className="map-stat-pill-label">Farmácias ativas agora</div>
            </div>
            <div className="map-stat-pill">
              <div className="map-stat-pill-value">{medCount}</div>
              <div className="map-stat-pill-label">Medicamentos em trânsito</div>
            </div>
          </div>

          {/* Legend */}
          <div className="map-legend">
            <div className="map-legend-item">
              <span className="map-legend-dot" style={{ background: "#22c55e" }} />
              Farmácia com sobra
            </div>
            <div className="map-legend-item">
              <span className="map-legend-dot" style={{ background: "#f97316" }} />
              Farmácia com falta
            </div>
            <div className="map-legend-item">
              <span className="map-legend-dot" style={{ background: "#3b82f6", width: 28, height: 2, borderRadius: 2 }} />
              Match em andamento
            </div>
          </div>

          {/* Live feed */}
          <div className="map-feed">
            <div className="map-feed-title">Atividade recente</div>
            <div className="map-feed-list">
              {feed.map((item) => (
                <div key={item.id} className="map-feed-item">
                  <span className="map-feed-dot" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
