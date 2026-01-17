"use client";
import React, { useState } from 'react';
import Swal from "sweetalert2";
import { FaBuilding, FaCalendar, FaCrown, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Headers from "../../Reusable/Headers";

interface SchoolCardsProps {
    name: string;
    type: string;
    date: string;
    status: string;
    onDelete: () => void;
    isSelected: boolean;
    onSelect: () => void;
    onStatusChange: (newStatus: string) => void;
}

const SchoolCards: React.FC<SchoolCardsProps> = ({
    name,
    type,
    date,
    status,
    onDelete,
    isSelected,
    onSelect,
    onStatusChange
}) => {
    const statusColor =
        status === "Premium"
            ? "bg-purple-200 text-purple-800"
            : status === "Approved"
                ? "bg-green-200 text-green-800"
                : status === "Rejected"
                    ? "bg-red-200 text-red-800"
                    : "bg-yellow-200 text-yellow-800";

    const handleDelete = (e) => {
        e.stopPropagation();
        Swal.fire({
            title: "Are you sure?",
            text: `You are about to delete ${name}`,
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
                cancelButton: "rounded-xl px-6 py-2 font-medium",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: `${name} has been deleted successfully.`,
                    icon: "success",
                    background: "#ffffff",
                    confirmButtonColor: "#10b981",
                    confirmButtonText: "Done",
                    customClass: {
                        popup: "rounded-2xl shadow-xl",
                        title: "text-gray-800 font-semibold text-xl",
                        htmlContainer: "text-gray-600",
                        confirmButton: "rounded-xl px-6 py-2 font-medium",
                    },
                }).then(() => {
                    onDelete();
                });
            }
        });
    };

    const handleApprove = (e) => {
        e.stopPropagation();
        Swal.fire({
            title: "Approve School",
            text: `Are you sure you want to approve ${name}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#10b981",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Approve",
            cancelButtonText: "Cancel",
            background: "#ffffff",
            customClass: {
                popup: "rounded-2xl shadow-xl",
                title: "text-gray-800 font-semibold text-xl",
                htmlContainer: "text-gray-600",
                confirmButton: "rounded-xl px-6 py-2 font-medium",
                cancelButton: "rounded-xl px-6 py-2 font-medium",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                onStatusChange("Approved");
                Swal.fire({
                    title: "Approved!",
                    text: `${name} has been approved successfully.`,
                    icon: "success",
                    background: "#ffffff",
                    confirmButtonColor: "#10b981",
                    confirmButtonText: "Done",
                    customClass: {
                        popup: "rounded-2xl shadow-xl",
                        title: "text-gray-800 font-semibold text-xl",
                        htmlContainer: "text-gray-600",
                        confirmButton: "rounded-xl px-6 py-2 font-medium",
                    },
                });
            }
        });
    };

    const handleReject = (e) => {
        e.stopPropagation();
        Swal.fire({
            title: "Reject School",
            text: `Are you sure you want to reject ${name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Reject",
            cancelButtonText: "Cancel",
            background: "#ffffff",
            customClass: {
                popup: "rounded-2xl shadow-xl",
                title: "text-gray-800 font-semibold text-xl",
                htmlContainer: "text-gray-600",
                confirmButton: "rounded-xl px-6 py-2 font-medium",
                cancelButton: "rounded-xl px-6 py-2 font-medium",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                onStatusChange("Rejected");
                Swal.fire({
                    title: "Rejected!",
                    text: `${name} has been rejected.`,
                    icon: "info",
                    background: "#ffffff",
                    confirmButtonColor: "#6b7280",
                    confirmButtonText: "Done",
                    customClass: {
                        popup: "rounded-2xl shadow-xl",
                        title: "text-gray-800 font-semibold text-xl",
                        htmlContainer: "text-gray-600",
                        confirmButton: "rounded-xl px-6 py-2 font-medium",
                    },
                });
            }
        });
    };

    const handleGetPremium = (e) => {
        e.stopPropagation();
        Swal.fire({
            title: "Upgrade to Premium",
            text: `Do you want to upgrade ${name} to Premium status?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#8b5cf6",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Upgrade",
            cancelButtonText: "Cancel",
            background: "#ffffff",
            customClass: {
                popup: "rounded-2xl shadow-xl",
                title: "text-gray-800 font-semibold text-xl",
                htmlContainer: "text-gray-600",
                confirmButton: "rounded-xl px-6 py-2 font-medium",
                cancelButton: "rounded-xl px-6 py-2 font-medium",
            },
        }).then((result) => {
            if (result.isConfirmed) {

                onStatusChange("Premium");
                Swal.fire({
                    title: "Upgraded!",
                    text: `${name} has been upgraded to Premium.`,
                    icon: "success",
                    background: "#ffffff",
                    confirmButtonColor: "#8b5cf6",
                    confirmButtonText: "Done",
                    customClass: {
                        popup: "rounded-2xl shadow-xl",
                        title: "text-gray-800 font-semibold text-xl",
                        htmlContainer: "text-gray-600",
                        confirmButton: "rounded-xl px-6 py-2 font-medium",
                    },
                });
            }
        });
    };

    const handleRevokeApproval = (e) => {
        e.stopPropagation();
        Swal.fire({
            title: "Revoke Premium/Approval",
            text: `Do you want to change ${name} back to Pending status?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#f59e0b",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Revoke",
            cancelButtonText: "Cancel",
            background: "#ffffff",
            customClass: {
                popup: "rounded-2xl shadow-xl",
                title: "text-gray-800 font-semibold text-xl",
                htmlContainer: "text-gray-600",
                confirmButton: "rounded-xl px-6 py-2 font-medium",
                cancelButton: "rounded-xl px-6 py-2 font-medium",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                onStatusChange("Pending");
                Swal.fire({
                    title: "Status Changed!",
                    text: `${name} has been changed to Pending status.`,
                    icon: "info",
                    background: "#ffffff",
                    confirmButtonColor: "#f59e0b",
                    confirmButtonText: "Done",
                    customClass: {
                        popup: "rounded-2xl shadow-xl",
                        title: "text-gray-800 font-semibold text-xl",
                        htmlContainer: "text-gray-600",
                        confirmButton: "rounded-xl px-6 py-2 font-medium",
                    },
                });
            }
        });
    };

    const handleReopenRejected = (e) => {
        e.stopPropagation();
        Swal.fire({
            title: "Reopen Application",
            text: `Do you want to reopen ${name}'s application?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#10b981",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Reopen",
            cancelButtonText: "Cancel",
            background: "#ffffff",
            customClass: {
                popup: "rounded-2xl shadow-xl",
                title: "text-gray-800 font-semibold text-xl",
                htmlContainer: "text-gray-600",
                confirmButton: "rounded-xl px-6 py-2 font-medium",
                cancelButton: "rounded-xl px-6 py-2 font-medium",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                onStatusChange("Pending");
                Swal.fire({
                    title: "Reopened!",
                    text: `${name}'s application has been reopened.`,
                    icon: "success",
                    background: "#ffffff",
                    confirmButtonColor: "#10b981",
                    confirmButtonText: "Done",
                    customClass: {
                        popup: "rounded-2xl shadow-xl",
                        title: "text-gray-800 font-semibold text-xl",
                        htmlContainer: "text-gray-600",
                        confirmButton: "rounded-xl px-6 py-2 font-medium",
                    },
                });
            }
        });
    };


    return (
        <div
            className={`w-full bg-white shadow-sm rounded-2xl p-5 border-2 flex flex-col gap-5 hover:shadow-md transition-all duration-200 cursor-pointer ${isSelected ? 'border-yellow-500' : 'border-gray-100'
                }`}
            onClick={onSelect}
        >

            <div className="flex justify-between items-center">
                <div className="p-3 bg-slate-100 rounded-full">
                    <FaBuilding size={26} className="text-gray-700" />
                </div>
                <div className="flex flex-col items-end">
                    <p className={`text-sm px-4 py-1 rounded-3xl font-medium ${statusColor}`}>
                        {status}
                    </p>
                    {status === "Premium" && (
                        <div className="flex items-center gap-1 mt-1">
                            <FaCrown size={12} className="text-purple-500" />
                            <span className="text-xs text-gray-500">Premium</span>
                        </div>
                    )}
                </div>
            </div>


            <div className="flex flex-col text-sm text-gray-500 gap-2">
                <div className=''>
                    <p className="text-[16px] font-semibold text-gray-800">{name}</p>
                    <p className="text-sm text-gray-600">{type} School</p>
                </div>
                <div className='flex gap-2 items-center mt-4'>
                    <FaCalendar size={14} />
                    <span>{date}</span>
                </div>
            </div>


            <div className="flex items-center justify-between gap-3">
                {status === "Premium" ? (
                    <>
                        <button
                            onClick={handleRevokeApproval}
                            className="flex items-center justify-center gap-2 flex-1 border border-yellow-300 bg-gradient-to-r from-yellow-50 to-amber-50 py-2 rounded-3xl text-yellow-700 font-medium hover:from-yellow-100 hover:to-amber-100 transition-all shadow-sm"
                        >
                            <FaTimesCircle size={14} className="text-yellow-600" /> Downgrade
                        </button>
                    </>
                ) : status === "Approved" ? (
                    <>
                        <button
                            onClick={handleGetPremium}
                            className="flex items-center justify-center gap-2 flex-1 border border-purple-300 bg-gradient-to-r from-purple-50 to-indigo-50 py-2 rounded-3xl text-purple-700 font-medium hover:from-purple-100 hover:to-indigo-100 transition-all shadow-sm"
                        >
                            <FaCrown size={14} className="text-purple-600" /> Get Premium
                        </button>
                        <button
                            onClick={handleRevokeApproval}
                            className="flex items-center justify-center gap-2 flex-1 border border-yellow-300 bg-gradient-to-r from-yellow-50 to-amber-50 py-2 rounded-3xl text-yellow-700 font-medium hover:from-yellow-100 hover:to-amber-100 transition-all shadow-sm"
                        >
                            <FaTimesCircle size={14} className="text-yellow-600" /> Revoke
                        </button>
                    </>
                ) : status === "Rejected" ? (
                    <>
                        <button
                            onClick={handleReopenRejected}
                            className="flex items-center justify-center gap-2 flex-1 border border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 py-2 rounded-3xl text-green-700 font-medium hover:from-green-100 hover:to-emerald-100 transition-all"
                        >
                            <FaCheckCircle size={14} className="text-green-600" /> Reopen
                        </button>
                    </>
                ) : (

                    <>
                        <button
                            onClick={handleApprove}
                            className="flex items-center justify-center gap-2 flex-1 border border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 py-2 rounded-3xl text-green-700 font-medium hover:from-green-100 hover:to-emerald-100 transition-all"
                        >
                            <FaCheckCircle size={14} className="text-green-600" /> Approve
                        </button>
                        <button
                            onClick={handleReject}
                            className="flex items-center justify-center gap-2 flex-1 border border-red-300 bg-gradient-to-r from-red-50 to-rose-50 py-2 rounded-3xl text-red-700 font-medium hover:from-red-100 hover:to-rose-100 transition-all"
                        >
                            <FaTimesCircle size={14} className="text-red-600" /> Reject
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

const ManageSchool = () => {
    const [schools, setSchools] = useState([
        { id: 1, name: "Green Valley High", type: "Boarding", date: "Oct 5, 2025", status: "Approved" },
        { id: 2, name: "Lawton Academy", type: "Law", date: "Sep 25, 2025", status: "Pending" },
        { id: 3, name: "Bluebell Primary", type: "Primary", date: "Oct 15, 2025", status: "Approved" },
        { id: 4, name: "TechBridge Institute", type: "Engineering", date: "Nov 2, 2025", status: "Rejected" },
        { id: 5, name: "Harmony Arts School", type: "Arts", date: "Oct 10, 2025", status: "Pending" },
        { id: 6, name: "Bright Future College", type: "Business", date: "Sep 30, 2025", status: "Approved" },
    ]);
    const [selectedSchool, setSelectedSchool] = useState(null);

    const handleDelete = (id) => {
        setSchools((prev) => prev.filter((school) => school.id !== id));
        if (selectedSchool === id) {
            setSelectedSchool(null);
        }
    };

    const handleSelectSchool = (id) => {
        setSelectedSchool(id === selectedSchool ? null : id);
    };

    const handleStatusChange = (id, newStatus) => {
        setSchools(prev => prev.map(school =>
            school.id === id
                ? { ...school, status: newStatus }
                : school
        ));
    };


    const stats = {
        total: schools.length,
        premium: schools.filter(s => s.status === "Premium").length,
        approved: schools.filter(s => s.status === "Approved").length,
        pending: schools.filter(s => s.status === "Pending").length,
        rejected: schools.filter(s => s.status === "Rejected").length,
    };

    return (
        <div className="">
            <div className="flex justify-between items-center">
                <Headers
                    title={"Manage Schools"}
                    subHeader={"Approve or manage school applications"}
                />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Schools</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-full">
                            <FaBuilding className="text-blue-500" size={20} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Premium</p>
                            <p className="text-2xl font-bold text-purple-600">{stats.premium}</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-full">
                            <FaCrown className="text-purple-500" size={20} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Approved</p>
                            <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-full">
                            <FaCheckCircle className="text-green-500" size={20} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Pending</p>
                            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-full">
                            <FaCalendar className="text-yellow-500" size={20} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Rejected</p>
                            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-full">
                            <FaTimesCircle className="text-red-500" size={20} />
                        </div>
                    </div>
                </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {schools.map((school) => (
                    <SchoolCards
                        key={school.id}
                        name={school.name}
                        type={school.type}
                        date={school.date}
                        status={school.status}
                        isSelected={selectedSchool === school.id}
                        onSelect={() => handleSelectSchool(school.id)}
                        onDelete={() => handleDelete(school.id)}
                        onStatusChange={(newStatus) => handleStatusChange(school.id, newStatus)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ManageSchool;