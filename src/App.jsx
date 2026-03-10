import React from 'react';
import { useState, useMemo } from 'react';
// ===================== DATA =====================
const G = [
  'Narrativa',
  'Poesía',
  'LIJ',
  'Ensayo',
  'Traducción',
  'Género Negro',
  'Ciencia Ficción',
  'Arte',
  'Historia',
  'Filosofía',
];
const mk = (id, country, name, company, g1, g2) => ({
  id,
  country,
  name,
  company,
  genres: [g1, g2].filter(Boolean),
  initials: name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join(''),
});

const PUBS = [
  mk('cl1', 'chile', 'Valentina Morales', 'LOM Ediciones', G[0], G[4]),
  mk('cl2', 'chile', 'Camila Soto', 'Hueders', G[1], G[0]),
  mk('cl3', 'chile', 'Andrea Fuentes', 'Cuarto Propio', G[0], G[3]),
  mk('cl4', 'chile', 'Javiera Rojas', 'Pehuén', G[2], G[0]),
  mk('cl5', 'chile', 'Francisca Castro', 'Pólvora Editorial', G[0], G[9]),
  mk('cl6', 'chile', 'Paula Vega', 'Alquimia', G[1], G[3]),
  mk('cl7', 'chile', 'Natalia Muñoz', 'La Pollera', G[0], G[6]),
  mk('cl8', 'chile', 'Daniela Reyes', 'Das Kapital', G[3], G[9]),
  mk('cl9', 'chile', 'Carolina Herrera', 'Overol', G[2], G[0]),
  mk('cl10', 'chile', 'Constanza Silva', 'Amanuta', G[2], G[7]),
  mk('cl11', 'chile', 'Isabel Díaz', 'Catalonia', G[0], G[8]),
  mk('cl12', 'chile', 'Fernanda López', 'El Kultrún', G[1], G[0]),
  mk('cl13', 'chile', 'Marcela Contreras', 'Ediciones UDP', G[3], G[4]),
  mk('cl14', 'chile', 'Verónica Pérez', 'Editorial Universitaria', G[0], G[8]),
  mk('cl15', 'chile', 'Patricia Ramírez', 'Planeta Chile', G[0], G[5]),
  mk('cl16', 'chile', 'Alejandra González', 'Alfaguara Chile', G[0], G[2]),
  mk('cl17', 'chile', 'Beatriz Flores', 'Kindberg', G[4], G[0]),
  mk('cl18', 'chile', 'Claudia Torres', 'Tacitas', G[1], G[3]),
  mk('cl19', 'chile', 'Elena Vargas', 'Fugitivas', G[0], G[1]),
  mk('cl20', 'chile', 'Gabriela Mendoza', 'Ceibo Ediciones', G[0], G[4]),
  mk('cl21', 'chile', 'Cecilia Ruiz', 'Editorial Forja', G[0], G[5]),
  mk('cl22', 'chile', 'Lorena Jiménez', 'Mago Ediciones', G[2], G[7]),
  mk('cl23', 'chile', 'Mónica Espinoza', 'El Árbol Editorial', G[0], G[3]),
  mk('cl24', 'chile', 'Roxana Álvarez', 'Ediciones Sur', G[1], G[9]),
  mk('cl25', 'chile', 'Sandra Castillo', 'Inubicalistas', G[6], G[0]),
  mk('cl26', 'chile', 'Teresa Guerrero', 'Ediciones Origo', G[0], G[8]),
  mk('cl27', 'chile', 'Viviana Medina', 'Punto de Fuga', G[3], G[9]),
  mk('cl28', 'chile', 'Ximena Ríos', 'Zig-Zag', G[0], G[2]),
  mk(
    'cl29',
    'chile',
    'Yasna Aguilera',
    'Aún Creemos en los Sueños',
    G[0],
    G[1]
  ),
  mk('cl30', 'chile', 'Adriana Salinas', 'Sangría Editora', G[1], G[0]),
  mk('cl31', 'chile', 'Bárbara Campos', 'Tajamar Editores', G[8], G[3]),
  mk(
    'cl32',
    'chile',
    'Diana Molina',
    'Los Libros de la Mujer Luna',
    G[0],
    G[1]
  ),
  mk('cl33', 'chile', 'Esther Pinto', 'Ediciones Tácitas', G[1], G[4]),
  mk('cl34', 'chile', 'Gloria Serrano', 'Frasis Editores', G[3], G[9]),
  mk('cl35', 'chile', 'Hortensia Vidal', 'Don Bosco Ediciones', G[2], G[0]),
  mk('cl36', 'chile', 'Inés Gutiérrez', 'Del Nuevo Extremo', G[5], G[0]),
  mk('cl37', 'chile', 'Juana Romero', 'Ediciones Altazor', G[1], G[7]),
  mk('es1', 'spain', 'María García', 'Anagrama', G[0], G[3]),
  mk('es2', 'spain', 'Ana Martínez', 'Tusquets Editores', G[0], G[4]),
  mk('es3', 'spain', 'Laura Sánchez', 'Siruela', G[6], G[0]),
  mk('es4', 'spain', 'Pilar López', 'Impedimenta', G[0], G[4]),
  mk('es5', 'spain', 'Carmen Fernández', 'Pre-Textos', G[1], G[3]),
  mk('es6', 'spain', 'Lucía Jiménez', 'Nórdica Libros', G[0], G[7]),
  mk('es7', 'spain', 'Rosa Romero', 'Galaxia Gutenberg', G[4], G[3]),
  mk('es8', 'spain', 'Mercedes Álvarez', 'Páginas de Espuma', G[0], G[1]),
  mk('es9', 'spain', 'Elena Herrero', 'Alianza Editorial', G[3], G[9]),
  mk('es10', 'spain', 'Cristina Domínguez', 'Acantilado', G[0], G[3]),
  mk('co1', 'colombia', 'Marcela Ríos', 'Babel Libros', G[2], G[0]),
  mk('co2', 'colombia', 'Diana Castro', 'Laguna Libros', G[0], G[1]),
  mk(
    'co3',
    'colombia',
    'Alejandra Gómez',
    'Taller de Edición Rocca',
    G[3],
    G[0]
  ),
  mk('co4', 'colombia', 'Paula Mendoza', 'Tragaluz Editores', G[0], G[4]),
  mk('co5', 'colombia', 'Catalina Vargas', 'Sílaba Editores', G[0], G[2]),
  mk('co6', 'colombia', 'Natalia Ospina', 'Ícono Editorial', G[7], G[0]),
  mk('co7', 'colombia', 'Juliana Restrepo', 'Rey Naranjo', G[2], G[7]),
  mk('co8', 'colombia', 'Margarita Pardo', 'Planeta Colombia', G[0], G[5]),
  mk('co9', 'colombia', 'Sofía Zapata', 'Panamericana Editorial', G[2], G[0]),
  mk('co10', 'colombia', 'Liliana Cárdenas', 'Común Presencia', G[1], G[0]),
  mk('it1', 'italy', 'Sofia Russo', 'Einaudi', G[0], G[3]),
  mk('it2', 'italy', 'Giulia Ferrari', 'Mondadori', G[0], G[5]),
  mk('it3', 'italy', 'Francesca Esposito', 'Adelphi', G[0], G[9]),
  mk('it4', 'italy', 'Elena Romano', 'Feltrinelli', G[0], G[3]),
  mk('it5', 'italy', 'Chiara Bianchi', 'E/O Edizioni', G[0], G[4]),
  mk('it6', 'italy', 'Alessia Moretti', 'Sellerio', G[5], G[0]),
  mk('it7', 'italy', 'Valentina Conti', 'Neri Pozza', G[0], G[4]),
  mk('it8', 'italy', 'Martina Ricci', 'Minimum Fax', G[0], G[6]),
  mk('it9', 'italy', 'Sara Fontana', 'Sur Edizioni', G[0], G[4]),
  mk('it10', 'italy', 'Laura Barbieri', 'Iperborea', G[0], G[4]),
  mk('it11', 'italy', 'Roberta Gallo', 'Marcos y Marcos', G[0], G[4]),
  mk('it12', 'italy', 'Serena Lombardi', "L'Orma Editore", G[0], G[4]),
  mk('it13', 'italy', 'Monica De Luca', 'Fandango Libri', G[0], G[7]),
  mk('it14', 'italy', 'Cristina Santoro', 'Bompiani', G[0], G[3]),
  mk('it15', 'italy', 'Paola Vitale', 'Garzanti', G[0], G[2]),
  mk('it16', 'italy', 'Federica Ferri', 'Piemme', G[0], G[2]),
  mk('it17', 'italy', 'Elisa Marchetti', 'Nottetempo', G[1], G[0]),
  mk('it18', 'italy', 'Stefania Costa', 'Bollati Boringhieri', G[9], G[3]),
  mk('it19', 'italy', 'Rossella Giordano', 'Guanda', G[0], G[1]),
  mk('it20', 'italy', 'Emanuela Bruno', 'Oblomov Edizioni', G[0], G[6]),
];

// ===================== CONFIG =====================
const CET_OFFSET = 1;
const COUNTRY = {
  chile: {
    label: 'Chile',
    flag: '🇨🇱',
    offset: -3,
    color: '#FC8181',
    bg: 'rgba(252,129,129,0.12)',
    border: 'rgba(252,129,129,0.3)',
  },
  spain: {
    label: 'España',
    flag: '🇪🇸',
    offset: 1,
    color: '#F6AD55',
    bg: 'rgba(246,173,85,0.12)',
    border: 'rgba(246,173,85,0.3)',
  },
  colombia: {
    label: 'Colombia',
    flag: '🇨🇴',
    offset: -5,
    color: '#68D391',
    bg: 'rgba(104,211,145,0.12)',
    border: 'rgba(104,211,145,0.3)',
  },
  italy: {
    label: 'Italia',
    flag: '🇮🇹',
    offset: 1,
    color: '#76E4F7',
    bg: 'rgba(118,228,247,0.12)',
    border: 'rgba(118,228,247,0.3)',
  },
};

const WIN = {
  'chile-italy': [14, 18],
  'chile-spain': [14, 18],
  'chile-colombia': [18, 22],
  'colombia-italy': [15, 19],
  'colombia-spain': [15, 19],
  'italy-spain': [9, 17],
};
const getWin = (c1, c2) => WIN[[c1, c2].sort().join('-')] || [10, 18];

const cetToLocal = (cetH, cetM, country) => {
  const mins = cetH * 60 + cetM + (COUNTRY[country].offset - CET_OFFSET) * 60;
  const adj = ((mins % 1440) + 1440) % 1440;
  return `${String(Math.floor(adj / 60)).padStart(2, '0')}:${String(
    adj % 60
  ).padStart(2, '0')}`;
};

const DAYS = [
  { iso: '2026-03-18', label: 'Miércoles 18 Mar 2026' },
  { iso: '2026-03-19', label: 'Jueves 19 Mar 2026' },
  { iso: '2026-03-20', label: 'Viernes 20 Mar 2026' },
];

const genMeet = () => {
  const r = (n) =>
    [...Array(n)]
      .map(() => 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)])
      .join('');
  return `https://meet.google.com/${r(3)}-${r(4)}-${r(3)}`;
};

// ===================== DEMO REQUESTS =====================
let _rid = 0;
const mkReq = (fromId, toId, status, msg = '') => ({
  id: `r${++_rid}`,
  fromId,
  toId,
  status,
  msg,
  createdAt: new Date(Date.now() - Math.random() * 86400000 * 3).toISOString(),
});

const DEMO_REQS = [
  mkReq(
    'cl1',
    'it1',
    'accepted',
    'Me interesa mucho vuestro catálogo de narrativa italiana.'
  ),
  mkReq(
    'cl2',
    'it3',
    'accepted',
    'Quisiera explorar posibilidades de coedición.'
  ),
  mkReq(
    'cl5',
    'es2',
    'accepted',
    'Hablemos sobre proyectos de coedición en poesía.'
  ),
  mkReq(
    'cl8',
    'it7',
    'accepted',
    'Tengo autoras perfectas para el mercado italiano.'
  ),
  mkReq(
    'cl11',
    'es1',
    'accepted',
    'Gran admiración por el catálogo de Anagrama.'
  ),
  mkReq(
    'cl15',
    'it4',
    'accepted',
    'Hay autoras chilenas perfectas para Feltrinelli.'
  ),
  mkReq('cl20', 'co3', 'accepted', 'Felicitaciones por el trabajo de Rocca.'),
  mkReq(
    'cl25',
    'co7',
    'accepted',
    'Me interesa la narrativa gráfica de Rey Naranjo.'
  ),
  mkReq(
    'co2',
    'cl4',
    'accepted',
    'Narrativa latinoamericana: ¡hay tanto por compartir!'
  ),
  mkReq('co5', 'cl19', 'accepted', 'Coincidimos en muchos títulos de interés.'),
  mkReq(
    'cl3',
    'it2',
    'pending',
    'Estoy muy interesada en posibles traducciones.'
  ),
  mkReq('cl7', 'es5', 'pending', 'Pre-Textos publica poesía maravillosa.'),
  mkReq('co1', 'cl28', 'pending', 'Nos interesa mucho la LIJ chilena.'),
  mkReq(
    'cl29',
    'it17',
    'pending',
    'Nottetempo tiene un catálogo de poesía excepcional.'
  ),
];

// ===================== SCHEDULE GENERATOR =====================
function generateSchedule(requests, pubs) {
  const byId = Object.fromEntries(pubs.map((p) => [p.id, p]));
  const accepted = requests.filter((r) => r.status === 'accepted');
  const groups = {};
  accepted.forEach((r) => {
    const p1 = byId[r.fromId],
      p2 = byId[r.toId];
    if (!p1 || !p2) return;
    const key = [p1.country, p2.country].sort().join('-');
    if (!groups[key]) groups[key] = [];
    groups[key].push({ r, p1, p2 });
  });
  const meetings = [];
  Object.entries(groups).forEach(([key, pairs]) => {
    const cs = key.split('-');
    const [sh, eh] = getWin(cs[0], cs[1]);
    const slotsPerDay = (eh - sh) * 4;
    pairs.forEach((pair, i) => {
      const dayIdx = Math.floor(i / slotsPerDay) % DAYS.length;
      const si = i % slotsPerDay;
      const cetH = sh + Math.floor(si / 4);
      const cetM = (si % 4) * 15;
      const countries = [...new Set([pair.p1.country, pair.p2.country])];
      meetings.push({
        id: `m${meetings.length}`,
        day: DAYS[dayIdx],
        cetH,
        cetM,
        p1: pair.p1,
        p2: pair.p2,
        meetLink: genMeet(),
        countries,
        pairKey: key,
      });
    });
  });
  return meetings.sort((a, b) => {
    if (a.day.iso !== b.day.iso) return a.day.iso.localeCompare(b.day.iso);
    return a.cetH * 60 + a.cetM - (b.cetH * 60 + b.cetM);
  });
}

// ===================== STYLES =====================
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;background:#09090C}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#2a2a3a;border-radius:2px}
.app{min-height:100vh;background:#09090C;color:#DDD8C8;font-family:'DM Sans',sans-serif;font-size:14px;line-height:1.6}
.login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;
  background:radial-gradient(ellipse at 30% 40%, rgba(118,228,247,0.04) 0%, transparent 60%),
             radial-gradient(ellipse at 75% 70%, rgba(252,129,129,0.04) 0%, transparent 55%), #09090C}
.login-box{width:100%;max-width:480px}
.logo-line{font-family:'Cormorant Garamond',serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#666;margin-bottom:12px}
.login-title{font-family:'Cormorant Garamond',serif;font-size:42px;font-weight:300;line-height:1.1;margin-bottom:6px;color:#EAE4D9}
.login-sub{font-size:13px;color:#666;margin-bottom:40px;font-style:italic;font-family:'Cormorant Garamond',serif}
.login-label{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#888;margin-bottom:12px;display:block}
.country-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:32px}
.country-btn{padding:16px;border:1px solid #1E1E2A;background:#0F0F16;border-radius:8px;cursor:pointer;text-align:left;transition:all .2s;color:#DDD8C8}
.country-btn:hover,.country-btn.active{border-color:var(--cc);background:rgba(255,255,255,0.03)}
.country-btn .flag{font-size:24px;display:block;margin-bottom:6px}
.country-btn .cname{font-size:13px;font-weight:500;display:block}
.country-btn .ccount{font-size:11px;color:#666;margin-top:2px}
.pub-select{max-height:260px;overflow-y:auto;margin-bottom:24px;border:1px solid #1E1E2A;border-radius:8px;background:#0F0F16}
.pub-option{padding:12px 16px;cursor:pointer;transition:background .15s;border-bottom:1px solid #1A1A24;display:flex;align-items:center;gap:12px}
.pub-option:last-child{border-bottom:none}
.pub-option:hover{background:#151520}
.pub-option .av{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:500;flex-shrink:0}
.pub-option .pname{font-size:13px;font-weight:500;color:#DDD8C8}
.pub-option .pcomp{font-size:11px;color:#666}
.btn-primary{width:100%;padding:14px;background:linear-gradient(135deg,#1a3a4a,#0f2535);border:1px solid #76E4F7;border-radius:8px;color:#76E4F7;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:all .2s}
.btn-primary:hover{background:rgba(118,228,247,0.08)}
.btn-org{width:100%;padding:12px;background:transparent;border:1px solid #2A2A38;border-radius:8px;color:#888;font-family:'DM Sans',sans-serif;font-size:12px;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:all .2s;margin-top:10px}
.btn-org:hover{border-color:#76E4F7;color:#76E4F7}
.nav{position:sticky;top:0;z-index:100;background:rgba(9,9,12,0.92);backdrop-filter:blur(16px);border-bottom:1px solid #16161E;padding:0 24px;display:flex;align-items:center;height:60px;gap:0}
.nav-brand{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:300;letter-spacing:2px;color:#EAE4D9;margin-right:32px;white-space:nowrap}
.nav-brand span{color:#76E4F7}
.nav-links{display:flex;align-items:center;gap:2px;flex:1}
.nav-link{padding:6px 14px;border-radius:6px;font-size:13px;color:#888;cursor:pointer;transition:all .15s;position:relative;border:none;background:none;font-family:'DM Sans',sans-serif}
.nav-link:hover{color:#DDD8C8;background:#14141C}
.nav-link.active{color:#EAE4D9;background:#14141C}
.nav-badge{position:absolute;top:2px;right:6px;width:16px;height:16px;border-radius:50%;background:#FC8181;color:#09090C;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center}
.nav-user{display:flex;align-items:center;gap:10px;margin-left:auto}
.nav-avatar{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600}
.nav-name{font-size:13px;color:#AAA}
.nav-logout{padding:6px 12px;border:1px solid #1E1E2A;border-radius:6px;background:none;color:#666;font-size:12px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s}
.nav-logout:hover{border-color:#333;color:#999}
.page{padding:32px 24px;max-width:1200px;margin:0 auto}
.page-header{margin-bottom:32px}
.page-title{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:300;color:#EAE4D9;line-height:1.1}
.page-sub{font-size:13px;color:#666;margin-top:6px;font-style:italic;font-family:'Cormorant Garamond',serif}
.section-label{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#555;margin-bottom:16px;display:flex;align-items:center;gap:12px}
.section-label::after{content:'';flex:1;height:1px;background:#16161E}
.filters{display:flex;gap:8px;margin-bottom:24px;flex-wrap:wrap}
.filter-btn{padding:6px 16px;border-radius:20px;border:1px solid #1E1E2A;background:transparent;color:#888;font-size:12px;cursor:pointer;transition:all .15s;font-family:'DM Sans',sans-serif}
.filter-btn.active{border-color:var(--cc);color:var(--cc);background:var(--cb)}
.filter-btn:hover:not(.active){border-color:#2a2a38;color:#CCC}
.pub-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}
.pub-card{padding:20px;border:1px solid #16161E;border-radius:10px;background:#0F0F16;cursor:pointer;transition:all .2s;position:relative;overflow:hidden}
.pub-card::before{content:'';position:absolute;inset:0;border-radius:10px;border:1px solid transparent;transition:border-color .2s}
.pub-card:hover{background:#131320;transform:translateY(-1px)}
.pub-card:hover::before{border-color:var(--cc)}
.card-top{display:flex;align-items:flex-start;gap:12px;margin-bottom:14px}
.card-av{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:600;flex-shrink:0;font-family:'Cormorant Garamond',serif}
.card-info .cname{font-size:14px;font-weight:500;color:#EAE4D9;line-height:1.2}
.card-info .ccomp{font-size:11px;color:#666;margin-top:2px}
.country-tag{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:20px;font-size:10px;letter-spacing:0.5px;font-weight:500}
.genre-tags{display:flex;gap:5px;flex-wrap:wrap;margin-top:10px}
.genre-tag{padding:2px 8px;border-radius:4px;font-size:10px;background:#14141C;color:#666;border:1px solid #1E1E2A}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px)}
.modal{width:100%;max-width:440px;background:#0F0F16;border:1px solid #1E1E2A;border-radius:14px;padding:28px;position:relative;max-height:90vh;overflow-y:auto}
.modal-close{position:absolute;top:16px;right:16px;width:28px;height:28px;border-radius:50%;border:1px solid #1E1E2A;background:none;color:#888;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-family:'DM Sans',sans-serif}
.modal-close:hover{border-color:#444;color:#CCC}
.modal-av{width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:600;margin:0 auto 16px;font-family:'Cormorant Garamond',serif}
.modal-name{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:400;text-align:center;color:#EAE4D9;margin-bottom:4px}
.modal-company{font-size:13px;color:#888;text-align:center;margin-bottom:16px}
.modal-divider{height:1px;background:#1A1A24;margin:20px 0}
.textarea{width:100%;padding:12px;background:#09090C;border:1px solid #1E1E2A;border-radius:8px;color:#DDD8C8;font-family:'DM Sans',sans-serif;font-size:13px;resize:vertical;min-height:80px;margin-bottom:14px;outline:none;transition:border-color .2s}
.textarea:focus{border-color:#76E4F7}
.textarea::placeholder{color:#3a3a4a}
.btn-sm{padding:9px 18px;border-radius:7px;font-size:12px;font-weight:500;letter-spacing:0.5px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s;border:1px solid transparent}
.btn-accept{background:rgba(104,211,145,0.1);border-color:rgba(104,211,145,0.3);color:#68D391}
.btn-accept:hover{background:rgba(104,211,145,0.2)}
.btn-reject{background:rgba(252,129,129,0.1);border-color:rgba(252,129,129,0.3);color:#FC8181}
.btn-reject:hover{background:rgba(252,129,129,0.2)}
.btn-req{background:rgba(118,228,247,0.08);border-color:rgba(118,228,247,0.25);color:#76E4F7}
.btn-req:hover{background:rgba(118,228,247,0.15)}
.btn-gen{padding:12px 24px;border-radius:8px;background:linear-gradient(135deg,rgba(118,228,247,0.1),rgba(104,211,145,0.1));border:1px solid rgba(118,228,247,0.3);color:#76E4F7;font-size:13px;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;letter-spacing:0.5px}
.btn-gen:hover{background:linear-gradient(135deg,rgba(118,228,247,0.18),rgba(104,211,145,0.18))}
.req-list{display:flex;flex-direction:column;gap:10px}
.req-card{padding:16px;border:1px solid #16161E;border-radius:10px;background:#0F0F16}
.req-parties{display:flex;align-items:center;gap:10px;margin-bottom:10px}
.req-arrow{color:#555;font-size:14px;flex-shrink:0}
.req-person{flex:1}
.req-person .rn{font-size:13px;font-weight:500;color:#DDD8C8}
.req-person .rc{font-size:11px;color:#666}
.req-msg{font-size:12px;color:#888;font-style:italic;margin-bottom:12px;padding:8px 12px;background:#09090C;border-radius:6px;border-left:2px solid #1E1E2A}
.req-footer{display:flex;align-items:center;justify-content:space-between;gap:8px}
.status-pill{padding:3px 10px;border-radius:20px;font-size:10px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase}
.status-pending{background:rgba(246,173,85,0.12);color:#F6AD55;border:1px solid rgba(246,173,85,0.25)}
.status-accepted{background:rgba(104,211,145,0.12);color:#68D391;border:1px solid rgba(104,211,145,0.25)}
.status-rejected{background:rgba(252,129,129,0.12);color:#FC8181;border:1px solid rgba(252,129,129,0.25)}
.agenda-wrap{display:flex;flex-direction:column;gap:28px}
.day-block{border:1px solid #16161E;border-radius:12px;overflow:hidden}
.day-header{padding:16px 20px;background:#0F0F16;border-bottom:1px solid #16161E;display:flex;align-items:center;justify-content:space-between}
.day-label{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:400;color:#EAE4D9}
.day-count{font-size:11px;color:#666;letter-spacing:1px}
.mtg-row{padding:16px 20px;border-bottom:1px solid #0F0F14;display:grid;grid-template-columns:90px 1fr 1fr auto;gap:16px;align-items:center;transition:background .15s}
.mtg-row:last-child{border-bottom:none}
.mtg-row:hover{background:#0C0C12}
.mtg-time{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:300;color:#EAE4D9;line-height:1}
.mtg-time-sub{font-size:10px;color:#555;letter-spacing:1px;margin-top:2px}
.mtg-pub{display:flex;align-items:center;gap:10px}
.mtg-av{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;flex-shrink:0;font-family:'Cormorant Garamond',serif}
.mtg-pub .mn{font-size:13px;color:#DDD8C8;font-weight:500}
.mtg-pub .mc{font-size:11px;color:#666}
.mtg-pub .ml{font-size:10px;margin-top:3px}
.mtg-link a{font-size:11px;color:#76E4F7;text-decoration:none;padding:5px 10px;border:1px solid rgba(118,228,247,0.2);border-radius:6px;display:inline-block;transition:all .15s;font-family:'Cormorant Garamond',serif}
.mtg-link a:hover{background:rgba(118,228,247,0.08);border-color:rgba(118,228,247,0.4)}
.empty-state{text-align:center;padding:60px 20px;color:#555}
.empty-icon{font-size:48px;margin-bottom:16px}
.empty-title{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:300;color:#888;margin-bottom:8px}
.empty-text{font-size:13px;color:#555;max-width:300px;margin:0 auto}
.stats-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:32px}
.stat-card{padding:20px;border:1px solid #16161E;border-radius:10px;background:#0F0F16}
.stat-n{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:300;color:#EAE4D9;line-height:1}
.stat-l{font-size:11px;color:#666;letter-spacing:1px;text-transform:uppercase;margin-top:4px}
.tz-info{background:#0D0D14;border:1px solid #1A1A24;border-radius:8px;padding:16px 20px;margin-bottom:24px;display:flex;gap:20px;flex-wrap:wrap}
.tz-item{display:flex;flex-direction:column;gap:2px}
.tz-country{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#666}
.tz-time{font-family:'Cormorant Garamond',serif;font-size:20px;color:#DDD8C8;font-weight:300}
.search-box{width:100%;padding:10px 16px;background:#0F0F16;border:1px solid #1E1E2A;border-radius:8px;color:#DDD8C8;font-family:'DM Sans',sans-serif;font-size:13px;outline:none;margin-bottom:20px;transition:border-color .2s}
.search-box:focus{border-color:#76E4F7}
.search-box::placeholder{color:#3a3a4a}
.tab-row{display:flex;gap:0;border-bottom:1px solid #16161E;margin-bottom:24px}
.tab{padding:10px 20px;font-size:13px;color:#666;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .15s;font-family:'DM Sans',sans-serif}
.tab.active{color:#76E4F7;border-bottom-color:#76E4F7}
.tab:hover:not(.active){color:#999}
.notice{padding:12px 16px;border-radius:8px;font-size:12px;display:flex;align-items:center;gap:8px;margin-bottom:16px}
.notice-info{background:rgba(118,228,247,0.06);border:1px solid rgba(118,228,247,0.2);color:#76E4F7}
.window-info{font-size:11px;color:#555;background:#0D0D14;border:1px solid #16161E;padding:8px 14px;border-radius:6px;margin-bottom:20px}
`;

// ===================== COMPONENTS =====================

function CountryTag({ country }) {
  const c = COUNTRY[country];
  return (
    <span
      className="country-tag"
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.color,
      }}
    >
      {c.flag} {c.label}
    </span>
  );
}

function Avatar({ pub, size = 44 }) {
  const c = COUNTRY[pub.country];
  return (
    <div
      className="card-av"
      style={{
        width: size,
        height: size,
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.color,
      }}
    >
      {pub.initials}
    </div>
  );
}

function LoginPage({ setUser, setPage }) {
  const [step, setStep] = useState(1);
const [country, setCountry] = useState(null);
const [selected, setSelected] = useState(null);
const [search, setSearch] = useState('');
const [orgPwd, setOrgPwd] = useState('');
const [orgError, setOrgError] = useState(false);
const [showOrgPwd, setShowOrgPwd] = useState(false);

  const counts = { chile: 37, spain: 10, colombia: 10, italy: 20 };
  const pubs = country
    ? PUBS.filter(
        (p) =>
          p.country === country &&
          (p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.company.toLowerCase().includes(search.toLowerCase()))
      )
    : [];

  return (
    <div className="login-wrap">
      <style>{CSS}</style>
      <div className="login-box">
        <div className="logo-line">Feria Internacional del Libro · 2026</div>
        <h1 className="login-title">
          BookMeet<span style={{ color: '#76E4F7' }}>.</span>
        </h1>
        <p className="login-sub">
          Plataforma de encuentros editoriales · Mar 18–20, Santiago de Chile
        </p>

        {step === 1 && (
          <>
            <span className="login-label">Selecciona tu país</span>
            <div className="country-grid">
              {Object.entries(COUNTRY).map(([k, v]) => (
                <button
                  key={k}
                  className={`country-btn ${country === k ? 'active' : ''}`}
                  style={{ '--cc': v.color }}
                  onClick={() => setCountry(k)}
                >
                  <span className="flag">{v.flag}</span>
                  <span className="cname">{v.label}</span>
                  <span className="ccount">{counts[k]} editoras</span>
                </button>
              ))}
            </div>
            {country && (
              <>
                <span className="login-label">Selecciona tu nombre</span>
                <input
                  className="search-box"
                  placeholder="Buscar por nombre o editorial..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ marginBottom: 12 }}
                />
                <div className="pub-select">
                  {pubs.map((p) => (
                    <div
                      key={p.id}
                      className="pub-option"
                      onClick={() => setSelected(p)}
                    >
                      <Avatar pub={p} size={32} />
                      <div>
                        <div className="pname">{p.name}</div>
                        <div className="pcomp">{p.company}</div>
                      </div>
                      {selected?.id === p.id && (
                        <span
                          style={{
                            marginLeft: 'auto',
                            color: COUNTRY[p.country].color,
                          }}
                        >
                          ✓
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  className="btn-primary"
                  disabled={!selected}
                  onClick={() => {
                    setUser(selected);
                    setPage('dashboard');
                  }}
                >
                  Ingresar como {selected?.name || 'editora'} →
                </button>
              </>
            )}
           {!showOrgPwd ? (
  <button className="btn-org" onClick={()=>setShowOrgPwd(true)}>
    ⚙ Ingresar como Organizadora
  </button>
) : (
  <div style={{marginTop:10,padding:16,border:'1px solid #1E1E2A',borderRadius:8,background:'#0F0F16'}}>
    <div style={{fontSize:11,letterSpacing:2,textTransform:'uppercase',color:'#888',marginBottom:8}}>Contraseña</div>
    <input
      type="password"
      className="search-box"
      placeholder="Ingresa la contraseña..."
      value={orgPwd}
      onChange={e=>{setOrgPwd(e.target.value);setOrgError(false)}}
      style={{marginBottom:8}}
    />
    {orgError && <div style={{color:'#FC8181',fontSize:12,marginBottom:8}}>⚠ Contraseña incorrecta</div>}
    <div style={{display:'flex',gap:8}}>
      <button className="btn-org" style={{flex:1,marginTop:0}} onClick={()=>{setShowOrgPwd(false);setOrgPwd('');setOrgError(false)}}>
        Cancelar
      </button>
      <button className="btn-primary" style={{flex:1,padding:'10px'}} onClick={()=>{
        if(orgPwd==='BCBF2026COCLITES'){
          setUser({id:'org',name:'Organizadora',country:'org',initials:'OR',company:'Feria del Libro'});
          setPage('dashboard');
        } else {
          setOrgError(true);
        }
      }}>
        Entrar →
      </button>
    </div>
  </div>
)}
          </>
        )}
      </div>
    </div>
  );
}

function Navbar({ user, page, setPage, inbox, setUser }) {
  const isOrg = user?.id === 'org';
  const c = isOrg
    ? {
        color: '#76E4F7',
        bg: 'rgba(118,228,247,0.1)',
        border: 'rgba(118,228,247,0.2)',
      }
    : COUNTRY[user?.country];
  return (
    <nav className="nav">
      <div className="nav-brand">
        Book<span>Meet</span>
      </div>
      <div className="nav-links">
        {['dashboard', 'directory', 'requests', 'agenda'].map((p) => (
          <button
            key={p}
            className={`nav-link ${page === p ? 'active' : ''}`}
            onClick={() => setPage(p)}
            style={{ position: 'relative' }}
          >
            {p === 'dashboard'
              ? 'Inicio'
              : p === 'directory'
              ? 'Directorio'
              : p === 'requests'
              ? 'Solicitudes'
              : 'Agenda'}
            {p === 'requests' && inbox.length > 0 && (
              <span className="nav-badge">{inbox.length}</span>
            )}
          </button>
        ))}
      </div>
      <div className="nav-user">
        <div
          className="nav-avatar"
          style={{
            background: c?.bg || 'rgba(118,228,247,0.1)',
            border: `1px solid ${c?.border || 'rgba(118,228,247,0.2)'}`,
            color: c?.color || '#76E4F7',
          }}
        >
          {user?.initials || 'OR'}
        </div>
        <span className="nav-name">{user?.name}</span>
        <button className="nav-logout" onClick={() => setUser(null)}>
          Salir
        </button>
      </div>
    </nav>
  );
}

function PublisherModal({ pub, user, requests, setRequests, onClose }) {
  const [msg, setMsg] = useState('');
  const isMe = user?.id === pub.id;
  const existing = requests.find(
    (r) =>
      (r.fromId === user?.id && r.toId === pub.id) ||
      (r.fromId === pub.id && r.toId === user?.id)
  );
  const c = COUNTRY[pub.country];

  const send = () => {
    let _r = requests.length;
    setRequests((prev) => [
      ...prev,
      {
        id: `r${++_r}`,
        fromId: user.id,
        toId: pub.id,
        status: 'pending',
        msg,
        createdAt: new Date().toISOString(),
      },
    ]);
    setMsg('');
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <div
          className="modal-av"
          style={{
            background: c.bg,
            border: `1px solid ${c.border}`,
            color: c.color,
          }}
        >
          {pub.initials}
        </div>
        <div className="modal-name">{pub.name}</div>
        <div className="modal-company">{pub.company}</div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 8,
          }}
        >
          <CountryTag country={pub.country} />
        </div>
        <div
          className="genre-tags"
          style={{ justifyContent: 'center', marginBottom: 16 }}
        >
          {pub.genres.map((g) => (
            <span key={g} className="genre-tag">
              {g}
            </span>
          ))}
        </div>
        {!isMe && user?.id !== 'org' && (
          <>
            <div className="modal-divider" />
            {existing ? (
              <div
                className={`status-pill ${
                  existing.status === 'pending'
                    ? 'status-pending'
                    : existing.status === 'accepted'
                    ? 'status-accepted'
                    : 'status-rejected'
                }`}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '10px',
                }}
              >
                Solicitud{' '}
                {existing.status === 'pending'
                  ? 'pendiente'
                  : existing.status === 'accepted'
                  ? 'aceptada'
                  : 'rechazada'}
              </div>
            ) : (
              <>
                <textarea
                  className="textarea"
                  placeholder="Mensaje opcional para la solicitud de reunión..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                />
                <button
                  className="btn-sm btn-req"
                  style={{ width: '100%', padding: '11px' }}
                  onClick={send}
                >
                  ✦ Solicitar reunión (15 min)
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function DashboardPage({ user, requests, setPage }) {
  const isOrg = user?.id === 'org';
  const accepted = requests.filter((r) => r.status === 'accepted').length;
  const pending = requests.filter((r) => r.status === 'pending').length;
  const myMeetings = isOrg
    ? accepted
    : requests.filter(
        (r) =>
          (r.fromId === user.id || r.toId === user.id) &&
          r.status === 'accepted'
      ).length;
  const myPending = isOrg
    ? pending
    : requests.filter(
        (r) =>
          (r.fromId === user.id || r.toId === user.id) && r.status === 'pending'
      ).length;

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">
          Bienvenida{isOrg ? ', Organizadora' : `, ${user.name.split(' ')[0]}`}
        </div>
        <div className="page-sub">
          Feria Internacional del Libro · 18–20 de marzo de 2026 · Santiago
        </div>
      </div>
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-n">
            {PUBS.filter((p) => p.country === 'chile').length}
          </div>
          <div className="stat-l">Editoras chilenas</div>
        </div>
        <div className="stat-card">
          <div className="stat-n">
            {PUBS.filter((p) => p.country === 'italy').length}
          </div>
          <div className="stat-l">Editoras italianas</div>
        </div>
        <div className="stat-card">
          <div className="stat-n">
            {PUBS.filter((p) => p.country === 'spain').length}
          </div>
          <div className="stat-l">Editoras españolas</div>
        </div>
        <div className="stat-card">
          <div className="stat-n">
            {PUBS.filter((p) => p.country === 'colombia').length}
          </div>
          <div className="stat-l">Editoras colombianas</div>
        </div>
        <div className="stat-card">
          <div className="stat-n" style={{ color: '#68D391' }}>
            {myMeetings}
          </div>
          <div className="stat-l">
            {isOrg ? 'Reuniones confirmadas' : 'Mis reuniones'}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-n" style={{ color: '#F6AD55' }}>
            {myPending}
          </div>
          <div className="stat-l">Solicitudes pendientes</div>
        </div>
      </div>
      <div className="section-label">Franjas horarias (CET)</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          marginBottom: 32,
        }}
      >
        {[
          {
            pair: '🇨🇱 Chile ↔ 🇮🇹 Italia / 🇪🇸 España',
            window: '14:00 – 18:00 CET',
            note: '10:00-14:00 CLT · 14:00-18:00 CET',
            color: '#FC8181',
          },
          {
            pair: '🇨🇱 Chile ↔ 🇨🇴 Colombia',
            window: '18:00 – 22:00 CET',
            note: '14:00-18:00 CLT · 12:00-16:00 COT',
            color: '#68D391',
          },
          {
            pair: '🇨🇴 Colombia ↔ 🇮🇹 Italia / 🇪🇸 España',
            window: '15:00 – 19:00 CET',
            note: '09:00-13:00 COT · 15:00-19:00 CET',
            color: '#F6AD55',
          },
          {
            pair: '🇮🇹 Italia ↔ 🇪🇸 España',
            window: '09:00 – 17:00 CET',
            note: 'Mismo huso horario',
            color: '#76E4F7',
          },
        ].map((item) => (
          <div
            key={item.pair}
            style={{
              padding: '14px 16px',
              border: '1px solid #16161E',
              borderRadius: 8,
              background: '#0F0F16',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <span style={{ fontSize: 13, color: '#DDD8C8', flex: 1 }}>
              {item.pair}
            </span>
            <span
              style={{
                fontFamily: 'Cormorant Garamond,serif',
                fontSize: 18,
                color: item.color,
                fontWeight: 300,
              }}
            >
              {item.window}
            </span>
            <span style={{ fontSize: 11, color: '#555' }}>{item.note}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button className="btn-gen" onClick={() => setPage('directory')}>
          → Ver directorio completo
        </button>
        <button className="btn-gen" onClick={() => setPage('requests')}>
          → Gestionar solicitudes
        </button>
      </div>
    </div>
  );
}

function DirectoryPage({ user, requests, setRequests }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);

  const filtered = useMemo(
    () =>
      PUBS.filter((p) => {
        if (filter !== 'all' && p.country !== filter) return false;
        const q = search.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.company.toLowerCase().includes(q) ||
          p.genres.some((g) => g.toLowerCase().includes(q))
        );
      }),
    [filter, search]
  );

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Directorio</div>
        <div className="page-sub">
          {PUBS.length} editoras participantes · haz clic para ver perfil y
          solicitar reunión
        </div>
      </div>
      <input
        className="search-box"
        placeholder="Buscar por nombre, editorial o género..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="filters">
        {[
          ['all', 'Todas', PUBS.length],
          ...Object.entries(COUNTRY).map(([k, v]) => [
            k,
            `${v.flag} ${v.label}`,
            PUBS.filter((p) => p.country === k).length,
          ]),
        ].map(([k, l, n]) => (
          <button
            key={k}
            className={`filter-btn ${filter === k ? 'active' : ''}`}
            style={{
              '--cc': k === 'all' ? '#76E4F7' : COUNTRY[k]?.color,
              '--cb': k === 'all' ? 'rgba(118,228,247,0.1)' : COUNTRY[k]?.bg,
            }}
            onClick={() => setFilter(k)}
          >
            {l} ({n})
          </button>
        ))}
      </div>
      <div className="pub-grid">
        {filtered.map((p) => {
          const c = COUNTRY[p.country];
          const req = requests.find(
            (r) =>
              (r.fromId === user?.id && r.toId === p.id) ||
              (r.fromId === p.id && r.toId === user?.id)
          );
          return (
            <div
              key={p.id}
              className="pub-card"
              style={{ '--cc': c.color + '44' }}
              onClick={() => setModal(p)}
            >
              <div className="card-top">
                <Avatar pub={p} size={44} />
                <div className="card-info">
                  <div className="cname">{p.name}</div>
                  <div className="ccomp">{p.company}</div>
                  <CountryTag country={p.country} />
                </div>
              </div>
              <div className="genre-tags">
                {p.genres.map((g) => (
                  <span key={g} className="genre-tag">
                    {g}
                  </span>
                ))}
                {req && (
                  <span
                    className={`genre-tag status-${req.status}`}
                    style={{ marginLeft: 'auto' }}
                  >
                    {req.status === 'pending'
                      ? '⏳'
                      : req.status === 'accepted'
                      ? '✓'
                      : '✗'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {modal && (
        <PublisherModal
          pub={modal}
          user={user}
          requests={requests}
          setRequests={setRequests}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}

function RequestsPage({ user, requests, setRequests }) {
  const isOrg = user?.id === 'org';
  const [tab, setTab] = useState('inbox');
  const byId = Object.fromEntries(PUBS.map((p) => [p.id, p]));

  const inbox = requests.filter((r) =>
    isOrg
      ? r.status === 'pending'
      : r.toId === user.id && r.status === 'pending'
  );
  const sent = requests.filter((r) =>
    isOrg ? r.status !== 'pending' : r.fromId === user.id
  );
  const all = requests.filter(
    (r) => r.toId === user.id || r.fromId === user.id
  );

  const tabs = isOrg
    ? [
        ['inbox', `Pendientes (${inbox.length})`],
        ['sent', `Gestionadas`],
      ]
    : [
        ['inbox', `Recibidas (${inbox.length})`],
        ['sent', 'Enviadas'],
        ['all', 'Todas'],
      ];

  const show = tab === 'inbox' ? inbox : tab === 'sent' ? sent : all;

  const ReqCard = ({ r }) => {
    const from = byId[r.fromId],
      to = byId[r.toId];
    if (!from || !to) return null;
    const isIncoming = r.toId === user.id || isOrg;
    return (
      <div className="req-card">
        <div className="req-parties">
          <div className="req-person">
            <Avatar pub={from} size={32} />
          </div>
          <div className="req-person" style={{ marginLeft: 8 }}>
            <div className="rn">{from.name}</div>
            <div className="rc">{from.company}</div>
          </div>
          <span className="req-arrow">→</span>
          <div className="req-person">
            <div className="rn">{to.name}</div>
            <div className="rc">{to.company}</div>
          </div>
        </div>
        {r.msg && <div className="req-msg">"{r.msg}"</div>}
        <div className="req-footer">
          <span className={`status-pill status-${r.status}`}>
            {r.status === 'pending'
              ? 'Pendiente'
              : r.status === 'accepted'
              ? 'Aceptada'
              : 'Rechazada'}
          </span>
          {(r.toId === user.id || isOrg) && r.status === 'pending' && (
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                className="btn-sm btn-accept"
                onClick={() =>
                  setRequests((prev) =>
                    prev.map((x) =>
                      x.id === r.id ? { ...x, status: 'accepted' } : x
                    )
                  )
                }
              >
                Aceptar
              </button>
              <button
                className="btn-sm btn-reject"
                onClick={() =>
                  setRequests((prev) =>
                    prev.map((x) =>
                      x.id === r.id ? { ...x, status: 'rejected' } : x
                    )
                  )
                }
              >
                Rechazar
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Solicitudes de reunión</div>
        <div className="page-sub">
          Gestiona tus solicitudes de encuentro · Reuniones de 15 minutos
        </div>
      </div>
      <div className="tab-row">
        {tabs.map(([k, l]) => (
          <div
            key={k}
            className={`tab ${tab === k ? 'active' : ''}`}
            onClick={() => setTab(k)}
          >
            {l}
          </div>
        ))}
      </div>
      {show.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <div className="empty-title">Sin solicitudes</div>
          <div className="empty-text">
            No hay solicitudes en esta sección por el momento.
          </div>
        </div>
      ) : (
        <div className="req-list">
          {show.map((r) => (
            <ReqCard key={r.id} r={r} />
          ))}
        </div>
      )}
    </div>
  );
}

function AgendaPage({ user, requests, setRequests }) {
  const [schedule, setSchedule] = useState(null);
  const isOrg = user?.id === 'org';
  const accepted = requests.filter((r) => r.status === 'accepted');

  const gen = () => setSchedule(generateSchedule(requests, PUBS));

  const byDay = useMemo(() => {
    if (!schedule) return {};
    const mySchedule = isOrg
      ? schedule
      : schedule.filter((m) => m.p1.id === user.id || m.p2.id === user.id);
    const d = {};
    mySchedule.forEach((m) => {
      if (!d[m.day.iso]) d[m.day.iso] = [];
      d[m.day.iso].push(m);
    });
    return d;
  }, [schedule, user, isOrg]);

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Agenda de video reuniones</div>
        <div className="page-sub">
          Reuniones de 15 minutos · Franjas horarias según zona CET
        </div>
      </div>

      <div className="notice notice-info">
        ℹ {accepted.length} reuniones confirmadas · Todas las horas en CET
        (UTC+1) con hora local para cada participante
      </div>

      {!schedule && (
        <div style={{ marginBottom: 24 }}>
          <div className="window-info" style={{ marginBottom: 16 }}>
            🇨🇱↔🇮🇹🇪🇸 Tarde: 14:00–18:00 CET · 🇨🇱↔🇨🇴 Tarde/Noche: 18:00–22:00 CET
            · 🇨🇴↔🇮🇹🇪🇸 Tarde: 15:00–19:00 CET
          </div>
          <button className="btn-gen" onClick={gen}>
            ✦ Generar agenda con links Meet
          </button>
        </div>
      )}

      {schedule && Object.keys(byDay).length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📅</div>
          <div className="empty-title">Sin reuniones agendadas</div>
          <div className="empty-text">
            {isOrg
              ? 'No hay solicitudes aceptadas para generar agenda.'
              : 'No tienes reuniones confirmadas aún. Acepta o solicita reuniones en el directorio.'}
          </div>
        </div>
      )}

      {schedule && Object.keys(byDay).length > 0 && (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <span style={{ fontSize: 13, color: '#666' }}>
              {
                schedule.filter(
                  (m) => isOrg || m.p1.id === user.id || m.p2.id === user.id
                ).length
              }{' '}
              reuniones · {Object.keys(byDay).length} días
            </span>
            <button className="btn-sm btn-req" onClick={gen}>
              ↺ Regenerar
            </button>
          </div>
          <div className="agenda-wrap">
            {DAYS.filter((d) => byDay[d.iso]).map((d) => (
              <div key={d.iso} className="day-block">
                <div className="day-header">
                  <span className="day-label">{d.label}</span>
                  <span className="day-count">
                    {byDay[d.iso].length} reuniones
                  </span>
                </div>
                {byDay[d.iso].map((m) => {
                  const countries = [...new Set([m.p1.country, m.p2.country])];
                  return (
                    <div key={m.id} className="mtg-row">
                      <div>
                        <div className="mtg-time">
                          {String(m.cetH).padStart(2, '0')}:
                          {String(m.cetM).padStart(2, '0')}
                        </div>
                        <div className="mtg-time-sub">CET</div>
                        <div className="mtg-time-sub">
                          {String(m.cetH).padStart(2, '0')}:
                          {String(m.cetM).padStart(2, '0')}–
                          {String(m.cetH + (m.cetM === 45 ? 1 : 0)).padStart(
                            2,
                            '0'
                          )}
                          :{String((m.cetM + 15) % 60).padStart(2, '0')}
                        </div>
                      </div>
                      <div className="mtg-pub">
                        <Avatar pub={m.p1} size={34} />
                        <div>
                          <div className="mn">{m.p1.name}</div>
                          <div className="mc">{m.p1.company}</div>
                          <div className="ml">
                            <CountryTag country={m.p1.country} />
                          </div>
                          <div
                            style={{
                              fontSize: 10,
                              color: '#555',
                              marginTop: 3,
                            }}
                          >
                            🕐 {cetToLocal(m.cetH, m.cetM, m.p1.country)} local
                          </div>
                        </div>
                      </div>
                      <div className="mtg-pub">
                        <Avatar pub={m.p2} size={34} />
                        <div>
                          <div className="mn">{m.p2.name}</div>
                          <div className="mc">{m.p2.company}</div>
                          <div className="ml">
                            <CountryTag country={m.p2.country} />
                          </div>
                          <div
                            style={{
                              fontSize: 10,
                              color: '#555',
                              marginTop: 3,
                            }}
                          >
                            🕐 {cetToLocal(m.cetH, m.cetM, m.p2.country)} local
                          </div>
                        </div>
                      </div>
                      <div className="mtg-link">
                        <a href={m.meetLink} target="_blank" rel="noreferrer">
                          📹 Unirse
                        </a>
                        <div
                          style={{
                            fontSize: 9,
                            color: '#444',
                            marginTop: 4,
                            wordBreak: 'break-all',
                            maxWidth: 140,
                          }}
                        >
                          {m.meetLink.replace('https://', '')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ===================== MAIN APP =====================
export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('dashboard');
  const [requests, setRequests] = useState(DEMO_REQS);

  const inbox = useMemo(
    () =>
      user?.id === 'org'
        ? requests.filter((r) => r.status === 'pending')
        : requests.filter((r) => r.toId === user?.id && r.status === 'pending'),
    [requests, user]
  );

  if (!user) return <LoginPage setUser={setUser} setPage={setPage} />;

  return (
    <div className="app">
      <style>{CSS}</style>
      <Navbar
        user={user}
        page={page}
        setPage={setPage}
        inbox={inbox}
        setUser={setUser}
      />
      {page === 'dashboard' && (
        <DashboardPage user={user} requests={requests} setPage={setPage} />
      )}
      {page === 'directory' && (
        <DirectoryPage
          user={user}
          requests={requests}
          setRequests={setRequests}
        />
      )}
      {page === 'requests' && (
        <RequestsPage
          user={user}
          requests={requests}
          setRequests={setRequests}
        />
      )}
      {page === 'agenda' && (
        <AgendaPage user={user} requests={requests} setRequests={setRequests} />
      )}
    </div>
  );
}
