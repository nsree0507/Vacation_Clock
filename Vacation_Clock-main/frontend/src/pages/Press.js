import { jsx as _jsx } from "react/jsx-runtime";
import InfoPage from '@/components/tourism/InfoPage';
export default function PressPage() {
    return (_jsx(InfoPage, { title: "Press", subtitle: "Media coverage, brand stories, and company updates.", sections: [
            {
                heading: 'Media Kit',
                body: 'Request logos, company information, and leadership background for editorial use.',
            },
            {
                heading: 'Brand Coverage',
                body: 'We share updates about new destinations, premium services, and travel experiences throughout the year.',
            },
        ] }));
}
