'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Filter } from 'lucide-react';
import statesData from '@/public/data/states.json';
import MapClient from './MapClient';
const regions = [
    { id: 'all', name: 'All Regions', count: 28 },
    { id: 'north', name: 'North India', count: 7 },
    { id: 'south', name: 'South India', count: 6 },
    { id: 'east', name: 'East India', count: 4 },
    { id: 'west', name: 'West India', count: 2 },
    { id: 'central', name: 'Central India', count: 2 },
    { id: 'northeast', name: 'Northeast India', count: 7 },
];
export default function InteractiveMap() {
    const [selectedRegion, setSelectedRegion] = useState('all');
    const states = useMemo(() => statesData.regions.flatMap((region) => region.states), []);
    const filteredStates = selectedRegion === 'all'
        ? states
        : states.filter(s => s.region.toLowerCase() === selectedRegion);
    return (_jsx("section", { id: "explore", className: "py-24 bg-[#0A0A0A]", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30 mb-6", children: [_jsx(MapPin, { className: "w-4 h-4 text-[#C9A96E]" }), _jsx("span", { className: "text-xs uppercase tracking-[0.2em] text-[#C9A96E] font-medium", children: "Interactive Map" })] }), _jsxs("h2", { className: "text-4xl md:text-5xl font-serif font-bold text-white mb-4", children: ["Explore All ", _jsx("span", { className: "text-[#C9A96E]", children: "28 States" })] }), _jsx("p", { className: "text-lg text-[#888] max-w-2xl mx-auto", children: "Click on the map markers to explore each state or filter by region below. Discover unique destinations across India's diverse landscape." })] }), _jsxs("div", { className: "flex items-center justify-center gap-3 mb-8 flex-wrap", children: [_jsx(Filter, { className: "w-4 h-4 text-[#888]" }), regions.map((region) => (_jsxs("button", { onClick: () => setSelectedRegion(region.id), className: `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${selectedRegion === region.id
                                ? 'bg-[#C9A96E] text-[#0A0A0A]'
                                : 'bg-[#1F1F1F] text-[#ccc] hover:bg-[#C9A96E]/20 hover:text-[#C9A96E] border border-[#C9A96E]/20'}`, children: [region.name, _jsxs("span", { className: "ml-1 opacity-60", children: ["(", region.count, ")"] })] }, region.id)))] }), _jsx("div", { className: "rounded-xl overflow-hidden border border-[#C9A96E]/20 mb-12", children: _jsx(MapClient, { states: filteredStates }) }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4", children: filteredStates.slice(0, 12).map((state) => (_jsxs(Link, { to: `/state/${state.id}`, className: "group p-4 bg-[#141414] rounded-lg border border-[#C9A96E]/10 hover:border-[#C9A96E]/40 transition-all duration-300 hover:transform hover:-translate-y-1", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-[#C9A96E]/10 flex items-center justify-center mb-3 group-hover:bg-[#C9A96E]/20 transition-colors", children: _jsx(MapPin, { className: "w-5 h-5 text-[#C9A96E]" }) }), _jsx("h3", { className: "font-semibold text-white text-sm mb-1 group-hover:text-[#C9A96E] transition-colors", children: state.name }), _jsxs("p", { className: "text-xs text-[#888]", children: [state.region, " India"] })] }, state.id))) }), _jsx("div", { className: "text-center mt-8", children: _jsxs(Link, { to: "/destinations", className: "inline-flex items-center gap-2 text-[#C9A96E] hover:text-[#E8D5B5] transition-colors group", children: [_jsx("span", { className: "text-sm uppercase tracking-wider font-medium", children: "View All Destinations" }), _jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })] }) })] }) }));
}
