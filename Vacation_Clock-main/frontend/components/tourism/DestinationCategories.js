'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Building2, Mountain, TreePine, Castle, Users, Crown, Heart, Umbrella, PawPrint, Palette, ArrowRight } from 'lucide-react';
import { categoryImages } from '@/src/assets/images';
const categories = [
    {
        id: 'devotional',
        name: 'Devotional',
        icon: Building2,
        description: 'Sacred temples, churches, and pilgrimage sites',
        count: 45,
           image: categoryImages.devotional
    },
    {
        id: 'adventure',
        name: 'Adventure',
        icon: Mountain,
        description: 'Trekking, rafting, and thrilling experiences',
        count: 38,
           image: categoryImages.adventure
    },
    {
        id: 'nature',
        name: 'Nature',
        icon: TreePine,
        description: 'Hills, waterfalls, and scenic landscapes',
        count: 62,
           image: categoryImages.nature
    },
    {
        id: 'heritage',
        name: 'Heritage',
        icon: Castle,
        description: 'Historical monuments, forts, and palaces',
        count: 51,
           image: categoryImages.heritage
    },
    {
        id: 'family',
        name: 'Family Trips',
        icon: Users,
        description: 'Resorts and family-friendly attractions',
        count: 34,
           image: categoryImages.family
    },
    {
        id: 'luxury',
        name: 'Luxury',
        icon: Crown,
        description: 'Premium resorts and VIP services',
        count: 28,
           image: categoryImages.luxury
    },
    {
        id: 'honeymoon',
        name: 'Honeymoon',
        icon: Heart,
        description: 'Romantic getaways for couples',
        count: 42,
           image: categoryImages.honeymoon
    },
    {
        id: 'beaches',
        name: 'Beaches',
        icon: Umbrella,
        description: 'Coastal paradises and seaside retreats',
        count: 25,
           image: categoryImages.beaches
    },
    {
        id: 'wildlife',
        name: 'Wildlife',
        icon: PawPrint,
        description: 'National parks and safari experiences',
        count: 32,
           image: categoryImages.wildlife
    },
    {
        id: 'culture',
        name: 'Culture',
        icon: Palette,
        description: 'Arts, festivals, and local traditions',
        count: 48,
           image: categoryImages.culture
    },
];
export default function DestinationCategories() {
    return (_jsx("section", { className: "py-24 bg-[#0A0A0A]", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-end md:justify-between mb-12", children: [_jsxs("div", { children: [_jsx("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30 mb-6", children: _jsx("span", { className: "text-xs uppercase tracking-[0.2em] text-[#C9A96E] font-medium", children: "Browse by Interest" }) }), _jsxs("h2", { className: "text-4xl md:text-5xl font-serif font-bold text-white mb-4", children: ["Destination ", _jsx("span", { className: "text-[#C9A96E]", children: "Categories" })] }), _jsx("p", { className: "text-lg text-[#888] max-w-xl", children: "Explore India by the experiences you're looking for. From spiritual journeys to adventure trails." })] }), _jsxs(Link, { to: "/categories", className: "hidden md:inline-flex items-center gap-2 text-[#C9A96E] hover:text-[#E8D5B5] transition-colors group mt-4 md:mt-0", children: [_jsx("span", { className: "text-sm uppercase tracking-wider font-medium", children: "View All Categories" }), _jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8", children: categories.slice(0, 3).map((category) => {
                        const Icon = category.icon;
                        return (_jsxs(Link, { to: `/category/${category.id}`, className: "group relative h-80 rounded-xl overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110", style: { backgroundImage: `url(${category.image})` } }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" }), _jsxs("div", { className: "absolute inset-0 p-6 flex flex-col justify-end", children: [_jsx("div", { className: "w-12 h-12 rounded-lg bg-[#C9A96E] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform", children: _jsx(Icon, { className: "w-6 h-6 text-[#0A0A0A]" }) }), _jsx("h3", { className: "text-2xl font-serif font-bold text-white mb-2 group-hover:text-[#C9A96E] transition-colors", children: category.name }), _jsx("p", { className: "text-[#aaa] text-sm mb-3", children: category.description }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "text-xs text-[#C9A96E]", children: [category.count, " Destinations"] }), _jsx(ArrowRight, { className: "w-5 h-5 text-[#C9A96E] group-hover:translate-x-2 transition-transform" })] })] })] }, category.id));
                    }) }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3", children: categories.slice(3).map((category) => {
                        const Icon = category.icon;
                        return (_jsxs(Link, { to: `/category/${category.id}`, className: "group p-4 bg-[#141414] rounded-xl border border-[#C9A96E]/10 hover:border-[#C9A96E]/40 hover:bg-[#1F1F1F] transition-all duration-300", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx(Icon, { className: "w-5 h-5 text-[#C9A96E]" }), _jsx("span", { className: "text-white font-medium text-sm group-hover:text-[#C9A96E] transition-colors", children: category.name })] }), _jsxs("p", { className: "text-xs text-[#888]", children: [category.count, " Places"] })] }, category.id));
                    }) }), _jsx("div", { className: "text-center mt-8 md:hidden", children: _jsxs(Link, { to: "/categories", className: "inline-flex items-center gap-2 text-[#C9A96E] hover:text-[#E8D5B5] transition-colors group", children: [_jsx("span", { className: "text-sm uppercase tracking-wider font-medium", children: "View All Categories" }), _jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })] }) })] }) }));
}
