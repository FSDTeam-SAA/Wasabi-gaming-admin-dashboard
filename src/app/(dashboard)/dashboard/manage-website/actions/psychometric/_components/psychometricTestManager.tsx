// ============================================================================
// Main Component (app/psychometric/page.tsx or components/PsychometricTestManager.tsx)
// ============================================================================
'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { usePsychometricTests } from '@/hooks/usePsychometricTest'
import { CATEGORIES } from '../constants'
import { Question } from '@/types/psychometric'
import { CategoryTab } from './categoryTab'
import { Button } from '@/components/ui/button'

export default function PsychometricTestManager() {
  const [activeTab, setActiveTab] = useState('')
  const [editingTest, setEditingTest] = useState<{
    testId: string
    questionId: string
  } | null>(null)

  const {
    tests,
    isLoading,
    isSaving,
    createTest,
    updateQuestion,
    addQuestion,
    deleteQuestion,
    deleteTest,
  } = usePsychometricTests()

  useEffect(() => {
    if (tests.length > 0 && !activeTab) {
      const firstCategory = CATEGORIES.find(c =>
        tests.some(t => t.category === c.apiName),
      )
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(firstCategory?.id || CATEGORIES[0].id)
    }
  }, [tests, activeTab])

  const handleEdit = (
    testId: string | null,
    questionId: string | null,
    categoryApiName?: string,
  ) => {
    if (categoryApiName) {
      createTest(categoryApiName)
    } else if (testId && questionId) {
      setEditingTest({ testId, questionId })
    }
  }

  const handleSave = (
    testId: string,
    questionId: string,
    data: Partial<Question>,
  ) => {
    updateQuestion(testId, questionId, data)
    setEditingTest(null)
  }

  const handleDelete = (testId: string, questionId: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      deleteQuestion(testId, questionId)
    }
  }

  const handleDeleteTest = (testId: string) => {
    if (
      confirm(
        'Are you sure you want to delete this entire test? This action cannot be undone.',
      )
    ) {
      deleteTest(testId)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading tests...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-full mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            Edit Psychometric Question Sections
          </h1>
          <p className="text-muted-foreground">
            Make changes to this section here. Click save when you&apos;re done.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            {CATEGORIES.map(cat => (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {CATEGORIES.map(category => {
            const categoryTests = tests.filter(
              t => t.category === category.apiName,
            )
            const currentTest = categoryTests[0]

            return (
              <CategoryTab
                key={category.id}
                category={category}
                test={currentTest}
                editingState={editingTest}
                onEdit={handleEdit}
                onCancelEdit={() => setEditingTest(null)}
                onSave={handleSave}
                onDelete={handleDelete}
                onAddQuestion={addQuestion}
                onDeleteTest={handleDeleteTest}
                saving={isSaving}
              />
            )
          })}
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t mt-6">
          <Button variant="outline" onClick={() => window.history.back()}>
            Cancel
          </Button>
          <Button
            onClick={() =>
              toast.success('All changes are automatically saved!')
            }
          >
            Done
          </Button>
        </div>
      </div>
    </>
  )
}
