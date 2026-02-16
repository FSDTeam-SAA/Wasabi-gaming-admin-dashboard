'use client';

import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';

interface User {
  email?: string;
  role?: string;
  profileImage?: string;
}

export default function Header() {
  const { data: session }: { data: Session | null } = useSession();

  const user: User = session?.user || {};

  return (
    <header className="sticky top-0 z-30 flex h-[88px] w-full items-center justify-between border-b bg-white px-8 shadow-sm">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-[#CCCC00]">Aspiring School</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-gray-800 text-sm">{user.email || 'No Email'}</p>
          <p className="text-xs text-gray-500">{user.role || 'No Role'}</p>
        </div>
        <div className="relative h-10 w-10">
          {user.profileImage ? (
            <Image
              src={user.profileImage}
              alt="Admin Avatar"
              fill
              className="rounded-full object-cover border-2 border-gray-200 shadow-sm"
            />
          ) : (
            <div className="rounded-full bg-gray-200 w-full h-full flex items-center justify-center text-gray-500 text-sm">
              N/A
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
