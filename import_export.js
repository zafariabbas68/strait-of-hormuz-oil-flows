// ============================================================
//  DATA  (EIA 2025)

const STRAIT = { lat: 26.55, lng: 56.45 };


const exporters = [
  { id:'SA', name:'Saudi Arabia', lat:24.7,  lng:46.7,  mbpd:5.50, share:37.2, ctrl:[21,52] },
  { id:'IQ', name:'Iraq',         lat:33.3,  lng:44.4,  mbpd:3.35, share:22.8, ctrl:[27,50] },
  { id:'AE', name:'UAE',          lat:23.4,  lng:53.9,  mbpd:1.90, share:12.9, ctrl:[22,55] },
  { id:'IR', name:'Iran',         lat:32.4,  lng:51.4,  mbpd:1.56, share:10.6, ctrl:[28,54] },
  { id:'KW', name:'Kuwait',       lat:29.4,  lng:47.9,  mbpd:1.48, share:10.1, ctrl:[25,52] },
  { id:'QA', name:'Qatar',        lat:25.3,  lng:51.5,  mbpd:0.66, share: 4.5, ctrl:[23,54] },
];

const importers = [
  { id:'CN', name:'China',         lat:36.6,  lng:101.8, mbpd:5.54, share:37.7, ctrl:[ 5, 80] },
  { id:'IN', name:'India',         lat:20.6,  lng:78.9,  mbpd:2.16, share:14.7, ctrl:[12, 66] },
  { id:'KR', name:'South Korea',   lat:37.5,  lng:127.8, mbpd:1.76, share:12.0, ctrl:[ 1, 97] },
  { id:'JP', name:'Japan',         lat:36.2,  lng:138.2, mbpd:1.60, share:10.9, ctrl:[-2,108] },
  { id:'SG', name:'Singapore',     lat: 1.3,  lng:103.8, mbpd:0.51, share: 3.5, ctrl:[ 4, 82] },
  { id:'TW', name:'Taiwan',        lat:23.7,  lng:121.0, mbpd:0.44, share: 3.0, ctrl:[ 2,100] },
  { id:'TH', name:'Thailand',      lat:13.8,  lng:100.5, mbpd:0.29, share: 2.0, ctrl:[ 4, 85] },
  { id:'US', name:'United States', lat:39.0,  lng:-95.0, mbpd:0.37, share: 2.5, ctrl:[-18, 18] },
  { id:'PK', name:'Pakistan',      lat:30.3,  lng:69.3,  mbpd:0.19, share: 1.3, ctrl:[18, 63] },
  { id:'IT', name:'Italy',         lat:41.9,  lng:12.5,  mbpd:0.22, share: 1.5, ctrl:[23, 32] },
  { id:'FR', name:'France',        lat:46.2,  lng: 2.2,  mbpd:0.15, share: 1.0, ctrl:[30, 18] },
];

const MAX_MBPD = 5.54;  // China – used for scaling