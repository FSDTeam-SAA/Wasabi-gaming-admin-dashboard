"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const StudentForm = ({ formData, onChange }) => {
    return (
        <div className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                    type="text"
                    placeholder="e.g., John Doe"
                    value={formData.fullName || ""}
                    onChange={(e) => onChange("fullName", e.target.value)}
                />
            </div>

            {/* Email Address */}
            <div className="space-y-2">
                <Label>Email Address</Label>
                <Input
                    type="email"
                    placeholder="student@email.com"
                    value={formData.email || ""}
                    onChange={(e) => onChange("email", e.target.value)}
                />
            </div>

            {/* Grade Level & Status */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Grade Level</Label>
                    <Select
                        value={formData.grade || ""}
                        onValueChange={(value) => onChange("grade", value)}
                    >
                        <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Grade 1">Grade 1</SelectItem>
                            <SelectItem value="Grade 2">Grade 2</SelectItem>
                            <SelectItem value="Grade 3">Grade 3</SelectItem>
                            <SelectItem value="Grade 4">Grade 4</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                        value={formData.status || "Active"}
                        onValueChange={(value) => onChange("status", value)}
                    >
                        <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default StudentForm;
