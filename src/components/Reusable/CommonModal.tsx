"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const CommonModal = ({
                         isOpen,
                         onClose,
                         onSave,
                         title,
                         fields = [],
                         initialData = {},
                         submitText = "Save",
                     }) => {
    const [formData, setFormData] = useState({});


    useEffect(() => {
        if (isOpen) {
            const initialFormData = {};
            fields.forEach(field => {
                initialFormData[field.name] = initialData[field.name] || "";
            });
            setFormData(initialFormData);
        }
    }, [isOpen]); 

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e, name) => {
        const file = e.target.files?.[0];
        if (file) handleChange(name, file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 flex items-center justify-center"
                        type="button"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {fields.map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {field.label}
                            </label>

                            {field.type === "text" && (
                                <input
                                    type="text"
                                    value={formData[field.name] || ""}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                    placeholder={field.placeholder}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            )}

                            {field.type === "textarea" && (
                                <textarea
                                    value={formData[field.name] || ""}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                    placeholder={field.placeholder}
                                    rows={field.rows || 3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                            )}

                            {field.type === "select" && (
                                <select
                                    value={formData[field.name] || ""}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                >
                                    <option value="">{field.placeholder || "Select an option"}</option>
                                    {field.options?.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            )}

                            {field.type === "file" && (
                                <div className="w-full">
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileChange(e, field.name)}
                                        accept={field.accept}
                                        className="w-full text-sm text-gray-500 border border-gray-300 rounded-md
                             file:mr-4 file:py-2 file:px-4 file:rounded-md file:text-sm
                             file:font-semibold file:bg-gray-800 file:text-white
                             hover:file:bg-gray-900 hover:cursor-pointer"
                                    />
                                    {formData[field.name] && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            Selected: {formData[field.name].name}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="flex gap-3 justify-end pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className=" bg-gray-300 hover:bg-gray-400 popmed text-gray-800 py-2 px-4 rounded-[20px] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className=" rounded-[20px] bg-[#FFFF00] popmed text-black py-2 px-4 transition-colors"
                        >
                            {submitText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CommonModal;