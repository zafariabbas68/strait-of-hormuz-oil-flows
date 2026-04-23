
# 🌊 Strait of Hormuz — Global Oil Trade Flows

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?logo=leaflet)](https://leafletjs.com/)
[![Data](https://img.shields.io/badge/Data-EIA%202025-0054A5)](https://www.eia.gov/)
[![Interactive](https://img.shields.io/badge/Interactive-Map-brightgreen)](https://zafariabbas68.github.io/strait-of-hormuz-oil-flows)

An interactive, animated web map visualizing the flow of crude oil through the **Strait of Hormuz**, the world's most critical energy chokepoint. Built with Leaflet.js and HTML5 Canvas.

📊 **Data Source:** U.S. Energy Information Administration (EIA), 2025

---

## 🎬 Live Animation Preview

![Strait of Hormuz Oil Flows Animation](demo.gif)

*Animated visualization showing oil particles flowing from Persian Gulf exporters through the Strait of Hormuz to global importers*

---

## 🌍 Interactive Map

<iframe src="strait_hormuz_map.html" width="100%" height="500px" style="border: 2px solid #ffb432; border-radius: 10px;" title="Strait of Hormuz Interactive Map"></iframe>

> 💡 **Tip:** The map above is fully interactive! Zoom in/out, pan around, and hover over any dot to see detailed oil flow data.

🔗 **[Open Full Screen Map](strait_hormuz_map.html)** | **[View on GitHub Pages](https://zafariabbas68.github.io/strait-of-hormuz-oil-flows)**

---

## 📊 Overview

The Strait of Hormuz is a narrow waterway between the Persian Gulf and the Gulf of Oman, through which approximately **20% of global oil consumption** passes daily. This interactive map shows:

| Element | Description |
|---------|-------------|
| 🟠 **Orange animated particles** | Oil flowing from 6 Persian Gulf exporters → to the Strait |
| 🔵 **Cyan animated particles** | Oil flowing from the Strait → to 11 global importers |
| ✨ **Pulsing golden dot** | The strategic location of the Strait itself |
| 📍 **Hover tooltips** | Detailed data for each country (mb/d and percentage) |

---

## 📈 Key Statistics (EIA 2025)

| Metric | Value |
|--------|-------|
| **Total daily flow** | 20 million barrels/day |
| **Global oil consumption** | 20% |
| **Asian market share** | 89.2% |
| **Width of chokepoint** | 33 km (21 miles) |

### 🔴 Top Exporters (Persian Gulf)

| Flag | Country | mb/d | Share |
|------|---------|------|-------|
| 🇸🇦 | Saudi Arabia | 5.50 | 37.2% |
| 🇮🇶 | Iraq | 3.35 | 22.8% |
| 🇦🇪 | UAE | 1.90 | 12.9% |
| 🇮🇷 | Iran | 1.56 | 10.6% |
| 🇰🇼 | Kuwait | 1.48 | 10.1% |
| 🇶🇦 | Qatar | 0.66 | 4.5% |

### 🔵 Top Importers

| Flag | Country | mb/d | Share |
|------|---------|------|-------|
| 🇨🇳 | China | 5.54 | 37.7% |
| 🇮🇳 | India | 2.16 | 14.7% |
| 🇰🇷 | South Korea | 1.76 | 12.0% |
| 🇯🇵 | Japan | 1.60 | 10.9% |
| 🇸🇬 | Singapore | 0.51 | 3.5% |
| 🇹🇼 | Taiwan | 0.44 | 3.0% |
| 🇹🇭 | Thailand | 0.29 | 2.0% |
| 🇺🇸 | United States | 0.37 | 2.5% |
| 🇵🇰 | Pakistan | 0.19 | 1.3% |
| 🇮🇹 | Italy | 0.22 | 1.5% |
| 🇫🇷 | France | 0.15 | 1.0% |

---

## 🎯 Features

| Feature | Description |
|---------|-------------|
| ✅ **Smooth 60fps animations** | Particles flow continuously along curved Bezier paths |
| ✅ **Volume-based scaling** | Line thickness and particle count scale with mb/d |
| ✅ **Interactive tooltips** | Hover over any location for detailed data |
| ✅ **Zoom & pan** | Fully interactive Leaflet map with dark CARTO basemap |
| ✅ **Responsive design** | Works on desktop and mobile devices |
| ✅ **Pulsing glow effects** | All location markers have dynamic visual feedback |

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **Leaflet.js** | Interactive mapping library |
| **HTML5 Canvas** | Animated flow rendering |
| **CARTO Dark Matter** | Dark theme basemap tiles |
| **CSS3** | UI panels, tooltips, and styling |
| **JavaScript** | Animation logic and interactivity |

---

## 📁 Project Structure

```
strait-of-hormuz-oil-flows/
├── index.html              # Main HTML entry point
├── map.js                  # Leaflet map, canvas animation, markers & tooltips
├── import_export.js        # Data: exporters, importers, flow coordinates
├── style.css               # Dark-theme UI styles (panels, tooltip, canvas)
├── strait_hormuz_map.html  # Standalone map file
├── demo.gif                # Animated demo preview
└── README.md               # Project documentation
```

---

## 🚀 How to Run Locally

### Option 1: Python HTTP Server (Recommended)

```bash
# Clone the repository
git clone https://github.com/zafariabbas68/strait-of-hormuz-oil-flows.git
cd strait-of-hormuz-oil-flows

# Start a local server
python -m http.server 8000

# Open your browser and go to:
# http://localhost:8000
```

### Option 2: Node.js HTTP Server

```bash
npx http-server -p 8000
```

### Option 3: VS Code Live Server

Right-click on `index.html` → **Open with Live Server**

### Option 4: Direct Browser Opening

Double-click `index.html` (some features may be limited due to CORS)

---

## 📸 Demo Preview

| View | Description |
|------|-------------|
| ![Demo Animation](demo.gif) | Animated flow visualization showing oil particles moving through the Strait |

---

## 🗺️ Map Legend

| Element | Color | Description |
|---------|-------|-------------|
| Glowing dot | 🟠 Orange | Oil exporter (Persian Gulf) |
| Glowing dot | 🔵 Cyan | Oil importer |
| Glowing dot | ✨ Golden | Strait of Hormuz (chokepoint) |
| Flowing particles | 🟠 Orange | Export routes → to Strait |
| Flowing particles | 🔵 Cyan | Import routes ← from Strait |
| Curved lines | 🟠/🔵 | Bezier flow paths |

---

## 🌍 Live Demo

👉 **[View Live Interactive Map](https://zafariabbas68.github.io/strait-of-hormuz-oil-flows)**

The live version is hosted on GitHub Pages and includes:
- Full interactivity
- Animated particle flows
- Hover tooltips
- Zoom and pan capabilities

---

## 📊 Data Source

All data is sourced from the **U.S. Energy Information Administration (EIA)** – 2025 release.

- [EIA - Strait of Hormuz](https://www.eia.gov/international/analysis/special-topics/WorldOilTransitChokepoints)
- [EIA - Persian Gulf Oil Exports](https://www.eia.gov/petroleum/)
- [EIA - International Energy Statistics](https://www.eia.gov/international/data/world)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **U.S. Energy Information Administration (EIA)** for providing the 2025 oil flow data
- **Leaflet.js** for the interactive mapping library
- **CARTO** for the dark matter basemap tiles
- **OpenStreetMap** for geographic data

---

## 📧 Contact

**Developer:** Abbas Zafari

- GitHub: [@zafariabbas68](https://github.com/zafariabbas68)
- Project Link: [https://github.com/zafariabbas68/strait-of-hormuz-oil-flows](https://github.com/zafariabbas68/strait-of-hormuz-oil-flows)
- Live Demo: [https://zafariabbas68.github.io/strait-of-hormuz-oil-flows](https://zafariabbas68.github.io/strait-of-hormuz-oil-flows)

---

## ⭐ Show Your Support

If you find this project useful, please consider:
- ⭐ **Starring** this repository on GitHub
- 🍴 **Forking** it to use in your own projects
- 📢 **Sharing** it with others interested in energy visualization

---

**Built with ❤️ using Leaflet.js and HTML5 Canvas**
