'use client';

import React from 'react';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="sticky top-0 z-30 flex h-[88px] w-full items-center justify-between border-b bg-white px-8 shadow-sm">
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold text-[#CCCC00]">Aspiring School</h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="font-semibold text-gray-800 text-sm">Admin User</p>
                    <p className="text-xs text-gray-500">Administration</p>
                </div>
                <div className="relative h-10 w-10">
                    <Image
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
                        alt="Admin Avatar"
                        fill
                        className="rounded-full object-cover border-2 border-gray-200 shadow-sm"
                    />
                </div>
            </div>
        </header>
    );
}
