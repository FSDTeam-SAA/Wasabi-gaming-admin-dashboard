"use client";
import React from "react";
import { Upload } from "lucide-react";

const CourseFields = ({ formData, onChange, edit = false }) => {
    return (
        <div className="space-y-4">
      
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Name
                </label>
                <input
                    type="text"
                    placeholder="Course name"
                    value={formData.courseName || ""}
                    onChange={(e) => onChange("courseName", e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
            </div>


            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <textarea
                    rows={3}
                    placeholder="Brief description of the course..."
                    value={formData.description || ""}
                    onChange={(e) => onChange("description", e.target.value)}
                    className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
            </div>

           
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Grade level
                    </label>
                    <select
                        value={formData.grade || ""}
                        onChange={(e) => onChange("grade", e.target.value)}
                        className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                        <option value="">Select grade</option>
                        <option value="9th Grade">9th Grade</option>
                        <option value="10th Grade">10th Grade</option>
                        <option value="11th Grade">11th Grade</option>
                        <option value="12th Grade">12th Grade</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <select
                        value={formData.category || ""}
                        onChange={(e) => onChange("category", e.target.value)}
                        className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                        <option value="">Select category</option>
                        <option value="Science">Science</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="English">English</option>
                        <option value="Technology">Technology</option>
                    </select>
                </div>
            </div>

   
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload course video
                </label>

                <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-yellow-400 transition">
                    <Upload className="h-6 w-6 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                        Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">
                        MP4, MOV (Max. 50MB)
                    </p>

                    <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={(e) =>
                            onChange("video", e.target.files[0])
                        }
                    />
                </label>

   
                {edit && formData.videoName && (
                    <p className="text-xs text-gray-500 mt-2">
                        Current file: <span className="font-medium">{formData.videoName}</span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default CourseFields;
