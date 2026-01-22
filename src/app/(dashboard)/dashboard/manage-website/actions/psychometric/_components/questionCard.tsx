// ============================================================================
// Components - QuestionCard (components/QuestionCard.tsx)
// ============================================================================
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit2, Trash2 } from 'lucide-react'
import { PsychometricTest, Question } from '@/types/psychometric'
import { QuestionOption } from './QuestionOption'

interface QuestionCardProps {
  test: PsychometricTest
  question: Question
  index: number
  onEdit: () => void
  onDelete: () => void
  disabled?: boolean
}

export function QuestionCard({
  test,
  question,
  index,
  onEdit,
  onDelete,
  disabled,
}: QuestionCardProps) {
  return (
    <Card className="mb-4 border-2 hover:border-primary/50 transition-all">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-semibold text-lg">Question {index + 1}</h3>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={onEdit}
              disabled={disabled}
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={onDelete}
              disabled={disabled}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-4 bg-secondary/20 rounded-lg mb-4">
          <p className="font-medium">{question.question}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs px-2 py-1 bg-primary/10 rounded capitalize">
              {question.difficulty}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {question.options.map((option, idx) => (
            <QuestionOption
              key={idx}
              option={option}
              index={idx}
              isCorrect={option === question.answer}
              isEditing={false}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
