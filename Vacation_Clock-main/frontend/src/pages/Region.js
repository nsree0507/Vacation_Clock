import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/tourism/Header';
import Footer from '@/components/tourism/Footer';
import RegionMapClient from '@/components/tourism/RegionMapClient';
import statesData from '@/public/data/states.json';
import { fallbackImage, stateHeroImages } from '@/src/assets/images';
import { MapPin, ArrowLeft, ArrowRight, Clock, Star } from 'lucide-react';
export default function RegionPage() {
    var _a, _b, _c;
    const { region = 'north' } = useParams();
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const selectedRegion = statesData.regions.find((r) => r.id === region);
        if (selectedRegion) {
            setStates(selectedRegion.states);
            setSelectedState(selectedRegion.states[0]);
        }
        else {
            setStates([]);
            setSelectedState(null);
        }
        setLoading(false);
    }, [region]);
    const regionMeta = useMemo(() => {
        return statesData.regions.find((r) => r.id === region) || {
            id: region,
            name: `${region.charAt(0).toUpperCase()}${region.slice(1)} India`,
            description: 'Explore regional highlights and destinations.',
            states: [],
        };
    }, [region]);
    return (_jsxs("main", { className: "min-h-screen bg-background", children: [_jsx(Header, {}), _jsx("section", { className: "pt-32 pb-8 bg-[#0A0A0A]", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [_jsxs(Link, { to: "/destinations", className: "inline-flex items-center gap-2 text-[#888] hover:text-[#C9A96E] transition-colors mb-6", children: [_jsx(ArrowLeft, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm", children: "Back to Destinations" })] }), _jsxs("div", { className: "flex flex-col md:flex-row md:items-end md:justify-between gap-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30 mb-4", children: [_jsx(MapPin, { className: "w-4 h-4 text-[#C9A96E]" }), _jsxs("span", { className: "text-xs uppercase tracking-[0.2em] text-[#C9A96E] font-medium", children: [((_a = regionMeta.states) === null || _a === void 0 ? void 0 : _a.length) || 0, " States"] })] }), _jsxs("h1", { className: "text-4xl md:text-5xl font-serif font-bold text-white mb-2", children: [regionMeta.name.split(' ')[0], " ", _jsx("span", { className: "text-[#C9A96E]", children: "India" })] }), _jsx("p", { className: "text-[#888] max-w-xl", children: regionMeta.description })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "text-center px-4", children: [_jsx("div", { className: "text-2xl font-serif font-bold text-[#C9A96E]", children: ((_b = regionMeta.states) === null || _b === void 0 ? void 0 : _b.length) || 0 }), _jsx("div", { className: "text-xs text-[#888]", children: "States" })] }), _jsx("div", { className: "w-px h-10 bg-[#C9A96E]/20" }), _jsxs("div", { className: "text-center px-4", children: [_jsx("div", { className: "text-2xl font-serif font-bold text-[#C9A96E]", children: "35+" }), _jsx("div", { className: "text-xs text-[#888]", children: "Destinations" })] })] })] })] }) }), _jsx("section", { className: "py-12 bg-[#0A0A0A]", children: _jsx("div", { className: "max-w-7xl mx-auto px-6", children: _jsxs("div", { className: "grid lg:grid-cols-3 gap-6", children: [_jsx("div", { className: "lg:col-span-2", children: _jsx("div", { className: "rounded-xl overflow-hidden border border-[#C9A96E]/20", children: !loading && (_jsx(RegionMapClient, { states: states, center: [28.5, 77.5], zoom: 5, onStateSelect: setSelectedState })) }) }), _jsx("div", { className: "bg-[#141414] rounded-xl border border-[#C9A96E]/20 p-6", children: selectedState ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("span", { className: "px-3 py-1 bg-[#C9A96E]/10 text-[#C9A96E] text-xs font-medium rounded-full", children: [selectedState.region, " India"] }), _jsxs("div", { className: "flex items-center gap-1 text-[#C9A96E]", children: [_jsx(Star, { className: "w-4 h-4 fill-current" }), _jsx("span", { className: "text-sm font-medium", children: "4.8" })] })] }), _jsx("h3", { className: "text-2xl font-serif font-bold text-white mb-3", children: selectedState.name }), _jsx("p", { className: "text-[#888] text-sm leading-relaxed mb-4", children: selectedState.description }), _jsxs("div", { className: "space-y-3 mb-6", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Clock, { className: "w-4 h-4 text-[#C9A96E]" }), _jsxs("span", { className: "text-sm text-[#888]", children: ["Best time: ", selectedState.bestTime] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(MapPin, { className: "w-4 h-4 text-[#C9A96E]" }), _jsxs("span", { className: "text-sm text-[#888]", children: ["Budget: \u20B9", selectedState.avgCost, "/day"] })] })] }), _jsxs("div", { className: "mb-6", children: [_jsx("h4", { className: "text-xs uppercase tracking-wider text-[#888] mb-2", children: "Highlights" }), _jsx("div", { className: "flex flex-wrap gap-2", children: (_c = selectedState.highlights) === null || _c === void 0 ? void 0 : _c.slice(0, 4).map((h, i) => (_jsx("span", { className: "px-2 py-1 bg-[#1F1F1F] text-[#ccc] text-xs rounded", children: h }, i))) })] }), _jsxs(Link, { to: `/state/${selectedState.id}`, className: "w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#C9A96E] text-[#0A0A0A] font-semibold rounded-lg hover:bg-[#E8D5B5] transition-colors", children: ["Explore ", selectedState.name, _jsx(ArrowRight, { className: "w-4 h-4" })] })] })) : (_jsx("div", { className: "text-center text-[#888] py-8", children: "Click on a marker to view state details" })) })] }) }) }), _jsx("section", { className: "py-16 bg-[#141414]", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [_jsx("h2", { className: "text-2xl font-serif font-bold text-white mb-8", children: "All North Indian States" }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: states.map((state) => {
                                var _a;
                                return (_jsxs(Link, { to: `/state/${state.id}`, className: `group p-5 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${(selectedState === null || selectedState === void 0 ? void 0 : selectedState.id) === state.id
                                        ? 'bg-[#C9A96E]/10 border-[#C9A96E]'
                                        : 'bg-[#1F1F1F] border-[#C9A96E]/10 hover:border-[#C9A96E]/40'}`, onClick: (e) => {
                                        e.preventDefault();
                                        setSelectedState(state);
                                        window.scrollTo({ top: 300, behavior: 'smooth' });
                                    }, children: [_jsx("div", { className: "relative h-40 rounded-lg overflow-hidden mb-3", children: [_jsx("img", { src: stateHeroImages[state.id] || fallbackImage, alt: state.name, className: "absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" })] }), _jsx("h3", { className: "font-semibold text-white mb-1 group-hover:text-[#C9A96E] transition-colors", children: state.name }), _jsx("p", { className: "text-xs text-[#888] mb-3 line-clamp-2", children: state.description }), _jsx("div", { className: "flex flex-wrap gap-1", children: (_a = state.highlights) === null || _a === void 0 ? void 0 : _a.slice(0, 2).map((h, i) => (_jsx("span", { className: "text-[10px] px-2 py-0.5 bg-[#C9A96E]/10 text-[#C9A96E] rounded", children: h }, i))) })] }, state.id));
                            }) })] }) }), _jsx(Footer, {})] }));
}
