'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowRight, Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bannerImages } from '@/src/assets/images';
const heroImages = [
    { url: bannerImages.north[0], title: 'Delhi, North India' },
    { url: bannerImages.north[1], title: 'Uttar Pradesh, North India' },
    { url: bannerImages.north[2], title: 'Himachal Pradesh, North India' },
    { url: bannerImages.north[3], title: 'Rajasthan, North India' },
];
export default function Hero() {
    const [currentImage, setCurrentImage] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);
    return (_jsxs("section", { className: "relative min-h-screen flex items-center justify-center overflow-hidden", children: [heroImages.map((image, index) => (_jsxs("div", { className: `absolute inset-0 transition-opacity duration-1000 ${index === currentImage ? 'opacity-100' : 'opacity-0'}`, children: [_jsx("div", { className: "absolute inset-0 bg-cover bg-center", style: { backgroundImage: `url(${image.url})` } }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/50 to-[#0A0A0A]" })] }, index))), _jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-6 py-32 text-center", children: [_jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30 mb-8 animate-fade-in-up", children: [_jsx("span", { className: "w-2 h-2 rounded-full bg-[#C9A96E] animate-pulse" }), _jsx("span", { className: "text-xs uppercase tracking-[0.2em] text-[#C9A96E] font-medium", children: "Discover Extraordinary India" })] }), _jsxs("h1", { className: "text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight animate-fade-in-up", style: { animationDelay: '0.1s' }, children: ["Explore India's", ' ', _jsx("span", { className: "text-[#C9A96E]", children: "28 States" }), _jsx("br", {}), _jsx("span", { className: "text-3xl md:text-5xl lg:text-6xl text-[#E8D5B5]/80", children: "Across 6 Magnificent Regions" })] }), _jsx("p", { className: "text-lg md:text-xl text-[#aaa] max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up", style: { animationDelay: '0.2s' }, children: "Curated travel experiences through India's most beautiful destinations with expert guides, luxury accommodations, and unforgettable memories waiting to be made." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up", style: { animationDelay: '0.3s' }, children: [_jsxs("a", { href: "#explore", className: "inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A96E] text-[#0A0A0A] font-semibold rounded-lg hover:bg-[#E8D5B5] transition-all duration-300 group", children: ["Start Exploring", _jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })] }), _jsxs(Link, { to: "/itinerary", className: "inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300 group", children: [_jsx(Play, { className: "w-5 h-5" }), "Build Itinerary"] })] }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in-up", style: { animationDelay: '0.4s' }, children: [
                            { value: '28', label: 'States' },
                            { value: '6', label: 'Regions' },
                            { value: '1000+', label: 'Destinations' },
                            { value: '50K+', label: 'Happy Travelers' },
                        ].map((stat) => (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl md:text-4xl font-serif font-bold text-[#C9A96E] mb-2", children: stat.value }), _jsx("div", { className: "text-xs uppercase tracking-[0.15em] text-[#888]", children: stat.label })] }, stat.label))) }), _jsx("div", { className: "absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2", children: heroImages.map((_, index) => (_jsx("button", { onClick: () => setCurrentImage(index), className: `w-12 h-1 rounded-full transition-all duration-300 ${index === currentImage ? 'bg-[#C9A96E]' : 'bg-white/30 hover:bg-white/50'}` }, index))) })] }), _jsxs("div", { className: "absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2 text-[#888]", children: [_jsx("span", { className: "text-xs uppercase tracking-wider rotate-90 origin-center translate-x-4", children: "Scroll" }), _jsx("div", { className: "w-px h-12 bg-gradient-to-b from-[#C9A96E] to-transparent" })] })] }));
}
