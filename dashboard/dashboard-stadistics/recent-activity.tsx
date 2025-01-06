"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivity() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
        <CardDescription>Has tenido 265 acciones en los últimos 7 días</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Examen de Matemáticas modificado</p>
              <p className="text-sm text-muted-foreground">
                Hace 2 horas
              </p>
            </div>
            <div className="ml-auto font-medium">+20 preguntas</div>
          </div>
          <div className="flex items-center">
            <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
              <AvatarImage src="/avatars/02.png" alt="Avatar" />
              <AvatarFallback>JL</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Nuevo examen de Historia creado</p>
              <p className="text-sm text-muted-foreground">
                Hace 5 horas
              </p>
            </div>
            <div className="ml-auto font-medium">50 preguntas</div>
          </div>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/03.png" alt="Avatar" />
              <AvatarFallback>WK</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Preguntas de Ciencias generadas</p>
              <p className="text-sm text-muted-foreground">
                Hace 1 día
              </p>
            </div>
            <div className="ml-auto font-medium">+35 preguntas</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

