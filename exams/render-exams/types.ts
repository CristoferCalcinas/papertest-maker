export interface Exam {
  id: string
  title: string
  createdAt: Date
  questionCount: number
  project?: string
  status: 'draft' | 'published'
  questions: string[]
}

