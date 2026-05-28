'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Youtube, ArrowUp } from 'lucide-react';
const footerLinks = {
    explore: [
        { name: 'All Destinations', href: '/destinations' },
        { name: 'North India', href: '/destinations/north' },
        { name: 'South India', href: '/destinations/south' },
        { name: 'Northeast India', href: '/destinations/northeast' },
        { name: 'Weekend Getaways', href: '/category/weekend' },
    ],
    categories: [
        { name: 'Adventure', href: '/category/adventure' },
        { name: 'Heritage', href: '/category/heritage' },
        { name: 'Beaches', href: '/category/beaches' },
        { name: 'Wildlife', href: '/category/wildlife' },
        { name: 'Honeymoon', href: '/category/honeymoon' },
    ],
    company: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Team', href: '/about#team' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blog' },
        { name: 'Press', href: '/press' },
    ],
    support: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'FAQs', href: '/faqs' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Cancellation Policy', href: '/cancellation' },
    ],
};
const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://x.com' },
    { name: 'Youtube', icon: Youtube, href: 'https://youtube.com' },
];
export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleNewsletterSubmit = (event) => {
        event.preventDefault();
        if (!email.trim())
            return;
        setIsSubscribed(true);
        setEmail('');
    };
    return (_jsxs("footer", { className: "bg-[#0A0A0A] border-t border-[#C9A96E]/20", children: [_jsx("div", { className: "border-b border-[#C9A96E]/10", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6 py-16", children: [_jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8", children: [_jsxs("div", { className: "max-w-xl", children: [_jsx("h3", { className: "text-2xl md:text-3xl font-serif font-bold text-white mb-3", children: "Subscribe to Our Newsletter" }), _jsx("p", { className: "text-[#888]", children: "Get exclusive travel deals, destination guides, and insider tips delivered to your inbox." })] }), _jsxs("form", { onSubmit: handleNewsletterSubmit, className: "flex flex-col sm:flex-row gap-3 w-full lg:w-auto", children: [_jsx("input", { type: "email", placeholder: "Enter your email", value: email, onChange: (event) => setEmail(event.target.value), className: "px-5 py-3 bg-[#1F1F1F] border border-[#C9A96E]/20 rounded-lg text-white placeholder:text-[#666] focus:outline-none focus:border-[#C9A96E] transition-colors min-w-[280px]", required: true }), _jsx("button", { type: "submit", className: "px-8 py-3 bg-[#C9A96E] text-[#0A0A0A] font-semibold rounded-lg hover:bg-[#E8D5B5] transition-colors", children: isSubscribed ? 'Subscribed' : 'Subscribe' })] })] }), isSubscribed && (_jsx("p", { className: "mt-3 text-sm text-[#C9A96E]", children: "Thank you. You are now subscribed to our newsletter." }))] }) }), _jsx("div", { className: "max-w-7xl mx-auto px-6 py-16", children: _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12", children: [_jsxs("div", { className: "col-span-2", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-3 mb-6", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-[#C9A96E] flex items-center justify-center", children: _jsx("span", { className: "text-[#0A0A0A] font-serif font-bold text-lg", children: "V" }) }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-xl font-serif font-bold text-white", children: "Vacation Clock" }), _jsx("span", { className: "text-[10px] uppercase tracking-[0.2em] text-[#888]", children: "Premium Travel" })] })] }), _jsx("p", { className: "text-[#888] text-sm leading-relaxed mb-6 max-w-xs", children: "Discover India's 28 states across 6 magnificent regions with curated travel experiences, expert guides, and unforgettable memories." }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-3 text-sm text-[#888]", children: [_jsx(MapPin, { className: "w-4 h-4 text-[#C9A96E]" }), _jsx("span", { children: "New Delhi, India" })] }), _jsxs("div", { className: "flex items-center gap-3 text-sm text-[#888]", children: [_jsx(Phone, { className: "w-4 h-4 text-[#C9A96E]" }), _jsx("span", { children: "+91 98765 43210" })] }), _jsxs("div", { className: "flex items-center gap-3 text-sm text-[#888]", children: [_jsx(Mail, { className: "w-4 h-4 text-[#C9A96E]" }), _jsx("span", { children: "info@vacationclock.com" })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-bold text-white uppercase tracking-wider mb-4", children: "Explore" }), _jsx("ul", { className: "space-y-3", children: footerLinks.explore.map((link) => (_jsx("li", { children: _jsx(Link, { to: link.href, className: "text-sm text-[#888] hover:text-[#C9A96E] transition-colors", children: link.name }) }, link.name))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-bold text-white uppercase tracking-wider mb-4", children: "Categories" }), _jsx("ul", { className: "space-y-3", children: footerLinks.categories.map((link) => (_jsx("li", { children: _jsx(Link, { to: link.href, className: "text-sm text-[#888] hover:text-[#C9A96E] transition-colors", children: link.name }) }, link.name))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-bold text-white uppercase tracking-wider mb-4", children: "Company" }), _jsx("ul", { className: "space-y-3", children: footerLinks.company.map((link) => (_jsx("li", { children: _jsx(Link, { to: link.href, className: "text-sm text-[#888] hover:text-[#C9A96E] transition-colors", children: link.name }) }, link.name))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-bold text-white uppercase tracking-wider mb-4", children: "Support" }), _jsx("ul", { className: "space-y-3", children: footerLinks.support.map((link) => (_jsx("li", { children: _jsx(Link, { to: link.href, className: "text-sm text-[#888] hover:text-[#C9A96E] transition-colors", children: link.name }) }, link.name))) })] })] }) }), _jsx("div", { className: "border-t border-[#C9A96E]/10", children: _jsx("div", { className: "max-w-7xl mx-auto px-6 py-6", children: _jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [_jsxs("p", { className: "text-sm text-[#888]", children: ["\u00A9 ", currentYear, " Vacation Clock. All rights reserved."] }), _jsxs("div", { className: "flex items-center gap-6", children: [_jsx("div", { className: "flex items-center gap-4", children: socialLinks.map((social) => {
                                            const Icon = social.icon;
                                            return (_jsx("a", { href: social.href, target: "_blank", rel: "noopener noreferrer", className: "w-9 h-9 rounded-lg bg-[#1F1F1F] flex items-center justify-center text-[#888] hover:bg-[#C9A96E]/20 hover:text-[#C9A96E] transition-all", "aria-label": social.name, children: _jsx(Icon, { className: "w-4 h-4" }) }, social.name));
                                        }) }), _jsx("button", { onClick: scrollToTop, className: "w-9 h-9 rounded-lg bg-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all", "aria-label": "Scroll to top", children: _jsx(ArrowUp, { className: "w-4 h-4" }) })] })] }) }) })] }));
}
