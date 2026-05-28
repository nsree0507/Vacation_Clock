import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from '@/components/tourism/Header';
import Hero from '@/components/tourism/Hero';
import InteractiveMap from '@/components/tourism/InteractiveMap';
import DestinationCategories from '@/components/tourism/DestinationCategories';
import FeaturedPackages from '@/components/tourism/FeaturedPackages';
import Services from '@/components/tourism/Services';
import Testimonials from '@/components/tourism/Testimonials';
import Footer from '@/components/tourism/Footer';
export default function HomePage() {
    return (_jsxs("main", { className: "min-h-screen bg-background", children: [_jsx(Header, {}), _jsx(Hero, {}), _jsx(InteractiveMap, {}), _jsx(DestinationCategories, {}), _jsx(FeaturedPackages, {}), _jsx(Services, {}), _jsx(Testimonials, {}), _jsx(Footer, {})] }));
}
