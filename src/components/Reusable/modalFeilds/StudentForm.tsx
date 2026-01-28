'use client'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const StudentForm = ({ formData, onChange }) => {
  return (
    <div className="space-y-4">
      {/* Full Name */}
      <div className="space-y-2">
        <Label>Full Name</Label>
        <Input
          type="text"
          placeholder="e.g., John Doe"
          value={formData.fullName || ''}
          onChange={e => onChange('fullName', e.target.value)}
        />
      </div>

      {/* Email Address */}
      <div className="space-y-2">
        <Label>Email Address</Label>
        <Input
          type="email"
          placeholder="student@email.com"
          value={formData.email || ''}
          onChange={e => onChange('email', e.target.value)}
        />
      </div>

      {/* Grade Level & Status */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Year Level</Label>
          <Select
            value={formData.year || ''}
            onValueChange={value => onChange('year', value)}
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Year 1">Year 1</SelectItem>
              <SelectItem value="Year 2">Year 2</SelectItem>
              <SelectItem value="Year 3">Year 3</SelectItem>
              <SelectItem value="Year 4">Year 4</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={formData.status || 'Active'}
            onValueChange={value => onChange('status', value)}
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
  )
}

export default StudentForm
