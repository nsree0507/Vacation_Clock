'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
// Custom marker icon
const customIcon = new Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#C9A96E" width="32" height="32">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});
export default function MapClient({ states }) {
    // Center of India
    const center = [20.5937, 78.9629];
    return (_jsxs(MapContainer, { center: center, zoom: 5, scrollWheelZoom: true, style: { height: '500px', width: '100%' }, className: "z-0", children: [_jsx(TileLayer, { attribution: '\u00A9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>', url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" }), states.map((state) => (_jsx(Marker, { position: [state.latitude, state.longitude], icon: customIcon, children: _jsx(Popup, { children: _jsxs("div", { className: "min-w-[200px] p-2", children: [_jsx("h3", { className: "font-bold text-base mb-1 text-[#C9A96E]", children: state.name }), _jsxs("p", { className: "text-xs text-[#888] mb-2", children: [state.region, " India"] }), _jsx("p", { className: "text-sm text-[#ccc] mb-3 line-clamp-2", children: state.description }), state.highlights && state.highlights.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-1 mb-3", children: state.highlights.slice(0, 3).map((highlight, idx) => (_jsx("span", { className: "text-[10px] px-2 py-0.5 bg-[#C9A96E]/20 text-[#C9A96E] rounded", children: highlight }, idx))) })), _jsxs(Link, { to: `/state/${state.id}`, className: "text-sm font-medium text-[#C9A96E] hover:text-[#E8D5B5] transition-colors inline-flex items-center gap-1", children: ["Explore ", state.name, " \u2192"] })] }) }) }, state.id)))] }));
}
