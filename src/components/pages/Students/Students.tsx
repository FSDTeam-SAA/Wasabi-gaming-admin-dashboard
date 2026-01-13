"use client";
import React, { useState } from 'react';
import { FaPerson } from "react-icons/fa6";
import Headers from "../../Reusable/Headers";
import CommonTable from "../../Reusable/CommonTable";

import ReusableModal from '../../Reusable/ReusableModal';
import { MdPersonAddAlt1 } from 'react-icons/md';


const sampleData = [
    {
        student: "Sarah Johnson",
        email: "sarah.j@email.com",
        grade: "10th",
        courses: 5,
        status: "Active",
    },
    {
        student: "Michael Chen",
        email: "michael.c@email.com",
        grade: "11th",
        courses: 6,
        status: "Active",
    },
    {
        student: "Emma Williams",
        email: "emma.w@email.com",
        grade: "9th",
        courses: 4,
        status: "Inactive",
    },
    {
        student: "James Davis",
        email: "james.d@email.com",
        grade: "12th",
        courses: 7,
        status: "Active",
    },
    {
        student: "Olivia Martinez",
        email: "olivia.m@email.com",
        grade: "10th",
        courses: 5,
        status: "Active",
    },
];

const filterOptions = ["All", "9th", "10th", "11th", "12th"];

const columns = [
    { header: "Student", accessor: "student" },
    { header: "Email", accessor: "email" },
    { header: "Grade", accessor: "grade" },
    { header: "Courses", accessor: "courses" },
    { header: "Status", accessor: "status" },
    { header: "Actions", accessor: "actions" },
];

const Students = () => {
    const [open, setOpen] = useState(false);

    const handleSave = (data) => {
        console.log("Saved data:", data);
        setOpen(false);
    };

    return (
        <div>
            <div className='flex justify-between items-center'>
                <Headers title={"Students"} subHeader={"Manage all students enrolled in your platform"} />
                <button onClick={() => setOpen(true)} className="flex gap-2 items-center bg-[#FFFF00] py-2 rounded-3xl px-5 shadow-[0px_4px_6px_-4px_#0000001A,0px_10px_15px_-3px_#0000001A]">
                    <MdPersonAddAlt1 size={18} /> Add Student
                </button>

            </div>

            <div className="bg-white mt-8 p-5 border-r-2 border-b-2 border-l-2 border-[#0000001A] rounded-2xl">
                <CommonTable

                    columns={columns}
                    data={sampleData}
                    filterOptions={filterOptions}
                />
            </div>

            <ReusableModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onSave={handleSave}
                subTitle='Add a new student to your school management platform.'
                title="Add Student"
                location={'student'}
                submitText="Add Student"
            />
        </div>
    );
};

export default Students;

