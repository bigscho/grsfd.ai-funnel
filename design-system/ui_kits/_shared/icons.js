// Lucide icons as small React components. Shared across UI kits.
// window.Icon.Home etc.
const { createElement: h } = React;

const svg = (children, size = 20, stroke = 1.75) => ({ size: s, color, style, className, ...rest } = {}) => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  width: s || size, height: s || size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: color || 'currentColor',
  strokeWidth: stroke,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  style, className,
  ...rest,
}, ...children);

const p = (d) => h('path', { d });
const c = (cx, cy, r) => h('circle', { cx, cy, r });
const r = (x, y, w, hh, rx) => h('rect', { x, y, width: w, height: hh, rx });
const l = (x1, y1, x2, y2) => h('line', { x1, y1, x2, y2 });
const pl = (points) => h('polyline', { points });
const pg = (points) => h('polygon', { points });

window.Icon = {
  Home: svg([p('M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'), pl('9 22 9 12 15 12 15 22')]),
  MapPin: svg([p('M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'), c(12, 10, 3)]),
  Mail: svg([r(2, 4, 20, 16, 2), pl('22 6 12 13 2 6')]),
  Send: svg([l(22, 2, 11, 13), pg('22 2 15 22 11 13 2 9 22 2')]),
  Users: svg([p('M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'), c(9, 7, 4), p('M23 21v-2a4 4 0 0 0-3-3.87'), p('M16 3.13a4 4 0 0 1 0 7.75')]),
  Farm: svg([p('M1 7 L4 4 L7 7 L7 11 L1 11 Z'), h('path', { d: 'M9 7 L12 4 L15 7 L15 11 L9 11 Z', fill: 'currentColor', fillOpacity: 0.2 }), p('M17 7 L20 4 L23 7 L23 11 L17 11 Z'), p('M1 16 L4 13 L7 16 L7 20 L1 20 Z'), p('M9 16 L12 13 L15 16 L15 20 L9 20 Z'), p('M17 16 L20 13 L23 16 L23 20 L17 20 Z')]),
  ArrowRight: svg([l(3, 12, 21, 12), pl('15 6 21 12 15 18')]),
  ArrowUpRight: svg([l(7, 17, 17, 7), pl('7 7 17 7 17 17')]),
  Check: svg([pl('20 6 9 17 4 12')]),
  Zap: svg([pg('13 2 3 14 12 14 11 22 21 10 12 10 13 2')]),
  Play: svg([pg('5 3 19 12 5 21 5 3')]),
  Search: svg([c(11, 11, 8), l(21, 21, 16.65, 16.65)]),
  Settings: svg([c(12, 12, 3), p('M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z')]),
  ChevronRight: svg([pl('9 18 15 12 9 6')]),
  ChevronDown: svg([pl('6 9 12 15 18 9')]),
  Sparkles: svg([p('M12 3l1.9 4.5L18 9l-4.1 1.5L12 15l-1.9-4.5L6 9l4.1-1.5z'), p('M5 3v4'), p('M3 5h4'), p('M19 17v4'), p('M17 19h4')]),
  TrendingUp: svg([pl('23 6 13.5 15.5 8.5 10.5 1 18'), pl('17 6 23 6 23 12')]),
  BarChart: svg([l(12, 20, 12, 10), l(18, 20, 18, 4), l(6, 20, 6, 16)]),
  Layers: svg([pg('12 2 2 7 12 12 22 7 12 2'), pl('2 17 12 22 22 17'), pl('2 12 12 17 22 12')]),
  Calendar: svg([r(3, 4, 18, 18, 2), l(16, 2, 16, 6), l(8, 2, 8, 6), l(3, 10, 21, 10)]),
  Filter: svg([pg('22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3')]),
  Plus: svg([l(12, 5, 12, 19), l(5, 12, 19, 12)]),
  X: svg([l(18, 6, 6, 18), l(6, 6, 18, 18)]),
  Lock: svg([r(3, 11, 18, 11, 2), p('M7 11V7a5 5 0 0 1 10 0v4')]),
  Inbox: svg([pl('22 12 16 12 14 15 10 15 8 12 2 12'), p('M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z')]),
  Key: svg([c(7.5, 15.5, 5.5), l(12, 13, 21, 4), l(17, 8, 20, 11)]),
  Phone: svg([p('M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z')]),
  Building: svg([r(4, 2, 16, 20, 2), l(9, 22, 9, 18), l(15, 22, 15, 18), l(8, 6, 10, 6), l(14, 6, 16, 6), l(8, 10, 10, 10), l(14, 10, 16, 10), l(8, 14, 10, 14), l(14, 14, 16, 14)]),
};
