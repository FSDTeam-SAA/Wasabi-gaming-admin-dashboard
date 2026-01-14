"use client";
import React, { useState } from "react";
import Headers from "../../Reusable/Headers";
import {
  FaBuilding,
  FaCalendar,
  FaEdit,
  FaEye,
  FaTrash,
} from "react-icons/fa";
import Swal from "sweetalert2";
import ReusableModal from "../../Reusable/ReusableModal";
import { FaPlus } from "react-icons/fa6";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

// Jobs Card Component (একদম অপরিবর্তিত)
const JobsCard = ({
  company,
  position,
  status,
  date,
  onDelete,
  onView,
  onEdit,
}) => {
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
        cancelButton: "rounded-xl px-6 py-2 font-medium",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "The job has been deleted successfully.",
          icon: "success",
          iconHtml:
            '<div class="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full"><FaCheck class="text-green-600 text-2xl" /></div>',
          background: "#ffffff",
          confirmButtonColor: "#10b981",
          confirmButtonText: "Done",
          customClass: {
            popup: "rounded-2xl shadow-xl",
            title: "text-gray-800 font-semibold text-xl",
            htmlContainer: "text-gray-600",
            confirmButton: "rounded-xl px-6 py-2 font-medium",
            icon: "border-0",
          },
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
        <p
          className={`text-sm px-4 py-1 rounded-3xl font-medium ${statusColor}`}
        >
          {status}
        </p>
      </div>

      <div className="space-y-3">
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
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { data: session } = useSession();
  const TOKEN = session?.user?.accessToken || "";

  const queryClient = useQueryClient();

  // Fetch jobs
  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job`);
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const result = await res.json();
      return result.data;
    },
  });

  // Create New Job Mutation
  const createManageJob = useMutation({
    mutationFn: async (newJob: any) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(newJob),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to create new job");
      }

      return res.json();
    },

    onSuccess: () => {
      Swal.fire({
        title: "Created!",
        text: "New job created successfully",
        icon: "success",
        confirmButtonText: "OK",
      });

      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      setIsModalOpen(false);
    },

    onError: (err: any) => {
      Swal.fire({
        title: "Error",
        text: err.message || "Could not create the job. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  // Update Job Mutation
  const updateJobMutation = useMutation({
    mutationFn: async (updatedJob: any) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/job/${updatedJob._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify(updatedJob),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to update job");
      }

      return res.json();
    },
    onSuccess: () => {
      Swal.fire({
        title: "Updated!",
        text: "Job updated successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      setIsEdit(false);
      setSelectedJob(null);
    },
    onError: (err: any) => {
      Swal.fire({
        title: "Error",
        text: err.message || "Could not update job",
        icon: "error",
      });
    },
  });

  // Delete Job Mutation
  const deleteMutation = useMutation({
    mutationFn: async (jobId: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/job/${jobId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to delete job");
      }

      return true;
    },

    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Job has been deleted successfully",
        icon: "success",
        confirmButtonText: "OK",
      });

      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },

    onError: (err: any) => {
      Swal.fire({
        title: "Error",
        text: err.message || "Could not delete the job. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  // Loading & Error states
  if (isLoading) return <div className="text-center py-10">Loading jobs...</div>;
  if (isError) return <div className="text-center py-10 text-red-600">Error loading jobs...</div>;

  const jobs = data || [];

  const handleDeleteJob = (jobId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(jobId);
      }
    });
  };

  const handleViewJob = (job: any) => {
    setSelectedJob(job);
    setIsViewOpen(true);
  };

  const handleEditJob = (job: any) => {
    setSelectedJob(job);
    setIsEdit(true);
  };

  const handleCloseCreateModal = () => {
    setIsModalOpen(false);
  };

  // Create or Update handler – এখন পেলোড সঠিকভাবে ম্যাপ করে পাঠানো হচ্ছে
  const handleSave = (rawFormData: any) => {
    // backend-এর প্রত্যাশিত ফরম্যাটে পেলোড তৈরি
    const payload = {
      title: rawFormData.title || "",
      location: rawFormData.location || "",
      companyName: rawFormData.company || "",          // ← company → companyName
      companyType: rawFormData.companyType || "Private",
      postedBy: rawFormData.postedBy || "Admin",
      level: rawFormData.level || "",
      salaryRange: rawFormData.salary || "",           // ← salary → salaryRange
      startDate: rawFormData.startDate
        ? new Date(rawFormData.startDate).toISOString()
        : "",
      applicationDeadline: rawFormData.deadline
        ? new Date(rawFormData.deadline).toISOString()
        : "",
      jobId: rawFormData.jobId || `JOB-${Date.now()}`,
      jobStatus: rawFormData.status || "Open",
      description: rawFormData.content || "",          // ← content → description
      responsibilities: rawFormData.responsibilities
        ? rawFormData.responsibilities.split("\n").filter((item: string) => item.trim())
        : [],
      additionalInfo: rawFormData.additionalInfo || "",
    };

    console.log("Sending payload to API:", payload);

    if (isEdit && selectedJob?._id) {
      // Edit mode
      updateJobMutation.mutate({
        ...payload,
        _id: selectedJob._id,
      });
    } else {
      // Create mode
      createManageJob.mutate(payload);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <Headers title={"Manage Jobs"} subHeader={"Approve all jobs"} />

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex gap-2 items-center bg-[#FFFF00] hover:bg-yellow-500 py-3 rounded-xl px-6 shadow-sm hover:shadow-md transition-all duration-300 font-semibold text-gray-900 hover:scale-105"
        >
          <FaPlus /> Add Jobs
        </button>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No jobs found. Add your first job!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobsCard
              key={job._id}
              company={job.companyName}
              position={job.title}
              status={job.jobStatus || "Open"}
              date={new Date(job.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              onDelete={() => handleDeleteJob(job._id)}
              onView={() => handleViewJob(job)}
              onEdit={() => handleEditJob(job)}
            />
          ))}
        </div>
      )}

      {/* Create Modal */}
      <ReusableModal
        isOpen={isModalOpen}
        onClose={handleCloseCreateModal}
        onSave={handleSave}
        location={"manageJob"}
        title="Create New Job"
        submitText="Create Job"
      />

      {/* View Modal */}
      <ReusableModal
        title="View Job"
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        data={selectedJob}
        location={"manageJob"}
        view={true}
      />

      {/* Edit Modal */}
      <ReusableModal
        title="Edit Job"
        isOpen={isEdit}
        onClose={() => setIsEdit(false)}
        onSave={handleSave}
        location={"manageJob"}
        data={selectedJob}
        edit={true}
      />
    </div>
  );
};

export default ManageJobs;