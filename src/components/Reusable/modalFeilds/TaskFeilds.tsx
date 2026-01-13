"use client";
import React from "react";

const TaskFields = ({ formData, onChange, edit = false }) => {
    return (
        <div className="space-y-4">
            {/* Task Title */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Title
                </label>
                <input
                    type="text"
                    placeholder="e.g., Physics Lab Report"
                    value={formData.title || ""}
                    onChange={(e) => onChange("title", e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
            </div>

            {/* Course */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course
                </label>
                <select
                    value={formData.course || ""}
                    onChange={(e) => onChange("course", e.target.value)}
                    className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                    <option value="">Select course</option>
                    <option value="Physics Fundamentals">
                        Physics Fundamentals
                    </option>
                    <option value="Mathematics">
                        Mathematics
                    </option>
                    <option value="Chemistry">
                        Chemistry
                    </option>
                </select>
            </div>

            {/* Due Date & Total Students */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Due Date
                    </label>
                    <input
                        type="date"
                        value={formData.dueDate || ""}
                        onChange={(e) => onChange("dueDate", e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Total Students
                    </label>
                    <input
                        type="number"
                        placeholder="0"
                        value={formData.totalStudents || ""}
                        onChange={(e) =>
                            onChange("totalStudents", e.target.value)
                        }
                        disabled={edit}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                            edit
                                ? "bg-gray-100 cursor-not-allowed"
                                : "focus:ring-2 focus:ring-yellow-400"
                        }`}
                    />
                </div>
            </div>

            {/* Edit-only Fields */}
            {edit && (
                <>
                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            value={formData.status || "Pending"}
                            onChange={(e) =>
                                onChange("status", e.target.value)
                            }
                            className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Overdue">Overdue</option>
                        </select>
                    </div>

                    {/* Submissions */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Submissions
                        </label>
                        <input
                            type="text"
                            value={formData.submissions || ""}
                            disabled
                            className="w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskFields;
