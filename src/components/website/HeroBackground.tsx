"use client";

import { useRef, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════
   3D DIGITAL UNIVERSE — Pure Canvas, no libraries
   ▸ Fibonacci-sphere node network with live connections
   ▸ Three orbital rings with glowing particle trails
   ▸ Floating wireframe octahedron + cube (mouse-reactive)
   ▸ Depth-sorted star field with parallax
   ▸ Nebula blobs + horizon fade
   ▸ Mouse drag tilts the entire scene in 3D
   ═══════════════════════════════════════════════════════════ */

interface P3 { x: number; y: number; z: number }
interface P2 { x: number; y: number; s: number }

const FOV = 420;

function proj(p: P3, cx: number, cy: number): P2 {
  const z = p.z + FOV;
  if (z <= 0) return { x: cx, y: cy, s: 0 };
  const s = FOV / z;
  return { x: cx + p.x * s, y: cy + p.y * s, s };
}

function ry(p: P3, a: number): P3 {
  return { x: p.x * Math.cos(a) + p.z * Math.sin(a), y: p.y, z: -p.x * Math.sin(a) + p.z * Math.cos(a) };
}
function rx(p: P3, a: number): P3 {
  return { x: p.x, y: p.y * Math.cos(a) - p.z * Math.sin(a), z: p.y * Math.sin(a) + p.z * Math.cos(a) };
}
function rz(p: P3, a: number): P3 {
  return { x: p.x * Math.cos(a) - p.y * Math.sin(a), y: p.x * Math.sin(a) + p.y * Math.cos(a), z: p.z };
}

function fibSphere(n: number, r: number): P3[] {
  const pts: P3[] = [];
  const phi = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < n; i++) {
    const theta = Math.acos(1 - 2 * (i + 0.5) / n);
    const a = 2 * Math.PI * i / phi;
    pts.push({ x: r * Math.sin(theta) * Math.cos(a), y: r * Math.sin(theta) * Math.sin(a), z: r * Math.cos(theta) });
  }
  return pts;
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const camRot = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const tick = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0;

    /* ── Scene data ── */
    const SPHERE_R = 170;
    const NODES = 85;
    const CONN = 68;

    const sphereBase = fibSphere(NODES, SPHERE_R);

    const RINGS = [
      { r: 255, tx: 0.9,  tz: 0,           spd: 0.004,  col: "244,163,0"   },
      { r: 310, tx: 1.15, tz: Math.PI / 5, spd: -0.003, col: "107,179,242" },
      { r: 220, tx: 0.55, tz: Math.PI / 3, spd: 0.006,  col: "200,16,46"   },
    ];

    const orbitals = RINGS.flatMap((ring, ri) =>
      Array.from({ length: 3 }, (_, i) => ({
        ri,
        angle: (i / 3) * Math.PI * 2,
        trail: [] as { x: number; y: number; s: number }[],
      }))
    );

    const stars = Array.from({ length: 220 }, () => ({
      x: (Math.random() - 0.5) * 2200,
      y: (Math.random() - 0.5) * 2200,
      z: (Math.random() - 0.5) * 1600,
      sz: Math.random() * 1.4 + 0.2,
      tw: Math.random() * Math.PI * 2,
    }));

    /* Octahedron */
    const OS = 85;
    const octV: P3[] = [
      { x: OS, y: 0, z: 0 }, { x: -OS, y: 0, z: 0 },
      { x: 0, y: OS, z: 0 }, { x: 0, y: -OS, z: 0 },
      { x: 0, y: 0, z: OS }, { x: 0, y: 0, z: -OS },
    ];
    const octE = [[0,2],[0,3],[0,4],[0,5],[1,2],[1,3],[1,4],[1,5],[2,4],[2,5],[3,4],[3,5]];

    /* Cube */
    const CS = 65;
    const cubeV: P3[] = [
      {x:-CS,y:-CS,z:-CS},{x:CS,y:-CS,z:-CS},{x:CS,y:CS,z:-CS},{x:-CS,y:CS,z:-CS},
      {x:-CS,y:-CS,z:CS}, {x:CS,y:-CS,z:CS}, {x:CS,y:CS,z:CS}, {x:-CS,y:CS,z:CS},
    ];
    const cubeE = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];

    /* Tetrahedron */
    const TS = 75;
    const sq2 = Math.sqrt(2);
    const tetraV: P3[] = [
      { x: TS,  y: 0,        z: -TS / sq2 },
      { x: -TS, y: 0,        z: -TS / sq2 },
      { x: 0,   y: TS,       z:  TS / sq2 },
      { x: 0,   y: -TS,      z:  TS / sq2 },
    ];
    const tetraE = [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.scale(dpr, dpr);
    };

    const onMouse = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);

    /* ── Helpers ── */
    function applyCamera(p: P3, autoY: number): P3 {
      let q = ry(p, autoY + camRot.current.y);
      q = rx(q, camRot.current.x * 0.8);
      return q;
    }

    function drawWireframe(
      vertices: P3[],
      edges: number[][],
      offset: P3,
      localRotFn: (v: P3) => P3,
      autoY: number,
      cx: number,
      cy: number,
      strokeCol: string,
      nodeCol: string
    ) {
      const tf = vertices.map(v => {
        const lv = localRotFn(v);
        const world: P3 = { x: lv.x + offset.x, y: lv.y + offset.y, z: lv.z + offset.z };
        const cam = applyCamera(world, autoY);
        return { cam, p2: proj(cam, cx, cy) };
      });

      for (const [a, b] of edges) {
        const pa = tf[a].p2, pb = tf[b].p2;
        const alpha = ((pa.s + pb.s) / 2) * 0.65;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = `rgba(${strokeCol},${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      for (const { p2 } of tf) {
        ctx.beginPath();
        ctx.arc(p2.x, p2.y, Math.max(0.5, 3 * p2.s), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeCol},${p2.s * 0.9})`;
        ctx.fill();
      }
    }

    const animate = () => {
      tick.current += 1;
      const t = tick.current;

      /* Smooth camera */
      camRot.current.x += (mouse.current.y * 0.35 - camRot.current.x) * 0.04;
      camRot.current.y += (mouse.current.x * 0.55 - camRot.current.y) * 0.04;

      const cx = W / 2, cy = H / 2;
      const autoY = t * 0.003;

      ctx.clearRect(0, 0, W, H);

      /* ── Background ── */
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0,   "#050d1c");
      bg.addColorStop(0.5, "#091428");
      bg.addColorStop(1,   "#060f20");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      /* ── Nebula blobs ── */
      const nebulas = [
        { ox: W * 0.18, oy: H * 0.28, r: 320, col: "244,163,0",   ph: 0 },
        { ox: W * 0.82, oy: H * 0.65, r: 360, col: "200,16,46",   ph: 2.1 },
        { ox: W * 0.50, oy: H * 0.82, r: 260, col: "107,179,242", ph: 4.2 },
        { ox: W * 0.70, oy: H * 0.20, r: 200, col: "244,163,0",   ph: 1.5 },
      ];
      for (const nb of nebulas) {
        const pulse = Math.sin(t * 0.007 + nb.ph) * 25;
        const rr = nb.r + pulse;
        const g = ctx.createRadialGradient(nb.ox, nb.oy, 0, nb.ox, nb.oy, rr);
        g.addColorStop(0,   `rgba(${nb.col},0.09)`);
        g.addColorStop(0.5, `rgba(${nb.col},0.025)`);
        g.addColorStop(1,   `rgba(${nb.col},0)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(nb.ox, nb.oy, rr, 0, Math.PI * 2); ctx.fill();
      }

      /* ── Stars ── */
      for (const star of stars) {
        let sp = ry(star, autoY * 0.4 + camRot.current.y * 0.5);
        sp = rx(sp, camRot.current.x * 0.5);
        const p2 = proj(sp, cx, cy);
        if (p2.s <= 0) continue;
        const tw = Math.sin(t * 0.04 + star.tw) * 0.35 + 0.65;
        const sz = Math.max(0.2, star.sz * p2.s * 2.5);
        ctx.beginPath();
        ctx.arc(p2.x, p2.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.45 * tw * Math.min(1, p2.s)})`;
        ctx.fill();
      }

      /* ── 3D Sphere ── */
      const tNodes = sphereBase.map(n => {
        let p = ry(n, autoY + camRot.current.y);
        p = rx(p, camRot.current.x * 0.8);
        return { w: p, p2: proj(p, cx, cy) };
      });

      // connections (nearest pairs)
      for (let i = 0; i < tNodes.length; i++) {
        for (let j = i + 1; j < tNodes.length; j++) {
          const a = tNodes[i], b = tNodes[j];
          const dx = a.w.x - b.w.x, dy = a.w.y - b.w.y, dz = a.w.z - b.w.z;
          const d = Math.sqrt(dx*dx + dy*dy + dz*dz);
          if (d > CONN) continue;
          const alpha = (1 - d / CONN) * 0.45 * ((a.p2.s + b.p2.s) / 2);
          const lg = ctx.createLinearGradient(a.p2.x, a.p2.y, b.p2.x, b.p2.y);
          lg.addColorStop(0, `rgba(244,163,0,${alpha})`);
          lg.addColorStop(1, `rgba(107,179,242,${alpha})`);
          ctx.beginPath();
          ctx.moveTo(a.p2.x, a.p2.y);
          ctx.lineTo(b.p2.x, b.p2.y);
          ctx.strokeStyle = lg;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      // nodes (back-to-front)
      const sorted = [...tNodes].sort((a, b) => a.w.z - b.w.z);
      for (const { w, p2 } of sorted) {
        if (p2.s <= 0) continue;
        const depth = (w.z + SPHERE_R) / (SPHERE_R * 2);
        const r2 = Math.round(107 + (244 - 107) * depth);
        const g2 = Math.round(179 + (163 - 179) * depth);
        const b2 = Math.round(242 + (0   - 242) * depth);
        const alpha = 0.45 + depth * 0.55;
        ctx.shadowBlur = 10; ctx.shadowColor = `rgba(244,163,0,${alpha * 0.4})`;
        ctx.beginPath();
        ctx.arc(p2.x, p2.y, Math.max(0.5, 3.5 * p2.s), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r2},${g2},${b2},${alpha})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      /* ── Central core glow ── */
      const pulse = 55 + Math.sin(t * 0.045) * 18;
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulse);
      cg.addColorStop(0,   "rgba(244,163,0,0.3)");
      cg.addColorStop(0.4, "rgba(244,163,0,0.07)");
      cg.addColorStop(1,   "rgba(244,163,0,0)");
      ctx.fillStyle = cg;
      ctx.beginPath(); ctx.arc(cx, cy, pulse, 0, Math.PI * 2); ctx.fill();

      // inner bright dot
      ctx.shadowBlur = 30; ctx.shadowColor = "rgba(244,163,0,0.9)";
      ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,220,80,0.95)"; ctx.fill();
      ctx.shadowBlur = 0;

      /* ── Orbital rings + particles ── */
      const SEG = 120;
      for (let ri = 0; ri < RINGS.length; ri++) {
        const ring = RINGS[ri];
        const ringPts: P3[] = [];
        for (let s = 0; s <= SEG; s++) {
          const a = (s / SEG) * Math.PI * 2;
          let rp: P3 = { x: ring.r * Math.cos(a), y: ring.r * Math.sin(a), z: 0 };
          rp = rx(rp, ring.tx);
          rp = rz(rp, ring.tz + t * ring.spd);
          rp = ry(rp, autoY + camRot.current.y);
          rp = rx(rp, camRot.current.x * 0.8);
          ringPts.push(rp);
        }

        // dashed ring line
        for (let s = 0; s < SEG; s++) {
          if (s % 4 < 2) continue;
          const pa = proj(ringPts[s], cx, cy);
          const pb = proj(ringPts[s + 1], cx, cy);
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y);
          ctx.strokeStyle = `rgba(${ring.col},${pa.s * 0.25})`;
          ctx.lineWidth = 0.8; ctx.stroke();
        }

        // orbital particles
        for (const orb of orbitals.filter(o => o.ri === ri)) {
          orb.angle += Math.abs(ring.spd) * 3.5 * Math.sign(ring.spd || 1);
          let op: P3 = {
            x: ring.r * Math.cos(orb.angle),
            y: ring.r * Math.sin(orb.angle),
            z: 0,
          };
          op = rx(op, ring.tx);
          op = rz(op, ring.tz + t * ring.spd);
          op = ry(op, autoY + camRot.current.y);
          op = rx(op, camRot.current.x * 0.8);
          const pp = proj(op, cx, cy);

          orb.trail.push({ x: pp.x, y: pp.y, s: pp.s });
          if (orb.trail.length > 22) orb.trail.shift();

          // trail
          for (let ti = 0; ti < orb.trail.length - 1; ti++) {
            const t0 = orb.trail[ti], t1 = orb.trail[ti + 1];
            const frac = ti / orb.trail.length;
            ctx.beginPath();
            ctx.moveTo(t0.x, t0.y); ctx.lineTo(t1.x, t1.y);
            ctx.strokeStyle = `rgba(${ring.col},${frac * t0.s * 0.75})`;
            ctx.lineWidth = 2.5 * frac * pp.s;
            ctx.stroke();
          }

          // particle head
          ctx.shadowBlur = 22; ctx.shadowColor = `rgba(${ring.col},0.85)`;
          ctx.beginPath(); ctx.arc(pp.x, pp.y, Math.max(1, 4.5 * pp.s), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${ring.col},${Math.min(1, pp.s + 0.1)})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      /* ── Floating geometries ── */
      // Octahedron — upper left
      drawWireframe(
        octV, octE,
        { x: -350, y: -200, z: 0 },
        v => { const a2 = t * 0.009; return rx(ry(v, a2), a2 * 0.7); },
        autoY, cx, cy, "244,163,0", "255,200,60"
      );

      // Cube — lower right
      drawWireframe(
        cubeV, cubeE,
        { x: 370, y: 200, z: 30 },
        v => { const a2 = t * 0.007; return rz(ry(v, -a2), a2 * 0.5); },
        autoY, cx, cy, "107,179,242", "150,210,255"
      );

      // Tetrahedron — upper right
      drawWireframe(
        tetraV, tetraE,
        { x: 340, y: -230, z: -30 },
        v => { const a2 = t * 0.011; return rx(rz(v, a2), a2 * 0.6); },
        autoY, cx, cy, "200,16,46", "255,80,100"
      );

      /* ── Horizon fade-to-white ── */
      const hg = ctx.createLinearGradient(0, H - 200, 0, H);
      hg.addColorStop(0, "rgba(255,255,255,0)");
      hg.addColorStop(1, "rgba(255,255,255,1)");
      ctx.fillStyle = hg;
      ctx.fillRect(0, H - 200, W, 200);

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: "auto" }}
    />
  );
}
