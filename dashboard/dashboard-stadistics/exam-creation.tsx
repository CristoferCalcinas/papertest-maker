"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const examCreationBySubject = [
  { subject: "Matemáticas", count: 45 },
  { subject: "Historia", count: 30 },
  { subject: "Ciencias", count: 38 },
  { subject: "Literatura", count: 25 },
  { subject: "Geografía", count: 20 },
]

export function ExamCreation() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Creación de exámenes por asignatura</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{
            count: {
              label: "Exámenes creados",
              color: "hsl(var(--chart-4))",
            },
          }} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={examCreationBySubject}>
                <XAxis dataKey="subject" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-count)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

