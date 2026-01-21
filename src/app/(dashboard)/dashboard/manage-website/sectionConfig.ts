import { LayoutTemplate, Image, Users, Trophy, BrainCircuit, WalletCards, ImagePlus, MonitorPlay, PanelTop } from 'lucide-react';
import { WebsiteSection } from './types';

export const SECTION_CONFIG = [
    {
        key: 'hero',
        type: 'hero',
        title: 'Hero / CTA Section',
        description: 'Edit the main hero section title, subtitle, and CTA buttons.',
        icon: LayoutTemplate,
    },
    {
        key: 'section-2',
        type: 'section-2', // Separate type to handle specific form logic
        title: 'Section 2 CTA',
        description: 'Manage the secondary CTA section with multiple buttons.',
        icon: PanelTop,
    },
    {
        key: 'section-3',
        type: 'section-3', // Separate type
        title: 'Section 3 CTA',
        description: 'Manage the third CTA section with image.',
        icon: MonitorPlay,
    },
    {
        key: 'banner',
        type: 'banner',
        title: 'Banner Image',
        description: 'Update the main banner image displayed on the website.',
        icon: Image,
    },
    {
        key: 'about-image',
        type: 'about-image',
        title: 'About Us Image',
        description: 'Change the image displayed in the About Us section.',
        icon: ImagePlus,
    },
    {
        key: 'portfolio',
        type: 'portfolio',
        title: 'Portfolio',
        description: 'Manage portfolio items and showcases.',
        icon: WalletCards,
    },
    {
        key: 'team',
        type: 'team',
        title: 'Team Photos',
        description: 'Add or remove team member photos.',
        icon: Users,
    },
    {
        key: 'achievements',
        type: 'achievements',
        title: 'Recent Achievements',
        description: 'Update the recent achievement cards.',
        icon: Trophy,
    },
    {
        key: 'psychometric',
        type: 'psychometric',
        title: 'Psychometric Test',
        description: 'Preview and edit psychometric test questions (UI Only).',
        icon: BrainCircuit,
    },
] as const;
