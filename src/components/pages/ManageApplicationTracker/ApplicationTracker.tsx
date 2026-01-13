"use client";
import React, { useState } from 'react';
import Headers from "../../Reusable/Headers";
import { FaPlus, FaUsers, FaBriefcase, FaRegCalendarAlt, FaFileAlt, FaBuilding, FaMapMarkerAlt, FaClock, FaFilter } from "react-icons/fa";
import CommonTable from "../../Reusable/CommonTable";
import ReusableModal from '../../Reusable/ReusableModal';


const cardsData = [
    {
        id: 1,
        name: "Total Applications",
        number: "342",
        details: "All-time job applications",
        icon: <FaFileAlt className="text-blue-500" />,
        color: "text-blue-500"
    },
    {
        id: 2,
        name: "Active Applications",
        number: "24",
        details: "Currently in process",
        icon: <FaBriefcase className="text-green-500" />,
        color: "text-green-500"
    },
    {
        id: 3,
        name: "Interviews Scheduled",
        number: "8",
        details: "Upcoming interviews",
        icon: <FaRegCalendarAlt className="text-purple-500" />,
        color: "text-purple-500"
    },
    {
        id: 4,
        name: "Law Firms Applied",
        number: "28",
        details: "Unique law firms",
        icon: <FaBuilding className="text-yellow-500" />,
        color: "text-yellow-500"
    }
];




const Cards = ({ name, icon, number, details }) => {
    return (
        <div className='bg-white p-6 py-5 h-[200px] flex flex-col justify-between rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer'>
            <div className='flex justify-between items-center mb-4'>
                <p className='text-gray-600 text-sm font-medium popreg'>{name}</p>
                <div className='text-lg'>
                    {icon}
                </div>
            </div>
            <div>
                <p className='text-2xl font-bold text-gray-800 popmed mb-1'>{number}</p>
                <p className='text-sm text-gray-500 popreg'>{details}</p>
            </div>
        </div>
    );
};

const ApplicationTracker = () => {
    const [open, setOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState("All Status");


    const sampleData = [
        {
            id: 1,
            company: "White & Case LLP",
            jobTitle: "Legal Intern",
            candidate: "Sarah Johnson",
            appliedDate: "2024-01-15",
            deadline: "2024-02-15",
            location: "New York, NY",
            status: "Interview Scheduled",
            statusColor: "bg-yellow-100 text-yellow-800",
            notes: "Technical interview scheduled with HR on Feb 5th"
        },
        {
            id: 2,
            company: "Baker McKenzie",
            jobTitle: "Paralegal",
            candidate: "Michael Chen",
            appliedDate: "2024-01-10",
            deadline: "2024-02-10",
            location: "Chicago, IL",
            status: "Under Review",
            statusColor: "bg-blue-100 text-blue-800",
            notes: "Background check in progress"
        },
        {
            id: 3,
            company: "Latham & Watkins",
            jobTitle: "Junior Associate",
            candidate: "Emma Williams",
            appliedDate: "2024-01-05",
            deadline: "2024-01-31",
            location: "Los Angeles, CA",
            status: "Rejected",
            statusColor: "bg-red-100 text-red-800",
            notes: "Position filled with internal candidate"
        },
        {
            id: 4,
            company: "Skadden, Arps",
            jobTitle: "Corporate Lawyer",
            candidate: "James Davis",
            appliedDate: "2024-01-18",
            deadline: "2024-02-28",
            location: "Washington, DC",
            status: "Offer Received",
            statusColor: "bg-green-100 text-green-800",
            notes: "Offer package sent, waiting for acceptance"
        },
        {
            id: 5,
            company: "Kirkland & Ellis",
            jobTitle: "Litigation Attorney",
            candidate: "Olivia Martinez",
            appliedDate: "2024-01-12",
            deadline: "2024-02-20",
            location: "Houston, TX",
            status: "Interview Completed",
            statusColor: "bg-purple-100 text-purple-800",
            notes: "Final interview completed, decision expected soon"
        },
        {
            id: 6,
            company: "Jones Day",
            jobTitle: "Legal Researcher",
            candidate: "David Wilson",
            appliedDate: "2024-01-20",
            deadline: "2024-03-01",
            location: "San Francisco, CA",
            status: "Applied",
            statusColor: "bg-gray-100 text-gray-800",
            notes: "Application submitted, waiting for screening call"
        },
        {
            id: 7,
            company: "DLA Piper",
            jobTitle: "Compliance Officer",
            candidate: "Rachel Adams",
            appliedDate: "2024-01-22",
            deadline: "2024-02-25",
            location: "Boston, MA",
            status: "Under Review",
            statusColor: "bg-blue-100 text-blue-800",
            notes: "References provided, waiting for team review"
        },
        {
            id: 8,
            company: "Morgan Lewis",
            jobTitle: "Intellectual Property Associate",
            candidate: "Thomas Lee",
            appliedDate: "2024-01-14",
            deadline: "2024-02-14",
            location: "Philadelphia, PA",
            status: "Interview Scheduled",
            statusColor: "bg-yellow-100 text-yellow-800",
            notes: "Case study round scheduled next week"
        },
    ];


    const filteredData = statusFilter === "All Status"
        ? sampleData
        : sampleData.filter(item => item.status === statusFilter);

    const filterOptions = [
        "All Status",
        "Applied",
        "Under Review",
        "Interview Scheduled",
        "Interview Completed",
        "Offer Received",
        "Rejected"
    ];

    const columns = [
        {
            header: "Law Firm",
            accessor: "company",
            cell: (value) => (
                <span className="font-medium text-gray-800">
                    {value}
                </span>
            )
        },
        {
            header: "Job Title",
            accessor: "jobTitle",
            cell: (value) => (
                <span className="font-medium text-gray-700">
                    {value}
                </span>
            )
        },
        {
            header: "Candidate",
            accessor: "candidate",
            cell: (value) => (
                <span className="text-gray-700">
                    {value}
                </span>
            )
        },
        {
            header: "Applied Date",
            accessor: "appliedDate",
            cell: (value) => (
                <div className="flex items-center gap-2">
                    <FaRegCalendarAlt className="text-gray-400 text-sm" />
                    <span className="text-sm text-gray-700">
                        {new Date(value).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </span>
                </div>
            )
        },
        {
            header: "Deadline",
            accessor: "deadline",
            cell: (value) => (
                <div className="flex items-center gap-2">
                    <FaClock className="text-gray-400 text-sm" />
                    <span className={`text-sm ${new Date(value) < new Date() ? 'text-red-600 font-medium' : 'text-gray-700'}`}>
                        {new Date(value).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                        })}
                    </span>
                </div>
            )
        },
        {
            header: "Location",
            accessor: "location",
            cell: (value) => (
                <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-400 text-sm" />
                    <span className="text-sm text-gray-700">
                        {value}
                    </span>
                </div>
            )
        },
        {
            header: "Status",
            accessor: "status",
            cell: (value, row) => (
                <div className="flex flex-col gap-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${row.statusColor}`}>
                        {value}
                    </span>
                    <span className="text-xs text-gray-500 truncate max-w-[150px]">
                        {row.notes}
                    </span>
                </div>
            )
        },
    ];

    const title = "Law Firm Applications Tracker"
    const subtitle = "Track and manage all law firm job applications submitted by students"

    const handleSave = (data) => {
        console.log("Saved application data:", data);
        setOpen(false);
    };

    return (
        <div className="w-full flex flex-col gap-8">

            <div className="flex justify-between items-center">
                <Headers
                    title={"Law Firm Application Tracker"}
                    subHeader={"Monitor and manage student applications to law firms"}
                />

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cardsData.map((card) => (
                    <Cards
                        key={card.id}
                        name={card.name}
                        icon={card.icon}
                        number={card.number}
                        details={card.details}
                    />
                ))}
            </div>


            <div className='bg-white mt-8 p-5 border-2 border-[#0000001A] rounded-2xl'>
                <div className='pb-4 flex justify-between items-center'>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                        <p className="text-sm text-gray-500">{subtitle}</p>
                    </div>

                    <div className="flex items-center gap-2">

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white"
                        >
                            {filterOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>


                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {columns.map((column, index) => (
                                    <th
                                        key={index}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {column.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredData.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                                    {columns.map((column, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className="px-6 py-4 whitespace-nowrap text-sm"
                                        >
                                            {column.cell
                                                ? column.cell(row[column.accessor], row)
                                                : row[column.accessor]
                                            }
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredData.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No applications found with status: {statusFilter}</p>
                        </div>
                    )}
                </div>


                <div className="mt-4 text-sm text-gray-500">
                    Showing {filteredData.length} of {sampleData.length} applications
                    {statusFilter !== "All Status" && ` (filtered by: ${statusFilter})`}
                </div>
            </div>


            <ReusableModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onSave={handleSave}
                location={'applicationTracker'}
                title="Add New Law Firm Application"
                submitText="Save Application"
            />
        </div>
    );
};

export default ApplicationTracker;