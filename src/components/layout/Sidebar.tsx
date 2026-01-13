'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileQuestion,
  ShoppingBag,
  School,
  Gavel,
  ClipboardList,
  Flag,
  Crown,
  Settings,
  LogOut,
} from 'lucide-react'

const sidebarItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Students', href: '/students', icon: Users },
  { label: 'Courses', href: '/courses', icon: BookOpen },
  { label: 'Quizzes', href: '/quiz', icon: FileQuestion },
  { label: 'Manage Jobs', href: '/manage-jobs', icon: ShoppingBag },
  { label: 'Manage Schools', href: '/manage-schools', icon: School },
  { label: 'Manage Law Firms', href: '/manage-law-firms', icon: Gavel },
  {
    label: 'Application Tracker',
    href: '/application-tacker',
    icon: ClipboardList,
  },
  { label: 'Portfolio', href: '/portfolio', icon: Flag },
  { label: 'Premium', href: '/premium', icon: Crown },
  { label: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[280px] border-r bg-white flex flex-col justify-between">
      <div className="h-full flex flex-col overflow-y-auto">
        {/* Logo Section */}
        <div className="mt-10 mb-8 px-6 flex items-center gap-2">
          <div className="relative h-[42px] w-[42px]">
            <Image
              src="/images/Container.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <p className="popreg text-[16px] leading-tight">Aspiring</p>
            <p className="text-[#737373] text-[12px]">Admin Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-4 mb-6">
          {sidebarItems.map(item => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-4 py-3 text-[15px] font-medium transition-colors popreg',
                  isActive
                    ? 'bg-[#FEF9C2] text-black'
                    : 'text-[#737373] hover:bg-gray-50 hover:text-black',
                )}
              >
                <item.icon className="h-[18px] w-[18px]" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t bg-white sticky bottom-0">
        <Button
          variant="ghost"
          className="w-full justify-center gap-2 bg-[#F7F7F7] text-black font-semibold rounded-xl py-6 hover:bg-red-50 hover:text-red-600 shadow-sm border border-transparent hover:border-red-100"
          onClick={() => {
            // Handle explicit logout logic here if needed
            window.location.href = '/'
          }}
        >
          <span className="text-base">Logout</span>
        </Button>
      </div>
    </aside>
  )
}
