import { jsx as _jsx } from "react/jsx-runtime";
import InfoPage from '@/components/tourism/InfoPage';
export default function FaqsPage() {
    return (_jsx(InfoPage, { title: "Frequently Asked Questions", subtitle: "Quick answers to the questions travelers ask most often.", sections: [
            {
                heading: 'Booking Process',
                body: 'Submit your trip details and our team will reach out with a tailored itinerary and pricing within 24 hours.',
            },
            {
                heading: 'Trip Support',
                body: 'Our team helps with planning, logistics, and on-trip assistance so your journey stays smooth from start to finish.',
            },
        ] }));
}
