'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
const goldIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#C9A96E" width="32" height="32">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});
export default function StateMapClient({ state }) {
    var _a;
    return (_jsx("div", { className: "h-[300px] relative", children: _jsxs(MapContainer, { center: [state.latitude, state.longitude], zoom: 7, style: { height: '100%', width: '100%' }, scrollWheelZoom: false, children: [_jsx(TileLayer, { attribution: '\u00A9 <a href="https://carto.com/">CARTO</a>', url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" }), _jsx(Marker, { position: [state.latitude, state.longitude], icon: goldIcon, children: _jsx(Popup, { children: _jsxs("div", { className: "text-center", children: [_jsx("strong", { className: "text-[#C9A96E]", children: state.name }), _jsxs("p", { className: "text-xs text-white/80 mt-1", children: [((_a = state.attractions) === null || _a === void 0 ? void 0 : _a.length) || 0, "+ attractions"] })] }) }) })] }) }));
}
