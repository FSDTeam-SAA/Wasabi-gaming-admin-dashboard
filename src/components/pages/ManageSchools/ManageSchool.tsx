"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaBuilding, FaCalendar, FaCheck, FaTimesCircle } from "react-icons/fa";
import Headers from "../../Reusable/Headers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoderComponent from "@/components/loader/LoderComponent"; // যদি তোমার কাছে থাকে
import { useSession } from "next-auth/react";
import { Eye } from "lucide-react";

// SchoolCards কম্পোনেন্ট (একদম আগের মতোই রাখা হয়েছে)
interface SchoolCardsProps {
  name: string;
  type: string;
  date: string;
  schoolStatus: string;
  isSelected: boolean;
  onSelect: () => void;
  onStatusChange: (newStatus: string) => void;
}

const SchoolCards: React.FC<SchoolCardsProps> = ({
  name,
  type,
  date,
  schoolStatus,
  isSelected,
  onSelect,
  onStatusChange,
}) => {
  const [currentSchoolStatus, setCurrentSchoolStatus] = useState(
    schoolStatus || "pending",
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentSchoolStatus(schoolStatus || "pending");
  }, [schoolStatus]);

  const normalizedSchoolStatus = (currentSchoolStatus || "").toLowerCase();
  const displaySchoolStatus =
    normalizedSchoolStatus.charAt(0).toUpperCase() +
    normalizedSchoolStatus.slice(1);
  const isPending = normalizedSchoolStatus === "pending";
  const isApproved =
    normalizedSchoolStatus === "approved" ||
    normalizedSchoolStatus === "accepted";
  const isRejected = normalizedSchoolStatus === "rejected";

  const statusColor = isApproved
    ? "bg-green-200 text-green-800"
    : isRejected
      ? "bg-red-200 text-red-800"
      : "bg-yellow-200 text-yellow-800";

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
        setCurrentSchoolStatus("approved");
        onStatusChange("approved");
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
        setCurrentSchoolStatus("rejected");
        onStatusChange("rejected");
      }
    });
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    Swal.fire({
      title: name,
      html: `
        <div style="text-align:left;line-height:1.8;">
          <p><strong>Type:</strong> ${type} School</p>
          <p><strong>Joined:</strong> ${date}</p>
          <p><strong>School Status:</strong> ${displaySchoolStatus}</p>
        </div>
      `,
      icon: "info",
      confirmButtonColor: "#4f46e5",
      confirmButtonText: "Close",
      background: "#ffffff",
      customClass: {
        popup: "rounded-2xl shadow-xl",
        title: "text-gray-800 font-semibold text-xl",
        confirmButton: "rounded-xl px-6 py-2 font-medium",
      },
    });
  };

  return (
    <div className="w-full">
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
              {displaySchoolStatus}
            </p>
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
          <button
            onClick={handleViewDetails}
            className="flex items-center justify-center gap-2 w-full border border-[#0000001A] py-2 rounded-3xl text-[#1A1A1A] font-medium hover:from-indigo-100 hover:to-blue-100 transition-all"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
        </div>
      </div>

      {isSelected && (
        <div className="mt-3 flex items-center gap-2">
          {isPending && (
            <>
              <button
                onClick={handleApprove}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F5E900] px-4 py-1.5 text-[13px] font-semibold text-[#111111] shadow-sm hover:bg-[#EBDD00] transition-all"
              >
                <FaCheck size={11} className="text-[#111111]" /> Approved
              </button>
              <button
                onClick={handleReject}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FEE2E2] px-4 py-1.5 text-[13px] font-semibold text-[#991B1B] shadow-sm hover:bg-[#FECACA] transition-all"
              >
                <FaTimesCircle size={11} className="text-[#991B1B]" /> Rejected
              </button>
            </>
          )}

          {isApproved && (
            <button
              disabled
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#DCFCE7] px-4 py-1.5 text-[13px] font-semibold text-[#166534] shadow-sm cursor-not-allowed"
            >
              <FaCheck size={11} className="text-[#166534]" /> Approved
            </button>
          )}

          {isRejected && (
            <button
              disabled
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FEE2E2] px-4 py-1.5 text-[13px] font-semibold text-[#991B1B] shadow-sm cursor-not-allowed"
            >
              <FaTimesCircle size={11} className="text-[#991B1B]" /> Rejected
            </button>
          )}
        </div>
      )}
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/all-user?role=school`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch schools");
      }
      return response.json();
    },
  });

  const schools = data?.data || []; // ধরে নিচ্ছি response এ { success: true, data: [...] } আসছে

  // Update school status (PUT)
  const updateSchoolMutation = useMutation({
    mutationFn: async ({
      id,
      schoolStatus,
    }: {
      id: string | number;
      schoolStatus: string;
    }) => {
      // const token = localStorage.getItem("token") || "";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ schoolStatus }),
        },
      );

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

  const [selectedSchool, setSelectedSchool] = useState<string | number | null>(
    null,
  );

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
              date={
                school.createdAt
                  ? new Date(school.createdAt).toLocaleDateString()
                  : "N/A"
              }
              schoolStatus={school.schoolStatus || "pending"}
              isSelected={selectedSchool === (school._id || school.id)}
              onSelect={() => handleSelectSchool(school._id || school.id)}
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
