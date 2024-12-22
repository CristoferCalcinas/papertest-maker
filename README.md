# ExamGenerator: Plataforma para Creación de Exámenes Físicos

## Descripción

**ExamGenerator** es una aplicación diseñada para facilitar la creación de exámenes tipo test en formato físico. Permite a los usuarios gestionar bancos de preguntas, generar exámenes personalizados y exportarlos en formatos editables como Word.

### Características Principales

- **Autenticación**: Gestión de usuarios y roles.
- **Banco de Preguntas**: Crear, editar y organizar preguntas con respuestas correctas e incorrectas.
- **Generación de Exámenes**: Crear documentos en formato A4 con preguntas tipo test.
- **Exportación de Documentos**: Exportar exámenes en formatos editables para personalización.

## Estructura del Proyecto

El proyecto sigue la arquitectura **Screaming Architecture**, diseñada para reflejar el propósito del sistema:

```
app/
├── auth                 # Funcionalidades de autenticación
├── questions            # Banco de preguntas
├── exams                # Gestión de exámenes
├── documents            # Exportación de documentos
├── layout.tsx           # Layout global
├── page.tsx             # Página principal

questions/
├── Question.ts          # Modelo de datos de preguntas
├── QuestionService.ts   # Lógica de negocio para preguntas
├── QuestionRepository.ts # Interacción con la base de datos

exams/
├── Exam.ts              # Modelo de datos de exámenes
├── ExamService.ts       # Lógica de negocio para exámenes
├── ExamRepository.ts    # Interacción con la base de datos

shared/
├── components           # Componentes UI reutilizables
├── hooks                # Hooks personalizados
├── utils                # Funciones auxiliares
├── styles               # Estilos globales
```

## Tecnologías Usadas

- **Frontend**: Next.js 15.1.2 con React 19.0.0.
- **Base de Datos**: PostgreSQL manejado con Prisma.
- **Estilos**: Tailwind CSS.
- **Autenticación**: Auth.js para gestión de usuarios y roles.

## Instalación y Configuración

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/examgenerator.git
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar las variables de entorno en `.env`.
4. Ejecutar el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

## Próximos Pasos

- Implementar la integración con AI para generar opciones incorrectas automáticas.
- Mejorar las plantillas de exportación de documentos.
- Agregar soporte para estadísticas avanzadas de preguntas y exámenes.

---

**Autor:** Adrián, 2024
