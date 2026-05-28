import { jsx as _jsx } from "react/jsx-runtime";
import InfoPage from '@/components/tourism/InfoPage';
export default function CancellationPage() {
    return (_jsx(InfoPage, { title: "Cancellation Policy", subtitle: "Clear terms designed to keep planning simple and transparent.", sections: [
            {
                heading: 'Flexible Cancellations',
                body: 'Cancellations are handled according to vendor and timing conditions shared during booking confirmation.',
            },
            {
                heading: 'Refund Timeline',
                body: 'Eligible refunds are processed after confirmation of partner and service charges.',
            },
        ] }));
}
