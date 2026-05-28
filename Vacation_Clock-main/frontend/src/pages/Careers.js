import { jsx as _jsx } from "react/jsx-runtime";
import InfoPage from '@/components/tourism/InfoPage';
export default function CareersPage() {
    return (_jsx(InfoPage, { title: "Careers", subtitle: "Join a team that designs premium travel experiences with care and detail.", sections: [
            {
                heading: 'Why Work With Us',
                body: 'We value thoughtful service, local expertise, and a strong eye for premium experiences across India.',
            },
            {
                heading: 'Open Roles',
                body: 'We are building future openings for travel consultants, itinerary specialists, and operations support roles.',
            },
        ] }));
}
