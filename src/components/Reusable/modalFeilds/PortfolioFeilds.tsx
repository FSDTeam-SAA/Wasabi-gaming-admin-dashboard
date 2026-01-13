"use client";
import React, { useState } from "react";

import PortfollioView from "./PortfollioView";
import TextEditor from './../editor/EditSection';

interface PortfolioFeildsProps {
    formData: any;
    onChange: (field: string, value: any) => void;
    edit?: boolean;
    view?: boolean;
    job?: any;
    onClose?: () => void;
}

const PortfolioFeilds: React.FC<PortfolioFeildsProps> = ({
    formData = {},
    onChange,
    edit = false,
    view = false,
    job: event,
    onClose,
}) => {
    const [imagePreview, setImagePreview] = useState(
        formData.imagePreview || null
    );

    const handleImageChange = (file: any) => {
        setImagePreview(URL.createObjectURL(file));
        onChange("image", file);
    };

    /* ================= VIEW MODE ================= */
    if (view) {
        return <PortfollioView data={formData} />;
    }

    return (
        <div className="space-y-4 h-[75vh] overflow-y-auto">
            {/* Header Title */}
            <h2 className="text-lg font-semibold text-gray-900">
                {edit ? "Edit Portfolio" : "Create Portfolio"}
            </h2>

            {/* Title */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                </label>
                <input
                    type="text"
                    placeholder="Enter title"
                    value={formData.title || ""}
                    onChange={(e) => onChange("title", e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
            </div>

            {/* Subtitle */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subtitle
                </label>
                <input
                    type="text"
                    placeholder="Enter subtitle"
                    value={formData.subtitle || ""}
                    onChange={(e) => onChange("subtitle", e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                    </label>
                    <input
                        type="date"
                        value={formData.date || ""}
                        onChange={(e) => onChange("date", e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time
                    </label>
                    <input
                        type="time"
                        value={formData.time || ""}
                        onChange={(e) => onChange("time", e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>
            </div>

            {/* Image Upload */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Image
                </label>

                <div className="flex items-center gap-4">
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="h-24 w-24 object-cover rounded-md border"
                        />
                    )}

                    <label className="px-4 py-2 border rounded-md cursor-pointer text-sm hover:bg-gray-50">
                        Upload Image
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) =>
                                handleImageChange(e.target.files[0])
                            }
                        />
                    </label>
                </div>
            </div>

            {/* Quill Editor */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                </label>
                <TextEditor
                    value={formData.content || ""}
                    onChange={(value) => onChange("content", value)}
                />
            </div>
        </div>
    );
};

export default PortfolioFeilds;
