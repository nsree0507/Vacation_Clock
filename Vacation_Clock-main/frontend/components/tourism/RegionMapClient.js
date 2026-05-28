'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
const customIcon = new Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#C9A96E" width="36" height="36">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `),
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
});
export default function RegionMapClient({ states, center, zoom, onStateSelect }) {
    return (_jsxs(MapContainer, { center: center, zoom: zoom, scrollWheelZoom: true, style: { height: '400px', width: '100%' }, className: "z-0", children: [_jsx(TileLayer, { attribution: '\u00A9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>', url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" }), states.map((state) => (_jsx(Marker, { position: [state.latitude, state.longitude], icon: customIcon, eventHandlers: {
                    click: () => onStateSelect === null || onStateSelect === void 0 ? void 0 : onStateSelect(state)
                }, children: _jsx(Popup, { children: _jsxs("div", { className: "min-w-[180px] p-2", children: [_jsx("h3", { className: "font-bold text-base mb-1 text-[#C9A96E]", children: state.name }), _jsxs("p", { className: "text-xs text-[#888] mb-2", children: [state.region, " India"] }), _jsx("p", { className: "text-sm text-[#ccc] line-clamp-2", children: state.description })] }) }) }, state.id)))] }));
}
