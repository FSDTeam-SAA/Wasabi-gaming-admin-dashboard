"use client";
import React from "react";
import { Upload, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const CourseFields = ({ formData, onChange, edit = false }) => {
    // Helper to update a specific video entry
    const handleVideoChange = (index, field, value) => {
        const updatedVideos = [...(formData.videos || [])];
        updatedVideos[index] = { ...updatedVideos[index], [field]: value };
        onChange("videos", updatedVideos);
    };

    // Add a new empty video+title field
    const addVideoField = () => {
        const updatedVideos = [...(formData.videos || []), { file: null, title: "" }];
        onChange("videos", updatedVideos);
    };

    return (
        <div className="space-y-4">
            {/* Course Name */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Course Name</Label>
                    <Input
                        type="text"
                        placeholder="Course name"
                        value={formData.courseName || ""}
                        onChange={(e) => onChange("courseName", e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Course Price</Label>
                    <Input
                        type="text"
                        placeholder="Course Price"
                        value={formData.coursePrice || ""}
                        onChange={(e) => onChange("coursePrice", e.target.value)}
                    />
                </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                    rows={3}
                    placeholder="Brief description of the course..."
                    value={formData.description || ""}
                    onChange={(e) => onChange("description", e.target.value)}
                    className="resize-none"
                />
            </div>

            {/* Grade & Category */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Grade level</Label>
                    <Select
                        value={formData.grade || ""}
                        onValueChange={(value) => onChange("grade", value)}
                    >
                        <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="6">Grade 6</SelectItem>
                            <SelectItem value="7">Grade 7</SelectItem>
                            <SelectItem value="8">Grade 8</SelectItem>
                            <SelectItem value="9">Grade 9</SelectItem>
                            <SelectItem value="10">Grade 10</SelectItem>
                            <SelectItem value="11">Grade 11</SelectItem>
                            <SelectItem value="12">Grade 12</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                        value={formData.category || ""}
                        onValueChange={(value) => onChange("category", value)}
                    >
                        <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Science">Science</SelectItem>
                            <SelectItem value="Mathematics">Mathematics</SelectItem>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Technology">Technology</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Videos Section */}
            <div className="space-y-2">
                <Label className="mb-2 block">Course Videos</Label>

                {(formData.videos || []).map((video, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row md:items-center gap-2 border p-4 rounded-lg"
                    >
                        {/* Video Upload */}
                        <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer hover:border-yellow-400 transition">
                            <Upload className="h-6 w-6 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-400">MP4, MOV (Max. 50MB)</p>

                            <input
                                type="file"
                                accept="video/*"
                                className="hidden"
                                onChange={(e) =>
                                    handleVideoChange(index, "file", e.target.files[0])
                                }
                            />
                        </label>

                        {/* Video Title */}
                        <div className="flex-1 flex flex-col">
                            <Label>Video Title</Label>
                            <Input
                                type="text"
                                placeholder="Enter video title"
                                value={video.title || ""}
                                onChange={(e) =>
                                    handleVideoChange(index, "title", e.target.value)
                                }
                            />
                        </div>

                        {/* Show current file name if editing */}
                        {edit && video.fileName && (
                            <p className="text-xs text-gray-500 mt-2">
                                Current file: <span className="font-medium">{video.fileName}</span>
                            </p>
                        )}
                    </div>
                ))}

                {/* Add new video button */}
                <button
                    type="button"
                    onClick={addVideoField}
                    className="flex items-center gap-2 text-yellow-500 hover:text-yellow-600 font-medium mt-2"
                >
                    <Plus className="w-4 h-4" /> Add another video
                </button>
            </div>
        </div>
    );
};

export default CourseFields;
