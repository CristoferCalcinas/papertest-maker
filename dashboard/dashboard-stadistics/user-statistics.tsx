"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const userActivityData = [
  { day: "Lun", active: 120 },
  { day: "Mar", active: 132 },
  { day: "Mié", active: 101 },
  { day: "Jue", active: 134 },
  { day: "Vie", active: 90 },
  { day: "Sáb", active: 230 },
  { day: "Dom", active: 210 },
]

export function UserStatistics() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Actividad de usuarios por día</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{
            active: {
              label: "Usuarios activos",
              color: "hsl(var(--chart-5))",
            },
          }} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userActivityData}>
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="active" stroke="var(--color-active)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

