import React, { useState, useMemo, useEffect } from 'react';
import {
  Calculator,
  Ruler,
  Layers,
  Package,
  Info,
  Printer,
  Construction,
  CheckCircle2,
  Box,
  Palette,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Download,
  ShieldCheck,
  Zap,
  Sun,
  Moon,
  FileText
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
  const [isDark, setIsDark] = useState(false);
  const [tipo, setTipo] = useState('lamas');
  const [gamaKey, setGamaKey] = useState('dolma');
  const [varianteIdx, setVarianteIdx] = useState(0);
  const [travesañoKey, setTravesañoKey] = useState('composite');
  const [m2, setM2] = useState(15);
  const [perimetro, setPerimetro] = useState(12);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

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
    <div className="min-h-screen transition-colors duration-300">
      {/* Institutional Navigation */}
      <nav className="sticky top-0 z-50 px-6 py-4 flex justify-center items-center print:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <div className="max-w-7xl w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-leroy-green rounded-lg flex items-center justify-center shadow-md">
              <FileText className="text-white" size={20} />
            </div>
            <div className="text-left">
              <h1 className="font-bold text-xl tracking-tight text-slate-900 dark:text-white leading-tight">NATERIAL</h1>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Calculador de Presupuesto 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-leroy-green text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-leroy-dark transition-all shadow-sm active:translate-y-px"
            >
              <Download size={16} /> Descargar Informe
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* CONFIGURATION SIDEBAR */}
        <div className="lg:col-span-4 space-y-8 print:hidden">

          {/* Type Switcher */}
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex">
            {Object.keys(PRODUCTOS).map(k => (
              <button
                key={k}
                onClick={() => setTipo(k)}
                className={cn(
                  "flex-1 py-2.5 px-4 rounded-lg text-xs font-bold transition-all",
                  tipo === k
                    ? 'bg-white dark:bg-slate-700 text-leroy-green shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                )}
              >
                {PRODUCTOS[k].titulo.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Input Metrics */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Ruler size={16} className="text-leroy-green" />
              Dimensiones del Proyecto
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Superficie Total (m²)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={m2}
                    onChange={e => setM2(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-lg text-xl font-bold text-slate-950 dark:text-white outline-none focus:border-leroy-green transition-colors"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">m²</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Perímetro Lineal (ml)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={perimetro}
                    onChange={e => setPerimetro(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-lg text-xl font-bold text-slate-950 dark:text-white outline-none focus:border-leroy-green transition-colors"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">ml</span>
                </div>
              </div>
            </div>
          </section>

          {/* Collections */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 px-1">
              <Layers size={16} className="text-leroy-green" />
              Gamas Disponibles
            </h3>
            <div className="space-y-3">
              {Object.entries(PRODUCTOS[tipo].gamas).map(([key, info]) => (
                <div
                  key={key}
                  onClick={() => setGamaKey(key)}
                  className={cn(
                    "bg-white dark:bg-slate-900 border p-5 rounded-2xl cursor-pointer transition-all",
                    gamaKey === key ? 'border-leroy-green ring-1 ring-leroy-green/20 shadow-md' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className={cn("font-bold text-base", gamaKey === key ? 'text-leroy-green' : 'text-slate-900 dark:text-white')}>
                        {info.nombre}
                      </h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{info.descripcion}</p>
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{info.precioM2}€ <span className="text-[10px] text-slate-400">/ m²</span></span>
                  </div>

                  <AnimatePresence>
                    {gamaKey === key && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                          {info.variantes.map((v, i) => (
                            <button
                              key={i}
                              onClick={(e) => { e.stopPropagation(); setVarianteIdx(i); }}
                              className={cn(
                                "w-9 h-9 rounded-md border-2 transition-all p-0.5 relative",
                                varianteIdx === i ? 'border-leroy-green shadow-sm' : 'border-slate-200 dark:border-slate-700 opacity-60 hover:opacity-100'
                              )}
                              title={v.nombre}
                            >
                              <div className="w-full h-full rounded-sm" style={{ backgroundColor: v.color }} />
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
            <section className="space-y-4">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 px-1">
                <Construction size={16} className="text-leroy-green" />
                Soporte Estructural
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(ACCESORIOS.travesaños).map(([key, info]) => (
                  <button
                    key={key}
                    onClick={() => setTravesañoKey(key)}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl border transition-all text-left",
                      travesañoKey === key ? 'border-leroy-green bg-white dark:bg-slate-900 shadow-sm' : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                    )}
                  >
                    <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", travesañoKey === key ? 'border-leroy-green' : 'border-slate-300 dark:border-slate-600')}>
                      {travesañoKey === key && <div className="w-2.5 h-2.5 bg-leroy-green rounded-full" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{info.nombre}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">{info.precioMl}€/ML • {info.ref}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* SUMMARY CONTENT */}
        <div className="lg:col-span-8 space-y-8 text-left">

          {/* Resumen de Inversión */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Resumen Estimado del Proyecto</h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">Basado en sus especificaciones técnicas actuales</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nº Ref: {variante.ref}</p>
                <p className="text-xs font-bold text-leroy-green mt-1">Gestión Leroy Merlin</p>
              </div>
            </div>

            <div className="p-10 flex flex-col xl:flex-row gap-12 items-center xl:items-start">
              <div className="flex-1 w-full space-y-10">
                <div className="flex items-baseline gap-4">
                  <span className="text-6xl font-black text-slate-950 dark:text-white tracking-tighter">
                    {calculos.total.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-3xl font-bold text-slate-400">€ <span className="text-xs uppercase tracking-widest ml-2">Total Estimado</span></span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Superficie</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">{m2} m²</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Uds. Material</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">{calculos.numUdsSuelo} uts</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Garantía</p>
                    <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-bold text-sm">
                      <ShieldCheck size={16} className="text-leroy-green" /> Profesional
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full xl:w-64 shrink-0 px-8 py-6 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-4 text-center tracking-widest">Variante Elegida</p>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-xl shadow-inner border border-white/20" style={{ backgroundColor: variante.color }} />
                  <div className="text-center">
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{variante.nombre}</p>
                    <p className="text-[10px] font-mono text-slate-500 font-bold mt-1">SKU {variante.ref}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desglose de Componentes */}
          <section className="space-y-6">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] px-1">
              Desglose Detallado de Componentes
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {/* Product Row */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex gap-6 items-center flex-1">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-200 dark:border-slate-700">
                    <Box size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white">Material Principal: {gama.nombre}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-slate-500 font-medium">{tipo === 'lamas' ? 'Lamas de compuesto mineral de alta resistencia.' : 'Baldosas modulares de fácil instalación.'}</p>
                      <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                      <p className="text-[10px] font-mono font-bold text-leroy-green uppercase">REF: {variante.ref}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-12 sm:gap-16">
                  <div className="text-center md:text-right">
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{calculos.numUdsSuelo}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Piezas</p>
                  </div>
                  <div className="text-right min-w-[100px]">
                    <p className="text-lg font-bold text-leroy-green">{calculos.costeSuelo.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€</p>
                  </div>
                </div>
              </div>

              {/* Structure Row */}
              {tipo === 'lamas' && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex gap-6 items-center flex-1">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-200 dark:border-slate-700">
                      <Construction size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-slate-900 dark:text-white">Sistema Estructural: {travesaño.nombre}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-slate-500 font-medium">Incluye {calculos.numClips} conectores {clipInfo?.nombre}.</p>
                        <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                        <p className="text-[10px] font-mono font-bold text-leroy-green uppercase">REF: {travesaño.ref}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-12 sm:gap-16">
                    <div className="text-center md:text-right">
                      <p className="text-lg font-bold text-slate-900 dark:text-white">{calculos.numRastreles}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Perfiles</p>
                    </div>
                    <div className="text-right min-w-[100px]">
                      <p className="text-lg font-bold text-leroy-green">{calculos.costeEstructura.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Finishing Row */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex gap-6 items-center flex-1">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-200 dark:border-slate-700">
                    <Palette size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white">Terminación: {ACCESORIOS.perfiles.nombre}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-slate-500 font-medium">Perfil en L para remate perimetral estético de 2.2m.</p>
                      <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                      <p className="text-[10px] font-mono font-bold text-leroy-green uppercase">REF: {ACCESORIOS.perfiles.ref}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-12 sm:gap-16">
                  <div className="text-center md:text-right">
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{calculos.numPerfiles}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Perfiles</p>
                  </div>
                  <div className="text-right min-w-[100px]">
                    <p className="text-lg font-bold text-leroy-green">{calculos.costeRemates.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Institutional Note */}
          <div className="bg-slate-100 dark:bg-slate-800 border-l-4 border-leroy-green p-8 rounded-r-2xl">
            <div className="flex gap-6">
              <Info className="text-leroy-green shrink-0 mt-1" size={24} />
              <div className="space-y-3">
                <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Información Técnica de Validez</span>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                  Los cálculos presentados contemplan un coeficiente de desperdicio del 10% según estándar de obra.
                  Esta estimación es de carácter informativo y no constituye un contrato vinculante.
                  Se recomienda la supervisión de un técnico instalador de <span className="text-slate-900 dark:text-white">Leroy Merlin Professional</span> antes de proceder a la compra de materiales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-200 dark:border-slate-800 print:hidden">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            NATERIAL FOREST PRO SYSTEM • VERSION 2026.01
          </p>
          <div className="flex items-center gap-8 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <span>© 2026 Leroy Merlin</span>
            <span>Certificación Estructural v4.3</span>
          </div>
        </div>
      </footer>

      {/* Corporate Print Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media print {
          @page { size: auto; margin: 1cm; }
          body { background: white !important; color: black !important; font-size: 10pt; }
          nav, footer, .print\\:hidden { display: none !important; }
          main { display: block !important; padding: 0 !important; }
          .lg\\:col-span-8 { width: 100% !important; }
          .bg-white, .bg-slate-50, .bg-slate-100 { background: white !important; border-bottom: 1px solid #eee !important; }
          .border { border: 1px solid #eee !important; }
          .shadow-sm, .shadow-md { box-shadow: none !important; }
          .text-leroy-green { color: #669900 !important; font-weight: bold; }
          .text-slate-950, .text-slate-900 { color: black !important; }
          .text-slate-500, .text-slate-400 { color: #555 !important; }
          .font-mono { font-family: monospace !important; border: 1px solid #eee; padding: 1px 3px; border-radius: 2px; }
        }
      `}} />
    </div>
  );
};

export default App;
