import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/tourism/Header';
import Footer from '@/components/tourism/Footer';
import { Calendar, MapPin, Users, Plus, Minus, ArrowRight, Trash2, GripVertical, Clock, CheckCircle, Sparkles } from 'lucide-react';
const popularDestinations = [
    { name: 'Jaipur', state: 'Rajasthan', region: 'North' },
    { name: 'Goa', state: 'Goa', region: 'West' },
    { name: 'Manali', state: 'Himachal Pradesh', region: 'North' },
    { name: 'Kerala', state: 'Kerala', region: 'South' },
    { name: 'Varanasi', state: 'Uttar Pradesh', region: 'North' },
    { name: 'Udaipur', state: 'Rajasthan', region: 'North' },
    { name: 'Darjeeling', state: 'West Bengal', region: 'East' },
    { name: 'Hampi', state: 'Karnataka', region: 'South' },
];
const activitySuggestions = [
    'Sightseeing Tour',
    'Temple Visit',
    'Beach Activities',
    'Mountain Trekking',
    'Local Food Tour',
    'Cultural Experience',
    'Photography Session',
    'Spa & Wellness',
    'Shopping',
    'Sunset Cruise',
    'Wildlife Safari',
    'Heritage Walk',
];
export default function ItineraryBuilderPage() {
    const [tripName, setTripName] = useState('');
    const [travelers, setTravelers] = useState(2);
    const [startDate, setStartDate] = useState('');
    const [saveMessage, setSaveMessage] = useState('');
    const [itinerary, setItinerary] = useState([
        { id: 1, location: '', activities: [] }
    ]);
    const addDay = () => {
        setItinerary([
            ...itinerary,
            { id: Date.now(), location: '', activities: [] }
        ]);
    };
    const removeDay = (id) => {
        if (itinerary.length > 1) {
            setItinerary(itinerary.filter(day => day.id !== id));
        }
    };
    const updateDayLocation = (id, location) => {
        setItinerary(itinerary.map(day => day.id === id ? Object.assign(Object.assign({}, day), { location }) : day));
    };
    const toggleActivity = (dayId, activity) => {
        setItinerary(itinerary.map(day => {
            if (day.id === dayId) {
                const activities = day.activities.includes(activity)
                    ? day.activities.filter(a => a !== activity)
                    : [...day.activities, activity];
                return Object.assign(Object.assign({}, day), { activities });
            }
            return day;
        }));
    };
    const saveItinerary = () => {
        try {
            const payload = {
                tripName: tripName || 'My India Adventure',
                travelers,
                startDate,
                itinerary,
                savedAt: new Date().toISOString(),
            };
            localStorage.setItem('vacation-clock-itinerary', JSON.stringify(payload));
            setSaveMessage('Itinerary saved locally on this device.');
            setTimeout(() => setSaveMessage(''), 2500);
        }
        catch (_a) {
            setSaveMessage('Unable to save itinerary. Please try again.');
            setTimeout(() => setSaveMessage(''), 2500);
        }
    };
    return (_jsxs("main", { className: "min-h-screen bg-background", children: [_jsx(Header, {}), _jsx("section", { className: "pt-32 pb-16 bg-gradient-to-b from-[#141414] to-[#0A0A0A]", children: _jsx("div", { className: "max-w-7xl mx-auto px-6", children: _jsxs("div", { className: "text-center mb-12", children: [_jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 bg-[#C9A96E]/10 rounded-full text-[#C9A96E] text-sm mb-6", children: [_jsx(Sparkles, { className: "w-4 h-4" }), "Build Your Dream Trip"] }), _jsx("h1", { className: "text-4xl md:text-6xl font-serif font-bold text-white mb-4", children: "Itinerary Builder" }), _jsx("p", { className: "text-lg text-[#888] max-w-2xl mx-auto", children: "Create your perfect India adventure day by day. Select destinations, add activities, and let us turn your dream trip into reality." })] }) }) }), _jsx("section", { className: "py-16 bg-[#0A0A0A]", children: _jsx("div", { className: "max-w-7xl mx-auto px-6", children: _jsxs("div", { className: "grid lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "lg:col-span-2 space-y-6", children: [_jsxs("div", { className: "bg-[#141414] rounded-xl p-6 border border-[#C9A96E]/10", children: [_jsx("h2", { className: "text-xl font-serif font-bold text-white mb-6", children: "Trip Details" }), _jsxs("div", { className: "grid md:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm text-[#888] mb-2", children: "Trip Name" }), _jsx("input", { type: "text", value: tripName, onChange: (e) => setTripName(e.target.value), placeholder: "My India Adventure", className: "w-full px-4 py-3 bg-[#1F1F1F] border border-[#C9A96E]/20 rounded-lg text-white placeholder-[#666] focus:border-[#C9A96E] focus:outline-none transition-colors" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm text-[#888] mb-2", children: "Start Date" }), _jsxs("div", { className: "relative", children: [_jsx(Calendar, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#888]" }), _jsx("input", { type: "date", value: startDate, onChange: (e) => setStartDate(e.target.value), className: "w-full pl-10 pr-4 py-3 bg-[#1F1F1F] border border-[#C9A96E]/20 rounded-lg text-white focus:border-[#C9A96E] focus:outline-none transition-colors" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm text-[#888] mb-2", children: "Travelers" }), _jsxs("div", { className: "flex items-center gap-3 px-4 py-2 bg-[#1F1F1F] border border-[#C9A96E]/20 rounded-lg", children: [_jsx("button", { onClick: () => setTravelers(Math.max(1, travelers - 1)), className: "w-8 h-8 rounded-lg bg-[#C9A96E]/10 flex items-center justify-center text-[#C9A96E] hover:bg-[#C9A96E]/20 transition-colors", children: _jsx(Minus, { className: "w-4 h-4" }) }), _jsxs("div", { className: "flex-1 text-center", children: [_jsx(Users, { className: "w-5 h-5 text-[#888] mx-auto mb-1" }), _jsx("span", { className: "text-white font-medium", children: travelers })] }), _jsx("button", { onClick: () => setTravelers(travelers + 1), className: "w-8 h-8 rounded-lg bg-[#C9A96E]/10 flex items-center justify-center text-[#C9A96E] hover:bg-[#C9A96E]/20 transition-colors", children: _jsx(Plus, { className: "w-4 h-4" }) })] })] })] })] }), itinerary.map((day, index) => (_jsxs("div", { className: "bg-[#141414] rounded-xl p-6 border border-[#C9A96E]/10", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-[#C9A96E] flex items-center justify-center text-[#0A0A0A] font-bold", children: index + 1 }), _jsxs("h3", { className: "text-lg font-serif font-bold text-white", children: ["Day ", index + 1] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { type: "button", title: "Drag support coming soon", className: "p-2 text-[#888] hover:text-white transition-colors", children: _jsx(GripVertical, { className: "w-5 h-5" }) }), itinerary.length > 1 && (_jsx("button", { onClick: () => removeDay(day.id), className: "p-2 text-[#888] hover:text-red-400 transition-colors", children: _jsx(Trash2, { className: "w-5 h-5" }) }))] })] }), _jsxs("div", { className: "mb-6", children: [_jsx("label", { className: "block text-sm text-[#888] mb-2", children: "Destination" }), _jsxs("div", { className: "relative", children: [_jsx(MapPin, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#888]" }), _jsxs("select", { value: day.location, onChange: (e) => updateDayLocation(day.id, e.target.value), className: "w-full pl-10 pr-4 py-3 bg-[#1F1F1F] border border-[#C9A96E]/20 rounded-lg text-white focus:border-[#C9A96E] focus:outline-none transition-colors appearance-none cursor-pointer", children: [_jsx("option", { value: "", children: "Select a destination" }), popularDestinations.map((dest) => (_jsxs("option", { value: dest.name, children: [dest.name, ", ", dest.state] }, dest.name)))] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm text-[#888] mb-3", children: "Activities" }), _jsx("div", { className: "flex flex-wrap gap-2", children: activitySuggestions.map((activity) => (_jsxs("button", { onClick: () => toggleActivity(day.id, activity), className: `px-3 py-2 text-sm rounded-lg transition-all ${day.activities.includes(activity)
                                                                ? 'bg-[#C9A96E] text-[#0A0A0A] font-medium'
                                                                : 'bg-[#1F1F1F] text-[#888] hover:text-white hover:bg-[#2F2F2F]'}`, children: [day.activities.includes(activity) && (_jsx(CheckCircle, { className: "w-4 h-4 inline mr-1" })), activity] }, activity))) })] })] }, day.id))), _jsxs("button", { onClick: addDay, className: "w-full py-4 border-2 border-dashed border-[#C9A96E]/30 rounded-xl text-[#C9A96E] font-medium hover:border-[#C9A96E] hover:bg-[#C9A96E]/5 transition-all flex items-center justify-center gap-2", children: [_jsx(Plus, { className: "w-5 h-5" }), "Add Another Day"] })] }), _jsx("div", { className: "lg:col-span-1", children: _jsxs("div", { className: "bg-[#141414] rounded-xl p-6 border border-[#C9A96E]/20 sticky top-28", children: [_jsx("h3", { className: "text-lg font-serif font-bold text-white mb-6", children: "Trip Summary" }), _jsxs("div", { className: "space-y-4 mb-6", children: [_jsxs("div", { className: "flex items-center justify-between py-3 border-b border-[#C9A96E]/10", children: [_jsx("span", { className: "text-[#888]", children: "Trip Name" }), _jsx("span", { className: "text-white font-medium", children: tripName || 'Not set' })] }), _jsxs("div", { className: "flex items-center justify-between py-3 border-b border-[#C9A96E]/10", children: [_jsx("span", { className: "text-[#888]", children: "Duration" }), _jsxs("span", { className: "text-white font-medium", children: [itinerary.length, " Days"] })] }), _jsxs("div", { className: "flex items-center justify-between py-3 border-b border-[#C9A96E]/10", children: [_jsx("span", { className: "text-[#888]", children: "Travelers" }), _jsxs("span", { className: "text-white font-medium", children: [travelers, " People"] })] }), _jsxs("div", { className: "flex items-center justify-between py-3 border-b border-[#C9A96E]/10", children: [_jsx("span", { className: "text-[#888]", children: "Destinations" }), _jsxs("span", { className: "text-white font-medium", children: [itinerary.filter(d => d.location).length, " Places"] })] })] }), itinerary.filter(d => d.location).length > 0 && (_jsxs("div", { className: "mb-6", children: [_jsx("p", { className: "text-sm text-[#888] mb-3", children: "Your Journey" }), _jsx("div", { className: "space-y-2", children: itinerary.filter(d => d.location).map((day, idx) => (_jsxs("div", { className: "flex items-center gap-3 p-3 bg-[#1F1F1F] rounded-lg", children: [_jsx("div", { className: "w-6 h-6 rounded-full bg-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E] text-xs font-bold", children: idx + 1 }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm text-white font-medium", children: day.location }), _jsxs("p", { className: "text-xs text-[#888]", children: [day.activities.length, " activities"] })] })] }, day.id))) })] })), _jsxs("div", { className: "p-4 bg-gradient-to-r from-[#C9A96E]/10 to-transparent rounded-lg mb-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Clock, { className: "w-4 h-4 text-[#C9A96E]" }), _jsx("span", { className: "text-sm text-[#888]", children: "Estimated Budget" })] }), _jsx("div", { className: "pricing-blur text-2xl font-bold text-[#C9A96E]", children: "\u20B9XX,XXX - \u20B9XX,XXX" }), _jsx("p", { className: "text-xs text-[#888] mt-1", children: "Contact us for exact pricing" })] }), _jsxs(Link, { to: "/contact", className: "w-full inline-flex items-center justify-center gap-2 px-4 py-4 bg-[#C9A96E] text-[#0A0A0A] font-semibold rounded-lg hover:bg-[#E8D5B5] transition-colors mb-3", children: ["Get Custom Quote", _jsx(ArrowRight, { className: "w-4 h-4" })] }), _jsx("button", { onClick: saveItinerary, className: "w-full px-4 py-3 bg-transparent border border-[#C9A96E]/30 text-[#C9A96E] font-medium rounded-lg hover:bg-[#C9A96E]/10 transition-colors", children: "Save Itinerary" }), saveMessage && (_jsx("p", { className: "mt-3 text-center text-sm text-[#C9A96E]", children: saveMessage }))] }) })] }) }) }), _jsx(Footer, {})] }));
}
