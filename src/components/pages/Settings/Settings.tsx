"use client";
import React, { useRef, useState } from 'react';
import Headers from "../../Reusable/Headers";

const Settings = () => {
    const fileInputRef = useRef(null);
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [fileName, setFileName] = useState("Upload your profile picture");

    const handleUploadClick = () => {
        // Trigger the hidden file input
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfileImage(file);
            setFileName(file.name);

            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleRemoveImage = () => {
        setProfileImage(null);
        setImagePreview(null);
        setFileName("Upload your profile picture");
        // Clear the file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleUpdateAccount = () => {
        // Handle form submission
        if (profileImage) {
            console.log('Uploading image:', profileImage);
            // Here you would typically upload to your backend
            // You can use FormData or your preferred method
            const formData = new FormData();
            formData.append('profileImage', profileImage);

            // Example API call:
            // axios.post('/api/upload-profile', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // });
        }

        // Handle other form data updates
        console.log('Updating account...');
    };

    return (
        <div className="min-h-screen">
            <Headers
                title="Settings"
                subHeader="Manage your account and platform settings"
            />

            <div className="max-w-8xl mx-auto mt-1">
                {/* Account Content - Directly displayed without tabs */}
                <div className="bg-white rounded-[20px] shadow-sm p-6">
                    <h3 className="text-lg popbold text-gray-900">Account Details</h3>
                    <p className="text-[16px] text-[#737373] mt-1">Manage your account information</p>

                    <div className="mt-6 space-y-5">
                        {/* Profile Image Preview and Upload */}
                        <div className="flex items-center space-x-4 mb-4">
                            {imagePreview && (
                                <div className="relative">
                                    <img
                                        src={imagePreview}
                                        alt="Profile preview"
                                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}

                            <div className="flex-1">
                                <label className="block text-sm font-medium popmed text-gray-700 mb-2">
                                    Profile Picture
                                </label>

                                <div className="flex items-center space-x-3">
                                    <input
                                        type="text"
                                        value={fileName}
                                        readOnly
                                        className="flex-1 popreg rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm h-10 px-3 border cursor-not-allowed"
                                    />

                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="hidden"
                                    />

                                    <button
                                        type="button"
                                        onClick={handleUploadClick}
                                        className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                    >
                                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                    </button>
                                </div>

                                <p className="mt-2 text-xs text-gray-500">
                                    Supported formats: JPG, PNG, GIF. Max size: 5MB
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="block font-medium text-sm popmed text-gray-700">Full Name</label>
                            <input
                                type="text"
                                defaultValue="Admin User"
                                className="mt-1 block w-full popreg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10 px-3 border"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium popmed text-gray-700">Email Address</label>
                            <input
                                type="email"
                                defaultValue="admin@aspiring.edu"
                                className="mt-1 popreg block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10 px-3 border"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm text-sm popmed font-medium text-gray-700">Phone</label>
                                <input
                                    type="text"
                                    defaultValue="+1 (555) 123-4567"
                                    className="mt-1 block popreg w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10 px-3 border"
                                />
                            </div>
                            <div>
                                <label className="block text-sm  popmed font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    defaultValue="123 Education Street"
                                    className="mt-1 block w-full popreg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10 px-3 border"
                                />
                            </div>
                        </div>

                        <div className="border-t pt-5">
                            <label className="block text-sm font-medium popmed text-gray-700">Current Password</label>
                            <input
                                type="password"
                                className="mt-1 block w-full popreg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10 px-3 border"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium popmed text-gray-700">New Password</label>
                                <input
                                    type="password"
                                    className="mt-1 block popreg w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10 px-3 border"
                                />
                            </div>
                            <div>
                                <label className="block text-sm popmed font-medium text-gray-700">Confirm Password</label>
                                <input
                                    type="password"
                                    className="mt-1 block w-full popreg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10 px-3 border"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleUpdateAccount}
                        className="mt-6 bg-[#FFFF00] hover:bg-yellow-500 text-black font-medium py-2 px-6 rounded-full transition-colors"
                    >
                        Update Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;