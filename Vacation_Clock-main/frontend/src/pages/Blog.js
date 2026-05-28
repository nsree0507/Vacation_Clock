import { jsx as _jsx } from "react/jsx-runtime";
import InfoPage from '@/components/tourism/InfoPage';
export default function BlogPage() {
    return (_jsx(InfoPage, { title: "Travel Blog", subtitle: "Stories, guides, and inspiration from across India.", sections: [
            {
                heading: 'Latest Stories',
                body: 'Explore destination guides, travel tips, and seasonal recommendations curated by our travel team.',
            },
            {
                heading: 'Travel Inspiration',
                body: 'From hidden heritage trails to relaxing beach escapes, our blog helps you plan journeys that feel personal and memorable.',
            },
        ] }));
}
