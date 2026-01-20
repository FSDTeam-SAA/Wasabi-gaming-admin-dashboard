'use client'
import React, { useState, useEffect, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import StudentForm from './modalFeilds/StudentForm'
import CourseFields from './modalFeilds/VideoFields'
import QuizFields from './modalFeilds/QuizFeilds'
import TaskFields from './modalFeilds/TaskFeilds'
import ManageSchoolFeilds from './modalFeilds/ManageSchoolFeilds'
import ManageJobFeilds from './modalFeilds/ManageJobFeilds'
import CreateLawFeilds from './modalFeilds/CreateLawFeilds'
import ManageApplicationFeild from './modalFeilds/ManageApplicationFeild'
import PortfolioFeilds from './modalFeilds/PortfolioFeilds'
import UpdatePlansFeilds from './modalFeilds/UpdatePlansFeilds'
import { Loader2 } from 'lucide-react'

interface ReusableModalProps {
  title: string
  location: string
  isOpen: boolean
  onClose: () => void
  onSave?: (data: any) => void
  subTitle?: string
  submitText?: string
  edit?: boolean
  data?: any
  loading?: boolean
  view?: boolean
  fields?: any[]
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  title,
  location,
  isOpen,
  onClose,
  onSave = () => {},
  subTitle,
  submitText = 'Save',
  edit,
  loading,
  data,
  view,
}) => {
  const [formData, setFormData] = useState<any>({})
  const hasSetInitialData = useRef(false)

  useEffect(() => {
    // Reset when modal closes
    if (!isOpen) {
      setFormData({})
      hasSetInitialData.current = false
      return
    }

    // Set initial data ONLY ONCE when modal first opens
    if (!hasSetInitialData.current) {
      if ((view || edit) && data) {
        setFormData(data)
      } else {
        setFormData({})
      }
      hasSetInitialData.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]) // Only depend on isOpen - no loop when formData changes

  const handleChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSave) {
      onSave(formData)
    }
  }

  const renderFormFields = () => {
    switch (location) {
      case 'student':
        return <StudentForm formData={formData} onChange={handleChange} />
      case 'quiz':
        return (
          <QuizFields formData={formData} onChange={handleChange} edit={edit} />
        )
      case 'course':
        return (
          <CourseFields
            formData={formData}
            onChange={handleChange}
            edit={edit}
          />
        )
      case 'task':
        return (
          <TaskFields formData={formData} onChange={handleChange} edit={edit} />
        )
      case 'manageJob':
        return (
          <ManageJobFeilds
            formData={formData}
            onChange={handleChange}
            edit={edit}
            job={data} // View/Edit mode uses this prop directly
            view={view}
            onClose={onClose}
          />
        )
      case 'manageSchool':
        return (
          <ManageSchoolFeilds
            formData={formData}
            onChange={handleChange}
            job={data}
            view={view}
            onClose={onClose}
            edit={edit}
          />
        )
      case 'createLawFirms':
        return (
          <CreateLawFeilds
            formData={formData}
            onChange={handleChange}
            job={data}
            view={view}
            edit={edit}
            onClose={onClose}
          />
        )
      case 'applicationTracker':
        return (
          <ManageApplicationFeild
            formData={formData}
            onChange={handleChange}
            job={data}
            view={view}
            onClose={onClose}
          />
        )
      case 'portfolio':
        return (
          <PortfolioFeilds
            formData={formData}
            onChange={handleChange}
            job={data}
            view={view}
            edit={edit}
            onClose={onClose}
          />
        )
      case 'plans':
        return (
          <UpdatePlansFeilds
            formData={formData}
            onChange={handleChange}
            job={data}
            view={view}
            edit={edit}
            onClose={onClose}
          />
        )
      default:
        return null
    }
  }

  const showButtons = !(
    view &&
    (location === 'manageSchool' ||
      location === 'manageJob' ||
      location === 'portfolio')
  )

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent
        className={`max-h-[90vh] overflow-y-auto ${
          view || location === 'portfolio' ? 'max-w-[60vw]' : 'max-w-4xl'
        }`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {subTitle && <DialogDescription>{subTitle}</DialogDescription>}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {renderFormFields()}

          {showButtons && (
            <DialogFooter className="gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="rounded-[20px]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#FFFF00] text-black hover:bg-[#FFFF00]/90 rounded-[20px]"
              >
                {submitText}{' '}
                {loading && <Loader2 className="animate-spin mr-2" />}
              </Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ReusableModal
