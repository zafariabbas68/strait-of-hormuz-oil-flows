//  MAP INIT

const map = L.map('map', {
  center: [24.801119, 18.622151],    //18,82
  zoom: 3,
  minZoom: 2,
  maxZoom: 8,
  zoomControl: true
});

// ============================================================
//adding basemap layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OSM</a> © <a href="https://carto.com">CARTO</a> | Data: EIA Q1 2025',
  subdomains: 'abcd',
  maxZoom: 20
}).addTo(map);

// ============================================================
//  CANVAS OVERLAY
const mapDiv = document.getElementById('map');
const cvs = document.createElement('canvas');
cvs.className = 'flow-canvas';
mapDiv.appendChild(cvs);

function resizeCvs() {
  const s = map.getSize();
  cvs.width = s.x; cvs.height = s.y;
}
resizeCvs();
map.on('resize', resizeCvs);

// ============================================================
//  HELPERS
function toScreen(latLng) {
  return map.latLngToContainerPoint(L.latLng(latLng[0], latLng[1]));
}

// ============================================================
//  ANIMATED FLOWs
let T = 0; // animation time (ms)

function drawFlow(ctx, fromLL, toLL, ctrlLL, color, mbpd, phaseOff) {
  const from = toScreen(fromLL);
  const to   = toScreen(toLL);
  const cp   = toScreen(ctrlLL);

  const lw   = 0.6 + (mbpd / MAX_MBPD) * 5.0;
  const np   = Math.ceil(2 + (mbpd / MAX_MBPD) * 6);
  const pr   = Math.max(1.8, lw * 0.85);
  const spd  = 0.00011 + (mbpd / MAX_MBPD) * 0.00009;

  // --- static arc ---
  const g = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
  g.addColorStop(0,   color + 'cc');
  g.addColorStop(0.5, color + '88');
  g.addColorStop(1,   color + '33');

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.quadraticCurveTo(cp.x, cp.y, to.x, to.y);
  ctx.strokeStyle = g;
  ctx.lineWidth   = lw;
  ctx.lineCap     = 'round';
  ctx.globalAlpha = 0.5;
  ctx.stroke();
  ctx.restore();

  // --- moving particles ---
  for (let i = 0; i < np; i++) {
    const t = ((T * spd + i / np + phaseOff) % 1.0);
    const u = 1 - t;
    const x = u*u*from.x + 2*u*t*cp.x + t*t*to.x;
    const y = u*u*from.y + 2*u*t*cp.y + t*t*to.y;
    const ea = Math.min(1, Math.min(t, 1-t) * 7); // fade at ends

    ctx.save();
    ctx.globalAlpha = ea * 0.95;
    ctx.beginPath();
    ctx.arc(x, y, pr, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }
}

// ============================================================
//  GLOWING DOT Markers
function drawDot(ctx, latLng, r, color, phase) {
  const pt = toScreen(latLng);
  const rp = r * (1 + 0.28 * Math.sin(T * 0.0028 + phase));

  // outer glow
  const grd = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, rp * 3.2);
  grd.addColorStop(0,   color + 'bb');
  grd.addColorStop(0.4, color + '44');
  grd.addColorStop(1,   color + '00');
  ctx.save();
  ctx.beginPath();
  ctx.arc(pt.x, pt.y, rp * 3.2, 0, Math.PI * 2);
  ctx.fillStyle = grd;
  ctx.fill();
  ctx.restore();

  // core
  ctx.save();
  ctx.globalAlpha = 0.94;
  ctx.beginPath();
  ctx.arc(pt.x, pt.y, rp, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  // specular
  ctx.globalAlpha = 0.35;
  ctx.beginPath();
  ctx.arc(pt.x - rp*0.32, pt.y - rp*0.32, rp*0.38, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.restore();
}

// ============================================================
//  RENDER LOOP

function render(ts) {
  T = ts;
  const ctx = cvs.getContext('2d');
  ctx.clearRect(0, 0, cvs.width, cvs.height);

  // Export flows (orange → strait)
  exporters.forEach((e, i) =>
    drawFlow(ctx, [e.lat,e.lng], [STRAIT.lat,STRAIT.lng], e.ctrl, '#ff7b2c', e.mbpd, i*0.17));

  // Import flows (strait → blue)
  importers.forEach((im, i) =>
    drawFlow(ctx, [STRAIT.lat,STRAIT.lng], [im.lat,im.lng], im.ctrl, '#00c5e8', im.mbpd, i*0.11));

  // Dots — drawn on top of lines
  exporters.forEach((e, i) =>
    drawDot(ctx, [e.lat,e.lng], 3.5 + (e.mbpd/MAX_MBPD)*5, '#ff7b2c', i*1.1));

  importers.forEach((im, i) =>
    drawDot(ctx, [im.lat,im.lng], 3.2 + (im.mbpd/MAX_MBPD)*5, '#00c5e8', i*0.9));

  // Strait — largest, golden
  drawDot(ctx, [STRAIT.lat, STRAIT.lng], 9.5, '#ffb432', 0);

  requestAnimationFrame(render);
}
requestAnimationFrame(render);

// ============================================================
//  DIV-ICON LABELS
function mkLabel(lat, lng, html, offX, offY) {
  const icon = L.divIcon({
    className: '',
    html: `<div style="
      font-family:'Segoe UI',system-ui,sans-serif;
      white-space:nowrap;
      text-shadow:0 0 8px #000,0 1px 4px #000;
      pointer-events:none;">${html}</div>`,
    iconAnchor: [-offX, -offY]
  });
  L.marker([lat, lng], { icon, interactive: false }).addTo(map);
}

const EXP_COL  = '#ffa566';
const IMP_COL  = '#52d8f5';
const GOLD     = '#ffb432';

// Strait
mkLabel(STRAIT.lat, STRAIT.lng,
  `<span style="font-size:11px;font-weight:700;color:${GOLD}">⚡ Strait of Hormuz</span>`,
  6, 18);

// Exporters
exporters.forEach(e =>
  mkLabel(e.lat, e.lng,
    `<span style="font-size:10px;font-weight:600;color:${EXP_COL}">${e.name}</span>
     <span style="font-size:9.5px;font-weight:700;color:${GOLD}"> ${e.share}%</span>`,
  8, -2));

// Importers
importers.forEach(im =>
  mkLabel(im.lat, im.lng,
    `<span style="font-size:10px;font-weight:600;color:${IMP_COL}">${im.name}</span>
     <span style="font-size:9.5px;font-weight:700;color:${GOLD}"> ${im.share}%</span>`,
  8, -2));

// ============================================================
//  TOOLTIPS

const tooltip = document.getElementById('tooltip');
const ttName  = document.getElementById('tt-name');
const ttRole  = document.getElementById('tt-role');
const ttData  = document.getElementById('tt-data');

function showTip(e, name, role, roleColor, mbpd, share, extra) {
  ttName.textContent = name;
  ttRole.textContent = role;
  ttRole.style.color = roleColor;
  ttData.innerHTML =
    `<b>${mbpd} mb/d</b> &nbsp;·&nbsp; <b>${share}%</b> of Strait flow` +
    (extra ? `<br>${extra}` : '');
  tooltip.style.display = 'block';
  moveTip(e);
}

function moveTip(e) {
  const x = e.containerPoint.x, y = e.containerPoint.y;
  tooltip.style.left = (cvs.width - x < 210 ? x - 215 : x + 14) + 'px';
  tooltip.style.top  = (y - 18) + 'px';
}

function hideTip() { tooltip.style.display = 'none'; }

function addHover(lat, lng, radiusM, name, role, rColor, mbpd, share, extra) {
  const c = L.circle([lat, lng], {
    radius: radiusM, color:'transparent',
    fillColor:'transparent', fillOpacity:0
  }).addTo(map);
  c.on('mouseover', e => showTip(e, name, role, rColor, mbpd, share, extra));
  c.on('mousemove', moveTip);
  c.on('mouseout', hideTip);
}

// Strait
const sc = L.circle([STRAIT.lat, STRAIT.lng], {
  radius:90000, color:'transparent', fillColor:'transparent', fillOpacity:0
}).addTo(map);
sc.on('mouseover', e => {
  ttName.textContent = 'Strait of Hormuz';
  ttRole.textContent = '⚡ Critical Energy Chokepoint'; ttRole.style.color = '#ffb432';
  ttData.innerHTML = '<b>20 mb/d</b> &nbsp;·&nbsp;<b>20%  of Global Oil Trade Route  <br>· 33 km wide';
  tooltip.style.display = 'block'; moveTip(e);
});
sc.on('mousemove', moveTip); sc.on('mouseout', hideTip);

exporters.forEach(e =>
  addHover(e.lat, e.lng, 130000 + e.mbpd*55000,
    e.name, '⬆ OIL EXPORTER', '#ff7b2c', e.mbpd, e.share, null));

importers.forEach(im =>
  addHover(im.lat, im.lng, 150000 + im.mbpd*45000,
    im.name, '⬇ OIL IMPORTER', '#00c5e8', im.mbpd, im.share, null));