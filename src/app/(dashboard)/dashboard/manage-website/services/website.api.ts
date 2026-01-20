import { getSession } from 'next-auth/react';
import { WebsiteSection } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Helper to get headers
const getAuthHeaders = async () => {
    const session = await getSession();
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.accessToken || ''}`,
    };
};

export const websiteApi = {
    // Get all sections
    getAllSections: async (): Promise<{ success: boolean; data: WebsiteSection[] }> => {
        const headers = await getAuthHeaders();
        try {
            const response = await fetch(`${API_BASE_URL}/website`, {
                method: 'GET',
                headers,
            });

            if (!response.ok) {
                throw new Error('Failed to fetch website sections');
            }

            return response.json();
        } catch (error) {
            console.error('Error fetching sections:', error);
            throw error;
        }
    },

    // Update a section
    updateSection: async (id: string, data: Partial<WebsiteSection>): Promise<{ success: boolean; data: WebsiteSection }> => {
        const headers = await getAuthHeaders();
        try {
            const response = await fetch(`${API_BASE_URL}/website/${id}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to update website section');
            }

            return response.json();
        } catch (error) {
            console.error('Error updating section:', error);
            throw error;
        }
    },
};
