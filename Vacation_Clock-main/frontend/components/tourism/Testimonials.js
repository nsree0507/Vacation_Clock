'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
const testimonials = [
    {
        id: 1,
        name: 'Priya Sharma',
        location: 'Mumbai, India',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        rating: 5,
        trip: 'Kashmir Paradise Tour',
        text: 'The Kashmir trip exceeded all our expectations! The houseboat stay on Dal Lake was magical, and our guide knew every hidden gem. The caretaker service for my elderly mother was exceptional.',
    },
    {
        id: 2,
        name: 'Rajesh Kumar',
        location: 'Bangalore, India',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        rating: 5,
        trip: 'Royal Rajasthan Experience',
        text: 'An absolutely royal experience! From the palace hotels to the desert safari in Jaisalmer, every moment was curated to perfection. The photography service captured memories we will cherish forever.',
    },
    {
        id: 3,
        name: 'Ananya Patel',
        location: 'Delhi, India',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        rating: 5,
        trip: 'Kerala Backwaters Retreat',
        text: 'Our honeymoon in Kerala was pure bliss. The houseboat cruise through the backwaters, the Ayurvedic spa treatments, and the personalized attention made it unforgettable. Highly recommended!',
    },
    {
        id: 4,
        name: 'Amit Verma',
        location: 'Chennai, India',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        rating: 5,
        trip: 'Ladakh Adventure Expedition',
        text: 'The Ladakh expedition was the adventure of a lifetime! Professional guides, well-maintained vehicles, and the breathtaking landscapes at Pangong Lake left us speechless. Will definitely book again.',
    },
    {
        id: 5,
        name: 'Sneha Reddy',
        location: 'Hyderabad, India',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
        rating: 5,
        trip: 'Northeast Discovery Tour',
        text: 'Exploring the Seven Sisters was a dream come true. The living root bridges in Meghalaya, the tea gardens of Assam, and the warm hospitality everywhere made this trip extraordinary.',
    },
];
export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };
    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };
    return (_jsx("section", { className: "py-24 bg-[#0A0A0A]", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30 mb-6", children: [_jsx(Star, { className: "w-4 h-4 text-[#C9A96E] fill-[#C9A96E]" }), _jsx("span", { className: "text-xs uppercase tracking-[0.2em] text-[#C9A96E] font-medium", children: "Testimonials" })] }), _jsxs("h2", { className: "text-4xl md:text-5xl font-serif font-bold text-white mb-4", children: ["What Our ", _jsx("span", { className: "text-[#C9A96E]", children: "Travelers Say" })] }), _jsx("p", { className: "text-lg text-[#888] max-w-2xl mx-auto", children: "Real experiences from travelers who explored India with us. Their stories inspire our passion for creating exceptional journeys." })] }), _jsxs("div", { className: "relative mb-12", children: [_jsx("div", { className: "absolute -top-8 left-8 text-[#C9A96E]/10", children: _jsx(Quote, { className: "w-32 h-32" }) }), _jsxs("div", { className: "relative bg-gradient-to-br from-[#1F1F1F] to-[#141414] rounded-2xl p-8 md:p-12 border border-[#C9A96E]/20", children: [_jsxs("div", { className: "flex flex-col md:flex-row gap-8 items-start", children: [_jsxs("div", { className: "flex-shrink-0", children: [_jsx("div", { className: "w-20 h-20 rounded-full overflow-hidden border-2 border-[#C9A96E] mb-4", children: _jsx("img", { src: testimonials[currentIndex].avatar, alt: testimonials[currentIndex].name, className: "w-full h-full object-cover" }) }), _jsx("h4", { className: "text-lg font-semibold text-white", children: testimonials[currentIndex].name }), _jsx("p", { className: "text-sm text-[#888]", children: testimonials[currentIndex].location }), _jsx("div", { className: "flex items-center gap-1 mt-2", children: Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (_jsx(Star, { className: "w-4 h-4 text-[#C9A96E] fill-[#C9A96E]" }, i))) })] }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "inline-block px-3 py-1 bg-[#C9A96E]/10 text-[#C9A96E] text-xs font-medium rounded-full mb-4", children: testimonials[currentIndex].trip }), _jsxs("blockquote", { className: "text-xl md:text-2xl text-white leading-relaxed font-light mb-6", children: ["\u201C", testimonials[currentIndex].text, "\u201D"] })] })] }), _jsxs("div", { className: "flex items-center justify-between mt-8 pt-6 border-t border-[#C9A96E]/10", children: [_jsx("div", { className: "flex items-center gap-2", children: testimonials.map((_, idx) => (_jsx("button", { onClick: () => setCurrentIndex(idx), className: `w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'w-8 bg-[#C9A96E]' : 'bg-[#444] hover:bg-[#666]'}` }, idx))) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: prevTestimonial, className: "w-10 h-10 rounded-lg bg-[#1F1F1F] border border-[#C9A96E]/20 flex items-center justify-center text-[#888] hover:bg-[#C9A96E]/20 hover:text-[#C9A96E] transition-all", children: _jsx(ChevronLeft, { className: "w-5 h-5" }) }), _jsx("button", { onClick: nextTestimonial, className: "w-10 h-10 rounded-lg bg-[#1F1F1F] border border-[#C9A96E]/20 flex items-center justify-center text-[#888] hover:bg-[#C9A96E]/20 hover:text-[#C9A96E] transition-all", children: _jsx(ChevronRight, { className: "w-5 h-5" }) })] })] })] })] }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: [
                        { value: '50,000+', label: 'Happy Travelers' },
                        { value: '4.9/5', label: 'Average Rating' },
                        { value: '28', label: 'States Covered' },
                        { value: '500+', label: 'Expert Guides' },
                    ].map((stat) => (_jsxs("div", { className: "text-center p-6 bg-[#141414] rounded-xl border border-[#C9A96E]/10", children: [_jsx("div", { className: "text-3xl md:text-4xl font-serif font-bold text-[#C9A96E] mb-2", children: stat.value }), _jsx("div", { className: "text-sm text-[#888] uppercase tracking-wider", children: stat.label })] }, stat.label))) })] }) }));
}
