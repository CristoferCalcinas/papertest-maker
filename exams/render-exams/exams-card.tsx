import { MoreVertical, Eye, Share2, Edit } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Exam } from './types'

interface ExamCardProps {
  exam: Exam
  view: 'grid' | 'list'
}

export function ExamsCard({ exam, view }: ExamCardProps) {
  return (
    <Card className={`transition-all duration-300 ease-in-out hover:shadow-lg ${
      view === 'list' ? 'flex' : ''
    }`}>
      <CardHeader className={view === 'list' ? 'w-1/3' : ''}>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{exam.title}</h3>
          <Badge variant={exam.status === 'published' ? 'default' : 'secondary'}>
            {exam.status}
          </Badge>
        </div>
        {exam.project && (
          <Badge variant="outline" className="mt-2">
            {exam.project}
          </Badge>
        )}
      </CardHeader>
      <CardContent className={view === 'list' ? 'w-1/3' : ''}>
        <p className="text-sm text-gray-500 mb-2">
          Creado el {exam.createdAt.toLocaleDateString()}
        </p>
        <Badge variant="secondary" className="mb-4">
          {exam.questionCount} preguntas
        </Badge>
        <div className="text-sm">
          <strong>Primeras preguntas:</strong>
          <ul className="list-disc list-inside mt-2">
            {exam.questions.slice(0, 2).map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className={`flex justify-between ${view === 'list' ? 'w-1/3' : ''}`}>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Vista previa
          </Button>
          <Button size="sm" variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Compartir
          </Button>
          <Button size="sm" variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </div>
        <Button size="icon" variant="ghost">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

