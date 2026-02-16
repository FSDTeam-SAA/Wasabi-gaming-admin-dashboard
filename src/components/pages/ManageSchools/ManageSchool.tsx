"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  FaBuilding,
  FaCalendar,
  FaCrown,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import Headers from "../../Reusable/Headers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoderComponent from "@/components/loader/LoderComponent"; // যদি তোমার কাছে থাকে
import { useSession } from "next-auth/react";

// SchoolCards কম্পোনেন্ট (একদম আগের মতোই রাখা হয়েছে)
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
  onStatusChange,
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
        onDelete();
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
        onStatusChange("accepted");
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
        onStatusChange("rejected");
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
      }
    });
  };

  return (
    <div
      className={`w-full bg-white shadow-sm rounded-2xl p-5 border-2 flex flex-col gap-5 hover:shadow-md transition-all duration-200 cursor-pointer ${
        isSelected ? "border-yellow-500" : "border-gray-100"
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-center">
        <div className="p-3 bg-slate-100 rounded-full">
          <FaBuilding size={26} className="text-gray-700" />
        </div>
        <div className="flex flex-col items-end">
          <p
            className={`text-sm px-4 py-1 rounded-3xl font-medium ${statusColor}`}
          >
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
        <div className="">
          <p className="text-[16px] font-semibold text-gray-800">{name}</p>
          <p className="text-sm text-gray-600">{type} School</p>
        </div>
        <div className="flex gap-2 items-center mt-4">
          <FaCalendar size={14} />
          <span>{date}</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        {status === "Premium" ? (
          <button
            onClick={handleRevokeApproval}
            className="flex items-center justify-center gap-2 flex-1 border border-yellow-300 bg-gradient-to-r from-yellow-50 to-amber-50 py-2 rounded-3xl text-yellow-700 font-medium hover:from-yellow-100 hover:to-amber-100 transition-all shadow-sm"
          >
            <FaTimesCircle size={14} className="text-yellow-600" /> Downgrade
          </button>
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
          <button
            onClick={handleReopenRejected}
            className="flex items-center justify-center gap-2 flex-1 border border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 py-2 rounded-3xl text-green-700 font-medium hover:from-green-100 hover:to-emerald-100 transition-all"
          >
            <FaCheckCircle size={14} className="text-green-600" /> Reopen
          </button>
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
  const queryClient = useQueryClient();
  const session = useSession();
  const TOKEN = session?.data?.user?.accessToken || "";

  // GET all schools
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["manageSchools"],
    queryFn: async () => {
      const token = localStorage.getItem("token") || ""; // অথবা next-auth থেকে নাও
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/all-user?role=school`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch schools");
      }
      return response.json();
    },
  });

  const schools = data?.data || []; // ধরে নিচ্ছি response এ { success: true, data: [...] } আসছে

  // Update school status (PUT)
  const updateSchoolMutation = useMutation({
    mutationFn: async ({ id, schoolStatus }: { id: string | number; schoolStatus: string }) => {
      // const token = localStorage.getItem("token") || "";
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ schoolStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update school status");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manageSchools"] });
      Swal.fire({
        title: "Success!",
        text: "School status updated successfully.",
        icon: "success",
        confirmButtonColor: "#10b981",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "Failed to update school status.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    },
  });

  // Delete school (DELETE) - যদি backend-এ থাকে
  const deleteSchoolMutation = useMutation({
    mutationFn: async (id: string | number) => {
      const token = localStorage.getItem("token") || "";
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schools/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete school");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manageSchools"] });
      Swal.fire({
        title: "Deleted!",
        text: "School deleted successfully.",
        icon: "success",
        confirmButtonColor: "#10b981",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete school.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    },
  });

  const [selectedSchool, setSelectedSchool] = useState<string | number | null>(null);

  const handleDelete = (id: string | number) => {
    deleteSchoolMutation.mutate(id);
  };

  const handleSelectSchool = (id: string | number) => {
    setSelectedSchool((prev) => (prev === id ? null : id));
  };

  const handleStatusChange = (id: string | number, newStatus: string) => {
    updateSchoolMutation.mutate({ id, schoolStatus: newStatus });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoderComponent />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-600">
        Error loading schools: {error?.message || "Something went wrong"}
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex justify-between items-center mb-8">
        <Headers
          title="Manage Schools"
          subHeader="Approve or manage school applications"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {schools.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No schools found
          </div>
        ) : (
          schools.map((school: any) => (
            <SchoolCards
              key={school._id || school.id}
              name={school.name || school.schoolName || "Unnamed School"}
              type={school.type || "Unknown"}
              date={school.createdAt ? new Date(school.createdAt).toLocaleDateString() : "N/A"}
              status={school.status || "Pending"}
              isSelected={selectedSchool === (school._id || school.id)}
              onSelect={() => handleSelectSchool(school._id || school.id)}
              onDelete={() => handleDelete(school._id || school.id)}
              onStatusChange={(newStatus) =>
                handleStatusChange(school._id || school.id, newStatus)
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ManageSchool;