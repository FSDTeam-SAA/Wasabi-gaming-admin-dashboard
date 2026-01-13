'use client';

import { useDashboardStats } from '@/hooks/useDashboard';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { School, BookOpen, ClipboardList, BarChart3 } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

const iconMap = {
    school: <School className="w-6 h-6" />,
    book: <BookOpen className="w-6 h-6" />,
    tasks: <ClipboardList className="w-6 h-6" />,
    chart: <BarChart3 className="w-6 h-6" />,
};

export default function StatsCards() {
    const { data, isLoading } = useDashboardStats();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.map((item, index) => (
                <Card
                    key={index}
                    className={cn(
                        "bg-white p-6 py-5 h-[200px] flex flex-col justify-between rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                    )}
                >
                    <div className='flex justify-between items-center mb-4'>
                        <p className='text-[#737373] text-sm font-medium popreg'>{item.name}</p>
                        <div className='text-blue-500 text-lg'>
                            {iconMap[item.iconType]}
                        </div>
                    </div>
                    <div>
                        <p className='text-2xl font-bold text-gray-800 popmed mb-1'>{item.number}</p>
                        <p className='text-[12px] text-gray-500 popreg'>{item.details}</p>
                    </div>
                </Card>
            ))}
        </div>
    );
}
