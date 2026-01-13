"use client";
import React from "react";

const StudentForm = ({ formData, onChange }) => {
    return (
        <div className="space-y-4">
            {/* Full Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                </label>
                <input
                    type="text"
                    placeholder="e.g., John Doe"
                    value={formData.fullName || ""}
                    onChange={(e) => onChange("fullName", e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
            </div>

            {/* Email Address */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                </label>
                <input
                    type="email"
                    placeholder="student@email.com"
                    value={formData.email || ""}
                    onChange={(e) => onChange("email", e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
            </div>

            {/* Grade Level & Status */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Grade Level
                    </label>
                    <select
                        value={formData.grade || ""}
                        onChange={(e) => onChange("grade", e.target.value)}
                        className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                        <option value="">Select grade</option>
                        <option value="Grade 1">Grade 1</option>
                        <option value="Grade 2">Grade 2</option>
                        <option value="Grade 3">Grade 3</option>
                        <option value="Grade 4">Grade 4</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                    </label>
                    <select
                        value={formData.status || "Active"}
                        onChange={(e) => onChange("status", e.target.value)}
                        className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default StudentForm;
