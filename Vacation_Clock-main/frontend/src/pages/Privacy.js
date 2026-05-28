import { jsx as _jsx } from "react/jsx-runtime";
import InfoPage from '@/components/tourism/InfoPage';
export default function PrivacyPage() {
    return (_jsx(InfoPage, { title: "Privacy Policy", subtitle: "How we handle the details you share with us.", sections: [
            {
                heading: 'Data Collection',
                body: 'We use your contact and travel details only to respond to inquiries, prepare bookings, and improve service quality.',
            },
            {
                heading: 'Data Use',
                body: 'We do not sell your information and only share details with partners when needed to deliver your selected services.',
            },
        ] }));
}
