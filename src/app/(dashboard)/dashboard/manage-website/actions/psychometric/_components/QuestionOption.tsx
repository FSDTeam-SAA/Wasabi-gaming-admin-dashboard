// ============================================================================
// Components - QuestionOption (components/QuestionOption.tsx)
// ============================================================================
import { CheckCircle2, Circle } from 'lucide-react'

interface QuestionOptionProps {
  option: string
  index: number
  isCorrect: boolean
  isEditing: boolean
  onSelect?: () => void
  onChange?: (value: string) => void
}

export function QuestionOption({
  option,
  index,
  isCorrect,
  isEditing,
  onSelect,
  onChange,
}: QuestionOptionProps) {
  const label = String.fromCharCode(65 + index)

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <div onClick={onSelect} className="cursor-pointer">
          {isCorrect ? (
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          ) : (
            <Circle className="w-6 h-6 text-gray-400" />
          )}
        </div>
        <span className="w-8 text-center font-bold">{label}</span>
        <input
          type="text"
          value={option}
          onChange={e => onChange?.(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    )
  }

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
        isCorrect ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'
      }`}
    >
      <div className="flex-none w-10 h-10 rounded-full flex items-center justify-center border-2 border-gray-300 font-bold">
        {label}
      </div>
      <p className="flex-1 font-medium">{option}</p>
      {isCorrect && <CheckCircle2 className="w-6 h-6 text-green-600" />}
    </div>
  )
}
