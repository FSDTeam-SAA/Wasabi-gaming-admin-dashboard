'use client'
import React, { useState } from 'react'
import { toast } from 'sonner'

interface SecuritySettingsProps {
    token: string
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ token }) => {
    const [securityForm, setSecurityForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleChangePassword = async () => {
        // Validation
        if (!securityForm.currentPassword || !securityForm.newPassword || !securityForm.confirmPassword) {
            toast.error('All fields are required')
            return
        }

        if (securityForm.newPassword !== securityForm.confirmPassword) {
            toast.error('New password and confirm password do not match')
            return
        }

        if (securityForm.newPassword.length < 6) {
            toast.error('New password must be at least 6 characters long')
            return
        }

        try {
            setIsLoading(true)
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/change-password`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        oldPassword: securityForm.currentPassword,
                        newPassword: securityForm.newPassword,
                    }),
                },
            )

            const result = await response.json()

            if (response.ok) {
                toast.success('Password changed successfully')
                // Clear form
                setSecurityForm({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                })
            } else {
                toast.error(result.message || 'Failed to change password')
            }
        } catch (error) {
            console.error('Error changing password:', error)
            toast.error('Error changing password')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg popbold text-gray-900">Security Settings</h3>
            <p className="text-sm text-gray-500 mt-1">
                Manage your account security options
            </p>

            <div className="mt-6 space-y-5">
                {/* Current Password */}
                <div>
                    <label className="block text-sm font-medium popmed text-gray-700">
                        Current Password
                    </label>
                    <input
                        type="password"
                        value={securityForm.currentPassword}
                        onChange={e =>
                            setSecurityForm({
                                ...securityForm,
                                currentPassword: e.target.value,
                            })
                        }
                        className="mt-1 block w-full popreg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10 px-3 border"
                        placeholder="Enter current password"
                    />
                </div>

                {/* New Password */}
                <div>
                    <label className="block text-sm font-medium popmed text-gray-700">
                        New Password
                    </label>
                    <input
                        type="password"
                        value={securityForm.newPassword}
                        onChange={e =>
                            setSecurityForm({ ...securityForm, newPassword: e.target.value })
                        }
                        className="mt-1 block w-full popreg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10 px-3 border"
                        placeholder="Enter new password"
                    />
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm font-medium popmed text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        value={securityForm.confirmPassword}
                        onChange={e =>
                            setSecurityForm({
                                ...securityForm,
                                confirmPassword: e.target.value,
                            })
                        }
                        className="mt-1 block w-full popreg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10 px-3 border"
                        placeholder="Confirm new password"
                    />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                    <p className="text-xs text-blue-800">
                        <strong>Password Requirements:</strong> Minimum 6 characters
                    </p>
                </div>
            </div>

            <button
                onClick={handleChangePassword}
                disabled={isLoading}
                className="mt-6 bg-[#FFFF00] hover:bg-yellow-500 text-black font-medium py-2 px-6 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Changing...' : 'Change Password'}
            </button>
        </div>
    )
}

export default SecuritySettings
