import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import Header from '@/components/tourism/Header';
import Footer from '@/components/tourism/Footer';
import statesData from '@/public/data/states.json';
import { ArrowRight } from 'lucide-react';
import { categoryImages } from '@/src/assets/images';
const categoryMeta = {
    devotional: { title: 'Devotional', description: 'Temples, pilgrimages, and sacred routes.' },
    adventure: { title: 'Adventure', description: 'Treks, rafting, climbing, and outdoor thrills.' },
    nature: { title: 'Nature', description: 'Forests, hills, waterfalls, and scenic trails.' },
    beaches: { title: 'Beaches', description: 'Coastal escapes, islands, and waterfront stays.' },
    heritage: { title: 'Heritage', description: 'Forts, palaces, and historical architecture.' },
    honeymoon: { title: 'Honeymoon', description: 'Romantic stays and couple-friendly experiences.' },
    luxury: { title: 'Luxury', description: 'Premium properties and curated concierge services.' },
    family: { title: 'Family', description: 'Kid-friendly plans for all age groups.' },
    wildlife: { title: 'Wildlife', description: 'Safaris, sanctuaries, and biodiversity hotspots.' },
    culture: { title: 'Culture', description: 'Festivals, art, cuisine, and local traditions.' },
};
export default function CategoriesPage() {
    const states = statesData.regions.flatMap((region) => region.states);
    const categoryCounts = states.reduce((acc, state) => {
        for (const category of state.categories || []) {
            acc[category] = (acc[category] || 0) + 1;
        }
        return acc;
    }, {});
    const categories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
    return (_jsxs("main", { className: "min-h-screen bg-background", children: [_jsx(Header, {}), _jsx("section", { className: "pt-32 pb-12 bg-[#0A0A0A]", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [_jsxs("h1", { className: "text-4xl md:text-5xl font-serif font-bold text-white mb-4", children: ["Browse by ", _jsx("span", { className: "text-[#C9A96E]", children: "Category" })] }), _jsx("p", { className: "text-lg text-[#888] max-w-2xl", children: "Pick a travel style and discover destinations that match your interests." })] }) }), _jsx("section", { className: "py-16 bg-[#141414]", children: _jsx("div", { className: "max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5", children: categories.map(([category, count]) => {
                        const meta = categoryMeta[category] || {
                            title: category.charAt(0).toUpperCase() + category.slice(1),
                            description: 'Explore destinations in this category.',
                        };
                        return (_jsxs(Link, { to: `/category/${category}`, className: "group rounded-xl border border-[#C9A96E]/20 bg-[#1A1A1A] overflow-hidden hover:border-[#C9A96E]/45 transition-colors", children: [_jsx("div", { className: "relative h-44 overflow-hidden", children: [_jsx("img", { src: categoryImages[category] || categoryImages.culture, alt: meta.title, className: "absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/35 to-transparent" })] }), _jsxs("div", { className: "p-6", children: [_jsx("h2", { className: "text-2xl font-serif font-bold text-white mb-2 group-hover:text-[#C9A96E] transition-colors", children: meta.title }), _jsx("p", { className: "text-[#999] mb-4", children: meta.description }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "text-sm text-[#C9A96E]", children: [count, " states"] }), _jsx(ArrowRight, { className: "w-4 h-4 text-[#C9A96E] group-hover:translate-x-1 transition-transform" })] })] })] }, category));
                    }) }) }), _jsx(Footer, {})] }));
}
