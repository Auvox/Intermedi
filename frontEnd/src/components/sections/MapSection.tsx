import { useEffect, useRef, useState } from "react";
import "../../styles/mapSection.css";

// Cidades paulistas com coordenadas calibradas para o path SVG abaixo
// viewBox "0 0 800 480"
const CITIES = [
  { id: "sp",   name: "São Paulo",              x: 618, y: 318, label: "São Paulo" },
  { id: "camp", name: "Campinas",                x: 546, y: 250, label: "Campinas" },
  { id: "rib",  name: "Ribeirão Preto",          x: 488, y: 158, label: "Rib. Preto" },
  { id: "sjc",  name: "São José dos Campos",     x: 664, y: 278, label: "SJ Campos" },
  { id: "sor",  name: "Sorocaba",                x: 524, y: 304, label: "Sorocaba" },
  { id: "bauru",name: "Bauru",                   x: 392, y: 216, label: "Bauru" },
  { id: "mar",  name: "Marília",                 x: 328, y: 255, label: "Marília" },
  { id: "ara",  name: "Araçatuba",               x: 236, y: 192, label: "Araçatuba" },
  { id: "pre",  name: "Pres. Prudente",          x: 168, y: 280, label: "Pres. Prudente" },
  { id: "rpr",  name: "São J. Rio Preto",        x: 316, y: 138, label: "Rio Preto" },
  { id: "pir",  name: "Piracicaba",              x: 514, y: 242, label: "Piracicaba" },
  { id: "taub", name: "Taubaté",                 x: 676, y: 262, label: "Taubaté" },
  { id: "fran", name: "Franca",                  x: 516, y: 122, label: "Franca" },
  { id: "outu", name: "Ourinhos",                x: 376, y: 316, label: "Ourinhos" },
  { id: "votp", name: "Votuporanga",             x: 278, y: 128, label: "Votuporanga" },
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
  id: string; name: string; x: number; y: number; label: string;
  color: string; isShort: boolean;
}
interface FeedItem { id: number; text: string; }
interface MatchLine { id: number; x1: number; y1: number; x2: number; y2: number; prog: number; }
interface PulseRing { id: number; cx: number; cy: number; r: number; opacity: number; }

// Path do estado de São Paulo — shape fiel ao mapa de referência
// viewBox 0 0 800 480
const SP_PATH = `
  M 108 108
  L 120 92  L 138 80  L 160 72  L 186 66  L 214 62  L 242 60
  L 270 59  L 298 59  L 326 59  L 354 60  L 380 62  L 404 66
  L 425 72  L 443 80  L 456 90  L 466 100 L 474 88  L 484 78
  L 496 70  L 510 65  L 524 62  L 538 62  L 552 65  L 564 70
  L 574 78  L 582 88  L 588 100 L 592 114 L 596 128 L 602 140
  L 610 150 L 620 158 L 632 164 L 644 168 L 656 170 L 668 170
  L 678 168 L 686 163 L 692 156 L 695 148 L 694 140 L 690 133
  L 684 127 L 678 123 L 674 118 L 674 112 L 678 107 L 686 104
  L 696 103 L 706 105 L 714 110 L 720 118 L 722 128 L 720 140
  L 715 152 L 708 164 L 700 175 L 693 186 L 688 198 L 686 210
  L 688 222 L 694 233 L 703 242 L 714 249 L 724 254 L 732 257
  L 738 258 L 742 257 L 744 255 L 742 252 L 738 250 L 736 247
  L 738 244 L 744 242 L 752 243 L 758 247 L 760 254 L 758 262
  L 752 270 L 744 278 L 736 286 L 728 295 L 720 305 L 714 316
  L 710 328 L 710 340 L 714 352 L 720 362 L 726 370 L 730 378
  L 730 386 L 726 392 L 718 396 L 708 397 L 696 395 L 684 390
  L 672 383 L 660 375 L 648 367 L 636 360 L 622 355 L 607 352
  L 592 352 L 577 354 L 562 358 L 547 362 L 532 364 L 517 364
  L 502 362 L 487 358 L 472 352 L 458 346 L 444 342 L 430 340
  L 416 341 L 402 344 L 388 350 L 374 357 L 360 363 L 345 367
  L 330 369 L 314 369 L 298 367 L 282 362 L 267 355 L 253 346
  L 240 336 L 228 325 L 218 314 L 210 304 L 203 295 L 196 288
  L 188 283 L 178 281 L 167 282 L 157 286 L 148 294 L 141 304
  L 136 315 L 133 328 L 131 342 L 130 357 L 129 371 L 127 383
  L 122 393 L 115 401 L 107 406 L 100 408 L 94  406 L 90  400
  L 88  392 L 90  382 L 96  371 L 103 360 L 110 348 L 114 335
  L 116 322 L 114 308 L 109 296 L 102 285 L 96  276 L 92  267
  L 91  258 L 94  249 L 100 239 L 108 229 L 115 218 L 120 206
  L 122 194 L 120 182 L 115 171 L 108 160 L 103 149 L 101 138
  L 101 127 L 104 118 Z
`;

export default function MapSection() {
  const [matchCount, setMatchCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [medCount, setMedCount]       = useState(0);
  const [feed, setFeed]   = useState<FeedItem[]>([]);
  const [lines, setLines] = useState<MatchLine[]>([]);
  const [pulses, setPulses] = useState<PulseRing[]>([]);
  const [cities, setCities] = useState<CityData[]>([]);
  const idRef      = useRef(0);
  const citiesRef  = useRef<CityData[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Reveal animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".reveal").forEach((c) => c.classList.add("visible"));
          obs.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -50px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Assign colors
  useEffect(() => {
    const assigned = CITIES.map((c) => ({
      ...c,
      isShort: Math.random() > 0.5,
      color: "",
    }));
    assigned.forEach((c) => { c.color = c.isShort ? "#f97316" : "#22c55e"; });
    citiesRef.current = assigned;
    setCities(assigned);
  }, []);

  // Count-up animation
  useEffect(() => {
    const targets = [
      { set: setMatchCount, val: 3842, dur: 1400 },
      { set: setActiveCount, val: 874,  dur: 1000 },
      { set: setMedCount,    val: 127,  dur: 800  },
    ];
    const timers = targets.map(({ set, val, dur }) => {
      const step = val / (dur / 16);
      let cur = 0;
      const id = setInterval(() => {
        cur = Math.min(cur + step, val);
        set(Math.round(cur));
        if (cur >= val) clearInterval(id);
      }, 16);
      return id;
    });
    return () => timers.forEach(clearInterval);
  }, []);

  // Match animation
  useEffect(() => {
    const fireMatch = () => {
      const cc = citiesRef.current;
      if (!cc.length) return;
      const shorts = cc.filter((c) => c.isShort);
      const longs  = cc.filter((c) => !c.isShort);
      if (!shorts.length || !longs.length) return;
      const a   = shorts[Math.floor(Math.random() * shorts.length)];
      const b   = longs[Math.floor(Math.random() * longs.length)];
      if (a.id === b.id) return;
      const med   = MEDS[Math.floor(Math.random() * MEDS.length)];
      const msgFn = FEED_MSGS[Math.floor(Math.random() * FEED_MSGS.length)];
      const lid   = ++idRef.current;

      const pid = ++idRef.current;
      setPulses((prev) => [...prev, { id: pid, cx: a.x, cy: a.y, r: 4, opacity: 0.8 }]);
      const gp = setInterval(() => {
        setPulses((prev) =>
          prev.map((p) => p.id === pid ? { ...p, r: p.r + 1.2, opacity: p.opacity - 0.05 } : p)
              .filter((p) => p.opacity > 0)
        );
      }, 30);
      setTimeout(() => clearInterval(gp), 600);

      setLines((prev) => [...prev, { id: lid, x1: a.x, y1: a.y, x2: a.x, y2: a.y, prog: 0 }]);
      const al = setInterval(() => {
        setLines((prev) =>
          prev.map((l) => {
            if (l.id !== lid) return l;
            const prog = Math.min(l.prog + 0.025, 1);
            return { ...l, x2: a.x + (b.x - a.x) * prog, y2: a.y + (b.y - a.y) * prog, prog };
          })
        );
      }, 20);

      setTimeout(() => {
        clearInterval(al);
        setLines((prev) => prev.filter((l) => l.id !== lid));
        setMatchCount((c) => c + 1);
        setFeed((prev) =>
          [{ id: idRef.current++, text: msgFn(a.name, b.name, med) }, ...prev].slice(0, 4)
        );
      }, 40 * 40 + 800);
    };

    const delays = [800, 1600, 2800, 4000].map((d) => setTimeout(fireMatch, d));
    const interval = setInterval(fireMatch, 3200);
    return () => { delays.forEach(clearTimeout); clearInterval(interval); };
  }, []);

  return (
    <section className="section mapsection" id="mapa" ref={sectionRef}>
      <div className="section-container">
        <div className="section-header reveal">
          <div className="section-tag">Ao vivo</div>
          <h2 className="section-title">
            Matches acontecendo <span className="green">agora</span> em São Paulo
          </h2>
          <p className="section-desc">
            Veja em tempo real as conexões sendo feitas entre farmácias que precisam e
            farmácias que têm medicamentos disponíveis no estado de São Paulo.
          </p>
        </div>

        <div className="map-wrapper reveal">
          <svg className="map-svg" viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="bgGrad" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#f0f5ee" />
                <stop offset="100%" stopColor="#f5f7f4" />
              </radialGradient>
            </defs>
            <rect width="800" height="440" fill="url(#bgGrad)" />

            {/* Estado de São Paulo — shape idêntico ao mapa de referência */}
            <path d={SP_PATH} fill="#ddf0c8" stroke="#8aaf7a" strokeWidth="1.8" />

            {/* Pulse rings */}
            {pulses.map((p) => (
              <circle key={p.id} cx={p.cx} cy={p.cy} r={p.r} fill="none"
                stroke="#22c55e" strokeWidth="1.5" opacity={p.opacity} />
            ))}

            {/* Match lines */}
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
                <circle r="9"   fill={c.color} opacity="0.18" />
                <circle r="4.5" fill={c.color} stroke="#fff" strokeWidth="1.5" />
                <text x="8" y="4" fontSize="9" fill="#3a4038"
                  fontFamily="DM Sans, sans-serif" fontWeight="600">
                  {c.label}
                </text>
              </g>
            ))}
          </svg>

          {/* Sidebar stats */}
          <div className="map-sidebar">
            <div className="map-stat-pill">
              <div className="map-stat-pill-value">{matchCount.toLocaleString("pt-BR")}</div>
              <div className="map-stat-pill-label">Matches hoje em SP</div>
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
              <span className="map-legend-dot"
                style={{ background: "#3b82f6", width: 28, height: 2, borderRadius: 2 }} />
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
