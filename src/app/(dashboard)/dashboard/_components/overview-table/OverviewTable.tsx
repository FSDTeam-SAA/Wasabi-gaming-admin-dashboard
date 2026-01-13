'use client';

import React from 'react';
import { useDashboardStudents } from '@/hooks/useDashboard';
import { DataTable } from '@/components/common/table/DataTable';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OverviewTable() {
    const { data: students, isLoading } = useDashboardStudents();

    const columns = [
        { header: "Student", accessor: "student" },
        { header: "Email", accessor: "email" },
        { header: "Grade", accessor: "grade" },
        { header: "Courses", accessor: "courses" },
        {
            header: "Status",
            accessor: "status",
            render: (value: string) => (
                <Badge
                    variant={value === "Active" ? "success" : "secondary"}
                    className={`rounded-full font-medium ${value !== "Active" ? "bg-gray-200 text-gray-600 hover:bg-gray-300" : ""}`}
                >
                    {value}
                </Badge>
            )
        },
        {
            header: "Actions",
            accessor: "actions",
            render: () => (
                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                </Button>
            )
        },
    ];

    const filterOptions = ["All", "9th", "10th", "11th", "12th"];

    if (isLoading) {
        return <Skeleton className="w-full h-[400px] mt-8 rounded-2xl" />;
    }

    return (
        <div className='bg-white mt-8 p-5 border-2 border-[#0000001A] rounded-2xl'>
            <div className='pb-4'>
                <h2 className="text-lg popmed text-gray-800">Recent Students</h2>
                <p className="text-lg text-gray-500">Manage and view all students enrolled in your platform</p>
            </div>
            <DataTable
                columns={columns}
                data={students || []}
                filterOptions={filterOptions}
                filterKey="grade"
            />
        </div>
    );
}
