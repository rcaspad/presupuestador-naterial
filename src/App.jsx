import React, { useState, useMemo, useEffect } from 'react';
import {
  Calculator,
  Ruler,
  Layers,
  Package,
  Info,
  Printer,
  Maximize2,
  Construction,
  CheckCircle2,
  Box,
  Palette,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Download,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for tailwind classes merge
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const PRODUCTOS = {
  lamas: {
    id: "lamas",
    titulo: "Lamas de Composite",
    gamas: {
      tatria: {
        nombre: "TATRIA (220x11)",
        descripcion: "EXTRUIDO - FOREST",
        precioM2: 33,
        largo: 2.22,
        ancho: 0.11,
        tipoClip: "natix",
        variantes: [
          { nombre: "Gris", ref: "95898301", pvpUnidad: 7.99, color: "#5e5e5e" },
          { nombre: "Choco", ref: "95898309", pvpUnidad: 7.99, color: "#4a3728" }
        ]
      },
      dolma: {
        nombre: "DOLMA (240x14.5)",
        descripcion: "EXTRUIDO - FOREST",
        precioM2: 40,
        largo: 2.42,
        ancho: 0.145,
        tipoClip: "natix",
        variantes: [
          { nombre: "Choco Nat", ref: "95898305", pvpUnidad: 14.00, color: "#3d2b1f" },
          { nombre: "Gris Nat", ref: "95898303", pvpUnidad: 14.00, color: "#7c7c7c" },
          { nombre: "Miel Nat", ref: "95898299", pvpUnidad: 14.00, color: "#a0522d" },
          { nombre: "Arena Nat", ref: "95898307", pvpUnidad: 14.00, color: "#d2b48c" }
        ]
      },
      himya: {
        nombre: "HIMYA (240x14.5)",
        descripcion: "CO-EXTRUIDO - FOREST",
        precioM2: 60,
        largo: 2.42,
        ancho: 0.145,
        tipoClip: "tekna",
        variantes: [
          { nombre: "Teca Nat", ref: "95898315", pvpUnidad: 21.00, color: "#1a1a1a" },
          { nombre: "Mad Nat", ref: "95898304", pvpUnidad: 21.00, color: "#5d4037" },
          { nombre: "Gris Nat", ref: "95898312", pvpUnidad: 21.00, color: "#7c7c7c" },
          { nombre: "Mad Osc", ref: "95898314", pvpUnidad: 21.00, color: "#2b1b17" }
        ]
      }
    }
  },
  baldosas: {
    id: "baldosas",
    titulo: "Baldosas Click",
    gamas: {
      renala: {
        nombre: "RENALA 30x30",
        descripcion: "EXTRUIDO - Click B/Plast",
        precioM2: 55,
        largo: 0.3,
        ancho: 0.3,
        tipoClip: "none",
        variantes: [
          { nombre: "Antr", ref: "82661070", pvpUnidad: 4.99, color: "#333333" },
          { nombre: "Gris", ref: "95898306", pvpUnidad: 4.99, color: "#7c7c7c" },
          { nombre: "Choco", ref: "82661069", pvpUnidad: 4.99, color: "#3d2b1f" },
          { nombre: "Miel", ref: "95898308", pvpUnidad: 4.99, color: "#a0522d" }
        ]
      },
      set4: {
        nombre: "SET 4 (50x50)",
        descripcion: "CO-EXTRUIDO - Kit 1m²",
        precioM2: 70,
        largo: 1.0,
        ancho: 1.0,
        tipoClip: "none",
        variantes: [
          { nombre: "Teca Nat", ref: "95898313", pvpUnidad: 69.90, color: "#1a1a1a" },
          { nombre: "Gris Nat", ref: "95898298", pvpUnidad: 69.90, color: "#7c7c7c" },
          { nombre: "Mad Nat", ref: "95898300", pvpUnidad: 69.90, color: "#5d4037" }
        ]
      }
    }
  }
};

const ACCESORIOS = {
  travesaños: {
    composite: { nombre: "Travesaño Composite", ref: "95898311", precioMl: 4.25, factor: 3.8, largo: 2.22 },
    aluminio: { nombre: "Travesaño Aluminio", ref: "95898310", precioMl: 8.95, factor: 3.8, largo: 2.22 },
    madera: { nombre: "Travesaño Madera", ref: "92306665", precioMl: 3.45, factor: 3.8, largo: 2.22 }
  },
  clips: {
    natix: { nombre: "Clip Natix", ref: "95898287", precioUd: 0.28, factor: 20 },
    tekna: { nombre: "Clip Tekna", ref: "95898288", precioUd: 0.38, factor: 22 }
  },
  perfiles: { nombre: "Perfil Remate L", ref: "81923395", precioUd: 12.50, largo: 2.2 }
};

const App = () => {
  const [tipo, setTipo] = useState('lamas');
  const [gamaKey, setGamaKey] = useState('dolma');
  const [varianteIdx, setVarianteIdx] = useState(0);
  const [travesañoKey, setTravesañoKey] = useState('composite');
  const [m2, setM2] = useState(15);
  const [perimetro, setPerimetro] = useState(12);

  useEffect(() => {
    const keys = Object.keys(PRODUCTOS[tipo].gamas);
    if (!keys.includes(gamaKey)) {
      setGamaKey(keys[0]);
      setVarianteIdx(0);
    }
  }, [tipo]);

  const gama = useMemo(() => PRODUCTOS[tipo].gamas[gamaKey] || Object.values(PRODUCTOS[tipo].gamas)[0], [tipo, gamaKey]);
  const variante = useMemo(() => gama.variantes[varianteIdx] || gama.variantes[0], [gama, varianteIdx]);
  const travesaño = ACCESORIOS.travesaños[travesañoKey];
  const clipInfo = gama.tipoClip !== "none" ? ACCESORIOS.clips[gama.tipoClip] : null;

  const calculos = useMemo(() => {
    const areaConMargen = m2 * 1.1;
    const areaUnidad = gama.largo * gama.ancho;
    const numUdsSuelo = Math.ceil(areaConMargen / areaUnidad);
    const costeSuelo = numUdsSuelo * (variante?.pvpUnidad || 0);

    let costeEstructura = 0;
    let mlRastreles = 0;
    let numClips = 0;
    let numRastreles = 0;

    if (tipo === 'lamas') {
      mlRastreles = Math.ceil(m2 * travesaño.factor);
      numRastreles = Math.ceil(mlRastreles / travesaño.largo);
      numClips = Math.ceil(m2 * (clipInfo?.factor || 20));
      costeEstructura = (mlRastreles * travesaño.precioMl) + (numClips * (clipInfo?.precioUd || 0));
    }

    const numPerfiles = Math.ceil(perimetro / ACCESORIOS.perfiles.largo);
    const costeRemates = numPerfiles * ACCESORIOS.perfiles.precioUd;

    return {
      numUdsSuelo,
      m2Reales: numUdsSuelo * areaUnidad,
      costeSuelo,
      mlRastreles,
      numRastreles,
      numClips,
      costeEstructura,
      numPerfiles,
      costeRemates,
      total: costeSuelo + costeEstructura + costeRemates
    };
  }, [tipo, gama, variante, travesaño, clipInfo, m2, perimetro]);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-amber-600/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      </div>

      {/* Modern Navigation */}
      <nav className="sticky top-0 z-50 px-6 py-4 flex justify-center items-center print:hidden">
        <div className="max-w-7xl w-full flex items-center justify-between glass-panel px-8 py-3 rounded-4xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              <Zap className="text-white fill-current" size={20} />
            </div>
            <div>
              <h1 className="font-black text-lg tracking-tight leading-none">NATERIAL</h1>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Configurator 2026</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-white text-slate-950 px-5 py-2.5 rounded-2xl text-xs font-bold hover:bg-slate-200 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-white/5"
            >
              <Download size={14} /> Exportar Presupuesto
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* CONFIGURATION SIDEBAR */}
        <div className="lg:col-span-4 space-y-10 print:hidden">

          {/* Main Category Switcher */}
          <div className="glass-panel p-1.5 rounded-3xl flex gap-1">
            {Object.keys(PRODUCTOS).map(k => (
              <button
                key={k}
                onClick={() => setTipo(k)}
                className={cn(
                  "flex-1 py-3 px-6 rounded-2xl text-xs font-black transition-all duration-300",
                  tipo === k
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                )}
              >
                {PRODUCTOS[k].titulo.split(' ')[0].toUpperCase()}
              </button>
            ))}
          </div>

          {/* Input Metrics */}
          <section className="space-y-6">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-3 px-2">
              <Ruler size={12} className="text-amber-500" />
              Dimensionado
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-6 rounded-[2rem] group">
                <span className="block text-[9px] font-bold text-slate-500 uppercase mb-3 px-1 group-focus-within:text-amber-500 transition-colors">Superficie</span>
                <div className="flex items-baseline gap-2">
                  <input
                    type="number"
                    value={m2}
                    onChange={e => setM2(parseFloat(e.target.value) || 0)}
                    className="w-full bg-transparent text-4xl font-black outline-none text-white tracking-tighter"
                  />
                  <span className="text-slate-600 font-bold text-sm">m²</span>
                </div>
              </div>
              <div className="glass-card p-6 rounded-[2rem] group">
                <span className="block text-[9px] font-bold text-slate-500 uppercase mb-3 px-1 group-focus-within:text-amber-500 transition-colors">Perímetro</span>
                <div className="flex items-baseline gap-2">
                  <input
                    type="number"
                    value={perimetro}
                    onChange={e => setPerimetro(parseFloat(e.target.value) || 0)}
                    className="w-full bg-transparent text-4xl font-black outline-none text-white tracking-tighter"
                  />
                  <span className="text-slate-600 font-bold text-sm">ml</span>
                </div>
              </div>
            </div>
          </section>

          {/* Collections */}
          <section className="space-y-6">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-3 px-2">
              <Layers size={12} className="text-amber-500" />
              Colecciones
            </h3>
            <div className="space-y-3">
              {Object.entries(PRODUCTOS[tipo].gamas).map(([key, info]) => (
                <div
                  key={key}
                  onClick={() => setGamaKey(key)}
                  className={cn(
                    "glass-card p-6 rounded-3xl cursor-pointer group relative overflow-hidden",
                    gamaKey === key ? 'border-amber-500/50 bg-amber-500/[0.03]' : ''
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className={cn("font-black text-lg tracking-tight transition-colors", gamaKey === key ? 'text-amber-500' : 'text-slate-200')}>
                        {info.nombre}
                      </h4>
                      <p className="text-[9px] font-bold text-slate-500 uppercase mt-1 tracking-wider">{info.descripcion}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-white">{info.precioM2}€/m²</p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {gamaKey === key && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="flex gap-2 mt-6">
                          {info.variantes.map((v, i) => (
                            <button
                              key={i}
                              onClick={(e) => { e.stopPropagation(); setVarianteIdx(i); }}
                              className={cn(
                                "w-10 h-10 rounded-xl border-2 transition-all p-0.5 relative",
                                varianteIdx === i ? 'border-amber-500 scale-110 shadow-lg shadow-amber-500/20' : 'border-white/5 opacity-40 hover:opacity-100'
                              )}
                            >
                              <div className="w-full h-full rounded-lg" style={{ backgroundColor: v.color }} />
                              {varianteIdx === i && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full" />}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>

          {/* Structure Selector */}
          {tipo === 'lamas' && (
            <section className="space-y-6">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-3 px-2">
                <Construction size={12} className="text-amber-500" />
                Estructura
              </h3>
              <div className="flex gap-2">
                {Object.entries(ACCESORIOS.travesaños).map(([key, info]) => (
                  <button
                    key={key}
                    onClick={() => setTravesañoKey(key)}
                    className={cn(
                      "flex-1 p-4 rounded-3xl glass-card transition-all text-left group",
                      travesañoKey === key ? 'border-white/20 bg-white/5' : 'opacity-50'
                    )}
                  >
                    <div className={cn("w-6 h-6 rounded-lg mb-4 flex items-center justify-center transition-colors", travesañoKey === key ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-500')}>
                      <CheckCircle2 size={12} />
                    </div>
                    <p className="text-[10px] font-black text-white uppercase tracking-tighter leading-none">{info.nombre.split(' ')[1]}</p>
                    <p className="text-[9px] font-bold text-slate-500 mt-1 uppercase leading-none">{info.precioMl}€/ml</p>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* RESULTS CONTENT */}
        <div className="lg:col-span-8 space-y-10">

          {/* Hero Result */}
          <div className="relative group perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-700 rounded-5xl blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity" />
            <div className="glass-panel rounded-5xl p-12 relative overflow-hidden flex flex-col xl:flex-row gap-12 border-white/10">
              <div className="flex-1 space-y-12">
                <div className="space-y-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">
                    <Sparkles size={12} className="animate-pulse" />
                    Valor de Cotización
                  </span>
                  <div className="flex items-baseline gap-4">
                    <h2 className="text-gradient text-8xl xl:text-9xl font-black tracking-tighter leading-none">
                      {calculos.total.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                    </h2>
                    <span className="text-4xl font-black text-amber-500 leading-none">€</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 pt-8 border-t border-white/5">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Unidades de Suelo</p>
                    <p className="text-2xl font-black text-white tracking-tighter">{calculos.numUdsSuelo} <span className="text-xs text-slate-600">uds</span></p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Superficie Instalada</p>
                    <p className="text-2xl font-black text-white tracking-tighter">{calculos.m2Reales.toFixed(2)} <span className="text-xs text-slate-600">m²</span></p>
                  </div>
                  <div className="space-y-1 hidden lg:block">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Disponibilidad</p>
                    <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase">
                      <ShieldCheck size={14} /> Inmediata
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full xl:w-72">
                <div className="bg-white/5 rounded-4xl p-8 border border-white/10 h-full flex flex-col justify-between">
                  <div className="space-y-6">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Configuración</p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl shadow-2xl border-2 border-white/10" style={{ backgroundColor: variante.color }} />
                        <div>
                          <p className="font-black text-white tracking-tight">{variante.nombre}</p>
                          <p className="text-[9px] font-mono text-amber-500/80 font-bold uppercase">{variante.ref}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-8 mt-8 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 capitalize">Naterial Forest 2026</span>
                    <Download size={16} className="text-slate-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Materials List */}
          <section className="space-y-8">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] px-2 flex items-center gap-4">
              Materiales Específicos
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            </h3>

            <div className="grid grid-cols-1 gap-6">
              {/* Product Card */}
              <div className="glass-panel rounded-4xl p-10 group hover:bg-white/[0.04] transition-colors">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div className="flex gap-8 items-center">
                    <div className="w-16 h-16 rounded-[2rem] bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20 group-hover:scale-110 transition-transform duration-500">
                      <Box size={28} />
                    </div>
                    <div>
                      <h4 className="font-black text-xl text-white tracking-tight leading-none mb-3">
                        {tipo === 'lamas' ? 'Duela Naterial Professional' : 'Lómina Modular Click'}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-bold text-slate-500">{gama.nombre}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-700" />
                        <span className="text-[10px] font-mono font-bold text-amber-500/60 uppercase">PK {variante.ref}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-black text-white tracking-tighter leading-none">{calculos.numUdsSuelo}</p>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-2">Unidades</p>
                    <p className="text-amber-500 font-bold text-lg mt-4">{calculos.costeSuelo.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€</p>
                  </div>
                </div>
              </div>

              {/* Structure Card */}
              {tipo === 'lamas' && (
                <div className="glass-panel rounded-4xl p-10 group hover:bg-white/[0.04] transition-colors">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    <div className="flex gap-8 items-start">
                      <div className="w-16 h-16 rounded-[2rem] bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                        <Construction size={28} />
                      </div>
                      <div className="space-y-10">
                        <div>
                          <h4 className="font-black text-xl text-white tracking-tight leading-none mb-3">{travesaño.nombre}</h4>
                          <p className="text-sm text-slate-500 font-medium opacity-80 max-w-sm">Sistema de rastrelado industrial. Requiere {calculos.numRastreles} piezas de {travesaño.largo}m.</p>
                        </div>
                        <div className="flex gap-10">
                          <div>
                            <p className="text-[9px] font-black text-slate-600 uppercase mb-2">Fijación</p>
                            <p className="text-sm font-bold text-slate-300">{clipInfo?.nombre} <span className="text-[10px] text-slate-600 px-2">REF {clipInfo?.ref}</span></p>
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-slate-600 uppercase mb-2">Cantidad</p>
                            <p className="text-sm font-bold text-slate-300">{calculos.numClips} uds</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-black text-white tracking-tighter leading-none">{calculos.numRastreles}</p>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-2">Piezas Travesaño</p>
                      <p className="text-amber-500 font-bold text-lg mt-4">{calculos.costeEstructura.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Finish Card */}
              <div className="glass-panel rounded-4xl p-10 group hover:bg-white/[0.04] transition-colors">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div className="flex gap-8 items-center">
                    <div className="w-16 h-16 rounded-[2rem] bg-slate-500/10 flex items-center justify-center text-slate-400 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                      <Palette size={28} />
                    </div>
                    <div>
                      <h4 className="font-black text-xl text-white tracking-tight leading-none mb-3">{ACCESORIOS.perfiles.nombre}</h4>
                      <p className="text-sm text-slate-500 font-medium opacity-80">Remate perimetral de grado estético. Longitud estándar 2.2m.</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-black text-white tracking-tighter leading-none">{calculos.numPerfiles}</p>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-2">Unidades Perfil</p>
                    <p className="text-amber-500 font-bold text-lg mt-4">{calculos.costeRemates.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* High-End Info Note */}
          <div className="bg-gradient-to-tr from-amber-500/5 to-transparent border border-white/5 rounded-[3rem] p-10 relative overflow-hidden group">
            <div className="flex items-start gap-8 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20 shrink-0 shadow-lg shadow-amber-500/5">
                <Info size={24} />
              </div>
              <div className="space-y-4">
                <h5 className="font-black text-[11px] text-white uppercase tracking-[0.3em]">Compliance & Estándares 2026</h5>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  Esta configuración se ha generado siguiendo los <span className="text-slate-300">protocolos técnicos de Naterial Professional</span>.
                  Los coeficientes de desperdicio y resistencia estructural están optimizados para entornos residenciales de alta demanda.
                  Precios finales expresados con impuestos indirectos incluidos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-20 mt-10 print:hidden">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-12" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 hover:opacity-100 transition-opacity">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em]">Forecasting System • Naterial Forest Pro • v4.2</p>
          <div className="flex items-center gap-6">
            <ArrowRight className="text-amber-500" size={16} />
            <span className="text-[10px] font-black text-slate-200 tracking-widest">ECO-COMPLIANCE CERTIFIED</span>
          </div>
        </div>
      </footer>

      {/* Extreme Print Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media print {
          @page { size: auto; margin: 1cm; }
          body { background: white !important; color: black !important; }
          .glass-panel, .glass-card { background: white !important; border: 1px solid #e2e8f0 !important; color: black !important; box-shadow: none !important; }
          .text-gradient { background: none !important; color: black !important; -webkit-text-fill-color: black !important; }
          .text-amber-500, .text-blue-500, .text-white { color: black !important; }
          .bg-amber-500, .bg-slate-900 { background: #f8fafc !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .rounded-5xl, .rounded-4xl, .rounded-3xl { border-radius: 1rem !important; }
        }
      `}} />
    </div>
  );
};

export default App;
