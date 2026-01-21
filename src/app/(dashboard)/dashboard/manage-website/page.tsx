"use client";

import { useEffect, useState } from 'react';
import { SECTION_CONFIG } from './sectionConfig';
import { SectionCard } from './components/SectionCard';
import { EditModal } from './components/EditModal';
import { WebsiteSection } from './types';
import { websiteApi } from './services/website.api';
import { Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Placeholder forms (will substitute with real ones)
import { CTAForm } from './components/forms/CTAForm';
import { ImageForm } from './components/forms/ImageForm';
import { TeamForm } from './components/forms/TeamForm';
import { AchievementForm } from './components/forms/AchievementForm';
import { PsychometricTabs } from './components/psychometric/Tabs'; // Import UI for Psychometric

export default function ManageWebsitePage() {
    const [sections, setSections] = useState<WebsiteSection[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSection, setSelectedSection] = useState<string | null>(null);

    // Fetch sections
    useEffect(() => {
        fetchSections();
    }, []);

    const fetchSections = async () => {
        try {
            setLoading(true);
            const res = await websiteApi.getAllSections();
            if (res.success) {
                setSections(res.data);
            }
        } catch (error) {
            // Could allow retry here, but keeping it simple
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id: string, data: any) => {
        try {
            await websiteApi.updateSection(id, { content: data });
            await fetchSections(); // Refresh data
            setSelectedSection(null);
        } catch (error) {
            console.error("Failed to update", error);
            throw error; // Let form handle loading state / error display
        }
    };

    const activeConfig = SECTION_CONFIG.find(c => c.key === selectedSection);
    // Ensure we have a valid object or handle creation (if API supported it) - for now assuming read-only if missing
    const activeSectionData = sections.find(s => s.key === selectedSection);

    const renderForm = () => {
        if (!activeConfig) return null;
        // If no data found for this section yet, we pass a dummy ID or handle it. 
        // In a real app we might POST to create it on first save.
        // For this demo, let's assume we pass an empty string and the API might need adjustment or we just block.
        // However, the prompt says "UPDATE section PUT /website/:id", implying they exist.
        // I will safeguard the _id access.
        const sectionId = activeSectionData?._id || 'new';

        if (activeConfig.key === 'psychometric') {
            return <PsychometricTabs />;
        }

        // Pass different props based on type
        switch (activeConfig.type) {
            case 'hero':
                return <CTAForm variant="hero" initialData={activeSectionData?.content} onSave={(data) => handleUpdate(sectionId, data)} onCancel={() => setSelectedSection(null)} />;
            case 'section-2':
                return <CTAForm variant="section-2" initialData={activeSectionData?.content} onSave={(data) => handleUpdate(sectionId, data)} onCancel={() => setSelectedSection(null)} />;
            case 'section-3':
                return <CTAForm variant="section-3" initialData={activeSectionData?.content} onSave={(data) => handleUpdate(sectionId, data)} onCancel={() => setSelectedSection(null)} />;
            case 'banner':
            case 'about-image':
                return <ImageForm initialData={activeSectionData?.content} onSave={(data) => handleUpdate(sectionId, data)} onCancel={() => setSelectedSection(null)} />;
            case 'portfolio':
                return <CTAForm variant="portfolio" initialData={activeSectionData?.content} onSave={(data) => handleUpdate(sectionId, data)} onCancel={() => setSelectedSection(null)} />;
            case 'team':
                return <TeamForm initialData={activeSectionData?.content} onSave={(data) => handleUpdate(sectionId, data)} onCancel={() => setSelectedSection(null)} />;
            case 'achievements':
                return <AchievementForm initialData={activeSectionData?.content} onSave={(data) => handleUpdate(sectionId, data)} onCancel={() => setSelectedSection(null)} />;
            default:
                return <p>Form not implemented for {(activeConfig as any).type}</p>;
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Manage Website</h1>
                <p className="text-muted-foreground">Manage the content for various sections of the website</p>
            </div>

            <Separator />

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SECTION_CONFIG.map((section) => (
                        <SectionCard
                            key={section.key}
                            title={section.title}
                            description={section.description}
                            Icon={section.icon}
                            onClick={() => setSelectedSection(section.key)}
                        />
                    ))}
                </div>
            )}

            {/* Edit Modal */}
            {activeConfig && (
                <EditModal
                    isOpen={!!selectedSection}
                    onClose={() => setSelectedSection(null)}
                    title={`Edit ${activeConfig.title}`}
                    description="Make changes to this section here. Click save when you're done."
                >
                    {renderForm()}
                </EditModal>
            )}
        </div>
    );
}
