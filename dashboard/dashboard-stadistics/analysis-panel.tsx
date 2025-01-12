"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const examCreationData = [
  { month: "Ene", exams: 65 },
  { month: "Feb", exams: 59 },
  { month: "Mar", exams: 80 },
  { month: "Abr", exams: 81 },
  { month: "May", exams: 56 },
  { month: "Jun", exams: 55 },
  { month: "Jul", exams: 40 },
]

const questionDistributionData = [
  { exam: "Matemáticas", questions: 50 },
  { exam: "Historia", questions: 30 },
  { exam: "Ciencias", questions: 40 },
  { exam: "Literatura", questions: 25 },
  { exam: "Geografía", questions: 35 },
]

const questionTypesData = [
  { type: "Opción múltiple", value: 400 },
  { type: "Verdadero/Falso", value: 300 },
  { type: "Respuesta corta", value: 200 },
  { type: "Ensayo", value: 100 },
  { type: "Emparejamiento", value: 50 },
]

export function AnalysisPanel() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Creación de exámenes por mes</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{
            exams: {
              label: "Exámenes",
              color: "hsl(var(--chart-1))",
            },
          }} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={examCreationData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="exams" stroke="var(--color-exams)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Distribución de preguntas por examen</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{
            questions: {
              label: "Preguntas",
              color: "hsl(var(--chart-2))",
            },
          }} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={questionDistributionData}>
                <XAxis dataKey="exam" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="questions" fill="var(--color-questions)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tipos de preguntas más comunes</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{
            value: {
              label: "Cantidad",
              color: "hsl(var(--chart-3))",
            },
          }} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={questionTypesData}
                  dataKey="value"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="var(--color-value)"
                  label
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

