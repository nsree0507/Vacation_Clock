import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import BookingPage from './pages/Booking';
import CategoriesPage from './pages/Categories';
import CategoryPage from './pages/Category';
import ContactPage from './pages/Contact';
import DestinationsPage from './pages/Destinations';
import RegionPage from './pages/Region';
import ItineraryBuilderPage from './pages/Itinerary';
import PackagesPage from './pages/Packages';
import ServicesPage from './pages/Services';
import StateDetailPage from './pages/State';
import BlogPage from './pages/Blog';
import CareersPage from './pages/Careers';
import CancellationPage from './pages/Cancellation';
import FaqsPage from './pages/Faqs';
import PressPage from './pages/Press';
import PrivacyPage from './pages/Privacy';
import TermsPage from './pages/Terms';
function ScrollToTop() {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [location.pathname, location.search, location.hash]);
    return null;
}
export default function App() {
    return (_jsxs(_Fragment, { children: [_jsx(ScrollToTop, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/about", element: _jsx(AboutPage, {}) }), _jsx(Route, { path: "/booking", element: _jsx(BookingPage, {}) }), _jsx(Route, { path: "/categories", element: _jsx(CategoriesPage, {}) }), _jsx(Route, { path: "/category/:category", element: _jsx(CategoryPage, {}) }), _jsx(Route, { path: "/contact", element: _jsx(ContactPage, {}) }), _jsx(Route, { path: "/destinations", element: _jsx(DestinationsPage, {}) }), _jsx(Route, { path: "/destinations/:region", element: _jsx(RegionPage, {}) }), _jsx(Route, { path: "/itinerary", element: _jsx(ItineraryBuilderPage, {}) }), _jsx(Route, { path: "/packages", element: _jsx(PackagesPage, {}) }), _jsx(Route, { path: "/services", element: _jsx(ServicesPage, {}) }), _jsx(Route, { path: "/state/:id", element: _jsx(StateDetailPage, {}) }), _jsx(Route, { path: "/blog", element: _jsx(BlogPage, {}) }), _jsx(Route, { path: "/careers", element: _jsx(CareersPage, {}) }), _jsx(Route, { path: "/faqs", element: _jsx(FaqsPage, {}) }), _jsx(Route, { path: "/cancellation", element: _jsx(CancellationPage, {}) }), _jsx(Route, { path: "/terms", element: _jsx(TermsPage, {}) }), _jsx(Route, { path: "/press", element: _jsx(PressPage, {}) }), _jsx(Route, { path: "/privacy", element: _jsx(PrivacyPage, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] })] }));
}
