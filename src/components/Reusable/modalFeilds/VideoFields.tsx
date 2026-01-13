"use client";
import React from "react";
import { Upload } from "lucide-react";
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
    return (
        <div className="space-y-4">
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
                <Label>Description</Label>
                <Textarea
                    rows={3}
                    placeholder="Brief description of the course..."
                    value={formData.description || ""}
                    onChange={(e) => onChange("description", e.target.value)}
                    className="resize-none"
                />
            </div>

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
                            <SelectItem value="9th Grade">9th Grade</SelectItem>
                            <SelectItem value="10th Grade">10th Grade</SelectItem>
                            <SelectItem value="11th Grade">11th Grade</SelectItem>
                            <SelectItem value="12th Grade">12th Grade</SelectItem>
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

            <div className="space-y-2">
                <Label className="mb-2 block">Upload course video</Label>

                <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-yellow-400 transition">
                    <Upload className="h-6 w-6 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                        Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">MP4, MOV (Max. 50MB)</p>

                    <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={(e) => onChange("video", e.target.files[0])}
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
