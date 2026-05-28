import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import Header from '@/components/tourism/Header';
import Footer from '@/components/tourism/Footer';
import { Heart, Camera, Users, Shield, Car, Utensils, Sparkles, ArrowRight, CheckCircle, Star, Phone } from 'lucide-react';
const services = [
    {
        icon: Heart,
        name: 'Elderly Care Assistance',
        tagline: 'Compassionate Travel Support',
        description: 'Dedicated caretakers for senior travelers ensuring comfortable, stress-free journeys with medical awareness, mobility assistance, and personalized attention throughout your trip.',
        features: [
            '24/7 dedicated caretaker',
            'Medical emergency preparedness',
            'Wheelchair & mobility support',
            'Special dietary arrangements',
            'Comfortable paced itineraries',
            'Rest stops and comfort breaks'
        ],
        priceFrom: '5,000',
        popular: true
    },
    {
        icon: Camera,
        name: 'Professional Photography',
        tagline: 'Capture Every Moment',
        description: 'Expert photographers accompany you to capture stunning memories. From candid shots to professional portraits at iconic landmarks, we ensure your journey is beautifully documented.',
        features: [
            'Professional photographer',
            'High-resolution images',
            'Drone photography available',
            'Same-day photo previews',
            'Edited album delivery',
            'Social media ready shots'
        ],
        priceFrom: '8,000',
        popular: true
    },
    {
        icon: Users,
        name: 'Private Tour Guide',
        tagline: 'Expert Local Insights',
        description: 'Knowledgeable local guides who bring destinations to life with stories, history, and hidden gems. Multi-lingual guides available for personalized experiences.',
        features: [
            'Certified local experts',
            'Multi-language support',
            'Flexible tour timings',
            'Insider access to attractions',
            'Historical & cultural insights',
            'Skip-the-line benefits'
        ],
        priceFrom: '3,000',
        popular: false
    },
    {
        icon: Car,
        name: 'Luxury Transportation',
        tagline: 'Travel in Style',
        description: 'Premium vehicles with professional chauffeurs for seamless travel. From airport pickups to inter-city transfers, experience comfort and reliability.',
        features: [
            'Luxury vehicle fleet',
            'Professional chauffeurs',
            'Airport transfers',
            'Inter-city travel',
            'WiFi enabled vehicles',
            '24/7 availability'
        ],
        priceFrom: '4,000',
        popular: false
    },
    {
        icon: Utensils,
        name: 'Culinary Experiences',
        tagline: 'Taste Authentic India',
        description: 'Curated food tours, cooking classes, and exclusive dining experiences. Discover regional cuisines with local food experts and master chefs.',
        features: [
            'Local food tours',
            'Cooking classes',
            'Fine dining reservations',
            'Street food adventures',
            'Vegetarian/vegan options',
            'Chef-led experiences'
        ],
        priceFrom: '2,500',
        popular: false
    },
    {
        icon: Shield,
        name: 'Travel Insurance',
        tagline: 'Peace of Mind',
        description: 'Comprehensive travel protection covering medical emergencies, trip cancellations, and unexpected events. Travel with complete peace of mind.',
        features: [
            'Medical coverage',
            'Trip cancellation protection',
            'Lost baggage coverage',
            'Flight delay compensation',
            '24/7 emergency assistance',
            'COVID-19 coverage'
        ],
        priceFrom: '500',
        popular: false
    }
];
export default function ServicesPage() {
    return (_jsxs("main", { className: "min-h-screen bg-background", children: [_jsx(Header, {}), _jsxs("section", { className: "pt-32 pb-20 bg-gradient-to-b from-[#141414] to-[#0A0A0A] relative overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0 opacity-5", children: [_jsx("div", { className: "absolute top-0 left-1/4 w-96 h-96 bg-[#C9A96E] rounded-full blur-[120px]" }), _jsx("div", { className: "absolute bottom-0 right-1/4 w-96 h-96 bg-[#C9A96E] rounded-full blur-[120px]" })] }), _jsxs("div", { className: "max-w-7xl mx-auto px-6 relative", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 bg-[#C9A96E]/10 rounded-full text-[#C9A96E] text-sm mb-6", children: [_jsx(Sparkles, { className: "w-4 h-4" }), "Premium Add-Ons"] }), _jsx("h1", { className: "text-4xl md:text-6xl font-serif font-bold text-white mb-6", children: "Special Services" }), _jsx("p", { className: "text-lg text-[#888] max-w-2xl mx-auto", children: "Enhance your travel experience with our curated premium services. From elderly care to professional photography, we have got everything to make your trip extraordinary." })] }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto", children: [
                                    { value: '500+', label: 'Happy Families' },
                                    { value: '50+', label: 'Professional Guides' },
                                    { value: '24/7', label: 'Support Available' },
                                    { value: '4.9', label: 'Average Rating' },
                                ].map((stat, idx) => (_jsxs("div", { className: "text-center p-4 bg-[#141414] rounded-xl border border-[#C9A96E]/10", children: [_jsx("div", { className: "text-2xl font-bold text-[#C9A96E]", children: stat.value }), _jsx("div", { className: "text-sm text-[#888]", children: stat.label })] }, idx))) })] })] }), _jsx("section", { className: "py-20 bg-[#0A0A0A]", children: _jsx("div", { className: "max-w-7xl mx-auto px-6", children: _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: services.map((service, idx) => (_jsxs("div", { className: `group relative bg-[#141414] rounded-2xl p-6 border transition-all duration-300 hover:border-[#C9A96E]/50 ${service.popular ? 'border-[#C9A96E]/30' : 'border-[#C9A96E]/10'}`, children: [service.popular && (_jsx("div", { className: "absolute -top-3 left-6 px-3 py-1 bg-[#C9A96E] text-[#0A0A0A] text-xs font-bold rounded-full", children: "Most Popular" })), _jsx("div", { className: "w-14 h-14 rounded-xl bg-[#C9A96E]/10 flex items-center justify-center mb-4 group-hover:bg-[#C9A96E]/20 transition-colors", children: _jsx(service.icon, { className: "w-7 h-7 text-[#C9A96E]" }) }), _jsx("h3", { className: "text-xl font-serif font-bold text-white mb-1", children: service.name }), _jsx("p", { className: "text-sm text-[#C9A96E] mb-3", children: service.tagline }), _jsx("p", { className: "text-sm text-[#888] mb-6 line-clamp-3", children: service.description }), _jsxs("div", { className: "space-y-2 mb-6", children: [service.features.slice(0, 4).map((feature, fIdx) => (_jsxs("div", { className: "flex items-center gap-2 text-sm text-[#ccc]", children: [_jsx(CheckCircle, { className: "w-4 h-4 text-[#C9A96E] flex-shrink-0" }), feature] }, fIdx))), service.features.length > 4 && (_jsxs("p", { className: "text-xs text-[#888] pl-6", children: ["+", service.features.length - 4, " more features"] }))] }), _jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-[#C9A96E]/10", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs text-[#888]", children: "Starting from" }), _jsxs("p", { className: "text-lg font-bold text-white", children: [_jsxs("span", { className: "text-[#C9A96E]", children: ["\u20B9", service.priceFrom] }), _jsx("span", { className: "text-sm text-[#888] font-normal", children: "/day" })] })] }), _jsxs(Link, { to: "/contact", className: "inline-flex items-center gap-2 px-4 py-2 bg-[#C9A96E]/10 text-[#C9A96E] rounded-lg hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all text-sm font-medium", children: ["Enquire", _jsx(ArrowRight, { className: "w-4 h-4" })] })] })] }, idx))) }) }) }), _jsx("section", { className: "py-20 bg-[#141414]", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl font-serif font-bold text-white mb-4", children: "What Our Guests Say" }), _jsx("p", { className: "text-[#888]", children: "Real experiences from real travelers" })] }), _jsx("div", { className: "grid md:grid-cols-2 gap-6 max-w-4xl mx-auto", children: [
                                {
                                    quote: "The elderly care service was exceptional. My parents felt completely at ease, and the caretaker was incredibly attentive throughout our Rajasthan trip.",
                                    author: "Priya Sharma",
                                    location: "Mumbai",
                                    service: "Elderly Care"
                                },
                                {
                                    quote: "Our photographer captured moments we would have missed otherwise. The photos are absolutely stunning and worth every penny!",
                                    author: "Rahul & Neha",
                                    location: "Bangalore",
                                    service: "Photography"
                                }
                            ].map((testimonial, idx) => (_jsxs("div", { className: "bg-[#1F1F1F] rounded-xl p-6 border border-[#C9A96E]/10", children: [_jsx("div", { className: "flex items-center gap-1 mb-4", children: [...Array(5)].map((_, i) => (_jsx(Star, { className: "w-4 h-4 fill-[#C9A96E] text-[#C9A96E]" }, i))) }), _jsxs("p", { className: "text-white/90 mb-6 italic", children: ["\u201C", testimonial.quote, "\u201D"] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-white font-medium", children: testimonial.author }), _jsx("p", { className: "text-sm text-[#888]", children: testimonial.location })] }), _jsx("span", { className: "px-3 py-1 bg-[#C9A96E]/10 text-[#C9A96E] text-xs rounded-full", children: testimonial.service })] })] }, idx))) })] }) }), _jsx("section", { className: "py-20 bg-gradient-to-r from-[#C9A96E]/10 via-[#0A0A0A] to-[#C9A96E]/10", children: _jsxs("div", { className: "max-w-4xl mx-auto px-6 text-center", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-serif font-bold text-white mb-4", children: "Ready to Enhance Your Journey?" }), _jsx("p", { className: "text-lg text-[#888] mb-8", children: "Speak with our travel experts to customize the perfect combination of services for your trip." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsxs(Link, { to: "/contact", className: "inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A96E] text-[#0A0A0A] font-semibold rounded-lg hover:bg-[#E8D5B5] transition-colors", children: ["Get in Touch", _jsx(ArrowRight, { className: "w-5 h-5" })] }), _jsxs("a", { href: "tel:+919999999999", className: "inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-[#C9A96E]/30 text-[#C9A96E] font-medium rounded-lg hover:bg-[#C9A96E]/10 transition-colors", children: [_jsx(Phone, { className: "w-5 h-5" }), "Call Us Now"] })] })] }) }), _jsx(Footer, {})] }));
}
