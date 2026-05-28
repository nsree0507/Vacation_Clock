import { jsx as _jsx } from "react/jsx-runtime";
import InfoPage from '@/components/tourism/InfoPage';
export default function TermsPage() {
    return (_jsx(InfoPage, { title: "Terms of Service", subtitle: "The rules that shape how bookings, service requests, and travel support are handled.", sections: [
            {
                heading: 'Service Scope',
                body: 'Vacation Clock arranges travel experiences, accommodations, transfers, and support services as described in your package.',
            },
            {
                heading: 'Traveler Responsibilities',
                body: 'Travelers are responsible for accurate personal details, timely communication, and compliance with destination requirements.',
            },
        ] }));
}
