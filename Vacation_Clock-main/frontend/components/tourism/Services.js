'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { UserCheck, Camera, MapPin, Car, Headphones, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { serviceImages, bannerImages } from '@/src/assets/images';
const services = [
    {
        id: 'caretaker',
        icon: UserCheck,
        title: 'Caretaker Service',
        description: 'Special assistance for elderly travelers and those with special needs. Trained professionals ensuring comfort throughout your journey.',
        features: ['Trained caretakers', '24/7 emergency support', 'Wheelchair assistance', 'Medical coordination'],
        highlighted: true
    },
    {
        id: 'photographer',
        icon: Camera,
        title: 'Photography Service',
        description: 'Professional photographers to capture your travel memories. From drone shots to candid moments.',
        features: ['Personal photographer', 'Drone photography', 'Same-day delivery', 'Video documentation'],
        highlighted: true
    },
    {
        id: 'guide',
        icon: MapPin,
        title: 'Expert Guides',
        description: 'Local experts who bring destinations to life with stories, hidden gems, and authentic experiences.',
        features: ['Multilingual guides', 'Local insights', 'Flexible itineraries', 'Historical expertise'],
        highlighted: false
    },
    {
        id: 'transport',
        icon: Car,
        title: 'Premium Transport',
        description: 'Comfortable and reliable transportation throughout your journey with professional drivers.',
        features: ['Luxury vehicles', 'Professional drivers', 'Airport transfers', 'Interstate travel'],
        highlighted: false
    },
    {
        id: 'support',
        icon: Headphones,
        title: '24/7 Support',
        description: 'Round-the-clock assistance for any queries or emergencies during your trip.',
        features: ['24/7 helpline', 'Emergency response', 'Itinerary changes', 'Local assistance'],
        highlighted: false
    },
    {
        id: 'insurance',
        icon: Shield,
        title: 'Travel Insurance',
        description: 'Comprehensive coverage for a worry-free travel experience across all destinations.',
        features: ['Medical coverage', 'Trip cancellation', 'Lost baggage', 'Emergency evacuation'],
        highlighted: false
    },
];
export default function Services() {
    return (_jsx("section", { id: "services", className: "py-24 bg-gradient-to-b from-[#0A0A0A] to-[#141414]", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30 mb-6", children: _jsx("span", { className: "text-xs uppercase tracking-[0.2em] text-[#C9A96E] font-medium", children: "Our Services" }) }), _jsxs("h2", { className: "text-4xl md:text-5xl font-serif font-bold text-white mb-4", children: ["Premium Travel ", _jsx("span", { className: "text-[#C9A96E]", children: "Services" })] }), _jsx("p", { className: "text-lg text-[#888] max-w-2xl mx-auto", children: "Complete travel solutions designed to make your Indian vacation seamless, comfortable, and truly memorable." })] }), _jsx("div", { className: "grid md:grid-cols-2 gap-6 mb-8", children: services.filter((service) => service.highlighted).map((service) => {
                    const Icon = service.icon;
                    return (_jsxs("div", { className: "group overflow-hidden rounded-2xl border border-[#C9A96E]/20 bg-gradient-to-br from-[#1F1F1F] to-[#141414] transition-all duration-300 hover:border-[#C9A96E]/50", children: [_jsxs("div", { className: "grid md:grid-cols-[1.1fr_0.9fr]", children: [_jsxs("div", { className: "p-8 flex items-start gap-6", children: [_jsx("div", { className: "w-16 h-16 rounded-xl bg-[#C9A96E] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform", children: _jsx(Icon, { className: "w-8 h-8 text-[#0A0A0A]" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-2xl font-serif font-bold text-white mb-3 group-hover:text-[#C9A96E] transition-colors", children: service.title }), _jsx("p", { className: "text-[#aaa] mb-4 leading-relaxed", children: service.description }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: service.features.map((feature, idx) => (_jsxs("div", { className: "flex items-center gap-2 text-sm text-[#888]", children: [_jsx(CheckCircle, { className: "w-4 h-4 text-[#C9A96E]" }), _jsx("span", { children: feature })] }, idx))) })] })] }), _jsxs("div", { className: "relative min-h-[260px] overflow-hidden", children: [_jsx("img", { src: serviceImages[service.id] || bannerImages.services, alt: service.title, className: "absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-l from-[#0A0A0A]/30 via-[#0A0A0A]/45 to-transparent" }), _jsx("div", { className: "absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-[#0A0A0A]/45 px-4 py-3 backdrop-blur-sm", children: _jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-[#E8D5B5]", children: "Premium service experience" }) })] })] })] }, service.id));
                }) }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12", children: services.filter((service) => !service.highlighted).map((service) => {
                    const Icon = service.icon;
                    return (_jsxs("div", { className: "group overflow-hidden rounded-xl border border-[#C9A96E]/10 bg-[#1F1F1F]/50 hover:border-[#C9A96E]/30 hover:bg-[#1F1F1F] transition-all duration-300", children: [_jsx("div", { className: "relative h-32 overflow-hidden", children: [_jsx("img", { src: serviceImages[service.id] || bannerImages.services, alt: service.title, className: "absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" })] }), _jsxs("div", { className: "p-6", children: [_jsx("div", { className: "w-12 h-12 rounded-lg bg-[#C9A96E]/10 flex items-center justify-center mb-4 group-hover:bg-[#C9A96E]/20 transition-colors", children: _jsx(Icon, { className: "w-6 h-6 text-[#C9A96E]" }) }), _jsx("h3", { className: "text-lg font-semibold text-white mb-2 group-hover:text-[#C9A96E] transition-colors", children: service.title }), _jsx("p", { className: "text-sm text-[#888] leading-relaxed", children: service.description })] })] }, service.id));
                }) }), _jsxs("div", { className: "relative rounded-2xl overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-[#C9A96E] to-[#8B6914]" }), _jsx("div", { className: "absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80')] bg-cover bg-center opacity-20" }), _jsxs("div", { className: "relative p-12 text-center", children: [_jsx("h3", { className: "text-3xl md:text-4xl font-serif font-bold text-[#0A0A0A] mb-4", children: "Ready to Explore India?" }), _jsx("p", { className: "text-[#0A0A0A]/80 mb-8 max-w-2xl mx-auto text-lg", children: "Start planning your dream vacation today with our expert team. Get personalized itineraries and exclusive packages tailored to your preferences." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsxs(Link, { to: "/booking", className: "inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0A0A0A] text-white font-semibold rounded-lg hover:bg-[#1F1F1F] transition-all duration-300 group", children: ["Start Planning", _jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })] }), _jsx(Link, { to: "/contact", className: "inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-[#0A0A0A] text-[#0A0A0A] font-semibold rounded-lg hover:bg-[#0A0A0A]/10 transition-all duration-300", children: "Contact Us" })] })] })] })] }) }));
}
