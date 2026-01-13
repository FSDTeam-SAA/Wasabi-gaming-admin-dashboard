"use client";
import { useState } from 'react';
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import Headers from "../../Reusable/Headers";

import ReusableModal from '../../Reusable/ReusableModal';


const coursesData = [
    {
        id: 1,
        title: "Advanced Mathematics",
        grade: "11th grade",
        category: "Mathematics",
        studentsEnrolled: 213,
        color: "amber"
    },
    {
        id: 2,
        title: "Physics Fundamentals",
        grade: "10th grade",
        category: "Science",
        studentsEnrolled: 156,
        color: "blue"
    },
    {
        id: 3,
        title: "Literature & Composition",
        grade: "12th grade",
        category: "English",
        studentsEnrolled: 189,
        color: "green"
    },
    {
        id: 4,
        title: "World History",
        grade: "9th grade",
        category: "Social Studies",
        studentsEnrolled: 142,
        color: "red"
    }
];


const courseFields = [
    { name: "name", label: "Course Name", type: "text", placeholder: "Enter course name" },
    { name: "description", label: "Description", type: "textarea", placeholder: "Brief description of the course..." },
    {
        name: "grade",
        label: "Grade Level",
        type: "select",
        options: [
            { label: "6th Grade", value: "6" },
            { label: "7th Grade", value: "7" },
            { label: "8th Grade", value: "8" },
            { label: "9th Grade", value: "9" },
            { label: "10th Grade", value: "10" },
            { label: "11th Grade", value: "11" },
            { label: "12th Grade", value: "12" }
        ],
        placeholder: "Select grade level"
    },
    {
        name: "category",
        label: "Category",
        type: "select",
        options: [
            { label: "Mathematics", value: "math" },
            { label: "Science", value: "science" },
            { label: "English", value: "english" },
            { label: "Social Studies", value: "social-studies" },
            { label: "History", value: "history" }
        ],
        placeholder: "Select category"
    },
    {
        name: "video",
        label: "Upload course video",
        type: "file",
        accept: ".mp4,.avi,.mov,.csv,.json,.xlsx"
    }
];

const CourseCard = ({ course }) => {
    const [open, setOpen] = useState(false);

    const handleSave = (data) => {
        console.log("Saved data:", data);
        setOpen(false);
    };

    const colorClasses = {
        amber: "bg-amber-50 text-amber-700 border border-amber-200",
        blue: "bg-blue-50 text-blue-700 border border-blue-200",
        green: "bg-green-50 text-green-700 border border-green-200",
        red: "bg-red-50 text-red-700 border border-red-200"
    };

    const iconColors = {
        amber: "text-amber-500",
        blue: "text-blue-500",
        green: "text-green-500",
        red: "text-red-500"
    };

    return (
        <div className='bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200 group'>

            <div className='flex justify-between items-start mb-6'>
                <div className='flex items-start gap-3'>
                    <div className={`p-2 rounded-lg ${colorClasses[course.color]} mt-1`}>
                        <FaPerson className={`text-sm ${iconColors[course.color]}`} />
                    </div>
                    <div>
                        <h3 className='text-lg font-semibold text-gray-900 mb-1 leading-tight'>{course.title}</h3>
                        <p className='text-gray-500 text-sm'>{course.grade}</p>
                    </div>
                </div>
                <span className={`${colorClasses[course.color]} px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap`}>
                    {course.category}
                </span>
            </div>

            <div className='mb-6'>
                <div className='flex items-center gap-2 text-gray-600'>
                    <div className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center'>
                        <FaPerson className="text-gray-500 text-xs" />
                    </div>
                    <span className='font-medium text-gray-700'>{course.studentsEnrolled}</span>
                    <span className='text-gray-500 text-sm'>students enrolled</span>
                </div>
            </div>


            <div className='flex justify-between items-center gap-3'>
                <button
                    onClick={() => setOpen(true)}
                    className='flex items-center justify-center gap-2 w-[80%] border border-gray-200 rounded-xl py-2.5 px-4 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium text-sm group-hover:shadow-sm'
                >
                    <FaEdit className="text-xs" />
                    Edit Course
                </button>
                <button className='flex items-center justify-center w-[20%] border border-gray-200 rounded-xl py-2.5 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200 text-gray-500 group-hover:shadow-sm'>
                    <FaTrash className="text-xs" />
                </button>
            </div>

            <ReusableModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onSave={handleSave}
                title="Edit Course"
                fields={courseFields}
                location={'course'}
                edit={true}
                submitText="Save Changes"
                data={{
                    name: course.title,
                    grade: course.grade.replace(' grade', ''),
                    category: course.category.toLowerCase()
                }}
            />
        </div>
    );
};

const Courses = () => {
    const [open, setOpen] = useState(false);

    const handleSave = (data) => {
        console.log("Saved data:", data);
        setOpen(false);
    };

    return (
        <div className='p-0'>

            <div className='flex justify-between items-center mb-8'>
                <Headers title={"Courses"} subHeader={"Manage all courses and learning materials"} />
                <button
                    onClick={() => setOpen(true)}
                    className="flex gap-2 items-center bg-[#FFFF00] hover:bg-yellow-500 py-3 rounded-xl px-6 shadow-sm hover:shadow-md transition-all duration-300 font-semibold text-gray-900 hover:scale-105"
                >
                    <FaPlus className="text-sm" />
                    Create New Course
                </button>
            </div>


            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6'>
                {coursesData.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>

            <ReusableModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onSave={handleSave}
                title="Create New Course"
                location={'course'}
                fields={courseFields}
                submitText="Create Course"
            />
        </div>
    );
};

export default Courses;