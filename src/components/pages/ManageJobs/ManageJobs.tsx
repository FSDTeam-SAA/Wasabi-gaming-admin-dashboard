"use client";
import React, { useState } from "react";
import Headers from "../../Reusable/Headers";
import {
    FaBuilding,
    FaCalendar,
    FaEdit,
    FaEye,
    FaTrash,
    FaCheck,
    FaTimes
} from "react-icons/fa";
import Swal from "sweetalert2";
import ReusableModal from "../../Reusable/ReusableModal";
import { FaPlus } from "react-icons/fa6";

// Demo Data
const jobsData = [
    {
        id: 1,
        company: "StartupX",
        position: "Frontend Developer",
        status: "Pending",
        date: "Oct 7, 2025",
    },
    {
        id: 2,
        company: "TechNova",
        position: "Backend Engineer",
        status: "Approved",
        date: "Sep 28, 2025",
    },
    {
        id: 3,
        company: "Webify",
        position: "UI/UX Designer",
        status: "Pending",
        date: "Nov 2, 2025",
    },
    {
        id: 4,
        company: "CodeCraft",
        position: "Full Stack Developer",
        status: "Rejected",
        date: "Oct 10, 2025",
    },
    {
        id: 5,
        company: "DevCorp",
        position: "Mobile App Developer",
        status: "Approved",
        date: "Oct 25, 2025",
    },
    {
        id: 6,
        company: "PixelHub",
        position: "React Developer",
        status: "Pending",
        date: "Oct 30, 2025",
    },
];




const JobsCard = ({ company, position, status, date, onDelete, onView, onEdit }) => {

    const statusColor =
        status === "Approved"
            ? "bg-green-200 text-green-800"
            : status === "Rejected"
                ? "bg-red-200 text-red-800"
                : "bg-yellow-200 text-yellow-800";

    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: `You are about to delete the job at ${company}`,
            icon: "warning",
            iconColor: "#ef4444",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            background: "#ffffff",
            customClass: {
                popup: "rounded-2xl shadow-xl",
                title: "text-gray-800 font-semibold text-xl",
                htmlContainer: "text-gray-600",
                confirmButton: "rounded-xl px-6 py-2 font-medium",
                cancelButton: "rounded-xl px-6 py-2 font-medium"
            }
        }).then((result) => {
            if (result.isConfirmed) {

                Swal.fire({
                    title: "Deleted!",
                    text: "The job has been deleted successfully.",
                    icon: "success",
                    iconHtml: '<div class="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full"><FaCheck class="text-green-600 text-2xl" /></div>',
                    background: "#ffffff",
                    confirmButtonColor: "#10b981",
                    confirmButtonText: "Done",
                    customClass: {
                        popup: "rounded-2xl shadow-xl",
                        title: "text-gray-800 font-semibold text-xl",
                        htmlContainer: "text-gray-600",
                        confirmButton: "rounded-xl px-6 py-2 font-medium",
                        icon: "border-0"
                    }
                }).then(() => {

                    onDelete();
                });
            }
        });
    };

    return (
        <div className="w-full bg-white shadow-sm rounded-2xl p-5 border border-gray-100 flex space-y-3 flex-col gap-3 hover:shadow-md transition-all duration-200">

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-gray-100 rounded-full">
                        <FaBuilding size={26} className="text-gray-700" />
                    </div>
                </div>
                <p className={`text-sm px-4 py-1 rounded-3xl font-medium ${statusColor}`}>
                    {status}
                </p>
            </div>

            <div className='space-y-3'>

                <div>
                    <p className="text-[16px] popbold text-gray-800">{company}</p>
                    <p className="text-sm text-gray-600">{position}</p>
                </div>
                <div className="flex items-center text-sm text-gray-500 gap-2">
                    <FaCalendar size={14} />
                    <span>{date}</span>
                </div>
            </div>


            <div className="flex items-center justify-between gap-3">
                <button
                    onClick={onView}
                    className="flex items-center justify-center gap-2 flex-1 border border-gray-300 py-[7px] rounded-3xl text-gray-700 font-medium hover:bg-gray-100 transition-all"
                >
                    <FaEye size={19} className="text-gray-600" /> View
                </button>
                <button
                    onClick={onEdit}
                    className="flex items-center justify-center gap-2 flex-1 border border-gray-300 py-[7px] rounded-3xl text-gray-700 font-medium hover:bg-gray-100 transition-all"
                >
                    <FaEdit size={19} className="text-gray-600" /> Edit
                </button>

                <button
                    onClick={handleDelete}
                    className="flex items-center justify-center border border-gray-200 rounded-full p-3 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200 text-gray-500"
                >
                    <FaTrash size={15} />
                </button>
            </div>
        </div>
    );
};

const ManageJobs = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const handleDeleteJob = (jobId) => {

        console.log(`Deleting job with ID: ${jobId}`);

    };

    const handleViewJob = (job) => {
        setSelectedJob(job);
        setIsViewOpen(true);
    };

    const handelEditJob = (job) => {
        setSelectedJob(job);
        setIsEdit(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
    };

    const handleSave = (data) => {
        console.log("Saved data:", data);
        setIsModalOpen(false);
    };

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <Headers
                    title={"Manage Jobs"}
                    subHeader={
                        "Approve all jobs"
                    }
                />

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex gap-2 items-center bg-[#FFFF00] hover:bg-yellow-500 py-3 rounded-xl px-6 shadow-sm hover:shadow-md transition-all duration-300 font-semibold text-gray-900 hover:scale-105"
                >

                    <FaPlus /> Add Jobs
                </button>
            </div>



            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobsData.map((job) => (
                    <JobsCard
                        key={job.id}
                        company={job.company}
                        position={job.position}
                        status={job.status}
                        date={job.date}
                        onDelete={() => handleDeleteJob(job.id)}
                        onView={() => handleViewJob(job)}
                        onEdit={() => handelEditJob(job)}
                    />
                ))}
            </div>



            <ReusableModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSave}
                location={'manageJob'}
                title="Create New Job"
                submitText="Create Task"
            />


            <ReusableModal
                title="View Job"
                isOpen={isViewOpen}
                onClose={() => setIsViewOpen(false)}
                data={selectedJob}
                location={'manageJob'}
                view={true}
            />
            <ReusableModal
                title="Edit Job"
                isOpen={isEdit}
                onClose={() => setIsEdit(false)}
                onSave={handleSave}
                location={'manageJob'}
                data={selectedJob}
                edit={true}
            />
        </div>
    );
};

export default ManageJobs;