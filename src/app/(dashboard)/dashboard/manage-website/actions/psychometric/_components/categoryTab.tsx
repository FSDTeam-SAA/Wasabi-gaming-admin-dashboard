// ============================================================================
// Components - CategoryTab (components/CategoryTab.tsx)
// ============================================================================
import { TabsContent } from '@/components/ui/tabs'
import { EmptyTestState } from './emptyTestState'
import { Category, PsychometricTest, Question } from '@/types/psychometric'
import { Card } from '@/components/ui/card'
import { QuestionEditor } from './QuestionEditor'
import { QuestionCard } from './questionCard'
import { Button } from '@/components/ui/button'
import { Loader2, Plus, Trash2 } from 'lucide-react'

interface CategoryTabProps {
  category: Category
  test: PsychometricTest | undefined
  editingState: { testId: string; questionId: string } | null
  onEdit: (
    testId: string | null,
    questionId: string | null,
    categoryApiName?: string,
  ) => void
  onCancelEdit: () => void
  onSave: (testId: string, questionId: string, data: Partial<Question>) => void
  onDelete: (testId: string, questionId: string) => void
  onAddQuestion: (testId: string) => void
  onDeleteTest: (testId: string) => void
  saving: boolean
}

export function CategoryTab({
  category,
  test,
  editingState,
  onEdit,
  onCancelEdit,
  onSave,
  onDelete,
  onAddQuestion,
  onDeleteTest,
  saving,
}: CategoryTabProps) {
  if (!test) {
    return (
      <TabsContent value={category.id} className="space-y-6">
        <EmptyTestState
          onCreateTest={() => onEdit(null, null, category.apiName)}
          saving={saving}
        />
      </TabsContent>
    )
  }

  return (
    <TabsContent value={category.id} className="space-y-6">
      {test.allQuestions.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">
            No questions added yet. Click &quot;Add Question&quot; to create
            your first question.
          </p>
        </Card>
      ) : (
        test.allQuestions.map((question, idx) => {
          const isEditing =
            editingState?.testId === test._id &&
            editingState?.questionId === question._id

          return isEditing ? (
            <QuestionEditor
              key={question._id}
              test={test}
              question={question}
              index={idx}
              onSave={data => onSave(test._id, question._id, data)}
              onCancel={onCancelEdit}
              saving={saving}
            />
          ) : (
            <QuestionCard
              key={question._id}
              test={test}
              question={question}
              index={idx}
              onEdit={() => onEdit(test._id, question._id)}
              onDelete={() => onDelete(test._id, question._id)}
              disabled={saving}
            />
          )
        })
      )}

      <div className="flex gap-2 pt-4">
        <Button
          onClick={() => onAddQuestion(test._id)}
          className="flex-1"
          variant="secondary"
          disabled={saving}
        >
          {saving ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Plus className="w-4 h-4 mr-2" />
          )}
          Add Question
        </Button>
        <Button
          onClick={() => onDeleteTest(test._id)}
          variant="destructive"
          disabled={saving}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Test
        </Button>
      </div>
    </TabsContent>
  )
}
