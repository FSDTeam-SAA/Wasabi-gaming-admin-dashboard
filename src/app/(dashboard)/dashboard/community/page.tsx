'use client'

import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2, Loader2 } from 'lucide-react'

// UI Components (assuming shadcn/ui)
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'

interface CommunityMember {
  _id: string
  fullName: string
  email: string
  age: number
  cityOrTown: string
  phoneNumber: string
  yearGroup: string
  status: string
  createdAt: string
}

const fetchMembers = async (): Promise<CommunityMember[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/community`)
  if (!res.ok) throw new Error('Failed to fetch community members')
  
  const json = await res.json()
  return json.data || []
}

const deleteMember = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/community/${id}`, {
    method: 'DELETE',
  })
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || 'Failed to delete member')
  }
  
  return true
}

export default function CommunityMembersPage() {
  const queryClient = useQueryClient()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  // Fetch members
  const { 
    data: members = [], 
    isLoading, 
    isError 
  } = useQuery({
    queryKey: ['community-members'],
    queryFn: fetchMembers,
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-members'] })
      setIsDeleteOpen(false)
      setDeleteId(null)
    },
    onError: (error) => {
      console.error('Delete failed:', error)
      // You can add toast notification here later
    }
  })

  const handleDeleteClick = (id: string) => {
    setDeleteId(id)
    setIsDeleteOpen(true)
  }

  const confirmDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId)
    }
  }

  return (
    <div className="w-full mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Community Members</h1>

      {isError ? (
        <div className="text-center py-10 text-red-600">
          Failed to load community members. Please try again later.
        </div>
      ) : isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : members.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          No members found in the community yet.
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>City/Town</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Year Group</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member._id}>
                  <TableCell className="font-medium">{member.fullName}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.age}</TableCell>
                  <TableCell>{member.cityOrTown}</TableCell>
                  <TableCell>{member.phoneNumber}</TableCell>
                  <TableCell>{member.yearGroup}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(member._id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this member? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              disabled={deleteMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Member'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}